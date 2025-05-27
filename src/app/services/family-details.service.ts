import { inject, Injectable } from '@angular/core';
import CreatePerson from '../Models/CreatePerson.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { API } from '../app.settings';
import { SharedService } from './shared.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FamilyDetailsService {
  auth = inject(AuthService);
  http = inject(HttpClient)
  constructor() { 
     
  }

  getAllFamilyMemberDetails() {
    return this.http.get(API.getFamilyMemberDetails(this.auth.clientId))
  }
  addFamilyDetails(body:any) {
    return this.http.post( API.addFamilyMemberDetails(), body)
  }
  updateFamilyDetails(person_id:string, body:any){
    return this.http.put(API.updateFamilyMemberDetails(this.auth.clientId , person_id), body);
  }
  deleteFamilyDetails(person_id: string){
    return this.http.delete(API.deleteFamilyMemberDetails(this.auth.clientId,person_id));
  }

}
