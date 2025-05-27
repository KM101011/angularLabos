import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserProfile } from './userProfile';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  router = inject(Router);
  userService = inject(UserService);
  authService = inject(AuthService)

  currentUser: UserProfile | null = null;

 ngOnInit() {
  const userString = localStorage.getItem('currentUser');
  console.log(userString);
  let userId: number | null = null;
  if(userString){
    const user = JSON.parse(userString);
    userId = Number(user.userId);
  }

  if (!userId) {
    this.router.navigateByUrl('/login');
    return;
  }
  this.userService.getUserById(userId).subscribe({
    next: user => this.currentUser = user,
    error: () => this.router.navigateByUrl('/login')
  });
}
}
