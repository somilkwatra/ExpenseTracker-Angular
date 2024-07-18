import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ExpenseService } from '../../../services/expenses/expense.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../../../shared/update-dialog/update-dialog.component';
import { Expense } from '../../../shared/model';

@Component({
  selector: 'app-expense-home',
  templateUrl: './expense-home.component.html',
  styleUrls: ['./expense-home.component.scss'],
  providers: [DatePipe],
})
export class ExpenseHomeComponent implements OnInit {
  startPicker: MatDatepicker<Date> | undefined;
  endPicker: MatDatepicker<Date> | undefined;

  displayedColumns: string[] = [
    'sno',
    'date',
    'name',
    'amount',
    'category',
    'action',
  ];
  dataSource = new MatTableDataSource<Expense>([]);

  startdate: string = '';
  enddate: string = '';
  userId: string = '';

  constructor(
    private expenseService: ExpenseService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.userId = this.authService.getUserIdFromToken(token) || '';
    console.log(this.userId);
    if (!this.userId) {
      this.authService.delibrateLogout();
    }
  }

  getExpenses() {
    console.log(this.startdate, this.enddate);
    if (this.startdate && this.enddate) {
      this.expenseService
        .getUserExpenses(this.userId, this.startdate, this.enddate)
        .subscribe((expenses: any[]) => {
          console.log(expenses);
          expenses.forEach((expense) => {
            expense.category = { name: expense.category };
          });
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
            now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)
          )
        );
        end = new Date();
        break;
      case 'lastWeek':
        start = new Date(now.setDate(now.getDate() - now.getDay() - 6));
        end = new Date(start);
        end.setDate(start.getDate() + 6);
        break;
      case 'thisMonth':
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date();
        break;
      case 'lastMonth':
        start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        end = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'thisYear':
        start = new Date(now.getFullYear(), 0, 1);
        end = new Date();
        break;
      case 'lastYear':
        start = new Date(now.getFullYear() - 1, 0, 1);
        end = new Date(now.getFullYear() - 1, 11, 31);
        break;
      case 'thisQuarter':
        start = new Date(
          now.getFullYear(),
          Math.floor(now.getMonth() / 3) * 3,
          1
        );
        end = new Date();
        break;
      case 'lastQuarter':
        const lastQuarterStartMonth = Math.floor((now.getMonth() - 3) / 3) * 3;
        start = new Date(now.getFullYear(), lastQuarterStartMonth, 1);
        end = new Date(now.getFullYear(), lastQuarterStartMonth + 3, 0);
        break;
      case 'firstQuarter':
        start = new Date(now.getFullYear() - 1, 0, 1);
        end = new Date(now.getFullYear() - 1, 2, 31);
        break;
      case 'secondQuarter':
        start = new Date(now.getFullYear() - 1, 3, 1);
        end = new Date(now.getFullYear() - 1, 5, 30);
        break;
      case 'thirdQuarter':
        start = new Date(now.getFullYear() - 1, 6, 1);
        end = new Date(now.getFullYear() - 1, 8, 30);
        break;
      case 'fourthQuarter':
        start = new Date(now.getFullYear() - 1, 9, 1);
        end = new Date(now.getFullYear() - 1, 11, 31);
        break;
      default:
        return;
    }

    this.startdate = start.toISOString().split('T')[0];
    this.enddate = end.toISOString().split('T')[0];
    this.getExpenses();
  }

  deleteExpense(id: string) {
    this.expenseService.deleteExpense(id).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter(
          (expense) => expense._id !== id
        );
        console.log('Expense deleted successfully');
        this.calculateTotalAmount();
      },
      (error) => {
        console.error('Error deleting expense:', error);
      }
    );
  }

  UpdateButton() {
    this.dialog.open(UpdateDialogComponent);
  }
}
