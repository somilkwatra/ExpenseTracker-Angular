import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './views/layout/layout.module';
import { AuthModule } from './pages/auth/auth.module';
import { HomeModule } from './pages/home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { ExpenseModule } from './pages/expense/expense.module';
import { SucessDialogComponent } from './shared/sucess-dialog/sucess-dialog.component';
import { ErrorDialogComponent } from './shared/error-dialog/error-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AccountModule } from './pages/account/account.module';
import { CategoryDialogComponent } from './shared/category-dialog/category-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ExpenseDialogComponent } from './shared/expense-dialog/expense-dialog.component';

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
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
