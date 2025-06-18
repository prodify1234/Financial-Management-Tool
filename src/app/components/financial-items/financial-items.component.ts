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
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FinancialItemsHeaderComponent } from '../financial-items-header/financial-items-header.component';
import { ItemHeadDetailsComponent } from "../item-head-details/item-head-details.component";

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
    MatPaginatorModule,
    RouterModule,
    FinancialItemsHeaderComponent,
    ItemHeadDetailsComponent,
],
  templateUrl: './financial-items.component.html',
  styleUrl: './financial-items.component.scss',
})
export class FinancialItemsComponent implements OnInit{


  currentPage = signal<number>(0);
  previousPage = signal<number | undefined>(0);
  rowsOnPage = signal<number>(10);
  totalItems = signal<number>(0);

  constructor(private matDialog: MatDialog, private financialItemsService: FinancialItemsService, private router: Router, private route: ActivatedRoute) {}

  items : any[] = [];
  selectedItem: string = '';

  ngOnInit(): void {
    //this.getItemHeads();

  }

  // getItemHeads() {
  //   const body = {
  //     person_id : sessionStorage.getItem('personId')
  //   }
  //   this.financialItemsService.getItemHeads(body).subscribe((response:any) => {
  //     console.log('Item Heads: ', response);
  //     const headsEntries = Object.entries(response.data.heads);
  //     this.items = headsEntries;
  //     console.log('Item Heads Array: ', this.items);
  //   })
  // }

  // getItemHeadDetails(card:any) {
  //   this.selectedItem = card[0];

  //   const body = {
  //     person_id : sessionStorage.getItem('personId'),
  //     heads : [this.selectedItem]
  //   }
  //   this.financialItemsService.getItemHeadDetails(body).subscribe((response:any)=>{
  //     console.log('Item Head details: ', response);
  //     this.items = [];
  //     const details = Object.entries(response.data.main_classifications);
  //     this.items = details;
  //     console.log('Item Details: ', this.items);
  //   })
  // }



}

