import { Injectable, inject } from '@angular/core';
import { GenericService } from '../Generic/generic.service';
import { SignInUser, SignUpUser } from '../models/User.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

const api = "api/v1/auth"
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  router = inject(Router);

  private userDetail = new BehaviorSubject<userDetail | null>(null);

  public $userDetail = this.userDetail.asObservable();

  constructor(private generic : GenericService) {
    this.loadStateUser();
   }

  signIn(data : SignInUser){
   return this.generic.all(api).all("signin").post(data);
  }

  signUp(data : SignUpUser){
    return this.generic.all(api).all("signup").post(data);
  }

  logout(){
    this.removeToken();
    this.router.navigate(["/"])
  }


  storageToken(token  : string){
    localStorage.setItem("token" , token);
    this.loadStateUser();
  }

  removeToken(){
    localStorage.removeItem("token");
    this.loadStateUser();
  }

  retriveToken(){
    return localStorage.getItem("token");
  }


  isLogged(): boolean{
    return this.retrieveDecodeToken() ? true : false;
  }

  retrieveDecodeToken() : userDetail | null{
    if(this.retriveToken()){

      return (jwtDecode(this.retriveToken()!)) as userDetail
    }
    return null;
  }

  private loadStateUser(){
    this.userDetail.next(this.retrieveDecodeToken())
  }

}

export interface userDetail {
  exp : number,
  iat : number,
  name : string ,
  sub: string
}
