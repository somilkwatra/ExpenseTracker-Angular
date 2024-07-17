import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SucessDialogComponent } from '../../../shared/sucess-dialog/sucess-dialog.component';
import { ErrorDialogComponent } from '../../../shared/error-dialog/error-dialog.component';
import { user } from '../../../shared/model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.authService.reload();
  }

  SignUp(data: user) {
    this.authService.userSignUp(data);

    //.subscribe(
    //   (res) => {
    //     console.log('Data sent successfully');
    //     if (res) {
    //       this.router.navigate(['expense-home']);
    //       console.log('Opening success dialog...');
    //       this.dialog.open(SucessDialogComponent);
    //     }
    //   },
    //   (error) => {
    //     console.error('Error:', error);
    //     console.log('Opening error dialog...');
    //     this.dialog.open(ErrorDialogComponent);
    //   }
    // );
  }
  navigateToSignin() {
    this.router.navigate(['auth/signin']);
  }
}
