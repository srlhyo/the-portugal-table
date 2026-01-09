import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, FileText, CreditCard, PartyPopper } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Pedido",
    description: "Entre em contacto connosco através do formulário ou WhatsApp. Diga-nos a data, o tipo de evento e quantos convidados espera.",
    icon: MessageCircle
  },
  {
    number: "02",
    title: "Orçamento",
    description: "Analisamos o seu pedido e enviamos um orçamento personalizado no prazo de 24 horas, com todas as opções disponíveis.",
    icon: FileText
  },
  {
    number: "03",
    title: "Confirmação",
    description: "Após aprovação do orçamento, reservamos a sua data com um sinal de 50%. O restante é pago no dia do evento.",
    icon: CreditCard
  },
  {
    number: "04",
    title: "O Grande Dia",
    description: "Chegamos à sua casa, montamos tudo com cuidado e atenção. Depois do evento, tratamos de tudo — você só desfruta.",
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
            Nós tratamos de tudo — você só precisa de desfrutar.
          </p>
        </motion.div>

        {/* Steps - Premium Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative group"
            >
              {/* Connector Line - Desktop */}
              {index < steps.length - 1 && (
                <div 
                  className="hidden lg:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-60px)] h-px z-0"
                  style={{
                    background: 'linear-gradient(90deg, hsl(42, 65%, 45%), hsl(43, 55%, 58%), hsl(42, 65%, 45%))',
                    opacity: 0.3
                  }}
                />
              )}

              {/* Step Card */}
              <div className="relative z-10 bg-background border border-border p-8 transition-all duration-500 group-hover:border-gold/50 group-hover:shadow-luxury">
                {/* Icon */}
                <div 
                  className="w-20 h-20 mx-auto mb-6 flex items-center justify-center transition-all duration-500"
                  style={{
                    background: 'linear-gradient(135deg, hsla(42, 65%, 45%, 0.1), hsla(45, 50%, 68%, 0.15), hsla(42, 65%, 45%, 0.1))',
                    border: '1px solid hsla(42, 65%, 45%, 0.3)'
                  }}
                >
                  <step.icon 
                    className="w-8 h-8"
                    style={{ color: 'hsl(42, 65%, 45%)' }}
                  />
                </div>

                {/* Number - Chrome Gold */}
                <div className="text-center mb-4">
                  <span 
                    className="font-display text-4xl"
                    style={{
                      background: 'linear-gradient(135deg, hsl(40, 70%, 35%), hsl(43, 65%, 50%), hsl(45, 50%, 68%), hsl(43, 65%, 50%), hsl(40, 70%, 35%))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl text-foreground text-center mb-4">
                  {step.title}
                </h3>

                {/* Separator */}
                <div 
                  className="w-12 h-px mx-auto mb-4"
                  style={{
                    background: 'linear-gradient(90deg, transparent, hsl(43, 65%, 50%), transparent)',
                  }}
                />

                {/* Description */}
                <p className="font-body text-sm text-muted-foreground leading-relaxed text-center">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-16 border-t border-border"
        >
          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
            <div className="text-center">
              <span 
                className="font-display text-3xl block mb-2"
                style={{
                  background: 'linear-gradient(135deg, hsl(40, 70%, 35%), hsl(43, 65%, 50%), hsl(45, 50%, 68%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                24h
              </span>
              <p className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground">
                Resposta Garantida
              </p>
            </div>
            <div className="text-center">
              <span 
                className="font-display text-3xl block mb-2"
                style={{
                  background: 'linear-gradient(135deg, hsl(40, 70%, 35%), hsl(43, 65%, 50%), hsl(45, 50%, 68%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                50%
              </span>
              <p className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground">
                Sinal Para Reservar
              </p>
            </div>
            <div className="text-center">
              <span 
                className="font-display text-3xl block mb-2"
                style={{
                  background: 'linear-gradient(135deg, hsl(40, 70%, 35%), hsl(43, 65%, 50%), hsl(45, 50%, 68%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                100%
              </span>
              <p className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground">
                Montagem Incluída
              </p>
            </div>
          </div>
          
          <p className="font-body text-sm text-muted-foreground mb-8">
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
