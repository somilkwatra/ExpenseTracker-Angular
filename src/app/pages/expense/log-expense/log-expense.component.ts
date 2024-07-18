import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CategoryDialogComponent } from '../../../shared/category-dialog/category-dialog.component';
import { ExpenseDialogComponent } from '../../../shared/expense-dialog/expense-dialog.component';
import { AuthService } from './../../../services/auth/auth.service';
import { CategoryService } from '../../../services/category/category.service';
import { ExpenseService } from '../../../services/expenses/expense.service';
import { category } from './../../../shared/model';

@Component({
  selector: 'app-log-expense',
  templateUrl: './log-expense.component.html',
  styleUrls: ['./log-expense.component.scss'],
})
export class LogExpenseComponent implements OnInit {
  date = new FormControl(new Date());
  categories: category[] = [];
  expenseForm!: FormGroup; // Declare expenseForm as a FormGroup

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder, // Inject FormBuilder
    private categoryService: CategoryService,
    private expenseService: ExpenseService,
    private authService: AuthService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  ngOnInit() {
    this.initExpenseForm(); // Initialize the form
    this.getCategoriesById();
  }

  initExpenseForm() {
    this.expenseForm = this.formBuilder.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      category: ['', Validators.required],
      notes: ['', Validators.required],
      date: [new Date(), Validators.required],
    });
  }

  showDialog() {
    const dialogRef = this.dialog.open(CategoryDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.getCategoriesById();
    });
  }

  getCategoriesById() {
    this.categoryService.getCategoryByUserId().subscribe((res: any) => {
      this.categories = res;
    });
  }

  addExpenses() {
    if (this.expenseForm.valid) {
      const token = localStorage.getItem('token');
      const userId = this.authService.getUserIdFromToken(token);

      if (!userId) {
        console.error('User ID not found');
        return;
      }

      const expenseData = {
        name: this.expenseForm.value.name,
        categoryId: this.expenseForm.value.category._id,
        amount: this.expenseForm.value.amount,
        userId: userId,
        notes: this.expenseForm.value.notes,
        date: this.expenseForm.value.date.toISOString(),
      };

      console.log(expenseData);
      this.expenseService.addExpense(expenseData).subscribe((res) => {
        if (res) {
          console.log('Data Sent Successfully');
          this.dialog.open(ExpenseDialogComponent);
        }
      });
    }
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
        this.snackBar.open(
          'An expense has been associated with this category and it cannot be deleted.',
          'Close',
          {
            duration: 5000, // Display duration in milliseconds
          }
        );
      }
    );
  }
}
