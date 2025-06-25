import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommentService, Comment } from '../services/comment.service';
import { CommonModule } from '@angular/common';
import { FormsModule, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  router = inject(Router);
  commentService = inject(CommentService);
  formbuilder = inject(FormBuilder)

  currentUser: any = null;
  comments: Comment[] = [];
  commentText = "";
  editingCommentId: number | null = null;

  constructor(private authservice: AuthService) {
    
    const storedUser = this.authservice.getLoggedInUser();

    if (!storedUser) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.currentUser = storedUser
    this.loadComments();
  }

  commentForm = this.formbuilder.group({
    commentText: ["", [Validators.required, Validators.minLength(1)]]
  });

 /*  editForms: {[key:number]: any} = {}

  errorMessage ="";
 */

 loadComments() {

/* this.commentService.getComments().subscribe({
  next: data =>{
    this.comments = data;
    this.comments.forEach(c =>{
      this.editForms[c.id] = this.commentForm.control(c.content, Validators.required);
    });
  },
  error: err => {
    this.errorMessage = 'Failed to load comments';
  }
  }); */
  this.commentService.getComments().subscribe(data => {
    this.comments = data.map(c => ({
      ...c,
      userId: c.user_id
    }));
  });
}

  addOrUpdateComment() {

    console.log("a");

    console.log(this.commentForm.value.commentText);
    this.commentText = this.commentForm.value.commentText;
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
    this.authservice.deleteLoggedInUser(); 
    this.currentUser = null;
    this.router.navigateByUrl('/login');
  }
}
