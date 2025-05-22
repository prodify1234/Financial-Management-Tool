import { Injectable } from '@angular/core';
import { API } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import LoginClient from '../Models/LoginClient.model';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient,private shared:SharedService) { }


  login(payload : LoginClient){
    return this.http.post(API.LOGIN_CLIENT, payload);
  }

  getClientById(){
    return this.http.get(API.getClientById(this.shared.clientId))
  }
}
