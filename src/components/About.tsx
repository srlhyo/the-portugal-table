import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import brunchGold from "@/assets/brunch-gold.jpg";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Image */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={brunchGold}
                alt="Mesa elegante com louça dourada"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-gold -z-10" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-8 block">
              Quem Somos
            </span>
            
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Criamos Experiências, Não Eventos
            </h2>
            
            <div className="w-16 h-px bg-gold mb-8" />
            
            <p className="font-body text-sm md:text-base text-foreground/70 leading-relaxed mb-6">
              <strong className="text-foreground">Do Luxo à Mesa®</strong> nasceu da paixão por criar 
              momentos extraordinários. Não somos um serviço de catering — somos uma marca de 
              lifestyle que transforma celebrações íntimas em experiências visuais e emocionais.
            </p>
            
            <p className="font-body text-sm md:text-base text-foreground/70 leading-relaxed mb-6">
              Vamos à sua casa e criamos um cenário de sonho: mesas estilizadas com louça premium, 
              talheres dourados, arranjos florais e finger food gourmet. Tratamos de tudo — desde 
              a decoração até à limpeza.
            </p>

            <p className="font-body text-sm md:text-base text-foreground/70 leading-relaxed mb-8">
              O nosso objectivo é simples: que desfrute do seu momento sem preocupações.
              <span className="block mt-2 font-display text-lg text-foreground italic">
                Luxo sem ostentação. Beleza sem stress.
              </span>
            </p>

            {/* Values */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <span className="font-display text-3xl text-gold">100+</span>
                <p className="font-body text-xs uppercase tracking-[0.15em] text-foreground/60 mt-2">
                  Eventos
                </p>
              </div>
              <div className="text-center">
                <span className="font-display text-3xl text-gold">5★</span>
                <p className="font-body text-xs uppercase tracking-[0.15em] text-foreground/60 mt-2">
                  Avaliação
                </p>
              </div>
              <div className="text-center">
                <span className="font-display text-3xl text-gold">PT</span>
                <p className="font-body text-xs uppercase tracking-[0.15em] text-foreground/60 mt-2">
                  Portugal
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
