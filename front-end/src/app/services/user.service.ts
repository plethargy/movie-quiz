import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})


export class UserService {

  selectedUser: User = {
    name: '',
    password: '',
    score: 0
  };
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  usersUrl = 'http://localhost:5000/user/';  // URL to web api
 
  constructor(private http: HttpClient) { }
  
  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/user/create',user,this.noAuthHeader)
  }
  
  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/user/login', authCredentials,this.noAuthHeader);
  }
  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/category');
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }
  getLeaders(): Observable<any> {
    return this.http.get(this.usersUrl);
  }
}
