import { Component } from '@angular/core';
import { AccountService } from '../../../services/account/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { account } from '../../../shared/model';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  constructor(
    private account: AccountService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}
  ngOnInit() {
    let token = localStorage.getItem('token');
    console.log(this.authService.getUserIdFromToken(token));
  }

  updatePassword(data: account) {
    this.account.passwordChange(data).subscribe(
      (res) => {
        console.log('Data updated Successfully');
        this.openSnackBar('Password updated successfully', 'Close');
      },
      (error) => {
        console.error('Error occurred:', error);
        this.openSnackBar('Please Check Your Old Password', 'Close');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
