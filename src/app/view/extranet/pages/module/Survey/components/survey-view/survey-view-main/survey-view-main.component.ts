import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { AbstractControl, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SurveyViewSectionComponent } from '../survey-view-section/survey-view-section.component';
import { SurveyService } from '../../../service/survey.service';
import { Survey } from '../../../model/survey.model';
import { Answer, AnswerForm, AnswerQuestionForm, AnswerSectionForm } from '../../../model/answer.model';
import { detectError } from '../../../../../../../../core/utils/form.utils';
import { DATAINITAL } from '../../../model/data';
import { AnswerService } from '../../../service/answer.service';
import { NotificationService } from '../../../service/notification.service';

@Component({
  selector: 'survey-view-main',
  standalone: true,
  imports: [SurveyViewSectionComponent,NzLayoutModule  , NzIconModule,  NzButtonModule, CommonModule, NzFlexModule , NzStepsModule , FormsModule ,ReactiveFormsModule],
  templateUrl: './survey-view-main.component.html',
  styleUrl: './survey-view-main.component.scss'
})
export class SurveyViewMainComponent implements OnInit {

  surveyService = inject(SurveyService);
  answerService = inject(AnswerService);
  activateRoute = inject(ActivatedRoute);
  notificationService = inject(NotificationService);

  survey = input.required<Survey>();
  disabled = input<boolean>(false);

  currentPage = signal(0);
  loadedStep = signal([0]);

  showSection = computed(() => this.survey().sections[this.currentPage()])

  formAnswer : FormGroup<AnswerForm> = new FormGroup({
    id : new FormControl<number>(0, { nonNullable: true}),
    idSurvey : new FormControl<number>(0, { nonNullable: true}),
    idPerson : new FormControl<number>( 0, { nonNullable: true}),
    answerSections : new FormArray<FormGroup<AnswerSectionForm>>([])
  })

  ngOnInit(): void {
    this.loadData(this.survey());
  }

  get detalleSections() : FormArray<any> {
    return this.formAnswer.get('answerSections') as FormArray;
  }

  getFormGroup(control : AbstractControl) : FormGroup {
    return control as FormGroup;
  }


  step(index : number){
    if (this.detalleSections.controls[this.currentPage()].valid){
      this.currentPage.set(index);
      this.loadStep(index);
    }else {
      detectError(this.detalleSections.controls[this.currentPage()] as FormGroup)
    }
  }

  loadStep(number : number){
    this.loadedStep.update((r) => {
      if (!r.includes(number)) r.push(number);
      return r;
    })
  }

  loadData(survey : Survey){
    this.formAnswer.patchValue({
      id : 0,
      idSurvey : survey.id,
      idPerson : 0
    })

    const detalleSection = this.detalleSections;

    survey.sections.forEach((seccion) => {

      const groupSection = new FormGroup<AnswerSectionForm>({
        id : new FormControl(null ) ,
        idSection : new FormControl<number>(seccion.id! , {nonNullable : true}),
        answerQuestions : new FormArray<FormGroup>([])
      })

      const detallePreguntas = groupSection.get('answerQuestions') as FormArray;

      seccion.questions.forEach((p) => {
        const groupPregunta = new FormGroup<AnswerQuestionForm>({
          id : new FormControl(null) ,
          response : new FormControl(null),
          idQuestion : new FormControl(p.id! , {nonNullable : true}),
          check : new FormControl([]),
          questionType : new FormControl(p.questionType, {nonNullable : true}),
        })
        detallePreguntas.push(groupPregunta);
      });
      detalleSection.push(groupSection);
    });
  }

  save(){
    if ( this.formAnswer.valid){
      const formValue = this.formAnswer.value;
      const data : Answer = {
        idPerson : formValue.idPerson!,
        id : 0,
        answerSections : formValue.answerSections,
        idSurvey : formValue.idSurvey!
      }
      this.answerService.save(data).subscribe({
        next : (r) => {
          this.notificationService.notify(true);
        }
      })

    }else {
      for (let index = 0; index < this.detalleSections.controls.length; index++) {
        const control = this.detalleSections.controls[index];
        if(control.invalid){
          this.step(index);
          detectError(control as FormGroup);
          break;
        }
      }

    }
  }



}
