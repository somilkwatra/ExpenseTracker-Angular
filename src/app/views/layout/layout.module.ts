// src/app/views/layout/layout.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BaseComponent } from './base/base.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, BaseComponent],
  imports: [CommonModule, MatToolbarModule, MatButtonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, BaseComponent],
})
export class LayoutModule {}
