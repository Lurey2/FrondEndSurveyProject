import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderSurveyService {

  messageComponent = new Subject<any>();

}
