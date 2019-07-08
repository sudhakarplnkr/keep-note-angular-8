import { TestBed } from '@angular/core/testing';

import { ReminderService } from './reminder.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

describe('CategoryService', () => {
  const httpClientSpy = jasmine.createSpyObj('HttpClient', {
    get: of(),
    post: of(),
    put: of(),
    delete: of()
  });

  const authServiceSpy = jasmine.createSpyObj('AuthService', ['currentUserValue']);
  authServiceSpy.currentUserValue = { userId: 'test' };

  beforeEach(() => TestBed.configureTestingModule({
    providers: [{ provide: HttpClient, useValue: httpClientSpy }, { provide: AuthService, useValue: authServiceSpy }]
  }));

  it('should be created', () => {
    const service: ReminderService = TestBed.get(ReminderService);
    expect(service).toBeTruthy();
  });
});
