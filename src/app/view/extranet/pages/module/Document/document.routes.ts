import { Routes } from "@angular/router";
import { MainDocumentComponent } from "./main-document/main-document.component";
import { ViewDocumentComponent } from "./view-document/view-document.component";
export const routes: Routes = [
  {
    path : '',
    component: MainDocumentComponent
  },
  {
    path : ':code',
    loadComponent :  () => import('./view-document/view-document.component').then(c => c.ViewDocumentComponent)
  }

]

