import { Injectable } from '@angular/core';
import CreatePerson from '../Models/CreatePerson.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class FamilyDetailsService {

  constructor(private http: HttpClient) { }
  
  getAllFamilyMemberDetails() {
  let token = localStorage.getItem('access_token')
    // let clientId: string = localStorage.getItem('clientId') as string
    let clientId: string = '2488abbd-43fe-4d70-82ee-490769ba168f'
    return this.http.get<CreatePerson>(API.getFamilyMemberDetails(clientId), {
      headers: {
        Authorization: `Bearer ${token}`,
        
      }
     
    })

}

}
