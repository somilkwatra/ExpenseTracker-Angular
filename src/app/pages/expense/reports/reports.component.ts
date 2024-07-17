import { CategoryService } from './../../../services/category/category.service';
import { ExpenseService } from './../../../services/expenses/expense.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  weeklyChange: number | null = null;
  monthlyChange: number | null = null;
  yearlyChange: number | null = null;

  constructor(
    private expenseService: ExpenseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const userId = this.authService.getUserIdFromToken(token);

    if (userId) {
      this.expenseService.getWeeklyExpenseChange(userId).subscribe(
        (change) => {
          this.weeklyChange = change;
          console.log('Weekly Change:', change);
        },
        (error) => {
          console.error('Error fetching weekly change:', error);
        }
      );

      this.expenseService.getMonthlyExpenseChange(userId).subscribe(
        (change) => {
          this.monthlyChange = change;
          console.log('Monthly Change:', change);
        },
        (error) => {
          console.error('Error fetching monthly change:', error);
        }
      );

      this.expenseService.getYearlyExpenseChange(userId).subscribe(
        (change) => {
          this.yearlyChange = change;
          console.log('Yearly Change:', change);
        },
        (error) => {
          console.error('Error fetching yearly change:', error);
        }
      );
    } else {
      console.error('User ID is null');
    }
  }
}
