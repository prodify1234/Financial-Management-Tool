import { Injectable } from '@angular/core';
import { API } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import LoginClient from '../Models/LoginClient.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }


  login(payload : LoginClient){
    return this.http.post(API.LOGIN_CLIENT, payload);
  }
}
