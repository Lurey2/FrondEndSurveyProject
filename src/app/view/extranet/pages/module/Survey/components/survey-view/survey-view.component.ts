import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { SurveyViewSectionComponent } from './survey-view-section/survey-view-section.component';
import { Survey } from '../../model/survey.model';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { AbstractControl, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnswerForm, AnswerQuestionForm, AnswerSection, AnswerSectionForm } from '../../model/answer.model';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SurveyService } from '../../service/survey.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { detectError } from '../../../../../../../core/utils/form.utils';
import { DATAINITAL } from '../../model/data';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { Subject, finalize, takeUntil } from 'rxjs';
import { SurveyViewMainComponent } from './survey-view-main/survey-view-main.component';
import { NotificationService } from '../../service/notification.service';
import { LocalStorageService } from '../../service/local-storage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-survey-view',
  standalone: true,
  imports: [NzSpinModule , SurveyViewMainComponent , RouterLink],
  templateUrl: './survey-view.component.html',
  styleUrl: './survey-view.component.scss'
})
export class SurveyViewComponent  implements OnInit, OnDestroy{


  surveyService = inject(SurveyService);
  activateRoute = inject(ActivatedRoute);
  notificationService = inject(NotificationService);
  localStorageService = inject(LocalStorageService);
  router = inject(Router);

  loading = signal<boolean>(true);
  complete = signal<boolean>(false);
  survey = signal<Survey | null>(null);
  code = signal<string | null>(null);
  error = signal<string>('');


  saveStorage(){
    this.localStorageService.storage(true , "complete-" + this.code());
    this.complete.set(true);
  }

  $destroy = new Subject<void>();

  ngOnInit(): void {
    this.init();

  }


  init(){
    this.activateRoute.params.subscribe((param ) => {
      if (decodeURIComponent(param['code']))  {
        this.code.set(decodeURIComponent(param['code']));
        if ( this.localStorageService.retrieve('complete-' + this.code())){
          this.complete.set(true);
        }else{
          this.surveyService.findByCode(this.code()!).pipe(finalize(() => this.loading.set(false))).subscribe({
            next: (r) => {this.survey.set(r);this.loadNotification();},
            error: (err : HttpErrorResponse) => {this.error.set(err.error)}
          })
        }
      }
    })
  }


  loadNotification(){
    this.notificationService.$change.pipe(takeUntil(this.$destroy)).subscribe({
      next : () => {
        this.complete.set(true);
        this.localStorageService.storage(true , "complete-" + this.code());
      }
    })
  }

  navigateLogin(){
    this.router.navigate(["/signIn" ] , { queryParams : { redirectTo :  this.router.url}})
  }




  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

}
