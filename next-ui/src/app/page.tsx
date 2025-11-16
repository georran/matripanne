'use client'; 

import { products } from "@/data/products";
import { Header } from "@/components/Header";
import About from "@/components/About";
import { ProductList } from "@/components/ProductList";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

export default function Home() {    
    return (
        <div className="min-h-screen flex flex-col">
            <Header/>
            <main className="flex-grow container mx-auto px-4 py-12">
                <About/>                
                <ProductList products={products} />
            </main>
            <WhatsAppButton />
            <Footer />
        </div>
    );
}