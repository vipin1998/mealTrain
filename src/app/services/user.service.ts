import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { mongoURL } from '../shared/baseurl'

import { ProcessHttpmsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

interface AuthResponse {
  status: string,
  success: string,
  token: string
};

interface JWTResponse {
  status: string,
  success: string,
  user: any
};

@Injectable()
export class UserService {

 tokenKey: string = 'JWT';
 isAuthenticated: Boolean = false;
 name: Subject<string> = new Subject<string>();
 authToken: string = undefined;
 fname : string;

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService) { 
  }
  
  checkJWTtoken() {
    this.http.get<JWTResponse>(mongoURL + 'user/checkJWTtoken')
    .subscribe(res => {
      console.log("JWT Token Valid: ", res);
      this.sendUsername(res.user.username);
    },
    err => {
      console.log("JWT Token invalid: ", err);
      this.destroyUserCredentials();
    })
  }
 
  sendUsername(name: string) 
  {
    this.name.next(name);
  }

  clearUsername() {
    this.name.next(undefined);
  }

  loadUserCredentials() {
    var credentials = JSON.parse(localStorage.getItem(this.tokenKey));
    if (credentials && credentials.name != undefined) {
      console.log("loadUserCredentials ", credentials);
      this.useCredentials(credentials);
      /*
      if (this.authToken)
        this.checkJWTtoken();
        */
    }
  }

  storeUserCredentials(credentials: any) {   
    localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
    this.useCredentials(credentials);
  }

  useCredentials(credentials: any) {
    this.isAuthenticated = true;
    this.sendUsername(credentials.name);
    this.authToken = credentials.token;
    this.fname = credentials.name;
  }

  destroyUserCredentials() {
    this.authToken = undefined;
    this.clearUsername();
    this.isAuthenticated = false;
    localStorage.removeItem(this.tokenKey);
  }

  signUp(user: any): Observable<any> {
    return this.http.post<AuthResponse>(mongoURL + 'user/register', 
    {"phone": user.mobile, "password": user.password , "sex" : user.sex , "name" : user.fname})
    .map(res => {
      return {'success': res.success, 'status' : res.status , 'username': user.name };
    })
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  logIn(user: any): Observable<any> 
  {
    return this.http.post<AuthResponse>(mongoURL + 'user/login', 
      {"phone": user.mobile, "password": user.password})
      .map(res => {
        this.storeUserCredentials({name: res.status, token: res.token});
        return {'success': res.success, 'status' : res.status , 'username': user.fname };
      })
        .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  logOut() {
    this.destroyUserCredentials();
  }

  isLoggedIn(): Boolean {
    return this.isAuthenticated;
  }

  getUsername(): Observable<string> {
    return this.name.asObservable();
  }

  getName() : string{
    return this.fname;
  }

  getToken(): string {
    return this.authToken;
  }
}