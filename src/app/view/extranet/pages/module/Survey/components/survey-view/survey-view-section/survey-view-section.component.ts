import { Component, OnInit, input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { SurveyViewHeaderComponent } from '../survey-view-header/survey-view-header.component';
import { SurveyViewQuestionComponent } from '../survey-view-question/survey-view-question.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { Section } from '../../../model/survey.model';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'survey-view-section',
  standalone: true,
  imports: [NzCardModule, SurveyViewHeaderComponent,NzFlexModule, CommonModule, SurveyViewQuestionComponent, NzButtonModule],
  templateUrl: './survey-view-section.component.html',
  styleUrl: './survey-view-section.component.scss'
})
export class SurveyViewSectionComponent  {



  formGroup = input.required<FormGroup>();
  section = input.required<Section>();

  get detallePreguntas() : FormArray{
    return this.formGroup().get('answerQuestions') as FormArray ;
  }

  formGroupControl(control : AbstractControl){
    return control as FormGroup;
  }

}
