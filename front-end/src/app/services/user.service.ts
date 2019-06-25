import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Subject, Observable } from 'rxjs';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {


  selectedUser: User = {
    fullName: '',
    email: '',
    password: '',
    id : 0,
    name: '',
    score: 0
  };

  user: User[] = null;
  usersUrl = 'http://localhost:5000/user/';

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader)
  }

  
  /*addPost(post: Post){
    return this.http.post('http://localhost:3000/api/post/createPost',{
        title : post.title,
        description : post.description
    })
}*/
  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }
  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/category');
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
  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
  getLeaders(): Observable<any> {
    return this.http.get(this.usersUrl);
  }

}
