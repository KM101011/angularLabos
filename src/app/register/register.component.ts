import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  username = "";
  password = "";
  confirmPassword = "";
  name = "";
  email = "";
  errorMessage = "";
  router = inject(Router);
  authService = inject(AuthService);

  register(form: any){

      if(!form.valid){
        this.errorMessage = "Please fill in all required fields.";
        return;
      }

      if(this.username.length < 4){
        this.errorMessage = "Username must be at least 4 characters";
        return;
      }

      if(this.password !== this.confirmPassword){
        this.errorMessage = "Passwords do not match";
        return;
      }

      this.authService.errorEmitter.subscribe(msg => {
        this.errorMessage = msg;
      });

      this.authService.register({
        username: this.username,
        password: this.password,
        password2: this.confirmPassword,
        name: this.name,
        email: this.email
      });
       

     /*  const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find((user: any) => user.username === this.username);

      if(existingUser){
        this.errorMessage = "Username already exists";
        return;
      }

      const newUser = {
        username: this.username,
        password: this.password,
        email: this.email,
        name: this.name
      }

      users.push(newUser);

      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));

      this.router.navigateByUrl('/login'); */
  }
}

