import { Component, inject, signal } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { SnackbarService } from '../../services/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-categories-delete-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  templateUrl: './categories-delete-dialog.component.html',
  styleUrl: './categories-delete-dialog.component.scss'
})
export class CategoriesDeleteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CategoriesDeleteDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  loader = signal<boolean>(false);

  constructor(private categoryService: CategoryService,private snackbarService: SnackbarService){
    
  }

  onDelete(){
    this.loader.update(()=> true)
    this.categoryService.deleteCategory(this.data?.data?.id).subscribe((response)=>{
      console.log(response);
      this.snackbarService.success("Category Deleted Successfully.")
      this.dialogRef.close('success')
      this.loader.update(()=> false)
    } ,(error)=>{
      console.log(error)
      this.snackbarService.error("Internal Server error")
      this.loader.update(()=> false)
    })
  }
}
