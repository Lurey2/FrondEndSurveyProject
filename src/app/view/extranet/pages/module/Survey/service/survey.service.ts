import { Injectable, inject } from '@angular/core';
import { Survey } from '../model/survey.model';
import { Observable, concat, of, tap } from 'rxjs';
import { GenericService } from '../../../../../../core/Generic/generic.service';
import { HttpParams } from '@angular/common/http';
import { Page } from '../../../../../../core/models/Page.interface';
const api = "api/survey"
const tokenKey = "tempSurvey";
@Injectable({
  providedIn: 'root'
})
export class SurveyService {


  constructor(private generic : GenericService){

  }



  getAll() : Observable<Survey[]>{
    return this.generic.all(api).get();
  }

  findByIdUser(page : number = 0 , size :number  = 10,order = 'idSurvey' , asc : boolean = false):Observable<Page<Survey>>{
    const params = new HttpParams();
    params.append("page" , page);
    params.append("size" , size);
    params.append("order" , order);
    params.append("asc" , asc);
    return this.generic.all(api).all("findByIdUser").get(params);
  }

  getSurveybyId(id: number): Observable<Survey> {
    return this.generic.all(api).all(`${id}`).get();
  }

  findByCode(code : string):Observable<Survey> {
    return this.generic.all(api).all("findByCode").post(code);
  }

  save(survey : Survey) : Observable<Survey>{
    return this.generic.all(api).all("create").post(survey);
  }

  update(survey : Survey) : Observable<any>{
    if ( survey.id > 0){
      return this.generic.all(api).all("update").all(`${survey.id}`).put(survey);
    }
    throw('No hay id en el dato')
  }

  delete(id : number): Observable<any>{
    return this.generic.all(api).all('delete').all(`${id}`).delete();
  }

  saveStorage(data : Survey){
    const dataStorage = JSON.stringify(data);
    localStorage.setItem(tokenKey , dataStorage);
  }

  retrieve(): Survey{
    const data = localStorage.getItem(tokenKey);
    let response = null;
    if (data) {
      response = JSON.parse(data);
    }
    return response;
  }

  deleteStorage(){
    localStorage.removeItem(tokenKey);
  }



}
