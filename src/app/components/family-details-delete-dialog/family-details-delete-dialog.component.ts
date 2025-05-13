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




  constructor(private familyDetailsService: FamilyDetailsService,private snackbarService: SnackbarService){
    
  }

  onDelete(){
    this.familyDetailsService.deleteFamilyDetails(this.data?.data?.id).subscribe((response)=>{
      console.log(response);
      this.snackbarService.success("Family Member Deleted Successfully.")
      this.dialogRef.close(response)
    } ,(error)=>{
      console.log(error)
      this.snackbarService.error("Internal Server error")
    })
  }

}
