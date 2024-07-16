import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { BaseComponent } from './views/layout/base/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'expenseTrackerClient';
  constructor(private authService: AuthService) {}
}
