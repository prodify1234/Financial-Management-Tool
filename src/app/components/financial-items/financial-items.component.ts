import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { AssetsAddDialogComponent } from '../assets-add-dialog/assets-add-dialog.component';
import { LiabilitiesAddDialogComponent } from '../liabilities-add-dialog/liabilities-add-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FinancialItemsService } from '../../services/financial-items.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-financial-items',
  imports: [
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    AssetsAddDialogComponent,
    MatCardModule,
    CommonModule,
    MatPaginatorModule
  ],
  templateUrl: './financial-items.component.html',
  styleUrl: './financial-items.component.scss',
})
export class FinancialItemsComponent implements OnInit{

  // items = [
  // {
  //   title: "Home Loan",
  //   subtitle: "Primary Residence",
  //   outstanding: 250000,
  //   monthlyEMI: 1800
  // },
  // {
  //   title: "Car Loan",
  //   subtitle: "Sedan 2022",
  //   outstanding: 15000,
  //   monthlyEMI: 400
  // },
  // {
  //   title: "Personal Loan",
  //   subtitle: "Wedding Expenses",
  //   outstanding: 8000,
  //   monthlyEMI: 250
  // },
  // {
  //   title: "Education Loan",
  //   subtitle: "MBA Program",
  //   outstanding: 30000,
  //   monthlyEMI: 350
  // },
  // {
  //   title: "Credit Card",
  //   subtitle: "Travel Card",
  //   outstanding: 5000,
  //   monthlyEMI: 200
  // },
  // {
  //   title: "Business Loan",
  //   subtitle: "Startup Capital",
  //   outstanding: 50000,
  //   monthlyEMI: 1200
  // },
  // {
  //   title: "Home Renovation Loan",
  //   subtitle: "Kitchen Upgrade",
  //   outstanding: 12000,
  //   monthlyEMI: 350
  // },
  // {
  //   title: "Bike Loan",
  //   subtitle: "Mountain Bike",
  //   outstanding: 2000,
  //   monthlyEMI: 80
  // },
  // {
  //   title: "Medical Loan",
  //   subtitle: "Surgery Expenses",
  //   outstanding: 10000,
  //   monthlyEMI: 300
  // },
  // {
  //   title: "Vacation Loan",
  //   subtitle: "Europe Trip",
  //   outstanding: 7000,
  //   monthlyEMI: 210
  // },
  // {
  //   title: "Furniture Loan",
  //   subtitle: "Living Room Set",
  //   outstanding: 4000,
  //   monthlyEMI: 120
  // },
  // {
  //   title: "Appliance Loan",
  //   subtitle: "Refrigerator",
  //   outstanding: 1500,
  //   monthlyEMI: 60
  // },
  // {
  //   title: "Jewelry Loan",
  //   subtitle: "Anniversary Gift",
  //   outstanding: 3500,
  //   monthlyEMI: 100
  // },
  // {
  //   title: "Student Loan",
  //   subtitle: "Undergraduate Degree",
  //   outstanding: 20000,
  //   monthlyEMI: 250
  // },
  // {
  //   title: "Travel Loan",
  //   subtitle: "Family Vacation",
  //   outstanding: 6000,
  //   monthlyEMI: 180
  // },
  // {
  //   title: "Gadget Loan",
  //   subtitle: "Laptop Purchase",
  //   outstanding: 2500,
  //   monthlyEMI: 90
  // },
  // {
  //   title: "Solar Loan",
  //   subtitle: "Home Solar Panels",
  //   outstanding: 18000,
  //   monthlyEMI: 400
  // },
  // {
  //   title: "Boat Loan",
  //   subtitle: "Fishing Boat",
  //   outstanding: 22000,
  //   monthlyEMI: 500
  // },
  // {
  //   title: "RV Loan",
  //   subtitle: "Camper Van",
  //   outstanding: 30000,
  //   monthlyEMI: 700
  // },
  // {
  //   title: "Medical Equipment Loan",
  //   subtitle: "Home Oxygen Machine",
  //   outstanding: 3500,
  //   monthlyEMI: 110
  // },
  // {
  //   title: "Debt Consolidation Loan",
  //   subtitle: "Multiple Credit Cards",
  //   outstanding: 12000,
  //   monthlyEMI: 320
  // },
  // {
  //   title: "Wedding Loan",
  //   subtitle: "Event Expenses",
  //   outstanding: 10000,
  //   monthlyEMI: 280
  // },
  // {
  //   title: "Home Extension Loan",
  //   subtitle: "New Room Addition",
  //   outstanding: 25000,
  //   monthlyEMI: 600
  // },
  // ]

  currentPage = signal<number>(0);
  previousPage = signal<number | undefined>(0);
  rowsOnPage = signal<number>(10);
  totalItems = signal<number>(0);

  financialItems: any[] =[];

  selectedCategory: string = 'all';

  isLoading = false;

  ngOnInit(): void {
    this.onSelectCategory(this.selectedCategory);
  }
  constructor(private matDialog: MatDialog, private financialItemsService: FinancialItemsService) {}


  onSelectCategory(category: string) {
    console.log('selected Category: ', category)

    if (this.selectedCategory !== category && category === 'all') {
      this.currentPage.set(0);
      this.rowsOnPage.set(10);
    }
    this.selectedCategory = category;
    this.isLoading = true;
    this.financialItems = [];

  const body = {
    person_id_in : [sessionStorage.getItem('personId')],
  };

  if (category === 'all') {
    this.financialItemsService.getFinancialItems(this.currentPage() + 1, this.rowsOnPage(), body).subscribe((response: any) => {
      console.log('All Financial Items: ', response);
      this.totalItems.update(() => response?.data?.total);
      this.financialItems = response.data.items;
      console.log('All financialItems :', this.financialItems)
      this.isLoading = false;
    });
  } else if (category === 'assets') {
    this.financialItemsService.getAssets().subscribe((response: any) => {
      console.log('Assets Response: ', response);
      this.financialItems = response.data;
      this.isLoading = false;
    });
  } else if (category === 'liabilities') {
    this.financialItemsService.getLiabilities().subscribe((response: any) => {
      console.log('Liabilities Response: ', response)
      this.financialItems = response.data;
      this.isLoading = false;
    });
  }
}

  onAddAsset() {
    const data = this.matDialog.open(AssetsAddDialogComponent , {
      width: '600px',
      minWidth: '600px',
      height: 'auto',
      disableClose: true,
      data: {
        type: 'add'
      }
    });
    data.afterClosed().subscribe((result:any)=>{
      this.onSelectCategory(this.selectedCategory);
    })
  }

  onPage(event: PageEvent) {
    console.log(event);
    this.currentPage.update(() => event.pageIndex);
    this.rowsOnPage.update(() => event.pageSize);
    this.previousPage.update(() => event.previousPageIndex);
    this.onSelectCategory(this.selectedCategory);
  }
}
