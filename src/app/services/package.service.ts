import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { API } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http : HttpClient) { 



  }


  getAllPackages() : any {
    return this.http.get(API.getAllPackages());
  }
}
