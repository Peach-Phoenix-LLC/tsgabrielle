"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CART_KEY = "tsgabrielle_cart_v1";

export type CartItem = {
  variantId: string;
  title: string;
  qty: number;
  priceCents: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  totalCents: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return;
    try {
      setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const found = prev.find((i) => i.variantId === item.variantId);
      if (!found) return [...prev, item];
      return prev.map((i) => (i.variantId === item.variantId ? { ...i, qty: i.qty + item.qty } : i));
    });
  };

  const removeItem = (variantId: string) => {
    setItems((prev) => prev.filter((i) => i.variantId !== variantId));
  };

  const clearCart = () => setItems([]);

  const totalCents = useMemo(
    () => items.reduce((sum, item) => sum + item.priceCents * item.qty, 0),
    [items]
  );

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalCents }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
