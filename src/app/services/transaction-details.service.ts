import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../app.settings';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionDetailsService {

  constructor(private http: HttpClient , private auth: AuthService) { }
  personId = sessionStorage.getItem('personId') as string;

  loadDetails(currentPage: any, rowsOnPage: any){
    const params = {
      page: currentPage,
      page_size: rowsOnPage
    };
    return this.http.get(API.getTransactionDetails(this.personId), {params})
  }


  getTransactionDetailsView(body:any,pageNumber: number , rowsOnPage : number){
    return this.http.post(API.getTransactionDetailsById(),body , {
      params : {
        page : pageNumber,
        page_size : rowsOnPage
      }
    });
  }

  getStatementDetailsById(person_id:string , transactionId:string){
    return this.http.get(API.getStatementDetailsById(this.personId, transactionId));
  }

  getTransactionsByStatementId(accountId:any, statementId:any){
    return this.http.post(API.getTransactionsByStatementId(accountId, statementId), {});
  }
}
