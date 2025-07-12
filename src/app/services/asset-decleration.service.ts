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

  getAssetTypes(){
    return this.http.get(API.getAssetTypes());
  }

  addAsset(body:any){
    return this.http.post(API.addAsset(), body)
  }

  deleteAsset(assetId:any){
    return this.http.delete(API.deleteAsset(assetId))
  }

  getCategoryTypes(assetType:any){
    return this.http.get(API.getCategoryTypes(assetType))
  }

  updateAsset(assetId:any, body:any){
    return this.http.put(API.updateAsset(assetId), body)
  }
}
