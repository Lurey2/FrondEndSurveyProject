import { Routes } from '@angular/router';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { userGuard } from '../../core/guard/user.guard';

export const routes: Routes = [
  {
    path : '',
    component : MainViewComponent
  },
  {
    path : 'survey',
    loadChildren : () => import('./pages/module/Survey/survey.routes').then((s) => s.routes),

  },
  {
    path : 'signIn',
    loadComponent : () => import("./pages/login-user/login-user.component").then((c) => c.LoginUserComponent),
  ///  canActivate : [userGuard],
  },
  {
    path : 'signUp' ,
    loadComponent : () => import("./pages/register-user/register-user.component").then((c) => c.RegisterUserComponent),
  ///  canActivate : [userGuard],
  },
  {
    path : 'dashboard',
    loadChildren: () => import("./pages/module/dashboard/dashboard.routes").then(c => c.routes)
  },
  {
    path : 'document',
    loadChildren : () =>import("./pages/module/Document/document.routes").then(c => c.routes)
  }
];
