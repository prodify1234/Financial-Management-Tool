import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatOptionModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatProgressBar,
  MatProgressBarModule,
} from '@angular/material/progress-bar';
import { AddEditAccountDetailsComponent } from '../add-edit-account-details/add-edit-account-details.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TransactionDetailsService } from '../../services/transaction-details.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../../services/snackbar.service';
import moment from 'moment';

@Component({
  selector: 'app-transaction-add-dialog',
  imports: [
    MatProgressBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatDatepickerModule,
    MatRadioModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBar
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './transaction-add-dialog.component.html',
  styleUrl: './transaction-add-dialog.component.scss',
})
export class TransactionAddDialogComponent {
  loader = signal<boolean>(false);
  transactionForm!: FormGroup;

  /** Dependencies */
  readonly dialogRef = inject(MatDialogRef<AddEditAccountDetailsComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  private transactionService  = inject(TransactionDetailsService);
  private snackbar = inject(SnackbarService);




  constructor() {
    this.transactionForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      transaction_type: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(0)]),
      // credit: new FormControl('', []),
    });
    if(this.data?.element) {
      this.transactionForm.patchValue({
        date: this.data.element.transaction_date ? new Date(this.data.element.transaction_date) : '',
        description: this.data.element.description,
        transaction_type: this.data.element.debit ? 'Debit' : 'Credit',
        amount: this.data.element.debit ? this.data.element.debit : this.data.element.credit,
      });
    }
  }

  onCancel() {
    this.dialogRef.close('');
  }

  onAction(type : 'add' | 'update'){
    if(this.transactionForm.invalid){
      return ;
    } else {
      const body = {
        account_id : this.data.accountId,
        statement_upload_id : this.data.statementId,
        transaction_date : this.transactionForm.value.date ? moment(this.transactionForm.value.date).format('YYYY-MM-DD') : '',
        description : this.transactionForm.value.description,
        transaction_type : this.transactionForm.value.transaction_type,
        debit : this.transactionForm.value.transaction_type === 'Debit' ? this.transactionForm.value.amount : 0,
        credit : this.transactionForm.value.transaction_type === 'Credit' ? this.transactionForm.value.amount : 0,
      }
      this.loader.update(() => true);
      if(type === 'add') {
        this.addTransaction(body);
      }else { 
        this.updateTransaction(body)
      }
     

    }
  }
  addTransaction(body:any ){
    this.transactionService.addTransaction(body).subscribe({
      next : (response : any) => {
        this.dialogRef.close(response.data);
        this.snackbar.success(response.message || 'Transaction added successfully');
        this.loader.update(() => false);
      },
      error : (error: any) => {
        this.snackbar.error(error?.error?.details || 'Something went wrong');
        this.loader.update(() => false);
      }
    })
  }
  updateTransaction(body: any){
    this.transactionService.updateTransaction(body, this.data?.element?.id).subscribe({
      next : (response : any) => {
        this.dialogRef.close(response.data);
        this.snackbar.success(response.message || 'Transaction updated successfully');
        this.loader.update(() => false);
      },
      error : (error: any) => {
        this.snackbar.error(error?.error?.details || 'Something went wrong');
        this.loader.update(() => false);
      }
    })

  }
}


