import { AuthService } from './../../../services/auth/auth.service';
import { category } from './../../../shared/model';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../../../shared/category-dialog/category-dialog.component';
import { CategoryService } from '../../../services/category/category.service';
import { ExpenseService } from '../../../services/expenses/expense.service';
import { ExpenseDialogComponent } from '../../../shared/expense-dialog/expense-dialog.component';

@Component({
  selector: 'app-log-expense',
  templateUrl: './log-expense.component.html',
  styleUrls: ['./log-expense.component.scss'],
})
export class LogExpenseComponent implements OnInit {
  date = new FormControl(new Date());
  categories: category[] = [];
  Categories = new FormControl('');

  constructor(
    public dialog: MatDialog,
    private categoryService: CategoryService,
    private expenseService: ExpenseService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getCategoriesById();
  }

  showDialog() {
    const dialogRef = this.dialog.open(CategoryDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.getCategoriesById();
    });
  }

  getCategoriesById() {
    this.categoryService.getCategoryByUserId().subscribe(
      (res: any) => {
        this.categories = res;
        console.log('Categories loaded:', this.categories);
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  addExpenses(data: any) {
    const token = localStorage.getItem('token');
    const userId = this.authService.getUserIdFromToken(token);
    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }

    const expenseData = {
      name: data.name,
      categoryId: data.category._id,
      amount: data.amount,
      userId: userId,
      notes: data.notes,
      date: data.date || new Date().toISOString(),
    };

    console.log(expenseData);
    this.expenseService.addExpense(expenseData).subscribe(
      (res) => {
        if (res) {
          console.log('Data Sent Successfully');
          this.dialog.open(ExpenseDialogComponent);
        }
      },
      (error) => {
        console.error('Error adding expense:', error);
      }
    );
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id).subscribe(
      () => {
        this.categories = this.categories.filter(
          (category) => category._id !== id
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
