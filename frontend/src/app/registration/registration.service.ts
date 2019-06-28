import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './User';
import { Observable } from 'rxjs';
import { ServiceUrl } from '../environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<never> {
    return this.http.post<any>(`${ServiceUrl.AuthenticationUrl}/register`, user)
      .pipe(map((never: never) => never));
  }

  createUserDetail(user: User): Observable<never> {
    return this.http.post<any>(`${ServiceUrl.UserUrl}`, user)
      .pipe(map((never: never) => never));;
  }
}
