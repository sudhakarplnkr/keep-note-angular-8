import { Component, OnInit } from '@angular/core';
import { User } from './User';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  user: User;
  submitted: boolean = false;
  error: string;

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      UserId: [null, Validators.compose([Validators.required, Validators.email])],
      Password: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      Name: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      Contact: [null, Validators.compose([Validators.required, Validators.maxLength(20)])]
    });
    this.registrationForm.valueChanges.subscribe((user: User) => this.user = user);
  }

  constructor(
    private registrationService: RegistrationService,
    private router: Router,
    private formBuilder: FormBuilder) {    
  }

  createUser() {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }
    this.registrationService.createUser(this.user).subscribe(() => {
      this.registrationService.createUserDetail(this.user).subscribe(() => {
        this.router.navigate(['/login']);
      }, (error: any) => {
        this.error = error.error;
      });
    }, (error: any) => {
      this.error = error.error;
    });
  }

  cancel() {
    this.router.navigate(['/login']);
  }

}
