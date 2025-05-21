import { Injectable } from '@angular/core';
import CreatePerson from '../Models/CreatePerson.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { API } from '../app.settings';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class FamilyDetailsService {
  constructor(private http: HttpClient,private sharedService:SharedService) { 
     
  }

  getAllFamilyMemberDetails() {
    return this.http.get(API.getFamilyMemberDetails(this.sharedService.clientId))
  }
  addFamilyDetails(body:any) {
    return this.http.post( API.addFamilyMemberDetails(), body)
  }
  updateFamilyDetails(person_id:string, relation:string){
    return this.http.put(API.updateFamilyMemberDetails(this.sharedService.clientId), {person_id ,relationship_type: relation})

  }
  deleteFamilyDetails(person_id: string){
    return this.http.delete(API.deleteFamilyMemberDetails(this.sharedService.clientId,person_id));
  }

}
