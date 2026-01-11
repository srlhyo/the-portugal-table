import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Users, Ruler, Sparkles } from "lucide-react";

// Import images for extras
import cocktailsElegant from "@/assets/cocktails-elegant.jpg";
import tableChristmas from "@/assets/table-christmas.jpg";
import tableTea from "@/assets/table-tea.jpg";
import dinnerFormal from "@/assets/dinner-formal.jpg";
import brunchGold from "@/assets/brunch-gold.jpg";
import tableEaster from "@/assets/table-easter.jpg";

const packages = [
  {
    name: "Essence",
    size: "180 cm",
    pieces: "180 peças",
    guests: "Até 20 convidados",
    price: "420",
    highlight: false,
    items: [
      "Mini salgados",
      "Mini hambúrgueres",
      "Mini cachorros",
      "Mini pizzas",
      "Mini barquinhos de frango & chips",
      "Cones de fruta",
      "Mini sobremesas (brigadeiros, cupcakes)"
    ],
    includes: [
      "Águas aromatizadas / sumos",
      "Montagem e apresentação",
      "Montagem e desmontagem"
    ]
  },
  {
    name: "Supreme",
    size: "360 cm",
    pieces: "300 peças",
    guests: "Até 35 convidados",
    price: "690",
    highlight: true,
    items: [
      "Mini salgados",
      "Mini hambúrgueres",
      "Mini cachorros",
      "Mini pizzas",
      "Mini barquinhos frango & chips",
      "Cones de fruta",
      "Crepes chineses",
      "Copos de salada César",
      "Mini sobremesas",
      "Brigadeiros",
      "Donuts personalizados"
    ],
    includes: [
      "Águas aromatizadas / sumos",
      "Montagem e apresentação",
      "Montagem e desmontagem"
    ]
  },
  {
    name: "Premium",
    size: "360 cm",
    pieces: "500 peças",
    guests: "Até 50 convidados",
    price: "890",
    highlight: false,
    items: [
      "Mini salgados",
      "Mini hambúrgueres",
      "Mini pizzas",
      "Barquinhos de frango & chips",
      "Cones de fruta",
      "Crepes chineses",
      "Copos de salada César",
      "Canudos de camarão",
      "Tábuas de queijos",
      "Sobremesas de copo",
      "Brigadeiros",
      "Donuts personalizados"
    ],
    includes: [
      "6L águas aromatizadas ou sumos",
      "Máquina de faíscas",
      "Gelo seco",
      "Montagem e desmontagem",
      "2 elementos de staff para reposição"
    ]
  },
];

const extras = [
  { name: "Cubos de Exposição", image: cocktailsElegant },
  { name: "Jarros Dourados", image: tableChristmas },
  { name: "Cadeiras Acrílicas", image: tableTea },
  { name: "Barras VIP", image: dinnerFormal },
  { name: "Dispensadores de Bebidas", image: brunchGold },
  { name: "Luzes Ambiente", image: tableEaster },
  { name: "Luz UV", image: cocktailsElegant },
  { name: "Máquina de Faíscas", image: tableChristmas },
  { name: "Máquina de Fumo", image: tableTea },
  { name: "Iluminação Decorativa", image: dinnerFormal },
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
            Pacotes de Buffet
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
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-24">
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
              <h3 className={`font-display text-3xl lg:text-4xl mb-4 text-center ${
                pkg.highlight ? "text-primary-foreground" : "text-foreground"
              }`}>
                {pkg.name}
              </h3>

              {/* Specs */}
              <div className="flex justify-center gap-6 mb-6">
                <div className="flex items-center gap-2 text-xs">
                  <Ruler className="w-4 h-4" style={{ color: 'hsl(42, 65%, 48%)' }} />
                  <span className={pkg.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}>
                    {pkg.size}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Sparkles className="w-4 h-4" style={{ color: 'hsl(42, 65%, 48%)' }} />
                  <span className={pkg.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}>
                    {pkg.pieces}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Users className="w-4 h-4" style={{ color: 'hsl(42, 65%, 48%)' }} />
                  <span className={pkg.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}>
                    {pkg.guests}
                  </span>
                </div>
              </div>

              {/* Separator */}
              <div 
                className="w-12 h-px mx-auto mb-6"
                style={{
                  background: pkg.highlight 
                    ? 'linear-gradient(90deg, transparent, hsl(43, 55%, 60%), transparent)'
                    : 'linear-gradient(90deg, transparent, hsl(43, 65%, 50%), transparent)'
                }}
              />

              {/* Items List */}
              <div className="space-y-2 mb-6">
                <p className={`font-body text-xs uppercase tracking-[0.15em] mb-3 ${
                  pkg.highlight ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  Inclui:
                </p>
                {pkg.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check 
                      className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                      style={{ color: 'hsl(42, 65%, 48%)' }}
                    />
                    <span className={`font-body text-xs ${
                      pkg.highlight ? "text-primary-foreground/90" : "text-muted-foreground"
                    }`}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Includes */}
              <div className="bg-black/5 p-4 mb-8">
                <p className={`font-body text-[10px] uppercase tracking-[0.15em] mb-3 ${
                  pkg.highlight ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  Oferta Incluída:
                </p>
                {pkg.includes.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 mb-1">
                    <span 
                      className="w-1.5 h-1.5 mt-1.5 flex-shrink-0"
                      style={{ background: 'hsl(42, 65%, 48%)' }}
                    />
                    <span className={`font-body text-xs ${
                      pkg.highlight ? "text-primary-foreground/90" : "text-muted-foreground"
                    }`}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price - Chrome Gold */}
              <div className="text-center mb-8">
                <span className={`font-body text-xs uppercase tracking-[0.2em] block mb-2 ${
                  pkg.highlight ? "text-primary-foreground/60" : "text-muted-foreground"
                }`}>
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

        {/* Extras Section - Photo Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
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
              Material de aluguer premium disponível para elevar ainda mais o seu evento.
            </p>
          </div>
          
          {/* Photo Grid for Extras */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {extras.map((extra, index) => (
              <motion.div
                key={extra.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden aspect-square cursor-pointer"
              >
                <img
                  src={extra.image}
                  alt={extra.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div 
                  className="absolute inset-0 flex items-end transition-all duration-500"
                  style={{
                    background: 'linear-gradient(to top, hsla(25, 15%, 8%, 0.9) 0%, hsla(25, 15%, 8%, 0.3) 50%, transparent 100%)'
                  }}
                >
                  <div className="p-4 w-full">
                    <p 
                      className="font-body text-xs uppercase tracking-[0.1em] text-white text-center"
                    >
                      {extra.name}
                    </p>
                  </div>
                </div>
                {/* Gold border on hover */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    border: '2px solid',
                    borderImage: 'linear-gradient(135deg, hsl(40, 70%, 35%), hsl(43, 65%, 50%), hsl(45, 50%, 68%)) 1'
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Packages;
