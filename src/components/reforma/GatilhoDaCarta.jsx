import { motion } from "framer-motion";
import { pacotes, pacotePorId } from "@/data/pacotes";

// ============================================================
// GatilhoDaCarta — a oferta da carta, por baixo do palco.
//
// Três decisões que valem mais do que o desenho:
//
// 1. Aparece assim que a mesa acaba de se desenhar (~5s), e não
//    no fim da coreografia (~11s). Prender a carta ao fim da
//    animação seria entregá-la a uma minoria — a maioria do
//    tráfego vem do Instagram e não fica onze segundos à espera.
// 2. Traz o preço à vista, antes do clique: quem nunca abrir a
//    carta sai a saber que a casa começa nos 450 €. É o número
//    a chegar aos 100% do tráfego, não aos que clicam.
// 3. É de papel — retângulo reto, hairline dourada, marfim. Na
//    gramática desta página as pílulas são etiquetas e os
//    retângulos são documentos. A carta é um documento.
//
// Nunca compete com a campânula: entra depois dela, vive fora
// do seu olhar e não é dourado sólido.
// ============================================================

const EASE_LUXO = [0.22, 1, 0.36, 1];

const precoMaisBaixo = Math.min(...pacotes.map((p) => p.preco));

export default function GatilhoDaCarta({
  visivel,
  aoAbrir,
  jaViu,
  escolhido,
  reduzido,
}) {
  const servico = pacotePorId(escolhido);

  const rotulo = jaViu ? "Rever a carta da casa" : "Ver a carta da casa";
  const sublinha = servico
    ? `Anotámos: ${servico.nome}. Segue consigo no pedido.`
    : `Três serviços · desde ${precoMaisBaixo} €`;

  return (
    // A faixa está sempre reservada, mesmo antes de o botão
    // aparecer: o rodapé nunca dá um salto a meio da cena.
    <div className="flex h-[62px] shrink-0 items-center justify-center md:h-[68px]">
      <motion.button
        type="button"
        onClick={aoAbrir}
        aria-haspopup="dialog"
        // Sem aria-label fixo: o rótulo acessível é o texto visível,
        // que muda com o estado ("Rever…", "Anotámos: Supreme").
        // Um label estático dizia uma coisa e o ecrã outra.
        initial={{ opacity: 0, y: 6 }}
        animate={visivel ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: reduzido ? 0 : 0.7, ease: EASE_LUXO }}
        style={{ pointerEvents: visivel ? "auto" : "none" }}
        whileTap={reduzido ? undefined : { scale: 0.985 }}
        className="group flex items-center gap-3 border border-[#E4D3A2] bg-[#FDFBF6]/70 px-5 py-2.5 text-left transition-colors duration-400 hover:border-[#C9A84C] hover:bg-[#FFFDF6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#A07830]"
      >
        {/* A carta dobrada — o mesmo objeto que a mordoma tem na mão */}
        <svg
          viewBox="0 0 14 18"
          aria-hidden="true"
          className="h-[18px] w-[14px] shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:-rotate-3"
        >
          <path
            d="M1 1 H13 V17 H1 Z"
            fill="#FFFDF6"
            stroke="#C9A84C"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <path
            d="M4 6 H10 M4 9 H10 M4 12 H8"
            stroke="#D8BC6A"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
        </svg>

        <span className="flex flex-col">
          <span className="font-body text-[11px] uppercase tracking-[0.22em] text-[#8C6526] transition-[letter-spacing] duration-400 group-hover:tracking-[0.26em]">
            {rotulo}
          </span>
          <span className="mt-0.5 font-body text-[10px] tracking-[0.04em] text-[#9CA3AF]">
            {sublinha}
          </span>
        </span>
      </motion.button>
    </div>
  );
}
