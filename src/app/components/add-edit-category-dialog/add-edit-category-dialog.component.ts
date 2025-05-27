import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { identity } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { SnackbarService } from '../../services/snackbar.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-add-edit-category-dialog',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatOptionModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, ReactiveFormsModule, MatSnackBarModule,MatProgressBarModule],
  templateUrl: './add-edit-category-dialog.component.html',
  styleUrl: './add-edit-category-dialog.component.scss'
})
export class AddEditCategoryDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddEditCategoryDialogComponent>);
  categoryForm !: FormGroup;
  readonly data = inject<any>(MAT_DIALOG_DATA);
  loader = signal<boolean>(false)

  /** Dependencies */
  private snackbarService = inject(SnackbarService);
  private categoryService = inject(CategoryService);

  constructor(){}

  ngOnInit(): void{
    console.log(this.data)
    if(this.data.type === 'add') {
      this.categoryForm = new FormGroup({
        id : new FormControl(""),
        head: new FormControl('' , [Validators.required]),
        main_classification: new FormControl("", [Validators.required]),
        sub_classification: new FormControl("",[Validators.required]),
        display_name: new FormControl("" , [Validators.required]),
        type: new FormControl("",[Validators.required]),
        frequency: new FormControl("",[Validators.required]),
        budget_allocation_percentage: new FormControl("",[Validators.required]),
      })
    }else{
      this.categoryForm = new FormGroup({
        id : new FormControl({value: this.data.category.id , disabled : true}),
        head: new FormControl({value : this.data.category.head, disabled : true} , [Validators.required]),
        main_classification: new FormControl({value : this.data.category.main_classification, disabled : true}, [Validators.required]),
        sub_classification: new FormControl({value : this.data.category.sub_classification, disabled : true},[Validators.required]),
        display_name: new FormControl({value : this.data.category.display_name, disabled : true} , [Validators.required]),
        type: new FormControl({value : this.data.category.type, disabled : false},[Validators.required]),
        frequency: new FormControl({value : `${this.data.category.frequency}`, disabled : false},[Validators.required]),
        budget_allocation_percentage: new FormControl<number>({value : +this.data.category.budget_allocation_percentage, disabled : false},[Validators.required]),
      })
    }
  }


  onAdd(){
    if(this.categoryForm.invalid){
      return ;
    } else {
      let data = this.categoryForm.value;
      if(!data.id){
        delete data.id
      }
      data['source']="custom"
      this.loader.update(()=> true)

      this.categoryService.postCategory(data).subscribe({
        next: (response:any)=>{
          this.snackbarService.success(response.message || 'Category added Successfully.');
          this.dialogRef.close('success');
          this.loader.update(() => false)
        },
        error : (error : any) => {
          this.snackbarService.error(error.error.details || 'Failed to add Category.')
          this.loader.update(() => false)
        }
      })
    }
    
  }

  onUpdate(){
    console.log(this.categoryForm.value)
    if(this.categoryForm.invalid){

      return ;
    } else {
      let categoryId = this.data.type === 'edit' ? this.data.category.id : ""
      this.loader.update(()=> true)
      this.categoryService.updateCategory(this.categoryForm.value,categoryId).subscribe({
        next : (response :any) =>{
          console.log(response);
          this.snackbarService.success(response.message || 'Category updated successfully.')
          this.dialogRef.close('success');
          this.loader.update(()=> false)
        },
        error: (error:any)=>{
          console.log(error);
          this.snackbarService.error(error.error.details || 'Failed to update Category.')
          this.loader.update(()=> false)  
        }
      })
    }
  }

  

  onCancel(){
    this.dialogRef.close('');
  }
}
