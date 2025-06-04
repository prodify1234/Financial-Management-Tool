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
import { CommonModule } from '@angular/common';

export interface PeriodicElement {
  FileName: string;
  AccountType: string;
  AccountNumber: string;
  Provider: string;
  BeneficiaryName: string;
  Status: string;
  TransactionCount: string;
  UploadedAt: string;
  actions?:string
}
@Component({
  selector: 'app-transaction-details',
  imports: [CommonModule,MatIconModule, MatButtonModule, MatTableModule, MatMenuModule, MatDialogModule, TableShimmerComponent, MatPaginatorModule],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.scss'
})
export class TransactionDetailsComponent implements OnInit {

  transactionColumns: string[] = [
    'FileName',
    'AccountType',
    'AccountNumber',
    'Provider',
    'BeneficiaryName',
    'Status',
    'TransactionCount',
    'UploadedAt',
    'actions',
  ];
  currentPage = signal<number>(0);
  previousPage = signal<number | undefined>(0);
  rowsOnPage = signal<number>(10);
  totalTransactions = signal<number>(0);

  transactionSource : any[]=[];
  allTransactions : any[] =[];
  ngOnInit(): void {
    this.loadTransactionDetails()

  }

  loader  = signal<boolean>(false)

  constructor(private matDialog: MatDialog, private transactionDetailsService: TransactionDetailsService) {}

  loadTransactionDetails(){
    this.loader.update(() => true)
    this.transactionDetailsService.loadDetails(this.currentPage() + 1, this.rowsOnPage()).subscribe((response:any)=>{
      console.log('Transaction Details Response: ', response);
      this.totalTransactions.update(() => response?.data?.total);
      this.allTransactions = response.data.items;
      this.transactionSource = this.allTransactions.map((item:any)=>({
        id: item.id,
        FileName : item.file_name,
        AccountType : item.account.account_type,
        AccountNumber : item.account.account_number,
        Provider : item.account.provider,
        BeneficiaryName : item.account.beneficiary_name,
        Status: item.upload_status,
        TransactionCount: item.transaction_count,
        UploadedAt: new Date(item.created_at).toLocaleDateString('en-GB'),
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

  onPage(event: PageEvent) {
    console.log(event);
    this.currentPage.update(() => event.pageIndex);
    this.rowsOnPage.update(() => event.pageSize);
    this.previousPage.update(() => event.previousPageIndex);
    this.loadTransactionDetails();
  }
}
