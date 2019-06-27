import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login, UserClaims } from '../registration/User';
import { ServiceUrl } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {  }

  login(login: Login): Observable<UserClaims> {
    return this.http.post<any>(`${ServiceUrl.AuthenticationUrl}/login`, login);
  }
}
