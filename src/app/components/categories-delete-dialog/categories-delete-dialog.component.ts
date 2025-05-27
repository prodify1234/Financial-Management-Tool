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

  /* Dependencies */
  private categoryService = inject(CategoryService);
  private snackbarService = inject(SnackbarService);

  constructor(){
    
  }

  onDelete(){
    this.loader.update(()=> true)
    this.categoryService.deleteCategory(this.data?.data?.id).subscribe({
      next : (response: any) => {
        console.log(response);
        this.snackbarService.success(response.message || "Category Deleted Successfully.")
        this.dialogRef.close('success')
        this.loader.update(()=> false)
      },
      error : (error : any)=>{
          this.snackbarService.error(error.error.message || "Internal Server Error")
          this.loader.update(()=> false)
      }
    })
  }
}
