import type { Handler } from "@netlify/functions";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyKT6DgB_TD5HzdTiH-vGtZdHA8Lv7mp06IjQrGIMhKZdnL6xjrnC-78HxNcrGRVLbXNA/exec";

type OrderPayload = {
  nome: string;
  whatsapp: string; // +3519XXXXXXXX
  email?: string;
  tipo_evento: string;
  data_evento: string; // YYYY-MM-DD
  hora_evento?: string; // HH:mm
  local_evento: string;
  num_convidados: number;
  pacote: string;
  itens: {
    extras?: string[];
    aluguer?: Array<{ nome: string; qtd: number; preco: number }>;
  };
  subtotal_estimado: number;
  observacoes?: string;
};

function isEmail(value: string) {
  // suficiente para validação prática (evita falsos positivos óbvios)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isISODate(value: string) {
  // formato
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  // validação básica (evita 2026-99-99)
  const [y, m, d] = value.split("-").map(Number);
  if (m < 1 || m > 12) return false;
  if (d < 1 || d > 31) return false;

  const dt = new Date(Date.UTC(y, m - 1, d));
  return (
    dt.getUTCFullYear() === y &&
    dt.getUTCMonth() === m - 1 &&
    dt.getUTCDate() === d
  );
}

function isHHmm(value: string) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

function normalizeWhatsappPT(input: unknown): string {
  const raw = String(input ?? "").trim();

  // remove espaços, hífens, parênteses
  const compact = raw.replace(/[\s()-]/g, "");

  // já vem +351...
  if (compact.startsWith("+351")) {
    const rest = compact.slice(4);
    const normalized = "+351" + rest;
    return normalized;
  }

  // vem 351...
  if (compact.startsWith("351")) {
    return "+"+compact;
  }

  // vem só 9XXXXXXXX
  if (/^9\d{8}$/.test(compact)) {
    return "+351" + compact;
  }

  // vem 00 351...
  if (compact.startsWith("00351")) {
    return "+351" + compact.slice(5);
  }

  return compact; // deixa como está para falhar na regex final
}

function validateAndBuildPayload(raw: any): { ok: true; payload: OrderPayload } | { ok: false; errors: string[] } {
  const errors: string[] = [];

  // 1) Normalizar nomes alternativos vindos do UI
  const nome = String(raw?.nome ?? raw?.name ?? "").trim();
  const whatsapp = normalizeWhatsappPT(raw?.whatsapp ?? raw?.telefone ?? raw?.phone);
  const emailRaw = String(raw?.email ?? "").trim();
  const tipo_evento = String(raw?.tipo_evento ?? raw?.evento_tipo ?? "").trim();
  const data_evento = normalizeDateToISO(raw?.data_evento);
  const hora_evento = String(raw?.hora_evento ?? "").trim();
  const local_evento = String(raw?.local_evento ?? raw?.local ?? "").trim();

  const num_convidados = Number(raw?.num_convidados ?? raw?.convidados ?? NaN);

  const pacote = String(raw?.pacote ?? "").trim();

  // itens pode vir como itens / items / cart (depende do frontend)
  const itensSrc = raw?.itens ?? raw?.items ?? raw?.cart ?? {};
  const extras = Array.isArray(itensSrc?.extras) ? itensSrc.extras.map((x: any) => String(x)) : undefined;
  const aluguer =
    Array.isArray(itensSrc?.aluguer)
      ? itensSrc.aluguer.map((x: any) => ({
          nome: String(x?.nome ?? "").trim(),
          qtd: Number(x?.qtd ?? 0),
          preco: Number(x?.preco ?? 0),
        }))
      : undefined;

  // subtotal pode vir como string "500,00"
  const subtotalRaw = raw?.subtotal_estimado ?? raw?.subtotal ?? raw?.total ?? 0;
  const subtotal_estimado = Number(String(subtotalRaw).replace(",", "."));

  const observacoes = String(raw?.observacoes ?? raw?.mensagem ?? "").trim();

  // 2) Validar obrigatórios
  if (!nome) errors.push("nome é obrigatório");
  if (!tipo_evento) errors.push("tipo_evento é obrigatório");
  if (!data_evento) errors.push("data_evento é obrigatório");
  if (!local_evento) errors.push("local_evento é obrigatório");
  if (!pacote) errors.push("pacote é obrigatório");

  if (!Number.isFinite(num_convidados) || !Number.isInteger(num_convidados) || num_convidados < 1) {
    errors.push("num_convidados inválido (tem de ser inteiro >= 1)");
  }

  if (!Number.isFinite(subtotal_estimado) || subtotal_estimado < 0) {
    errors.push("subtotal_estimado inválido (tem de ser número >= 0)");
  }

  // 3) Validar WhatsApp PT móvel
  if (!/^\+3519\d{8}$/.test(whatsapp)) {
    errors.push("whatsapp inválido (usar móvel PT: +3519XXXXXXXX)");
  }

  // 4) Validar email (opcional)
  let email: string | undefined = undefined;
  if (emailRaw) {
    if (!isEmail(emailRaw)) errors.push("email inválido");
    else email = emailRaw;
  }

  // 5) Validar data/hora
  if (data_evento && !isISODate(data_evento)) errors.push("data_evento inválida (usar YYYY-MM-DD)");
  let hora_evento_final: string | undefined = undefined;
  if (hora_evento) {
    if (!isHHmm(hora_evento)) errors.push("hora_evento inválida (usar HH:mm)");
    else hora_evento_final = hora_evento;
  }

  // 6) Validar itens (se existirem)
  if (aluguer) {
    for (const [i, item] of aluguer.entries()) {
      if (!item.nome) errors.push(`aluguer[${i}].nome é obrigatório`);
      if (!Number.isFinite(item.qtd) || !Number.isInteger(item.qtd) || item.qtd < 1) {
        errors.push(`aluguer[${i}].qtd inválido (inteiro >= 1)`);
      }
      if (!Number.isFinite(item.preco) || item.preco < 0) {
        errors.push(`aluguer[${i}].preco inválido (número >= 0)`);
      }
    }
  }

  if (errors.length) return { ok: false, errors };

  const payload: OrderPayload = {
    nome,
    whatsapp,
    ...(email ? { email } : {}),
    tipo_evento,
    data_evento,
    ...(hora_evento_final ? { hora_evento: hora_evento_final } : {}),
    local_evento,
    num_convidados,
    pacote,
    itens: {
      ...(extras?.length ? { extras } : {}),
      ...(aluguer?.length ? { aluguer } : {}),
    },
    subtotal_estimado,
    ...(observacoes ? { observacoes } : {}),
  };

  return { ok: true, payload };
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const raw = JSON.parse(event.body || "{}");
    const built = validateAndBuildPayload(raw);

    if (!built.ok) {
      return {
        statusCode: 400,
        body: JSON.stringify({ ok: false, errors: built.errors }),
      };
    }

    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(built.payload),
    });

    const text = await response.text();

    return { statusCode: 200, body: text };
  } catch (error) {
    console.error("create-order error:", error);
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: "Failed to create order" }) };
  }
};

function normalizeDateToISO(input: unknown): string {
  const raw = String(input ?? "").trim();

  // já vem ISO
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;

  // dd/mm/yyyy
  const m = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return raw;

  const dd = m[1];
  const mm = m[2];
  const yyyy = m[3];

  return `${yyyy}-${mm}-${dd}`;
}
