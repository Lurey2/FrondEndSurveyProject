import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, input } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'survey-input',
  standalone: true,
  imports: [NzInputModule , CommonModule],
  templateUrl: './survey-input.component.html',
  styleUrl: './survey-input.component.scss'
})
export class SurveyInputComponent  {

 @Input() ststyle  : { [className : string]  : any}  = {};
 @Input() placeholder : string = '';
 @Input() className : string = '';

}
