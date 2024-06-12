import { Component, OnInit } from '@angular/core';
import { SignComponent } from '../sign/sign.component';
import { LoginService } from '../services/login.service';
import { CartService } from '../services/cart.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  // imports:[MatButtonModule, MatMenuModule]
})
export class NavbarComponent implements OnInit{
  constructor(private loginsvc:LoginService, private cartsvc:CartService){}

  username!: any;
  cartItemCount: number = 0;

 ngOnInit() {
  this.loginsvc.user$.subscribe(user => this.username = user);
  // console.log(this.username.firstName)
  this.cartsvc.cartItemsChanged.subscribe(() => {
    this.cartItemCount = this.cartsvc.getCartItemsFromSession().length;
  });
}

logout(): void {
  this.loginsvc.logout();
}
// console.log(this.username)
}
