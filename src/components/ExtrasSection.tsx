import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { extrasCategories, formatPrice, ExtraCategory, ExtraItem, bubbleDecorItems } from "@/data/extras";
import { useCart } from "@/contexts/CartContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { X, Minus, Plus, ShoppingCart, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

// Placeholder images for categories (elegant luxury event aesthetic)
const categoryImages: Record<string, string> = {
  "mesas-cadeiras": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=200&h=200&fit=crop&q=80",
  "loica-mesa": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop&q=80",
  "copos": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=200&h=200&fit=crop&q=80",
  "talheres": "https://images.unsplash.com/photo-1530027644375-9c83053d392e?w=200&h=200&fit=crop&q=80",
  "texteis": "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=200&h=200&fit=crop&q=80",
  "decoracao-suportes": "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=200&h=200&fit=crop&q=80",
  "iluminacao-ambiente": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=200&fit=crop&q=80",
  "apoio-servico": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=200&fit=crop&q=80",
  "suporte-champanhe": "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=200&h=200&fit=crop&q=80",
};

// Item placeholder
const itemPlaceholder = "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=200&h=200&fit=crop&q=80";

// Bubble decor featured image
const bubbleDecorImage = "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&q=80";

// Number of categories to show by default (2 rows of 3)
const DEFAULT_VISIBLE_COUNT = 6;

interface ItemQuantities {
  [itemId: string]: number;
}

const ExtrasSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState<ExtraCategory | null>(null);
  const [itemQuantities, setItemQuantities] = useState<ItemQuantities>({});
  const [selectedBubble, setSelectedBubble] = useState<string>("bubble-painel-simples");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const { addItem } = useCart();

  const hasHiddenCategories = extrasCategories.length > DEFAULT_VISIBLE_COUNT;
  const visibleCategories = showAllCategories 
    ? extrasCategories 
    : extrasCategories.slice(0, DEFAULT_VISIBLE_COUNT);

  const handleOpenCategory = (category: ExtraCategory) => {
    setSelectedCategory(category);
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

    setItemQuantities((prev) => ({ ...prev, [item.id]: 0 }));
  };

  const handleAddBubbleToCart = () => {
    const bubbleItem = bubbleDecorItems.find(b => b.id === selectedBubble);
    if (!bubbleItem) return;

    addItem({
      id: bubbleItem.id,
      name: `Bubble Decor - ${bubbleItem.name}`,
      type: "extra",
      price: bubbleItem.price,
    }, 1);

    toast.success("Adicionado ao carrinho", {
      description: `Bubble Decor - ${bubbleItem.name}`,
    });
  };

  const toggleShowAll = () => {
    setShowAllCategories(prev => !prev);
  };

  return (
    <section id="extras" className="py-28 lg:py-36 bg-muted/30">
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
          <div className="separator-gold mx-auto" />
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Aluguer de Material Decorativo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-card border border-border p-8"
          >
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3 font-light text-center">
              Aluguer de Material Decorativo
            </h3>
            <p className="font-body text-sm text-muted-foreground text-center mb-2">
              Peças selecionadas para completar o seu evento
            </p>
            <p className="font-body text-xs text-muted-foreground/70 text-center mb-8">
              Selecione uma categoria para ver os materiais disponíveis.
            </p>

            {/* Category Mini Grid */}
            <div className="grid grid-cols-3 gap-3">
              {visibleCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleOpenCategory(category)}
                  className="group relative aspect-square overflow-hidden bg-muted cursor-pointer"
                >
                  <img
                    src={categoryImages[category.id] || itemPlaceholder}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div 
                    className="absolute inset-0 flex items-end transition-all duration-300"
                    style={{
                      background: 'linear-gradient(to top, hsla(30, 15%, 8%, 0.85) 0%, hsla(30, 15%, 8%, 0.3) 60%, transparent 100%)'
                    }}
                  >
                    <p className="w-full p-2 font-body text-[9px] sm:text-[10px] uppercase tracking-[0.08em] text-white text-center font-light leading-tight">
                      {category.name}
                    </p>
                  </div>
                  {/* Hover border */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 border-gold/60" />
                </button>
              ))}
            </div>

            {/* Toggle Button - only show if there are hidden categories */}
            {hasHiddenCategories && (
              <div className="text-center mt-4">
                <button
                  onClick={toggleShowAll}
                  className="inline-flex items-center gap-2 btn-gold-flat font-body text-[11px] uppercase tracking-[0.15em] py-3 px-8"
                >
                  {showAllCategories ? (
                    <>
                      Ver menos
                      <ChevronUp className="w-4 h-4 transition-transform" />
                    </>
                  ) : (
                    <>
                      Ver materiais disponíveis
                      <ChevronDown className="w-4 h-4 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>

          {/* Right Column - Bubble Decor Events */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-card border border-border p-8"
          >
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3 font-light text-center">
              Bubble Decor Events
            </h3>
            <p className="font-body text-sm text-muted-foreground text-center mb-6">
              Espaço fotográfico decorativo para criar um ponto de destaque no seu evento
            </p>

            {/* Price Options */}
            <div className="space-y-3 mb-3">
              {bubbleDecorItems.map((item) => (
                <label
                  key={item.id}
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-all duration-300 ${
                    selectedBubble === item.id
                      ? "border-gold bg-gold/5"
                      : "border-border hover:border-gold/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="bubble-option"
                      value={item.id}
                      checked={selectedBubble === item.id}
                      onChange={(e) => setSelectedBubble(e.target.value)}
                      className="w-4 h-4 accent-gold"
                    />
                    <span className="font-body text-sm text-foreground">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-body text-sm font-medium text-gold">
                    {formatPrice(item.price)}
                  </span>
                </label>
              ))}
            </div>
            <p className="font-body text-xs text-muted-foreground/70 text-center mb-5">
              Extra opcional para criar um ponto fotográfico no seu evento.
            </p>

            {/* Add to Cart Button */}
            <div className="text-center mb-5">
              <button
                onClick={handleAddBubbleToCart}
                className="btn-gold-flat font-body text-[11px] uppercase tracking-[0.15em] py-3 px-8"
                aria-label="Adicionar Bubble Deluxe - Este item será adicionado ao carrinho como extra"
              >
                Adicionar Bubble Deluxe
              </button>
              <p className="font-body text-[10px] text-muted-foreground/60 mt-2">
                Este item será adicionado ao carrinho como extra.
              </p>
            </div>

            {/* Featured Image */}
            <div className="aspect-[3/2] overflow-hidden">
              <img
                src={bubbleDecorImage}
                alt="Bubble Decor - Espaço fotográfico decorativo"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
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
