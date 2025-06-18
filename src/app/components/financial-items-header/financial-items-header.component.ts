import { Component } from '@angular/core';
import { AssetsAddDialogComponent } from '../assets-add-dialog/assets-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-financial-items-header',
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './financial-items-header.component.html',
  styleUrl: './financial-items-header.component.scss'
})
export class FinancialItemsHeaderComponent {

  constructor(private matDialog: MatDialog){}

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
      //this.onSelectCategory(this.selectedCategory);
    })
  }
}
