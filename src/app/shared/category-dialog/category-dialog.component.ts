import { SucessDialogComponent } from './../sucess-dialog/sucess-dialog.component';
import { Component } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent {
  categoryName: string = '';

  constructor(
    private category: CategoryService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    public dialogRef: MatDialogRef<CategoryDialogComponent>
  ) {}

  addCategory(data: any) {
    // const userId = sessionStorage.getItem('id');
    const token = localStorage.getItem('token');
    const userId = this.authService.getUserIdFromToken(token);
    const categoryData = { name: data.name, userId: userId };
    this.category.addCategory(categoryData).subscribe(
      (res) => {
        console.log('Data updated Successfully');
        this.openSnackBar('Category has been added', 'Close');
        this.dialogRef.close(); // Close the dialog on success
      },
      (error) => {
        console.error('Error occurred:', error);
        this.openSnackBar('An error has been occurred', 'Close');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
