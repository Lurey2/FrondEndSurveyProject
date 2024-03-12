import { Component, OnDestroy, OnInit, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { SurveyForm } from '../../model/survey.model';
import { CommonModule, PlatformLocation } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DataService } from '../../../../../../../core/service/data.service';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { Subject, combineLatest, forkJoin, merge, mergeWith, take, takeUntil } from 'rxjs';
import { User } from '../../../../../../../core/models/User.model';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Router } from '@angular/router';

@Component({
  selector: 'survey-config',
  standalone: true,
  imports: [FormsModule , NzToolTipModule,NzMessageModule,NzSwitchModule,NzIconModule, NzFormModule , CommonModule, NzDividerModule ,  NzInputModule,  ReactiveFormsModule],
  templateUrl: './survey-config.component.html',
  styleUrl: './survey-config.component.scss'
})
export class SurveyConfigComponent implements OnInit , OnDestroy{

  dataService = inject(DataService);
  messageService = inject(NzMessageService);
  platformLocation = inject(PlatformLocation);
  router = inject(Router);

  formSurvey = input.required<FormGroup< SurveyForm>>();
  sharedLink = input.required<{sharedEdit : string , sharedCode : string} | null>();

  message = signal('');
  disabled = signal(false);

  searchControl = new FormControl("" , {validators : Validators.required})

  $destroy = new Subject<void>();


  ngOnInit(): void {
    this.initRequired();
  }

  initRequired(){
    if(this.formSurvey().value.id < 1){
        this.message.set("Guarde el documento antes de usar esta opcion");
        this.disabled.set(true);
    }
  }

  get f(){
    return this.formSurvey().controls;
  }


  searchEmail(){
    if(this.searchControl.valid){
      this.dataService.users.findByEmail(this.searchControl.value!).pipe(take(1)).subscribe({
        next : (r) => {
          this.searchControl.setValue(null) ;
          this.add(r);

        },
        error : () => this.messageService.error("No existe ese email registrado")
      })
    }
  }

  add(user : User){
    const data  = this.f.sharedUsers.value as User[];
    if ( data.some(s => s.id === user.id)){
      this.messageService.info("Usuario ya agreado en la lista");
      return;
    }
    data.push(user);
    this.f.sharedUsers.setValue(data);
  }

  delete(index : number){
    let data  = this.f.sharedUsers.value as User[];
    data = data.filter((_, i) => i !== index);
    this.f.sharedUsers.setValue(data);
  }

  copyRaw(){
    const urlViewLive = window.origin + this.platformLocation.getBaseHrefFromDOM() + 'survey/view/' + encodeURIComponent(this.sharedLink()?.sharedCode!);
    navigator.clipboard.writeText(urlViewLive).then(() => {
      this.messageService.info("URL copiado");
    })
  }


  ngOnDestroy(): void {
      this.$destroy.next();
      this.$destroy.complete();
  }
}
