import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

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
    if (oldValue === 0) {
      return newValue === 0 ? 0 : 100; // Avoid division by zero
    }
    return ((newValue - oldValue) / oldValue) * 100;
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
  public getThisWeekStartDate(): string {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const startDate = new Date(now.setDate(diff));
    return startDate.toISOString().split('T')[0];
  }

  public getThisWeekEndDate(): string {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const endDate = new Date(now.setDate(diff + 6));
    return endDate.toISOString().split('T')[0];
  }

  public getLastWeekStartDate(): string {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day - 7 + (day === 0 ? -6 : 1);
    const startDate = new Date(now.setDate(diff));
    return startDate.toISOString().split('T')[0];
  }

  public getLastWeekEndDate(): string {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day - 7 + (day === 0 ? -6 : 1);
    const endDate = new Date(now.setDate(diff + 6));
    return endDate.toISOString().split('T')[0];
  }

  public getThisMonthStartDate(): string {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    return startDate.toISOString().split('T')[0];
  }

  public getThisMonthEndDate(): string {
    const now = new Date();
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return endDate.toISOString().split('T')[0];
  }

  public getLastMonthStartDate(): string {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return startDate.toISOString().split('T')[0];
  }

  public getLastMonthEndDate(): string {
    const now = new Date();
    const endDate = new Date(now.getFullYear(), now.getMonth(), 0);
    return endDate.toISOString().split('T')[0];
  }

  public getThisYearStartDate(): string {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), 0, 1);
    return startDate.toISOString().split('T')[0];
  }

  public getThisYearEndDate(): string {
    const now = new Date();
    const endDate = new Date(now.getFullYear(), 11, 31);
    return endDate.toISOString().split('T')[0];
  }

  public getLastYearStartDate(): string {
    const now = new Date();
    const startDate = new Date(now.getFullYear() - 1, 0, 1);
    return startDate.toISOString().split('T')[0];
  }

  public getLastYearEndDate(): string {
    const now = new Date();
    const endDate = new Date(now.getFullYear() - 1, 11, 31);
    return endDate.toISOString().split('T')[0];
  }
}
