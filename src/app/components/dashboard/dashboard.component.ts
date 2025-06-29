import { Component, OnInit, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { SidenavService } from '../../services/sidenav.service';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import Chart from 'chart.js/auto';
import { DashboardService } from '../../services/dashboard.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, MatListModule, MatButtonModule, HeaderComponent, CommonModule ,MatSidenavModule, MatProgressSpinnerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  // cardData = [
  // {
  //   bank: "ICICI Bank",
  //   totalTransactions: 124,
  //   totalInflow: 76500,
  //   totalOutflow: 42150,
  //   percentage: 55
  // },
  // {
  //   bank: "HDFC Bank",
  //   totalTransactions: 98,
  //   totalInflow: 58200,
  //   totalOutflow: 31200,
  //   percentage: 44
  // },
  // {
  //   bank: "SBI",
  //   totalTransactions: 76,
  //   totalInflow: 43000,
  //   totalOutflow: 21000,
  //   percentage: 34
  // },
  // {
  //   bank: "Axis Bank",
  //   totalTransactions: 54,
  //   totalInflow: 29500,
  //   totalOutflow: 15000,
  //   percentage: 24
  // },
  // {
  //   bank: "Kotak Mahindra",
  //   totalTransactions: 39,
  //   totalInflow: 21000,
  //   totalOutflow: 9000,
  //   percentage: 17
  // },
  // {
  //   bank: "Yes Bank",
  //   totalTransactions: 28,
  //   totalInflow: 15000,
  //   totalOutflow: 7000,
  //   percentage: 12
  // },
  // {
  //   bank: "IndusInd Bank",
  //   totalTransactions: 19,
  //   totalInflow: 9000,
  //   totalOutflow: 4000,
  //   percentage: 8
  // },
  // {
  //   bank: "Punjab National Bank",
  //   totalTransactions: 12,
  //   totalInflow: 6000,
  //   totalOutflow: 2500,
  //   percentage: 5
  // }
  // ];

  cardData:any[]=[];
  spendingData:any[]=[];
  recurringData:any[]=[];
  loader:boolean=false;

  constructor(public sidenavService: SidenavService, private dashboardService:DashboardService){}


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.getCashFlow();
    this.getTopSpendingCategories();
    this.getRecurringTransactions();
  }

  getCashFlow(){
    this.loader = true
    this.dashboardService.getCashFlow().subscribe((response:any)=>{
      console.log('Cashflow Response: ', response)

      this.cardData = response.data.banks;

      console.log('Card Data: ', this.cardData);

      this.loader = false;
    })
  }

  getTopSpendingCategories(){
    this.loader = true
    this.dashboardService.getTopSpendingCategories().subscribe((response:any)=>{
      console.log('Spending Categories: ', response)

      this.spendingData = response.data.categories;

      console.log('Spending Data: ', this.spendingData);

      this.loader = false;
    })
  }

  getRecurringTransactions(){
    this.loader = true
    this.dashboardService.getRecurringTransactions().subscribe((response:any)=>{
      console.log('Recurring Transactions: ', response);

      this.recurringData = response.data.recurring_transactions;

      console.log('Recurring Data: ', this.recurringData);

      this.loader = false;
    })
  }




}
