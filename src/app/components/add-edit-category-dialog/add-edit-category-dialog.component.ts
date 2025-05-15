import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-add-edit-category-dialog',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatOptionModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './add-edit-category-dialog.component.html',
  styleUrl: './add-edit-category-dialog.component.scss'
})
export class AddEditCategoryDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddEditCategoryDialogComponent>);
  categoryForm !: FormGroup;
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(private snackbarService: SnackbarService,private categoryService: CategoryService){}

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
        budget_allocation_percentage: new FormControl({value : this.data.category.budget_allocation_percentage, disabled : false},[Validators.required]),
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
      this.categoryService.postCategory(data).subscribe((response)=>{
        this.snackbarService.success('Category added Successfully.')
        this.dialogRef.close('success');
      }, (error)=>{
        console.log(error)
        this.snackbarService.success('Failed to add Category.')
      })

    }
    
  }

  onUpdate(){
    console.log(this.categoryForm.value)
    if(this.categoryForm.invalid){

      return ;
    } else {
      let categoryId = this.data.type === 'edit' ? this.data.category.id : ""
    
      this.categoryService.updateCategory(this.categoryForm.value,categoryId).subscribe((response)=>{
        this.snackbarService.success('Category updated successfully.')
        this.dialogRef.close('success');
      }, (error)=>{
        console.log(error)
        this.snackbarService.success('Failed to add Category.')
      })

    }
  }

  

  onCancel(){
    this.dialogRef.close('');
  }
}
