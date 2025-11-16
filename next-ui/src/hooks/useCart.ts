'use client'; 

import { useState, useEffect } from "react";
import { ProductInterface } from "@/data/interfaces/products.interface"; 
import { getCartIcon, getCartItemCount, getCartDetails, addToCart, removeOneFromCart, removeFromCart, clearCart, finishOrder } from "@/services/cart";
import { CartInterface } from "@/data/interfaces/cart.interface"; 

interface CartHook {
  cartIcon: string;
  cartItemCount: number;
  cartDetails: CartInterface[]; 
  
  handleAddToCart: (product: ProductInterface) => void;
  
  handleRemoveOneFromCart: (productId: number) => void;
  handleRemoveFromCart: (productId: number) => void;
  handleClearCart: () => void;
  handleFinishOrder: () => void;
}

export function useCart(): CartHook {
  const [cartIcon, setCartIcon] = useState('/cart-empty.png');
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartDetails, setCartDetails] = useState<CartInterface[]>([]);
  const updateStateFromStorage = () => {
    setCartItemCount(getCartItemCount());
    setCartIcon(getCartIcon());
    setCartDetails(getCartDetails());
  };
  
  // ... (useEffect e listeners permanecem os mesmos) ...
  useEffect(() => {
    updateStateFromStorage(); 
    window.addEventListener('storage', updateStateFromStorage);
    window.addEventListener('cart-updated', updateStateFromStorage); 

    return () => {
      window.removeEventListener('storage', updateStateFromStorage);
      window.removeEventListener('cart-updated', updateStateFromStorage);
    };
  }, []); 
  
  const handleAddToCart = (product: ProductInterface) => { 
      const cartItem: CartInterface = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
      };

      addToCart(cartItem);
      updateStateFromStorage(); 
  };

  const handleRemoveOneFromCart = (productId: number) => {
    removeOneFromCart(productId);
    updateStateFromStorage(); 
  };

  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId);
    updateStateFromStorage(); 
  };

  const handleClearCart = () => {
    clearCart();
    updateStateFromStorage(); 
  };

  const handleFinishOrder = () => {
    finishOrder(); 
    handleClearCart(); 
  };

  return {
    cartIcon,
    cartItemCount,
    cartDetails,
    handleAddToCart,
    handleRemoveOneFromCart,
    handleRemoveFromCart,
    handleClearCart,
    handleFinishOrder
  };
}