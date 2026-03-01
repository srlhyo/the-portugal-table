import rosesNude from "@/assets/diary-roses-nude.jpg";
import rosesRed from "@/assets/diary-roses-red.jpg";
import experienceImg from "@/assets/diary-experience.jpg";
import processImg from "@/assets/diary-process.jpg";
import detailsImg from "@/assets/diary-details.jpg";
import conceptImg from "@/assets/diary-concept.jpg";

export interface DiaryPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  coverImage: string;
  excerpt: string;
  blocks: ContentBlock[];
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt: string }
  | { type: "spacer" };

export const diaryPosts: DiaryPost[] = [
  {
    id: 1,
    slug: "a-delicadeza-comeca-nos-detalhes",
    title: "A Delicadeza Começa nos Detalhes",
    category: "Bastidores",
    date: "Fevereiro 2026",
    coverImage: rosesNude,
    excerpt: "Antes de qualquer mesa ganhar forma, existe intenção.",
    blocks: [
      { type: "paragraph", text: "Antes de qualquer mesa ganhar forma, existe intenção." },
      { type: "paragraph", text: "Existe silêncio.\nExiste escolha.\nExiste cuidado." },
      { type: "paragraph", text: "Cada elemento que chega à mesa começa muito antes do dia do evento." },
      { type: "image", src: rosesNude, alt: "Rosas nude em tubos de vidro sobre mesa elegante" },
      { type: "spacer" },
      { type: "paragraph", text: "A beleza não acontece por acaso." },
      { type: "paragraph", text: "Cada rosa é escolhida pela textura.\nPelo tom.\nPela forma como capta a luz." },
      { type: "paragraph", text: "Não se trata apenas de decorar.\nTrata-se de criar atmosfera." },
      { type: "image", src: rosesRed, alt: "Rosas vermelhas em arranjo elegante com velas e champanhe" },
      { type: "spacer" },
      { type: "paragraph", text: "O invisível é o que cria a experiência." },
      { type: "paragraph", text: "O cliente vê o resultado final.\nMas o luxo vive no processo." },
      { type: "paragraph", text: "No tempo dedicado.\nNa intenção colocada em cada detalhe." },
      { type: "spacer" },
      { type: "paragraph", text: "É assim que começa cada experiência à mesa." },
    ],
  },
  {
    id: 2,
    slug: "o-que-transforma-um-evento",
    title: "O Que Transforma um Evento numa Experiência Memorável",
    category: "Visão",
    date: "Janeiro 2026",
    coverImage: experienceImg,
    excerpt: "A diferença entre um buffet e uma experiência está nos sentidos que desperta.",
    blocks: [
      { type: "paragraph", text: "A diferença entre um buffet e uma experiência está nos sentidos que desperta." },
      { type: "paragraph", text: "Um prato bem apresentado conta uma história.\nUm aroma cuidado cria memória.\nUma mesa bem posta convida à intimidade." },
      { type: "image", src: experienceImg, alt: "Mesa de evento com finger food elegante e champanhe" },
      { type: "spacer" },
      { type: "paragraph", text: "A atmosfera não é um detalhe — é o detalhe." },
      { type: "paragraph", text: "A luz, a textura, o espaço entre cada elemento.\nTudo é pensado para que o convidado sinta antes de ver." },
      { type: "paragraph", text: "Não servimos apenas comida.\nCriamos momentos que ficam." },
      { type: "image", src: detailsImg, alt: "Detalhe de guardanapo e talheres dourados" },
      { type: "spacer" },
      { type: "paragraph", text: "Cada evento é irrepetível.\nCada mesa é única.\nCada experiência é desenhada para ser lembrada." },
    ],
  },
  {
    id: 3,
    slug: "do-conceito-a-mesa-posta",
    title: "Do Conceito à Mesa Posta: O Processo Criativo",
    category: "Processo",
    date: "Dezembro 2025",
    coverImage: processImg,
    excerpt: "Cada mesa começa com uma conversa. Cada conversa revela uma intenção.",
    blocks: [
      { type: "paragraph", text: "Cada mesa começa com uma conversa.\nCada conversa revela uma intenção." },
      { type: "paragraph", text: "Ouvimos o cliente.\nCompreendemos a ocasião.\nSentimos o tom do momento." },
      { type: "image", src: conceptImg, alt: "Mood board com tecidos, pétalas e papelaria elegante" },
      { type: "spacer" },
      { type: "paragraph", text: "A paleta nasce da emoção." },
      { type: "paragraph", text: "Tons nude para a suavidade.\nDourado para a celebração.\nVerde salvia para a frescura.\nCada cor tem um propósito." },
      { type: "image", src: processImg, alt: "Equipa a montar mesa de evento com atenção ao detalhe" },
      { type: "spacer" },
      { type: "paragraph", text: "A seleção dos elementos é um ritual." },
      { type: "paragraph", text: "Cada peça é escolhida individualmente.\nCada textura é testada.\nCada composição é ensaiada antes do dia." },
      { type: "paragraph", text: "No final, a mesa fala por si.\nE o cliente apenas desfruta." },
    ],
  },
];
