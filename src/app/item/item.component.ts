import { ChangeDetectorRef, Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { LoginService } from '../services/login.service';

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
  username!: any;
  reviews!:any[]
  review=''

  constructor( private activeLink: ActivatedRoute, private productsvc: ProductsService, 
    private cartsvc: CartService, private loginsvc:LoginService) {  }
  
  ngOnInit(): void { 
    this.productID=+this.activeLink.snapshot.params['id'];
    this.productsvc.getProducts().subscribe((data: any) => {
      this.product = data.products.find((item: any) => item.id === this.productID);
    });

    
    this.loginsvc.user$.subscribe(user => this.username = user);
    this.getReviews();
  }
  

  addtoCart(item:any){
    this.cartsvc.addToCart(item)
  }


  // randomizeItem(){
  //   const randomIndex = Math.floor(Math.random() * this.productsvc.products.length); 
  //   console.log(this.randomProduct)
  //   this.randomProduct = this.productsvc.products[randomIndex]; 
  //   console.log(this.randomProduct)
  //   return this.randomProduct;
  // }

  addreview(){
    if(this.username!==null){
      const review = {
        name: this.username.firstName,
        text: this.review,
      };
      this.reviews.push(review); 
      sessionStorage.setItem('reviews', JSON.stringify(this.reviews));
      this.review = '';
    }
  }
  getReviews() {
    const savedReviews = sessionStorage.getItem('reviews');
    
    if(savedReviews) {
      this.reviews = JSON.parse(savedReviews);
    }
  }
  

}
