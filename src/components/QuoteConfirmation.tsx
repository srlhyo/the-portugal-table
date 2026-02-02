import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data/extras";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, FileText, Phone } from "lucide-react";

interface QuoteConfirmationProps {
  referenceNumber: string;
  eventDate: string;
  onClose: () => void;
}

const QuoteConfirmation = ({ referenceNumber, eventDate, onClose }: QuoteConfirmationProps) => {
  const { items, subtotal, clearCart } = useCart();

  const formatEventDate = (dateStr: string): string => {
    if (!dateStr) return "A definir";
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-PT", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleClose = () => {
    clearCart();
    onClose();
  };

  const handleWhatsApp = () => {
    const cartSummary = items
      .map((item) => `• ${item.name} (${item.qty}x) - ${formatPrice(item.price * item.qty)}`)
      .join("%0A");
    const message = `Olá! Acabei de submeter um pedido de orçamento.%0A%0AReferência: ${referenceNumber}%0AData do evento: ${formatEventDate(eventDate)}%0A%0AResumo:%0A${cartSummary}%0A%0ASubtotal estimado: ${formatPrice(subtotal)}`;
    const whatsappUrl = `https://wa.me/351912345678?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col h-full"
    >
      {/* Success Header */}
      <div className="text-center py-6 border-b border-border">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center"
        >
          <CheckCircle className="w-8 h-8 text-gold" />
        </motion.div>
        <h2 className="font-display text-2xl md:text-3xl text-foreground font-light mb-2">
          Recebemos o seu pedido!
        </h2>
        <p className="font-body text-sm text-muted-foreground max-w-sm mx-auto">
          O seu pedido de orçamento encontra-se agora em processamento.
          Entraremos em contacto brevemente com a confirmação de disponibilidade e valores.
        </p>
      </div>

      {/* Order Details */}
      <div className="flex-1 overflow-y-auto py-6 space-y-6">
        {/* Reference Number */}
        <div className="bg-muted/30 border border-border p-4 text-center">
          <p className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1">
            Número de Referência
          </p>
          <p className="font-display text-xl text-gold">{referenceNumber}</p>
        </div>

        {/* Event Date */}
        <div className="flex items-center gap-3 p-4 bg-muted/20 border border-border">
          <Calendar className="w-5 h-5 text-gold shrink-0" />
          <div>
            <p className="font-body text-xs uppercase tracking-[0.1em] text-muted-foreground">
              Data do Evento
            </p>
            <p className="font-body text-sm text-foreground capitalize">
              {formatEventDate(eventDate)}
            </p>
          </div>
        </div>

        {/* Services Summary */}
        <div className="border border-border">
          <div className="p-4 border-b border-border bg-muted/20">
            <h3 className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Serviços Selecionados
            </h3>
          </div>
          <div className="p-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between font-body text-sm">
                <span className="text-foreground">
                  {item.name}{" "}
                  <span className="text-muted-foreground">×{item.qty}</span>
                </span>
                <span className="text-muted-foreground">
                  {formatPrice(item.price * item.qty)}
                </span>
              </div>
            ))}
            <div className="border-t border-border pt-3 mt-3 flex justify-between">
              <span className="font-body text-sm font-medium text-foreground">
                Subtotal estimado
              </span>
              <span className="font-display text-lg text-gold">
                {formatPrice(subtotal)}
              </span>
            </div>
          </div>
        </div>

        <p className="font-body text-xs text-muted-foreground/70 text-center px-4">
          O valor final será confirmado pela nossa equipa após verificação de disponibilidade.
        </p>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-border pt-4 space-y-3">
        <button
          onClick={handleWhatsApp}
          className="btn-gold-flat font-body text-[11px] uppercase tracking-[0.15em] py-4 w-full flex items-center justify-center gap-2"
        >
          <Phone className="w-4 h-4" />
          Falar no WhatsApp
        </button>
        <button
          onClick={handleClose}
          className="btn-outline-gold font-body text-[11px] uppercase tracking-[0.15em] py-3 w-full"
        >
          Fechar
        </button>
      </div>
    </motion.div>
  );
};

export default QuoteConfirmation;
