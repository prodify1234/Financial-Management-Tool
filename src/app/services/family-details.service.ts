import { Injectable } from '@angular/core';
import CreatePerson from '../../Models/CreatePerson.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class FamilyDetailsService {

  constructor(private http: HttpClient) { }

  getAllPersons(){
    return this.http.get<CreatePerson>(API.getAllPersons())
  }

}
