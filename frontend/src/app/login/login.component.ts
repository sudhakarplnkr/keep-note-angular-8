import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../registration/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted: boolean = false;
  error: string = '';
  loginForm: FormGroup;
  login: Login;
  returnUrl: string;

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      UserId: [null, Validators.required],
      Password: [null, Validators.required]
    });
    console.log(this.route.snapshot.queryParams['returnUrl']);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.loginForm.valueChanges.subscribe((login: Login) => this.login = login);
  }

  signIn() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loginService.login(this.login).subscribe(claim => {
      if (claim && claim.token) {
        localStorage.setItem('currentUser', JSON.stringify(claim));
        this.authService.currentUserSubject.next(claim);
        this.router.navigate([this.returnUrl]);
      }
    }, error => {
      console.log(error);
      this.error = error.error;
    });
  }
}
