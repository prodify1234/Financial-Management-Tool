import { Component, OnInit, signal } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEditFamilyDetailsDialogComponent } from '../add-edit-family-details-dialog/add-edit-family-details-dialog.component';
import CreatePerson from '../../Models/CreatePerson.model';
import { FamilyDetailsService } from '../../services/family-details.service';
import { SnackbarService } from '../../services/snackbar.service';
import { FamilyDetailsDeleteDialogComponent } from '../family-details-delete-dialog/family-details-delete-dialog.component';
export interface Person {
  first_name: string;
  last_name: string;
  relationship_type: string;
  email: string;
  phone_number: string;
  actions?: string;
}



@Component({
  selector: 'app-family-details',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatMenuModule,
    MatDialogModule,
    AddEditFamilyDetailsDialogComponent,
  ],
  templateUrl: './family-details.component.html',
  styleUrl: './family-details.component.scss',
})
export class FamilyDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'relationship_type',
    'email',
    'phone_number',
    'actions',
  ];
  dataSource : Person[] = [];
  loader  = signal<boolean>(false)

  constructor(private matDialog: MatDialog,private familyDetailsService: FamilyDetailsService , private snackbarService : SnackbarService) {
    // this.getAllPersons();


  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllPersons();
  }

  getAllPersons() {
    this.dataSource = []
    this.loader.update(() => true)
    this.familyDetailsService.getAllFamilyMemberDetails().subscribe((response: any) => {
     console.log(response)
     for(let item of response){
      this.dataSource.push({
        relationship_type: item.relationship_type,
        ...item.person
      })
     }
     this.loader.update(()=> false)
     console.log(this.dataSource)
     
    } ,(error)=>{
      this.loader.update(()=> false)
      this.snackbarService.error('Internal server error')
    })

  }

  onAddFamilyMember() {
    const data = this.matDialog.open(AddEditFamilyDetailsDialogComponent,{
      width: '600px',
      minWidth: '600px',
      height: 'auto',
      disableClose: true,
      data: {
        type: 'add'
      }

    });
    data.afterClosed().subscribe((result: any | '') => {
      if(result){
        console.log(result);
        this.getAllPersons();

      }
    });
  }

  onEdit(element:any){
    console.log(element)
    const data = this.matDialog.open(AddEditFamilyDetailsDialogComponent,{
      width: '600px',
      minWidth: '600px',
      height: 'auto',
      disableClose: true,
      data: {
        type: 'edit',
        data:  element
      }

    });
    data.afterClosed().subscribe((result: CreatePerson | '') => {
      if(result){
        console.log(result);
        this.getAllPersons();
      }
    });
  }

  onDelete(element: any){
    console.log(element)
    const data = this.matDialog.open(FamilyDetailsDeleteDialogComponent,{
      width: '400px',
      minWidth: '400px',
      height: '300px',
      minHeight: '300px',
      disableClose: true,
      data: {
        type: 'delete',
        data:  element
      }
    })

    data.afterClosed().subscribe((result: any) => {
      if(result){
        console.log(result);
        
      }
      this.getAllPersons();
    });

  }
}
