import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getCashFlow(){
    return this.http.get(API.getCashFlow());
  }

  getTopSpendingCategories(){
    const params= { limit: 10 }
    return this.http.get(API.getTopSpendingCategories(), {params});
  }

  getRecurringTransactions(){
    const params = {
      min_frequency : 2,
      days_lookback : 30
    }

    return this.http.get(API.getRecurringTransactions(), {params});
  }
}
