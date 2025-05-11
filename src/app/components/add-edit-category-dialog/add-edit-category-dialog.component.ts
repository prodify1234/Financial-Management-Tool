import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-category-dialog',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatOptionModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './add-edit-category-dialog.component.html',
  styleUrl: './add-edit-category-dialog.component.scss'
})
export class AddEditCategoryDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddEditCategoryDialogComponent>);
  editCategoryForm !: FormGroup;

  constructor(private snackbar: MatSnackBar){}

  ngOnInit(): void{
    this.editCategoryForm = new FormGroup({
      head: new FormControl('' , [Validators.required]),
      main_classification: new FormControl("", [Validators.required]),
      sub_classification: new FormControl("",[Validators.required]),
      type: new FormControl("",[Validators.required]),
      frequency: new FormControl("",[Validators.required]),
      budget_allocation: new FormControl("",[Validators.required]),
    })
  }


  onAdd(){
    console.log(this.editCategoryForm.value);
    if(this.editCategoryForm.valid){
      const data = this.editCategoryForm.value;
      this.snackbar.open('Category added successfully', 'Close', {
        duration: 3000,
      });
      this.dialogRef.close('')
    }
  }

  onCancel(){
    this.dialogRef.close('');
  }
}
