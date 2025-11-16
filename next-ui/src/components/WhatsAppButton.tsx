'use client';

import Image from 'next/image';
import { useCart } from '@/hooks/useCart';

export function WhatsAppButton() {
  const { cartDetails, handleFinishOrder } = useCart();

  const hasItems = cartDetails.length > 0;
  
  const text = hasItems
    ? `Olá, gostaria de fazer um pedido:\n\n${cartDetails.map(item => `- ${item.quantity} unidade(s) de ${item.name}`).join('\n')}\n\n*Total de itens:* ${cartDetails.reduce((total, item) => total + item.quantity, 0)}\n\n*Total:* *_R$ ${cartDetails.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}_*`
    : `Olá, vim do site Matripanne™ e gostaria de tirar algumas dúvidas sobre os panetones. Poderia me ajudar?`;

  const url = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  const label = hasItems ? "Fazer Pedido" : "Tire Suas Dúvidas!";

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-10 sm:right-10 z-50">
      <div className="bg-green-500 text-white p-3 sm:p-4 rounded-full shadow-xl hover:scale-105 transition duration-300 cursor-pointer">
        <a 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-0 sm:space-x-2"
          onClick={hasItems ? handleFinishOrder : undefined} 
        >
          <Image src="/whatsapp.png" alt="WhatsApp" width={24} height={24} />
          <span className="font-semibold hidden sm:block">
              {label}
          </span>
        </a>
      </div>
    </div>
  );
}