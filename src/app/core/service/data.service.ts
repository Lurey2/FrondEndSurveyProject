import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private authentication : AuthenticationService , private user : UserService) { }


  get authentifications(){
    return this.authentication;
  }

  get users(){
    return this.user;
  }

}
