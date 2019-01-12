import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ILoginUser, IRegisterUser } from '../model/user.model';

const registerApiUrl = 'http://localhost:8301/users/register';
const loginApiUrl = 'http://localhost:8301/users/authenticate';

const tokenKey = 'medical-prescriptions-token';
const usernameKey = 'medical-prescriptions-username';

@Injectable()
export class AuthenticationService {

  private m_authenticated = false;
  private m_authToken: string = null;
  private m_username: string = null;

  constructor(private m_router: Router, private m_http: HttpClient) {
    const username = sessionStorage.getItem(usernameKey);
    const token = sessionStorage.getItem(tokenKey);
    if (username && token) {
      this.m_authenticated = true;
      this.m_authToken = token;
      this.m_username = username;
    }
  }

  // Public getters
  public get authenticated(): boolean {
    return this.m_authenticated;
  }
  public get httpHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + this.m_username + ':' + this.m_authToken);
  }

  // Public methods
  public register(userInfo: IRegisterUser): Observable<boolean> {
    const resultSubject = new Subject<boolean>();
    this.m_http.post(registerApiUrl, userInfo).subscribe((response: any) => {
        resultSubject.next(response);
    }, err => {
      resultSubject.next(false);
      window.alert('Email already in use');
    });
    return resultSubject.asObservable();
  }
  public login(loginInfo: ILoginUser): Observable<boolean> {
    const resultSubject = new Subject<boolean>();
    this.m_http.post(loginApiUrl, loginInfo).subscribe((response: any) => {
      if (response && response.token && response.username) {
        this.m_authToken = response.token;
        sessionStorage.setItem(tokenKey, response.token);
        this.m_username = response.username;
        sessionStorage.setItem(usernameKey, response.username);
        this.m_authenticated = true;
        resultSubject.next(true);
      } else {
        window.alert('Email or password is invalid');
        resultSubject.next(false);
      }
    }, err => {
      window.alert('Email or password is invalid');
      resultSubject.next(false);
    });
    return resultSubject.asObservable();
  }
  public logout(): void {
    this.m_authenticated = false;
    this.m_authToken = null;
    this.m_username = null;
    sessionStorage.removeItem(tokenKey);
    sessionStorage.removeItem(usernameKey);
    this.m_router.navigate(['login']);
  }
}
