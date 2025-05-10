import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEditCategoryDialogComponent } from '../add-edit-category-dialog/add-edit-category-dialog.component';

export interface PeriodicElement {
  head: string;
  mainClassification: string;
  subClassification: string;
  type: string;
  frequency: string;
  budgetAllocation: string;
  actions?: string;
}

const CATEGORY_DATA: PeriodicElement[] = [
  {
    head: 'Income',
    mainClassification: 'Salary',
    subClassification: 'Regular',
    type: 'Credit',
    frequency: 'Monthly',
    budgetAllocation: '100%'
  },
  {
    head: 'Income',
    mainClassification: 'Salary',
    subClassification: 'Regular',
    type: 'Credit',
    frequency: 'Monthly',
    budgetAllocation: '100%'
  }
]



@Component({
  selector: 'app-categories',
  imports: [MatIconModule, MatButtonModule, MatTableModule, MatMenuModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  categoryColumns: string[]= [
    'head',
    'mainClassification',
    'subClassification',
    'type',
    'frequency',
    'budgetAllocation',
    'actions'
  ]
  categorySource = CATEGORY_DATA;

  constructor(private matDialog : MatDialog) {}

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
}
