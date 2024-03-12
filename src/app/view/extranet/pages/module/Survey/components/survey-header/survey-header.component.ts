import { Component, ViewEncapsulation } from '@angular/core';
import { SurveyInputComponent } from '../survey-input/survey-input.component';
import { NzDropDownModule, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'survey-header',
  standalone: true,
  imports: [SurveyInputComponent , NzDropDownModule, NzIconModule],
  templateUrl: './survey-header.component.html',
  styleUrl: './survey-header.component.scss'
})
export class SurveyHeaderComponent {

}
