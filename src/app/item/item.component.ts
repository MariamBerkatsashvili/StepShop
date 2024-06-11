import { Component } from '@angular/core';
import { product } from '../product';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  product!:any
  productID!:number
  // products:product[]=[];  
  randomProduct!: any;


  constructor( private activeLink: ActivatedRoute, private productsvc: ProductsService, private cartsvc: CartService) { 
    // this.randomizeItem, this.randomProduct
  }
  
  ngOnInit(): void { 
    this.productID=+this.activeLink.snapshot.params['id'];
    this.product=this.productsvc.products.find((item:any)=>item.id===this.productID)
  }

  addtoCart(item:any){
    this.cartsvc.addToCart(item)
  }
// this.activeLink.params.subscribe((data)=>{
    //   this.productID= +data['id']
    //   console.log(data['id'])
    //   this.product=this.productsvc.products.find((product:any)=>{
    //     return product.id===this.productID
    //   })
    // })
    // imager(item:any){
    //   return '/assets/images'+ItemComponent.img
    // }


  randomizeItem(){
    const randomIndex = Math.floor(Math.random() * this.productsvc.products.length); 
    console.log(this.randomProduct)
    this.randomProduct = this.productsvc.products[randomIndex]; 
    console.log(this.randomProduct)
    return this.randomProduct;
  }
}