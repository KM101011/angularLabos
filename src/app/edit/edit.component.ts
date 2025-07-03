import { Component, Input, Injectable } from '@angular/core';
import { NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-edit',
  imports: [HomeComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})

@Injectable({
  providedIn: 'root',
})
export class EditComponent {

    readonly nzModalData = inject(NZ_MODAL_DATA);
    formbuilder = inject(FormBuilder);
    home = inject(HomeComponent);

    commentData: any;

    commentForm = this.formbuilder.group({
    commentText: ["", [Validators.required, Validators.minLength(1)]]
    });

   
    ngOnInit(){
      this.commentData = this.nzModalData.commentData;
      console.log(this.commentData);

       this.commentForm.patchValue({commentText: this.commentData.content});
    }

}
