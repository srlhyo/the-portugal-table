import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import tableEaster from "@/assets/table-easter.jpg";
import brunchCoffee from "@/assets/brunch-coffee.jpg";
import tablePink from "@/assets/table-pink.jpg";
import cocktailsTable from "@/assets/cocktails-table.jpg";
import brunchGold from "@/assets/brunch-gold.jpg";
import fingerfoodBoard from "@/assets/fingerfood-board.jpg";
import cheeseBoard from "@/assets/cheese-board.jpg";
import dinnerFormal from "@/assets/dinner-formal.jpg";
import tableCandles from "@/assets/table-candles.jpg";
import tableChristmas from "@/assets/table-christmas.jpg";
import tableTea from "@/assets/table-tea.jpg";
import brunchRoses from "@/assets/brunch-roses.jpg";
import cocktailsElegant from "@/assets/cocktails-elegant.jpg";
import fingerfood from "@/assets/fingerfood.jpg";
import heroTable from "@/assets/hero-table.jpg";

const galleryImages = [
  { src: brunchRoses, alt: "Buffet elegante com rosas", category: "buffet" },
  { src: tableCandles, alt: "Mesa decorada com velas", category: "decoração" },
  { src: fingerfoodBoard, alt: "Tábua de finger food gourmet", category: "comida" },
  { src: tableChristmas, alt: "Mesa de Natal com decoração dourada", category: "decoração" },
  { src: cocktailsElegant, alt: "Cocktails elegantes", category: "buffet" },
  { src: tableTea, alt: "Mesa de chá elegante", category: "decoração" },
  { src: brunchGold, alt: "Buffet com louça dourada", category: "buffet" },
  { src: tablePink, alt: "Mesa rosa com flores", category: "flores" },
  { src: cheeseBoard, alt: "Tábua de queijos e enchidos", category: "comida" },
  { src: dinnerFormal, alt: "Mesa formal elegante", category: "decoração" },
  { src: cocktailsTable, alt: "Mesa de cocktails", category: "buffet" },
  { src: tableEaster, alt: "Mesa de Páscoa elegante", category: "decoração" },
  { src: brunchCoffee, alt: "Buffet com café", category: "buffet" },
  { src: fingerfood, alt: "Finger food premium", category: "comida" },
  { src: heroTable, alt: "Mesa de luxo decorada", category: "ambiente" },
];

const Gallery = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="galeria" className="py-28 lg:py-36 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="font-body text-[11px] uppercase tracking-[0.25em] mb-5 block text-gold">
            Os Nossos Trabalhos
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 font-light">
            Galeria
          </h2>
          <div className="separator-gold mx-auto mb-8" />
          <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed font-light">
            Buffets, mesas decoradas, ambientes, comida, flores e detalhes que transformamos em experiências memoráveis.
          </p>
        </motion.div>

        {/* Gallery Grid - Masonry style */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative overflow-hidden group cursor-pointer break-inside-avoid"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 flex items-end ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background: 'linear-gradient(to top, hsla(30, 15%, 8%, 0.75) 0%, transparent 50%)'
                }}
              >
                <div className="p-4 w-full">
                  <span className="font-body text-[10px] uppercase tracking-[0.18em] text-gold">
                    {image.category}
                  </span>
                </div>
              </div>
              {/* Subtle border on hover */}
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                } border-2 border-gold/50`}
              />
            </motion.div>
          ))}
        </div>

        {/* Instagram Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <a
            href="https://instagram.com/doluxoamesa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block btn-outline-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
          >
            Ver Mais no Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
