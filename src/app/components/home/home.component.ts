import { AfterViewInit, Component, signal, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from '../header/header.component';
import { SidenavService } from '../../services/sidenav.service';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-home',
  imports: [MatSidenavModule,HeaderComponent,RouterModule,MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit{
  toggleSideNav =  signal<boolean>(false)
  @ViewChild('drawer') sidenav!: MatDrawer;


  constructor(private sidenavService : SidenavService) {}


  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.sidenavService.openSideNav.subscribe((value) => {
      console.log(value);
      this.sidenav.toggle();
    }); 
    
  }
}
