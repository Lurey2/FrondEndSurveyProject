import { Component, OnInit, input } from '@angular/core';
import { Answer } from '../../Survey/model/answer.model';
import { Survey } from '../../Survey/model/survey.model';

@Component({
  selector: 'answer-view-document',
  standalone: true,
  imports: [],
  templateUrl: './answer-view-document.component.html',
  styleUrl: './answer-view-document.component.scss'
})
export class AnswerViewDocumentComponent implements OnInit {
  ngOnInit(): void { console.log(this.answer())
  }

  answer = input.required<Answer>();
  survey = input.required<Survey>();

}
