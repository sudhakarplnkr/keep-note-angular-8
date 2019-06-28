import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login, UserClaims } from '../registration/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<UserClaims>;
  public currentUser: Observable<UserClaims>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserClaims>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserClaims {
    return this.currentUserSubject.value;
  }
}
