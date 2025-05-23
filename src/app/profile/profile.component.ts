import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  currentUser: any = null;
  router = inject(Router);
  
  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.currentUser = JSON.parse(storedUser);
  }
}
