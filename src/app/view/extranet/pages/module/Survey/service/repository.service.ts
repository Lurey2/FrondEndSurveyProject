import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface GeneralizeData{
  id : number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class RepositoryService<T extends GeneralizeData> {
  
  constructor(private keStorage : string){
  }
  getAll() : Observable<T[]>{
    // temporal
    const data = localStorage.getItem(this.keStorage);
    let response = null;
    if (data) {
      response = JSON.parse(data);
      return of(response)
    }
    //  end temporal 
    return of([]);
  }

  getSurveybyId(id: number): Observable<T> {
//temporal
      const data = localStorage.getItem(this.keStorage);
      if (data) {
        const list : T[] = JSON.parse(data);
        const dataSurvey = list.find(f => f.id === id);
        if (dataSurvey){
          return of(dataSurvey)
        }
      }
     
      throw('error no existe') 
//end temporal

    /*return this.http
      .get<Survey>(`${this.surveysUrl}find/${id}`)
      .pipe(tap(this.setResource));*/
  }

  save(survey : T) : Observable<any>{
    //temporal
    const data = localStorage.getItem(this.keStorage);
    
    if (data ) {
      if(JSON.parse(data).length > 0){
        const list : T[] = JSON.parse(data);
        survey.id = list[list.length-1].id + 1;
        list.push(survey);
        localStorage.setItem('production',JSON.stringify(list))
        return of({ id : survey.id});
      }
    }
    survey.id = 1;
    console.log('cargo');
    localStorage.setItem('production',JSON.stringify([survey]))
    //end temporal
    return of({ id : survey.id});
  }

  update(survey : T) : Observable<any>{
    //temporal
    if ( survey.id > 0){
      const data = localStorage.getItem(this.keStorage);
      if (data) {
        const list : T[] = JSON.parse(data);
        const index = list.findIndex(f => f.id === survey.id);
        if (index >= 0){
          list[index] = survey;
          localStorage.setItem(this.keStorage,JSON.stringify(list))
          return of(true)
        }
      }
    }
    throw('No existe')
    //end temporal
    //return of(true);
  }

  delete(id : number): Observable<boolean>{
    if ( id > 0){
      const data = localStorage.getItem(this.keStorage);
      if (data ) {
        let list : T[] = JSON.parse(data);
        const index = list.findIndex(f => f.id === id);
        if (index >= 0){
          const newList = list.slice(0, index).concat(list.slice(index+1 , list.length));
          localStorage.setItem(this.keStorage ,JSON.stringify(newList))
          return of(true)
        }
      }
    }
    throw ('error no existe')
  }

  saveStorage(data : T){
    const dataStorage = JSON.stringify(data);
    localStorage.setItem(this.keStorage , dataStorage);
  }

  retrieve(): T{
    const data = localStorage.getItem(this.keStorage);
    let response = null;
    if (data) {
      response = JSON.parse(data);
    }
    return response;
  }

  deleteStorage(){
    localStorage.removeItem(this.keStorage);
  }


}
