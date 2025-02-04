import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './views/layout/layout.module';
import { HomeModule } from './pages/home/home.module';
import { HttpClientModule } from '@angular/common/http';
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
import { UpdateDialogComponent } from './shared/update-dialog/update-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { SignInModule } from './pages/auth/sign-in/sign-in.module';
import { ReportsModule } from './pages/expense/reports/reports.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    SucessDialogComponent,
    ErrorDialogComponent,
    CategoryDialogComponent,
    ExpenseDialogComponent,
    UpdateDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HomeModule,
    HttpClientModule,
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
    MatSelectModule,
    MatIconModule,
    SignInModule,
    ReportsModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
