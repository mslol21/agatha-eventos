"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CatalogProduct } from "@/lib/store";

export interface CartItem {
  id: string;
  name: string;
  image: string;
  estimatedPricePerGuest: number;
  minGuests: number;
  badge?: string;
  category?: string;
}

interface EventCartContextType {
  cartItems: CartItem[];
  guestCount: number;
  isCartOpen: boolean;
  addToCart: (product: CatalogProduct) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  setGuestCount: (count: number) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  isInCart: (productId: string) => boolean;
  totalEstimatedPrice: number;
  totalItemsCount: number;
}

const EventCartContext = createContext<EventCartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "agatha_event_cart_items_v1";
const GUEST_STORAGE_KEY = "agatha_event_guest_count_v1";

export const EventCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [guestCount, setGuestCountState] = useState<number>(50);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedItems = localStorage.getItem(CART_STORAGE_KEY);
      const savedGuests = localStorage.getItem(GUEST_STORAGE_KEY);
      if (savedItems) {
        setCartItems(JSON.parse(savedItems));
      } else {
        // Initial default items in cart for demonstration
        setCartItems([
          {
            id: "pipoca-gourmet",
            name: "Pipoca Gourmet",
            image: "/images/pipoca.jpg",
            estimatedPricePerGuest: 10,
            minGuests: 30,
            badge: "Mais Pedido",
          },
          {
            id: "crepe-suico",
            name: "Crepe Suíço",
            image: "/images/crepe.jpg",
            estimatedPricePerGuest: 15,
            minGuests: 50,
            badge: "Sucesso Garantido",
          },
        ]);
      }

      if (savedGuests) {
        setGuestCountState(Number(savedGuests));
      }
    } catch (e) {
      console.error("Erro ao carregar carrinho local", e);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      localStorage.setItem(GUEST_STORAGE_KEY, guestCount.toString());
    } catch (e) {
      console.error("Erro ao salvar carrinho local", e);
    }
  }, [cartItems, guestCount, isMounted]);

  const addToCart = (product: CatalogProduct) => {
    setCartItems((prev) => {
      const exists = prev.some((item) => item.id === product.id || item.name === product.name);
      if (exists) return prev;
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          estimatedPricePerGuest: product.estimatedPricePerGuest || 10,
          minGuests: product.id === "crepe-suico" ? 50 : 30, // Default minimum guest rules
          badge: product.badge,
          category: product.category,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId && item.name !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const setGuestCount = (count: number) => {
    setGuestCountState(Math.max(10, count));
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const isInCart = (productId: string) => {
    return cartItems.some((item) => item.id === productId || item.name === productId);
  };

  // Calculate estimated total sum
  const totalEstimatedPrice = cartItems.reduce((acc, item) => {
    const applicableGuests = Math.max(guestCount, item.minGuests);
    return acc + applicableGuests * item.estimatedPricePerGuest;
  }, 0);

  return (
    <EventCartContext.Provider
      value={{
        cartItems,
        guestCount,
        isCartOpen,
        addToCart,
        removeFromCart,
        clearCart,
        setGuestCount,
        openCart,
        closeCart,
        toggleCart,
        isInCart,
        totalEstimatedPrice,
        totalItemsCount: cartItems.length,
      }}
    >
      {children}
    </EventCartContext.Provider>
  );
};

export const useEventCart = () => {
  const context = useContext(EventCartContext);
  if (!context) {
    throw new Error("useEventCart deve ser usado dentro de um EventCartProvider");
  }
  return context;
};
