import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { Question } from '../../../../model/survey.model';
import { CheckboxCustomComponent } from '../../../custom-input/checkbox-custom/checkbox-custom.component';

@Component({
  selector: 'answer-select-multiple',
  standalone: true,
  imports: [NzFormModule, CheckboxCustomComponent , NzFlexModule, NzCheckboxModule, FormsModule , ReactiveFormsModule , CommonModule],
  templateUrl: './answer-select-multiple.component.html',
  styleUrl: './answer-select-multiple.component.scss'
})
export class AnswerSelectMultipleComponent {

  inputControl = input.required<FormControl<number[]>>();
  dataOption  = input.required<Question>();
  datacheckbox = computed(() => this.dataOption().options.map((m, i) => {return {label : m.description , value : m }  }))

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

  changeCheck($event : any[]){
    this.inputControl().setValue($event.filter(f => f.checked).map((m) => { return m.value}))
  }

}
