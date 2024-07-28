import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, user } from '../../shared/model';
import { BehaviorSubject, map } from 'rxjs';
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

          const accessToken = res.body.accessToken;
          localStorage.setItem('token', accessToken);

          this.router.navigate(['expense-home/expense-home']);
          this.dialog.open(SucessDialogComponent);
        },
        (error) => {
          console.error('Error:', error);
          this.dialog.open(ErrorDialogComponent);
        }
      );
  }

  reload() {
    if (localStorage.getItem('token')) {
      this.validateToken(localStorage.getItem('token')!).subscribe((valid) => {
        if (valid) {
          this.isLoggedIn.next(true);
          this.router.navigate(['expense-home/expense-home']);
        } else {
          this.delibrateLogout();
        }
      });
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

          const accessToken = res.body.accessToken;
          localStorage.setItem('token', accessToken);

          this.router.navigate(['expense-home/expense-home']);
          this.dialog.open(SucessDialogComponent);
        },
        (error) => {
          console.error('Error:', error);
          this.dialog.open(ErrorDialogComponent);
        }
      );
  }

  base64UrlDecode(base64Url: string) {
    if (base64Url) {
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
    } else {
      return null;
    }
  }

  getUserIdFromToken(token: any): string | null {
    const decodedToken = this.decodeJwt(token);
    return decodedToken ? decodedToken.id : null;
  }

  decodeJwt(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = this.base64UrlDecode(payload);

    if (decodedPayload) {
      return JSON.parse(decodedPayload);
    } else {
      return null;
    }
  }

  delibrateLogout() {
    localStorage.removeItem('token');
    this.isLoggedIn.next(false);
    this.router.navigate(['auth/signin']);
  }

  validateToken(token: string) {
    return this.http
      .post<{ valid: boolean }>(
        'https://backend-expense-tracker-evzg.onrender.com/api/auth/validate-token',
        { token }
      )
      .pipe(map((response) => response.valid));
  }
}
