import { useEffect, useState } from "react";

// ============================================================
// As duas saídas da página, e o que as distingue.
//
// ORÇAMENTO — o formulário de interesse. É a ação: quem já
//   decidiu (ou quase) vem por aqui. Tudo o que o visitante
//   escolher nesta página — o serviço, e de onde partiu —
//   viaja com ele em query params; se a app os ignorar, nada
//   se perde e abre como abriria.
//
// GUIA — o passeio interativo por quem somos. É a história,
//   não a venda: só lá vai quem quiser conhecer a casa antes
//   de falar de mesas. Nunca compete com o orçamento.
// ============================================================

export const QUOTE_URL = "https://celebra-doluxoamesa.netlify.app/interesse/doluxoamesa";

/** O Instagram da casa — a montra do dia a dia. */
export const INSTAGRAM_URL = "https://instagram.com/doluxoamesa";

/** O guia interativo — a "porta da casa", o nosso sobre. */
export const GUIA_URL = "https://dlm-jornada.netlify.app/";

const comOrigem = (base: string, params: Record<string, string | null | undefined>) => {
  const url = new URL(base);
  for (const [chave, valor] of Object.entries(params)) {
    if (valor) url.searchParams.set(chave, valor);
  }
  return url.toString();
};

export function hrefOrcamento({
  pacote,
  origem,
}: {
  pacote?: string | null;
  origem?: string;
} = {}): string {
  return comOrigem(QUOTE_URL, { pacote, origem });
}

export function hrefGuia({ origem }: { origem?: string } = {}): string {
  return comOrigem(GUIA_URL, { origem });
}

/**
 * Onde abrir uma ligação para fora (orçamento ou guia).
 *
 * Em rato, separador novo: o visitante não perde a mesa que
 * estava a ver. Em ecrã tátil, o mesmo separador: boa parte
 * deste tráfego vem do Instagram, e dentro do webview dele um
 * target="_blank" ou não faz nada ou atira a pessoa para fora
 * da app sem caminho de volta.
 */
export function useAlvoExterno() {
  const [grosso, setGrosso] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const ouvir = (e: MediaQueryListEvent) => setGrosso(e.matches);
    setGrosso(mq.matches);
    mq.addEventListener("change", ouvir);
    return () => mq.removeEventListener("change", ouvir);
  }, []);

  return grosso
    ? { target: undefined, rel: undefined, novoSeparador: false }
    : { target: "_blank", rel: "noopener noreferrer", novoSeparador: true };
}
