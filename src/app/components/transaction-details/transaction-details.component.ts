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

export interface PeriodicElement {
  FileName: string;
  AccountType: string;
  AccountNumber: string;
  Provider: string;
  BeneficiaryName: string;
  Status: string;
  TransactionCount: string;
  UploadedAt: string;
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

  transactionSource: any[] = [];
  allTransactions: any[] = [];

  /**Dependencies */
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService)
  
  ngOnInit(): void {
    this.loadTransactionDetails();
    console.log(this.route.pathFromRoot)
  }

  loader = signal<boolean>(false);

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
          FileName: item.file_name,
          AccountType: item.account.account_type,
          AccountNumber: item.account.account_number,
          Provider: item.account.provider,
          BeneficiaryName: item.account.beneficiary_name,
          Status: item.upload_status,
          TransactionCount: item.transaction_count,
          UploadedAt: item.created_at,
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
    this.router.navigate(['view'], { queryParams : { person_id : this.auth.personId , statement_id: element.id} , relativeTo: this.route });
  }
}
