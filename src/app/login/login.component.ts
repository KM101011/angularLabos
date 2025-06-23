import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authService = inject(AuthService);
  router = inject(Router);
  private formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

   ngOnInit(): void {
    this.authService.errorEmitter.subscribe(msg => {
       this.loginForm.setErrors({invalidCredentials: msg});
    });
  }

 
  login() {
  const credentials = this.loginForm.value as LoginRequest;

  this.authService.login(credentials).subscribe({
    next: (response) => {
      localStorage.setItem('currentUser', JSON.stringify(response));
      this.router.navigate(['/']);
      this.authService.isLoggedIn = true;
    },
    error: (err) => {
      this.authService.isLoggedIn = false;
       this.loginForm.setErrors({invalidCredentials: err.error?.message || 'Login failed'});
    }
  });
}
}