import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Pedido",
    description: "Entre em contacto connosco através do formulário ou WhatsApp. Diga-nos a data, o tipo de evento e quantos convidados espera.",
  },
  {
    number: "02",
    title: "Orçamento",
    description: "Analisamos o seu pedido e enviamos um orçamento personalizado no prazo de 24 horas, com todas as opções disponíveis.",
  },
  {
    number: "03",
    title: "Confirmação",
    description: "Após aprovação do orçamento, reservamos a sua data com um sinal de 50%. O restante é pago no dia do evento.",
  },
  {
    number: "04",
    title: "O Grande Dia",
    description: "Chegamos à sua casa, montamos tudo com cuidado e atenção. Depois do evento, tratamos de tudo — você só desfruta.",
  },
];

const HowItWorks = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="como-funciona" className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4 block">
            Processo
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Como Funciona
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <p className="font-body text-sm md:text-base text-foreground/70 leading-relaxed">
            Do primeiro contacto ao último detalhe, tornamos tudo simples para si.
            Nós tratamos de tudo — você só precisa de desfrutar.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border z-0" />
              )}

              {/* Step Content */}
              <div className="relative z-10">
                {/* Number */}
                <div className="mb-6">
                  <span className="font-display text-6xl lg:text-7xl text-gold/30">
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl text-foreground mb-4">
                  {step.title}
                </h3>

                {/* Separator */}
                <div className="w-12 h-px bg-gold mb-4" />

                {/* Description */}
                <p className="font-body text-sm text-foreground/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="font-body text-sm text-foreground/60 mb-6">
            Pronta para criar o seu momento especial?
          </p>
          <a
            href="#contacto"
            className="inline-block font-body text-xs uppercase tracking-[0.25em] bg-gold text-primary px-10 py-4 hover:bg-gold-dark transition-all duration-500"
          >
            Pedir Orçamento
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
