import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from './user'; 
import { AuthService } from '../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  private router = inject(Router);
  private userservice = inject(UserService);
  private authservice = inject(AuthService);
  private message = inject(NzMessageService);

  currentUser: User | null = null;

  constructor(){}

  ngOnInit() {

    this.currentUser = this.authservice.getLoggedInUser();

    if(this.currentUser){

      this.userservice.getUserById(this.currentUser.userId).subscribe({
        next: (response) => {
          console.log(response);
          this.currentUser = response.data;
        },
        error: (err) => { 
          console.log(err);
          this.router.navigateByUrl('/login');
          this.message.error(err.message || "Error showing users");
        }
      });
    }
  }
}
