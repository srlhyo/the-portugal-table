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

const galleryImages = [
  { src: tableCandles, alt: "Mesa elegante com velas e decoração rosa", span: "col-span-2 row-span-2" },
  { src: brunchRoses, alt: "Brunch com rosas e louça dourada", span: "col-span-1 row-span-1" },
  { src: fingerfoodBoard, alt: "Tábua de finger food gourmet", span: "col-span-1 row-span-2" },
  { src: tableChristmas, alt: "Mesa de Natal com decoração dourada", span: "col-span-1 row-span-1" },
  { src: tableTea, alt: "Mesa de chá elegante", span: "col-span-1 row-span-1" },
  { src: cocktailsElegant, alt: "Cocktails elegantes com canapés", span: "col-span-1 row-span-1" },
  { src: cocktailsTable, alt: "Mesa com cocktails", span: "col-span-1 row-span-1" },
  { src: brunchGold, alt: "Brunch com louça dourada", span: "col-span-1 row-span-1" },
  { src: cheeseBoard, alt: "Tábua de queijos e enchidos", span: "col-span-1 row-span-1" },
  { src: dinnerFormal, alt: "Jantar formal com guardanapos vermelhos", span: "col-span-1 row-span-1" },
  { src: tableEaster, alt: "Mesa de Páscoa elegante", span: "col-span-1 row-span-1" },
  { src: tablePink, alt: "Mesa rosa com flores", span: "col-span-1 row-span-1" },
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
            Portfolio
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
            Cada fotografia conta uma história de elegância, atenção ao detalhe 
            e momentos transformados em arte.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`relative overflow-hidden group cursor-pointer ${image.span}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 flex items-center justify-center ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background: 'linear-gradient(135deg, hsla(25, 15%, 10%, 0.7), hsla(25, 15%, 10%, 0.5))'
                }}
              >
                <div className="text-center">
                  <div 
                    className="w-12 h-px mx-auto mb-4"
                    style={{
                      background: 'linear-gradient(90deg, transparent, hsl(43, 65%, 50%), transparent)'
                    }}
                  />
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-white">
                    Ver Detalhe
                  </p>
                </div>
              </div>
              {/* Gold border on hover */}
              <div
                className={`absolute inset-0 border-2 transition-opacity duration-500 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  borderImage: 'linear-gradient(135deg, hsl(40, 70%, 35%), hsl(43, 65%, 50%), hsl(45, 50%, 68%)) 1'
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
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
