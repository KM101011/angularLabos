import { CommonModule } from '@angular/common';
import { Component , inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface Comment{
  username: string;
  content: string;
  timestamp: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
 
  router = inject(Router);
  currentUser: any = null;
  comments: Comment[] = [];
  commentText = "";

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.currentUser = JSON.parse(storedUser);
    this.loadComments();
  }

  loadComments(){
    this.comments = JSON.parse(localStorage.getItem('comments') || '[]');
  }

  addComment(){
    if(!this.commentText.trim()) return;

    const newComment: Comment = {
        username: this.currentUser.username,
        content: this.commentText,
        timestamp: new Date().toLocaleString()
    }

    this.comments.push(newComment);
    localStorage.setItem('comments', JSON.stringify(this.comments));
    this.commentText = "";
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }
}
