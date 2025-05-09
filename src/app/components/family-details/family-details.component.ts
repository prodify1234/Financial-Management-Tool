import { Component, OnInit } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEditFamilyDetailsDialogComponent } from '../add-edit-family-details-dialog/add-edit-family-details-dialog.component';
import CreatePerson from '../../Models/CreatePerson.model';
import { FamilyDetailsService } from '../../services/family-details.service';
export interface PeriodicElement {
  name: string;
  relationship: string;
  email: string;
  phone: string;
  actions?: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    name: 'JohDoe',
    relationship: 'Spouse',
    email: 'jnanesh@gmail.com',
    phone: '08309752441',
  },
  {
    name: 'JohDoe',
    relationship: 'Spouse',
    email: 'jnanesh@gmail.com',
    phone: '08309752441',
  },
  {
    name: 'JohDoe',
    relationship: 'Spouse',
    email: 'jnanesh@gmail.com',
    phone: '08309752441',
  },
  {
    name: 'JohDoe',
    relationship: 'Spouse',
    email: 'jnanesh@gmail.com',
    phone: '08309752441',
  },
  {
    name: 'JohDoe',
    relationship: 'Spouse',
    email: 'jnanesh@gmail.com',
    phone: '08309752441',
  },
  {
    name: 'JohDoe',
    relationship: 'Spouse',
    email: 'jnanesh@gmail.com',
    phone: '08309752441',
  },
  {
    name: 'JohDoe',
    relationship: 'Spouse',
    email: 'jnanesh@gmail.com',
    phone: '08309752441',
  },
  {
    name: 'JohDoe',
    relationship: 'Spouse',
    email: 'jnanesh@gmail.com',
    phone: '08309752441',
  },
  {
    name: 'JohDoe',
    relationship: 'Spouse',
    email: 'jnanesh@gmail.com',
    phone: '08309752441',
  },
  {
    name: 'JohDoe',
    relationship: 'Spouse',
    email: 'jnanesh@gmail.com',
    phone: '08309752441',
  },
  {
    name: 'JohDoe',
    relationship: 'Spouse',
    email: 'jnanesh@gmail.com',
    phone: '08309752441',
  },
];

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
    'name',
    'relationship',
    'email',
    'phone',
    'actions',
  ];
  dataSource = ELEMENT_DATA;

  constructor(private matDialog: MatDialog,private familyDetailsService: FamilyDetailsService) {
    // this.getAllPersons();


  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllPersons();
  }

  getAllPersons() {
    this.familyDetailsService.getAllFamilyMemberDetails().subscribe((response: CreatePerson) => {
       console.log(response);
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
    data.afterClosed().subscribe((result: CreatePerson | '') => {
      if(result){
        console.log(result);
      }
    });
  }

  onEdit(){
    const data = this.matDialog.open(AddEditFamilyDetailsDialogComponent,{
      width: '600px',
      minWidth: '600px',
      height: 'auto',
      disableClose: true,
      data: {
        type: 'edit'
      }

    });
    data.afterClosed().subscribe((result: CreatePerson | '') => {
      if(result){
        console.log(result);
      }
    });
  }
}
