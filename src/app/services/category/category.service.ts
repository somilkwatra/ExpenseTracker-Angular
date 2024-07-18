import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { category } from '../../shared/model';
import { AuthService } from '../auth/auth.service';
import { CategoryUsage } from '../../shared/model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  addCategory(data: any) {
    return this.http.post(
      'https://backend-expense-tracker-evzg.onrender.com/api/category',
      data
    );
  }

  getCategoryByUserId(category?: any): Observable<category[]> {
    //const userId = sessionStorage.getItem()
    const token = localStorage.getItem('token');
    const userId = this.authService.getUserIdFromToken(token);
    return this.http.get<category[]>(
      `https://backend-expense-tracker-evzg.onrender.com/api/category/${userId}`
    );
  }
  deleteCategory(id: string) {
    return this.http.delete(
      `https://backend-expense-tracker-evzg.onrender.com/api/category/${id}`
    );
  }

  mostUsedCategory(userId: string): Observable<CategoryUsage> {
    return this.http.get<CategoryUsage>(
      `https://backend-expense-tracker-evzg.onrender.com/api/category/most-used/${userId}`
    );
  }

  leastUsedCategory(userId: string): Observable<CategoryUsage> {
    return this.http.get<CategoryUsage>(
      `https://backend-expense-tracker-evzg.onrender.com/api/category/least-used/${userId}`
    );
  }
}
