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
    return this.http.post(
      'https://backend-expense-tracker-evzg.onrender.com/api/expenses',
      data
    );
  }

  getUserExpenses(
    userId: string,
    startDate: string,
    endDate: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<any>(
      `https://backend-expense-tracker-evzg.onrender.com/api/expenses/${userId}`,
      {
        params,
      }
    );
  }

  calculateTotalExpenses(expenses: any[]): number {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  calculatePercentageChange(oldValue: number, newValue: number): number {
    if (oldValue === 0 && newValue === 0) {
      return 0;
    } else if (oldValue === 0) {
      return 100;
    } else {
      return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
    }
  }

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
    return this.http.delete(
      `https://backend-expense-tracker-evzg.onrender.com/api/expenses/${id}`
    );
  }

  getExpense(id: string): Observable<Expense> {
    return this.http.get<Expense>(
      `https://backend-expense-tracker-evzg.onrender.com/api/expenses/${id}`
    );
  }

  updateExpense(id: string, data: any): Observable<any> {
    return this.http.put(
      `https://backend-expense-tracker-evzg.onrender.com/api/expenses/${id}`,
      data
    );
  }

  getWeeklyExpenseChange(userId: string): Observable<any> {
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
        const percentageChange = this.calculatePercentageChange(
          lastWeekTotal,
          thisWeekTotal
        );

        return {
          oldValue: lastWeekTotal,
          newValue: thisWeekTotal,
          percentageChange,
        };
      })
    );
  }

  getMonthlyExpenseChange(userId: string): Observable<any> {
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
        const percentageChange = this.calculatePercentageChange(
          lastMonthTotal,
          thisMonthTotal
        );

        return {
          oldValue: lastMonthTotal,
          newValue: thisMonthTotal,
          percentageChange,
        };
      })
    );
  }

  getYearlyExpenseChange(userId: string): Observable<any> {
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
        const percentageChange = this.calculatePercentageChange(
          lastYearTotal,
          thisYearTotal
        );

        return {
          oldValue: lastYearTotal,
          newValue: thisYearTotal,
          percentageChange,
        };
      })
    );
  }
}
