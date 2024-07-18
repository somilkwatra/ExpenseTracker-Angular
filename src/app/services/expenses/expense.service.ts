import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Expense } from '../../shared/model';

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

  // Calculate total expenses for a period
  public calculateTotalExpenses(expenses: any[]): number {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  // Calculate percentage change
  public calculatePercentageChange(oldValue: number, newValue: number): number {
    if (oldValue === 0 && newValue === 0) {
      return 0; // Both old and new values are zero
    } else if (oldValue === 0) {
      return 100; // Old value is zero, percentage change is 100%
    } else {
      return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
    }
  }

  // Get percentage change for week
  getWeeklyExpenseChange(userId: string): Observable<number> {
    const thisWeekStartDate = this.getThisWeekStartDate();
    const thisWeekEndDate = this.getThisWeekEndDate();
    const lastWeekStartDate = this.getLastWeekStartDate();
    const lastWeekEndDate = this.getLastWeekEndDate();

    const thisWeekExpenses$ = this.getUserExpenses(
      userId,
      thisWeekStartDate,
      thisWeekEndDate
    );
    const lastWeekExpenses$ = this.getUserExpenses(
      userId,
      lastWeekStartDate,
      lastWeekEndDate
    );

    return forkJoin([thisWeekExpenses$, lastWeekExpenses$]).pipe(
      map(([thisWeekExpenses, lastWeekExpenses]) => {
        const thisWeekTotal = this.calculateTotalExpenses(thisWeekExpenses);
        const lastWeekTotal = this.calculateTotalExpenses(lastWeekExpenses);
        console.log('This Week Total:', thisWeekTotal);
        console.log('Last Week Total:', lastWeekTotal);
        return this.calculatePercentageChange(lastWeekTotal, thisWeekTotal);
      })
    );
  }

  // Get percentage change for month
  getMonthlyExpenseChange(userId: string): Observable<number> {
    const thisMonthStartDate = this.getThisMonthStartDate();
    const thisMonthEndDate = this.getThisMonthEndDate();
    const lastMonthStartDate = this.getLastMonthStartDate();
    const lastMonthEndDate = this.getLastMonthEndDate();

    const thisMonthExpenses$ = this.getUserExpenses(
      userId,
      thisMonthStartDate,
      thisMonthEndDate
    );
    const lastMonthExpenses$ = this.getUserExpenses(
      userId,
      lastMonthStartDate,
      lastMonthEndDate
    );

    return forkJoin([thisMonthExpenses$, lastMonthExpenses$]).pipe(
      map(([thisMonthExpenses, lastMonthExpenses]) => {
        const thisMonthTotal = this.calculateTotalExpenses(thisMonthExpenses);
        const lastMonthTotal = this.calculateTotalExpenses(lastMonthExpenses);
        console.log('This Month Total:', thisMonthTotal);
        console.log('Last Month Total:', lastMonthTotal);
        return this.calculatePercentageChange(lastMonthTotal, thisMonthTotal);
      })
    );
  }

  // Get percentage change for year
  getYearlyExpenseChange(userId: string): Observable<number> {
    const thisYearStartDate = this.getThisYearStartDate();
    const thisYearEndDate = this.getThisYearEndDate();
    const lastYearStartDate = this.getLastYearStartDate();
    const lastYearEndDate = this.getLastYearEndDate();

    const thisYearExpenses$ = this.getUserExpenses(
      userId,
      thisYearStartDate,
      thisYearEndDate
    );
    const lastYearExpenses$ = this.getUserExpenses(
      userId,
      lastYearStartDate,
      lastYearEndDate
    );

    return forkJoin([thisYearExpenses$, lastYearExpenses$]).pipe(
      map(([thisYearExpenses, lastYearExpenses]) => {
        const thisYearTotal = this.calculateTotalExpenses(thisYearExpenses);
        const lastYearTotal = this.calculateTotalExpenses(lastYearExpenses);
        console.log('This Year Total:', thisYearTotal);
        console.log('Last Year Total:', lastYearTotal);
        return this.calculatePercentageChange(lastYearTotal, thisYearTotal);
      })
    );
  }

  // Helper functions to get date ranges
  getThisWeekStartDate(): string {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const startDate = new Date(now.setDate(diff));
    return startDate.toISOString().split('T')[0];
  }

  getThisWeekEndDate(): string {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const endDate = new Date(now.setDate(diff + 6));
    return endDate.toISOString().split('T')[0];
  }

  getLastWeekStartDate(): string {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day - 7 + (day === 0 ? -6 : 1);
    const startDate = new Date(now.setDate(diff));
    return startDate.toISOString().split('T')[0];
  }

  getLastWeekEndDate(): string {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day - 7 + (day === 0 ? -6 : 1);
    const endDate = new Date(now.setDate(diff + 6));
    return endDate.toISOString().split('T')[0];
  }

  getThisMonthStartDate(): string {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    return startDate.toISOString().split('T')[0];
  }

  getThisMonthEndDate(): string {
    const now = new Date();
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return endDate.toISOString().split('T')[0];
  }

  getLastMonthStartDate(): string {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return startDate.toISOString().split('T')[0];
  }

  getLastMonthEndDate(): string {
    const now = new Date();
    const endDate = new Date(now.getFullYear(), now.getMonth(), 0);
    return endDate.toISOString().split('T')[0];
  }

  getThisYearStartDate(): string {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), 0, 1);
    return startDate.toISOString().split('T')[0];
  }

  getThisYearEndDate(): string {
    const now = new Date();
    const endDate = new Date(now.getFullYear(), 11, 31);
    return endDate.toISOString().split('T')[0];
  }

  getLastYearStartDate(): string {
    const now = new Date();
    const startDate = new Date(now.getFullYear() - 1, 0, 1);
    return startDate.toISOString().split('T')[0];
  }

  getLastYearEndDate(): string {
    const now = new Date();
    const endDate = new Date(now.getFullYear() - 1, 11, 31);
    return endDate.toISOString().split('T')[0];
  }
  deleteExpense(id: string) {
    return this.http.delete(`http://localhost:5000/api/expenses/${id}`);
  }
  getExpense(id: string): Observable<Expense> {
    return this.http.get<Expense>(`http://localhost:5000/api/expenses/${id}`);
  }
  updateExpense(id: string, data: any): Observable<any> {
    return this.http.put(`http://localhost:5000/api/expenses/${id}`, data);
  }
}
