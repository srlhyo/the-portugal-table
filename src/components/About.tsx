import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      title: "Boutique",
      description: "Cada experiência é pensada e criada de forma única para si.",
    },
    {
      title: "Editorial",
      description: "Estética de revista em cada detalhe da sua mesa.",
    },
    {
      title: "Emocional",
      description: "Criamos momentos que tocam o coração.",
    },
  ];

  return (
    <section id="sobre" className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Quote/Philosophy */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-8 block">
              A Nossa Filosofia
            </span>
            <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground italic leading-snug mb-8">
              "Transformamos a sua casa num cenário de sonho, onde cada detalhe conta uma história de elegância."
            </blockquote>
            <div className="w-24 h-px bg-gold mb-8" />
            <p className="font-body text-sm md:text-base text-foreground/70 leading-relaxed mb-6">
              Do Luxo à Mesa® nasceu da paixão por criar experiências que vão além do 
              convencional. Não somos um serviço de catering — somos artesãos de momentos, 
              curadores de beleza, criadores de memórias.
            </p>
            <p className="font-body text-sm md:text-base text-foreground/70 leading-relaxed">
              Cada mesa que preparamos é uma tela em branco onde pintamos sonhos. 
              Cada finger food é uma pequena obra de arte comestível. Cada celebração 
              que tocamos torna-se inesquecível.
            </p>
          </motion.div>

          {/* Right: Values */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="border-l-2 border-gold pl-8">
              <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                Para Quem Criamos
              </h3>
              <p className="font-body text-sm text-foreground/70">
                Mulheres que apreciam a arte de receber bem. Anfitriãs que querem 
                surpreender sem o stress de organizar. Pessoas que valorizam o belo 
                e o único.
              </p>
            </div>

            <div className="grid gap-6 pt-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-gold mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-display text-xl text-foreground mb-1 group-hover:text-gold transition-colors">
                        {value.title}
                      </h4>
                      <p className="font-body text-sm text-foreground/60">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Signature */}
            <div className="pt-8 border-t border-border">
              <p className="font-accent text-2xl text-gold">Do Luxo à Mesa®</p>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-foreground/50 mt-2">
                Experiências de Mesa · Portugal
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
