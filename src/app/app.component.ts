import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './core/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'medical-prescriptions';

  constructor(private m_router: Router, private m_authenticationService: AuthenticationService) {

  }

  redirectToDashboard() {
    this.m_router.navigate(['dashboard']);
  }
  logout(): void {
    this.m_authenticationService.logout();
  }
}
