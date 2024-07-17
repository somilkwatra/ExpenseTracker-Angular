// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './views/layout/layout.module';
import { AuthModule } from './pages/auth/auth.module';
import { HomeModule } from './pages/home/home.module';

import { HomeComponent } from './pages/home/home/home.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { ExpenseModule } from './pages/expense/expense.module';
import { ExpenseHomeComponent } from './pages/expense/expense-home/expense-home.component';
import { SucessDialogComponent } from './shared/sucess-dialog/sucess-dialog.component';
import { ErrorDialogComponent } from './shared/error-dialog/error-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { authGuard } from './core/guards/auth.guard';
import { AccountComponent } from './pages/account/account/account.component';
import { AccountModule } from './pages/account/account.module';
import { LogExpenseComponent } from './pages/expense/log-expense/log-expense.component';
import { CategoryDialogComponent } from './shared/category-dialog/category-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ExpenseDialogComponent } from './shared/expense-dialog/expense-dialog.component';
import { ReportsComponent } from './pages/expense/reports/reports.component';
// import { ReportComponent } from './pages/expense/report/report.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'expense-home',
    component: ExpenseHomeComponent,
    canActivate: [authGuard],
  },
  { path: 'account', component: AccountComponent, canActivate: [authGuard] },
  {
    path: 'logExpense',
    component: LogExpenseComponent,
    canActivate: [authGuard],
  },
  {
    path: 'category',
    component: CategoryDialogComponent,
  },
  { path: 'report', component: ReportsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SucessDialogComponent,
    ErrorDialogComponent,
    CategoryDialogComponent,
    ExpenseDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    AuthModule,
    HomeModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ExpenseModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    AccountModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
