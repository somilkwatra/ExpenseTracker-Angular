import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseHomeComponent } from './expense-home/expense-home.component';
import { LogExpenseComponent } from './log-expense/log-expense.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {
    path: 'expense-home',
    component: ExpenseHomeComponent,
  },
  {
    path: 'logExpense',
    component: LogExpenseComponent,
  },
  { path: 'report', component: ReportsComponent },
];

@NgModule({
  declarations: [ExpenseHomeComponent, LogExpenseComponent, ReportsComponent],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatCardModule,
    MatListModule,
  ],
  exports: [
    ExpenseHomeComponent,
    LogExpenseComponent,
    ReportsComponent,
    RouterModule,
  ],
})
export class ExpenseModule {}
