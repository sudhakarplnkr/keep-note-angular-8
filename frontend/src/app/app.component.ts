import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserClaims } from './registration/User';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isUserLoggedIn: boolean;
  constructor(private router: Router, private authService: AuthService) {
    this.authService.currentUser.subscribe((userClain: UserClaims) => this.isUserLoggedIn = !!userClain);
  }

  title = 'GoogleKeepUI';

  logoff() {
    localStorage.removeItem('currentUser');
    this.authService.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

}
