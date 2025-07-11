import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { FamilyDetailsComponent } from './components/family-details/family-details.component';
import { authGuard } from './auth/auth.guard';
import { PackagesComponent } from './components/packages/packages.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { FinancialItemsComponent } from './components/financial-items/financial-items.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NetworthComponent } from './components/networth/networth.component';
import { CashflowsComponent } from './components/cashflows/cashflows.component';
import { NetworthTrendsComponent } from './components/networth-trends/networth-trends.component';
import { TransactionDetailsViewComponent } from './components/transaction-details-view/transaction-details-view.component';
import { TransactionDetailsAnalyzeComponent } from './components/transaction-details-analyze/transaction-details-analyze.component';
import { ItemHeadDetailsComponent } from './components/item-head-details/item-head-details.component';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { SettingsComponent } from './components/settings/settings.component';
import { IncomeDeclerationComponent } from './components/income-decleration/income-decleration.component';
import { AssetDeclerationComponent } from './components/asset-decleration/asset-decleration.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'header', component: HeaderComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [authGuard], canActivateChild: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'family-details', component: FamilyDetailsComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'packages', component: PackagesComponent },
      {
        path: 'financial-items', component: FinancialItemsComponent, children: [
          { path: '', redirectTo: 'item-details', pathMatch: 'full' },
          { path: "item-details", component: ItemHeadDetailsComponent },
          { path: "items", component: ItemDetailsComponent}
        ]
      },
      {
        path: 'transaction-details', children: [
          { path: "", component: TransactionDetailsComponent },
          { path: "view", component: TransactionDetailsViewComponent },
          { path: "analysis", component: TransactionDetailsAnalyzeComponent }
        ]
      },
      { path: 'networth', component: NetworthComponent },
      { path: 'cashflows', component: CashflowsComponent },
      { path: 'networth-trends', component: NetworthTrendsComponent },
      { path: 'profile-update', component: ProfileUpdateComponent },
      {
        path: 'settings', component: SettingsComponent, children: [
          { path: '', redirectTo: 'categories', pathMatch: 'full' },
          { path: 'categories', component: CategoriesComponent },
          { path: 'income-decleration', component: IncomeDeclerationComponent},
          { path: 'asset-decleration', component: AssetDeclerationComponent}
        ]
      }
    ]
  },
];


