import { Component, Injectable } from '@angular/core';
import { NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { inject } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})

@Injectable({
  providedIn: 'root',
})
export class EditComponent {

    readonly nzModalData = inject(NZ_MODAL_DATA);
    readonly ModalRef = inject(NzModalRef);
    formbuilder = inject(FormBuilder);

    commentData: any;

    constructor(private message: NzMessageService){}

    commentForm = this.formbuilder.group({
    commentText: ["", [Validators.required, Validators.minLength(1)]]
    });

   
    ngOnInit(){

      /* setTimeout(() =>{ */
        this.commentData = this.nzModalData.commentData;
        this.commentForm.patchValue({commentText: this.commentData});
      /* }) */
    }

    close(type: string){
      console.log(this.commentForm.value.commentText);
      this.ModalRef.close(this.commentForm.value.commentText);

      if(type == 'success'){
        this.message.create(type, `Updating message: ${type}`);
      }
      else
         this.message.create(type, `Updating message: ${type}`);
    }

}
