import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import PalcoDoServico from "@/components/reforma/PalcoDoServico";
import Campanula from "@/components/reforma/Campanula";

// ============================================================
// Index — página temporária "em renovação" do Do Luxo à Mesa.
//
// A história num só ecrã, sem scroll (desktop) e quase sem
// scroll (telemóvel):
//   1. Palco de marfim com luz quente vinda de cima — riqueza
//      pela claridade, não pelo escuro.
//   2. Uma mesa de evento desenha-se em traço dourado, fase a
//      fase, com legendas que contam a renovação como quem
//      prepara um evento.
//   3. A campânula dourada desce sobre a mesa: o convite (CTA
//      de orçamento) está servido debaixo dela. Pairar/tocar
//      levanta-a com um sopro de partículas douradas.
//
// Saída de emergência: quem tem pressa encontra sempre o link
// discreto de orçamento no rodapé — nunca prendemos ninguém à
// animação.
// ============================================================

const QUOTE_URL = "https://dlm-jornada.netlify.app/";

const EASE_LUXO = [0.22, 1, 0.36, 1];

const LEGENDAS = [
  "Estamos a renovar o nosso site…",
  "…com o mesmo cuidado que dedicamos a cada mesa…",
  "…devagar, ao detalhe, sem comprometer a qualidade.",
  "O serviço entra em cena…",
  "Até lá, o convite está servido:",
];

const Index = () => {
  const [fase, setFase] = useState(-1);
  const [servida, setServida] = useState(false);

  const aoFase = useCallback((n) => setFase(n), []);
  // A campânula foi pousada pelo serviço: entra a versão interativa
  // e a legenda final
  const aoServir = useCallback(() => {
    setServida(true);
    setFase(4);
  }, []);

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-[#FDFBF6] text-[#1A1A1A]">
      {/* Luz de sala: um véu quente que desce do teto sobre o marfim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, rgba(255,248,228,0.9) 0%, rgba(250,247,240,0.4) 45%, rgba(244,237,223,0) 75%), linear-gradient(180deg, #FDFBF6 0%, #FAF7F0 55%, #F2EADA 100%)",
        }}
      />

      <main className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col items-center px-5 pt-10 md:pt-14">
        {/* A marca, serena no topo */}
        <motion.img
          src={logo}
          alt="Do Luxo à Mesa"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_LUXO }}
          className="h-24 w-auto md:h-28"
          style={{
            filter: "drop-shadow(0 2px 10px rgba(201,168,76,0.28))",
          }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 font-body text-[11px] uppercase tracking-[0.3em] text-gold"
        >
          O nosso site está em renovação
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: EASE_LUXO }}
          className="font-display mt-3 text-center text-3xl md:text-4xl"
        >
          Estamos a pôr <em className="text-gold-dark">a mesa.</em>
        </motion.h1>

        {/* O guia narrativo: uma legenda de cada vez, sem pressa */}
        <div className="mt-4 flex h-7 items-center" aria-live="polite">
          <AnimatePresence mode="wait">
            {fase >= 0 && (
              <motion.p
                key={fase}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="font-body text-sm italic text-[#6B7280] md:text-[15px]"
              >
                {LEGENDAS[fase]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* O palco: a mesa desenha-se; a campânula pousa sobre ela */}
        <div className="relative mt-2 w-full">
          <PalcoDoServico aoFase={aoFase} aoServir={aoServir} />

          {/* A campânula interativa assume o LUGAR EXATO da campânula
              que a mordoma pousou no palco (mesma proporção: 31.25%
              da largura, rebordo à altura do tampo). Se mexeres no
              viewBox do palco, reajusta top/width aqui. */}
          {servida && (
            <div
              className="absolute left-1/2 top-[36.5%] w-[31.25%] -translate-x-1/2"
            >
              <Campanula href={QUOTE_URL} />
            </div>
          )}
        </div>
      </main>

      {/* Rodapé: a saída rápida está sempre à vista — nunca prendemos
          ninguém à animação — e a assinatura da casa */}
      <footer className="relative z-10 mx-auto w-full max-w-2xl px-5 pb-7 pt-2 text-center">
        <motion.a
          href={QUOTE_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="group inline-flex items-baseline gap-1.5 border-b border-gold-light pb-0.5 font-body text-xs tracking-[0.06em] transition-colors hover:border-gold"
        >
          {/* Brilho de ourives: uma passagem de luz dourada atravessa
              as letras a cada ciclo — o truque do veludo, dentro do
              próprio texto */}
          <motion.span
            style={{
              backgroundImage:
                "linear-gradient(90deg, #A07830 0%, #A07830 38%, #E8C56A 50%, #FFF3D0 54%, #E8C56A 58%, #A07830 70%, #A07830 100%)",
              backgroundSize: "220% 100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
            animate={{ backgroundPosition: ["160% 0%", "-60% 0%"] }}
            transition={{
              duration: 2.0,
              repeat: Infinity,
              repeatDelay: 2.8,
              ease: "easeInOut",
            }}
          >
            Com pressa? Peça já o seu orçamento
          </motion.span>
          {/* A seta acena logo a seguir ao brilho (ciclos de 4.8s
              sincronizados: 2.0+2.8 = 1.1+3.7) */}
          <motion.span
            className="text-gold-dark transition-colors group-hover:text-gold"
            animate={{ x: [0, 4, 0] }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              repeatDelay: 3.7,
              ease: "easeInOut",
              delay: 2.0,
            }}
          >
            →
          </motion.span>
        </motion.a>
        {/* Se quiseres o Instagram da Nádia aqui, é só descomentar:
        <a
          href="https://instagram.com/CONTA_DA_NADIA"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 font-body text-xs text-gray-400 hover:text-gold-dark"
        >
          Instagram
        </a> */}
        <p className="mt-4 font-body text-[10px] uppercase tracking-[0.25em] text-[#9CA3AF]">
          Do Luxo à Mesa · by Nádia Schultz
        </p>
      </footer>
    </div>
  );
};

export default Index;
