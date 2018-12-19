import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  // *************************************
  // ** Construction and Initialization **
  // *************************************
  constructor(private m_router: Router, private m_authenticationService: AuthenticationService) { }

  // *********************
  // ** Private Methods **
  // *********************
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }
  checkLogin(url: string): boolean {
    if (!this.m_authenticationService.authenticated) {
      this.m_router.navigate(['login']);
      return false;
    }
    return true;
  }
}
