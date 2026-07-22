import { useEffect, useRef } from "react";
import gsap from "gsap";

// ============================================================
// PalcoDoServico — o palco completo da página de renovação.
// (substitui o antigo MesaDesenhada)
//
// Ato 1 — a mesa desenha-se em traço dourado, fase a fase.
// Ato 2 — entram duas MORDOMAS (o negócio é de mulheres 🤍):
//          a da esquerda traz a campânula numa bandeja e serve-a
//          no centro da mesa (arco suave, de mãos para o tampo);
//          a da direita traz um raminho e compõe o centro de mesa
//          com um brilho de partículas. As duas fazem uma vénia
//          e ficam em cena, a respirar discretamente.
// Ato 3 — a campânula deste palco desvanece e o componente
//          <Campanula/> interativo assume o mesmo lugar (o Index
//          trata da sobreposição).
//
// props:
//   aoFase(n)   — 0..2 desenho · 3 serviço em cena · (final é o Index)
//   aoServir()  — campânula pousada e palco pronto para a troca
//
// Respeita prefers-reduced-motion: cena final imediata.
// ============================================================

export default function PalcoDoServico({ aoFase, aoServir }) {
  const svgRef = useRef(null);
  const jaAnimado = useRef(false); // guarda contra o StrictMode

  useEffect(() => {
    if (jaAnimado.current) return;
    jaAnimado.current = true;

    const svg = svgRef.current;
    const q = (sel) => Array.from(svg.querySelectorAll(sel));
    const um = (sel) => svg.querySelector(sel);

    const tracos = q(".traco");
    tracos.forEach((p) => {
      const L = p.getTotalLength();
      p.style.strokeDasharray = L;
      p.style.strokeDashoffset = L;
    });

    const chamas = q(".chama");
    const mordE = um("#morda-esq");
    const mordD = um("#morda-dir");
    const corpoE = um("#morda-esq .corpo");
    const corpoD = um("#morda-dir .corpo");
    const clocheMini = um("#cloche-bandeja");
    const clocheGrande = um("#cloche-grande");
    const ramoMao = um("#ramo-na-mao");
    const floresCentro = um("#flores-centro");
    const brilhos = q("#brilho-flores circle");

    gsap.set(chamas, { opacity: 0, transformOrigin: "50% 100%" });
    // Bastidores a sério: a figura da esquerda estende-se até x≈216
    // (ponta da bandeja), por isso ±200 deixava a campânula a
    // espreitar no palco. ±260 esconde tudo.
    gsap.set(mordE, { x: -260 });
    gsap.set(mordD, { x: 260 });
    gsap.set(clocheGrande, {
      x: -122,
      y: -26,
      scale: 0.4,
      opacity: 0,
      transformOrigin: "320px 252px",
    });
    gsap.set(floresCentro, { opacity: 0 });
    gsap.set(brilhos, { scale: 0, opacity: 0, transformOrigin: "center" });

    const acenderChamas = () => {
      gsap.to(chamas, {
        opacity: 1,
        duration: 0.5,
        stagger: 0.18,
        ease: "power1.out",
      });
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
    };

    // Respiração discreta das mordomas — staff presente, invisível
    const respirar = () => {
      [corpoE, corpoD].forEach((corpo, i) => {
        gsap.to(corpo, {
          y: -1.6,
          duration: 2.1 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.7,
        });
      });
    };

    const reduzido = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduzido) {
      // Cena final imediata, sem coreografia
      gsap.set(tracos, { strokeDashoffset: 0 });
      gsap.set(chamas, { opacity: 1 });
      gsap.set([mordE, mordD], { x: 0 });
      gsap.set(clocheMini, { opacity: 0 });
      gsap.set(ramoMao, { opacity: 0 });
      gsap.set(floresCentro, { opacity: 1 });
      if (aoFase) aoFase(3);
      if (aoServir) aoServir();
      return;
    }

    // Ciclo de passos: alterna as duas poses de pernas enquanto andam
    const passear = (raiz) => {
      const a = raiz.querySelector(".pernas-a");
      const b = raiz.querySelector(".pernas-b");
      gsap.set(b, { opacity: 0 });
      const ciclo = gsap
        .timeline({ repeat: -1 })
        .set(a, { opacity: 0 }, 0.24)
        .set(b, { opacity: 1 }, 0.24)
        .set(b, { opacity: 0 }, 0.48)
        .set(a, { opacity: 1 }, 0.48);
      return () => {
        ciclo.kill();
        gsap.set(a, { opacity: 1 });
        gsap.set(b, { opacity: 0 });
      };
    };

    const tl = gsap.timeline({ delay: 0.5 });
    const desenhar = (sel, dur, stagger, pos) =>
      tl.to(
        q(sel),
        {
          strokeDashoffset: 0,
          duration: dur,
          stagger,
          ease: "power2.inOut",
        },
        pos,
      );

    // ---- Ato 1: a mesa desenha-se (~4.5s) ----
    tl.call(() => aoFase && aoFase(0));
    desenhar(".f-mesa", 0.85, 0.28);
    tl.call(() => aoFase && aoFase(1), null, ">-0.15");
    desenhar(".f-toalha", 0.7, 0.18, ">-0.1");
    tl.call(() => aoFase && aoFase(2), null, ">-0.1");
    desenhar(".f-servico", 0.55, 0.12, ">-0.05");
    tl.call(acenderChamas, null, ">-0.1");

    // ---- Ato 2: o serviço entra em cena (~4s) ----
    tl.call(() => aoFase && aoFase(3), null, "+=0.2");
    tl.call(() => {
      const pararE = passear(mordE);
      const pararD = passear(mordD);
      gsap.to(mordE, {
        x: 0,
        duration: 2.1,
        ease: "power2.inOut",
        onComplete: pararE,
      });
      gsap.to(mordD, {
        x: 0,
        duration: 2.1,
        ease: "power2.inOut",
        onComplete: pararD,
      });
    });

    // A campânula é servida: da bandeja para a mesa, em arco
    tl.to(clocheMini, { opacity: 0, duration: 0.25 }, "+=2.3");
    tl.to(clocheGrande, { opacity: 1, duration: 0.2 }, "<");
    tl.to(clocheGrande, {
      keyframes: [
        { x: -58, y: -62, scale: 0.68, duration: 0.42, ease: "power1.out" },
        { x: 0, y: 0, scale: 1, duration: 0.48, ease: "power1.in" },
      ],
    });

    // A mordoma da direita compõe as flores, com brilho
    tl.to(ramoMao, { opacity: 0, duration: 0.25 }, "+=0.15");
    tl.to(floresCentro, { opacity: 1, duration: 0.5 }, "<");
    tl.to(
      brilhos,
      {
        scale: 1.6,
        opacity: 0.9,
        duration: 0.35,
        stagger: 0.06,
        ease: "power1.out",
      },
      "<+0.1",
    );
    tl.to(brilhos, { opacity: 0, duration: 0.6, stagger: 0.05 }, ">-0.1");

    // A vénia — pequena, digna, em uníssono
    tl.call(() => {
      gsap.to(mordE, {
        rotate: 7,
        transformOrigin: "150px 346px",
        duration: 0.65,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
      gsap.to(mordD, {
        rotate: -7,
        transformOrigin: "490px 346px",
        duration: 0.65,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    }, null, "+=0.1");

    // ---- Ato 3: troca de guarda — o palco entrega a campânula
    //      interativa (o Index sobrepõe o <Campanula/>) ----
    tl.call(respirar, null, "+=1.3");
    tl.to(clocheGrande, { opacity: 0, duration: 0.18 });
    tl.call(() => aoServir && aoServir(), null, "<");

    return () => tl.kill();
  }, [aoFase, aoServir]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 640 400"
      className="block w-full"
      role="img"
      aria-label="Mesa de evento a ser posta por duas mordomas, desenhada em traço dourado"
    >
      <g
        fill="none"
        stroke="#C9A84C"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* ---- Ato 1 · Fase 0: a mesa ---- */}
        <path className="traco f-mesa" d="M130 252 L510 252" strokeWidth="2.4" />
        <path
          className="traco f-mesa"
          d="M158 260 L148 352 M482 260 L492 352"
          strokeWidth="1.8"
        />
        <path
          className="traco f-mesa"
          d="M160 316 Q320 304 480 316"
          strokeWidth="1"
          stroke="#E8D5A3"
        />

        {/* ---- Fase 1: a toalha ---- */}
        <path
          className="traco f-toalha"
          d="M130 252 Q138 278 164 284 L476 284 Q502 278 510 252"
          stroke="#D8BC6A"
        />
        <path
          className="traco f-toalha"
          d="M204 284 L197 322 M320 284 L320 328 M436 284 L443 322"
          stroke="#D8BC6A"
          strokeWidth="1.1"
        />

        {/* ---- Fase 2: candelabro, pratos e copos ---- */}
        <path className="traco f-servico" d="M300 246 L340 246" />
        <path className="traco f-servico" d="M306 246 Q320 238 334 246" />
        <path className="traco f-servico" d="M320 240 L320 196" />
        <path
          className="traco f-servico"
          d="M320 208 Q294 204 290 184 M320 208 Q346 204 350 184"
          strokeWidth="1.4"
        />
        <path
          className="traco f-servico"
          d="M284 184 L296 184 M314 190 L326 190 M344 184 L356 184"
          strokeWidth="1.4"
        />
        <path
          className="traco f-servico"
          d="M288 182 L288 152 M292 182 L292 152 M288 152 L292 152"
          strokeWidth="1.2"
        />
        <path
          className="traco f-servico"
          d="M318 188 L318 144 M322 188 L322 144 M318 144 L322 144"
          strokeWidth="1.2"
        />
        <path
          className="traco f-servico"
          d="M348 182 L348 152 M352 182 L352 152 M348 152 L352 152"
          strokeWidth="1.2"
        />
        <ellipse className="traco f-servico" cx="215" cy="240" rx="32" ry="8.5" />
        <ellipse
          className="traco f-servico"
          cx="215"
          cy="240"
          rx="20"
          ry="5"
          strokeWidth="1"
        />
        <path
          className="traco f-servico"
          d="M186 226 L186 212 M180 226 L192 226 M178 204 Q178 215 186 215 Q194 215 194 204 M178 204 L194 204"
          strokeWidth="1.2"
        />
        <ellipse className="traco f-servico" cx="425" cy="240" rx="32" ry="8.5" />
        <ellipse
          className="traco f-servico"
          cx="425"
          cy="240"
          rx="20"
          ry="5"
          strokeWidth="1"
        />
        <path
          className="traco f-servico"
          d="M454 226 L454 212 M448 226 L460 226 M446 204 Q446 215 454 215 Q462 215 462 204 M446 204 L462 204"
          strokeWidth="1.2"
        />
      </g>

      {/* Chamas — acendem-se e tremeluzem para sempre */}
      <g className="chama">
        <ellipse cx="290" cy="142" rx="3.4" ry="7" fill="#E8C56A" />
        <ellipse cx="290" cy="143.5" rx="1.5" ry="3.4" fill="#FFF3D0" />
      </g>
      <g className="chama">
        <ellipse cx="320" cy="134" rx="3.8" ry="8" fill="#E8C56A" />
        <ellipse cx="320" cy="135.5" rx="1.7" ry="3.8" fill="#FFF3D0" />
      </g>
      <g className="chama">
        <ellipse cx="350" cy="142" rx="3.4" ry="7" fill="#E8C56A" />
        <ellipse cx="350" cy="143.5" rx="1.5" ry="3.4" fill="#FFF3D0" />
      </g>

      {/* ---- Ato 2: as mordomas ---- */}
      {/* Mordoma da ESQUERDA — serve a campânula na bandeja */}
      <g id="morda-esq">
        <g className="corpo">
          <g
            fill="none"
            stroke="#A07830"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Cabeça com coque */}
            <circle cx="150" cy="192" r="10.5" />
            <circle cx="160" cy="184" r="4" strokeWidth="1.3" />
            <path d="M141 187 Q145 181 152 182" strokeWidth="1.1" />
            {/* Laço no colarinho */}
            <path
              d="M146 205 L154 205 M147 202.5 L150 205 L153 202.5"
              strokeWidth="1.2"
            />
            {/* Fraque feminino: cintura marcada, cauda atrás */}
            <path d="M143 206 Q137 224 139 250 Q150 257 161 250 Q163 224 157 206" />
            <path d="M139 250 Q131 282 127 300" strokeWidth="1.3" />
            <path d="M150 212 L150 248" strokeWidth="0.9" />
            {/* Saia elegante ao joelho */}
            <path d="M139 250 Q135 288 132 306 L168 306 Q165 288 161 250" strokeWidth="1.4" />
            {/* Braço esquerdo pousado atrás das costas (postura de serviço) */}
            <path d="M143 214 Q133 226 137 240 Q142 244 147 242" strokeWidth="1.3" />
            {/* Braço direito estendido com a bandeja (mão enluvada) */}
            <path d="M157 214 Q172 220 181 229" strokeWidth="1.3" />
            <path d="M179 227 L183 231" strokeWidth="2.2" />
          </g>
          {/* A bandeja e a campânula em miniatura */}
          <g id="bandeja">
            <path
              d="M172 232 L216 232"
              stroke="#A07830"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <g id="cloche-bandeja">
              <path
                d="M177 232 Q177 206 194 204 Q211 206 211 232 Z"
                fill="#F2E6C4"
                stroke="#C9A84C"
                strokeWidth="1.6"
              />
              <circle
                cx="194"
                cy="200.5"
                r="3.4"
                fill="#E5D4A8"
                stroke="#C9A84C"
                strokeWidth="1"
              />
            </g>
          </g>
        </g>
        {/* Duas poses de pernas: o ciclo de passos alterna entre elas */}
        <g
          className="pernas-a"
          fill="none"
          stroke="#A07830"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M144 306 L142 344 M156 306 L158 344" />
          <path d="M142 344 L137 344 M158 344 L163 344" strokeWidth="1.3" />
        </g>
        <g
          className="pernas-b"
          fill="none"
          stroke="#A07830"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M144 306 L150 343 M156 306 L149 342" />
          <path d="M150 343 L155 344 M149 342 L144 344" strokeWidth="1.3" />
        </g>
      </g>

      {/* Mordoma da DIREITA — compõe as flores do centro */}
      <g id="morda-dir">
        <g className="corpo">
          <g
            fill="none"
            stroke="#A07830"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="490" cy="192" r="10.5" />
            <circle cx="480" cy="184" r="4" strokeWidth="1.3" />
            <path d="M499 187 Q495 181 488 182" strokeWidth="1.1" />
            <path
              d="M486 205 L494 205 M487 202.5 L490 205 L493 202.5"
              strokeWidth="1.2"
            />
            <path d="M483 206 Q477 224 479 250 Q490 257 501 250 Q503 224 497 206" />
            <path d="M501 250 Q509 282 513 300" strokeWidth="1.3" />
            <path d="M490 212 L490 248" strokeWidth="0.9" />
            <path d="M479 250 Q475 288 472 306 L508 306 Q505 288 501 250" strokeWidth="1.4" />
            <path d="M497 214 Q507 226 503 240 Q498 244 493 242" strokeWidth="1.3" />
            <path d="M483 214 Q470 221 462 230" strokeWidth="1.3" />
            <path d="M460 228 L464 232" strokeWidth="2.2" />
          </g>
          {/* O raminho na mão enluvada */}
          <g id="ramo-na-mao">
            <path
              d="M452 232 Q448 221 455 217 M457 230 Q457 219 464 216 M461 233 Q466 222 459 218"
              stroke="#B98A46"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </g>
        <g
          className="pernas-a"
          fill="none"
          stroke="#A07830"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M484 306 L482 344 M496 306 L498 344" />
          <path d="M482 344 L477 344 M498 344 L503 344" strokeWidth="1.3" />
        </g>
        <g
          className="pernas-b"
          fill="none"
          stroke="#A07830"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M484 306 L490 343 M496 306 L489 342" />
          <path d="M490 343 L495 344 M489 342 L484 344" strokeWidth="1.3" />
        </g>
      </g>

      {/* As flores do centro, pousadas pela mordoma da direita */}
      <g id="flores-centro">
        <path
          d="M282 246 q5 -9 12 -4 q7 4 1 10 q-7 5 -12 -2"
          stroke="#B98A46"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M348 246 q5 -9 12 -4 q7 4 1 10 q-7 5 -12 -2"
          stroke="#B98A46"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* O brilho quando as flores assentam */}
      <g id="brilho-flores" fill="#E8C56A">
        <circle cx="320" cy="238" r="2.2" />
        <circle cx="338" cy="230" r="1.6" />
        <circle cx="302" cy="228" r="1.5" />
        <circle cx="328" cy="218" r="1.3" />
        <circle cx="312" cy="222" r="1.2" />
      </g>

      {/* ---- Ato 3: a campânula servida (desvanece na troca
           pelo <Campanula/> interativo, sobreposto pelo Index) ---- */}
      <g id="cloche-grande">
        <path
          d="M248 250 Q248 200 320 195 Q392 200 392 250 Z"
          fill="#F2E6C4"
          stroke="#C9A84C"
          strokeWidth="2"
        />
        <path
          d="M258 246 Q262 212 312 201"
          fill="none"
          stroke="#FFF8E4"
          strokeWidth="4.5"
          strokeLinecap="round"
          opacity="0.75"
        />
        <circle
          cx="320"
          cy="189"
          r="6.5"
          fill="#EADCB4"
          stroke="#C9A84C"
          strokeWidth="1.4"
        />
        <rect x="242" y="250" width="156" height="5.5" rx="2.75" fill="#C9A84C" />
      </g>
    </svg>
  );
}
