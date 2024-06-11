import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { product } from '../product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  product!:any
  productID!:number
  randomProduct!: any;
  products:product[]=[];  


  constructor(private productsvc: ProductsService, private activeLink: ActivatedRoute) { }

  randomizer(){
    const randomIndex = Math.floor(Math.random() * this.products.length); 
    this.randomProduct = this.products[randomIndex]; 
    return this.randomProduct;
  }
 

  
  ngOnInit(): void { 
    this.productsvc.products$.subscribe((data: any) => { 
      this.products=data;
      // console.log(this.products)
  
    const randomIndex = Math.floor(Math.random() * this.products.length); 
    this.randomProduct = this.products[randomIndex]; 
    return this.randomProduct;
    
    }); 
    this.productID=+this.activeLink.snapshot.params['id'];
    this.product=this.productsvc.products.find((item:any)=>item.id===this.productID)
  }

}


