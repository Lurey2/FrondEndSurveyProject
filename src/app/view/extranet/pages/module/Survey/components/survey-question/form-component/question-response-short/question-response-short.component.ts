import { Component, OnInit, inject, input } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, FormRecord, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Option, OptionForm } from '../../../../model/survey.model';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ComponentArray } from '../../../../interfaces/component-array';

@Component({
  selector: 'question-response-short',
  standalone: true,
  imports: [NzFormModule , FormsModule , NzLayoutModule , NzIconModule ,NzInputModule, ReactiveFormsModule , NzGridModule],
  templateUrl: './question-response-short.component.html',
  styleUrl: './question-response-short.component.scss'
})
export class QuestionResponseShortComponent  implements OnInit, ComponentArray<Option> {


  controlContainer : ControlContainer = inject(ControlContainer);

  form : FormGroup = <FormGroup>this.controlContainer.control;

  get detalleOptions() : FormArray {
    return this.form.get('options') as FormArray;
  }

  ngOnInit(): void {
    this.deleteFormArray();
  }

  deleteFormArray(){
    while(this.detalleOptions.length != 0){
      this.detalleOptions.removeAt(0);
    }
  }

  update(list: Option[]): void {}
}
