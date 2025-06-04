import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UploadStatementComponent } from '../upload-statement/upload-statement.component';
import { TransactionDetailsService } from '../../services/transaction-details.service';
import { TableShimmerComponent } from '../shared/table-shimmer/table-shimmer.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

export interface PeriodicElement {
  FileName: string;
  CreatedAt: string;
  AccountType: string;
  Provider: string;
  AccountNumber: string;
  BeneficiaryName: string;
  actions?:string
}
@Component({
  selector: 'app-transaction-details',
  imports: [MatIconModule, MatButtonModule, MatTableModule, MatMenuModule, MatDialogModule, TableShimmerComponent, MatPaginatorModule],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.scss'
})
export class TransactionDetailsComponent implements OnInit {

  transactionColumns: string[] = [
    'FileName',
    'CreatedAt',
    'AccountType',
    'Provider',
    'AccountNumber',
    'BeneficiaryName',
    'actions',
  ];
  currentPage = signal<number>(0);
  previousPage = signal<number | undefined>(0);
  rowsOnPage = signal<number>(10);
  totalCategories = signal<number>(0);

  transactionSource : any[]=[];
  allTransactions : any[] =[];
  ngOnInit(): void {
    this.loadTransactionDetails()

  }

  loader  = signal<boolean>(false)

  constructor(private matDialog: MatDialog, private transactionDetailsService: TransactionDetailsService) {}

  loadTransactionDetails(){
    this.loader.update(() => true)
    this.transactionDetailsService.loadDetails().subscribe((response:any)=>{
      console.log('Transaction Details Response: ', response);
      this.allTransactions = response.data.items;
      this.transactionSource = this.allTransactions.map((item:any)=>({
        id: item.id,
        FileName : item.file_name,
        CreatedAt: new Date(item.created_at).toLocaleDateString('en-GB'),
        AccountType : item.account.account_type,
        Provider : item.account.provider,
        BeneficiaryName : item.account.beneficiary_name,
        actions : ''
      }))
      this.loader.update(()=> false)
    })
  }

  onUploadStatement(){
    const data = this.matDialog.open(UploadStatementComponent, {
      width: '600px',
      minWidth: '600px',
      minHeight: '400px',
      disableClose: true,
      data: {
        type: 'add'
      }
    })
    data.afterClosed().subscribe((result:any)=>{
    if(result) {
      console.log(result);
      this.loadTransactionDetails();
    }
  })
  }
}
