import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { User } from '../profile/user';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private message = inject(NzMessageService);

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  currentUser: User | null = null;

  constructor(){}

  ngOnInit(): void {

    this.currentUser = this.authService.getLoggedInUser();

    if(this.currentUser){
      this.authService.deleteLoggedInUser();
    }
  }
 
  login() {

  const credentials = this.loginForm.value as LoginRequest;

  this.authService.login(credentials).subscribe({
    next: (response) => {
      console.log(response);
      this.authService.setLoggedInUser(response);
      this.router.navigate(['/']);
      this.message.success("Login successful");
    },
    error: (err) => {
      console.log(err);
      this.loginForm.setErrors({invalidCredentials: err.error.message || 'Login failed'});
      this.message.error(err.message || "Login failed")
    }
  });
}
}