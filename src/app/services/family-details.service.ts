import { Injectable } from '@angular/core';
import CreatePerson from '../Models/CreatePerson.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { API } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class FamilyDetailsService {
  constructor(private http: HttpClient) { 
     
  }

  getAllFamilyMemberDetails() {
   
    let clientId: string = sessionStorage.getItem('clientId') as string;
    return this.http.get(API.getFamilyMemberDetails(clientId))
  }
  addFamilyDetails(body:any) {
    return this.http.post( API.addFamilyMemberDetails(), body)
  }
  updateFamilyDetails(person_id:string, relation:string){
    let clientId: string = sessionStorage.getItem('clientId') as string;
    return this.http.put(API.updateFamilyMemberDetails(clientId), {person_id ,relationship_type: relation})

  }
  deleteFamilyDetails(person_id: string){
    let clientId: string = sessionStorage.getItem('clientId') as string;
    return this.http.delete(API.deleteFamilyMemberDetails(clientId,person_id));
  }

}
