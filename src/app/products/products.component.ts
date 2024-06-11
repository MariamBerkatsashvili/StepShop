import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { ProductsService } from '../services/products.service';
// import Swal from 'sweetalert2';
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
 

  //შევქმნათ ახალი ივენთი (ივენთემითერის ინსტანსი) და გამოვიძახოთ- დავა-ემით-ოთ
  selectedCategory:string = 'all';
  onSelect: EventEmitter<string> = new EventEmitter<string>()

  filterCategories(){
    this.onSelect.emit(this.selectedCategory);
  }

  selectedMaxPrice!: number;
  maxPrice: number=2500;
  products:product[]=[];  


  // filterProductsByPrice(event:any) {
  //   if (event && event.source) {
  //     const minPrice = event.source._elementRef.nativeElement.getElementsByClassName('mat-slider-thumb')[0].getElementsByTagName('input')[0].value;
  //     const maxPrice = event.source._elementRef.nativeElement.getElementsByClassName('mat-slider-thumb')[1].getElementsByTagName('input')[0].value;
  // }
    
  // }

  ngOnInit():void { 
    //subject-ის subscribe პროდუქტების api-დან
    this.productsvc.products$.subscribe((data: any) => { 
      // console.log(...data); 
      this.products=[...data];
      
      this.maxPrice = Math.max(...this.products.map(product => product.price));
      this.selectedMaxPrice = this.maxPrice;
    }); 

  }
  

  //search
  onSearch: EventEmitter<string> = new EventEmitter<string>();

  searchingBar: string = '';
  filteredProducts: product[] = [];

  // SearchCategories() {
  //   this.searchingBar = '';
  //   // this.onSearch.emit({category: this.selectedCategory, name: this.searchingBar });
  // }

  // updateSearchingBar() {
  //   if (this.searchingBar) {
  //     this.onSearch.emit(this.searchingBar);
  // //     this.filteredProducts = this.products.filter(product => 
  // //       product.title.toLowerCase().includes(this.searchingBar.toLowerCase())
  // //     );
  // //   } else {
  // //     this.filteredProducts = [...this.products];
  // // }

  // }
// }
addtoCart(item:any){
  this.cartsvc.addToCart(item)

}

}
