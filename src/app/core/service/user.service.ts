import { Injectable } from '@angular/core';
import { GenericService } from '../Generic/generic.service';
import { User } from '../models/User.model';
import { Observable } from 'rxjs';

const api = "api/user"
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private generic : GenericService) { }

  findByEmail(email :String):Observable<User>{
    return this.generic.all(api).all("findByEmail").post(email);
  }
}
