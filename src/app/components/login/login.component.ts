import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service'
import { SnackbarService } from '../../services/snackbar.service';
import { SharedService } from '../../services/shared.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressBar,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  loader = signal<boolean>(false);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService, 
    private snackbar : SnackbarService,
    private sharedService: SharedService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    console.log(this.loginForm);
  }

  onSubmit() {
    this.loader.update(() => true);
    this.loginService.login(this.loginForm.value).subscribe(
      (response: any) => {
        this.authService.setCredentials({...response , clientId: response.client_id})
        this.snackbar.success('Login Successfully')
        this.loader.update(() => false);
        this.router.navigate(['/home/dashboard']);
      },
      (error) => {
        this.loader.update(() => false);
        this.snackbar.open(error?.error?.detail, 'Close');
      }
    );
  }
}
