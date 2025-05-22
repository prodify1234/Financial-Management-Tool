import { inject, Injectable } from '@angular/core';
import { API } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import LoginClient from '../Models/LoginClient.model';
import { SharedService } from './shared.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http = inject(HttpClient);
  auth = inject(AuthService)

  constructor() { }


  login(payload : LoginClient){
    return this.http.post(API.loginClient(), payload);
  }

  getClientById(){
    return this.http.get(API.getClientById(this.auth.clientId))
  }
}
