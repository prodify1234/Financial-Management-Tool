import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from '../header/header.component';
import { SidenavService } from '../../services/sidenav.service';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [MatSidenavModule, HeaderComponent, RouterModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('drawer') sidenav!: MatDrawer;
  toggleSideNav = signal<boolean>(false);
  rootWidth: number = 0;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private sidenavService: SidenavService
  ) {
    console.log(this.document.documentElement.clientWidth);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.sidenavService.openSideNav.subscribe((value) => {
      console.log(value);
       if(value){
        this.sidenav.open();
        this.toggleSideNav.update(() => true);
       } else {
        this.sidenav.close();
        this.toggleSideNav.update(() => false);
       }
      
    });
  }

  @HostListener('window:resize', [])
  onResize() {
    this.rootWidth = window.innerWidth;
  }
}
