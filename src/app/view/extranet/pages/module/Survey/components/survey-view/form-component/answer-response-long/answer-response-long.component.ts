import { Component, input } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutoSizeDirective } from '../../../../directives/auto-size.directive';
import { Question } from '../../../../model/survey.model';

@Component({
  selector: 'answer-response-long',
  standalone: true,
  imports: [NzFormModule ,AutoSizeDirective, FormsModule , ReactiveFormsModule, NzInputModule],
  templateUrl: './answer-response-long.component.html',
  styleUrl: './answer-response-long.component.scss'
})
export class AnswerResponseLongComponent {
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
