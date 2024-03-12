import { Component, OnInit, input } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Question } from '../../../../model/survey.model';

@Component({
  selector: 'answer-response-short',
  standalone: true,
  imports: [NzFormModule , FormsModule , ReactiveFormsModule, NzInputModule],
  templateUrl: './answer-response-short.component.html',
  styleUrl: './answer-response-short.component.scss'
})
export class AnswerResponseShortComponent implements OnInit {


  inputControl = input.required<FormControl>();
  dataOption  = input.required<Question>();

  ngOnInit(): void {
    this.addValidators();
  }
  addValidators(){
    setTimeout(() => {
      if (this.dataOption().required){
        this.inputControl().addValidators(Validators.required)
      }
      this.inputControl().updateValueAndValidity();
    }, 100);
  }
}
