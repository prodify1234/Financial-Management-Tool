import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { AccountsService } from '../../services/accounts.service';



@Component({
  selector: 'app-account-details-delete-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './account-details-delete-dialog.component.html',
  styleUrl: './account-details-delete-dialog.component.scss'
})
export class AccountDetailsDeleteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AccountDetailsDeleteDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(private snackbar: SnackbarService, private accountDetails: AccountsService) {}

  onDelete(){
    console.log(this.data);
    this.accountDetails.deleteFamilyDetails(this.data?.data?.id).subscribe((response:any)=>{
      console.log(response.message);
      this.snackbar.success(response.message || "Family Member Deleted Successfully.");
        this.dialogRef.close(response);
    } ,(error:any)=>{
      this.snackbar.error(error.error.message || "Internal Server Error");
    })
  }
}
