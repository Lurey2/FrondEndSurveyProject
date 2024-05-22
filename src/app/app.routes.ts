import { Routes } from '@angular/router';
import { MainExtranetComponent } from './view/extranet/main-extranet/main-extranet.component';

export const routes: Routes = [
  {
    path : '',
    component : MainExtranetComponent,
    loadChildren : () => import('./view/extranet/extranet.routes').then(m => m.routes)
  },/*
  {
    path: '**',
    redirectTo : '',
    pathMatch : 'full'
  }*/
];
