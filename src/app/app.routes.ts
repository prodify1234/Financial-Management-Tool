import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { FamilyDetailsComponent } from './components/family-details/family-details.component';
import { authGuard } from './auth/auth.guard';
import { PackagesComponent } from './components/packages/packages.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'}, 
  {path: 'login' , component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'home', component: HomeComponent ,canActivate:[authGuard],canActivateChild:[authGuard], 
    children:[
      {path: 'dashboard', component: DashboardComponent},
      {path: 'family-details', component: FamilyDetailsComponent},
      {path: 'packages' , component: PackagesComponent}
    ]
  },
 
];


