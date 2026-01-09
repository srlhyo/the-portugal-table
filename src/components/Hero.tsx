import { motion } from "framer-motion";
import tableCandles from "@/assets/table-candles.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={tableCandles}
          alt="Mesa elegante com velas e decoração dourada"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for legibility - critical for premium feel */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to bottom,
              hsla(25, 15%, 8%, 0.55) 0%,
              hsla(25, 15%, 8%, 0.35) 40%,
              hsla(25, 15%, 8%, 0.45) 70%,
              hsla(25, 15%, 8%, 0.75) 100%
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
          className="max-w-4xl mx-auto"
        >
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-body text-xs uppercase tracking-[0.35em] mb-8"
            style={{
              background: 'linear-gradient(90deg, hsl(43, 55%, 55%), hsl(45, 50%, 70%), hsl(43, 55%, 55%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 2px 4px hsla(40, 70%, 35%, 0.2)'
            }}
          >
            Experiências Privadas de Luxo em Portugal
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.1] mb-6"
            style={{
              textShadow: '0 2px 20px hsla(25, 15%, 10%, 0.5)'
            }}
          >
            Do Luxo à Mesa
            <span 
              className="inline-block ml-2"
              style={{
                background: 'linear-gradient(135deg, hsl(40, 70%, 35%), hsl(43, 65%, 50%), hsl(45, 50%, 68%), hsl(43, 65%, 50%), hsl(40, 70%, 35%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >®</span>
          </motion.h1>

          {/* Separator - Chrome Gold */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="w-24 h-px mx-auto mb-8"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(43, 65%, 50%), hsl(45, 50%, 68%), hsl(43, 65%, 50%), transparent)',
              boxShadow: '0 0 12px hsla(42, 65%, 45%, 0.4)'
            }}
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="font-display text-xl md:text-2xl lg:text-3xl text-white/95 italic mb-12"
            style={{
              textShadow: '0 2px 8px hsla(25, 15%, 10%, 0.4)'
            }}
          >
            Luxo sem ostentação. Beleza sem stress.
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="font-body text-sm md:text-base text-white/85 max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{
              textShadow: '0 1px 4px hsla(25, 15%, 10%, 0.5)'
            }}
          >
            Criamos experiências de mesa únicas na sua casa. 
            Mesas estilizadas, finger food de luxo e momentos que ficam para sempre.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
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
              className="font-body text-xs uppercase tracking-[0.2em] text-white border border-white/60 px-10 py-4 hover:bg-white/10 hover:border-white transition-all duration-500"
              style={{
                backdropFilter: 'blur(4px)'
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
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-body text-[10px] uppercase tracking-[0.2em] text-white/60">
            Scroll
          </span>
          <div 
            className="w-px h-12"
            style={{
              background: 'linear-gradient(to bottom, hsl(43, 65%, 50%), transparent)'
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
