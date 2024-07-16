import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient) {}

  addExpense(data: any) {
    return this.http.post('http://localhost:5000/api/expenses', data);
  }

  getUserExpenses(
    userId: string,
    startDate: string,
    endDate: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<any>(`http://localhost:5000/api/expenses/${userId}`, {
      params,
    });
  }
}
