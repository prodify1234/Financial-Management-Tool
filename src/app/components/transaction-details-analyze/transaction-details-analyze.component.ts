import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { TransactionDetailsService } from '../../services/transaction-details.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-transaction-details-analyze',
  imports: [],
  templateUrl: './transaction-details-analyze.component.html',
  styleUrl: './transaction-details-analyze.component.scss'
})
export class TransactionDetailsAnalyzeComponent implements OnInit {

  account_id : string = '';
  statement_id : string = '';
  message: string = '';
  status:string = '';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackbar = inject(SnackbarService)
  private transactionService = inject(TransactionDetailsService);
  private sharedService = inject(SharedService);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
      if(params['account_id'] && params['statement_id']){
        this.account_id = params['account_id'];
        this.statement_id = params['statement_id'];

        this.getTransactionsByStatementId(this.account_id, this.statement_id);
      }
    })
  }


  getTransactionsByStatementId(accountId : any, statementId: any){
    this.transactionService.getTransactionsByStatementId(accountId, statementId).subscribe((response:any)=>{
      console.log('Transactions By statement ID Response: ', response)
      this.message = response.data.message;
      this.status = response.data.status;
    })
  }

}
