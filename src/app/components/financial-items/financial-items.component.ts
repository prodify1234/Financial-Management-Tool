import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { AssetsAddDialogComponent } from '../assets-add-dialog/assets-add-dialog.component';
import { LiabilitiesAddDialogComponent } from '../liabilities-add-dialog/liabilities-add-dialog.component';
import { MatMenuModule } from '@angular/material/menu';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  actions? : any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' ,actions:'' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' ,actions:''},
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',actions:'' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be',actions:'' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B',actions:'' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C',actions:'' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N',actions:'' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O',actions:'' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F',actions:'' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne',actions:'' },
];

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
    AssetsAddDialogComponent
  ],
  templateUrl: './financial-items.component.html',
  styleUrl: './financial-items.component.scss',
})
export class FinancialItemsComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol' , 'actions'];
  dataSource = ELEMENT_DATA;

  constructor(private matDialog: MatDialog) {}

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
  }

  onAddLiability(){
    const data = this.matDialog.open(LiabilitiesAddDialogComponent , {
      width: '600px',
      minWidth: '600px',
      height: 'auto',
      disableClose: true,
      data: {
        type: 'add'
      }
    });
  }
}
