import { Injectable } from '@angular/core';
import CreatePerson from '../Models/CreatePerson.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class FamilyDetailsService {
  clientId: string = localStorage.getItem('clientId') as string;
  constructor(private http: HttpClient) { }
  
  getAllFamilyMemberDetails() {
    // let clientId: string = localStorage.getItem('clientId') as string
    
    return this.http.get(API.getFamilyMemberDetails(this.clientId))
  }
  addFamilyDetails(body:any) {
    return this.http.post( API.addFamilyMemberDetails(), body)
  }
  updateFamilyDetails(person_id:string, relation:string){
    return this.http.put(API.updateFamilyMemberDetails(this.clientId), {person_id ,relationship_type: relation})

  }
  deleteFamilyDetails(person_id: string){
    return this.http.delete(API.deleteFamilyMemberDetails(this.clientId,person_id));
  }

}
