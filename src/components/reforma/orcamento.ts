import { useEffect, useState } from "react";

// ============================================================
// O caminho para o pedido de orçamento.
//
// A app de orçamento vive fora deste site. Tudo o que o
// visitante decidir aqui — o serviço que escolheu, e de onde
// veio — viaja com ele em query params. Se a app os ignorar,
// nada se perde: continua a abrir como hoje.
// ============================================================

export const QUOTE_URL = "https://dlm-jornada.netlify.app/";

export function hrefOrcamento({
  pacote,
  origem,
}: {
  pacote?: string | null;
  origem?: string;
} = {}): string {
  const url = new URL(QUOTE_URL);
  if (pacote) url.searchParams.set("pacote", pacote);
  if (origem) url.searchParams.set("origem", origem);
  return url.toString();
}

/**
 * Onde abrir o pedido de orçamento.
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
