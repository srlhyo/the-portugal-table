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
import videoExperience1 from "@/assets/video-experience-1.mp4";
import videoExperience2 from "@/assets/video-experience-2.mp4";

const galleryImages = [
  { src: dinnerFormal, alt: "Jantar formal com guardanapos vermelhos", span: "col-span-2 row-span-2" },
  { src: brunchCoffee, alt: "Mesa de brunch com café", span: "col-span-1 row-span-1" },
  { src: fingerfoodBoard, alt: "Tábua de finger food gourmet", span: "col-span-1 row-span-2" },
  { src: tablePink, alt: "Mesa rosa com flores", span: "col-span-1 row-span-1" },
  { src: brunchGold, alt: "Brunch com louça dourada", span: "col-span-1 row-span-1" },
  { src: cheeseBoard, alt: "Tábua de queijos e enchidos", span: "col-span-1 row-span-1" },
  { src: cocktailsTable, alt: "Mesa com cocktails", span: "col-span-1 row-span-1" },
  { src: tableEaster, alt: "Mesa de Páscoa elegante", span: "col-span-1 row-span-1" },
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
          <span className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4 block">
            Portfolio
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Galeria
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <p className="font-body text-sm md:text-base text-foreground/70 leading-relaxed">
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
              transition={{ duration: 0.6, delay: index * 0.08 }}
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
                className={`absolute inset-0 bg-primary/60 transition-opacity duration-500 flex items-center justify-center ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="text-center">
                  <div className="w-12 h-px bg-gold mx-auto mb-4" />
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-primary-foreground">
                    Ver Detalhe
                  </p>
                </div>
              </div>
              {/* Gold border on hover */}
              <div
                className={`absolute inset-0 border-2 border-gold transition-opacity duration-500 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              />
            </motion.div>
          ))}
        </div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="font-display text-2xl md:text-3xl text-foreground text-center mb-8">
            Em Movimento
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-[9/16] md:aspect-video overflow-hidden bg-muted">
              <video
                src={videoExperience1}
                className="w-full h-full object-cover"
                controls
                playsInline
                muted
                loop
              />
            </div>
            <div className="aspect-[9/16] md:aspect-video overflow-hidden bg-muted">
              <video
                src={videoExperience2}
                className="w-full h-full object-cover"
                controls
                playsInline
                muted
                loop
              />
            </div>
          </div>
        </motion.div>

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
