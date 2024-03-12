import { Injectable } from '@angular/core';
import { GenericService } from '../../../../../../core/Generic/generic.service';
import { Observable } from 'rxjs';
import { Answer } from '../model/answer.model';
const api = "api/answer"
const tokenKey = "tempSurvey";
@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private generic : GenericService) { }

  getAll() : Observable<Answer[]>{
    return this.generic.all(api).get();
  }

  getSurveybyId(id: number): Observable<Answer> {
    return this.generic.all(api).all(`${id}`).get();
  }

  save(survey : Answer) : Observable<Answer>{
    return this.generic.all(api).all("create").post(survey);
  }
}
