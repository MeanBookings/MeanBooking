import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SessionService } from './session.service';

@Injectable()
export class AdminGuardService implements CanActivate {
    constructor(public session: SessionService) { }
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        console.log('canActivate guard has been called');
            if (false){
                return true;
            } else {
                console.log('You cant go there')
                return false;
            }
    }
}