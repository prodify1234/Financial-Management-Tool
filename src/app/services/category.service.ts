import { inject, Injectable } from '@angular/core';

import { API } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import Category from '../Models/Category.model';
import { SharedService } from './shared.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  auth = inject(AuthService)
  http = inject(HttpClient)

  constructor() {

  } 

  getAllCategories(body:any, currentPage?: number , rowsOnPage?:number){
    let apiUrl= currentPage && rowsOnPage ? API.getCategoriesList(this.auth.clientId) : API.getCategoriesList(this.auth.clientId);
    return this.http.post(apiUrl,body, {
      params :  {
         page : currentPage && currentPage >= 0 ? currentPage : 0,
         page_size : rowsOnPage && rowsOnPage >=0 ? rowsOnPage : 10
      }
    });
  }

  postCategory(body: Category){
    return this.http.post(API.postCategory(this.auth.clientId),body)
  }
  updateCategory(body: { type: string , frequency: string ,budget_allocation_percentage :number }, category_id: string){
    return this.http.put(API.updateCategory(this.auth.clientId,category_id),body)
  }
  deleteCategory(category_id: string){
    return this.http.delete(API.deleteCategory(this.auth.clientId,category_id))
  }
  
}
