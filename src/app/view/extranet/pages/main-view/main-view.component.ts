import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SectionMainViewComponent } from './section-main-view/section-main-view.component';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [NzButtonModule , SectionMainViewComponent  , CommonModule , NzIconModule , RouterLink],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent {

  data : { label : string , title : string , icon : string  , borderColor : string , bgColor : string }[] = [
    {
      icon : 'container',
      label : 'Desarrolla encuestas profesionales entrentidas e interactivas.',
      title : 'Encuesta',
      borderColor : 'border-rose-600',
      bgColor : 'bg-rose-300'
    },
    {
      icon : 'file-done',
      title : 'Examenes',
      label : 'Desarrolla examenes que te ayuden a evaluar a las personas.',
      borderColor : 'border-blue-600',
      bgColor : 'bg-blue-300'
    },
    {
      icon : 'form',
      label : 'Crea formulario con el logo de tu empresa.',
      title : 'Formulario',
      borderColor : 'border-orange-600',
      bgColor : 'bg-orange-300'
    },
    {
      icon : 'bar-chart',
      label : 'Obten graficos explicativos que ayuden a interpretar tus resultados de tu encuesta o examen.',
      title : 'Graficos',
      bgColor : 'bg-pink-300',
      borderColor : 'border-pink-600'
    },
    {
      icon : 'file-add',
      label : 'Descarga los resultados de tus encuestas en forma excel. Tambien descarge el formato pdf de tu encuesta.',
      title : 'Documentos',
      bgColor : 'bg-red-300',
      borderColor : 'border-red-600'
    },
    {
      icon : 'audit',
      label : 'Desarrolla de forma complementaria con un equipo compartiendo la autorizacion de tu documentos. ',
      title : 'Desarrolla en equipo',
      bgColor: 'bg-green-300',
      borderColor : 'border-green-600'
    }
  ];
}
