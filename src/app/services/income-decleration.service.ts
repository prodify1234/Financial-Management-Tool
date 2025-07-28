import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class IncomeDeclerationService {

  http = inject(HttpClient);

  constructor() { }

  getIncomes(){
    return this.http.get(API.getIncomes());
  }

  deleteIncome(incomeId:any){
    return this.http.delete(API.deleteIncome(incomeId));
  }

  getAllAssets(){
    return this.http.get(API.getAllAssets());
  }

  getMainClassifications(){
    const body = {
      head : 'Income'
    }
    return this.http.post(API.getMainClassificationsByHead(), body)
  }

  getSubClassifications(mainClassification:any){
    const body = {
      head: 'Income',
      main_classification : mainClassification
    }

    return this.http.post(API.getSubClassificationsByHead(), body)
  }

  createIncome(body:any){
    return this.http.post(API.createIncome(), [body]);
  }
}
