// ============================================================
// Os eventos reais da casa — fotos e vídeos que a Nádia enviou.
//
// Vivem aqui, e não espalhados pelos componentes, para que a
// ordem, as legendas e as orientações mudem num sítio só. As
// imagens vêm em WebP (≈50–90 KB cada) com uma miniatura para
// as faixas de seleção; os vídeos são mudos, curtos e com
// poster, para começarem a tocar sem pesar no telemóvel.
// ============================================================

import tabuaQueijos from "@/assets/eventos/tabua-queijos.webp";
import tabuaQueijosThumb from "@/assets/eventos/tabua-queijos-thumb.webp";
import molhos from "@/assets/eventos/molhos-dourados.webp";
import molhosThumb from "@/assets/eventos/molhos-dourados-thumb.webp";
import mesaCompleta from "@/assets/eventos/mesa-completa.webp";
import mesaCompletaThumb from "@/assets/eventos/mesa-completa-thumb.webp";
import dispensador from "@/assets/eventos/dispensador-cristal.webp";
import dispensadorThumb from "@/assets/eventos/dispensador-cristal-thumb.webp";
import coposAmora from "@/assets/eventos/copos-amora.webp";
import coposAmoraThumb from "@/assets/eventos/copos-amora-thumb.webp";
import mesaFlores from "@/assets/eventos/mesa-flores.webp";
import mesaFloresThumb from "@/assets/eventos/mesa-flores-thumb.webp";
import canapes from "@/assets/eventos/canapes.webp";
import canapesThumb from "@/assets/eventos/canapes-thumb.webp";
import croissants from "@/assets/eventos/croissants.webp";
import croissantsThumb from "@/assets/eventos/croissants-thumb.webp";
import mesaCanapes from "@/assets/eventos/mesa-canapes.webp";
import mesaCanapesThumb from "@/assets/eventos/mesa-canapes-thumb.webp";
import copoMarca from "@/assets/eventos/copo-marca.webp";
import copoMarcaThumb from "@/assets/eventos/copo-marca-thumb.webp";

import videoRosa from "@/assets/eventos/mesa-rosa.mp4";
import videoRosaPoster from "@/assets/eventos/mesa-rosa-poster.webp";
import videoArLivre from "@/assets/eventos/mesa-ar-livre.mp4";
import videoArLivrePoster from "@/assets/eventos/mesa-ar-livre-poster.webp";

export interface FotoEvento {
  id: string;
  src: string;
  thumb: string;
  alt: string;
  /** Legenda curta, em voz de casa. */
  legenda: string;
  orientacao: "retrato" | "paisagem";
  /** Ponto de interesse para o object-position (recortes em ecrãs estreitos). */
  foco?: string;
}

export const fotosEventos: FotoEvento[] = [
  {
    id: "mesa-completa",
    src: mesaCompleta,
    thumb: mesaCompletaThumb,
    alt: "Mesa de finger food com flores secas, velas e canapés em suportes de madeira",
    legenda: "A mesa posta, antes dos convidados.",
    orientacao: "retrato",
    foco: "50% 60%",
  },
  {
    id: "croissants",
    src: croissants,
    thumb: croissantsThumb,
    alt: "Mini croissants com tomate cherry em espetos, numa tábua redonda",
    legenda: "Mini croissants, ainda mornos.",
    orientacao: "paisagem",
  },
  {
    id: "copos-amora",
    src: coposAmora,
    thumb: coposAmoraThumb,
    alt: "Copos de sobremesa de amora em fila, com uma taça dourada de molho",
    legenda: "Sobremesas de amora, em fila.",
    orientacao: "paisagem",
  },
  {
    id: "tabua-queijos",
    src: tabuaQueijos,
    thumb: tabuaQueijosThumb,
    alt: "Tábua de queijos e enchidos com uvas, frutos vermelhos e brie",
    legenda: "Tábua de queijos e frutos.",
    orientacao: "retrato",
  },
  {
    id: "dispensador",
    src: dispensador,
    thumb: dispensadorThumb,
    alt: "Dispensador de cristal com água aromatizada de limão e hortelã, e copos de cristal",
    legenda: "Água aromatizada, em cristal.",
    orientacao: "retrato",
  },
  {
    id: "canapes",
    src: canapes,
    thumb: canapesThumb,
    alt: "Canapés de ovo e bacon sobre pão tostado, dispostos em pedestais brancos",
    legenda: "Canapés de ovo e bacon.",
    orientacao: "retrato",
  },
  {
    id: "molhos",
    src: molhos,
    thumb: molhosThumb,
    alt: "Três taças douradas com molhos e patés",
    legenda: "Molhos da casa, em taças douradas.",
    orientacao: "paisagem",
  },
  {
    id: "mesa-flores",
    src: mesaFlores,
    thumb: mesaFloresThumb,
    alt: "Arranjo de flores secas junto a copos de sobremesa e uma tábua de queijos",
    legenda: "Flores secas e sobremesas.",
    orientacao: "retrato",
  },
  {
    id: "mesa-canapes",
    src: mesaCanapes,
    thumb: mesaCanapesThumb,
    alt: "Vista geral da mesa com canapés, copos de sobremesa e flores",
    legenda: "A mesa, de outro ângulo.",
    orientacao: "paisagem",
  },
  {
    id: "copo-marca",
    src: copoMarca,
    thumb: copoMarcaThumb,
    alt: "Copo de sobremesa de amora com o selo Do Luxo à Mesa",
    legenda: "Com o nosso selo.",
    orientacao: "retrato",
  },
];

export interface VideoEvento {
  id: string;
  src: string;
  poster: string;
  titulo: string;
  descricao: string;
  orientacao: "retrato" | "paisagem";
}

export const videosEventos: VideoEvento[] = [
  {
    id: "rosa",
    src: videoRosa,
    poster: videoRosaPoster,
    titulo: "Em tons de rosa",
    descricao: "Velas altas, seda rosa e cartões de lugar à mão.",
    orientacao: "retrato",
  },
  {
    id: "ar-livre",
    src: videoArLivre,
    poster: videoArLivrePoster,
    titulo: "Ao ar livre",
    descricao: "Cristal e dourado, com o céu por teto.",
    orientacao: "paisagem",
  },
];
