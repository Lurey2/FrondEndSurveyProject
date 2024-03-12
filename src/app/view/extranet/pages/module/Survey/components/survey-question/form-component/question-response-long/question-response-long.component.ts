import { Component, inject } from '@angular/core';
import { ControlContainer, FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ComponentArray } from '../../../../interfaces/component-array';
import { Option } from '../../../../model/survey.model';

@Component({
  selector: 'question-response-long',
  standalone: true,
  imports: [NzFormModule , FormsModule , NzLayoutModule , NzIconModule ,NzInputModule, ReactiveFormsModule , NzGridModule],
  templateUrl: './question-response-long.component.html',
  styleUrl: './question-response-long.component.scss'
})
export class QuestionResponseLongComponent implements ComponentArray<Option>{
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
