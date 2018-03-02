import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

interface User {
  name:string,
  password:string,
  _id:string,
  role:string
}

@Injectable()
export class SessionService {

  BASEURL:string = "http://localhost:3000"
  options:object = {withCredentials:true};
  constructor(private http: Http) {
    this.isLoggedIn().subscribe();
  }

  private user:User;

  getUser(){
    return this.user;
  }

  getAdmin() {
    if (this.user.role==='admin'){return 'sí'}
  }
  
  private configureUser(set=false){
    return (user) => {
      if(set){
        this.user = user;
        console.log(`Setting user, welcome ${this.user.name}`)
      }else{
        console.log(`bye bye ${this.user.name}`)
        this.user = null
      }
      return user;
    }
  }

  handleError(e) {
    console.log(e);
    return Observable.throw(e.json().message);
  }

  signup(name:string, password:string, email:string,phone:string):Observable<any>{
    return this.http.post(`${this.BASEURL}/api/auth/signup`, { username:name,password,email,phone}, this.options)
      .map(res => res.json())
      .map(this.configureUser(true))
      .catch(this.handleError);
  }

  login(name:string, password:string):Observable<any>{
    return this.http.post(`${this.BASEURL}/api/auth/login`, { username:name,password},this.options)
      .map(res => res.json())
      .map(this.configureUser(true))
      .catch(this.handleError);
  }

  updateUser(user:any):Observable<any>{
    return this.http.post(`${this.BASEURL}/api/auth/updateuser`, { user },this.options)
    .map(res => res.json())
    .map(this.configureUser(true))
    .catch(this.handleError);
  }

  logout():Observable<any>{
    return this.http.get(`${this.BASEURL}/api/auth/logout`,this.options)
      .map(res => res.json())
      .map(this.configureUser(false))
      .catch(this.handleError);
  }

  isLoggedIn():Observable<any> {
    return this.http.get(`${this.BASEURL}/api/auth/loggedin`,this.options)
      .map(res => res.json())
      .map(this.configureUser(true))
      .catch(this.handleError);
  }

}