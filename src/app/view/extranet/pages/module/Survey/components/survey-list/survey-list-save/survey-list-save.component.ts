import { Component, OnInit, inject, input, signal } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';
import { SurveyCardComponent } from '../../survey-card/survey-card.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { Survey } from '../../../model/survey.model';
import { SurveyService } from '../../../service/survey.service';
import { BehaviorSubject, finalize } from 'rxjs';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CommonModule } from '@angular/common';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';
import { DataService } from '../../../../../../../../core/service/data.service';
import { SurveyAnswerDTO } from '../../../../../../../../core/models/dto';

@Component({
  selector: 'survey-list-save',
  standalone: true,
  imports: [SurveyCardComponent , RouterLink, NzEmptyModule , NzButtonModule  , CommonModule,NzSpinModule,NzGridModule  , NzDividerModule, NzListModule ],
  templateUrl: './survey-list-save.component.html',
  styleUrl: './survey-list-save.component.scss'
})
export class SurveyListSaveComponent implements OnInit {
  dataService =  inject(DataService);
  surveyService = inject<SurveyService>(SurveyService);

  isLooged = signal<boolean>(this.dataService.authentifications.isLogged());
  loading = signal<boolean>(false);
  surveys = signal<SurveyAnswerDTO[]>([]);

  ngOnInit(): void {
    this.loadSurvey();
  }

  loadSurvey(){
    if(this.isLooged()){
      this.loading.set(true)
      this.surveyService.findByIdUser('' , 0, 12).pipe(finalize(() => this.loading.set(false))).subscribe((r) => {
        this.surveys.set(r.content);
      })
    }
  }

  delete(id : number){
    this.loading.set(true)
    this.surveyService.delete(id).pipe(finalize(() => this.loadSurvey())).subscribe();
  }
}
