import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Sparkles, Armchair, Lightbulb, PartyPopper, Lamp, Wind, Zap } from "lucide-react";

const packages = [
  {
    name: "Essence",
    size: "180 cm",
    pieces: "180 peças",
    guests: "Até 20 convidados",
    price: "420",
    highlight: false,
  },
  {
    name: "Supreme",
    size: "360 cm",
    pieces: "300 peças",
    guests: "Até 35 convidados",
    price: "690",
    highlight: true,
  },
  {
    name: "Premium",
    size: "360 cm",
    pieces: "500 peças",
    guests: "Até 50 convidados",
    price: "890",
    highlight: false,
  },
];

const extras = [
  { name: "Cubos de Exposição", icon: Sparkles },
  { name: "Jarros Dourados", icon: Lamp },
  { name: "Cadeiras Acrílicas", icon: Armchair },
  { name: "Barras VIP", icon: PartyPopper },
  { name: "Dispensadores", icon: Sparkles },
  { name: "Luzes Ambiente", icon: Lightbulb },
  { name: "Luz UV", icon: Zap },
  { name: "Máquina de Faíscas", icon: Sparkles },
  { name: "Máquina de Fumo", icon: Wind },
  { name: "Iluminação Decorativa", icon: Lamp },
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
            Buffet de Finger Food
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
            Escolha o pacote ideal para o seu evento. Cada um inclui montagem completa do buffet 
            com decoração e finger food premium.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-24">
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
              <h3 className={`font-display text-3xl lg:text-4xl mb-2 text-center ${
                pkg.highlight ? "text-primary-foreground" : "text-foreground"
              }`}>
                {pkg.name}
              </h3>

              {/* Separator */}
              <div 
                className="w-12 h-px mx-auto mb-6"
                style={{
                  background: pkg.highlight 
                    ? 'linear-gradient(90deg, transparent, hsl(43, 55%, 60%), transparent)'
                    : 'linear-gradient(90deg, transparent, hsl(43, 65%, 50%), transparent)'
                }}
              />

              {/* Details */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-center gap-2">
                  <Check 
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: 'hsl(42, 65%, 48%)' }}
                  />
                  <span className={`font-body text-sm ${
                    pkg.highlight ? "text-primary-foreground/90" : "text-muted-foreground"
                  }`}>
                    Buffet de Finger Food — {pkg.size}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Check 
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: 'hsl(42, 65%, 48%)' }}
                  />
                  <span className={`font-body text-sm ${
                    pkg.highlight ? "text-primary-foreground/90" : "text-muted-foreground"
                  }`}>
                    {pkg.pieces}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Check 
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: 'hsl(42, 65%, 48%)' }}
                  />
                  <span className={`font-body text-sm ${
                    pkg.highlight ? "text-primary-foreground/90" : "text-muted-foreground"
                  }`}>
                    {pkg.guests}
                  </span>
                </div>
              </div>

              {/* Price - Chrome Gold */}
              <div className="text-center mb-8">
                <span className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                  Desde
                </span>
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

              {/* CTA */}
              <a
                href="#contacto"
                className={`block text-center font-body text-xs uppercase tracking-[0.2em] py-4 transition-all duration-500 ${
                  pkg.highlight
                    ? "btn-chrome-gold"
                    : "border border-gold text-gold hover:bg-gold hover:text-primary"
                }`}
              >
                Reservar
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
              Adicionar ao Evento
            </span>
            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-4">
              Extras & Aluguer
            </h3>
            <div 
              className="w-12 h-px mx-auto mb-6"
              style={{
                background: 'linear-gradient(90deg, transparent, hsl(43, 65%, 50%), transparent)',
                boxShadow: '0 0 8px hsla(42, 65%, 45%, 0.3)'
              }}
            />
            <p className="font-body text-sm text-muted-foreground max-w-xl mx-auto">
              Material de aluguer disponível para elevar ainda mais o seu evento.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {extras.map((extra, index) => (
              <motion.div
                key={extra.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                {/* Icon */}
                <div 
                  className="w-14 h-14 mx-auto mb-4 flex items-center justify-center border transition-all duration-500 group-hover:shadow-gold"
                  style={{
                    borderImage: 'linear-gradient(135deg, hsl(40, 70%, 35%), hsl(43, 65%, 50%), hsl(45, 50%, 68%)) 1'
                  }}
                >
                  <extra.icon 
                    className="w-6 h-6 transition-transform duration-500 group-hover:scale-110"
                    style={{ color: 'hsl(42, 65%, 48%)' }}
                  />
                </div>
                <p className="font-body text-xs uppercase tracking-[0.1em] text-foreground">
                  {extra.name}
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
