import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/core/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  template: `<div [ngClass]="{ 'loading': isLoading}"></div>`,
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  isLoading = false;
  constructor(private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.spinnerService.showSpinnerSubject.subscribe((requestCount: number) => {
      setTimeout(() => {
        this.isLoading = requestCount > 0;
      });
    });
  }
}
