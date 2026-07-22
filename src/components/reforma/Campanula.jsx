import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

// ============================================================
// Campanula — o botão mágico da página de renovação.
// O convite (CTA de orçamento) está servido debaixo de uma
// campânula dourada. Ao pairar (desktop) ou tocar (telemóvel),
// a campânula levanta-se com um sopro de partículas douradas —
// vapor de champanhe — e o botão revela-se a pulsar.
//
// As partículas são canvas 2D puro: mais leve que WebGL para
// ~50 pontos, perfeito em qualquer telemóvel.
//
// props:
//   href — destino do CTA (página de orçamento)
// ============================================================

const EASE_LUXO = [0.22, 1, 0.36, 1];

export default function Campanula({ href }) {
  const [aberta, setAberta] = useState(false);
  // No toque, a campânula fica aberta (não há "pointer leave" digno
  // em ecrãs táteis); no rato, volta a pousar se ele se afastar
  const fixa = useRef(false);
  const canvasRef = useRef(null);
  const animId = useRef(null);

  // ---- Sopro de partículas douradas (canvas 2D) ----
  const soprar = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const CORES = ["#F3E3B8", "#E8C56A", "#D8BC6A", "#FFF3D0"];
    const particulas = Array.from({ length: 46 }, () => ({
      // Nascem no rebordo da campânula (uma faixa horizontal a meio)
      x: W * 0.18 + Math.random() * W * 0.64,
      y: H * 0.62 + Math.random() * 8,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(0.7 + Math.random() * 1.3),
      r: 0.8 + Math.random() * 2.2,
      vida: 1,
      decai: 0.008 + Math.random() * 0.012,
      cor: CORES[Math.floor(Math.random() * CORES.length)],
    }));

    if (animId.current) cancelAnimationFrame(animId.current);

    const passo = () => {
      ctx.clearRect(0, 0, W, H);
      let vivas = 0;
      for (const p of particulas) {
        if (p.vida <= 0) continue;
        vivas++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy *= 0.985; // o sopro abranda ao subir, como vapor
        p.vida -= p.decai;
        ctx.globalAlpha = Math.max(p.vida, 0) * 0.9;
        ctx.fillStyle = p.cor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (vivas > 0) {
        animId.current = requestAnimationFrame(passo);
      } else {
        ctx.clearRect(0, 0, W, H);
      }
    };
    animId.current = requestAnimationFrame(passo);
  }, []);

  const abrir = useCallback(() => {
    setAberta((ja) => {
      if (!ja) soprar();
      return true;
    });
  }, [soprar]);

  const pousar = useCallback(() => {
    if (!fixa.current) setAberta(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative mx-auto w-full text-center"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") abrir();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") pousar();
      }}
    >
      {/* O sopro dourado vive por cima de tudo */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute -inset-x-8 -top-24 bottom-0 z-20 h-[calc(100%+96px)] w-[calc(100%+64px)]"
        aria-hidden="true"
      />

      {/* O convite, servido debaixo da campânula */}
      <div
        className={`absolute left-1/2 top-[46%] z-10 -translate-x-1/2 transition-opacity duration-500 ${
          aberta ? "opacity-100 delay-150" : "pointer-events-none opacity-0"
        }`}
      >
        <motion.div
          animate={aberta ? { scale: [1, 1.04, 1] } : { scale: 1 }}
          transition={
            aberta
              ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.3 }
          }
        >
          <MagneticButton
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gold px-6 py-3 font-body text-sm font-semibold tracking-wide text-[#161210] shadow-[0_6px_30px_-6px_rgba(201,168,76,0.65)] transition-colors duration-300 hover:bg-gold-light"
          >
            <span>Pedir o meu orçamento</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
        </motion.div>
      </div>

      {/* A campânula — levanta-se com requinte, nunca salta */}
      <motion.svg
        viewBox="0 0 200 130"
        className="relative z-30 mx-auto w-full cursor-pointer"
        style={{ transformOrigin: "50% 100%" }}
        animate={
          aberta
            ? { y: -76, rotate: -6, opacity: 0.94 }
            : { y: 0, rotate: 0, opacity: 1 }
        }
        transition={{ duration: 1.0, ease: EASE_LUXO }}
        onClick={() => {
          fixa.current = true;
          abrir();
        }}
        role="button"
        aria-label="Levantar a campânula para revelar o convite"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            fixa.current = true;
            abrir();
          }
        }}
      >
        <defs>
          {/* A pega é uma pérola — o ADN do logo no topo da cloche */}
          <radialGradient id="perola-pega" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#FFFDF6" />
            <stop offset="45%" stopColor="#F2E8D4" />
            <stop offset="100%" stopColor="#B9A578" />
          </radialGradient>
          <linearGradient id="corpo-cloche" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F6ECD2" />
            <stop offset="100%" stopColor="#EADCB4" />
          </linearGradient>
        </defs>
        <path
          d="M22 104 Q22 36 100 31 Q178 36 178 104 Z"
          fill="url(#corpo-cloche)"
          stroke="#C9A84C"
          strokeWidth="2"
        />
        {/* Brilho lateral, como metal polido */}
        <path
          d="M33 100 Q37 50 96 41"
          fill="none"
          stroke="#FFF8E4"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.75"
        />
        <circle cx="100" cy="24" r="8" fill="url(#perola-pega)" />
        <rect x="12" y="104" width="176" height="6" rx="3" fill="#C9A84C" />
      </motion.svg>

      {/* A dica — desaparece quando já cumpriu a missão */}
      {/* A dica flutua ACIMA do domo, numa pílula de marfim com
          hairline dourada — nenhum traço da cena a atravessa */}
      <AnimatePresence>
        {!aberta && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            // Centragem via framer (x), NUNCA via -translate-x-1/2:
            // o motion sobrescreve o transform CSS e a pílula fugia
            style={{ x: "-50%" }}
            className="absolute -top-9 left-1/2 z-40 whitespace-nowrap rounded-full border border-gold-light bg-[#FDFBF6]/90 px-3 py-1 font-body text-[11px] tracking-[0.08em] text-gold-dark shadow-[0_2px_10px_rgba(201,168,76,0.18)]"
          >
            ✧ levante a campânula ✧
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
