'use client';

import Image from 'next/image';
import { useCart } from '@/hooks/useCart'; // Importe o Hook
import { ProductInterface } from '@/data/interfaces/products.interface';

export function ProductList({ products }: { products: ProductInterface[] }) {
  const { handleAddToCart } = useCart(); 

  return (
    <section id="products" className="scroll-mt-36 mb-16">
      <h2 className="text-4xl font-bold text-[#C69C6D] mb-6">Nossos Panetones</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8 container mx-auto">
        {products.map((prod) => (
          <div key={prod.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <Image src={prod?.image || ''} alt={prod.name} width={400} height={400} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2 text-[#C69C6D]">{prod.name}</h3>
              <p className="text-gray-700 mb-4">{prod.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-green-600">R$ {prod.price.toFixed(2)}</span>
                <button 
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-150" 
                  onClick={() => 
                    handleAddToCart({
                      id: prod.id,
                      name: prod.name,
                      price: prod.price,
                      description: prod.description,
                      image: prod.image
                    })
                  }
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}