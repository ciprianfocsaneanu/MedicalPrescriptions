import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IUser } from '../model/user.model';

@Injectable()
export class AuthenticationService {

  private m_authenticated = true; // TODO: Change default to false

  constructor() { }

  public get authenticated(): boolean {
    return this.m_authenticated;
  }

  public register(userInfo: IUser): Observable<boolean> {
    const resultSubject = new Subject<boolean>();
    // TODO: HTTP register call
    return resultSubject.asObservable();
  }

  public login(loginPayload: any): Observable<boolean> {
    const resultSubject = new Subject<boolean>();
    // TODO: HTTP login call
    return resultSubject.asObservable();
  }
}
