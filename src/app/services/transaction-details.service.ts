import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class TransactionDetailsService {

  constructor(private http: HttpClient) { }
  personId = sessionStorage.getItem('personId') as string;

  loadDetails(){
    return this.http.get(API.getTransactionDetails(this.personId))
  }
}
