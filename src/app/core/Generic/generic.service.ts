import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  private url: string;
  constructor(
    private _http: HttpClient,
    private configuration: Configuration
    ) {
    this.url = configuration.api;
  }

  get path() {
    return this.url;
  }

  get http() {
    return this._http;
  }

  one(path: string, id: number): GenericService {
    const restangular = this.clone();
    restangular.url += (path ? '/' + path : '') + '/' + id;
    return restangular;
  }

  all(path: string): GenericService {
    const restangular = this.clone();
    restangular.url = restangular.url + '/' + path;
    return restangular;
  }



  get(queryParams?: HttpParams , headers : HttpHeaders = new HttpHeaders()) {
    return this._http.get(this.url, { params: queryParams , headers : headers }).pipe(
      map((response) => {
        return response as any;
      })
    );
  }

  post(obj?: any, headers : HttpHeaders = new HttpHeaders()){
    return this._http.post(this.url, obj , {headers : headers}).pipe(
      map((response) => {
        return response as any;
      })
    );
  }
  put(obj: any, headers : HttpHeaders = new HttpHeaders()) {
    const clone = Object.assign({}, obj);
    delete clone["_restangular"];
    return this._http.put(this.url, clone,{ headers : headers}).pipe(
      map((response) => {
        return response as any;
      })
    );
  }



  delete(headers : HttpHeaders = new HttpHeaders()) {
    return this._http.delete(this.url , {headers : headers}).pipe(
      map((response) => {
        return response as any;
      })
    );
  }


  clone(): GenericService {
    return new GenericService(this._http, { api : this.url});
  }


}



@Injectable({
  providedIn : 'root'
})
export class Configuration {

  public api = environment.apiUrl;
}
