import { Injectable } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

   clientId : string = "";

  constructor() {
   }

   setClientId(clientId:any) {
    this.clientId = clientId
   }
}
