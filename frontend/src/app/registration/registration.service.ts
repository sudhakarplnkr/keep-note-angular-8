import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './User';
import { Observable } from 'rxjs';
import { ServiceUrl } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http: HttpClient) {

  }

  createUser(user: User): Observable<User> {
    return this.http.post<any>(`${ServiceUrl.AuthenticationUrl}/register`, user);
  }

  createUserDetail(user: User): Observable<User>{
    return this.http.post<any>(`${ServiceUrl.UserUrl}`, user);
  }
}
