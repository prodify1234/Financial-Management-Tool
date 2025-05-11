import { Component } from '@angular/core';
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
  constructor( private packageService : PackageService, private snackbarService : SnackbarService ){
    this.getAllPackages();
  }

  getAllPackages(){
    this.packageService.getAllPackages().subscribe((response:any) => {
      this.packages = response
      console.log(response)
    }, () => {
      this.snackbarService.error('Internal Server Error!')
    })
  }

}
