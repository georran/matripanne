import { products } from "@/app/data/products";
export function productsInfo(id: number) {
    return products.find(product => product.id === id);
}