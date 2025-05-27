import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  errorEmitter = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {}

   login(credentials: { username: string; password: string }) {
  return this.http.post<any>('http://localhost:8081/login', credentials);
}

  register(credentials: { username: string, password: string, password2: string, name: string, email: string }) {
    if (credentials.password !== credentials.password2) {
      this.errorEmitter.next("Passwords do not match");
      return;
    }

    this.http.post('http://localhost:8081/register', {
      username: credentials.username,
      password: credentials.password,
      email: credentials.email,
      name: credentials.name
    }).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (err.status === 409) {
          this.errorEmitter.next("Username already exists");
        } else {
          this.errorEmitter.next("Error registering user");
        }
      }
    });
  }
}
