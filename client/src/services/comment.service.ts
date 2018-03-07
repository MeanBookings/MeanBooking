import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment'

@Injectable()
export class CommentService {

    options: object = { withCredentials: true };
    constructor(public http:Http) {
    }

    createComment(user_Id,content,valoration): Observable<any> {
        return this.http.post(`${environment.BASEURL}/api/comment/create`, {user_Id,content,valoration}, this.options)
            .map(res => {
                return res.json()
            })
            .catch(this.handleError);
    }

    editComment(id, status): Observable<any> {
        return this.http.post(`${environment.BASEURL}/api/comment/edit/${id}`, {status} , this.options)
            .map(res => {
                return res.json()
            })
            .catch(this.handleError)
    }

    getComment():Observable<any>{ 
        return this.http.get(`${environment.BASEURL}/api/comment/` , this.options)
        .map(res => {
            return res.json()
        })
        .catch(this.handleError)
    }

    getActiveComment():Observable<any>{ 
        return this.http.get(`${environment.BASEURL}/api/comment/actives` , this.options)
        .map(res => {
            return res.json()
        })
        .catch(this.handleError)
    }

    deleteComment(id):Observable<any>{ 
        return this.http.get(`${environment.BASEURL}/api/comment/delete/${id}`, this.options)
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