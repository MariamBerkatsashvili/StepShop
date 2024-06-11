import { HttpClient } from '@angular/common/http';
import { Component, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent {
  constructor(private http: HttpClient, private router: Router, private loginsvc: LoginService) {}

  user!: string;
  paroli!: string;
  isSigned: boolean = false;

  // redirect() { 
  //   window.location.replace("http://localhost:4200/products");
  // }

  login(user: string, paroli: string) {
    this.loginsvc.logIn(user, paroli).subscribe({
      next: () => {
        setTimeout(() =>this.router.navigate(['/products']));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You are logged in",
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: (err) => {
        console.log(err.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid username or password",
        });
      }
    });
  }
}


