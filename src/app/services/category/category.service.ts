import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { category } from '../../shared/model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  addCategory(data: any) {
    return this.http.post('http://localhost:5000/api/category', data);
  }

  getCategoryByUserId(): Observable<category[]> {
    //const userId = sessionStorage.getItem()
    const token = localStorage.getItem('token');
    const userId = this.authService.getUserIdFromToken(token);
    return this.http.get<category[]>(
      `http://localhost:5000/api/category/${userId}`
    );
  }
  deleteCategory(id: string) {
    return this.http.delete(`http://localhost:5000/api/category/${id}`);
  }
}
