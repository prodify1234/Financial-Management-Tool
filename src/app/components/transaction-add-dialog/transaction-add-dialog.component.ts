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
  }

  onCancel() {
    this.dialogRef.close('');
  }

  onAdd(){
    if(this.transactionForm.invalid){
      return ;
    } else {
      const body = {
        account_id : this.data.accountId,
        statement_upload_id : this.data.statementId,
        transaction_date : this.transactionForm.value.date,
        description : this.transactionForm.value.description,
        debit : this.transactionForm.value.transaction_type === '0' ? this.transactionForm.value.amount : 0,
      }
      this.transactionService.addTransaction(this.transactionForm.value).subscribe({
        next : (response : any) => {
          console.log(response)
        },
        error : (error: any) => {
          this.snackbar.error(error?.error?.details || 'Something went wrong');
        }
      })

    }
  }
}
