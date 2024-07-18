import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { account } from '../../shared/model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  passwordChange(data: account) {
    // const id = sessionStorage.getItem('id');
    const token = localStorage.getItem('token');
    const id = this.authService.getUserIdFromToken(token);
    return this.http.put(
      `https://backend-expense-tracker-evzg.onrender.com/api/users/${id}`,
      data
    );
  }
}
