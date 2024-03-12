import { Component, input } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'survey-view-header',
  standalone: true,
  imports: [NzDividerModule],
  templateUrl: './survey-view-header.component.html',
  styleUrl: './survey-view-header.component.scss'
})
export class SurveyViewHeaderComponent {
  title = input.required<string>();
  description = input<string>();
}
