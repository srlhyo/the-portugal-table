import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { fotosEventos, videosEventos, type VideoEvento } from "@/data/eventos";
import { useEmVista } from "@/hooks/use-em-vista";

// ============================================================
// GaleriaVida — os eventos reais, abaixo da dobra.
//
// 1. "Duas mesas, dois mundos": os dois vídeos da Nádia em
//    molduras que se inclinam com o rato (desktop) e flutuam
//    sozinhas (telemóvel). Só tocam quando estão no ecrã.
// 2. "Da nossa cozinha": as fotos em duas faixas que correm
//    em sentidos opostos — um desfile contínuo, pausado ao
//    pairar e desligado com prefers-reduced-motion (aí vira
//    uma faixa normal, com scroll).
// ============================================================

const EASE_LUXO = [0.22, 1, 0.36, 1] as const;

function MolduraVideo({ video, className = "" }: { video: VideoEvento; className?: string }) {
  const reduzido = useReducedMotion() ?? false;
  const [raiz, emVista] = useEmVista<HTMLDivElement>("80px", 0.25);
  const ref = useRef<HTMLVideoElement>(null);

  // Toca só quando está no ecrã — poupa bateria e dados
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (emVista) {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } else {
      v.pause();
    }
  }, [emVista]);

  // Inclinação com o rato — parallax de moldura, nunca de página
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 });

  const aoMover = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || reduzido) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const aoSair = () => {
    mx.set(0);
    my.set(0);
  };

  const retrato = video.orientacao === "retrato";

  return (
    <div ref={raiz} className={`[perspective:1400px] ${className}`}>
      <motion.figure
        onPointerMove={aoMover}
        onPointerLeave={aoSair}
        style={{ rotateX: rx, rotateY: ry }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: EASE_LUXO }}
        className="relative m-0 [transform-style:preserve-3d]"
      >
        <motion.div
          animate={reduzido ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative overflow-hidden border border-[#E4D3A2] bg-[#0F1F19] shadow-[0_30px_70px_-28px_rgba(22,40,32,0.6),0_0_50px_-20px_rgba(217,184,119,0.4)]"
        >
          <video
            ref={ref}
            src={video.src}
            poster={video.poster}
            muted
            loop
            playsInline
            preload="metadata"
            className={`w-full object-cover ${retrato ? "aspect-[9/16]" : "aspect-[16/9]"}`}
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
        </motion.div>
        <figcaption className="mt-4 flex items-baseline justify-between gap-4">
          <div>
            <p className="font-display text-xl italic text-[#1A1A1A] sm:text-2xl">{video.titulo}</p>
            <p className="mt-1 font-body text-[12px] leading-relaxed text-[#6B7280] sm:text-[13px]">{video.descricao}</p>
          </div>
          <span className="shrink-0 font-body text-[10px] uppercase tracking-[0.22em] text-[#A07830]">Vídeo</span>
        </figcaption>
      </motion.figure>
    </div>
  );
}

function FaixaFotos({ inversa, fotos }: { inversa?: boolean; fotos: typeof fotosEventos }) {
  const reduzido = useReducedMotion() ?? false;
  const lista = reduzido ? fotos : [...fotos, ...fotos];

  return (
    <div
      className={`faixa-fotos flex w-full ${
        reduzido ? "gap-3 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" : "overflow-hidden"
      }`}
    >
      <div
        className={`flex shrink-0 gap-3 ${reduzido ? "" : inversa ? "faixa-corre-inversa" : "faixa-corre"}`}
        style={reduzido ? undefined : { width: "max-content" }}
      >
        {lista.map((f, i) => (
          <figure
            key={`${f.id}-${i}`}
            className={`group/foto relative m-0 shrink-0 overflow-hidden border border-[#EADCC0] bg-[#F2EADA] ${
              f.orientacao === "retrato" ? "h-52 w-36 sm:h-64 sm:w-44" : "h-52 w-72 sm:h-64 sm:w-[22rem]"
            }`}
          >
            <img
              src={f.src}
              alt={f.alt}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover/foto:scale-105"
              style={{ objectPosition: f.foco ?? "50% 50%" }}
            />
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F1F19]/70 to-transparent px-3 pb-2.5 pt-8 font-display text-sm italic text-[#FFF8E8] opacity-0 transition-opacity duration-500 group-hover/foto:opacity-100">
              {f.legenda}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function GaleriaVida() {
  const metade = Math.ceil(fotosEventos.length / 2);
  const primeira = fotosEventos.slice(0, metade);
  const segunda = fotosEventos.slice(metade);

  return (
    <div className="w-full">
      {/* Os vídeos */}
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
              Duas mesas, <em className="text-[#8C6526]">dois mundos.</em>
            </h2>
          </div>
          <p className="max-w-sm font-body text-[13px] leading-relaxed text-[#6B7280] sm:text-sm">
            Cada celebração tem a sua luz. Nós desenhamos a mesa à volta dela — em casa, num jardim, num terraço.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-8">
          <MolduraVideo video={videosEventos[0]} className="mx-auto w-[72%] max-w-[300px] md:col-span-4 md:w-full md:max-w-none" />
          <MolduraVideo video={videosEventos[1]} className="md:col-span-8 md:mt-16" />
        </div>
      </section>

      {/* As fotos, em desfile */}
      <section aria-labelledby="da-nossa-cozinha" className="mt-20 sm:mt-28">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: EASE_LUXO }}
          className="mx-auto mb-8 w-full max-w-[1400px] px-5 sm:mb-10 sm:px-8 lg:px-12"
        >
          <p className="flex items-center gap-3 font-body text-[10px] uppercase tracking-[0.28em] text-[#8C6526] sm:text-[11px]">
            <span aria-hidden="true" className="h-px w-8 bg-[#C9A84C]" />
            Da nossa cozinha
          </p>
          <h2 id="da-nossa-cozinha" className="mt-3 font-display text-3xl leading-[1.05] text-[#1A1A1A] sm:text-4xl md:text-5xl">
            Finger food <em className="text-[#8C6526]">de autor.</em>
          </h2>
        </motion.header>
        <div className="flex flex-col gap-3">
          <FaixaFotos fotos={primeira} />
          <FaixaFotos fotos={segunda} inversa />
        </div>
      </section>
    </div>
  );
}
