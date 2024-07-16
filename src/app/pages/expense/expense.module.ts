import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseHomeComponent } from './expense-home/expense-home.component';
import { LogExpenseComponent } from './log-expense/log-expense.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [ExpenseHomeComponent, LogExpenseComponent],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    RouterModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatCardModule,
    MatListModule,
  ],
  exports: [ExpenseHomeComponent, LogExpenseComponent],
})
export class ExpenseModule {}
