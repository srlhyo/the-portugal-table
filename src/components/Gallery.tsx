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
  { src: brunchRoses, alt: "Buffet elegante com rosas", category: "buffet", size: "large" },
  { src: tableCandles, alt: "Mesa decorada com velas", category: "decoração", size: "medium" },
  { src: fingerfoodBoard, alt: "Tábua de finger food gourmet", category: "comida", size: "medium" },
  { src: tableChristmas, alt: "Mesa de Natal com decoração dourada", category: "decoração", size: "large" },
  { src: cocktailsElegant, alt: "Cocktails elegantes", category: "buffet", size: "medium" },
  { src: tableTea, alt: "Mesa de chá elegante", category: "decoração", size: "medium" },
  { src: brunchGold, alt: "Buffet com louça dourada", category: "buffet", size: "large" },
  { src: tablePink, alt: "Mesa rosa com flores", category: "flores", size: "medium" },
  { src: cheeseBoard, alt: "Tábua de queijos e enchidos", category: "comida", size: "medium" },
  { src: dinnerFormal, alt: "Mesa formal elegante", category: "decoração", size: "large" },
  { src: cocktailsTable, alt: "Mesa de cocktails", category: "buffet", size: "medium" },
  { src: tableEaster, alt: "Mesa de Páscoa elegante", category: "decoração", size: "medium" },
  { src: brunchCoffee, alt: "Buffet com café", category: "buffet", size: "medium" },
  { src: fingerfood, alt: "Finger food premium", category: "comida", size: "large" },
  { src: heroTable, alt: "Mesa de luxo decorada", category: "ambiente", size: "medium" },
];

const Gallery = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="galeria" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span 
            className="font-body text-xs uppercase tracking-[0.3em] mb-4 block"
            style={{
              background: 'linear-gradient(90deg, hsl(42, 65%, 45%), hsl(43, 55%, 58%), hsl(42, 65%, 45%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Os Nossos Trabalhos
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Galeria
          </h2>
          <div 
            className="w-16 h-px mx-auto mb-6"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(43, 65%, 50%), hsl(45, 50%, 68%), hsl(43, 65%, 50%), transparent)',
              boxShadow: '0 0 8px hsla(42, 65%, 45%, 0.3)'
            }}
          />
          <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
            Buffets, mesas decoradas, ambientes, comida, flores e detalhes que transformamos em experiências memoráveis.
          </p>
        </motion.div>

        {/* Gallery Grid - Masonry style with varied sizes */}
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
                  background: 'linear-gradient(to top, hsla(25, 15%, 8%, 0.85) 0%, hsla(25, 15%, 8%, 0) 60%)'
                }}
              >
                <div className="p-4 w-full">
                  <span 
                    className="font-body text-[10px] uppercase tracking-[0.2em]"
                    style={{
                      background: 'linear-gradient(90deg, hsl(43, 55%, 58%), hsl(45, 50%, 72%))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {image.category}
                  </span>
                </div>
              </div>
              {/* Gold border on hover */}
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  border: '2px solid',
                  borderImage: 'linear-gradient(135deg, hsl(40, 70%, 35%), hsl(43, 65%, 50%), hsl(45, 50%, 68%)) 1'
                }}
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
          className="text-center mt-12"
        >
          <a
            href="https://instagram.com/doluxoamesa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-body text-xs uppercase tracking-[0.2em] text-gold border border-gold px-8 py-4 hover:bg-gold hover:text-primary transition-all duration-500"
          >
            Ver Mais no Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
