import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UploadStatementComponent } from '../upload-statement/upload-statement.component';
import { TransactionDetailsService } from '../../services/transaction-details.service';
import { TableShimmerComponent } from '../shared/table-shimmer/table-shimmer.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';

export interface PeriodicElement {
  id: string,
  account_id: string,
  FileName: string;
  AccountType: string;
  Provider: string;
  BeneficiaryName: string;
  UploadStatus: string;
  AnalysisStatus: string
  actions?: string;
}
@Component({
  selector: 'app-transaction-details',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatMenuModule,
    MatDialogModule,
    TableShimmerComponent,
    MatPaginatorModule,
    DatePipe
  ],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.scss',
})
export class TransactionDetailsComponent implements OnInit {
  transactionColumns: string[] = [
    'FileName',
    'AccountType',
    'Provider',
    'BeneficiaryName',
    'UploadStatus',
    'AnalysisStatus',
    'actions',
  ];
  loader = signal<boolean>(false);

  currentPage = signal<number>(0);
  previousPage = signal<number | undefined>(0);
  rowsOnPage = signal<number>(10);
  totalTransactions = signal<number>(0);

  transactionSource: any[] = [];
  allTransactions: any[] = [];

  /**Dependencies */
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);
  private snackbar = inject(SnackbarService)
  private transactionService = inject(TransactionDetailsService);

  ngOnInit(): void {
    this.loadTransactionDetails();
    console.log(this.route.pathFromRoot)
  }

  constructor(
    private matDialog: MatDialog,
    private transactionDetailsService: TransactionDetailsService
  ) {}

  loadTransactionDetails() {
    this.loader.update(() => true);
    this.transactionDetailsService
      .loadDetails(this.currentPage() + 1, this.rowsOnPage())
      .subscribe((response: any) => {
        console.log('Transaction Details Response: ', response);
        this.totalTransactions.update(() => response?.data?.total);
        this.allTransactions = response.data.items;
        this.transactionSource = this.allTransactions.map((item: any) => ({
          id: item.id,
          account_id: item.account.id,
          FileName: item.file_name,
          AccountType: item.account.account_type,
          Provider: item.account.provider,
          BeneficiaryName: item.account.beneficiary_name,
          UploadStatus: item.upload_status,
          AnalysisStatus: item.overall_analysis_status,
          actions: '',
        }));
        this.loader.update(() => false);
      });
  }

  onUploadStatement() {
    const data = this.matDialog.open(UploadStatementComponent, {
      width: '600px',
      minWidth: '600px',
      minHeight: '400px',
      disableClose: true,
      data: {
        type: 'add',
      },
    });
    data.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result);
        this.loadTransactionDetails();
      }
    });
  }

  onPage(event: PageEvent) {
    console.log(event);
    this.currentPage.update(() => event.pageIndex);
    this.rowsOnPage.update(() => event.pageSize);
    this.previousPage.update(() => event.previousPageIndex);
    this.loadTransactionDetails();
  }


  onView(element: any ){
    console.log('View Element: ', element);
    this.router.navigate(['view'], { queryParams : { person_id : this.auth.clientId , statement_id: element.id} , relativeTo: this.route });
  }

  onAnalyze(element:any) {
    console.log('Analyze Element: ', element);
    console.log('account ID: ', element.account_id);
    console.log('statement ID: ', element.id);
    //this.router.navigate(['analyze'], {queryParams : {account_id: element.account_id, statement_id: element.id}, relativeTo: this.route});

    this.getTransactionsByStatementId(element.account_id, element.id);
  }

  viewAnalysis(element:any) {
    console.log('View Analysis Element: ', element);
    console.log('account ID: ', element.account_id);
    console.log('statement ID: ', element.id);

    const person_id = sessionStorage.getItem('personId');
    const statement_upload_id= element.id;

    this.router.navigate(['analysis'], {queryParams: {person_id: person_id, statement_upload_id}, relativeTo: this.route});
  }

  getTransactionsByStatementId(accountId : any, statementId: any){
    this.transactionService.getTransactionsByStatementId(accountId, statementId).subscribe((response:any)=>{
      console.log('Transactions By statement ID Response: ', response)
      this.snackbar.open(response.data.message, 'Close', 3000);
      this.loadTransactionDetails();
    })
  }
}
