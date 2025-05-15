import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { SnackbarService } from '../../services/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-categories-delete-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './categories-delete-dialog.component.html',
  styleUrl: './categories-delete-dialog.component.scss'
})
export class CategoriesDeleteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CategoriesDeleteDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(private categoryService: CategoryService,private snackbarService: SnackbarService){
    
  }

  onDelete(){
    this.categoryService.deleteCategory(this.data?.data?.id).subscribe((response)=>{
      console.log(response);
      this.snackbarService.success("Category Deleted Successfully.")
      this.dialogRef.close('success')
    } ,(error)=>{
      console.log(error)
      this.snackbarService.error("Internal Server error")
    })
  }
}
