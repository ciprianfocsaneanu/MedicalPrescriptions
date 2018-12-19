import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  // *************************************
  // ** Construction and Initialization **
  // *************************************
  constructor(private m_router: Router) { }

  // *********************
  // ** Private Methods **
  // *********************
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }
  checkLogin(url: string): boolean {
    // TODO: Logic
    return true;
  }
}
