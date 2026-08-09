import { MAIOR_MESA_CM } from "@/data/pacotes";

// ============================================================
// MesaAEscala — a mesa de cada serviço, desenhada à escala real.
//
// Uma mesa de 180 cm aparece com metade do comprimento de uma
// de 360 cm, e os convidados são pontinhos dourados pousados ao
// longo dela. É a diferença entre ler "250 peças" e ver o
// tamanho da festa: o visitante compara com os olhos, em três
// segundos, aquilo que uma tabela lhe pediria para calcular.
//
// No Premium, duas silhuetas de mordoma nas pontas — os "2
// elementos de staff" vistos, não lidos. É o único desenho da
// carta que justifica sozinho o degrau dos 920 €.
//
// Ornamento puro: não contém informação que não esteja escrita
// em texto ao lado, por isso sai do alcance dos leitores de ecrã.
// ============================================================

const LARGURA = 240;
const ALTURA = 62;
/** Comprimento em px da maior mesa da carta. As outras seguem a proporção. */
const MAX_PX = 196;

export default function MesaAEscala({ pacote }) {
  const { medidaCm, convidadosMax, temStaff } = pacote;

  const larguraMesa = (medidaCm / MAIOR_MESA_CM) * MAX_PX;
  const x0 = (LARGURA - larguraMesa) / 2;
  const x1 = x0 + larguraMesa;
  const yTampo = 40;

  // Os convidados dispõem-se em duas filas ao longo da mesa —
  // como gente à volta de um buffet, não como uma legenda.
  const porFila = Math.ceil(convidadosMax / 2);
  const pontos = [];
  for (let fila = 0; fila < 2; fila++) {
    const nesta = fila === 0 ? porFila : convidadosMax - porFila;
    for (let i = 0; i < nesta; i++) {
      pontos.push({
        x: x0 + ((i + 0.5) / nesta) * larguraMesa,
        y: fila === 0 ? 12 : 22,
      });
    }
  }

  return (
    <svg
      viewBox={`0 0 ${LARGURA} ${ALTURA}`}
      className="block h-auto w-full"
      aria-hidden="true"
      focusable="false"
    >
      {/* Os convidados que a mesa serve */}
      <g fill="#D8BC6A">
        {pontos.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.7" />
        ))}
      </g>

      {/* O tampo e os pés — o mesmo traço dourado do palco */}
      <g
        fill="none"
        stroke="#C9A84C"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <path d={`M${x0} ${yTampo} L${x1} ${yTampo}`} strokeWidth="2.2" />
        <path
          d={`M${x0 + 6} ${yTampo + 2} L${x0 + 4} ${yTampo + 14} M${x1 - 6} ${yTampo + 2} L${x1 - 4} ${yTampo + 14}`}
          strokeWidth="1.2"
        />
        {/* A toalha a cair */}
        <path
          d={`M${x0} ${yTampo} Q${x0 + 3} ${yTampo + 7} ${x0 + 11} ${yTampo + 9} L${x1 - 11} ${yTampo + 9} Q${x1 - 3} ${yTampo + 7} ${x1} ${yTampo}`}
          stroke="#E8D5A3"
          strokeWidth="1.1"
        />
      </g>

      {/* A cota: quanto mede, ao certo */}
      <g stroke="#DCCBA0" strokeWidth="0.9">
        <path d={`M${x0} ${ALTURA - 5} L${x1} ${ALTURA - 5}`} />
        <path d={`M${x0} ${ALTURA - 8} L${x0} ${ALTURA - 2}`} />
        <path d={`M${x1} ${ALTURA - 8} L${x1} ${ALTURA - 2}`} />
      </g>

      {/* Só no Premium: gente nossa em sala, uma de cada lado */}
      {temStaff && (
        <g fill="none" stroke="#A07830" strokeWidth="1.2" strokeLinecap="round">
          {[x0 - 13, x1 + 13].map((cx, i) => (
            <g key={i}>
              <circle cx={cx} cy={yTampo - 15} r="3.2" />
              <path
                d={`M${cx - 3.4} ${yTampo - 9} Q${cx} ${yTampo - 12} ${cx + 3.4} ${yTampo - 9} L${cx + 4} ${yTampo + 8} L${cx - 4} ${yTampo + 8} Z`}
              />
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
