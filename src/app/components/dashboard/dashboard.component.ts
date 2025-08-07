import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { SidenavService } from '../../services/sidenav.service';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import Chart from 'chart.js/auto';
import { DashboardService } from '../../services/dashboard.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TextTrimPipe } from '../../pipes/text-trim.pipe';
import { CarouselModule } from 'primeng/carousel';
import { CardShimmerComponent } from '../shared/card-shimmer/card-shimmer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatIconModule,
    MatListModule,
    MatButtonModule,
    HeaderComponent,
    CommonModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    TextTrimPipe,
    CarouselModule,
    CardShimmerComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit,AfterViewChecked{
  
@ViewChild('dashboard__bank', { static: false }) dashboard!: ElementRef;
  cardData: any[] = [];
  spendingData: any[] = [];
  recurringData: any[] = [];
  bankLoader = signal(false);
  categoryLoader = signal(false);
  currentIndex = 0;
  widthMeasured:boolean = false;
  dashboardWidth = 0;
  numberofBanks = 0;
  responsiveOptions = [
    // {
    //     // breakpoint: '1400px',
    //     numVisible: 2,
    //     numScroll: 1
    // },
    // {
    //     breakpoint: '1199px',
    //     numVisible: 3,
    //     numScroll: 1
    // },
    // {
    //     breakpoint: '767px',
    //     numVisible: 2,
    //     numScroll: 1
    // },
    // {
    //     breakpoint: '575px',
    //     numVisible: 1,
    //     numScroll: 1
    // }
]

  constructor(
    public sidenavService: SidenavService,
    private dashboardService: DashboardService
  ) {

    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.getCashFlow();
    this.getTopSpendingCategories();
    // this.getRecurringTransactions();
  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    console.log('Dashboard Width: ', this.dashboard.nativeElement.offsetWidth);
    this.dashboardWidth = this.dashboard.nativeElement.offsetWidth;
    this.numberofBanks = Math.floor(this.dashboardWidth / 340);
    
    // this.currentIndex = this.numberofBanks
    
  }

  // getBanksList(index:number = 0):any[]{
  //   let len = Math.floor(this.dashboardWidth / 320);
  //   // return this.cardData.slice(this.currentIndex, this.currentIndex + len);

  // }

  getCashFlow() {
    this.bankLoader.update((() => true));
    this.dashboardService.getCashFlow().subscribe((response: any) => {
      console.log('Cashflow Response: ', response);

      this.cardData = response.data.banks;

      console.log('Card Data: ', this.cardData);

      this.bankLoader.update((() => false));
    });
  }

  getTopSpendingCategories() {
    this.categoryLoader.update((() => true));
    this.dashboardService
      .getTopSpendingCategories()
      .subscribe((response: any) => {
        console.log('Spending Categories: ', response);

        this.spendingData = response.data.categories;

        console.log('Spending Data: ', this.spendingData);

        this.categoryLoader.update((() => false));
      });
  }

  // getRecurringTransactions() {
  //   this.loader = true;
  //   this.dashboardService
  //     .getRecurringTransactions()
  //     .subscribe((response: any) => {
  //       console.log('Recurring Transactions: ', response);

  //       this.recurringData = response.data.recurring_transactions;

  //       console.log('Recurring Data: ', this.recurringData);

  //       this.loader = false;
  //     });
  // }

  getPercent(type: string, card: any): number {
    if (type === 'inflow') {
      return (card.inflow / (card.inflow + card.outflow)) * 100;
    } else {
      return (card.outflow / (card.inflow + card.outflow)) * 100;
    }
  }

  get visibleItems(): any[] {
    return this.cardData;
  }

  getCardData(){
    let data = this.cardData.slice();
    return data.shift()
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  next(): void {
    if ((this.currentIndex + this.numberofBanks-1) < this.cardData.length - 1) {
      this.currentIndex++;
    }
  }

  getTranslateX(){
    let index = this.currentIndex;
    return `translateX(-${this.currentIndex * 352}px)`;
  }
}
