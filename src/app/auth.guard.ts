import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (this.authservice.isLoggedIn) {
      console.log(true);
      return true;
    } else {
      console.log(false);
      this.router.navigate(['/login']);
      return false;
    }
  }
}