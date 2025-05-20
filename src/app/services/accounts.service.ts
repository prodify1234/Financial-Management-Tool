import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  getAllAccountDetails(){
    let clientId = sessionStorage.getItem('clientId') as string;
    return this.http.get(API.getAccountDetails(clientId))
  }

  getAllLinkedAccountDetails(){
    let clientId = sessionStorage.getItem('clientId') as string;
    return this.http.get(API.getLinkedAccountDetails(clientId))
  }

}
