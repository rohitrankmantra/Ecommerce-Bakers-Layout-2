"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/utils/axiosinstance";
import { toast } from "@/hooks/use-toast";

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH CART ---------------- */
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await api.get("/cart/get");
        setItems(data?.cart?.items || []);
      } catch (error) {
        console.error("Fetch cart failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  /* ---------------- ADD ITEM ---------------- */
  const addItem = async (product) => {
    setIsOpen(true);
    const prev = items;
    const idx = items.findIndex((i) => i.name === product.name);
    const optimistic =
      idx !== -1
        ? items.map((i, iidx) =>
            iidx === idx ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [
            ...items,
            {
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: 1,
            },
          ];
    setItems(optimistic);
    try {
      toast({
        title: "Added to cart",
        description: `${product.name} added successfully`,
      });
      const { data } = await api.post("/cart/add", {
        items: [
          {
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
          },
        ],
      });
      setItems(data?.cart?.items || optimistic);
    } catch (error) {
      setItems(prev);
      console.error("Add failed", error);
      toast({
        title: "Error",
        description: "Could not add item",
        variant: "destructive",
      });
    }
  };

  /* ---------------- UPDATE QUANTITY ---------------- */
  const updateQuantity = async (itemId, newQuantity) => {
    const prev = items;
    const optimistic = items.map((i) =>
      i._id === itemId ? { ...i, quantity: newQuantity } : i,
    );
    setItems(optimistic);
    if (!itemId) return;
    try {
      const { data } = await api.put("/cart/update", {
        itemId,
        quantity: newQuantity,
      });
      setItems(data?.cart?.items || optimistic);
    } catch (error) {
      setItems(prev);
      console.error("Update failed", error);
      toast({
        title: "Error",
        description: "Quantity update failed",
        variant: "destructive",
      });
    }
  };

  /* ---------------- REMOVE ITEM ---------------- */
  const removeItem = async (itemId) => {
    const prev = items;
    const optimistic = items.filter((i) => i._id !== itemId);
    setItems(optimistic);
    if (!itemId) return;
    try {
      const { data } = await api.delete("/cart/remove", {
        data: { itemId },
      });
      setItems(data?.cart?.items || optimistic);
    } catch (error) {
      setItems(prev);
      console.error("Remove failed", error);
      toast({
        title: "Error",
        description: "Remove item failed",
        variant: "destructive",
      });
    }
  };

  /* ---------------- TOTALS ---------------- */
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        updateQuantity,
        removeItem,
        total,
        itemCount,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
