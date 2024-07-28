import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit() {
    this.authService.reload();
  }

  navigateToSignup() {
    this.router.navigate(['sign-up/signup']);
  }
  SignIn(data: any) {
    this.authService.login(data);
    
  }
}
