import { motion } from "framer-motion";
import heroImage from "@/assets/hero-table.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Mesa elegante com decoração luxuosa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/30 to-primary/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-8"
          >
            Experiências de Mesa em Portugal
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-primary-foreground leading-[1.1] mb-6"
          >
            Do Luxo à Mesa
            <span className="text-gold">®</span>
          </motion.h1>

          {/* Separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="w-24 h-px bg-gold mx-auto mb-8"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="font-display text-xl md:text-2xl lg:text-3xl text-primary-foreground/95 italic mb-12"
          >
            Luxo sem ostentação. Beleza sem stress.
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="font-body text-sm md:text-base text-primary-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Transformamos celebrações íntimas em experiências visuais e emocionais. 
            Finger food de autor e mesas estilizadas para momentos únicos na sua casa.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <a
              href="#experiencias"
              className="font-body text-xs uppercase tracking-[0.25em] bg-gold text-primary px-10 py-4 hover:bg-gold-dark transition-all duration-500"
            >
              Descobrir Experiências
            </a>
            <a
              href="#galeria"
              className="font-body text-xs uppercase tracking-[0.2em] text-primary-foreground border-b border-gold pb-2 hover:text-gold transition-all duration-500"
            >
              Ver Galeria
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-body text-[10px] uppercase tracking-[0.2em] text-primary-foreground/60">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
