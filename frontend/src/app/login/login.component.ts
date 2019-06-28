import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login, UserClaims } from '../registration/User';
import { AuthService } from '../services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  error = '';
  loginForm: FormGroup;
  login: Login;
  returnUrl: string;

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    public router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private title: Title) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
    this.title.setTitle('Keep Notes - Login');
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      UserId: [null, Validators.required],
      Password: [null, Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

    this.loginForm.valueChanges.subscribe((login: Login) => this.login = login);
  }

  signIn() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loginService.login(this.login).subscribe((claim: UserClaims) => {
      if (claim && claim.token) {
        localStorage.setItem('currentUser', JSON.stringify(claim));
        this.authService.currentUserSubject.next(claim);
        this.router.navigate([this.returnUrl]);
      }
    }, error => {
      this.error = error.error;
    });
  }
}
