import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import tableCandles from "@/assets/table-candles.jpg";
import { useCart } from "@/contexts/CartContext";

const Hero = () => {
  const { setIsOpen } = useCart();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={tableCandles}
          alt="Mesa elegante com velas e decoração de luxo"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-2xl mx-auto"
        >
          {/* Main Card Panel */}
          <div className="bg-background/95 backdrop-blur-sm px-8 py-12 md:px-14 md:py-16 text-center shadow-luxury border border-gold/10">
            {/* Gold accent line */}
            <div className="w-16 h-px bg-gold mx-auto mb-8" />

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 text-foreground"
            >
              Receba com elegância.
              <br />
              <span className="italic text-foreground/90">Sem preocupações.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-body text-base md:text-lg text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed"
            >
              Levamos ao seu espaço um buffet finger food totalmente montado e
              decorado.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
            >
              {/* Primary CTA - Open Cart */}
              <button
                onClick={() => {
                  setIsOpen(true);
                  setTimeout(() => {
                    const packagesSection = document.getElementById('pacotes');
                    if (packagesSection) {
                      packagesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
                className="inline-flex items-center justify-center gap-2 bg-foreground text-background font-body text-sm md:text-base px-8 py-4 hover:bg-foreground/90 transition-colors duration-300 w-full sm:w-auto"
              >
                <ShoppingBag className="w-4 h-4" />
                Começar reserva
              </button>
            </motion.div>

            {/* Three Features with Gold Diamonds */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm"
            >
              <div className="flex items-center gap-2">
                <span className="text-gold text-xs">◆</span>
                <span className="font-body text-muted-foreground">Montagem completa</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gold text-xs">◆</span>
                <span className="font-body text-muted-foreground">Estética personalizada</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gold text-xs">◆</span>
                <span className="font-body text-muted-foreground">Experiência premium</span>
              </div>
            </motion.div>

            {/* Bottom gold accent */}
            <div className="w-16 h-px bg-gold mx-auto mt-10" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
