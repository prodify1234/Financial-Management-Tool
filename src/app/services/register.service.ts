import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CreatePerson from '../../Models/CreatePerson.model';
import { API } from '../app.settings';
import CreateClient from '../../Models/CreateClient.model';

@Injectable({
  providedIn: 'root'
 
})
export class RegisterService {

  constructor(private http:HttpClient) { }



  createPerson(person: CreatePerson){
    return this.http.post<CreatePerson>(API.CREATE_PERSON, person, {});
  }

  createClient(client: CreateClient){
    return this.http.post<any>(API.CREATE_CLIENT, client);
  }
}
