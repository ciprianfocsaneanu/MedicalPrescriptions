import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../core/authentication.service';
import { UserModel, IRegisterUser } from '../model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public newUser: UserModel;
  public confirmedPassword = '';

  private m_showSpinner = false;

  constructor(private m_authenticationService: AuthenticationService, private m_router: Router) {
    this.newUser = new UserModel();
  }

  ngOnInit() {
  }

  public get showSpinner(): boolean {
    return this.m_showSpinner;
  }
  public register(): void {
    console.log(this.newUser);
    if (!this.newUser.email || this.newUser.email.length === 0 ||
      !this.newUser.age || this.newUser.age <= 0 ||
      !this.newUser.fullName || this.newUser.fullName.length === 0 ||
      !this.newUser.password || this.newUser.password.length === 0) {
        window.alert('Please complete all fields with valid data!');
        return;
    }
    if (this.newUser.password !== this.confirmedPassword) {
      window.alert('Passwords differ!');
      return;
    }
    this.m_showSpinner = true;
    const registerInfo: IRegisterUser = {
      email: this.newUser.email,
      fullName: this.newUser.fullName,
      password: this.newUser.password,
      age: this.newUser.age
    };
    this.m_authenticationService.register(registerInfo).subscribe(result => {
      this.m_showSpinner = false;
      if (result) {
        this.m_router.navigate(['login']);
      }
    });
  }
}
