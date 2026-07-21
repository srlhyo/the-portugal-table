import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles as SparklesIcon } from "lucide-react";
import logo from "@/assets/logo.png";

const EtherealScene = lazy(() => import("@/components/three/EtherealScene"));

const QUOTE_URL = "https://dlm-jornada.netlify.app/";

const Index = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#161210] text-[#f6efe4]">
      {/* Ambient gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(193,154,91,0.22),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(232,207,195,0.10),transparent_55%)]" />

      {/* 3D Scene */}
      <div className="pointer-events-none absolute inset-0">
        <Suspense fallback={null}>
          <EtherealScene />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
        <motion.img
          src={logo}
          alt="Do Luxo à Mesa"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-10 h-14 w-auto md:h-16"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-gold-light/80 md:text-xs"
        >
          <SparklesIcon className="h-3 w-3" />
          <span>Uma nova experiência a caminho</span>
          <SparklesIcon className="h-3 w-3" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
          className="font-display max-w-3xl text-4xl leading-[1.15] md:text-6xl lg:text-7xl"
        >
          O nosso site está a
          <br />
          <span className="italic text-gold-light">reinventar-se.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9 }}
          className="font-body mt-8 max-w-xl text-balance text-sm leading-relaxed text-[#f6efe4]/70 md:text-base"
        >
          Enquanto preparamos uma apresentação à altura de cada mesa que
          criamos, o atendimento nunca parou. Fale connosco agora e receba o
          seu orçamento personalizado em minutos.
        </motion.p>

        <motion.a
          href={QUOTE_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="group relative mt-12 inline-flex items-center gap-3 overflow-hidden bg-gold px-9 py-4 font-body text-sm tracking-wide text-[#161210] shadow-[0_8px_40px_-10px_rgba(193,154,91,0.55)] transition-colors duration-300 hover:bg-gold-light md:text-base"
        >
          <span>Pedir o meu orçamento</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.9 }}
          className="font-body mt-6 text-[11px] uppercase tracking-[0.25em] text-[#f6efe4]/40"
        >
          Resposta rápida · Sem compromisso
        </motion.p>
      </div>

      {/* Bottom fade for depth */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#161210] to-transparent" />
    </div>
  );
};

export default Index;
