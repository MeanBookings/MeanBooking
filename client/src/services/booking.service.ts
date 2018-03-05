import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BookingService {

    BASEURL: string = "http://localhost:3000"
    options: object = { withCredentials: true };
    constructor(private http: Http) {
    }

    handleError(e) {
        console.log(e);
        return Observable.throw(e.json().message);
    }

    placeBooking(data): Observable<any> {
        return this.http.post(`${this.BASEURL}/api/book/create`, data, this.options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    
    checkDayAvailability(date): Observable<any> {
        return this.http.post(`${this.BASEURL}/api/day/`, {date:date}, this.options)
            .map(res => {
                return res.json()
            })
            .catch(this.handleError);
    }

    updateBookings(bookings): Observable<any> {
        console.log(bookings)
        return;
    }

}



