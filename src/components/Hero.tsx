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
          {/* Tagline - with subtle backdrop for readability */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-body text-[11px] uppercase tracking-[0.35em] mb-8 inline-block px-5 py-2 rounded-sm"
            style={{
              color: 'hsl(45, 35%, 98%)',
              textShadow: '0 1px 3px hsla(30, 15%, 5%, 0.4), 0 4px 12px hsla(30, 15%, 5%, 0.2)',
              backgroundColor: 'hsla(30, 15%, 10%, 0.25)',
              backdropFilter: 'blur(4px)',
            }}
          >
            Experiências Privadas de Luxo em Portugal
          </motion.p>

          {/* Main Headline - Magazine Cover Style */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.95] mb-10"
            style={{
              color: 'hsl(45, 40%, 99%)',
              textShadow: '0 2px 4px hsla(30, 15%, 5%, 0.3), 0 8px 30px hsla(30, 15%, 5%, 0.2)',
              fontWeight: 300,
              letterSpacing: '0.02em'
            }}
          >
            Do Luxo à Mesa
          </motion.h1>

          {/* Value Proposition - with subtle backdrop */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-body text-base md:text-lg max-w-2xl mx-auto mb-14 leading-relaxed font-light inline-block px-6 py-3 rounded-sm"
            style={{
              color: 'hsl(45, 35%, 98%)',
              textShadow: '0 1px 3px hsla(30, 15%, 5%, 0.4), 0 4px 12px hsla(30, 15%, 5%, 0.2)',
              backgroundColor: 'hsla(30, 15%, 10%, 0.2)',
              backdropFilter: 'blur(3px)',
            }}
          >
            Buffets premium e mesas decoradas que transformam qualquer espaço 
            numa celebração memorável.
          </motion.p>

          {/* CTA Buttons - Modern Luxury Style (Flat, No Gradients) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <a
              href="#contacto"
              className="btn-gold-flat font-body text-[11px] uppercase tracking-[0.18em] px-10 py-4"
            >
              Pedir Orçamento
            </a>
            <a
              href="#pacotes"
              className="font-body text-[11px] uppercase tracking-[0.18em] px-10 py-4 transition-all duration-300 border"
              style={{
                color: 'hsl(45, 40%, 99%)',
                borderColor: 'hsla(45, 35%, 98%, 0.7)',
                textShadow: '0 1px 3px hsla(30, 15%, 5%, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(45, 35%, 98%)';
                e.currentTarget.style.color = 'hsl(30, 15%, 18%)';
                e.currentTarget.style.textShadow = 'none';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'hsl(45, 40%, 99%)';
                e.currentTarget.style.textShadow = '0 1px 3px hsla(30, 15%, 5%, 0.3)';
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
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span 
            className="font-body text-[10px] uppercase tracking-[0.2em]"
            style={{
              color: 'hsla(45, 35%, 98%, 0.8)',
              textShadow: '0 1px 3px hsla(30, 15%, 5%, 0.3)',
            }}
          >
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
