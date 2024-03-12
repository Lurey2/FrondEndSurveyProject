import { Component, } from '@angular/core';

import { SurveyListPlantillaComponent } from './survey-list-plantilla/survey-list-plantilla.component';
import { SurveyListSaveComponent } from './survey-list-save/survey-list-save.component';

@Component({
  selector: 'survey-list',
  standalone: true,
  imports: [SurveyListPlantillaComponent ,SurveyListSaveComponent],
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.scss',
})
export class SurveyListComponent {

}
