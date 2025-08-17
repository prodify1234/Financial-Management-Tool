import { IncomeDeclerationService } from './../../services/income-decleration.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { TableShimmerComponent } from "../shared/table-shimmer/table-shimmer.component";
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddIncomeDeclerationComponent } from '../add-income-decleration/add-income-decleration.component';
@Component({
  selector: 'app-income-decleration',
  imports: [TableShimmerComponent, MatMenuModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatTableModule, MatDialogModule],
  templateUrl: './income-decleration.component.html',
  styleUrl: './income-decleration.component.scss'
})
export class IncomeDeclerationComponent implements OnInit {

  loader = signal<boolean>(false);
  incomeService = inject(IncomeDeclerationService);
  allIncomes : any[] = [];
  dialogRef = inject(MatDialog);

  incomeColumns : any[] = [
    'source',
    'income',
    'category_type',
    'has_asset',
    'frequency',
    'main_classification',
    'sub_classification',
    'actions',
  ]

  ngOnInit(): void {
    this.getIncomes();
  }

  onAddIncome(){
    const dialogRef = this.dialogRef.open(AddIncomeDeclerationComponent, {
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
        this.getIncomes();
      }
    })
  }

  getIncomes(){
    this.loader.update(()=>true)
    this.incomeService.getIncomes().subscribe((response:any)=>{
      console.log('All Incomes Response: ', response);

      this.allIncomes = response.data;

      console.log('All Incomes Array: ', this.allIncomes);

      this.loader.update(()=>false)
    })
  }

  onEdit(element:any){
    console.log(element)
    const data = this.dialogRef.open(AddIncomeDeclerationComponent,{
      width: '600px',
      minWidth: '600px',
      //height: 'auto',
      disableClose: true,
      data: {
        type: 'edit',
        data:  element
      }
    });
    data.afterClosed().subscribe((result: any | '') => {
      if(result){
        console.log(result);
        this.getIncomes();
      }
    });
  }

  onDelete(element:any){
    console.log(element);
    const incomeId = element.id;

    this.incomeService.deleteIncome(incomeId).subscribe((response:any)=>{
      console.log('Delete Income: ', response);

      this.getIncomes();
    })
  }
}
