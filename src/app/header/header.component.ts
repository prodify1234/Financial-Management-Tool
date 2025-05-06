import { SidenavService } from './../sidenav.service';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private sidenavService: SidenavService){}

  toggleSideNav(){
    this.sidenavService.openSideNav = !this.sidenavService.openSideNav
  }
}
