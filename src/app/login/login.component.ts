import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = "";
  password = "";
  errorMessage= "";
  router = inject(Router);

  login(){
      
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((user: any) => user.username === this.username && user.password === this.password);

    if(existingUser){
      localStorage.setItem('currentUser', JSON.stringify(existingUser));
      this.router.navigateByUrl('/');
    }else{
      this.errorMessage = "Invalid username or password";
    }
  }
}
