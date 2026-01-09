import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Sparkles, Crown, Wine, Gift } from "lucide-react";

const packages = [
  {
    name: "Essence",
    price: "420",
    advance: "10 dias",
    description: "A essência da elegância para momentos especiais.",
    features: [
      "Mesa decorada até 6 pessoas",
      "Finger food selecionado",
      "Louça e talheres premium",
      "Decoração floral simples",
      "Montagem e desmontagem",
    ],
    highlight: false,
  },
  {
    name: "Supreme",
    price: "680",
    advance: "14 dias",
    description: "Uma experiência elevada com todos os detalhes.",
    features: [
      "Mesa decorada até 10 pessoas",
      "Finger food gourmet variado",
      "Louça premium com detalhes dourados",
      "Arranjos florais completos",
      "Velas e iluminação ambiente",
      "Montagem e desmontagem",
      "Acompanhamento durante o evento",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: "890",
    advance: "21 dias",
    description: "O máximo do luxo para celebrações memoráveis.",
    features: [
      "Mesa decorada até 16 pessoas",
      "Menu finger food de autor",
      "Louça de porcelana exclusiva",
      "Decoração floral luxuosa",
      "Elementos decorativos especiais",
      "Iluminação e velas perfumadas",
      "Equipa presente durante o evento",
      "Bebidas de boas-vindas",
      "Fotografia do setup",
    ],
    highlight: false,
  },
];

const extras = [
  { 
    name: "Bubble Deluxe", 
    description: "Espumante premium e taças de cristal",
    icon: Wine
  },
  { 
    name: "Mesas Temáticas", 
    description: "Decoração personalizada para o seu tema",
    icon: Sparkles
  },
  { 
    name: "Aluguer de Material", 
    description: "Louça, talheres e decoração extra",
    icon: Crown
  },
  { 
    name: "Detalhes Especiais", 
    description: "Lembranças personalizadas para convidados",
    icon: Gift
  },
];

const Packages = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="pacotes" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
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
            Investimento
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Pacotes
          </h2>
          <div 
            className="w-16 h-px mx-auto mb-6"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(43, 65%, 50%), hsl(45, 50%, 68%), hsl(43, 65%, 50%), transparent)',
              boxShadow: '0 0 8px hsla(42, 65%, 45%, 0.3)'
            }}
          />
          <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
            Escolha a experiência que melhor se adapta ao seu momento especial.
            Cada pacote inclui toda a magia que merece.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`relative p-8 lg:p-10 transition-all duration-500 ${
                pkg.highlight
                  ? "bg-primary text-primary-foreground border-2"
                  : "bg-card border border-border hover:border-gold/50"
              }`}
              style={pkg.highlight ? {
                borderImage: 'linear-gradient(135deg, hsl(40, 70%, 35%), hsl(43, 65%, 50%), hsl(45, 50%, 68%), hsl(43, 65%, 50%), hsl(40, 70%, 35%)) 1'
              } : {}}
            >
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span 
                    className="font-body text-[10px] uppercase tracking-[0.2em] px-4 py-2"
                    style={{
                      background: 'linear-gradient(135deg, hsl(40, 70%, 35%), hsl(43, 65%, 50%), hsl(45, 50%, 68%), hsl(43, 65%, 50%), hsl(40, 70%, 35%))',
                      color: 'hsl(25, 15%, 12%)',
                      boxShadow: '0 2px 8px hsla(42, 65%, 45%, 0.4)'
                    }}
                  >
                    Mais Popular
                  </span>
                </div>
              )}

              {/* Package Name */}
              <h3 className={`font-display text-3xl mb-2 ${
                pkg.highlight ? "text-primary-foreground" : "text-foreground"
              }`}>
                {pkg.name}
              </h3>

              {/* Price - Chrome Gold */}
              <div className="mb-4">
                <span 
                  className="font-display text-5xl lg:text-6xl"
                  style={{
                    background: 'linear-gradient(135deg, hsl(40, 70%, 35%), hsl(43, 65%, 50%), hsl(45, 50%, 68%), hsl(43, 65%, 50%), hsl(40, 70%, 35%))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {pkg.price}€
                </span>
              </div>

              {/* Advance Notice */}
              <p className={`font-body text-xs uppercase tracking-[0.15em] mb-6 ${
                pkg.highlight ? "text-primary-foreground/70" : "text-muted-foreground"
              }`}>
                Reserva com {pkg.advance} de antecedência
              </p>

              {/* Description */}
              <p className={`font-body text-sm mb-8 leading-relaxed ${
                pkg.highlight ? "text-primary-foreground/80" : "text-muted-foreground"
              }`}>
                {pkg.description}
              </p>

              {/* Separator */}
              <div className={`w-full h-px mb-8 ${
                pkg.highlight ? "bg-primary-foreground/20" : "bg-border"
              }`} />

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check 
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{
                        color: 'hsl(42, 65%, 45%)'
                      }}
                    />
                    <span className={`font-body text-sm ${
                      pkg.highlight ? "text-primary-foreground/90" : "text-muted-foreground"
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contacto"
                className={`block text-center font-body text-xs uppercase tracking-[0.2em] py-4 transition-all duration-500 ${
                  pkg.highlight
                    ? "btn-chrome-gold"
                    : "border border-gold text-gold hover:bg-gold hover:text-primary"
                }`}
              >
                Reservar Data
              </a>
            </motion.div>
          ))}
        </div>

        {/* Extras Section - Premium Upgrade Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-card border border-border p-10 lg:p-16"
        >
          <div className="text-center mb-12">
            <span 
              className="font-body text-xs uppercase tracking-[0.3em] mb-4 block"
              style={{
                background: 'linear-gradient(90deg, hsl(42, 65%, 45%), hsl(43, 55%, 58%), hsl(42, 65%, 45%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Eleve a Sua Experiência
            </span>
            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-4">
              Extras Disponíveis
            </h3>
            <div 
              className="w-12 h-px mx-auto"
              style={{
                background: 'linear-gradient(90deg, transparent, hsl(43, 65%, 50%), transparent)',
                boxShadow: '0 0 8px hsla(42, 65%, 45%, 0.3)'
              }}
            />
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {extras.map((extra, index) => (
              <motion.div
                key={extra.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                {/* Icon with chrome gold effect */}
                <div 
                  className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border transition-all duration-500 group-hover:shadow-gold"
                  style={{
                    borderImage: 'linear-gradient(135deg, hsl(40, 70%, 35%), hsl(43, 65%, 50%), hsl(45, 50%, 68%)) 1'
                  }}
                >
                  <extra.icon 
                    className="w-7 h-7 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      stroke: 'url(#gold-gradient)',
                      color: 'hsl(42, 65%, 45%)'
                    }}
                  />
                </div>
                <h4 className="font-display text-xl text-foreground mb-3">
                  {extra.name}
                </h4>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {extra.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          {/* SVG Gradient Definition */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(40, 70%, 35%)" />
                <stop offset="50%" stopColor="hsl(45, 50%, 68%)" />
                <stop offset="100%" stopColor="hsl(40, 70%, 35%)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default Packages;
