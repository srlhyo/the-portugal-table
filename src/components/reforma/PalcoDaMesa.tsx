import {
  Component,
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ErrorInfo,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUp, Maximize2, Pause, Play } from "lucide-react";
import { fotosEventos, videosEventos } from "@/data/eventos";
import { useEmVista } from "@/hooks/use-em-vista";

// ============================================================
// PalcoDaMesa — o arco verde onde a mesa se revela.
//
// Estado "coberta": a campânula 3D flutua sobre o palco, com a
//   frase da casa por cima e o convite "Revelar a mesa" por
//   baixo. O rato (ou o dedo) inclina-a.
// Estado "revelada": a campânula sobe e sai de cena e, no lugar
//   dela, as fotografias dos eventos reais passam em molduras
//   de papel, num carrossel em 3D — cada uma no ratio em que foi
//   feita, nunca cortada nem esticada. Deslizar com o dedo, tocar
//   nas miniaturas ou esperar (passeio automático) muda a foto;
//   tocar na foto abre-a em tamanho real na vitrine.
//
// Os vídeos não tocam aqui dentro (seriam cortados pelo arco):
// as fichas por baixo abrem-nos na vitrine, em ecrã inteiro.
//
// O 3D chega em lazy (three.js é o maior pedaço do site) e, até
// chegar — ou se o WebGL falhar — fica uma campânula em SVG no
// mesmo sítio: o palco nunca está vazio.
// ============================================================

const CampanulaTresD = lazy(() => import("./CampanulaTresD"));

const EASE_LUXO = [0.22, 1, 0.36, 1] as const;
const INTERVALO_FOTOS = 4400;
const N = fotosEventos.length;

/** Se o WebGL falhar, o palco mostra a campânula desenhada — nunca um buraco. */
class RedeDeSeguranca extends Component<{ fallback: ReactNode; children: ReactNode }, { falhou: boolean }> {
  state = { falhou: false };
  static getDerivedStateFromError() {
    return { falhou: true };
  }
  componentDidCatch(erro: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.warn("Campânula 3D indisponível:", erro, info);
  }
  render() {
    return this.state.falhou ? this.props.fallback : this.props.children;
  }
}

