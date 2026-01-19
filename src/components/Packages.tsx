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
    pieces: "250 peças",
    guests: "Ideal até 15 a 18 convidados",
    price: "450",
    highlight: false,
    items: [
      "25 Mini sobremesas variadas",
      "25 Brigadeiros",
      "100 Mini salgados variados",
      "20 Mini hambúrgueres gourmet",
      "20 Mini cachorros gourmet",
      "20 Mini pizzas",
      "15 Cones de fruta / enchidos",
      "10 Donuts personalizados nas cores da festa",
      "15 Mini barquinhos com asas de frango e chips"
    ],
    includes: [
      "Decoração incluída",
      "Bebida não alcoólica servida em copos decorativos",
      "Água aromatizada como elemento decorativo da mesa"
    ]
  },
  {
    name: "Supreme",
    size: "360 cm",
    pieces: "450 peças",
    guests: "Ideal até 35 convidados",
    price: "650",
    highlight: true,
    items: [
      "45 Mini sobremesas",
      "50 Brigadeiros",
      "15 Donuts personalizados",
      "150 Mini salgados variados",
      "35 Mini hambúrgueres gourmet",
      "35 Mini cachorros gourmet",
      "35 Mini pizzas",
      "20 Mini barquinhos com asas de frango e chips",
      "20 Cones de fruta / enchidos",
      "25 Crepes primavera",
      "20 Copos de salada César"
    ],
    includes: [
      "Decoração incluída",
      "Bebida não alcoólica servida em copos decorativos",
      "Água aromatizada como elemento decorativo da mesa"
    ]
  },
  {
    name: "Premium",
    size: "360 cm",
    pieces: "650 peças",
    guests: "Ideal até 50 convidados",
    price: "920",
    highlight: false,
    items: [
      "50 Brigadeiros",
      "60 Sobremesas de copo",
      "18 Donuts personalizados",
      "100 Mini salgados variados",
      "50 Mini hambúrgueres gourmet",
      "50 Mini cachorros gourmet",
      "40 Mini pizzas",
      "20 Mini barquinhos com asas de frango & chips",
      "30 Crepes Primavera",
      "25 Cones de fruta e enchidos",
      "20 Mini wraps de frango",
      "20 Saladas frias",
      "20 Mini copos de salada César",
      "20 Saladas frias de grão com bacalhau",
      "20 Canapés diversos",
      "20 Camarões panados em molho agridoce"
    ],
    includes: [
      "Decoração incluída",
      "Bebida não alcoólica servida em copos decorativos",
      "Água aromatizada como elemento decorativo da mesa"
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
    <section id="pacotes" className="py-28 lg:py-36 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="font-body text-[11px] uppercase tracking-[0.25em] mb-5 block text-gold">
            Buffet de Finger Food
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 font-light">
            Pacotes de Buffet
          </h2>
          <div className="separator-gold mx-auto mb-8" />
          <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed font-light">
            Escolha o pacote ideal para o seu evento. Cada um inclui montagem completa do buffet 
            com decoração e finger food premium.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 mb-28">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`relative p-8 lg:p-10 transition-all duration-500 ${
                pkg.highlight
                  ? "bg-foreground text-background"
                  : "bg-card border border-border hover:border-gold/40"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="font-body text-[10px] uppercase tracking-[0.15em] px-4 py-1.5 bg-gold text-white">
                    Mais Popular
                  </span>
                </div>
              )}

              {/* Package Name */}
              <h3 className={`font-display text-3xl lg:text-4xl mb-5 text-center font-light ${
                pkg.highlight ? "text-background" : "text-foreground"
              }`}>
                {pkg.name}
              </h3>

              {/* Specs */}
              <div className="flex justify-center gap-5 mb-6">
                <div className="flex items-center gap-2 text-xs">
                  <Ruler className="w-4 h-4 text-gold" />
                  <span className={pkg.highlight ? "text-background/70" : "text-muted-foreground"}>
                    {pkg.size}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span className={pkg.highlight ? "text-background/70" : "text-muted-foreground"}>
                    {pkg.pieces}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Users className="w-4 h-4 text-gold" />
                  <span className={pkg.highlight ? "text-background/70" : "text-muted-foreground"}>
                    {pkg.guests}
                  </span>
                </div>
              </div>

              {/* Separator */}
              <div className="w-10 h-px mx-auto mb-6 bg-gold/40" />

              {/* Items List */}
              <div className="space-y-2 mb-6">
                <p className={`font-body text-[10px] uppercase tracking-[0.15em] mb-3 ${
                  pkg.highlight ? "text-background/60" : "text-muted-foreground"
                }`}>
                  Inclui:
                </p>
                {pkg.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gold" />
                    <span className={`font-body text-xs font-light ${
                      pkg.highlight ? "text-background/85" : "text-muted-foreground"
                    }`}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Includes */}
              <div className={`p-4 mb-8 ${pkg.highlight ? "bg-white/5" : "bg-muted/50"}`}>
                <p className={`font-body text-[10px] uppercase tracking-[0.15em] mb-3 ${
                  pkg.highlight ? "text-background/60" : "text-muted-foreground"
                }`}>
                  Oferta Incluída:
                </p>
                {pkg.includes.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 mb-1">
                    <span className="w-1 h-1 mt-1.5 flex-shrink-0 rounded-full bg-gold" />
                    <span className={`font-body text-xs font-light ${
                      pkg.highlight ? "text-background/85" : "text-muted-foreground"
                    }`}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="text-center mb-8">
                <span className={`font-body text-[10px] uppercase tracking-[0.15em] block mb-2 ${
                  pkg.highlight ? "text-background/50" : "text-muted-foreground"
                }`}>
                  Desde
                </span>
                <span className="font-display text-5xl lg:text-6xl text-gold font-light">
                  {pkg.price}€
                </span>
              </div>

              {/* CTA - Flat buttons */}
              <a
                href="#contacto"
                className={`block text-center font-body text-[11px] uppercase tracking-[0.15em] py-4 transition-all duration-300 ${
                  pkg.highlight
                    ? "btn-gold-flat"
                    : "btn-outline-gold"
                }`}
              >
                Reservar
              </a>
            </motion.div>
          ))}
        </div>

        {/* Extras Section - Luxury Photo Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-14">
            <span className="font-body text-[11px] uppercase tracking-[0.25em] mb-5 block text-gold">
              Adicionar ao Evento
            </span>
            <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 font-light">
              Extras & Aluguer
            </h3>
            <div className="separator-gold mx-auto mb-8" />
            <p className="font-body text-sm text-muted-foreground max-w-xl mx-auto font-light">
              Material de aluguer premium disponível para elevar ainda mais o seu evento.
            </p>
          </div>
          
          {/* Luxury Photo Grid for Extras */}
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
                    background: 'linear-gradient(to top, hsla(30, 15%, 8%, 0.85) 0%, hsla(30, 15%, 8%, 0.2) 50%, transparent 100%)'
                  }}
                >
                  <div className="p-4 w-full">
                    <p className="font-body text-[10px] uppercase tracking-[0.12em] text-white text-center font-light">
                      {extra.name}
                    </p>
                  </div>
                </div>
                {/* Subtle border on hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-2 border-gold/60" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Packages;
