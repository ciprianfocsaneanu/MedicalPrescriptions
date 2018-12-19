import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../core/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email = '';
  public password = '';

  private m_showSpinner = false;

  constructor(private m_authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  public get showSpinner(): boolean {
    return this.m_showSpinner;
  }
  login() {
    if (this.email && this.email.length > 0 && this.password && this.password.length > 0) {

      const payload = {
        email: this.email,
        password: this.password
      };
      this.m_authenticationService.login(payload).subscribe(result => {

      });
    }
  }

}
