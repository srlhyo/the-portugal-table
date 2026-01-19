import { motion } from "framer-motion";
import tableCandles from "@/assets/table-candles.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={tableCandles}
          alt="Mesa elegante com velas e decoração de luxo"
          className="w-full h-full object-cover"
        />
        {/* Light overlay to soften background */}
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Content - Centered Overlay Panel */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-2xl mx-auto"
        >
          {/* Main Card Panel */}
          <div className="bg-background/95 backdrop-blur-sm px-8 py-12 md:px-12 md:py-16 text-center shadow-luxury">
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 text-foreground"
            >
              Receba com elegância.
              <br />
              <span className="italic">Sem preocupações.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-body text-base md:text-lg text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed"
            >
              Levamos um buffet finger food totalmente montado e 
              decorado ao seu espaço.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mb-10"
            >
              <a
                href="#contacto"
                className="inline-block bg-foreground text-background font-body text-sm md:text-base px-8 py-4 hover:bg-foreground/90 transition-colors duration-300"
              >
                Quero orçamento para a minha data
              </a>
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
          </div>
        </motion.div>

        {/* Secondary Section - Below the card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="max-w-2xl mx-auto mt-16 md:mt-24 text-center pb-12"
        >
          {/* Three Phase List */}
          <div className="space-y-2 mb-6">
            <p className="font-display text-xl md:text-2xl italic text-foreground">
              Chegamos com tudo preparado.
            </p>
            <p className="font-display text-xl md:text-2xl italic text-foreground">
              Montamos no local.
            </p>
            <p className="font-display text-xl md:text-2xl italic text-foreground">
              Criamos a experiência.
            </p>
          </div>

          {/* Gold Separator */}
          <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />

          {/* Closing Text */}
          <p className="font-body text-sm md:text-base text-muted-foreground">
            Chegamos, montamos e deixamos tudo pronto para receber.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
