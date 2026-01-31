import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { extrasCategories, formatPrice, ExtraCategory, ExtraItem } from "@/data/extras";
import { useCart } from "@/contexts/CartContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { X, Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

// Placeholder images for categories (elegant luxury event aesthetic)
const categoryImages: Record<string, string> = {
  "mesas-cadeiras": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=400&fit=crop&q=80",
  "loica-mesa": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&q=80",
  "copos": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=400&fit=crop&q=80",
  "talheres": "https://images.unsplash.com/photo-1530027644375-9c83053d392e?w=400&h=400&fit=crop&q=80",
  "texteis": "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=400&h=400&fit=crop&q=80",
  "decoracao-suportes": "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400&h=400&fit=crop&q=80",
  "iluminacao-ambiente": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop&q=80",
  "apoio-servico": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=400&fit=crop&q=80",
  "suporte-champanhe": "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400&h=400&fit=crop&q=80",
};

// Item placeholder images
const itemPlaceholder = "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=200&h=200&fit=crop&q=80";

interface ItemQuantities {
  [itemId: string]: number;
}

const ExtrasSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState<ExtraCategory | null>(null);
  const [itemQuantities, setItemQuantities] = useState<ItemQuantities>({});
  const { addItem } = useCart();

  const handleOpenCategory = (category: ExtraCategory) => {
    setSelectedCategory(category);
    // Reset quantities when opening modal
    setItemQuantities({});
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
    setItemQuantities({});
  };

  const updateItemQuantity = (itemId: string, delta: number) => {
    setItemQuantities((prev) => {
      const current = prev[itemId] || 0;
      const newQty = Math.max(0, current + delta);
      return { ...prev, [itemId]: newQty };
    });
  };

  const handleAddToCart = (item: ExtraItem) => {
    const qty = itemQuantities[item.id] || 0;
    if (qty <= 0) return;

    addItem({
      id: item.id,
      name: item.name,
      type: "extra",
      price: item.price,
    }, qty);

    toast.success("Adicionado ao carrinho", {
      description: `${qty}x ${item.name}`,
    });

    // Reset this item's quantity
    setItemQuantities((prev) => ({ ...prev, [item.id]: 0 }));
  };

  return (
    <section className="py-28 lg:py-36 bg-muted/30">
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
            Complemente o seu evento
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 font-light">
            Aluguer de Material Decorativo
          </h2>
          <div className="separator-gold mx-auto mb-8" />
          <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed font-light">
            Peças selecionadas para completar o seu evento com elegância e sofisticação.
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
          {extrasCategories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              onClick={() => handleOpenCategory(category)}
              className="group relative overflow-hidden aspect-square cursor-pointer bg-card border border-border hover:border-gold/40 transition-all duration-500"
            >
              <img
                src={categoryImages[category.id] || itemPlaceholder}
                alt={category.name}
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
                  <p className="font-body text-[10px] sm:text-xs uppercase tracking-[0.12em] text-white text-center font-light">
                    {category.name}
                  </p>
                </div>
              </div>
              {/* Hover border */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-2 border-gold/60" />
            </motion.button>
          ))}
        </div>

        {/* Category Modal */}
        <Dialog open={!!selectedCategory} onOpenChange={(open) => !open && handleCloseModal()}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col bg-background border-border">
            <DialogHeader className="border-b border-border pb-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <DialogTitle className="font-display text-2xl text-foreground font-light">
                  {selectedCategory?.name}
                </DialogTitle>
                <DialogClose className="p-2 hover:bg-muted rounded-sm transition-colors">
                  <X className="w-5 h-5" />
                </DialogClose>
              </div>
            </DialogHeader>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {selectedCategory?.items.map((item) => {
                const qty = itemQuantities[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-muted/30 border border-border"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden bg-muted">
                      <img
                        src={itemPlaceholder}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-body text-sm font-medium text-foreground mb-1">
                          {item.name}
                        </h4>
                        <p className="font-body text-sm text-gold font-medium">
                          {formatPrice(item.price)} /{item.unit}
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between gap-4 mt-3">
                        {/* Quantity Selector */}
                        <div className="flex items-center gap-2 border border-border bg-background">
                          <button
                            onClick={() => updateItemQuantity(item.id, -1)}
                            className="p-2 hover:bg-muted transition-colors"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-body text-sm min-w-[2rem] text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateItemQuantity(item.id, 1)}
                            className="p-2 hover:bg-muted transition-colors"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Add to Cart */}
                        <button
                          onClick={() => handleAddToCart(item)}
                          disabled={qty === 0}
                          className={`flex items-center gap-2 px-4 py-2 font-body text-[10px] uppercase tracking-[0.12em] transition-all duration-300 ${
                            qty === 0
                              ? "bg-muted text-muted-foreground cursor-not-allowed"
                              : "btn-gold-flat"
                          }`}
                        >
                          <ShoppingCart className="w-3 h-3" />
                          Adicionar
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ExtrasSection;
