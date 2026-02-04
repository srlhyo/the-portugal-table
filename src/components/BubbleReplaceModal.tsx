import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { formatPrice } from "@/data/extras";

const BubbleReplaceModal = () => {
  const { pendingBubble, existingBubble, confirmBubbleReplace, cancelBubbleReplace } = useCart();

  const handleConfirm = () => {
    if (pendingBubble) {
      confirmBubbleReplace();
      toast.success("Painel substituído", {
        description: pendingBubble.item.name,
      });
    }
  };

  const handleCancel = () => {
    cancelBubbleReplace();
  };

  return (
    <AlertDialog open={!!pendingBubble} onOpenChange={(open) => !open && handleCancel()}>
      <AlertDialogContent className="bg-background border-border">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display text-2xl text-foreground font-light">
            Alterar painel?
          </AlertDialogTitle>
          <AlertDialogDescription className="font-body text-muted-foreground">
            Já tem um painel Bubble no carrinho.
            <br />
            Deseja substituir pelo painel selecionado?
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        {existingBubble && pendingBubble && (
          <div className="my-4 space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/30 border border-border">
              <div>
                <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">Atual</p>
                <p className="font-body text-sm text-foreground">{existingBubble.name}</p>
              </div>
              <span className="font-body text-sm text-muted-foreground">{formatPrice(existingBubble.price)}</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="font-body text-xs text-gold">↓</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gold/10 border border-gold/30">
              <div>
                <p className="font-body text-xs text-gold uppercase tracking-wider">Novo</p>
                <p className="font-body text-sm text-foreground">{pendingBubble.item.name}</p>
              </div>
              <span className="font-body text-sm text-gold">{formatPrice(pendingBubble.item.price)}</span>
            </div>
          </div>
        )}

        <AlertDialogFooter className="gap-3 sm:gap-2">
          <AlertDialogCancel 
            onClick={handleCancel}
            className="font-body text-[11px] uppercase tracking-[0.15em] border-border hover:bg-muted"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            className="btn-gold-flat font-body text-[11px] uppercase tracking-[0.15em]"
          >
            Substituir painel
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BubbleReplaceModal;
