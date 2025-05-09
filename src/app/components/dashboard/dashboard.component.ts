import { Component, OnInit, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { SidenavService } from '../../services/sidenav.service';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, MatListModule, MatButtonModule, HeaderComponent, CommonModule ,MatSidenavModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  


  constructor(public sidenavService: SidenavService){}


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  
    
  }

 

}
