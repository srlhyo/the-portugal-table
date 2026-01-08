import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

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
  { name: "Bubble Deluxe", description: "Espumante premium e taças de cristal" },
  { name: "Mesas Temáticas", description: "Decoração personalizada para o seu tema" },
  { name: "Aluguer de Material", description: "Louça, talheres e decoração extra" },
  { name: "Detalhes Especiais", description: "Lembranças personalizadas para convidados" },
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
          <span className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4 block">
            Investimento
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Pacotes
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <p className="font-body text-sm md:text-base text-foreground/70 leading-relaxed">
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
                  ? "bg-primary text-primary-foreground border-2 border-gold"
                  : "bg-card border border-border hover:border-gold/50"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="font-body text-[10px] uppercase tracking-[0.2em] bg-gold text-primary px-4 py-2">
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

              {/* Price */}
              <div className="mb-4">
                <span className={`font-display text-5xl lg:text-6xl ${
                  pkg.highlight ? "text-gold" : "text-gold"
                }`}>
                  {pkg.price}€
                </span>
              </div>

              {/* Advance Notice */}
              <p className={`font-body text-xs uppercase tracking-[0.15em] mb-6 ${
                pkg.highlight ? "text-primary-foreground/70" : "text-foreground/60"
              }`}>
                Reserva com {pkg.advance} de antecedência
              </p>

              {/* Description */}
              <p className={`font-body text-sm mb-8 leading-relaxed ${
                pkg.highlight ? "text-primary-foreground/80" : "text-foreground/70"
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
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      pkg.highlight ? "text-gold" : "text-gold"
                    }`} />
                    <span className={`font-body text-sm ${
                      pkg.highlight ? "text-primary-foreground/90" : "text-foreground/70"
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
                    ? "bg-gold text-primary hover:bg-gold-light"
                    : "border border-gold text-gold hover:bg-gold hover:text-primary"
                }`}
              >
                Reservar Data
              </a>
            </motion.div>
          ))}
        </div>

        {/* Extras Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-secondary p-8 lg:p-12"
        >
          <h3 className="font-display text-2xl md:text-3xl text-foreground text-center mb-8">
            Extras Disponíveis
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {extras.map((extra, index) => (
              <motion.div
                key={extra.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-2 h-2 bg-gold mx-auto mb-4" />
                <h4 className="font-display text-lg text-foreground mb-2">
                  {extra.name}
                </h4>
                <p className="font-body text-xs text-foreground/60">
                  {extra.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Packages;
