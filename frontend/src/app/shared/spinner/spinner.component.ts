import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-spinner',
  template: `<div [ngClass]="{ 'loading': isLoading}"></div>`,
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.showSpinnerSubject.subscribe((requestCount: number) => {
      setTimeout(() => {
        this.isLoading = requestCount > 0;
      });
    });
  }
}
