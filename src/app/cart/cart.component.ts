import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { product } from '../product';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  products!:any[];
  product!:product;
  username!: any;
  totalPrice!:number;
  // qty!:number; 
  
  constructor( private http:HttpClient, private cartsvc:CartService, private loginsvc:LoginService, private router:Router, private productsvc: ProductsService ){}


  ngOnInit():void{
    this.loginsvc.user$.subscribe(user => this.username = user);

    this.cartsvc.getProducts().subscribe(result=>{
      this.products = result;
      this.totalPrice = this.cartsvc.getTotalPrice();
    })  
  }

  addToCart(item:any){
    this.cartsvc.addToCart(item);
    this.updateCart();
  }

  removeItem(item:any){
    this.cartsvc.removeCartItem(item);
    this.updateCart();
  }
  emptyCart(){
    this.cartsvc.removeAllCart()
  }

  updateCart() {
    this.cartsvc.getProducts().subscribe(result => {
      this.products = result;
      this.totalPrice = this.cartsvc.getTotalPrice();
    });
  }
 
  increaseQty(product: any) {
    if(product.stock>product.quantity){
      this.cartsvc.updateQuantity(product, +1);
    }
  }

  decreaseQty(product: any) {
    if(product.quantity>1){
      this.cartsvc.updateQuantity(product, -1);
    }
    
  }
  tax(){
    return (this.totalPrice * 0.18).toFixed(2);
  }

  grandTotal(){
    return (this.totalPrice * 1.18).toFixed(2);
  
  }

  checkout(){
    if(this.username==null){
      Swal.fire({
        title: "Authorization is required to place an order",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Log In",
        denyButtonText: `Register`
      }).then((result) => {
        if (result.isConfirmed) {
          setTimeout(() =>this.router.navigate(['/LogIn']))
        } else if (result.isDenied) {
          setTimeout(() =>this.router.navigate(['/registration']))
        }
      });   
    }else{
      Swal.fire({
      position: "center",
      icon: "success",
      title: "Thank You.",
      footer: 'Your order has been placed. Please check your email for the detailed delivery information.',
      showConfirmButton: false,
      timer: 2500
    });
    this.emptyCart();
    }
      
  }
    
  


  
}