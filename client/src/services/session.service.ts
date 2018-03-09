import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment'

interface User {
  name: string,
  password: string,
  _id: string,
  role: string
}

@Injectable()
export class SessionService {

  options: object = { withCredentials: true };
  constructor(private http: Http) {
    this.isLoggedIn().subscribe();
  }

  @Output() userReady: EventEmitter<any> = new EventEmitter();

  private user: User;

  getUser() { return this.user; }

  getAdmin() { if (this.user.role === 'admin') { return this.user } }

  private configureUser(set = false) {
    return (user) => {
      if (set) {
        this.user = user;
        this.userReady.emit(this.user);
      } else {
        this.user = null
      }
      return user;
    }
  }

  handleError(e) {
    console.log(e);
    return Observable.throw(e.json().message);
  }

  signup(name: string, password: string, email: string, phone: string): Observable<any> {
    return this.http.post(`${environment.BASEURL}/api/auth/signup`, { username: name, password, email, phone }, this.options)
      .map(res => {
        return res.json()
      })
      .map(this.configureUser(true))
      .catch(this.handleError);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.BASEURL}/api/auth/login`, { username: email, password }, this.options)
      .map(res => res.json())
      .map(this.configureUser(true))
      .catch(this.handleError);
  }

  updateUser(user: any): Observable<any> {
    return this.http.post(`${environment.BASEURL}/api/auth/updateuser`, { user }, this.options)
      .map(res => {
        return res.json()
      })
      .map(this.configureUser(true))
      .catch(this.handleError);
  }

  logout(): Observable<any> {
    return this.http.get(`${environment.BASEURL}/api/auth/logout`, this.options)
      .map(res => res.json())
      .map(this.configureUser(false))
      .catch(this.handleError);
  }

  isLoggedIn(): Observable<any> {
    return this.http.get(`${environment.BASEURL}/api/auth/loggedin`, this.options)
      .map(res => res.json())
      .map(this.configureUser(true))
      .catch(this.handleError);
  }

}