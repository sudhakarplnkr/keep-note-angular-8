import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserClaims } from 'src/app/registration/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isUserLoggedIn: boolean;
  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe((userClain: UserClaims) => this.isUserLoggedIn = !!userClain);
  }
}
