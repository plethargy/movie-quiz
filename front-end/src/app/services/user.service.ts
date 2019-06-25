import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user:User[] = null;
  usersUrl = 'http://localhost/users/';  // URL to web api
 
  constructor(private http: HttpClient) { }
  
  getLeaders(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }
}
