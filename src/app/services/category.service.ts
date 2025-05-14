import { Injectable } from '@angular/core';

import { API } from '../app.settings';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {

  }

  getAllCategories(body:any,currentPage?:number , rowsOnPage?:number){
    let apiUrl= currentPage && rowsOnPage ? API.getCategoriesList(currentPage,rowsOnPage) : API.getCategoriesList();
    return this.http.post(apiUrl,body);
  }
}
