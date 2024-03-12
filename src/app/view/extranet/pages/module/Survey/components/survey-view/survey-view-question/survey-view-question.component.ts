import { Component, OnInit, inject, input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { AnswerResponseShortComponent } from '../form-component/answer-response-short/answer-response-short.component';
import { AnswerResponseLongComponent } from '../form-component/answer-response-long/answer-response-long.component';
import { AnswerSelectSimpleComponent } from '../form-component/answer-select-simple/answer-select-simple.component';
import { AnswerSelectMultipleComponent } from '../form-component/answer-select-multiple/answer-select-multiple.component';
import { AbstractControl, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Question } from '../../../model/survey.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'survey-view-question',
  standalone: true,
  imports: [NzCardModule , NzFlexModule ,FormsModule, ReactiveFormsModule, AnswerResponseShortComponent , AnswerResponseLongComponent , AnswerSelectSimpleComponent , AnswerSelectMultipleComponent , CommonModule],
  templateUrl: './survey-view-question.component.html',
  styleUrl: './survey-view-question.component.scss'
})
export class SurveyViewQuestionComponent {


  formGroup = input.required<FormGroup>()
  questionData = input.required<Question>();


  get detalleQuestions() : FormArray{
    return this.formGroup().get('preguntas') as FormArray ;
  }

  getControl(control : AbstractControl ): FormControl {
    return control as FormControl;
  }

}
