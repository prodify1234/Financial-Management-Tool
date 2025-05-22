import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API } from '../app.settings';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  http = inject(HttpClient)
  auth = inject(AuthService)

  constructor() { }

  getAllAccountDetails(){
    return this.http.get(API.getAccountDetails(this.auth.clientId))
  }

  getAllLinkedAccountDetails(){
    return this.http.get(API.getLinkedAccountDetails(this.auth.clientId))
  }

}
