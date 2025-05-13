import { SidenavService } from '../../services/sidenav.service';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [ MatIconModule, MatButtonModule ,MatSidenavModule,MatMenuModule, RouterModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  constructor(private sidenavService: SidenavService, private router : Router){


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

  onLogout(){
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('clientId')
    this.router.navigate(['/login'])
  }
}
