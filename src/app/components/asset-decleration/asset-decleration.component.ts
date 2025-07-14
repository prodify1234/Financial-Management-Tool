import { Component, inject, signal } from '@angular/core';
import { OnInit } from '@angular/core';
import { AssetDeclerationService } from '../../services/asset-decleration.service';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TableShimmerComponent } from '../shared/table-shimmer/table-shimmer.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AssetCreateDialogComponent } from '../asset-create-dialog/asset-create-dialog.component';

@Component({
  selector: 'app-asset-decleration',
  imports: [MatTableModule, MatMenuModule, MatIconModule, MatButtonModule, TableShimmerComponent, CommonModule],
  templateUrl: './asset-decleration.component.html',
  styleUrl: './asset-decleration.component.scss'
})
export class AssetDeclerationComponent implements OnInit {
  assetsData:any[]=[];
  assetColumns: string[] =[
    'asset_type',
    'category_type',
    'created_at',
    'description',
    'purchase_value',
    'purchase_date',
    'unit_type',
    'actions'
  ];
  loader = signal<boolean>(false);
  private assetDeclerationService = inject(AssetDeclerationService);
  private dialogref = inject(MatDialog)

  ngOnInit(): void {
    this.getAllAssets();
  }

  getAllAssets(){
    this.loader.update(()=>true);
    this.assetDeclerationService.getAllAssets().subscribe((response:any)=>{
      console.log('All Assets: ', response);
      this.assetsData = response.data;
      this.loader.update(()=>false);
    })
  }

  addAsset() {
    const dialogRef = this.dialogref.open(AssetCreateDialogComponent, {
      width: '600px',
      minWidth: '600px',
      // height: 'auto',
      disableClose: true,
      data: {
        type: 'add'
      }
    })

    dialogRef.afterClosed().subscribe((result:any)=>{
      if(result){
        this.getAllAssets();
      }
    })
  }

  onEdit(element:any){
    console.log('Edit element: ', element);
    const dialogRef = this.dialogref.open(AssetCreateDialogComponent, {
      width: '600px',
      minWidth : '600px',
      height: 'auto',
      disableClose : true,
      data: {
        type: 'edit',
        data:  element
      }
    })

    dialogRef.afterClosed().subscribe((result:any)=>{
      if(result){
        this.getAllAssets();
      }
    })
  }

  onDelete(element:any){
    console.log('Element: ', element);
    const assetId = element.id;
    this.assetDeclerationService.deleteAsset(assetId).subscribe((response:any)=>{
      console.log('Delete Response: ', response);
      this.getAllAssets();
    })
  }


}
