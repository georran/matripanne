// src/components/Header.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart'; 
import { finishOrder } from "@/services/cart"; 

export function Header() {
  const { 
    cartIcon, 
    cartItemCount, 
    cartDetails, 
    handleAddToCart, 
    handleRemoveOneFromCart, 
    handleRemoveFromCart, 
    handleClearCart 
  } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLLIElement | null>(null);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartRef]);

  const handleFinishOrder = () => {
    finishOrder();
    alert("Pedido finalizado! Obrigado por sua compra.");
    handleClearCart();
    setIsCartOpen(false);
  };

  const totalValue = cartDetails.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center w-full">
        <div className="flex items-center">
          <Link href="/"><Image src="/logo.png" alt="Logo" width={100} height={100} /></Link>
        </div>
        <nav>
          <ul className="flex space-x-6 text-gray-700 font-medium items-center">
            <li><Link href="/" className="hover:text-blue-600 transition duration-150">Início</Link></li>
            <li><Link href="#products" className="hover:text-blue-600 transition duration-150">Produtos</Link></li>
            
            {/* O Dropdown do Carrinho */}
            <li ref={cartRef} className="relative">
              <button onClick={toggleCart} className="relative cursor-pointer focus:outline-none">
                {/* Contador de Itens */}
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center pointer-events-none z-20">
                    {cartItemCount}
                  </span>
                )}
                <Image src={cartIcon} alt="Carrinho" width={24} height={24} />
              </button>
              
              {isCartOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-lg shadow-xl p-4 z-30">
                  <h3 className="text-lg font-bold mb-3 border-b pb-2">Seu Carrinho ({cartItemCount} itens)</h3>
                  
                  {cartDetails.length === 0 ? (
                    <p className="text-gray-500">Seu carrinho está vazio 😔</p>
                  ) : (
                    <>
                      <ul className="max-h-60 overflow-y-auto space-y-3">
                        {cartDetails.map((item) => (
                          <li key={item.id} className="flex items-center justify-between border-b last:border-b-0 pb-2">
                            <div className="flex flex-col">
                              <span className="font-medium text-sm">{item.name}</span>
                              <span className="text-xs text-gray-500">
                                {item.quantity} x R$ {item.price.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <button 
                                onClick={() => handleRemoveOneFromCart(item.id)}
                                className="text-white bg-red-500 hover:bg-red-600 rounded-full w-5 h-5 text-xs flex items-center justify-center transition-colors"
                              >
                                -
                              </button>
                              <span className="font-semibold px-1 text-gray-900 text-xs">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => handleAddToCart({ 
                                  id: item.id, 
                                  name: item.name, 
                                  price: item.price,
                                })}
                                className="text-white bg-green-500 hover:bg-green-600 rounded-full w-5 h-5 text-xs flex items-center justify-center transition-colors"
                              >
                                +
                              </button>
                              <button 
                                onClick={() => handleRemoveFromCart(item.id)}
                                className="text-gray-400 hover:text-red-500 text-lg ml-2"
                                title="Remover item completamente"
                              >
                                &times;
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between font-bold text-md mb-3">
                          <span>Total:</span>
                          <span>R$ {totalValue.toFixed(2)}</span>
                        </div>
                        <div className="space-y-2">
                          <button 
                            onClick={handleFinishOrder}
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold"
                          >
                            Finalizar Pedido
                          </button>
                          <button 
                            onClick={handleClearCart}
                            className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm"
                          >
                            Limpar Carrinho
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}