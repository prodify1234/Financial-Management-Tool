import { HttpClient, provideHttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import CreatePerson from '../Models/CreatePerson.model';
import { API } from '../app.settings';
import CreateClient from '../Models/CreateClient.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
 
})
export class RegisterService {
  auth = inject(AuthService);
  http = inject(HttpClient)

  constructor() { }



  createPerson(person: any){
    return this.http.post<any>(API.createPerson(), person, {});
  }

  createClient(client: CreateClient){
    return this.http.post<any>(API.createClient(), client);
  }
}
