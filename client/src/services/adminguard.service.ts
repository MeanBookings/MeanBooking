import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SessionService } from './session.service';
import { Router } from '@angular/router';

@Injectable()
export class AdminGuardService implements CanActivate {
    constructor(public session: SessionService, public router:Router) { }
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        console.log('Admin guard has been called');
        if (this.session.getUser() && this.session.getAdmin() ) {
            return true
        }
        else {
            console.log('You cant go there')
            this.router.navigate(['/']);
        }
    }
}