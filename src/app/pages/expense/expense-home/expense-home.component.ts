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
    switch (rangeType) {
      case 'thisWeek':
        this.setThisWeekRange();
        break;
      case 'lastWeek':
        this.setLastWeekRange();
        break;
      case 'thisMonth':
        this.setThisMonthRange();
        break;
      case 'lastMonth':
        this.setLastMonthRange();
        break;
      case 'thisYear':
        this.setThisYearRange();
        break;
      case 'lastYear':
        this.setLastYearRange();
        break;
      default:
        return;
    }

    this.getExpenses();
  }

  private setThisWeekRange() {
    this.startdate = this.expenseService.getThisWeekStartDate();
    this.enddate = this.expenseService.getThisWeekEndDate();
  }

  private setLastWeekRange() {
    this.startdate = this.expenseService.getLastWeekStartDate();
    this.enddate = this.expenseService.getLastWeekEndDate();
  }

  private setThisMonthRange() {
    this.startdate = this.expenseService.getThisMonthStartDate();
    this.enddate = this.expenseService.getThisMonthEndDate();
  }

  private setLastMonthRange() {
    this.startdate = this.expenseService.getLastMonthStartDate();
    this.enddate = this.expenseService.getLastMonthEndDate();
  }

  private setThisYearRange() {
    this.startdate = this.expenseService.getThisYearStartDate();
    this.enddate = this.expenseService.getThisYearEndDate();
  }

  private setLastYearRange() {
    this.startdate = this.expenseService.getLastYearStartDate();
    this.enddate = this.expenseService.getLastYearEndDate();
  }
}
