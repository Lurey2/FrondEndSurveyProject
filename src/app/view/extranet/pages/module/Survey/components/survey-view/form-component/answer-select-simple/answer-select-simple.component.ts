import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, inject, input } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { Option, Question } from '../../../../model/survey.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'answer-select-simple',
  standalone: true,
  imports: [NzFormModule, NzFlexModule, NzRadioModule, FormsModule , ReactiveFormsModule , CommonModule],
  templateUrl: './answer-select-simple.component.html',
  styleUrl: './answer-select-simple.component.scss'
})
export class AnswerSelectSimpleComponent implements OnInit{

  inputControl = input.required<FormControl>();
  dataOption  = input.required<Question>();
  constructor(){
  }
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
