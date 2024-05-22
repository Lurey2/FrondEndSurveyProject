import { Injectable } from '@angular/core';
import { GenericService } from '../../../../../../core/Generic/generic.service';
import { Observable, ObservableLike } from 'rxjs';
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

  findByIdSuvey(idSurvey : number) : Observable<Answer[]>{
    return this.generic.all(api).all("findByIdSurvey").all(`${idSurvey}`).get()
  }

  save(answer : Answer) : Observable<Answer>{
    return this.generic.all(api).all("create").post(answer);
  }
}
