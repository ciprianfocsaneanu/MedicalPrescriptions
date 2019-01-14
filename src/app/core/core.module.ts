import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuardService } from './auth-guard.service';
import { AuthenticationService } from './authentication.service';
import { RestAccessService } from './rest-access.service';

@NgModule({
    providers: [
        AuthGuardService,
        AuthenticationService,
        RestAccessService
    ],
    imports: [
        HttpClientModule
    ]
})
export class CoreModule {
}


