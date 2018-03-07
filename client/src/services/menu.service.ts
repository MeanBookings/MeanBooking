import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment'

@Injectable()
export class MenuService {

    options: object = { withCredentials: true };

    constructor (
        public http:Http
    ) {}

    editMenu(id, status, dayWeek, starters, mainCourses, desserts, price,comments): Observable<any> {
        return this.http.post(`${environment.BASEURL}/api/menu/edit/${id}`, {status, dayWeek, starters, mainCourses, desserts, price,comments} , this.options)
            .map(res => {
                return res.json()
            })
            .catch(this.handleError)
    }

    getMenu():Observable<any>{ 
        return this.http.get(`${environment.BASEURL}/api/menu/` , this.options)
        .map(res => {
            return res.json()
        })
        .catch(this.handleError)
    }

    handleError(e) {
        console.log(e);
        return Observable.throw(e.json().message);
    }
}