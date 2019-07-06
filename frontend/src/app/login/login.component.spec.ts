import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { LoginService } from './login.service';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy;
  let routeSpy;
  let authServiceSpy;
  let loginServiceSpy;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', {
      navigate: of()
    });
    routeSpy = jasmine.createSpyObj('Route', ['snapshot']);
    routeSpy.snapshot = { queryParams: { returnUrl: of() } };
    authServiceSpy = jasmine.createSpyObj('AuthService', {
      currentUserValue: of(),
      currentUserSubject: of()
    });
    loginServiceSpy = jasmine.createSpyObj('LoginService', {
      login: of({ token: 'test', userId: 'test@test.com' })
    });
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: routeSpy },
        FormBuilder,
        Title
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
