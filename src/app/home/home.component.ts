import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommentService, Comment } from '../services/comment.service';
import { CommonModule } from '@angular/common';
import { FormsModule, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider'
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { EditComponent } from '../edit/edit.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, NzTableModule, NzDividerModule, NzModalModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  formbuilder = inject(FormBuilder);
  modal = inject(NzModalService);
  router = inject(Router);

  currentUser: any = null;
  comments: Comment[] = [];
  editingCommentId: number | null = null;

  constructor(private authservice: AuthService, 
    private commentService: CommentService, private message: NzMessageService) {
    this.currentUser = this.authservice.getLoggedInUser();
    this.loadComments();
  }

  commentForm = this.formbuilder.group({
    commentText: ["", [Validators.required, Validators.minLength(1)]]
  });

  editCommentPopUp(comment: any){
    console.log(comment);
    const modal = this.modal.create({
      nzContent: EditComponent,
      nzData: {
        commentData: comment.content
      },
      nzFooter: null 
    }).afterClose.subscribe({
      next: (result) => { 
        console.log(result, "pliz");
        if(result){
          this.editingCommentId = comment.id!;
          if (this.editingCommentId !== null) {
            this.commentService.updateComment(this.editingCommentId, this.currentUser.userId, result).subscribe(() => {
            this.loadComments();
            this.commentForm.reset();
            });
          }
        }
      }
    });
  }

 loadComments() {
  this.commentService.getComments().subscribe({
    next: (data) => {
      this.message.success("Success");
      this.comments = data.map(c => ({
      ...c,
      userId: c.user_id
      }));
    },
    error: (err) => {
      console.log(err);
      this.message.error(err.message || "Greška pri editiranju komentara")
    }
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

  /* editComment(comment: Comment) {
    if (comment.user_id !== this.currentUser.userId) return;
    this.editingCommentId = comment.id!;
    this.commentForm.patchValue({commentText: comment.content});
  } */

  cancelEdit() {
    this.editingCommentId = null;
    this.commentForm.reset();
  }

  showDeleteConfirm(comment: Comment){
      this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this comment?',
      nzContent: `<b style="color: red;">${comment.content}</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>  this.deleteComment(comment),
      nzCancelText: 'No',
      nzOnCancel: () => this.cancelEdit()
    }); 
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
