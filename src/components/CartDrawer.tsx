import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data/extras";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import QuoteRequestForm from "./QuoteRequestForm";
import QuoteConfirmation from "./QuoteConfirmation";

type CartStep = "cart" | "form" | "confirmation";

interface ConfirmationData {
  referenceNumber: string;
  eventDate: string;
}

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, subtotal, totalItems } = useCart();
  const [currentStep, setCurrentStep] = useState<CartStep>("cart");
  const [confirmationData, setConfirmationData] = useState<ConfirmationData | null>(null);

  const handleClose = () => {
    setIsOpen(false);
    // Reset to cart step after drawer closes
    setTimeout(() => {
      setCurrentStep("cart");
      setConfirmationData(null);
    }, 300);
  };

  const handleFormSubmit = (formData: { dataEvento: string }, referenceNumber: string) => {
    setConfirmationData({
      referenceNumber,
      eventDate: formData.dataEvento,
    });
    setCurrentStep("confirmation");
  };

  const handleConfirmationClose = () => {
    handleClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-md bg-background border-l border-border flex flex-col h-full p-6">
        <AnimatePresence mode="wait">
          {currentStep === "cart" && (
            <motion.div
              key="cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col h-full"
            >
              <SheetHeader className="border-b border-border pb-4">
                <SheetTitle className="font-display text-2xl text-foreground font-light flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-gold" />
                  Carrinho
                  {totalItems > 0 && (
                    <span className="text-sm font-body text-muted-foreground">
                      ({totalItems} {totalItems === 1 ? "item" : "itens"})
                    </span>
                  )}
                </SheetTitle>
              </SheetHeader>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-4">
                <AnimatePresence mode="popLayout">
                  {items.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center h-full text-center px-4"
                    >
                      <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
                      <p className="font-body text-muted-foreground">
                        O seu carrinho está vazio
                      </p>
                      <p className="font-body text-sm text-muted-foreground/70 mt-2">
                        Adicione pacotes ou extras para começar
                      </p>
                    </motion.div>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex gap-4 p-4 bg-muted/30 border border-border"
                        >
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="font-body text-sm font-medium text-foreground">
                                  {item.name}
                                </p>
                                <p className="font-body text-xs text-muted-foreground capitalize">
                                  {item.type === "package" ? "Pacote" : item.groupKey === "bubble_panel" ? "Bubble Decor" : "Extra"}
                                </p>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                                aria-label="Remover"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="flex items-center justify-between">
                              {/* Quantity controls - only for non-package and non-bubble items */}
                              {item.type !== "package" && item.groupKey !== "bubble_panel" ? (
                                <div className="flex items-center gap-2 border border-border bg-background">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.qty - 1)}
                                    className="p-2 hover:bg-muted transition-colors"
                                    aria-label="Diminuir quantidade"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="font-body text-sm min-w-[2rem] text-center">
                                    {item.qty}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.qty + 1)}
                                    className="p-2 hover:bg-muted transition-colors"
                                    aria-label="Aumentar quantidade"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              ) : (
                                <span className="font-body text-xs text-muted-foreground italic">
                                  {item.type === "package" ? "Pacote base" : "Painel único"}
                                </span>
                              )}

                              {/* Line subtotal */}
                              <p className="font-body text-sm font-medium text-gold">
                                {formatPrice(item.price)}
                              </p>
                            </div>

                            {/* Unit price - only for items with qty > 1 that allow quantity changes */}
                            {item.type !== "package" && item.groupKey !== "bubble_panel" && item.qty > 1 && (
                              <p className="font-body text-xs text-muted-foreground mt-1">
                                {formatPrice(item.price)} /un.
                              </p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer with subtotal and CTA */}
              {items.length > 0 && (
                <div className="border-t border-border pt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-muted-foreground">Subtotal</span>
                    <span className="font-display text-2xl text-gold font-light">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <button
                    onClick={() => setCurrentStep("form")}
                    className="block text-center btn-gold-flat font-body text-[11px] uppercase tracking-[0.15em] py-4 w-full"
                  >
                    Finalizar pedido
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {currentStep === "form" && (
            <QuoteRequestForm
              key="form"
              onBack={() => setCurrentStep("cart")}
              onSubmit={handleFormSubmit}
            />
          )}

          {currentStep === "confirmation" && confirmationData && (
            <QuoteConfirmation
              key="confirmation"
              referenceNumber={confirmationData.referenceNumber}
              eventDate={confirmationData.eventDate}
              onClose={handleConfirmationClose}
            />
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
