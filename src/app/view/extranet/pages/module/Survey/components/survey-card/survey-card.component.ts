import { NgOptimizedImage, PlatformLocation } from '@angular/common';
import { Component, EventEmitter, Output, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { SurveyService } from '../../service/survey.service';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'survey-card',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage,NzDividerModule,  NzImageModule  , NzCardModule, NzIconModule],
  templateUrl: './survey-card.component.html',
  styleUrl: './survey-card.component.scss',
})
export class SurveyCardComponent {

  platformLocation = inject(PlatformLocation);
  messageService  = inject(NzMessageService);

  @Output('delete') deleteEvent = new EventEmitter<number>();

  isBlank = input<boolean>(false);
  coverUrl = input<string>('assets/jpg/default.jpg');
  title = input<string>('Encuesta en blanco');
  description = input<string>('Crear nueva encuesta desde cero');
  idSurvey = input<number>(0);
  code = input<string | any>(null);
  count = input<number>(0);

  emitDelete(id : number){
    this.deleteEvent.emit(id);
  }

  encode(code : string){
   return encodeURIComponent(code);
  }

  copySharedLink(){
    const urlViewLive = window.origin + this.platformLocation.getBaseHrefFromDOM() + 'survey/view/' + encodeURIComponent(this.code());
    navigator.clipboard.writeText(urlViewLive).then(() => {
      this.messageService.info("URL copiado");
    })
  }
}
