import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class FinancialItemsService {

  selectedHead : string = '';
  selectedClassification : string = '';

  constructor(private http: HttpClient) { }

  getFinancialItems(currentPage:any, rowsOnPage:any, body:any){
    const params = {
      page: currentPage,
      page_size: rowsOnPage
    };
    return this.http.post(API.getFinancialItems(), body, {params})
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

  //new

  getItemHeads(body: any){
    console.log('Body: ', body);
    return this.http.post(API.getItemHeads(), body)
  }

  getItemHeadDetails(body:any){
    console.log('Item Head Details Body: ', body);
    return this.http.post(API.getItemHeadDetails(), body)
  }

  getClassificationItems(body:any) {
    console.log('Classification Items body: ', body);
    return this.http.post(API.getClassificationItems(), body)
  }
}
