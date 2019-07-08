import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('LoginService', () => {
  const httpClientSpy = jasmine.createSpyObj('HttpClient', {
    post: of()
  });
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{ provide: HttpClient, useValue: httpClientSpy }]
  }));

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });
});
