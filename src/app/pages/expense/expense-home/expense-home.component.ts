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
        start = new Date(
          now.setDate(
            now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1)
          )
        );
        end = new Date(now.setDate(now.getDate() + 6));

        break;
      case 'lastWeek':
        const lastWeekStart = new Date(
          now.setDate(now.getDate() - now.getDay() - 7)
        );
        start = new Date(lastWeekStart.setDate(lastWeekStart.getDate()));
        end = new Date(lastWeekStart.setDate(lastWeekStart.getDate() + 6));
        break;
      case 'thisMonth':
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'lastMonth':
        const lastMonthStart = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          1
        );
        start = lastMonthStart;
        end = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'thisYear':
        start = new Date(now.getFullYear(), 0, 1);
        end = new Date(now.getFullYear(), 11, 31);
        break;
      case 'lastYear':
        start = new Date(now.getFullYear() - 1, 0, 1);
        end = new Date(now.getFullYear() - 1, 11, 31);
        break;
      default:
        return;
    }

    this.startdate = start.toISOString().split('T')[0];
    this.enddate = end.toISOString().split('T')[0];
    this.getExpenses();
  }
}
