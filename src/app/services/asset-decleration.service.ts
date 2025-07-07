import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class AssetDeclerationService {

  constructor(private http:HttpClient) { }

  getAllAssets(){
    return this.http.get(API.getAllAssets());
  }
}
