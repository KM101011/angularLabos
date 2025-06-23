import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, RegisterRequest } from '../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  router = inject(Router);
  authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  registerForm = this.formBuilder.group({
      username: ["", Validators.minLength(4), Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
      name: ["", Validators.required],
      email: ["", Validators.required]
  });

  register(form: any){

    const credentials = this.registerForm.value as RegisterRequest;

      /* if(!form.valid){
        this.registerForm.setErrors({invalidCredentials: "Please fill in all required fields."});
        return;
      } */

      /* if(credentials.username.length < 4){
        this.registerForm.setErrors({invalidCredentials: "Username must be at least 4 characters"});
        return;
      } */


      /* if(this.registerForm.value.password !== this.registerForm.value.confirmPassword){
        console.log("a");
        this.registerForm.setErrors({invalidCredentials: "Passwords do not match"});
        console.log("b")
        return;
      }

      this.authService.errorEmitter.subscribe(msg => {
         this.registerForm.setErrors({invalidCredentials: msg});
      });
 */
      this.authService.register({
        username: credentials.username,
        password: credentials.password,
        confirmPassword: credentials.confirmPassword,
        name: credentials.name,
        email: credentials.email
      });
  }
}

