import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ExpenseService } from '../../../services/expenses/expense.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
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
  userId: string = '';

  constructor(
    private expenseService: ExpenseService,
    private authService: AuthService
  ) {}

  ngOnInit() {
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

  applyDateRangeByType(rangeType: string) {
    const now = new Date();
    let start: Date;
    let end: Date;

    switch (rangeType) {
      case 'thisWeek':
        start = this.getStartOfWeek(now);
        end = this.getEndOfWeek(now);
        break;
      case 'lastWeek':
        const lastWeek = new Date(now);
        lastWeek.setDate(now.getDate() - 7);
        start = this.getStartOfWeek(lastWeek);
        end = this.getEndOfWeek(lastWeek);
        break;
      case 'thisMonth':
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'lastMonth':
        const lastMonth = new Date(now);
        lastMonth.setMonth(now.getMonth() - 1);
        start = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
        end = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0);
        break;
      case 'thisYear':
        start = new Date(now.getFullYear(), 0, 1);
        end = new Date(now.getFullYear(), 11, 31);
        break;
      case 'lastYear':
        const lastYear = now.getFullYear() - 1;
        start = new Date(lastYear, 0, 1);
        end = new Date(lastYear, 11, 31);
        break;
      default:
        return;
    }

    this.startdate = start.toISOString().split('T')[0];
    this.enddate = end.toISOString().split('T')[0];
    this.getExpenses();
  }

  getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(date.setDate(diff));
  }

  getEndOfWeek(date: Date): Date {
    const startOfWeek = this.getStartOfWeek(date);
    return new Date(startOfWeek.setDate(startOfWeek.getDate() + 6));
  }
}
