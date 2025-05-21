import { Injectable } from '@angular/core';

import { API } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import Category from '../Models/Category.model';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient,private sharedService: SharedService) {

  } 

  getAllCategories(body:any, currentPage?: number , rowsOnPage?:number){
    let apiUrl= currentPage && rowsOnPage ? API.getCategoriesList(this.sharedService.clientId) : API.getCategoriesList(this.sharedService.clientId);
    return this.http.post(apiUrl,body, {
      params :  {
         page : currentPage && currentPage >= 0 ? currentPage : 0,
         page_size : rowsOnPage && rowsOnPage >=0 ? rowsOnPage : 10
      }
    });
  }

  postCategory(body: Category){
    return this.http.post(API.postCategory(this.sharedService.clientId),body)
  }
  updateCategory(body: { type: string , frequency: string ,budget_allocation_percentage :number }, category_id: string){
    return this.http.put(API.updateCategory(this.sharedService.clientId,category_id),body)
  }
  deleteCategory(category_id: string){
    return this.http.delete(API.deleteCategory(this.sharedService.clientId,category_id))
  }
  
}
