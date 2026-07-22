import { useEffect, useRef } from "react";
import gsap from "gsap";

// ============================================================
// MesaDesenhada — o coração da página de renovação.
// Uma mesa de evento desenha-se sozinha em traço dourado fino,
// como um esboço de atelier a ganhar vida: mesa → toalha →
// candelabro e lugares → flores → chamas acesas.
//
// props:
//   aoFase(n)    — chamado quando cada fase narrativa começa (0-3)
//   aoTerminar() — chamado quando o desenho está completo
//
// Respeita prefers-reduced-motion: desenho instantâneo.
// ============================================================

export default function MesaDesenhada({ aoFase, aoTerminar }) {
  const svgRef = useRef(null);
  // Guardas contra o StrictMode do React (efeitos correm 2x em dev)
  const jaAnimado = useRef(false);

  useEffect(() => {
    if (jaAnimado.current) return;
    jaAnimado.current = true;

    const svg = svgRef.current;
    const tracos = (sel) => Array.from(svg.querySelectorAll(sel));
    const todos = tracos(".traco");

    // Prepara cada path para o efeito "a desenhar-se"
    todos.forEach((p) => {
      const L = p.getTotalLength();
      p.style.strokeDasharray = L;
      p.style.strokeDashoffset = L;
    });

    const chamas = tracos(".chama");
    gsap.set(chamas, { opacity: 0, transformOrigin: "50% 100%" });

    const reduzido = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduzido) {
      // Sem animação: tudo desenhado, chamas acesas, avança já
      gsap.set(todos, { strokeDashoffset: 0 });
      gsap.set(chamas, { opacity: 1 });
      if (aoFase) aoFase(3);
      if (aoTerminar) aoTerminar();
      return;
    }

    const desenhar = (sel, dur, stagger = 0.32) => ({
      targets: tracos(sel),
      vars: {
        strokeDashoffset: 0,
        duration: dur,
        stagger,
        ease: "power2.inOut",
      },
    });

    const tl = gsap.timeline({ delay: 0.5 });

    // Fase 0 — a estrutura: mesa e pernas
    tl.call(() => aoFase && aoFase(0));
    const f0 = desenhar(".f-mesa", 0.9);
    tl.to(f0.targets, f0.vars);

    // Fase 1 — a toalha cai
    tl.call(() => aoFase && aoFase(1), null, ">-0.15");
    const f1 = desenhar(".f-toalha", 0.8, 0.22);
    tl.to(f1.targets, f1.vars, ">-0.1");

    // Fase 2 — candelabro, pratos e copos
    tl.call(() => aoFase && aoFase(2), null, ">-0.1");
    const f2 = desenhar(".f-servico", 0.6, 0.14);
    tl.to(f2.targets, f2.vars, ">-0.05");

    // Fase 3 — as flores e, por fim, a luz
    tl.call(() => aoFase && aoFase(3), null, ">-0.1");
    const f3 = desenhar(".f-flores", 0.55, 0.18);
    tl.to(f3.targets, f3.vars, ">-0.05");

    // As chamas acendem-se uma a uma
    tl.to(chamas, {
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: "power1.out",
    });

    // Tremeluzir contínuo das chamas — cada uma com o seu ritmo,
    // como velas verdadeiras (nunca em uníssono)
    tl.call(() => {
      chamas.forEach((chama, i) => {
        gsap.to(chama, {
          scaleY: () => 0.9 + Math.random() * 0.22,
          scaleX: () => 0.92 + Math.random() * 0.14,
          duration: 0.5 + Math.random() * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.13,
        });
      });
    });

    tl.call(() => aoTerminar && aoTerminar(), null, "+=0.3");

    return () => tl.kill();
  }, [aoFase, aoTerminar]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 560 360"
      className="block w-full"
      role="img"
      aria-label="Mesa de evento a ser posta, desenhada em traço dourado"
    >
      <g
        fill="none"
        stroke="#C9A84C"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* ---- Fase 0: a mesa ---- */}
        <path className="traco f-mesa" d="M70 236 L490 236" strokeWidth="2.4" />
        <path
          className="traco f-mesa"
          d="M100 244 L88 340 M460 244 L472 340"
          strokeWidth="1.8"
        />
        <path
          className="traco f-mesa"
          d="M104 300 Q280 286 456 300"
          strokeWidth="1"
          stroke="#E8D5A3"
        />

        {/* ---- Fase 1: a toalha ---- */}
        <path
          className="traco f-toalha"
          d="M70 236 Q78 264 106 270 L454 270 Q482 264 490 236"
          stroke="#D8BC6A"
        />
        <path
          className="traco f-toalha"
          d="M152 270 L144 312"
          stroke="#D8BC6A"
          strokeWidth="1.1"
        />
        <path
          className="traco f-toalha"
          d="M280 270 L280 318"
          stroke="#D8BC6A"
          strokeWidth="1.1"
        />
        <path
          className="traco f-toalha"
          d="M408 270 L416 312"
          stroke="#D8BC6A"
          strokeWidth="1.1"
        />

        {/* ---- Fase 2: candelabro, pratos e copos ---- */}
        {/* Candelabro central de três braços */}
        <path className="traco f-servico" d="M258 228 L302 228" />
        <path className="traco f-servico" d="M264 228 Q280 218 296 228" />
        <path className="traco f-servico" d="M280 220 L280 172" />
        <path
          className="traco f-servico"
          d="M280 184 Q250 180 246 158 M280 184 Q310 180 314 158"
          strokeWidth="1.4"
        />
        <path
          className="traco f-servico"
          d="M240 158 L252 158 M274 166 L286 166 M308 158 L320 158"
          strokeWidth="1.4"
        />
        {/* Velas (traço duplo fino) */}
        <path
          className="traco f-servico"
          d="M244 156 L244 122 M248 156 L248 122 M244 122 L248 122"
          strokeWidth="1.2"
        />
        <path
          className="traco f-servico"
          d="M278 164 L278 116 M282 164 L282 116 M278 116 L282 116"
          strokeWidth="1.2"
        />
        <path
          className="traco f-servico"
          d="M312 156 L312 122 M316 156 L316 122 M312 122 L316 122"
          strokeWidth="1.2"
        />
        {/* Lugar à esquerda: prato marcador + copo */}
        <ellipse className="traco f-servico" cx="168" cy="222" rx="36" ry="9" />
        <ellipse
          className="traco f-servico"
          cx="168"
          cy="222"
          rx="23"
          ry="5.5"
          strokeWidth="1"
        />
        <path
          className="traco f-servico"
          d="M136 206 L136 190 M129 206 L143 206 M127 182 Q127 194 136 194 Q145 194 145 182 M127 182 L145 182"
          strokeWidth="1.2"
        />
        {/* Lugar à direita: prato marcador + copo */}
        <ellipse className="traco f-servico" cx="392" cy="222" rx="36" ry="9" />
        <ellipse
          className="traco f-servico"
          cx="392"
          cy="222"
          rx="23"
          ry="5.5"
          strokeWidth="1"
        />
        <path
          className="traco f-servico"
          d="M424 206 L424 190 M417 206 L431 206 M415 182 Q415 194 424 194 Q433 194 433 182 M415 182 L433 182"
          strokeWidth="1.2"
        />

        {/* ---- Fase 3: as flores ---- */}
        {/* Rosas em espiral, à frente do candelabro */}
        <path
          className="traco f-flores"
          d="M236 232 q5 -9 12 -4 q7 4 1 10 q-7 5 -12 -2 q-3 -5 -1 -4"
          stroke="#B98A46"
          strokeWidth="1.2"
        />
        <path
          className="traco f-flores"
          d="M312 232 q5 -9 12 -4 q7 4 1 10 q-7 5 -12 -2 q-3 -5 -1 -4"
          stroke="#B98A46"
          strokeWidth="1.2"
        />
        {/* Raminhos junto aos pratos */}
        <path
          className="traco f-flores"
          d="M156 202 Q152 192 158 188 M168 200 Q168 190 174 187 M180 203 Q184 193 178 189"
          stroke="#B98A46"
          strokeWidth="1.1"
        />
        <path
          className="traco f-flores"
          d="M380 202 Q376 192 382 188 M392 200 Q392 190 398 187 M404 203 Q408 193 402 189"
          stroke="#B98A46"
          strokeWidth="1.1"
        />
      </g>

      {/* Chamas — acendem-se no fim e tremeluzem para sempre */}
      <g className="chama">
        <ellipse cx="246" cy="112" rx="3.4" ry="7" fill="#E8C56A" />
        <ellipse cx="246" cy="113.5" rx="1.5" ry="3.4" fill="#FFF3D0" />
      </g>
      <g className="chama">
        <ellipse cx="280" cy="106" rx="3.8" ry="8" fill="#E8C56A" />
        <ellipse cx="280" cy="107.5" rx="1.7" ry="3.8" fill="#FFF3D0" />
      </g>
      <g className="chama">
        <ellipse cx="314" cy="112" rx="3.4" ry="7" fill="#E8C56A" />
        <ellipse cx="314" cy="113.5" rx="1.5" ry="3.4" fill="#FFF3D0" />
      </g>
    </svg>
  );
}
