import { Routes } from '@angular/router';
import { SurveyIndexComponent } from './components/survey-index/survey-index.component';
import { SurveyCreatorComponent } from './components/survey-creator/survey-creator.component';
import { SurveyViewComponent } from './components/survey-view/survey-view.component';

export const routes: Routes = [
  {
    path: '',
    component: SurveyIndexComponent,
  },
  {
    path: 'new',
    component: SurveyCreatorComponent,
    title: 'Editor de encuestas',
    data: {
      breadcrumb: 'Nuevo',
    },
  },
  {
    path: 'edit/:id',
    component: SurveyCreatorComponent,
    title: 'Editor de encuestas',
    data: {
      breadcrumb: 'Edicion',
    },
  },
  {
    path: 'view/:code',
    component: SurveyViewComponent,
    title: 'Visor de encuesta',
    data: {
      breadcrumb: 'vista',
    },
  },
];
