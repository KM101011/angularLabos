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

  formbuilder = inject(FormBuilder)

  currentUser: any = null;
  comments: Comment[] = [];
  editingCommentId: number | null = null;

  constructor(private authservice: AuthService, private router: Router, private commentService: CommentService) {

    this.currentUser = this.authservice.getLoggedInUser();
    this.loadComments();
  }

  commentForm = this.formbuilder.group({
    commentText: ["", [Validators.required, Validators.minLength(1)]]
  });

 loadComments() {
  this.commentService.getComments().subscribe(data => {
    this.comments = data.map(c => ({
      ...c,
      userId: c.user_id
    }));
  });
}

  addOrUpdateComment() {

    const trimmed = this.commentForm.controls['commentText'].value?.trim();
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
        this.commentForm.reset();
      });
    }
  }

  editComment(comment: Comment) {
    if (comment.user_id !== this.currentUser.userId) return;
    this.editingCommentId = comment.id!;
    this.commentForm.patchValue({commentText: comment.content});
  }

  cancelEdit() {
    this.editingCommentId = null;
    this.commentForm.reset();
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
