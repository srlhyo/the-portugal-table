import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import heroImage from "@/assets/hero-table.jpg";
import brunchImage from "@/assets/brunch.jpg";
import dinnerImage from "@/assets/dinner.jpg";
import fingerfoodImage from "@/assets/fingerfood.jpg";

const galleryImages = [
  { src: heroImage, alt: "Mesa elegante com decoração", span: "col-span-2 row-span-2" },
  { src: brunchImage, alt: "Brunch de luxo", span: "col-span-1 row-span-1" },
  { src: fingerfoodImage, alt: "Finger food gourmet", span: "col-span-1 row-span-2" },
  { src: dinnerImage, alt: "Jantar íntimo", span: "col-span-1 row-span-1" },
  { src: brunchImage, alt: "Mesa de pequeno-almoço", span: "col-span-1 row-span-1" },
  { src: fingerfoodImage, alt: "Canapés artísticos", span: "col-span-1 row-span-1" },
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
              transition={{ duration: 0.6, delay: index * 0.1 }}
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

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://instagram.com"
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
