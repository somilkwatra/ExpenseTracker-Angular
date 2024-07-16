import { Component } from '@angular/core';

@Component({
  selector: 'app-sucess-dialog',
  templateUrl: './sucess-dialog.component.html',
  styleUrl: './sucess-dialog.component.scss',
})
export class SucessDialogComponent {
  isLoggedIn = false;
  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true;
    }
  }
}
