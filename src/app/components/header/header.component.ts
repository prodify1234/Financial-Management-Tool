import { SidenavService } from '../../services/sidenav.service';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  imports: [ MatIconModule, MatButtonModule ,MatSidenavModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  constructor(private sidenavService: SidenavService){


  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.sidenavService.openSideNav.subscribe((value) => {
      console.log(value);
    });
    
  }

  toggleSideNav(){
    this.sidenavService.openSideNav.next(!this.sidenavService.openSideNav.getValue());
  }
}
