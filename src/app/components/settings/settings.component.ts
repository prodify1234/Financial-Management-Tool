import { Component, inject } from '@angular/core';
import { CategoriesComponent } from "../categories/categories.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { HeaderComponent } from "../header/header.component";
import { IncomeDeclerationComponent } from "../income-decleration/income-decleration.component";
import { AssetDeclerationComponent } from "../asset-decleration/asset-decleration.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [CategoriesComponent, MatIconModule, MatButtonModule, MatMenuModule, MatSnackBarModule, HeaderComponent, IncomeDeclerationComponent, AssetDeclerationComponent, RouterModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  router = inject(Router);


  ngOnInit(): void {

  }


}
