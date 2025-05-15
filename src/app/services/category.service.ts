import { Injectable } from '@angular/core';

import { API } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import Category from '../Models/Category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {

  } 

  getAllCategories(body:any, currentPage?: number , rowsOnPage?:number){
    let client_id : string = sessionStorage.getItem('clientId') as string
    let apiUrl= currentPage && rowsOnPage ? API.getCategoriesList(client_id) : API.getCategoriesList(client_id);
    return this.http.post(apiUrl,body, {
      params :  {
         page : currentPage && currentPage >= 0 ? currentPage : 0,
         page_size : rowsOnPage && rowsOnPage >=0 ? rowsOnPage : 10
      }
    });
  }

  postCategory(body: Category){
    let client_id : string = sessionStorage.getItem('clientId') as string
    return this.http.post(API.postCategory(client_id),body)
  }
  updateCategory(body: { type: string , frequency: string ,budget_allocation_percentage :number }, category_id: string){
    let client_id : string = sessionStorage.getItem('clientId') as string
    return this.http.put(API.updateCategory(client_id,category_id),body)
  }
  deleteCategory(category_id: string){
    let client_id : string = sessionStorage.getItem('clientId') as string
    return this.http.delete(API.deleteCategory(client_id,category_id))
  }
  
}
