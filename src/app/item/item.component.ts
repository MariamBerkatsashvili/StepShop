import { ChangeDetectorRef, Component, Pipe } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  product:any
  productID!:number
  // products:product[]=[];  
  // randomProduct!: any;
  username: any;
  reviews:any[]=[]
  review=''
  raiting: number = 0;
  productName=''

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

  setRating(raiting: number) {
    this.raiting = raiting;
    sessionStorage.setItem('starRating', this.raiting.toString());
    
  }
  addreview(){
    if(this.username!==null && this.raiting>0 && this.review.trim()!==''){
      const review = {
        productID:this.productID,
        name:this.username.firstName,
        raiting:this.raiting,
        productName:this.productName,
        text:this.review,
      };
      this.reviews.push(review); 
      sessionStorage.setItem('reviews', JSON.stringify(this.reviews));
      this.review = '';
      this.raiting = 0;
      this.productName=''
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all required fields.",
      });
    }
  }
  getReviews() {
    const savedReviews = sessionStorage.getItem('reviews');
    
    if(savedReviews) {
      this.reviews = JSON.parse(savedReviews);
    }
  }
 
  removeReview(review:any){
    const index = this.reviews.indexOf(review);
    this.reviews.splice(index, 1);
    sessionStorage.setItem('reviews', JSON.stringify(this.reviews));
  }

  
  // randomizeItem(){
  //   const randomIndex = Math.floor(Math.random() * this.productsvc.products.length); 
  //   console.log(this.randomProduct)
  //   this.randomProduct = this.productsvc.products[randomIndex]; 
  //   console.log(this.randomProduct)
  //   return this.randomProduct;
  // }

}
