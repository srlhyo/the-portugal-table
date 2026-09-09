import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import { itensVitrine } from "@/data/eventos";

// ============================================================
// GaleriaVida — os eventos reais, abaixo da dobra.
//
// Uma grelha editorial (2 colunas no telemóvel, 3 no computador)
// onde cada peça guarda o ratio em que foi feita — retrato é
// retrato, paisagem é paisagem, nada é cortado. Os dois vídeos
// vivem entre as fotos com um selo de "play" e um poster; nada
// toca aqui dentro: tocar em qualquer peça abre-a na vitrine,
// em ecrã inteiro, sem som.
//
// Motion: as peças entram uma a uma ao rolar, e ao pairar a
// imagem aproxima-se devagar dentro da moldura.
// ============================================================

const EASE_LUXO = [0.22, 1, 0.36, 1] as const;

interface Props {
  aoAbrir: (indice: number) => void;
}

export default function GaleriaVida({ aoAbrir }: Props) {
  const reduzido = useReducedMotion() ?? false;

  return (
    <section aria-labelledby="mesas-com-vida" className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, ease: EASE_LUXO }}
        className="mb-8 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="flex items-center gap-3 font-body text-[10px] uppercase tracking-[0.28em] text-[#8C6526] sm:text-[11px]">
            <span aria-hidden="true" className="h-px w-8 bg-[#C9A84C]" />
            Mesas com vida
          </p>
          <h2 id="mesas-com-vida" className="mt-3 font-display text-3xl leading-[1.05] text-[#1A1A1A] sm:text-4xl md:text-5xl">
            Os nossos <em className="text-[#8C6526]">eventos.</em>
          </h2>
        </div>
        <p className="max-w-sm font-body text-[13px] leading-relaxed text-[#6B7280] sm:text-sm">
          Cada celebração tem a sua luz. Nós desenhamos a mesa à volta dela — em casa, num jardim, num terraço. Toque numa peça para a ver em tamanho real.
        </p>
      </motion.header>

      <ul className="columns-2 gap-3 sm:gap-4 md:columns-3 [&>li]:mb-3 sm:[&>li]:mb-4" role="list">
        {itensVitrine.map((item, i) => {
          const video = item.tipo === "video";
          const legenda = video ? item.titulo : item.legenda;
          const src = video ? item.poster : item.src;
          return (
            <motion.li
              key={`${item.tipo}-${item.id}`}
              className="break-inside-avoid"
              initial={reduzido ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: EASE_LUXO }}
            >
              <button
                type="button"
                onClick={() => aoAbrir(i)}
                aria-label={`${video ? "Ver o vídeo" : "Ver a fotografia"}: ${legenda}`}
                className="group/peca relative block w-full overflow-hidden border border-[#EADCC0] bg-[#F2EADA] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A07830]"
                style={{ aspectRatio: `${item.largura} / ${item.altura}` }}
              >
                <img
                  src={src}
                  alt={video ? "" : item.alt}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover/peca:scale-[1.04]"
                />
                {/* Véu e legenda, ao pairar */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F1F19]/70 to-transparent px-3 pb-2.5 pt-10 font-display text-sm italic text-[#FFF8E8] opacity-0 transition-opacity duration-500 group-hover/peca:opacity-100 sm:text-base"
                >
                  {legenda}
                </span>
                {video && (
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#E8CF8A]/70 bg-[#0F1F19]/55 text-[#FFF8E8] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md transition-transform duration-500 group-hover/peca:scale-110">
                      <Play className="ml-0.5 h-5 w-5 fill-current" />
                    </span>
                    <span className="absolute left-3 top-3 border border-[#E8CF8A]/50 bg-[#0F1F19]/55 px-2 py-0.5 font-body text-[9px] uppercase tracking-[0.22em] text-[#E8CF8A] backdrop-blur">
                      Vídeo
                    </span>
                  </span>
                )}
              </button>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
