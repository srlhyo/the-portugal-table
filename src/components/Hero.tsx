import { motion } from "framer-motion";
import brunchRoses from "@/assets/brunch-roses.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Bright, Vibrant, Glamorous */}
      <div className="absolute inset-0">
        <img
          src={brunchRoses}
          alt="Buffet de luxo com rosas e decoração elegante"
          className="w-full h-full object-cover"
        />
        {/* Very subtle overlay - keeping the image bright and alive */}
        <div className="absolute inset-0 hero-overlay-light" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center pt-20">
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
            className="font-body text-[11px] uppercase tracking-[0.35em] mb-8 text-white/90"
            style={{
              textShadow: '0 2px 10px hsla(30, 15%, 5%, 0.3)'
            }}
          >
            Experiências Privadas de Luxo em Portugal
          </motion.p>

          {/* Main Headline - Magazine Cover Style */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white leading-[0.95] mb-10"
            style={{
              textShadow: '0 4px 30px hsla(30, 15%, 5%, 0.25)',
              fontWeight: 300,
              letterSpacing: '0.02em'
            }}
          >
            Do Luxo à Mesa
          </motion.h1>

          {/* Value Proposition */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-body text-base md:text-lg text-white/95 max-w-2xl mx-auto mb-14 leading-relaxed font-light"
            style={{
              textShadow: '0 2px 10px hsla(30, 15%, 5%, 0.3)'
            }}
          >
            Buffets premium e mesas decoradas que transformam qualquer espaço 
            numa celebração memorável.
          </motion.p>

          {/* CTA Buttons - Modern Luxury Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
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
              className="font-body text-[11px] uppercase tracking-[0.18em] text-white border border-white/60 px-10 py-4 hover:bg-white hover:text-foreground transition-all duration-400"
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
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="font-body text-[10px] uppercase tracking-[0.2em] text-white/70">
            Scroll
          </span>
          <div 
            className="w-px h-8"
            style={{
              background: 'linear-gradient(to bottom, hsl(38, 40%, 65%), transparent)'
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
