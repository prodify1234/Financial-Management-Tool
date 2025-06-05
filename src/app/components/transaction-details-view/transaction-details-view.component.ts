import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionDetailsService } from '../../services/transaction-details.service';
import { SnackbarService } from '../../services/snackbar.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { BreadcrumpsComponent } from "../shared/breadcrumps/breadcrumps.component";
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-transaction-details-view',
  imports: [CommonModule, MatIconModule, MatButtonModule, DatePipe, MatTooltipModule,BreadcrumpsComponent ],
  templateUrl: './transaction-details-view.component.html',
  styleUrl: './transaction-details-view.component.scss'
})
export class TransactionDetailsViewComponent {

  personId : string = '';
  statementId : string =''
  statement:any = {}

 
  /** Dependencies */
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackbar = inject(SnackbarService)
  private transactionService = inject(TransactionDetailsService);
  private sharedService = inject(SharedService);

  constructor(){
   console.log(this.route.pathFromRoot)

   this.route.queryParams.subscribe((params) => {
    console.log(params)
    if(params['person_id'] && params['statement_id']) {
      this.personId = params['person_id'];
      this.statementId = params['statement_id'];
      this.getTransactionDetailsById(this.personId , this.statementId);
      this.getStatementDetailsById(this.personId , this.statementId);
    }
     
   })
  }


  getTransactionDetailsById(person_id : string , statement_id :  string){
    this.transactionService.getTransactionDetailsView(person_id, statement_id).subscribe({
      next : (response :any) => {
        console.log(response)
      } ,
      error : (error : any) =>{
          this.snackbar.error(error?.error.message || 'Error fetching transaction details');
      }

    })
  }

  getStatementDetailsById(person_id : string , statement_id :  string){
    this.transactionService.getStatementDetailsById(person_id, statement_id).subscribe({
      next : (response :any) => {
        this.statement = response.data
      } ,
      error : (error : any) =>{
          this.snackbar.error(error?.error.message || 'Error fetching statement details');
      }
    })
  }


  downloadFileFromS3() {
    this.sharedService.downloadFileFromS3(this.statement.file_url, this.statement.file_name);
  }


}
