import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user:User[] = null;
  usersUrl = 'http://localhost:5000/user/';  // URL to web api
 
  constructor(private http: HttpClient) { }
  
  getLeaders(): Observable<any> {
    return this.http.get(this.usersUrl);
  }
}
