import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { API } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  http = inject(HttpClient);

  constructor() { 
  }


  getAllPackages() : any {
    return this.http.get(API.getAllPackages());
  }
}
