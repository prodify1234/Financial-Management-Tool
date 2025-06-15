import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class FinancialItemsService {

  constructor(private http: HttpClient) { }

  getFinancialItems(body:any){
    return this.http.post(API.getFinancialItems(), body)
  }

  getAssets() {
    return this.http.get(API.getAssets());
  }

  getLiabilities() {
    return this.http.get(API.getLiabilities());
  }

  getGenericCategories() {
    return this.http.post(API.getGenericCategories(), {});
  }

  createFinancialItem(body:any) {
    console.log('New Asset item body: ', body)
    return this.http.post(API.createFinancialItem(), body)
  }

  createLiabilityItem(body:any) {
    console.log('New Liability item body: ', body)
    return this.http.post(API.createLiabilityItem(), body)
  }
}
