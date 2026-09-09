import React, { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { itensVitrine } from "@/data/eventos";

// ============================================================
// Vitrine — o lightbox dos eventos.
//
// Fotos e vídeos em tamanho real, no ratio em que foram feitos,
// sobre um verde profundo. Nada é cortado nem esticado: cada
// peça cabe dentro de 92vw × 84vh e o resto é sala.
//
// Navega-se com as setas, o teclado (← → Esc) ou o dedo. Ao
// abrir, a página por trás deixa de rolar; ao fechar, o foco
// volta ao sítio de onde saiu.
//
// props:
//   indice     — o item aberto (null = fechada)
//   aoFechar() — pedido de fecho
//   aoNavegar(i) — mudar de item
// ============================================================

const EASE_LUXO = [0.22, 1, 0.36, 1] as const;

interface Props {
  indice: number | null;
  aoFechar: () => void;
  aoNavegar: (i: number) => void;
}

export default function Vitrine({ indice, aoFechar, aoNavegar }: Props) {
  const reduzido = useReducedMotion() ?? false;
  const aberta = indice !== null;
  const fechar = useRef<HTMLButtonElement>(null);
  // O fecho é nosso, não do AnimatePresence: a vitrine fica montada
  // enquanto desvanece (CSS) e sai do DOM ao fim de 350 ms, sempre.
  // Confiar na animação de saída do framer deixava-a presa no ecrã.
  const [montada, setMontada] = useState(false);
  const [visivel, setVisivel] = useState(false);
  const ultimo = useRef(0);
  if (indice !== null) ultimo.current = indice;
  useEffect(() => {
    if (aberta) {
      setMontada(true);
      const r = window.requestAnimationFrame(() => setVisivel(true));
      return () => window.cancelAnimationFrame(r);
    }
    setVisivel(false);
    const t = window.setTimeout(() => setMontada(false), 350);
    return () => window.clearTimeout(t);
  }, [aberta]);
  const inicioToque = useRef<{ x: number; y: number } | null>(null);
  // Um deslize termina com um "click" no fundo; não é um pedido de fecho
  const deslizou = useRef(false);
  const n = itensVitrine.length;

  const seguinte = useCallback(() => {
    if (indice === null) return;
    aoNavegar((indice + 1) % n);
  }, [indice, n, aoNavegar]);
  const anterior = useCallback(() => {
    if (indice === null) return;
    aoNavegar((indice - 1 + n) % n);
  }, [indice, n, aoNavegar]);

  // Teclado, scroll da página e foco
  useEffect(() => {
    if (!aberta) return;
    const antes = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const teclas = (e: KeyboardEvent) => {
      if (e.key === "Escape") aoFechar();
      if (e.key === "ArrowRight") seguinte();
      if (e.key === "ArrowLeft") anterior();
    };
    window.addEventListener("keydown", teclas);
    const t = window.setTimeout(() => fechar.current?.focus(), 50);
    return () => {
      window.removeEventListener("keydown", teclas);
      window.clearTimeout(t);
      document.body.style.overflow = overflow;
      antes?.focus?.();
    };
  }, [aberta, aoFechar, seguinte, anterior]);

  const aoPointerDown = (e: ReactPointerEvent) => {
    inicioToque.current = { x: e.clientX, y: e.clientY };
    deslizou.current = false;
  };
  const aoPointerUp = (e: ReactPointerEvent) => {
    const ini = inicioToque.current;
    inicioToque.current = null;
    if (!ini) return;
    const dx = e.clientX - ini.x;
    const dy = e.clientY - ini.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      deslizou.current = true;
      if (dx < 0) seguinte();
      else anterior();
    }
  };

  /** Clicar fora da peça — em qualquer zona vazia — fecha a vitrine. */
  const aoClicarFora = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !deslizou.current) aoFechar();
  };

  const mostrado = ultimo.current;
  const item = montada ? itensVitrine[mostrado] : null;
  const legenda = item ? (item.tipo === "foto" ? item.legenda : item.descricao) : "";
  const titulo = item ? (item.tipo === "foto" ? "Fotografia" : item.titulo) : "";

  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      {item && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${titulo}: ${legenda}`}
          className={`fixed inset-0 z-[100] flex flex-col bg-[#0C1A14]/92 backdrop-blur-md transition-opacity duration-300 ease-out ${
            visivel ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onPointerDown={aoPointerDown}
          onPointerUp={aoPointerUp}
        >
          {/* Véu: clicar fora fecha */}
          <button type="button" aria-label="Fechar" onClick={aoFechar} className="absolute inset-0 cursor-default" tabIndex={-1} />

          {/* Cabeçalho */}
          <div
            className="relative z-10 flex items-center justify-between px-4 pt-[calc(0.75rem+env(safe-area-inset-top))] sm:px-6"
            onClick={aoClicarFora}
          >
            <p className="font-body text-[10px] uppercase tracking-[0.26em] text-[#E8CF8A]">
              {String(mostrado + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} · {titulo}
            </p>
            <button
              ref={fechar}
              type="button"
              onClick={aoFechar}
              aria-label="Fechar a vitrine"
              className="inline-flex h-11 w-11 items-center justify-center border border-[#E8CF8A]/40 text-[#FFF8E8] transition-colors hover:border-[#E8CF8A] hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8CF8A]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* A peça, no seu ratio */}
          <div
            className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-3 py-3 sm:px-16"
            onClick={aoClicarFora}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${item.tipo}-${item.id}`}
                initial={reduzido ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={reduzido ? { opacity: 0 } : { opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, ease: EASE_LUXO }}
                className="relative max-h-full max-w-full"
                style={{ aspectRatio: `${item.largura} / ${item.altura}`, height: "min(84vh, calc(92vw * " + item.altura / item.largura + "))" }}
              >
                {item.tipo === "foto" ? (
                  <img
                    src={item.src}
                    alt={item.alt}
                    draggable={false}
                    className="h-full w-full select-none object-contain shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]"
                  />
                ) : (
                  <video
                    key={item.src}
                    src={item.src}
                    poster={item.poster}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full bg-black object-contain shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Legenda e navegação */}
          <div
            className="relative z-10 flex items-center justify-between gap-4 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-1 sm:px-6"
            onClick={aoClicarFora}
          >
            <button
              type="button"
              onClick={anterior}
              aria-label="Anterior"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-[#E8CF8A]/40 text-[#FFF8E8] transition-colors hover:border-[#E8CF8A] hover:bg-white/5"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <p
              className="min-w-0 flex-1 text-center font-display text-lg italic leading-tight text-[#FFF8E8] sm:text-xl"
              aria-live="polite"
              onClick={() => {
                if (!deslizou.current) aoFechar();
              }}
            >
              {legenda}
            </p>
            <button
              type="button"
              onClick={seguinte}
              aria-label="Seguinte"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-[#E8CF8A]/40 text-[#FFF8E8] transition-colors hover:border-[#E8CF8A] hover:bg-white/5"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>,
    document.body,
  );
}
