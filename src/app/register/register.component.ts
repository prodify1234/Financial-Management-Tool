import { Component, viewChild, ViewEncapsulation } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { signal } from '@angular/core';
import {  computed} from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,MatIconModule, RouterModule , MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {

  hide = signal(true);
  step = signal<string>('first');
  isFirstStep = computed(() => this.step() === 'first');  

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(private router: Router){}

  onNavigate(type: string) {
    this.step.update(() => type);
  }
  onSubmit(){
      // this.step.update(() => 'second')
  }

}
