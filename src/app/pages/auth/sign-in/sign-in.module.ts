import { SignInComponent } from './sign-in.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: 'signin', component: SignInComponent }];

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [SignInComponent],
})
export class SignInModule {}
