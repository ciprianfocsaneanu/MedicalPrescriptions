import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../core/authentication.service';
import { ILoginUser } from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email = '';
  public password = '';

  private m_showSpinner = false;

  constructor(private m_authenticationService: AuthenticationService,
    private m_router: Router) { }

  ngOnInit() {
  }

  public get showSpinner(): boolean {
    return this.m_showSpinner;
  }
  login() {
    if (this.email && this.email.length > 0 && this.password && this.password.length > 0) {
      this.m_showSpinner = true;
      const payload: ILoginUser = {
        username: this.email,
        password: this.password
      };
      this.m_authenticationService.login(payload).subscribe(result => {
        console.log(result);
        this.m_showSpinner = false;
        if (result) {
          this.m_router.navigate(['dashboard']);
        }
      });
    } else {
      window.alert('Please complete all fields with valid data!');
    }
  }
}
