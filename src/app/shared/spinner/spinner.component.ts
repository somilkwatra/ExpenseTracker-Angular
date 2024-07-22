import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  loading = false;
  private hideTimeout: any;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('Navigation started');
        this.startLoading();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        console.log('Navigation ended');
        this.stopLoading();
      }
    });
  }

  ngOnInit(): void {}

  private startLoading() {
    this.loading = true;
    this.hideTimeout = setTimeout(() => {
      this.loading = true;
    }, 4000); // Delay for 4 seconds
  }

  private stopLoading() {
    clearTimeout(this.hideTimeout);
    this.loading = false;
  }
}
