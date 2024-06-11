
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'], 

})


export class RegistrationComponent {
  constructor(private router: Router){}

  myForm!:FormGroup

  ngOnInit(){
    this.myForm=new FormGroup({
      fullName:new FormControl('',Validators.required),
      userName:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
    })
  }



  sendInfo(){
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Registration Successful!",
      showConfirmButton: false,
      timer: 1500
    });

    setTimeout(() =>this.router.navigate(['/LogIn']))
        
    
  }

}

