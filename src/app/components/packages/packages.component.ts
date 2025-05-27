import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PackageService } from '../../services/package.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-packages',
  imports: [MatButtonModule,MatIconModule],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss'
})
export class PackagesComponent {
  packages : any[] =[]


  /** Dependencies */
  private packageService = inject(PackageService);
  private snackbarService = inject(SnackbarService);

  constructor(){
    this.getAllPackages();
  }

  getAllPackages(){
    this.packageService.getAllPackages().subscribe({
     next : (response : any) => {
      this.packages = response.data;
     },
     error : (error : any)=> {
      this.snackbarService.error(error.error.details || 'Internal Server Error');
     }
    })
  }

}
