import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Package, Sparkles, Heart } from "lucide-react";

const phases = [
  {
    icon: Package,
    text: "Chegamos com tudo preparado.",
    delay: 0,
  },
  {
    icon: Sparkles,
    text: "Montamos no local.",
    delay: 0.15,
  },
  {
    icon: Heart,
    text: "Criamos a experiência.",
    delay: 0.3,
  },
];

const ThreePhases = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-body mb-4 block">
            Como funciona
          </span>
          <div className="w-12 h-px bg-gold mx-auto" />
        </motion.div>

        {/* Three Phases Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: phase.delay }}
              className="text-center group"
            >
              {/* Icon Container */}
              <div className="mb-6 inline-flex items-center justify-center">
                <div className="relative">
                  {/* Gold circle background */}
                  <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold/60 transition-colors duration-300">
                    <phase.icon 
                      className="w-6 h-6 text-gold" 
                      strokeWidth={1.5}
                    />
                  </div>
                  {/* Step number */}
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-gold text-background text-xs font-body flex items-center justify-center rounded-full">
                    {index + 1}
                  </span>
                </div>
              </div>

              {/* Phase Text */}
              <h3 className="font-display text-xl md:text-2xl text-foreground leading-relaxed">
                {phase.text}
              </h3>

              {/* Subtle gold accent line */}
              <div className="w-8 h-px bg-gold/40 mx-auto mt-6 group-hover:w-12 group-hover:bg-gold transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16 font-body text-muted-foreground text-sm md:text-base max-w-lg mx-auto"
        >
          Chegamos, montamos e deixamos tudo pronto para receber os seus convidados.
        </motion.p>
      </div>
    </section>
  );
};

export default ThreePhases;
