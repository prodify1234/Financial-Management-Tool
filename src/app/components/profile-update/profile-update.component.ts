import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginService } from '../../services/login.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-update',
  imports: [MatIconModule, MatTabsModule, MatButtonModule, MatTooltipModule],
  templateUrl: './profile-update.component.html',
  styleUrl: './profile-update.component.scss'
})
export class ProfileUpdateComponent implements OnInit, OnDestroy {


  person: any = null

  /**Dependencies*/
  loginService = inject(LoginService);
  snackbar = inject(SnackbarService)


  // subscriptions
  personSub !: Subscription
  constructor() {
    this.getProfileDetails();
  }

  ngOnInit(): void {

  }


  getProfileDetails() {
    this.personSub = this.loginService.getClientById().subscribe({
      next: (response: any) => {
        console.log(response)
        this.person = response?.data?.person
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  ngOnDestroy(): void {
    this.personSub.unsubscribe();
  }


}
