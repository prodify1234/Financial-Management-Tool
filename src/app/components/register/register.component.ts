import {
  Component,
  viewChild,
  ViewEncapsulation,
  OnInit,
  inject,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { signal } from '@angular/core';
import { computed } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import CreatePerson from '../../Models/CreatePerson.model';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
  hide = signal(true);
  step = signal<string>('first');
  isFirstStep = computed(() => this.step() === 'first');
  step1Form!: FormGroup;
  step2Form!: FormGroup;
  snackbar = inject(SnackbarService);
  loader = signal<boolean>(false)

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.step1Form = this.formBuilder.group({
      id: new FormControl<any>(''),
      first_name: new FormControl<string>('', [Validators.required]),
      last_name: new FormControl<string>('', [Validators.required]),
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      phone_number: new FormControl<string>('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
      pan_number: new FormControl<string>('', [Validators.required]),
      aadhaar_number: new FormControl<string>('', [
        Validators.required,
        Validators.pattern('^[0-9]{12}$'),
      ]),
      address: new FormControl<string>('', [Validators.required]),
    });

    this.step2Form = this.formBuilder.group({
      password: new FormControl<string>('', [Validators.required,Validators.minLength(4)]),
      confirm_password: new FormControl<string>('', [Validators.required,Validators.minLength(4)]),
    }, { validators : this.checkPasswordsMatching });

    this.step2Form.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  checkPasswordsMatching(formGroup : FormGroup):{[key:string]: boolean} | null{
    //function to check whether the password and confirm password are same
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirm_password')?.value;
    if( password && confirmPassword && password !== confirmPassword){
      return {passwordMismatch: true};
    }else {
      return null;
    }

  }

  createPerson() {
    console.log(this.step1Form.value);
    this.loader.update(() =>true)
    this.registerService.createPerson(this.step1Form.value).subscribe({
      next : (response: any) => {
        console.log(response);
        this.step1Form.patchValue({ id: response.data.id });
        this.step2Form.reset();
        this.loader.update(()=> false)
        this.step.update(() => 'second');
      },
      error: (error) =>{
        this.snackbar.error(error.error.details);
        this.loader.update(()=> false)
      }
    });
  }

  onCreateClient() {
    console.log(this.step2Form.value);
    this.loader.update(()=> true)
    this.registerService
      .createClient({
        person_id: this.step1Form.value.id,
        ...this.step2Form.value,
      })
      .subscribe({
        next : (response)=>{
          this.router.navigate(['/login'])
          this.loader.update(()=> false)
          this.snackbar.success(response.message);
        },
        error: (error)=>{
          this.loader.update(()=> false)
          this.snackbar.open(error?.error?.details);
        }
      })
  }

  onNavigate(type: string) {
    if (type === 'second') {
      this.createPerson();
    } else {
      this.step.update(() => 'first');
      this.step2Form.reset();
    }
  }
}
