import { SidenavService } from '../../services/sidenav.service';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-header',
  imports: [ MatIconModule, MatButtonModule ,MatSidenavModule,MatMenuModule, RouterModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit,OnChanges{

  person:any = {}
  @Input() rootWidth : number = 0;
  snackbar = inject(SnackbarService)
  sidenavService = inject(SidenavService);
  router= inject(Router);
  loginService = inject(LoginService);

  constructor(){

  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(this.rootWidth < 1024){
      this.sidenavService.openSideNav.next(false);
    } 
  
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getPersonName();
  }

  getPersonName(){
    this.loginService.getClientById().subscribe({
      next : (response:any)=>{
         this.person = response.data.person;
      },
      error :(error)=>{
          this.snackbar.error(error.error.details || 'Failed to fetch person details');
      }
    })
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
