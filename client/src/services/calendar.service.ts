import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CalendarService {

    BASEURL: string = "http://localhost:3000"
    options: object = { withCredentials: true };
    constructor(private http: Http) {
    }

    handleError(e) {
        console.log(e);
        return Observable.throw(e.json().message);
    }
    getDay(date): Observable<any> {
        return this.http.post(`${this.BASEURL}/api/day/`, {date:date}, this.options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getDays(dates): Observable<any> {
        return this.http.post(`${this.BASEURL}/api/day/get`, dates, this.options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getCurrentMonth(): Observable<any> {
        return this.http.get(`${this.BASEURL}/api/day/month`, this.options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    changeCurrentMonth(month,year): Observable<any> {
        return this.http.post(`${this.BASEURL}/api/day/month/view`, {monthToView:month,year:year}, this.options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    createDays(dates): Observable<any> {
        return this.http.post(`${this.BASEURL}/api/day/create`, dates, this.options)
            .map(res => {
                return res.json()
            })
            .catch(this.handleError);
    }

    updateDays(dates): Observable<any> {
        return this.http.post(`${this.BASEURL}/api/day/edit`, dates, this.options)
        .map( res => {
            console.log(JSON.stringify(res))
            return res.json()
        })
        .catch(this.handleError)
    }

}