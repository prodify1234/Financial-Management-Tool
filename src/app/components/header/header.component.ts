import { SidenavService } from '../../services/sidenav.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  imports: [ MatIconModule, MatButtonModule ,MatSidenavModule,MatMenuModule, RouterModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit,OnChanges{

  person:any = {}
  @Input() rootWidth : number = 0;

  constructor(private sidenavService: SidenavService, private router : Router , private loginService:LoginService){


  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.rootWidth)
    if(this.rootWidth < 1024){
      this.sidenavService.openSideNav.next(false);
    } 
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.sidenavService.openSideNav.subscribe((value) => {
      console.log(value);
    });

    this.loginService.getClientById().subscribe((response:any)=> {
       this.person = { ...response.person }
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
