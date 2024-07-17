import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'expense',
    loadChildren: () =>
      import('./pages/expense/expense.module').then((mod) => mod.ExpenseModule),
    canActivate: [authGuard],
  },

  {
    path: 'account',
    loadChildren: () =>
      import('./pages/account/account.module').then((mod) => mod.AccountModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: 'Home',
    loadChildren: () =>
      import('./pages/home/home.module').then((mod) => mod.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
