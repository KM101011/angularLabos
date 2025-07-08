import { Component, Injectable } from '@angular/core';
import { NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { inject } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

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
    private formbuilder = inject(FormBuilder);

    commentData: string | null = null;

    commentForm = this.formbuilder.group({
    commentText: ["", [Validators.required, Validators.minLength(1)]]
    });
   
    ngOnInit(){

        this.commentData = this.nzModalData.commentData;
        this.commentForm.patchValue({commentText: this.commentData});
    }

    close(){

      this.ModalRef.close(this.commentForm.value.commentText);
    }

}
