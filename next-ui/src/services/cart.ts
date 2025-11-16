
import { CartInterface } from "@/data/interfaces/cart.interface";
import { ProductInterface } from "@/data/interfaces/products.interface"; 
const CART_KEY = 'carrinhoDePanetones'; 

const dispatchCartUpdate = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event('cart-updated'));
  }
};

export function getCartDetails(): CartInterface[] { 
  if (typeof window === "undefined") {
    return [];
  }
  const cart = localStorage.getItem(CART_KEY); 
  return cart ? JSON.parse(cart) : [];
}

const saveCartToLocalStorage = (cart: CartInterface[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    dispatchCartUpdate(); 
  }
};

export const addToCart = (product: ProductInterface) => { 
  const cart = getCartDetails(); 
  
  const existingItem = cart.find((item: CartInterface) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const newItem: CartInterface = { 
            id: product.id, 
            name: product.name, 
            price: product.price, 
            quantity: 1 
        };
    cart.push(newItem);
  }
  saveCartToLocalStorage(cart);
};

export function removeOneFromCart(itemId: number) {
  const cartItems = getCartDetails(); 
  const itemIndex = cartItems.findIndex((item: CartInterface) => item.id === itemId);

  if (itemIndex !== -1) {
    if (cartItems[itemIndex].quantity > 1) {
      cartItems[itemIndex].quantity -= 1;
    } else {
      cartItems.splice(itemIndex, 1);
    }
    saveCartToLocalStorage(cartItems); 
  } else {
    console.error(`Item with ID ${itemId} not found in the cart.`);
  }
}

export const removeFromCart = (productId: number) => {
  const cart = getCartDetails();
  const existingItem = cart.filter((item: CartInterface) => item.id !== productId);
  saveCartToLocalStorage(existingItem);
};

export function clearCart() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CART_KEY); 
    dispatchCartUpdate(); 
  }
}

export function getCartItemCount() {
  const cart = getCartDetails(); 
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotal() {
  const cart = getCartDetails(); 
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getCartIcon() {
  return getCartItemCount() > 0 ? '/cart-full.png' : '/cart-empty.png'; 
}

export function finishOrder() {
  const total = getCartTotal();
  
  if (total > 0) {
    alert(`Seu pedido de R$ ${total.toFixed(2)} foi realizado com sucesso!`);
  } else {
    alert("Seu carrinho está vazio!");
  }
}