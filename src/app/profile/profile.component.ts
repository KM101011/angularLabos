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

  currentUser: UserProfile | null = null;

  constructor(private authservice: AuthService){}

 ngOnInit() {

  const storedUser = this.authservice.getLoggedInUser();
  let userId: number | null = null;
  if(storedUser){
    const user = storedUser;
    userId = Number(user.userId);
  }

  if (!userId) {
    //this.router.navigateByUrl('/login');
    return;
  }
  this.userService.getUserById(userId).subscribe({
    next: user => this.currentUser = user,
    error: (err) => { 
      console.log(err);
      this.router.navigateByUrl('/login')}
  });
}
}
