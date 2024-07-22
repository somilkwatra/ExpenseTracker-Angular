import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Expense } from '../model';
import { ExpenseService } from '../../services/expenses/expense.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss'],
})
export class UpdateDialogComponent {
  expenseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Expense
  ) {
    this.expenseForm = this.fb.group({
      date: [data.date, Validators.required],
      name: [data.name, Validators.required],
      amount: [data.amount, [Validators.required, Validators.min(0)]],
      category: [data.category.name, Validators.required],
      notes: [data.notes],
    });
  }

  onSave() {
    if (this.expenseForm.valid) {
      const updatedExpense = {
        ...this.data,
        ...this.expenseForm.value,
        category: { name: this.expenseForm.value.category },
      };

      this.expenseService
        .updateExpense(this.data._id, updatedExpense)
        .subscribe(
          (res) => {
            this.dialogRef.close(updatedExpense);
          },
          (error) => {
            console.error('Error updating expense:', error);
          }
        );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
