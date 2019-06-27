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
  public showSpinnerSubject: BehaviorSubject<number>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserClaims>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.showSpinnerSubject = new BehaviorSubject<number>(0);
  }

  public get currentUserValue(): UserClaims {
    return this.currentUserSubject.value;
  }

  login(login: Login): Observable<UserClaims> {
    return this.http.post<any>(`http://localhost:50740/api/auth/login`, login);
  }
}
