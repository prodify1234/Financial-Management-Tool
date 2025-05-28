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

  updateAccountDetails(account_id:string, account_type:string, beneficiary_name:string, interest_rate:any){

    return this.http.put(API.updateAccountDetails(account_id), {account_type, beneficiary_name, interest_rate})
  }

  deleteFamilyDetails(account_id:string){
    return this.http.delete(API.deleteAccountDetails(account_id));
  }

  addAccount(){
    let clientId = sessionStorage.getItem('clientId') as string;
    return this.http.get(API.getAccountHolderDetails(clientId));
  }

  createAccount(body:any){
    return this.http.post(API.createAccount(), body)
  }


}

