import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Injectable, Inject} from "@angular/core";
import { API_URL_LOGIN, API_URL_REGISTRATION } from "../environment/enviroment";
import { FormBuilder } from "@angular/forms";
import { RegisterComponent } from "../register/register.component";

export interface LoginRequest{
  username: string,
  password: string
}

export interface RegisterRequest{
    username: string,
    password: string,
    confirmPassword: string,
    name: string,
    email: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  fb = FormBuilder
  registerComponent = Inject(RegisterComponent);

  errorEmitter = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {}

   login(credentials: LoginRequest) {
    return this.http.post<any>(API_URL_LOGIN, credentials);
  }

  register(credentials: RegisterRequest) {

    if (credentials.password !== credentials.confirmPassword) {
      console.log(credentials.password, credentials.confirmPassword);
      this.registerComponent.registerForm.setErrors({invalidCredentials: "Passwords do not match"});
      return;
    }
 
    this.http.post(API_URL_REGISTRATION, {
      username: credentials.username,
      password: credentials.password,
      password2: credentials.confirmPassword,
      email: credentials.email,
      name: credentials.name
    }).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (err.status === 409) {
          this.registerComponent.registerForm.setErrors({invalidCredentials: "Username already exists"});
        } else {
         this.registerComponent.registerForm.setErrors({invalidCredentials: "Error registering user"});
        }
      }
    });
  }
}
