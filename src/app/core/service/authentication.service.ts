import { Injectable, inject } from '@angular/core';
import { GenericService } from '../Generic/generic.service';
import { SignInUser, SignUpUser } from '../models/User.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const api = "api/v1/auth"
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  router = inject(Router);

  private isLoged = new BehaviorSubject<boolean>(false);

  public $isLoged = this.isLoged.asObservable();

  constructor(private generic : GenericService) {
    if(this.retriveToken()){
      this.isLoged.next(true);
    }
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
    this.isLoged.next(true);
  }

  retriveToken(){
    return localStorage.getItem("token");
  }

  removeToken(){
    localStorage.removeItem("token");
    this.isLoged.next(false);
  }

  isLogged(): boolean{
    return this.isLoged.value;
  }

}
