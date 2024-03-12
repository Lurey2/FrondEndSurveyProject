import { Component } from '@angular/core';
import { SurveyListComponent } from '../survey-list/survey-list.component';

@Component({
  selector: 'app-survey-index',
  standalone: true,
  imports: [ SurveyListComponent],
  templateUrl: './survey-index.component.html',
  styleUrl: './survey-index.component.scss',
})
export class SurveyIndexComponent {}
