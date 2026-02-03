import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export type CartItemType = "package" | "extra";

export interface CartItem {
  id: string;
  name: string;
  type: CartItemType;
  price: number;
  qty: number;
}

interface PendingPackage {
  item: Omit<CartItem, "qty">;
  qty: number;
}

export type AddItemResult = "added" | "already_in_cart" | "pending_confirmation";

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => AddItemResult;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  // Package replacement modal
  pendingPackage: PendingPackage | null;
  existingPackage: CartItem | null;
  confirmPackageReplace: () => void;
  cancelPackageReplace: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "doluxo-cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  const [isOpen, setIsOpen] = useState(false);
  const [pendingPackage, setPendingPackage] = useState<PendingPackage | null>(null);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Find existing package in cart
  const existingPackage = items.find((i) => i.type === "package") || null;

  const addItem = useCallback((item: Omit<CartItem, "qty">, qty: number = 1): AddItemResult => {
    // If adding a package, enforce special rules
    if (item.type === "package") {
      // Check current state synchronously
      const currentItems = items;
      const existing = currentItems.find((i) => i.type === "package");
      
      // If same package exists, do NOT increment - packages are always qty=1
      if (existing && existing.id === item.id) {
        return "already_in_cart";
      }
      
      // If different package exists, trigger confirmation modal
      if (existing) {
        setPendingPackage({ item, qty: 1 }); // Always qty=1 for packages
        return "pending_confirmation";
      }
      
      // No package exists, add with qty=1 (always)
      setItems((prev) => [...prev, { ...item, qty: 1 }]);
      return "added";
    }

    // For extras, use normal logic
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...item, qty }];
    });
    return "added";
  }, [items]);

  const confirmPackageReplace = useCallback(() => {
    if (!pendingPackage) return;
    
    setItems((prev) => {
      // Remove existing package and add new one
      const withoutPackage = prev.filter((i) => i.type !== "package");
      return [...withoutPackage, { ...pendingPackage.item, qty: pendingPackage.qty }];
    });
    
    setPendingPackage(null);
  }, [pendingPackage]);

  const cancelPackageReplace = useCallback(() => {
    setPendingPackage(null);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setItems((prev) =>
        prev.map((i) => {
          if (i.id === id) {
            // Packages are ALWAYS qty=1, never allow increment
            const newQty = i.type === "package" ? 1 : qty;
            return { ...i, qty: newQty };
          }
          return i;
        })
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isOpen,
        setIsOpen,
        pendingPackage,
        existingPackage,
        confirmPackageReplace,
        cancelPackageReplace,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
