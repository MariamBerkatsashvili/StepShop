import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { ProductsService } from '../services/products.service';
import { product } from '../product';
import { HttpClient } from '@angular/common/http';
// import { Pipe } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  
  constructor(private http:HttpClient, private productsvc: ProductsService, private cartsvc: CartService) { }
  
  
  //პროდუქტების რაოდენობები კატეგორიებში
  everything(){return this.products.length;}
  beauty(){return this.products.filter(product=>product.category==='beauty').length}
  fragrances(){return this.products.filter(product=>product.category==='fragrances').length}
  furniture(){return this.products.filter(product=>product.category==='furniture').length}
  groceries(){return this.products.filter(product=>product.category==='groceries').length}
 

  //შევქმნათ ახალი ივენთი (ივენთემითერის ინსტანსი) და გამოვიძახოთ- დავაემითოთ
  products:product[]=[];  
  selectedCategory:string = 'all';
  onSelect: EventEmitter<string> = new EventEmitter<string>()
  priceFilterValue:number=0;

  filterCategories(){
    this.onSelect.emit(this.selectedCategory);
  }

  // filterProductsByPrice() {
  //   return this.products.filter(product =>product.price>=this.priceFilterValue);
  // }

  
  ngOnInit(): void {
    this.productsvc.getProducts().subscribe({
      next: (data) => {
        this.products = data.products;
      },
      error: (err) => console.error(err)
    });
  }
  
  filteredProducts: product[] = [];


addtoCart(item:any){
  this.cartsvc.addToCart(item);
}

}
