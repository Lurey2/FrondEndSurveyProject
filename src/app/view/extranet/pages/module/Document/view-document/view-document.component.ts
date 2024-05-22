import { Component, OnInit, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerService } from '../../Survey/service/answer.service';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Survey } from '../../Survey/model/survey.model';
import { SurveyService } from '../../Survey/service/survey.service';
import { SurveyViewMainComponent } from '../../Survey/components/survey-view/survey-view-main/survey-view-main.component';
import { finalize } from 'rxjs';
import { Answer } from '../../Survey/model/answer.model';
import { AnswerViewDocumentComponent } from '../answer-view-document/answer-view-document.component';
import { MomentPipe } from '../../../../../../shared/pipe/moment.pipe';

@Component({
  selector: 'view-document',
  standalone: true,
  imports: [CommonModule , MomentPipe , SurveyViewMainComponent , AnswerViewDocumentComponent,  NzIconModule],
  encapsulation : ViewEncapsulation.None,
  templateUrl: './view-document.component.html',
  styleUrl: './view-document.component.scss'
})
export class ViewDocumentComponent implements OnInit {

  router = inject(ActivatedRoute);
  answerService = inject(AnswerService);
  surveyService = inject(SurveyService);

  survey = signal<Survey | null>(null);
  loadingAnswer = signal<boolean>(true);
  loadingDocument = signal<boolean>(true);

  answers = signal<Answer[]>([]);
  indexSelect = signal<number>(-1);

  showAnswer = computed(() => this.indexSelect() > -1  ? this.answers()[this.indexSelect() ]: null)

  ngOnInit(): void {
    this.loadParamUrl();
  }

  loadParamUrl(){
    this.router.paramMap.subscribe({
      next: (param) => {
        console.log(atob(decodeURIComponent(param.get('code')!)))
        const idSurvey = Number( atob(decodeURIComponent(param.get('code')!)));
        if( idSurvey > 0){
          this.loadData(idSurvey);
        }
      }
    })
  }

  loadData(idSurvey : number){
    this.answerService.findByIdSuvey(idSurvey).pipe(finalize(() => this.loadingAnswer.set(false))).subscribe({
      next : (r) => this.answers.set(r)
    })

    this.surveyService.getSurveybyId(idSurvey).pipe(finalize(() => this.loadingDocument.set(false))).subscribe({
      next : (r) => this.survey.set(r),
    })


  }

}
