import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatInputModule, MatButtonModule, FormsModule],
  exports: [],
})
export class AuthModule {}
