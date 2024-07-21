import { LogExpenseModule } from './pages/expense/log-expense/log-expense.module';
import { ExpenseHomeModule } from './pages/expense/expense-home/expense-home.module';
import { SignUpModule } from './pages/auth/sign-up/sign-up.module';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'reports',
    loadChildren: () =>
      import('./pages/expense/reports/reports.module').then(
        (mod) => mod.ReportsModule
      ),
    canActivate: [authGuard],
  },

  {
    path: 'expense-home',
    loadChildren: () =>
      import('./pages/expense/expense-home/expense-home.module').then(
        (mod) => mod.ExpenseHomeModule
      ),
    canActivate: [authGuard],
  },

  {
    path: 'account',
    loadChildren: () =>
      import('./pages/account/account.module').then((mod) => mod.AccountModule),
    canActivate: [authGuard],
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./pages/auth/sign-up/sign-up.module').then(
        (mod) => mod.SignUpModule
      ),
  },
  {
    path: 'Home',
    loadChildren: () =>
      import('./pages/home/home.module').then((mod) => mod.HomeModule),
  },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./pages/auth/sign-in/sign-in.module').then(
        (mod) => mod.SignInModule
      ),
  },
  // {
  //   path: 'expense-home',
  //   loadChildren: () =>
  //     import('./pages/expense/expense.module').then((mod) => mod.ExpenseModule),
  // },
  {
    path: 'log-expense',
    loadChildren: () =>
      import('./pages/expense/log-expense/log-expense.module').then(
        (mod) => mod.LogExpenseModule
      ),
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
