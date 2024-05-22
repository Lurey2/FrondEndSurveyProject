import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { ProviderSurveyService } from '../../service/provider-survey.service';
@Component({
  selector: 'list-menu-component',
  standalone: true,
  imports: [NzIconModule , DragDropModule],
  templateUrl: './list-menu-component.component.html',
  styleUrl: './list-menu-component.component.scss'
})
export class ListMenuComponentComponent  {

  provider = inject(ProviderSurveyService);

  @ViewChild('dropClick') element! : ElementRef<any>;


  componenteBasic : { icon : string , label : string , value : string}[] = [
    {
      icon : 'minus',
      label : 'Respuesta simple',
      value : 'respuestaCorta'
    },
    {
      icon : 'menu',
      label : 'Respuesta larga',
      value : 'parrafo'
    },
    {
      icon : 'ordered-list',
      label : 'Seleccion simple',
      value : 'seleccion'
    },
    {
      icon : 'unordered-list',
      label: 'Seleccion Multiple',
      value : 'seleccionMultiple'
    }
]
  onDragStart(event: DragEvent  , value : any ) {
    event.dataTransfer?.setData('component' , value );
  }

  emitComponent(value : any){
    this.provider.messageComponent.next(value);
  }


}
