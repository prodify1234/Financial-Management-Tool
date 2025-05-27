import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FamilyDetailsService } from '../../services/family-details.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-family-details-delete-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './family-details-delete-dialog.component.html',
  styleUrl: './family-details-delete-dialog.component.scss'
})
export class FamilyDetailsDeleteDialogComponent {

  readonly dialogRef = inject(MatDialogRef<FamilyDetailsDeleteDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  /** Dependencies */
  private familyDetailsService = inject(FamilyDetailsService);
  private snackbarService = inject(SnackbarService);

  constructor(){}
  onDelete(){
    this.familyDetailsService.deleteFamilyDetails(this.data?.data?.id).subscribe({
      next: (response :any ) => {
        console.log(response);
        this.snackbarService.success(response.message || "Family Member Deleted Successfully.");
        this.dialogRef.close(response);
      },
      error : (error : any) => {
        this.snackbarService.error(error.error.message || "Internal Server Error");
      }
    })
  }

}
