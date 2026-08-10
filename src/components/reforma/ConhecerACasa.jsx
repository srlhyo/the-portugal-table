import { motion } from "framer-motion";
import { hrefGuia, useAlvoExterno } from "@/components/reforma/orcamento";

// ============================================================
// ConhecerACasa — a porta da casa.
//
// O guia interativo é a nossa história: quem somos, como
// servimos. Não é uma venda, e por isso não se veste como tal.
// Fica ao lado da carta, na mesma faixa das escolhas opcionais,
// mas um degrau abaixo dela: sem moldura, só um traço de porta
// e duas linhas de texto. Quem entra, entra porque quis.
//
// A hierarquia da página lê-se de relance:
//   campânula (a ação) › carta (o que servimos) › casa (quem
//   somos) › rodapé (a fuga de quem tem pressa).
//
// props:
//   visivel   — entra em cena junto com a carta
//   reduzido  — respeita prefers-reduced-motion
// ============================================================

const EASE_LUXO = [0.22, 1, 0.36, 1];

export default function ConhecerACasa({ visivel, reduzido }) {
  const alvo = useAlvoExterno();

  return (
    <motion.a
      href={hrefGuia({ origem: "renovacao" })}
      target={alvo.target}
      rel={alvo.rel}
      initial={{ opacity: 0, y: 6 }}
      // Entra depois da carta: primeiro o que servimos, só depois
      // quem somos. Nunca as duas portas a acender ao mesmo tempo.
      animate={visivel ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
      transition={{
        duration: reduzido ? 0 : 0.7,
        delay: reduzido ? 0 : 0.25,
        ease: EASE_LUXO,
      }}
      style={{ pointerEvents: visivel ? "auto" : "none" }}
      // Mesma largura e mesmo recuo da carta no telemóvel: as duas
      // portas alinham ícone com ícone, uma sobre a outra.
      className="group flex w-[250px] items-center gap-3 px-5 py-2.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#A07830] sm:w-auto sm:gap-2.5 sm:px-2"
    >
      {/* Uma porta em arco, aberta a um fio de luz */}
      <svg
        viewBox="0 0 14 18"
        aria-hidden="true"
        className="h-[18px] w-[14px] shrink-0"
      >
        <path
          d="M1.5 17 V7 Q7 1.5 12.5 7 V17"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M1.5 17 H12.5"
          stroke="#C9A84C"
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* O fio de luz alarga quando a porta é convidada a abrir */}
        <path
          d="M7 17 V8"
          stroke="#E8C56A"
          strokeWidth="0.9"
          strokeLinecap="round"
          className="origin-bottom transition-transform duration-500 ease-out group-hover:scale-x-[2.6]"
        />
      </svg>

      <span className="flex flex-col">
        <span className="font-body text-[11px] uppercase tracking-[0.22em] text-[#9C8A6A] transition-colors duration-300 group-hover:text-[#8C6526]">
          Conhecer a casa
        </span>
        <span className="mt-0.5 font-body text-[10px] tracking-[0.04em] text-[#B4AA96] transition-colors duration-300 group-hover:text-[#9CA3AF]">
          Um passeio por quem somos
          {alvo.novoSeparador && (
            <span className="sr-only"> (abre noutro separador)</span>
          )}
        </span>
      </span>
    </motion.a>
  );
}
