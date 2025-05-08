import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'}, 
  {path: 'login' , component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'dashboard', component: DashboardComponent}
];


