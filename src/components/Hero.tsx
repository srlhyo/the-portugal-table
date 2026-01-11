import { motion } from "framer-motion";
import brunchRoses from "@/assets/brunch-roses.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Vibrant, warm, glamorous */}
      <div className="absolute inset-0">
        <img
          src={brunchRoses}
          alt="Buffet de luxo com rosas e decoração dourada"
          className="w-full h-full object-cover"
        />
        {/* Warm overlay for legibility without killing vibrancy */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to bottom,
              hsla(25, 20%, 8%, 0.45) 0%,
              hsla(25, 15%, 10%, 0.25) 35%,
              hsla(25, 15%, 10%, 0.35) 65%,
              hsla(25, 20%, 8%, 0.65) 100%
            )`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-body text-xs uppercase tracking-[0.35em] mb-6"
            style={{
              background: 'linear-gradient(90deg, hsl(43, 55%, 60%), hsl(45, 50%, 75%), hsl(43, 55%, 60%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Experiências Privadas de Luxo em Portugal
          </motion.p>

          {/* Main Headline - Sem ® */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.05] mb-8"
            style={{
              textShadow: '0 4px 30px hsla(25, 15%, 5%, 0.5)'
            }}
          >
            Do Luxo à Mesa
          </motion.h1>

          {/* Chrome Gold Separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="w-32 h-px mx-auto mb-8"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(43, 65%, 55%), hsl(45, 50%, 72%), hsl(43, 65%, 55%), transparent)',
              boxShadow: '0 0 16px hsla(42, 65%, 50%, 0.5)'
            }}
          />

          {/* Value Proposition */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="font-body text-base md:text-lg lg:text-xl text-white/95 max-w-3xl mx-auto mb-12 leading-relaxed"
            style={{
              textShadow: '0 2px 10px hsla(25, 15%, 5%, 0.6)'
            }}
          >
            Buffets premium e mesas decoradas que transformam qualquer espaço 
            numa celebração memorável.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <a
              href="#contacto"
              className="btn-chrome-gold"
            >
              Pedir Orçamento
            </a>
            <a
              href="#pacotes"
              className="font-body text-xs uppercase tracking-[0.2em] text-white border border-white/70 px-10 py-4 hover:bg-white/15 hover:border-white transition-all duration-500"
              style={{
                backdropFilter: 'blur(8px)'
              }}
            >
              Ver Pacotes
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-body text-[10px] uppercase tracking-[0.2em] text-white/70">
            Scroll
          </span>
          <div 
            className="w-px h-10"
            style={{
              background: 'linear-gradient(to bottom, hsl(43, 65%, 55%), transparent)'
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
