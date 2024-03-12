import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private changeSubject = new Subject<any>();
  public $change = this.changeSubject.asObservable();

  notify(notication : any){
    this.changeSubject.next(notication);
  }

}
