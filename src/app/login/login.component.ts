import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authService = inject(AuthService);

  username = "";
  password = "";
  errorMessage= "";
  router = inject(Router);

   ngOnInit(): void {
    this.authService.errorEmitter.subscribe(msg => {
      this.errorMessage = msg;
    });
  }

 
  login() {
  this.authService.login({ username: this.username, password: this.password }).subscribe({
    next: (response) => {
      localStorage.setItem('currentUser', JSON.stringify(response));
      this.router.navigate(['/']);
    },
    error: (err) => {
      this.errorMessage = err.error?.message || 'Login failed';
    }
  });
}
}