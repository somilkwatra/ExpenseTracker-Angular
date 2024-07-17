import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { ExpenseService } from './../../../services/expenses/expense.service';
import { CategoryService } from './../../../services/category/category.service';
import { CategoryUsage } from './../../../shared/model'; // Ensure CategoryUsage is imported

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  weeklyChange: number | null = null;
  monthlyChange: number | null = null;
  yearlyChange: number | null = null;
  mostUsedCategory: CategoryUsage | undefined;
  leastUsedCategory: CategoryUsage | undefined;

  constructor(
    private expenseService: ExpenseService,
    private authService: AuthService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const userId = this.authService.getUserIdFromToken(token);

    if (userId) {
      // Fetching weekly, monthly, and yearly changes
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

      // Fetching most used category
      this.categoryService.mostUsedCategory(userId).subscribe(
        (categoryUsage) => {
          this.mostUsedCategory = categoryUsage;
          console.log('Most Used Category:', categoryUsage);
        },
        (error) => {
          console.error('Error fetching most used category:', error);
        }
      );

      // Fetching least used category
      this.categoryService.leastUsedCategory(userId).subscribe(
        (categoryUsage) => {
          this.leastUsedCategory = categoryUsage;
          console.log('Least Used Category:', categoryUsage);
        },
        (error) => {
          console.error('Error fetching least used category:', error);
        }
      );
    } else {
      console.error('User ID is null');
    }
  }
}
