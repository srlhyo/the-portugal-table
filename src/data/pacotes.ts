// ============================================================
// Os três pacotes de buffet — fonte única de verdade.
//
// Vivem aqui (e não dentro de um componente) porque são
// mostrados em dois sítios com desenhos muito diferentes: a
// secção <Packages/> do site completo e a carta da página de
// renovação. Preços e listas mudam com a época; muda-se num
// sítio só.
// ============================================================

export interface Pacote {
  id: "essence" | "supreme" | "premium";
  /** Numeração da carta: I, II, III. */
  ordinal: string;
  /** Nome comercial, tal como aparece na carta. */
  nome: string;
  /** O parágrafo editorial que apresenta o serviço, em voz de casa. */
  descricao: string;
  /** Comprimento da mesa montada, para leitura. */
  medida: string;
  /** O mesmo comprimento em número — a mesa desenhada à escala precisa dele. */
  medidaCm: number;
  /** Número de peças de finger food. */
  pecas: string;
  /** Frase de convidados, pronta a ler. */
  convidados: string;
  /** Lotação em versão curta, para as células de especificação. */
  lotacaoCurta: string;
  /** Limites de convidados — usados pelos cartões de lugar. */
  convidadosMin: number;
  convidadosMax: number;
  /** Preço de partida, em euros. */
  preco: number;
  /** A sugestão da casa — ganha o destaque visual. */
  destaque: boolean;
  /** Há gente nossa em sala durante o evento. */
  temStaff: boolean;
  /**
   * O que este serviço acrescenta ao anterior, escrito à mão.
   * É a linha que faz o degrau de preço justificar-se sozinho.
   * Escrita à mão de propósito: um diff automático das ementas
   * tropeçaria em "Crepes Primavera" contra "crepes primavera".
   */
  ganho: string | null;
  /** O que vai à mesa. */
  itens: string[];
  /** O que está incluído para além da comida. */
  oferta: string[];
}

export const pacotes: Pacote[] = [
  {
    id: "essence",
    ordinal: "I",
    nome: "Essence",
    descricao:
      "A mesa que basta. Doce e salgado em equilíbrio, para uma casa cheia de gente próxima.",
    medida: "180 cm",
    medidaCm: 180,
    pecas: "250 peças",
    convidados: "Ideal até 15 a 18 convidados",
    lotacaoCurta: "até 18",
    convidadosMin: 1,
    convidadosMax: 18,
    preco: 450,
    destaque: false,
    temStaff: false,
    ganho: null,
    itens: [
      "Mini sobremesas variadas",
      "Brigadeiros",
      "Mini salgados variados",
      "Mini hambúrgueres gourmet",
      "Mini cachorros gourmet",
      "Mini pizzas",
      "Cones de fruta / enchidos",
      "Donuts personalizados",
      "Mini barquinhos com asas de frango e chips",
    ],
    oferta: [
      "Decoração incluída",
      "Bebida não alcoólica servida em copos decorativos",
      "Água aromatizada como elemento decorativo da mesa",
    ],
  },
  {
    id: "supreme",
    ordinal: "II",
    nome: "Supreme",
    descricao:
      "O nosso equilíbrio preferido entre mesa e variedade — a festa a que ninguém quer chegar tarde.",
    medida: "360 cm",
    medidaCm: 360,
    pecas: "450 peças",
    convidados: "Ideal até 35 convidados",
    lotacaoCurta: "até 35",
    convidadosMin: 19,
    convidadosMax: 35,
    preco: 650,
    destaque: true,
    temStaff: false,
    ganho:
      "Sobre o Essence: o dobro da mesa, mais 200 peças e duas entradas novas — crepes primavera e copos de salada César.",
    itens: [
      "Mini sobremesas",
      "Brigadeiros",
      "Donuts personalizados",
      "Mini salgados variados",
      "Mini hambúrgueres gourmet",
      "Mini cachorros gourmet",
      "Mini pizzas",
      "Mini barquinhos com asas de frango e chips",
      "Cones de fruta / enchidos",
      "Crepes primavera",
      "Copos de salada César",
    ],
    oferta: [
      "Decoração incluída",
      "Bebida não alcoólica servida em copos decorativos",
      "Água aromatizada como elemento decorativo da mesa",
    ],
  },
  {
    id: "premium",
    ordinal: "III",
    nome: "Premium",
    descricao:
      "Quando a mesa é o centro da noite. Serviço completo, com duas pessoas nossas a repor e a cuidar do buffet do princípio ao fim.",
    medida: "360 cm",
    medidaCm: 360,
    pecas: "650 peças",
    convidados: "Ideal até 50 convidados",
    lotacaoCurta: "até 50",
    convidadosMin: 36,
    convidadosMax: 50,
    preco: 920,
    destaque: false,
    temStaff: true,
    ganho:
      "Sobre o Supreme: mais 200 peças, iguarias novas — dos camarões panados ao bacalhau com grão — e duas pessoas nossas em sala, do princípio ao fim.",
    itens: [
      "Brigadeiros",
      "Sobremesas de copo",
      "Donuts personalizados",
      "Mini salgados variados",
      "Mini hambúrgueres gourmet",
      "Mini cachorros gourmet",
      "Mini pizzas",
      "Mini barquinhos com asas de frango & chips",
      "Crepes Primavera",
      "Cones de fruta e enchidos",
      "Mini wraps de frango",
      "Saladas frias",
      "Mini copos de salada César",
      "Saladas frias de grão com bacalhau",
      "Canapés diversos",
      "Camarões panados em molho agridoce",
    ],
    oferta: [
      "Decoração incluída",
      "Bebida não alcoólica servida em copos decorativos",
      "Água aromatizada como elemento decorativo da mesa",
      "2 elementos de staff para serviço e reposição durante o evento",
    ],
  },
];

/**
 * O que a casa oferece em todos os serviços. Dito uma vez, em
 * rodapé de largura total, lê-se como política da casa; repetido
 * três vezes, lia-se como argumento de venda.
 */
export const OFERTA_COMUM =
  "Todos os serviços incluem montagem completa, decoração, bebida não alcoólica servida em copos decorativos e água aromatizada como elemento decorativo da mesa.";

/** O maior comprimento de mesa da carta — a escala dos desenhos parte daqui. */
export const MAIOR_MESA_CM = Math.max(...pacotes.map((p) => p.medidaCm));

/** O pacote que serve um dado número de convidados. */
export const pacotePara = (convidados: number): Pacote =>
  pacotes.find((p) => convidados <= p.convidadosMax) ?? pacotes[pacotes.length - 1];

export const pacotePorId = (id: string | null | undefined): Pacote | undefined =>
  pacotes.find((p) => p.id === id);

/**
 * Valor por convidado à lotação máxima. É a prova aritmética da
 * carta: o preço sobe, o custo por pessoa desce — os serviços
 * maiores justificam-se sozinhos, sem uma palavra de venda.
 * Vem sempre acompanhado do "desde" e da nota de que o preço é
 * um ponto de partida, nunca uma tabela fechada.
 */
export const precoPorConvidado = (p: Pacote): number =>
  Math.round(p.preco / p.convidadosMax);
