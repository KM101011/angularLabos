import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { RegisterRequest } from '../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

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

  constructor(private message: NzMessageService){}

  registerForm = this.formBuilder.group({
      username: ["", [Validators.minLength(4), Validators.required]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required, this.validateSamePassword]],
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]]
  });

  private validateSamePassword(control: AbstractControl): ValidationErrors | null {
    const password = control.parent?.get('password');
    const confirmPassword = control.parent?.get('confirmPassword');
    return password?.value == confirmPassword?.value ? null : { 'notSame': true };
  }
  
  register(){

    const credentials = this.registerForm.value as RegisterRequest

    this.authService.register(credentials).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        this.registerForm.setErrors({invalidCredentials: err.error?.message || 'Registration failed'});
        this.message.error(err.message || "Greška kod registracije korisnika");
      }
    });  
  }
}
