import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import logo from "@/assets/logo.png";
import tableCandles from "@/assets/table-candles.jpg";
import tablePink from "@/assets/table-pink.jpg";
import fingerfoodBoard from "@/assets/fingerfood-board.jpg";
import cocktailsElegant from "@/assets/cocktails-elegant.jpg";
import dinnerFormal from "@/assets/dinner-formal.jpg";
import videoExperience from "@/assets/video-experience-1.mp4";
import MagneticButton from "@/components/MagneticButton";
import TiltVideoCard from "@/components/TiltVideoCard";

const CandlelightField = lazy(() => import("@/components/three/CandlelightField"));

const QUOTE_URL = "https://dlm-jornada.netlify.app/";

const TAGS = [
  "Montagem de Mesas",
  "Buffet & Finger Food",
  "Bar de Bebidas",
  "Aluguer de Material",
  "E Muito Mais",
];

const SHOWCASE = [
  { image: tablePink, label: "Montagem de Mesas" },
  { image: fingerfoodBoard, label: "Buffet & Finger Food" },
  { image: cocktailsElegant, label: "Bar de Bebidas" },
  { image: dinnerFormal, label: "Aluguer de Material" },
];

const ctaClass =
  "group relative inline-flex items-center gap-3 overflow-hidden bg-gold px-9 py-4 font-body text-sm tracking-wide text-[#161210] shadow-[0_8px_40px_-10px_rgba(217,184,119,0.55)] transition-colors duration-300 hover:bg-gold-light md:text-base";

const Index = () => {
  return (
    <div className="relative w-full overflow-x-hidden bg-[#161210] text-[#f6efe4]">
      {/* ---------- HERO ---------- */}
      <section className="relative flex min-h-[100dvh] w-full items-center overflow-hidden">
        {/* Background photograph — real craft, not an abstraction */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 22, ease: "easeOut" }}
        >
          <img
            src={tableCandles}
            alt="Mesa decorada com velas para evento de luxo"
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#161210] via-[#161210]/85 to-[#161210]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161210] via-transparent to-[#161210]/50" />

        {/* Candlelight ambiance — warm embers drifting, echoing the photo behind them */}
        <div className="pointer-events-none absolute inset-0">
          <Suspense fallback={null}>
            <CandlelightField />
          </Suspense>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 lg:px-12">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            {/* Copy column */}
            <div className="text-center lg:text-left">
              <motion.img
                src={logo}
                alt="Do Luxo à Mesa"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 0.95, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="mx-auto mb-8 h-20 w-auto md:h-24 lg:mx-0"
              />

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
                className="font-display max-w-2xl text-4xl leading-[1.15] md:text-6xl lg:text-7xl"
              >
                A sua mesa,
                <br />
                <span className="italic text-gold-light">o momento mais bonito da noite.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.9 }}
                className="font-body mx-auto mt-7 max-w-lg text-balance text-sm leading-relaxed text-[#f6efe4]/75 md:text-base lg:mx-0"
              >
                Montagem de mesas, buffet finger food, bar de bebidas,
                aluguer de material e muito mais — tudo pensado ao detalhe
                para que só precise de receber os seus convidados.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="mt-10 flex flex-col items-center gap-4 lg:items-start"
              >
                <MagneticButton href={QUOTE_URL} target="_blank" rel="noopener noreferrer" className={ctaClass}>
                  <span>Quero o meu orçamento</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </MagneticButton>
                <span className="font-body text-[11px] uppercase tracking-[0.25em] text-[#f6efe4]/40">
                  Resposta rápida · Orçamento à medida do seu evento
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.9 }}
                className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start"
              >
                {TAGS.map((tag) => {
                  const isMore = tag === "E Muito Mais";
                  return (
                    <div key={tag} className="flex items-center gap-2">
                      <span className={`text-xs ${isMore ? "text-[#f6efe4]/40" : "text-gold"}`}>
                        {isMore ? "+" : "◆"}
                      </span>
                      <span
                        className={`font-body text-xs md:text-sm ${
                          isMore ? "italic text-[#f6efe4]/50" : "text-[#f6efe4]/70"
                        }`}
                      >
                        {tag}
                      </span>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Real footage, framed and floating */}
            <TiltVideoCard src={videoExperience} poster={fingerfoodBoard} className="hidden lg:block" />
          </div>
        </div>
      </section>

      {/* ---------- PROOF STRIP ---------- */}
      <section className="relative bg-[#100d0b] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="mb-10 text-center md:mb-14"
          >
            <span className="font-body text-[11px] uppercase tracking-[0.3em] text-gold">
              O Que Preparamos Para Si
            </span>
            <p className="font-body mt-3 text-xs text-[#f6efe4]/45 md:text-sm">
              Alguns exemplos do que fazemos — e há sempre mais à sua medida.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {SHOWCASE.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative aspect-[3/4] overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.label}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <span className="font-body absolute bottom-4 left-4 right-4 text-xs uppercase tracking-[0.15em] text-[#f6efe4] md:text-sm">
                  {item.label}
                </span>
                <div className="absolute inset-0 border border-gold/0 transition-colors duration-500 group-hover:border-gold/40" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gold-dark via-gold to-gold-light py-16 text-center text-[#161210] md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl px-6"
        >
          <h2 className="font-display text-3xl leading-tight md:text-5xl">
            Vamos tornar o seu evento inesquecível?
          </h2>
          <p className="font-body mx-auto mt-5 max-w-md text-sm leading-relaxed text-[#161210]/75 md:text-base">
            Conte-nos a data, o número de convidados e o estilo que imagina —
            devolvemos-lhe um orçamento claro, sem compromisso.
          </p>
          <div className="mt-9 flex justify-center">
            <MagneticButton
              href={QUOTE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 overflow-hidden bg-[#161210] px-9 py-4 font-body text-sm tracking-wide text-gold-light shadow-[0_8px_40px_-10px_rgba(22,18,16,0.5)] transition-colors duration-300 hover:bg-[#221c18] md:text-base"
            >
              <span>Pedir orçamento agora</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
