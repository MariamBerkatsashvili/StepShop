import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { product } from '../product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  products:product[]=[];
  cartItems=[]

  constructor(private http: HttpClient ) { 
    this.getProducts();
   
  }
// https://api.escuelajs.co/api/v1/products
// https://fakestoreapi.com/products
// https://api.restful-api.dev/objects

  private subject=new Subject<any>()
  products$=this.subject.asObservable()

  getProducts(){
    return this.http.get<any>('https://dummyjson.com/products').subscribe({
      next: (data)=> {
        this.products = data.products;
        this.subject.next(data.products);
      },
      error: (err)=>this.subject.error(err)
    })
  }
  
 
}

  // getProducts():Observable<any>{
  //   return this.http.get<any>('https://freetestapi.com/api/v1/products')
  // }

  // productsObs$=new Observable((observer)=>{
  //   observer.next(this.products)
  // })

