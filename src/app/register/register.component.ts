import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
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

  public error?: boolean = false;

  registerForm = this.formBuilder.group({
      username: new FormControl<String>("", [Validators.minLength(4), Validators.required]),
      password: new FormControl<String>("", [Validators.required]),
      confirmPassword: new FormControl<String>("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required])
  });

  register(form: any){
    console.log(this.registerForm.controls['confirmPassword'].errors);

  
    if(form.value.password !== form.value.confirmPassword) {
      this.error = true;
    }
   
    this.authService.register(form.value);


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
  }
}