/** A campânula em SVG — o lugar-tenente enquanto o 3D carrega. */
function CampanulaDesenhada({ levantada }: { levantada: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 200 150"
      aria-hidden="true"
      className="mx-auto w-[62%] max-w-[300px]"
      animate={levantada ? { y: -90, rotate: -8, opacity: 0.85 } : { y: [0, -6, 0], rotate: 0, opacity: 1 }}
      transition={levantada ? { duration: 1, ease: EASE_LUXO } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <radialGradient id="pd-perola" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#FFFDF6" />
          <stop offset="100%" stopColor="#B9A578" />
        </radialGradient>
        <linearGradient id="pd-corpo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F3DFA8" />
          <stop offset="55%" stopColor="#D9B45C" />
          <stop offset="100%" stopColor="#A9822F" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="128" rx="88" ry="10" fill="url(#pd-corpo)" opacity="0.9" />
      <path d="M22 118 Q22 44 100 38 Q178 44 178 118 Z" fill="url(#pd-corpo)" />
      <path d="M36 112 Q40 60 96 49" fill="none" stroke="#FFF6DC" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
      <rect x="14" y="116" width="172" height="6" rx="3" fill="#A9822F" />
      <circle cx="100" cy="26" r="9" fill="none" stroke="#D9B45C" strokeWidth="4" />
      <circle cx="100" cy="36" r="3.5" fill="url(#pd-perola)" />
    </motion.svg>
  );
}

/** Distância circular entre duas posições do carrossel: -N/2 … N/2. */
const desvio = (i: number, atual: number) => {
  let d = i - atual;
  if (d > N / 2) d -= N;
  if (d < -N / 2) d += N;
  return d;
};

interface Props {
  /** Abrir uma foto na vitrine (índice na lista de fotos). */
  aoAbrirFoto: (indice: number) => void;
  /** Abrir um vídeo na vitrine (índice na lista de vídeos). */
  aoAbrirVideo: (indice: number) => void;
  /** Quando a mesa se revela pela primeira vez — o Index pode reagir. */
  aoRevelar?: () => void;
}

export default function PalcoDaMesa({ aoAbrirFoto, aoAbrirVideo, aoRevelar }: Props) {
  const reduzido = useReducedMotion() ?? false;
  const [raiz, emVista] = useEmVista<HTMLDivElement>("160px");
  const [revelada, setRevelada] = useState(false);
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const jaRevelou = useRef(false);
  const inicioToque = useRef<{ x: number; y: number } | null>(null);
  const arrastou = useRef(false);

  const revelar = useCallback(() => {
    setRevelada(true);
    if (!jaRevelou.current) {
      jaRevelou.current = true;
      aoRevelar?.();
    }
  }, [aoRevelar]);

  const alternar = useCallback(() => {
    if (revelada) setRevelada(false);
    else revelar();
  }, [revelada, revelar]);

  const irPara = useCallback(
    (indice: number) => {
      setAtual(((indice % N) + N) % N);
      revelar();
    },
    [revelar],
  );

  // O passeio automático pelas fotos — só com a mesa à vista,
  // sem pausa e com o palco no ecrã
  useEffect(() => {
    if (!revelada || pausado || !emVista) return;
    const id = window.setTimeout(() => setAtual((a) => (a + 1) % N), INTERVALO_FOTOS);
    return () => window.clearTimeout(id);
  }, [revelada, pausado, emVista, atual]);

  // Deslizar com o dedo muda a foto (só na horizontal, para não
  // roubar o scroll da página)
  const aoPointerDown = (e: ReactPointerEvent) => {
    inicioToque.current = { x: e.clientX, y: e.clientY };
    arrastou.current = false;
  };
  const aoPointerUp = (e: ReactPointerEvent) => {
    const ini = inicioToque.current;
    inicioToque.current = null;
    if (!ini || !revelada) return;
    const dx = e.clientX - ini.x;
    const dy = e.clientY - ini.y;
    if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      arrastou.current = true;
      irPara(dx < 0 ? atual + 1 : atual - 1);
    }
  };

  const foto = fotosEventos[atual];

  return (
    <div ref={raiz} className="w-full">
      {/* O arco */}
      <div
        className="palco-arco group relative mx-auto w-full overflow-hidden rounded-t-full bg-[#1E3A2F] shadow-[0_40px_80px_-30px_rgba(22,40,32,0.55)]"
        style={{ aspectRatio: "4 / 5" }}
        data-arco
        onPointerDown={aoPointerDown}
        onPointerUp={aoPointerUp}
      >
        {/* O verde da sala, com luz a cair de cima */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 60% at 50% 18%, rgba(70,110,88,0.55) 0%, rgba(30,58,47,0) 70%), radial-gradient(120% 80% at 50% 110%, rgba(10,22,17,0.85) 0%, rgba(30,58,47,0) 60%), linear-gradient(180deg, #24463A 0%, #1E3A2F 55%, #142A22 100%)",
          }}
        />
        {/* Pó de ouro a flutuar na sala */}
        {!reduzido && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                className="po-de-ouro absolute block rounded-full bg-[#F3DFA8]"
                style={{
                  left: `${12 + ((i * 37) % 76)}%`,
                  top: `${20 + ((i * 53) % 60)}%`,
                  width: `${2 + (i % 3)}px`,
                  height: `${2 + (i % 3)}px`,
                  animationDelay: `${(i * 0.9) % 6}s`,
                  animationDuration: `${7 + (i % 4) * 1.5}s`,
                  opacity: 0.55,
                }}
              />
            ))}
          </div>
        )}

        {/* A mesa revelada: as fotos em molduras, num carrossel 3D */}
        <div
          className={`absolute inset-x-0 top-[13%] bottom-[27%] transition-opacity duration-[900ms] ease-out ${
            revelada ? "opacity-100 delay-300" : "pointer-events-none opacity-0"
          }`}
          style={{ perspective: "1100px" }}
          aria-live="polite"
        >
          {fotosEventos.map((f, i) => {
            const d = desvio(i, atual);
            const visivel = Math.abs(d) <= 1;
            const ativa = d === 0;
            return (
              <motion.figure
                key={f.id}
                aria-hidden={!ativa}
                className="absolute inset-0 m-0 flex items-center justify-center"
                initial={false}
                animate={{
                  x: `${d * 46}%`,
                  rotateY: d * -32,
                  scale: ativa ? 1 : 0.78,
                  opacity: visivel ? (ativa ? 1 : 0.55) : 0,
                  filter: ativa ? "brightness(1)" : "brightness(0.6)",
                  zIndex: ativa ? 3 : visivel ? 2 : 1,
                }}
                transition={{ duration: reduzido ? 0 : 0.9, ease: EASE_LUXO }}
                style={{ transformStyle: "preserve-3d", pointerEvents: ativa ? "auto" : "none" }}
              >
                <button
                  type="button"
                  tabIndex={ativa && revelada ? 0 : -1}
                  aria-label={`Ver em tamanho real: ${f.legenda}`}
                  onClick={() => {
                    if (!arrastou.current) aoAbrirFoto(i);
                  }}
                  className="group/moldura relative block max-h-full max-w-[84%] cursor-zoom-in bg-[#FFF8E8] p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.75)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8CF8A] sm:p-2"
                  style={{ aspectRatio: `${f.largura} / ${f.altura}`, height: f.altura >= f.largura ? "100%" : "auto", width: f.altura >= f.largura ? "auto" : "84%" }}
                >
                  <img
                    src={f.src}
                    alt={f.alt}
                    draggable={false}
                    loading={i < 3 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-full w-full select-none object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-3 right-3 inline-flex h-8 w-8 items-center justify-center bg-[#0F1F19]/60 text-[#FFF8E8] opacity-0 backdrop-blur transition-opacity duration-300 group-hover/moldura:opacity-100"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                  </span>
                </button>
              </motion.figure>
            );
          })}
        </div>

        {/* A campânula 3D — clicar nela também revela */}
        <div
          className={`absolute inset-x-0 top-[9%] bottom-[17%] transition-opacity ease-out ${
            revelada
              ? "pointer-events-none opacity-0 duration-[800ms] delay-[650ms]"
              : "cursor-pointer opacity-100 duration-500"
          }`}
          onClick={() => {
            if (!revelada) revelar();
          }}
        >
          <RedeDeSeguranca
            fallback={
              <div className="flex h-full items-end justify-center pb-[6%]">
                <CampanulaDesenhada levantada={revelada} />
              </div>
            }
          >
            <Suspense
              fallback={
                <div className="flex h-full items-end justify-center pb-[6%]">
                  <CampanulaDesenhada levantada={revelada} />
                </div>
              }
            >
              <CampanulaTresD
                levantada={revelada}
                reduzido={reduzido || pausado}
                ativa={emVista}
                className="!h-full !w-full"
              />
            </Suspense>
          </RedeDeSeguranca>
        </div>

        {/* A frase da casa, no topo */}
        <AnimatePresence mode="wait">
          {!revelada ? (
            <motion.p
              key="frase"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.6, ease: EASE_LUXO }}
              className="pointer-events-none absolute inset-x-6 top-[17%] text-center font-body text-[10px] uppercase leading-relaxed tracking-[0.28em] text-[#E8CF8A] sm:top-[16%] sm:text-[11px] md:text-xs"
            >
              Cada celebração começa
              <br />
              com um pequeno gesto.
            </motion.p>
          ) : (
            <motion.p
              key="rotulo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pointer-events-none absolute inset-x-6 top-[7.5%] text-center font-body text-[10px] uppercase tracking-[0.28em] text-[#E8CF8A] sm:text-[11px]"
            >
              Os nossos eventos
            </motion.p>
          )}
        </AnimatePresence>

        {/* Legenda e contador (com a mesa revelada) */}
        <AnimatePresence>
          {revelada && (
            <motion.div
              key="legenda"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE_LUXO }}
              className="pointer-events-none absolute inset-x-5 bottom-[18.5%] flex items-baseline justify-between gap-4 sm:inset-x-7"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={foto.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.35 }}
                  className="font-display text-base italic leading-tight text-[#FFF8E8] sm:text-lg md:text-xl"
                >
                  {foto.legenda}
                </motion.p>
              </AnimatePresence>
              <span className="shrink-0 font-body text-[10px] tracking-[0.22em] text-[#E8CF8A]">
                {String(atual + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* O botão do gesto */}
        <div className="absolute inset-x-0 bottom-[6.5%] flex flex-col items-center gap-3">
          <motion.button
            type="button"
            onClick={alternar}
            aria-pressed={revelada}
            whileTap={{ scale: 0.97 }}
            className="group/botao inline-flex min-h-[44px] items-center gap-3 border border-[#E8CF8A]/40 bg-[#0F1F19]/55 px-5 py-2.5 font-body text-[13px] tracking-[0.04em] text-[#FFF8E8] backdrop-blur-md transition-colors duration-300 hover:border-[#E8CF8A]/80 hover:bg-[#0F1F19]/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8CF8A]"
          >
            <span>{revelada ? "Cobrir a mesa" : "Revelar a mesa"}</span>
            {revelada ? (
              <ArrowDown className="h-3.5 w-3.5 text-[#E8CF8A] transition-transform duration-300 group-hover/botao:translate-y-0.5" />
            ) : (
              <ArrowUp className="h-3.5 w-3.5 text-[#E8CF8A] transition-transform duration-300 group-hover/botao:-translate-y-0.5" />
            )}
          </motion.button>
          <AnimatePresence>
            {!revelada && (
              <motion.span
                key="assinatura"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="font-display text-base italic text-[#E8CF8A] sm:text-lg"
              >
                Do Luxo à Mesa
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Miniaturas e controlo de movimento */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <div
          className="flex min-w-0 gap-2 overflow-x-auto py-1 pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Fotos dos nossos eventos"
        >
          {fotosEventos.map((f, i) => {
            const ativa = revelada && atual === i;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={ativa}
                aria-label={f.legenda}
                onClick={() => irPara(i)}
                className={`relative h-11 w-11 shrink-0 overflow-hidden border transition-all duration-300 ${
                  ativa ? "border-[#A07830] opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={f.thumb} alt="" loading="lazy" className="h-full w-full object-cover" />
                {ativa && <span aria-hidden="true" className="absolute inset-0 ring-1 ring-inset ring-[#FFF3D0]/70" />}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setPausado((p) => !p)}
          aria-pressed={pausado}
          className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 px-1 font-body text-[11px] tracking-[0.04em] text-[#6B7280] transition-colors hover:text-[#1A1A1A]"
        >
          {pausado ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
          <span className="hidden sm:inline">{pausado ? "Retomar movimento" : "Pausar movimento"}</span>
          <span className="sr-only sm:hidden">{pausado ? "Retomar movimento" : "Pausar movimento"}</span>
        </button>
      </div>

      <div className="mt-2 h-px w-full bg-[#EADCC0]" aria-hidden="true" />

      {/* Os vídeos, em fichas — abrem em ecrã inteiro */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <span className="font-body text-[10px] uppercase tracking-[0.24em] text-[#8C6526]">Mesas com vida</span>
        <div className="flex gap-1">
          {videosEventos.map((v, i) => (
            <button
              key={v.id}
              type="button"
              onClick={() => aoAbrirVideo(i)}
              className="inline-flex min-h-[40px] items-center gap-1.5 px-2.5 font-body text-[12px] tracking-[0.02em] text-[#1A1A1A] transition-colors duration-300 hover:text-[#8C6526]"
            >
              <Play className="h-3 w-3 fill-[#A07830] text-[#A07830]" />
              {v.titulo}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
