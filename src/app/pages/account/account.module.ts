import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: 'account', component: AccountComponent }];
@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatFormField,
    MatSnackBarModule,
    RouterModule.forChild(routes),
  ],
  exports: [AccountComponent],
})
export class AccountModule {}
