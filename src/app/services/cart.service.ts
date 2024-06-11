import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { product } from '../product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: any[] = [];
  productList = new BehaviorSubject<any[]>([]);
  cartItemsChanged: Subject<void> = new Subject();
  constructor() {}
  getProducts() {
    return this.productList.asObservable();
  }
  addToCart(product: any) {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity ++;
    } else {
      product.quantity = 1;
      this.cartItems.push(product);
    }
    this.productList.next(this.cartItems);
    this.cartItemsChanged.next();
    
  }
  // addToCart(data:product){
  //   this.cartItems.push(data);
  //   this.subject.next(this.cartItems);
  //   console.log(this.cartItems)
  // }

  removeCartItem(product: any) {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
    this.productList.next(this.cartItems);
    this.cartItemsChanged.next();
  }
  removeAllCart() {
    this.cartItems = [];
    this.productList.next(this.cartItems);
    this.cartItemsChanged.next();
  }
  updateQuantity(product: any, quantity: number) {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += quantity;
      if (existingProduct.quantity <= 0) {
        this.removeCartItem(existingProduct);
      }
    }
    this.productList.next(this.cartItems);
    this.cartItemsChanged.next();
  }
  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity,0);
  }
  getCartItems(){
    return this.cartItems;
  }
  isProductInCart(product: product): boolean {
    return this.cartItems.some(item => item.product.id === product.id);
  }
}