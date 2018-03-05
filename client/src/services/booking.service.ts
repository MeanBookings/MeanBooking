import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment'
@Injectable()
export class BookingService {
    options: object = { withCredentials: true };
    constructor(private http: Http) {
    }

    handleError(e) {
        console.log(e);
        return Observable.throw(e.json().message);
    }

    placeBooking(data): Observable<any> {
        return this.http.post(`${environment.BASEURL}/api/book/create`, data, this.options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    checkDayAvailability(date): Observable<any> {
        return this.http.post(`${environment.BASEURL}/api/day/`, {date:date}, this.options)
            .map(res => {
                return res.json()
            })
            .catch(this.handleError);
    }

    updateBookings(status,id): Observable<any> {
        return this.http.post(`${environment.BASEURL}/api/book/edit/${id}`, {status:status}, this.options)
            .map(res => {
                return res.json()
            })
            .catch(this.handleError);
    }
    deleteBookings(hash): Observable<any> {
        return this.http.get(`${environment.BASEURL}/api/book/delete/${hash}`, this.options)
            .map(res => {
                return res.json()
            })
            .catch(this.handleError);
    }
}



