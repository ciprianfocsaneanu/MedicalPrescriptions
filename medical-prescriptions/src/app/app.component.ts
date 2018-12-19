import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'medical-prescriptions';

  constructor(private m_router: Router) {

  }

  redirectToDashboard() {
    this.m_router.navigate(['dashboard']);
  }
}
