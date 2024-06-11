import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  link='https://dummyjson.com/auth/login';
  private userSubject: BehaviorSubject<any>;
  public user$: Observable<any>;

  constructor(private http:HttpClient) {  
    const signedUser = localStorage.getItem('user');
    this.userSubject = new BehaviorSubject<any>(signedUser ? JSON.parse(signedUser) : null);
    this.user$=this.userSubject.asObservable()
  }
  public get userValue(): any {
    return this.userSubject.value;
  }

  logIn(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body={username, password}
    return this.http.post<any>(this.link, body, {headers}).pipe(tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
      }));
    }
   

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    Swal.fire({
      title: "You are logged out.",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
  }

  isLoggedIn(): boolean {
    return !!this.userValue;
  }

  getUser(): any {
      return this.userSubject.getValue();
  }
}
