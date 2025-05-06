import { Component, ViewEncapsulation } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  constructor(private router: Router){}


  onSubmit(){
    this.router.navigate(['/dashboard'])
  }
}
