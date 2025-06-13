import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionDetailsService } from '../../services/transaction-details.service';
import { SnackbarService } from '../../services/snackbar.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumpsComponent } from '../shared/breadcrumps/breadcrumps.component';
import { SharedService } from '../../services/shared.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonToggleGroup, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { TableShimmerComponent } from '../shared/table-shimmer/table-shimmer.component';
import { TextTrimPipe } from '../../pipes/text-trim.pipe';
import { MatDialog } from '@angular/material/dialog';
import { TransactionAddDialogComponent } from '../transaction-add-dialog/transaction-add-dialog.component';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-transaction-details-view',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    DatePipe,
    MatTooltipModule,
    BreadcrumpsComponent,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatButtonToggleGroup,
    MatTableModule,
    TableShimmerComponent,
    TextTrimPipe,
    MatButtonModule,
    MatMenuModule,

  ],
  templateUrl: './transaction-details-view.component.html',
  styleUrl: './transaction-details-view.component.scss',
})
export class TransactionDetailsViewComponent {
  personId: string = '';
  statementId: string = '';
  statement: any = {};
  transactionsList :any[] = [] 
  currentPage = signal<number>(0);
  previousPage = signal<number | undefined>(0);
  rowsOnPage = signal<number>(10);
  totalTransactions = signal<number>(0);
  viewType = signal<string>('table')
  displayedColumns: string[] = ['transaction_date','type', 'description' ,'debit' , 'amount' , 'action']; // action has to be pushed
  loader = signal<boolean>(false);

  /** Dependencies */
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackbar = inject(SnackbarService);
  private transactionService = inject(TransactionDetailsService);
  private sharedService = inject(SharedService);
  private matDialog = inject(MatDialog);

  constructor() {
    console.log(this.route.pathFromRoot);

    this.route.queryParams.subscribe((params) => {
      console.log(params);
      if (params['person_id'] && params['statement_id']) {
        this.personId = params['person_id'];
        this.statementId = params['statement_id'];
        this.getStatementDetailsById(this.personId, this.statementId);
      }
    });
  }

  fetchTransactions() {
    const body = {

      account_id_in: [this.statement.account.id],
      statement_upload_id_in: [this.statementId],
      transaction_date_from: null,
      transaction_date_to: null,
      description: null,
      amount_from: null,
      amount_to: null,
      debit: null,
      credit: null,
      uploaded_at_from: null,
      uploaded_at_to: null,
    };
    this.getTransactionDetailsById(body);
  }

  getTransactionDetailsById(body: any) {
    this.transactionsList =[]
    this.loader.update(() => true);
    this.transactionService.getTransactionDetailsView(body , this.currentPage() + 1, this.rowsOnPage()).subscribe({
      next: (response: any) => {
         this.transactionsList = response.data.items;
         this.totalTransactions.update(()=> response.data.total)
         this.loader.update(() => false);
      },
      error: (error: any) => {
        this.snackbar.error(
          error?.error.message || 'Error fetching transaction details'
        );
        this.loader.update(() => false);
      },
    });
  }

  getStatementDetailsById(person_id: string, statement_id: string) {
    this.transactionService
      .getStatementDetailsById(person_id, statement_id)
      .subscribe({
        next: (response: any) => {
          this.statement = response.data;
          console.log(this.statement);
          this.fetchTransactions();
        },
        error: (error: any) => {
          this.snackbar.error(
            error?.error.message || 'Error fetching statement details'
          );
        },
      });
  }

  onPage(event: PageEvent) {
    console.log(event);
    this.currentPage.update(() => event.pageIndex);
    this.rowsOnPage.update(() => event.pageSize);
    this.previousPage.update(() => event.previousPageIndex);
    this.fetchTransactions();
  }

  downloadFileFromS3() {
    this.sharedService.downloadFileFromS3(
      this.statement.file_url,
      this.statement.file_name
    );
  }

  onToggle(value:string){
    this.viewType.update(()=>value);
  }

  onTransaction(){
    const data = this.matDialog.open(TransactionAddDialogComponent, {
      width: '600px',
      minWidth: '600px',
      height: 'auto',
      disableClose: true,
      data: {
        type: 'add',
        accountId : this.statement.account.id,
        statementId: this.statement.id
      },
    });
    data.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result);
        this.resetPagination();
        this.fetchTransactions();
      }
    });
  }
  onEditTransaction(element:any){
    const data = this.matDialog.open(TransactionAddDialogComponent, {
      width: '600px',
      minWidth: '600px',
      height: 'auto',
      disableClose: true,
      data: {
        type: 'edit',
        accountId : this.statement.account.id,
        statementId: this.statement.id,
        element
      },
    });
    data.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result);
        this.resetPagination();
        this.fetchTransactions();
      }
    });
  }

  onDelete(transactionId: string) {
    this.transactionService.deleteTransaction(transactionId).subscribe({
      next: (response: any) => {
        this.snackbar.success(response.message || 'Transaction deleted successfully');
        this.resetPagination();
        this.fetchTransactions();
      },
      error: (error: any) => {
        this.snackbar.error(error?.error?.details || 'Something went wrong');
      },
    }) 
  }

  resetPagination() {
    this.currentPage.update(() => 0);
    this.previousPage.update(() => 0);
    this.rowsOnPage.update(() => 10);
  }

  hasMatToolTip(value:string , maxLength:number = 20): string | null {
    return value && value.length > maxLength ? value : null;
  }
}
