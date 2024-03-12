import { NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Output, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { SurveyService } from '../../service/survey.service';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'survey-card',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage,NzDividerModule,  NzImageModule  , NzCardModule, NzIconModule],
  templateUrl: './survey-card.component.html',
  styleUrl: './survey-card.component.scss',
})
export class SurveyCardComponent {

  @Output('delete') deleteEvent = new EventEmitter<number>();

  isBlank = input<boolean>(false);
  coverUrl = input<string>('assets/jpg/default.jpg');
  title = input<string>('Encuesta en blanco');
  description = input<string>('Crear nueva encuesta desde cero');
  idSurvey = input<number>(0);
  code = input<string | any>(null);

  emitDelete(id : number){
    this.deleteEvent.emit(id);
  }

  encode(code : string){
   return encodeURIComponent(code);
  }
}
