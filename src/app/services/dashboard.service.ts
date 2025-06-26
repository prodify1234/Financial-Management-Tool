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
}
