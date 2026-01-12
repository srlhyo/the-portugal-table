import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, FileText, CreditCard, PartyPopper } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Pedido",
    description: "Escolha o que pretende: buffet, decoração ou ambos. Contacte-nos por formulário ou WhatsApp.",
    icon: MessageCircle
  },
  {
    number: "02",
    title: "Orçamento",
    description: "Recebe proposta personalizada em 24 horas com todas as opções e extras disponíveis.",
    icon: FileText
  },
  {
    number: "03",
    title: "Confirmação",
    description: "Reserva a data com 50% de sinal. O restante é pago no dia do evento.",
    icon: CreditCard
  },
  {
    number: "04",
    title: "Evento",
    description: "Chegamos, montamos tudo e criamos a experiência. No fim, desmontamos. O cliente só desfruta.",
    icon: PartyPopper
  },
];

const HowItWorks = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="como-funciona" className="py-28 lg:py-36 bg-card">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="font-body text-[11px] uppercase tracking-[0.25em] mb-5 block text-gold">
            Processo Simples
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 font-light">
            Como Funciona
          </h2>
          <div className="separator-gold mx-auto mb-8" />
          <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed font-light">
            Do primeiro contacto ao último detalhe, tornamos tudo simples para si.
          </p>
        </motion.div>

        {/* Steps - Horizontal Timeline */}
        <div className="grid md:grid-cols-4 gap-10 lg:gap-6 relative">
          {/* Connecting Line - Desktop */}
          <div 
            className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px z-0 bg-gold/25"
          />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative z-10 text-center"
            >
              {/* Number Square - Flat, no gradient */}
              <div 
                className="w-16 h-16 mx-auto mb-8 flex items-center justify-center step-number-gold"
              >
                <span className="font-display text-2xl font-light">
                  {step.number}
                </span>
              </div>

              {/* Icon */}
              <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center border border-gold/40">
                <step.icon className="w-5 h-5 text-gold" />
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl text-foreground mb-4 font-light">
                {step.title}
              </h3>

              {/* Description */}
              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto font-light">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="font-body text-sm text-muted-foreground mb-6 font-light">
            Pronta para criar o seu momento especial?
          </p>
          <a
            href="#contacto"
            className="inline-block btn-gold-flat"
          >
            Pedir Orçamento
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
