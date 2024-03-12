import { AfterViewInit, ChangeDetectorRef, Component,  OnInit, QueryList, ViewChildren, inject, input } from '@angular/core';
import { SurveyHeaderComponent } from '../survey-header/survey-header.component';
import { SurveyQuestionComponent } from '../survey-question/survey-question.component';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SurveyInputComponent } from '../survey-input/survey-input.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {  NzInputModule } from 'ng-zorro-antd/input';
import { Question, Section, SectionForm, Survey, SurveyForm } from '../../model/survey.model';
import { ComponentArray } from '../../interfaces/component-array';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AutoSizeDirective } from '../../directives/auto-size.directive';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'survey-section',
  standalone: true,
  imports: [SurveyHeaderComponent ,NzDividerModule , NzCarouselModule , NzBadgeModule , AutoSizeDirective, NzCardModule ,NzButtonModule, NzSpaceModule, SurveyInputComponent , SurveyQuestionComponent , CommonModule , NzFlexModule,NzSelectModule , NzIconModule , NzGridModule ,NzInputModule , FormsModule, ReactiveFormsModule , NzFormModule ],
  templateUrl: './survey-section.component.html',
  styleUrl: './survey-section.component.scss'
})
export class SurveySectionComponent implements OnInit , ComponentArray<Section> {

  @ViewChildren('Question') question!: QueryList<ComponentArray<Question>>;

  fb: FormBuilder = inject(FormBuilder);
  cdr  : ChangeDetectorRef = inject(ChangeDetectorRef);


  surveyForm  = input.required<FormGroup<any>>();



  ngOnInit(): void {
  }


  get detalleSection() : FormArray{
    return this.surveyForm().get('sections') as FormArray<any>;
  }



  getFormGroup(control: AbstractControl) { return control as FormGroup; }

  addDetalleFormGroup() : FormGroup<SectionForm> {
    const group = this.fb.group<SectionForm>({
      id : new FormControl( null),
      description : new FormControl('' , { nonNullable : true }),
      order : new FormControl(0 , {nonNullable : true}),
      title : new FormControl('' , {nonNullable : true , validators : Validators.required} ),
      questions : new FormArray<any>([])
    })
    this.detalleSection.push(group)
    return group;
  }

  add() {
    this.addDetalleFormGroup();
    this.cdr.detectChanges();
    this.question.last.update([{
      id : null,
      description : null,
      options : [],
      order : this.detalleSection.length,
      questionType : 'respuestaCorta',
      required : true,
      title : ''
    }])
  }

  update(list: Section[]): void {
    list.forEach(data => {
      const group = this.addDetalleFormGroup();
      group.patchValue({
        id : data.id,
        description : data.description,
        order : data.order,
        title : data.title
      })
      this.cdr.detectChanges();
      this.question.last.update(data.questions)
    })
  }

  updateOrden(){
    this.detalleSection.controls.forEach((c , i) => {
      c.get('orden')?.setValue(i);
    })
  }


  delete(i : number){
    this.detalleSection.removeAt(i);
    this.updateOrden();
  }
}
