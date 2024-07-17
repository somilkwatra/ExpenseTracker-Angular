import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SucessDialogComponent } from '../../../shared/sucess-dialog/sucess-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isLoggedIn = false;
  constructor(private router: Router, private dialog: MatDialog) {}
  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val) {
        if (localStorage.getItem('token')) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      }
    });
  }
  logout() {
    localStorage.removeItem('token');
    // sessionStorage.removeItem('id');
    this.router.navigate(['Home']);
    this.dialog.open(SucessDialogComponent);
  }
}
