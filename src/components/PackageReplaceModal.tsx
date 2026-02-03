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

const PackageReplaceModal = () => {
  const { pendingPackage, existingPackage, confirmPackageReplace, cancelPackageReplace } = useCart();

  const handleConfirm = () => {
    if (pendingPackage) {
      confirmPackageReplace();
      toast.success("Pacote substituído", {
        description: `${pendingPackage.item.name} - ${pendingPackage.item.price}€`,
      });
    }
  };

  const handleCancel = () => {
    cancelPackageReplace();
  };

  return (
    <AlertDialog open={!!pendingPackage} onOpenChange={(open) => !open && handleCancel()}>
      <AlertDialogContent className="bg-background border-border">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display text-2xl text-foreground font-light">
            Alterar pacote?
          </AlertDialogTitle>
          <AlertDialogDescription className="font-body text-muted-foreground">
            Já tem um pacote no carrinho.
            <br />
            Deseja substituir pelo pacote selecionado?
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        {existingPackage && pendingPackage && (
          <div className="my-4 space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/30 border border-border">
              <div>
                <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">Atual</p>
                <p className="font-body text-sm text-foreground">{existingPackage.name}</p>
              </div>
              <span className="font-body text-sm text-muted-foreground">{existingPackage.price}€</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="font-body text-xs text-gold">↓</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gold/10 border border-gold/30">
              <div>
                <p className="font-body text-xs text-gold uppercase tracking-wider">Novo</p>
                <p className="font-body text-sm text-foreground">{pendingPackage.item.name}</p>
              </div>
              <span className="font-body text-sm text-gold">{pendingPackage.item.price}€</span>
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
            Substituir pacote
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PackageReplaceModal;
