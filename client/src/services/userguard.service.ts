import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SessionService } from './session.service';
import { Router } from '@angular/router';

@Injectable()
export class UserGuardService implements CanActivate {
    constructor(public session: SessionService, public router: Router) { }
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (this.session.getUser()) return true
        else { 
            this.router.navigate(['/']);
        }
    }
}