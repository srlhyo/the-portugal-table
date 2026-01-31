// Extras data model with exact prices from specification
// All prices in euros as numbers

export interface ExtraItem {
  id: string;
  name: string;
  price: number;
  unit: string;
}

export interface ExtraCategory {
  id: string;
  name: string;
  items: ExtraItem[];
}

export const extrasCategories: ExtraCategory[] = [
  {
    id: "mesas-cadeiras",
    name: "Mesas & Cadeiras",
    items: [
      { id: "mesa-redonda-160", name: "Mesa redonda 160 cm (8 lugares)", price: 25, unit: "un." },
      { id: "mesa-retangular-buffet", name: "Mesa retangular buffet", price: 30, unit: "un." },
      { id: "mesa-alta-cocktail", name: "Mesa alta (cocktail)", price: 15, unit: "un." },
      { id: "cadeira-tiffany", name: "Cadeira Tiffany / acrílica", price: 7, unit: "un." },
    ],
  },
  {
    id: "loica-mesa",
    name: "Loiça & Mesa",
    items: [
      { id: "prato-raso", name: "Prato raso", price: 1.2, unit: "un." },
      { id: "prato-sobremesa", name: "Prato sobremesa", price: 1, unit: "un." },
    ],
  },
  {
    id: "copos",
    name: "Copos",
    items: [
      { id: "copo-agua", name: "Copo água", price: 1, unit: "un." },
      { id: "copo-vinho", name: "Copo vinho", price: 1.5, unit: "un." },
      { id: "flaute-espumante", name: "Flaute espumante", price: 1.5, unit: "un." },
    ],
  },
  {
    id: "talheres",
    name: "Talheres",
    items: [
      { id: "conjunto-talheres-inox", name: "Conjunto talheres inox (faca + garfo)", price: 1.8, unit: "un." },
      { id: "talheres-pack", name: "Talheres pack (1 garfo, 1 faca, 1 colher)", price: 1.2, unit: "pack" },
    ],
  },
  {
    id: "texteis",
    name: "Têxteis",
    items: [
      { id: "toalha-mesa", name: "Toalha de mesa (branca / preta / bege)", price: 12, unit: "un." },
      { id: "guardanapo-tecido", name: "Guardanapo de tecido", price: 1.5, unit: "un." },
      { id: "caminho-mesa", name: "Caminho de mesa", price: 6, unit: "un." },
    ],
  },
  {
    id: "decoracao-suportes",
    name: "Decoração & Suportes",
    items: [
      { id: "jarra-pequena", name: "Jarra pequena (mesa de convidados)", price: 3, unit: "un." },
      { id: "jarra-media", name: "Jarra média", price: 5, unit: "un." },
      { id: "jarra-grande", name: "Jarra grande", price: 7, unit: "un." },
      { id: "suportes-acrilicos-doces", name: "Suportes acrílicos para doces", price: 3, unit: "un." },
      { id: "caixas-exposicao-acrilico", name: "Caixas de exposição acrílico", price: 8, unit: "un." },
    ],
  },
  {
    id: "iluminacao-ambiente",
    name: "Iluminação & Ambiente",
    items: [
      { id: "casticai-metal", name: "Castiçal metal", price: 1.5, unit: "un." },
      { id: "casticai-vidro", name: "Castiçal vidro", price: 2, unit: "un." },
      { id: "vela-led", name: "Vela LED", price: 1, unit: "un." },
    ],
  },
  {
    id: "apoio-servico",
    name: "Apoio & Serviço",
    items: [
      { id: "bandejas-servico", name: "Bandejas de serviço", price: 4, unit: "un." },
      { id: "jarra-pequena-servico", name: "Jarra pequena (mesa de convidados)", price: 3, unit: "un." },
      { id: "jarra-media-servico", name: "Jarra média", price: 5, unit: "un." },
      { id: "jarra-grande-servico", name: "Jarra grande", price: 7, unit: "un." },
    ],
  },
  {
    id: "suporte-champanhe",
    name: "Suporte de Champanhe",
    items: [
      { id: "suporte-champanhe-acrilico", name: "Suporte de champanhe acrílico", price: 10, unit: "un." },
    ],
  },
];

// Helper to format price in Portuguese style
export const formatPrice = (price: number): string => {
  return price.toLocaleString("pt-PT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).replace(".", ",") + " €";
};
