import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, user } from '../../shared/model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SucessDialogComponent } from '../../shared/sucess-dialog/sucess-dialog.component';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}

  userSignUp(data: user) {
    console.log('Service Called');
    this.http
      .post<any>(
        'https://backend-expense-tracker-evzg.onrender.com/api/auth/register',
        data,
        {
          observe: 'response',
        }
      )
      .subscribe(
        (res) => {
          this.isLoggedIn.next(true);
          console.warn(res.body);

          const accessToken = res.body.accessToken;
          const id = res.body.result._id;
          localStorage.setItem('token', accessToken);

          // sessionStorage.setItem('id', id);

          this.router.navigate(['expense/expense-home']);
          console.log('Opening success dialog...');
          this.dialog.open(SucessDialogComponent);
        },
        (error) => {
          console.error('Error:', error);
          console.log('Opening error dialog...');
          this.dialog.open(ErrorDialogComponent);
        }
      );
  }

  reload() {
    if (localStorage.getItem('token')) {
      this.isLoggedIn.next(true);
      this.router.navigate(['expense/expense-home']);
    }
  }

  login(data: login) {
    console.log('Service Called');
    this.http
      .post<any>(
        'https://backend-expense-tracker-evzg.onrender.com/api/auth/login',
        data,
        {
          observe: 'response',
        }
      )
      .subscribe(
        (res) => {
          this.isLoggedIn.next(true);
          console.warn(res.body);

          const accessToken = res.body.accessToken;
          const id = res.body.result._id;
          localStorage.setItem('token', accessToken);
          // sessionStorage.setItem('id', id);

          this.router.navigate(['expense/expense-home']);
          console.log('Opening success dialog...');
          this.dialog.open(SucessDialogComponent);
        },
        (error) => {
          console.error('Error:', error);
          console.log('Opening error dialog...');
          this.dialog.open(ErrorDialogComponent);
        }
      );
  }
  //  async getIdFromToken(){
  //     let token= localStorage.getItem('token')
  //     if(token){
  //      const decodedToken=await jwt_decode(token)
  //     }else{
  //       return null
  //     }
  //   }
  //   decodeToken(){

  //     try {
  //       let token= localStorage.getItem('token')
  //       return jwt_decode(token)
  //     } catch (error) {

  //     }
  //   }

  base64UrlDecode(base64Url: string): string {
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padding = base64.length % 4;
    if (padding === 2) {
      base64 += '==';
    } else if (padding === 3) {
      base64 += '=';
    }
    return decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
  }

  getUserIdFromToken(token: any): string | null {
    const decodedToken = this.decodeJwt(token);
    return decodedToken ? decodedToken.id : null;
  }
  decodeJwt(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = this.base64UrlDecode(payload);
    return JSON.parse(decodedPayload);
  }
}
