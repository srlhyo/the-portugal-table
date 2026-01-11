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
          <span 
            className="font-body text-xs uppercase tracking-[0.3em] mb-4 block"
            style={{
              background: 'linear-gradient(90deg, hsl(42, 65%, 45%), hsl(43, 55%, 58%), hsl(42, 65%, 45%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Processo Simples
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Como Funciona
          </h2>
          <div 
            className="w-16 h-px mx-auto mb-6"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(43, 65%, 50%), hsl(45, 50%, 68%), hsl(43, 65%, 50%), transparent)',
              boxShadow: '0 0 8px hsla(42, 65%, 45%, 0.3)'
            }}
          />
          <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
            Do primeiro contacto ao último detalhe, tornamos tudo simples para si.
          </p>
        </motion.div>

        {/* Steps - Horizontal Timeline */}
        <div className="grid md:grid-cols-4 gap-8 lg:gap-4 relative">
          {/* Connecting Line - Desktop */}
          <div 
            className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-px z-0"
            style={{
              background: 'linear-gradient(90deg, hsl(42, 65%, 45%), hsl(43, 55%, 58%), hsl(42, 65%, 45%))',
              opacity: 0.4
            }}
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
              {/* Number Circle */}
              <div 
                className="w-20 h-20 mx-auto mb-8 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, hsl(40, 70%, 35%), hsl(43, 65%, 50%), hsl(45, 50%, 68%), hsl(43, 65%, 50%), hsl(40, 70%, 35%))',
                  boxShadow: '0 4px 20px hsla(42, 65%, 45%, 0.4)'
                }}
              >
                <span 
                  className="font-display text-3xl"
                  style={{ color: 'hsl(25, 15%, 12%)' }}
                >
                  {step.number}
                </span>
              </div>

              {/* Icon */}
              <div 
                className="w-12 h-12 mx-auto mb-6 flex items-center justify-center border"
                style={{
                  borderImage: 'linear-gradient(135deg, hsl(40, 70%, 35%), hsl(43, 65%, 50%), hsl(45, 50%, 68%)) 1'
                }}
              >
                <step.icon 
                  className="w-5 h-5"
                  style={{ color: 'hsl(42, 65%, 48%)' }}
                />
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl text-foreground mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
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
          <p className="font-body text-sm text-muted-foreground mb-6">
            Pronta para criar o seu momento especial?
          </p>
          <a
            href="#contacto"
            className="inline-block btn-chrome-gold"
          >
            Pedir Orçamento
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
