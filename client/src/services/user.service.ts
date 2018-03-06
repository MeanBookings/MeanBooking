import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment'

@Injectable()
export class UserService {

    options: object = { withCredentials: true };
    constructor(private http: Http) {
    }

    handleError(e) {
        console.log(e);
        return Observable.throw(e.json().message);
    }

    deleteUser(id): Observable<any> {
        return this.http.get(`${environment.BASEURL}/api/user/delete/${id}`, this.options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getUsers(): Observable<any> {
        return this.http.get(`${environment.BASEURL}/api/user/`, this.options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    makeAdmin(id): Observable<any> {
        return this.http.get(`${environment.BASEURL}/api/user/makeadmin/${id}`, this.options)
        .map(res => res.json())
        .catch(this.handleError);
    }

    sendMassiveEmail(emails, text):Observable<any> {
        return this.http.post(`${environment.BASEURL}/api/user/massiveemail`,{emails, text}, this.options)
        .map(res => res.json())
        .catch(this.handleError);
    }

    getUserBookings(userId): Observable<any> {
        return this.http.get(`${environment.BASEURL}/api/user/bookings/${userId}`, this.options)
            .map(bookings => {return bookings.json()})
            .catch(this.handleError);
    }
}