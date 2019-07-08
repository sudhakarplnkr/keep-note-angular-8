import { TestBed } from '@angular/core/testing';

import { RegistrationService } from './registration.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('RegistrationService', () => {
  const httpClientSpy = jasmine.createSpyObj('HttpClient', {
    post: of()
  });
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{ provide: HttpClient, useValue: httpClientSpy }]
  }));

  it('should be created', () => {
    const service: RegistrationService = TestBed.get(RegistrationService);
    expect(service).toBeTruthy();
  });
});
