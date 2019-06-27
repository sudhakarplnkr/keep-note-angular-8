import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: '',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {
    localStorage.removeItem('currentUser');
    this.authService.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
