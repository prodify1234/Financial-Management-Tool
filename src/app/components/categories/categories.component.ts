import { Component, inject, signal } from '@angular/core';
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
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Category from '../../Models/Category.model';
import { CategoriesDeleteDialogComponent } from '../categories-delete-dialog/categories-delete-dialog.component';
import { SnackbarService } from '../../services/snackbar.service';

export interface Categories {
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
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    TableShimmerComponent,
    MatPaginatorModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],

  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  categoryColumns: string[] = [
    'head',
    'main_classification',
    'sub_classification',
    'type',
    'frequency',
    'source',
    'budget_allocation_percentage',
    'actions',
  ];
  categoriesList: Categories[] = [];
  frequencyTypes:{ [key:string] : string} = { '1' : 'Quarter-1' , '2' : 'Quarter-2' , '3' : 'Quarter-3', '4': 'Quarter-4'}
  loader = signal<boolean>(false);
  currentPage = signal<number>(0);
  previousPage = signal<number | undefined>(0);
  rowsOnPage = signal<number>(10);
  totalCategories = signal<number>(0);
  filtersForm!: FormGroup;

  // Dependencies 
  private matDialog = inject(MatDialog);
  private categoriesService = inject(CategoryService);
  private snackbar = inject(SnackbarService)
  constructor() {
    this.filtersForm = new FormGroup({
      search: new FormControl(''),
      type: new FormControl(''),
    });
    this.getCategories();
    this.filtersForm.valueChanges.subscribe(() => { 
      this.currentPage.update(() => 0);
      this.previousPage.update(() => 0);  
      this.rowsOnPage.update(() => 10);
      this.getCategories();
    })
  }

  getCategories() {
    let search = this.filtersForm.get('search')?.value || '';
    const body = {
      source: this.filtersForm.get('type')?.value
        ? [this.filtersForm.get('type')?.value]
        : [null],
      search_criteria: {
        head: search,
        main_classification: search,
        sub_classification: search,
        // type: search,
        // frequency: search,
      },
    };
    this.loader.update(() => true);
    this.categoriesService
      .getAllCategories(body, this.currentPage() + 1, this.rowsOnPage())
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.categoriesList = response?.data?.items;
          this.totalCategories.update(() => response?.data?.total);
          this.loader.update(() => false);
        },
        error: (error) => {
          this.snackbar.error(error?.error.details || 'Failed to fetch categories');
          this.loader.update(() => false);
          this.categoriesList =[]
        },
      })
  }

  addCategory() {
    const data = this.matDialog.open(AddEditCategoryDialogComponent, {
      width: '600px',
      minWidth: '600px',
      height: 'auto',
      disableClose: true,
      data: {
        type: 'add',
      },
    });

    data.afterClosed().subscribe((response) => {
      if (response === 'success') {
        this.getCategories();
      }
    });
  }

  onEdit(category : Category){
    console.log(category);
    const data = this.matDialog.open(AddEditCategoryDialogComponent,{
      width: '600px',
      minWidth: '600px',
      height: 'auto',
      disableClose: true,
      data: {
        type: 'edit',
        category : {
          ...category
        }
      },
    });
    data.afterClosed().subscribe((response) => {
      if (response === 'success') {
        this.getCategories();
      }
    });
  }

  onDelete(category : Category){
    console.log(category);
    const data = this.matDialog.open(CategoriesDeleteDialogComponent,{
      width: '400px',
      minWidth: '400px',
      height: '300px',
      minHeight: '300px',
      disableClose: true,
      data: {
        type: 'delete',
        data:  category
      }
    });
    data.afterClosed().subscribe((response) => {
      if (response === 'success') {
        this.getCategories();
      }
    });
  }




  isValueNaN(value: any): any {
    return value === 'NaN' ? 'N/A' : value;
  }

  onPage(event: PageEvent) {
    console.log(event);
    this.currentPage.update(() => event.pageIndex);
    this.rowsOnPage.update(() => event.pageSize);
    this.previousPage.update(() => event.previousPageIndex);
    this.getCategories();
  }

  getFrequency(element:Categories){ 
    return this.frequencyTypes[element.frequency] ?? 'Not Available'
  }
}
