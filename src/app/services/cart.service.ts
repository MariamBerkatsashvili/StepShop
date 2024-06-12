import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { product } from '../product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: product[] = this.getCartItemsFromSession();
  productList = new BehaviorSubject<product[]>(this.cartItems);
  cartItemsChanged: Subject<product[]> = new Subject<product[]>();

  constructor() {}

  getCartItemsFromSession(): product[] {
    const storedCartItems = sessionStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  }

  setCartItemsInSession(items: product[]): void {
    sessionStorage.setItem('cartItems', JSON.stringify(items));
  }

  getProducts() {
    return this.productList.asObservable();
  }

  addToCart(product: product) {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.updateCartState();
  }

  removeCartItem(product: product) {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
    this.updateCartState();
  }

  removeAllCart() {
    this.cartItems = [];
    this.updateCartState();
  }

  updateQuantity(product: product, quantity: number) {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += quantity;
      if (existingProduct.quantity <= 0) {
        this.removeCartItem(existingProduct);
      }
    }
    this.updateCartState();
  }

  getTotalPrice(): number {
    return Math.round(this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 100) / 100;
  }
  

  isProductInCart(product: product): boolean {
    return this.cartItems.some(item => item.id === product.id);
  }

  updateCartState() {
    this.setCartItemsInSession(this.cartItems);
    this.productList.next(this.cartItems);
    this.cartItemsChanged.next(this.cartItems);
  }
}
