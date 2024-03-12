import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren, inject, input } from '@angular/core';
import { SurveyInputComponent } from '../../../survey-input/survey-input.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Option, OptionForm, Question } from '../../../../model/survey.model';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ComponentArray } from '../../../../interfaces/component-array';

@Component({
  selector: 'question-select-multiple',
  standalone: true,
  imports: [NzCheckboxModule, CommonModule ,NzButtonModule , NzIconModule ,SurveyInputComponent , NzToolTipModule, NzGridModule , NzFlexModule , FormsModule , ReactiveFormsModule , NzGridModule, NzFormModule , NzInputModule],
  templateUrl: './question-select-multiple.component.html',
  styleUrl: './question-select-multiple.component.scss'
})
export class QuestionSelectMultipleComponent implements OnInit , ComponentArray<Option>{

  @ViewChildren('inputOption') childrenInput! : QueryList<ElementRef>;

  fb : FormBuilder = inject(FormBuilder);
  controlContainer : ControlContainer = inject(ControlContainer);
  cdr  =inject<ChangeDetectorRef>(ChangeDetectorRef);

  form : FormGroup = <FormGroup>this.controlContainer.control;




  ngOnInit(): void {
  }

  detalleFormArray() : FormGroup<OptionForm>{
    const group =this.fb.group<OptionForm>({
      id : new FormControl(null),
      order : new FormControl(this.detalleOptions.length , {nonNullable : true}),
      description : new FormControl('', {nonNullable : true}),
      correct : new FormControl(false, {nonNullable : true}),
    });

    this.detalleOptions.push(group);
    return group;
  }


  get detalleOptions() : FormArray {
    return this.form.get('options') as FormArray;
  }

  add(){
    this.detalleFormArray();
    this.cdr.detectChanges();
    this.childrenInput.last.nativeElement.focus();
  }



  delete(index : number){
    this.detalleOptions.removeAt(index);
  }

  update(list: Option[]): void {
    list.forEach((l) => {
      const group = this.detalleFormArray();
      group.patchValue({
        id : l.id,
        description : l.description ,
        correct : l.correct,
        order : l.order
      })
    })
  }

}
