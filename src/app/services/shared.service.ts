import { Injectable } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

   clientId : string = "";

  constructor() {
   //setting the clientId during refreshing
   if(sessionStorage.getItem('clientId')){
    this.setClientId(sessionStorage.getItem('clientId'))
   }
  
  }

   setClientId(clientId:any) {
    this.clientId = clientId
   }
}
