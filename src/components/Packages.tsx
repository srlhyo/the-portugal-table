import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Users, Ruler, Sparkles, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const packages = [
  {
    id: "essence",
    name: "Essence",
    size: "180 cm",
    pieces: "250 peças",
    guests: "Ideal até 15 a 18 convidados",
    price: 450,
    highlight: false,
    items: [
      "Mini sobremesas variadas",
      "Brigadeiros",
      "Mini salgados variados",
      "Mini hambúrgueres gourmet",
      "Mini cachorros gourmet",
      "Mini pizzas",
      "Cones de fruta / enchidos",
      "Donuts personalizados nas cores da festa",
      "Mini barquinhos com asas de frango e chips"
    ],
    includes: [
      "Decoração incluída",
      "Bebida não alcoólica servida em copos decorativos",
      "Água aromatizada como elemento decorativo da mesa"
    ]
  },
  {
    id: "supreme",
    name: "Supreme",
    size: "360 cm",
    pieces: "450 peças",
    guests: "Ideal até 35 convidados",
    price: 650,
    highlight: true,
    items: [
      "Mini sobremesas",
      "Brigadeiros",
      "Donuts personalizados",
      "Mini salgados variados",
      "Mini hambúrgueres gourmet",
      "Mini cachorros gourmet",
      "Mini pizzas",
      "Mini barquinhos com asas de frango e chips",
      "Cones de fruta / enchidos",
      "Crepes primavera",
      "Copos de salada César"
    ],
    includes: [
      "Decoração incluída",
      "Bebida não alcoólica servida em copos decorativos",
      "Água aromatizada como elemento decorativo da mesa"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    size: "360 cm",
    pieces: "650 peças",
    guests: "Ideal até 50 convidados",
    price: 920,
    highlight: false,
    items: [
      "Brigadeiros",
      "Sobremesas de copo",
      "Donuts personalizados",
      "Mini salgados variados",
      "Mini hambúrgueres gourmet",
      "Mini cachorros gourmet",
      "Mini pizzas",
      "Mini barquinhos com asas de frango & chips",
      "Crepes Primavera",
      "Cones de fruta e enchidos",
      "Mini wraps de frango",
      "Saladas frias",
      "Mini copos de salada César",
      "Saladas frias de grão com bacalhau",
      "Canapés diversos",
      "Camarões panados em molho agridoce"
    ],
    includes: [
      "Decoração incluída",
      "Bebida não alcoólica servida em copos decorativos",
      "Água aromatizada como elemento decorativo da mesa",
      "2 elementos de staff para serviço e reposição durante o evento"
    ]
  },
];

const Packages = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const { addItem } = useCart();

  const handleAddToCart = (pkg: typeof packages[0]) => {
    const result = addItem({
      id: pkg.id,
      name: `Pacote ${pkg.name}`,
      type: "package",
      price: pkg.price,
    });
    
    // Only show toast if package was actually added (not pending confirmation)
    if (result === "added") {
      toast.success("Adicionado ao carrinho", {
        description: `Pacote ${pkg.name} - ${pkg.price}€`,
      });
    } else if (result === "already_in_cart") {
      toast.info("Este pacote já está no carrinho", {
        description: `Pacote ${pkg.name}`,
      });
    }
    // If "pending_confirmation", the modal will handle the toast
  };

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
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
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
              <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mb-6">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                  <Ruler className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold flex-shrink-0" />
                  <span className={pkg.highlight ? "text-background/70" : "text-muted-foreground"}>
                    {pkg.size}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold flex-shrink-0" />
                  <span className={pkg.highlight ? "text-background/70" : "text-muted-foreground"}>
                    {pkg.pieces}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold flex-shrink-0" />
                  <span className={`${pkg.highlight ? "text-background/70" : "text-muted-foreground"} whitespace-nowrap`}>
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

              {/* CTA - Add to Cart */}
              <button
                onClick={() => handleAddToCart(pkg)}
                className={`w-full flex items-center justify-center gap-2 font-body text-[11px] uppercase tracking-[0.15em] py-4 transition-all duration-300 ${
                  pkg.highlight
                    ? "btn-gold-flat"
                    : "btn-outline-gold"
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                Reservar este pacote
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
