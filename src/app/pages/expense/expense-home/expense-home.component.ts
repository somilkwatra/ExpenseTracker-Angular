import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ExpenseService } from '../../../services/expenses/expense.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  subWeeks,
  subMonths,
  subYears,
} from 'date-fns';
import { AuthService } from '../../../services/auth/auth.service';

interface Expense {
  sno: number;
  date: string;
  name: string;
  amount: number;
}

@Component({
  selector: 'app-expense-home',
  templateUrl: './expense-home.component.html',
  styleUrls: ['./expense-home.component.scss'],
  providers: [DatePipe],
})
export class ExpenseHomeComponent implements OnInit {
  startPicker: MatDatepicker<Date> | undefined;
  endPicker: MatDatepicker<Date> | undefined;

  displayedColumns: string[] = ['sno', 'date', 'name', 'amount', 'action'];
  dataSource = new MatTableDataSource<Expense>([]);

  startdate: string = '';
  enddate: string = '';
  userId: string = ''; // Added user ID

  constructor(
    private expenseService: ExpenseService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // this.userId = sessionStorage.getItem('id') || '';

    const token = localStorage.getItem('token');
    this.userId = this.authService.getUserIdFromToken(token) || '';
  }

  getExpenses() {
    if (this.startdate && this.enddate) {
      this.expenseService
        .getUserExpenses(this.userId, this.startdate, this.enddate)
        .subscribe((expenses) => {
          this.dataSource.data = expenses;
          this.calculateTotalAmount();
        });
    } else {
      console.warn('Please select start and end dates.');
    }
  }

  calculateTotalAmount() {
    let total = 0;
    this.dataSource.data.forEach((expense) => {
      total += expense.amount;
    });
    document.getElementById('total-amount')!.textContent = total.toString();
  }

  onStartDateChange(event: any) {
    this.startdate = event.value.toISOString().split('T')[0];
  }

  onEndDateChange(event: any) {
    this.enddate = event.value.toISOString().split('T')[0];
  }

  applyDateRange() {
    this.getExpenses();
  }

  applyThisWeek() {
    const now = new Date();
    this.startdate = startOfWeek(now, { weekStartsOn: 1 })
      .toISOString()
      .split('T')[0];
    this.enddate = endOfWeek(now, { weekStartsOn: 1 })
      .toISOString()
      .split('T')[0];
    this.getExpenses();
  }

  applyThisMonth() {
    const now = new Date();
    this.startdate = startOfMonth(now).toISOString().split('T')[0];
    this.enddate = endOfMonth(now).toISOString().split('T')[0];
    this.getExpenses();
  }

  applyLastWeek() {
    const now = new Date();
    const lastWeekStart = startOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });
    const lastWeekEnd = endOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });
    this.startdate = lastWeekStart.toISOString().split('T')[0];
    this.enddate = lastWeekEnd.toISOString().split('T')[0];
    this.getExpenses();
  }

  applyLastMonth() {
    const now = new Date();
    const lastMonthStart = startOfMonth(subMonths(now, 1));
    const lastMonthEnd = endOfMonth(subMonths(now, 1));
    this.startdate = lastMonthStart.toISOString().split('T')[0];
    this.enddate = lastMonthEnd.toISOString().split('T')[0];
    this.getExpenses();
  }

  applyThisYear() {
    const now = new Date();
    this.startdate = startOfYear(now).toISOString().split('T')[0];
    this.enddate = endOfYear(now).toISOString().split('T')[0];
    this.getExpenses();
  }

  applyLastYear() {
    const now = new Date();
    const lastYearStart = startOfYear(subYears(now, 1));
    const lastYearEnd = endOfYear(subYears(now, 1));
    this.startdate = lastYearStart.toISOString().split('T')[0];
    this.enddate = lastYearEnd.toISOString().split('T')[0];
    this.getExpenses();
  }
}
