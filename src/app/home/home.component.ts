import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommentService, Comment } from '../services/comment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  router = inject(Router);
  commentService = inject(CommentService);

  currentUser: any = null;
  comments: Comment[] = [];
  commentText = "";
  editingCommentId: number | null = null;

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.currentUser = JSON.parse(storedUser);
    this.loadComments();
  }

 loadComments() {
  this.commentService.getComments().subscribe(data => {
    this.comments = data.map(c => ({
      ...c,
      userId: c.user_id
    }));
  });
}

  addOrUpdateComment() {
    const trimmed = this.commentText.trim();
    if (!trimmed) return;

    if (this.editingCommentId !== null) {
      this.commentService.updateComment(this.editingCommentId, this.currentUser.userId, trimmed).subscribe(() => {
        this.loadComments();
        this.cancelEdit();
      });
    } else {
      const newComment: Comment = {
        user_id: this.currentUser.userId,
        username: this.currentUser.username,
        content: trimmed
      };
      this.commentService.addComment(newComment).subscribe(() => {
        this.loadComments();
        this.commentText = "";
      });
    }
  }

  editComment(comment: Comment) {
    if (comment.user_id !== this.currentUser.userId) return;
    this.editingCommentId = comment.id!;
    this.commentText = comment.content;
  }

  cancelEdit() {
    this.editingCommentId = null;
    this.commentText = "";
  }

  deleteComment(comment: Comment) {
    if (comment.user_id !== this.currentUser.userId) return;
    this.commentService.deleteComment(comment.id!, this.currentUser.userId).subscribe(() => this.loadComments());
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }
}
