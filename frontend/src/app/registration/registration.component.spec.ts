import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RegistrationService } from './registration.service';
import { of, Observable } from 'rxjs';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let registrationServiceSpy;
  beforeEach(async(() => {
    const titleSpy = jasmine.createSpyObj('Title', { setTitle: new Observable<never>() });
    const routerSpy = jasmine.createSpyObj('Router', {
      navigate: of()
    });
    registrationServiceSpy = jasmine.createSpyObj('RegistrationService', {
      createUser: of()
    });
    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        { provide: RegistrationService, useValue: registrationServiceSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder,
        { provide: Title, useValue: titleSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
