import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEditCategoryDialogComponent } from '../add-edit-category-dialog/add-edit-category-dialog.component';
import { CategoryService } from '../../services/category.service';
import { TableShimmerComponent } from '../shared/table-shimmer/table-shimmer.component';

export interface PeriodicElement {
  head: string;
  main_classification: string;
  sub_Classification: string;
  type: string;
  frequency: string;
  budget_allocation_percentage: string;
  actions?: string;
}





@Component({
  selector: 'app-categories',
  imports: [MatIconModule, MatButtonModule, MatTableModule, MatMenuModule, MatFormFieldModule, MatInputModule, MatDialogModule ,TableShimmerComponent],

  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  categoryColumns: string[]= [
    'head',
    'main_classification',
    'sub_classification',
    'type',
    'frequency',
    'budget_allocation_percentage',
    'actions'
  ]
  categoriesList : PeriodicElement[] =[];
  loader = signal<boolean>(false);

  constructor(private matDialog : MatDialog,private categoriesService:CategoryService) {
     this.getCategories();
  }


  getCategories(){
    const body={
      type: 'system',
      search_criteria : {

      }
    }
    this.loader.update(()=> true)
    this.categoriesService.getAllCategories(body).subscribe((response:any) => {
      console.log(response)
      this.categoriesList = response?.items
      this.loader.update(() => false)
    }, (error)=> {
      this.loader.update(() => false)
    })



  }

  addCategory(){
    const data = this.matDialog.open(AddEditCategoryDialogComponent, {
      width: '600px',
      minWidth: '600px',
      height: 'auto',
      disableClose: true,
      data: {
        type: 'add'
      }
    })
  }


  isValueNaN(value: any): any {
    console.log(value , Number.isNaN(value))
    return value === 'NaN' ? 'N/A' : value;
  }
}
