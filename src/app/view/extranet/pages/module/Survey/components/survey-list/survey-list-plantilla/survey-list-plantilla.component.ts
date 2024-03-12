import { Component } from '@angular/core';
import { SurveyCardComponent } from '../../survey-card/survey-card.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzListModule } from 'ng-zorro-antd/list';

@Component({
  selector: 'survey-list-plantilla',
  standalone: true,
  imports: [SurveyCardComponent ,NzGridModule  , NzDividerModule, NzListModule ],
  templateUrl: './survey-list-plantilla.component.html',
  styleUrl: './survey-list-plantilla.component.scss'
})
export class SurveyListPlantillaComponent {

}
