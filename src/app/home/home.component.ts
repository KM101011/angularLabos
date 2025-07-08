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
import { User } from '../profile/user';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, NzTableModule, NzDividerModule, NzModalModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private formbuilder = inject(FormBuilder);
  private modal = inject(NzModalService);
  private router = inject(Router);
  private authservice = inject(AuthService);
  private message = inject(NzMessageService);
  private commentservice = inject(CommentService);

  currentUser: User | null = null;
  comments: Comment[] = [];
  editingCommentId: number | null = null;

  constructor() {}

  ngOnInit(){

    this.currentUser = this.authservice.getLoggedInUser();
    this.loadComments();
  }

  commentForm = this.formbuilder.group({
    commentText: ["", [Validators.required, Validators.minLength(1)]]
  });

  loadComments() {
    this.commentservice.getComments().subscribe({
      next: (data) => {
        this.comments = data;
      },
      error: (err) => {
        console.log(err);
        this.message.error(err.message || "Error editing comment")
      }
    });
  } 

  editCommentPopUp(comment: Comment){

    console.log(this.currentUser);

    const modal = this.modal.create({
      nzContent: EditComponent,
      nzData: {
        commentData: comment.content
      },
      nzFooter: null 
    }).afterClose.subscribe({
      next: (result) => { 

        if(result){
          this.editingCommentId = comment.id!;
          if (this.editingCommentId !== null) {
            this.commentservice.updateComment(this.editingCommentId, this.currentUser?.userId!, result).subscribe(() => {
            this.loadComments();
            this.commentForm.reset();
            });
          }
        }
      }
    });
  }

  addOrUpdateComment() {

    const trimmed = this.commentForm.value.commentText?.trim();
    if (!trimmed) return;

    if (this.editingCommentId !== null) {
      this.commentservice.updateComment(this.editingCommentId, this.currentUser?.userId!, trimmed).subscribe(() => {
        this.loadComments();
        this.cancelEdit();
      });
    } else {
      const newComment: Comment = {
        user_id: this.currentUser?.userId!,
        username: this.currentUser?.username!,
        content: trimmed
      };
      this.commentservice.addComment(newComment).subscribe(() => {
        this.loadComments();
        this.commentForm.reset();
      });
    }
  }

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
      nzCancelText: 'No'
    }); 
  }

  deleteComment(comment: Comment) {

    console.log(comment.user_id, this.currentUser?.userId)

    console.log(comment);

    if (comment.user_id !== this.currentUser?.userId) return;
    this.commentservice.deleteComment(comment.id!, this.currentUser.userId).subscribe(() => this.loadComments());
  } 

  logout() {
    this.authservice.deleteLoggedInUser(); 
    this.currentUser = null;
    this.router.navigateByUrl('/login');
  }
}
