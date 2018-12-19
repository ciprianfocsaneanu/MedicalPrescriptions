import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../core/authentication.service';
import { UserModel } from '../model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public newUser: UserModel;
  public confirmedPassword = '';

  private m_showSpinner = false;

  constructor(private m_authenticationService: AuthenticationService) {
    this.newUser = new UserModel();
  }

  ngOnInit() {
  }

  public get showSpinner(): boolean {
    return this.m_showSpinner;
  }
  public register(): void {
    // this.m_showSpinner = true;
    // this.m_authenticationService.register(this.newUser).subscribe(result => {
    //   this.m_showSpinner = false;
    // });
  }
}
