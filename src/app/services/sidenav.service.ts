import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  openSideNav: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isSettingsPage:boolean=false;
}
