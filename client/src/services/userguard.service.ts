import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SessionService } from './session.service';
import { Router } from '@angular/router';

@Injectable()
export class UserGuardService implements CanActivate {
    constructor(public session: SessionService, public router: Router) { }
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        console.log('User guard has been called');
        if (this.session.getUser()) return true
        else { 
            console.log('You cant go there'); 
            this.router.navigate(['/']);
        }
    }
}