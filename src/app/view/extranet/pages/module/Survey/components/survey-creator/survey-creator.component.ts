import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { SurveySectionComponent } from '../survey-section/survey-section.component';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ComponentArray } from '../../interfaces/component-array';
import { Section, SectionForm, Survey, SurveyForm } from '../../model/survey.model';
import {  DATAINITAL } from '../../model/data';
import { Subject, debounceTime, take, takeUntil } from 'rxjs';
import { SurveyService } from '../../service/survey.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { SurveyConfigComponent } from '../survey-config/survey-config.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Location, PlatformLocation } from '@angular/common';
import { NzDividerComponent } from 'ng-zorro-antd/divider';

@Component({
  selector: 'survey-creator',
  standalone: true,
  imports: [NzBreadCrumbModule, NzDrawerModule , SurveyConfigComponent, NzModalModule, RouterLink, NzFlexModule,SurveySectionComponent , NzButtonModule , NzIconModule , NzDividerComponent ,  NzInputModule   , NzFormModule , FormsModule , ReactiveFormsModule],
  templateUrl: './survey-creator.component.html',
  styleUrl: './survey-creator.component.scss',
})
export class SurveyCreatorComponent implements OnInit , OnDestroy{



  @ViewChild('section') sections!: ComponentArray<Section>;

  fb: FormBuilder = inject(FormBuilder);
  activateRoute: ActivatedRoute = inject(ActivatedRoute);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  surveyService : SurveyService = inject(SurveyService);
  modal : NzModalService  = inject(NzModalService);
  router : Router = inject(Router);
  messageService = inject(NzMessageService);
  platformLocation = inject(PlatformLocation);

  sharedLink = signal<{sharedEdit : string , sharedCode : string} | null>(null);
  visibledInitial = false;
  visibled = false;


  formSurvey : FormGroup<SurveyForm> = new FormGroup({
    id : new FormControl(0 , {nonNullable : true}),
    previeImageURL : new FormControl("" , {nonNullable : true}),
    title : new FormControl("" , {validators : [Validators.required]}),
    sections : new FormArray<FormGroup<SectionForm>>([]),
    requiredLogged : new FormControl(false , {nonNullable : true}),
    score :new FormControl(false , {nonNullable : true}),
    showPublic : new FormControl(false , {nonNullable : true}),
    sharedUsers : new FormControl<any>([]),
    showEdit : new FormControl<boolean>(false , {nonNullable : true}),
    repeatForm : new FormControl<boolean>(false , {nonNullable : true}),
  })

  $destroy = new Subject<void>();

  ngOnInit(): void {
    this.initial();
  }

  get f(){
    return this.formSurvey.controls;
  }

  initial(){
    this.activateRoute.params.subscribe((param ) => {
      if (parseInt(param['id']))  {
        const id = parseInt(param['id']);
        const dataStorage = this.surveyService.retrieve();
        if (dataStorage && id === dataStorage?.id){
          this.modal.confirm({
            nzTitle: '<i>¿Desea recuperar los cambios hechos?</i>',
            nzOnOk: () => this.update(dataStorage),
            nzOnCancel : () => {this.surveyService.getSurveybyId(id).subscribe((r) => this.update(r)); this.surveyService.deleteStorage()}
          });
        }else{
          this.surveyService.getSurveybyId(id).subscribe((r) => this.update(r));
        }
      }else{
        const dataStorage = this.surveyService.retrieve();
        if (dataStorage){
          this.modal.confirm({
            nzTitle: '<i>¿Desea recuperar los cambios hechos?</i>',
            nzOnOk: () => this.update(dataStorage),
            nzOnCancel : () => {
              this.visibledInitial = true;
              this.update(DATAINITAL) ;
              this.surveyService.deleteStorage()}
          });


        }else{
          this.visibledInitial = true;
          this.update(DATAINITAL);
        }
      }
    });
    this.insertSaveAutomatic();

  }

  insertSaveAutomatic(){
    setTimeout(() => {
      this.formSurvey.valueChanges.pipe(takeUntil(this.$destroy),debounceTime(1000)).subscribe((s) => {
        const value = this.formSurvey.getRawValue();
        const data :Survey = {
          id : value.id,
          previeImageURL : value.previeImageURL,
          title : value.title! ,
          sections : value.sections,
          requiredLogged : value.requiredLogged!,
          score : value.score!,
          sharedUsers : value.sharedUsers,
          showPublic : value.showPublic!,
          showEdit : value.showEdit!,
          repeatForm : value.repeatForm,
          sharedCode : this.sharedLink()?.sharedCode,
          sharedEdit : this.sharedLink()?.sharedEdit
        }

        this.surveyService.saveStorage(data);
      });
    }, 5000);
  }

  openView(code : string){
    const urlViewLive = this.router.createUrlTree([ this.platformLocation.getBaseHrefFromDOM() + 'survey/view/' + encodeURIComponent(code)]).toString();
    window.open(urlViewLive);
  }

  stateConfig(state : boolean){
    this.visibled = state;
  }

  closedInitialDialog(){
    if(this.f.title.valid){
      this.visibledInitial = false;
    }
  }

  save(){
    if ( this.formSurvey.valid){
      const value = this.formSurvey.getRawValue();
      const data : Survey = {
        id : value.id!,
        previeImageURL : value.previeImageURL!,
        sections : value.sections,
        title : value.title!,
        requiredLogged : value.requiredLogged!,
        score : value.score!,
        repeatForm : value.repeatForm,
        sharedUsers: value.sharedUsers,
        showPublic : value.showPublic!,
        showEdit : value.showEdit!
      }
      if (data.id > 0){
        this.surveyService.update(data).pipe(take(1)).subscribe(() => {
          this.surveyService.deleteStorage();
          this.messageService.success("Actualizado correctamente");
        })
      }else {
        this.surveyService.save(data).pipe(take(1)).subscribe({
          next : (r) => {
            this.formSurvey.patchValue({
              id : r.id
            })
            this.sharedLink.set({
              sharedCode : r.sharedCode! ,
              sharedEdit : r.sharedEdit!
            })
            this.surveyService.deleteStorage();
            this.messageService.success("Guardado correctamente");
          },
          error : (err ) => console.log("error create " ,err)
        })
      }
    }else {
      this.detectValid();
      this.messageService.warning("Hay un error en tu formulario");
    }
  }


  update(data : Survey){
    this.formSurvey.patchValue(data)

    if(this.sharedLink() || data.sharedEdit){
      this.sharedLink.set({
        sharedEdit : data.sharedEdit!,
        sharedCode : data.sharedCode!,
      })
    }

    this.cdr.detectChanges();
    this.sections.update(data.sections);

  }

  delete(){
    if(this.formSurvey.value.id > 0){
      this.surveyService.delete(this.formSurvey.value.id).pipe(take(1)).subscribe(() => {
        this.router.navigate(['/']);
        this.surveyService.deleteStorage();
      })
    }
  }


  detectValid(){
    this.detectError(this.formSurvey)
  }

  detectError(group : FormGroup){
    Object.values(group.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
      if (control instanceof FormArray && control.invalid){
        control.controls.forEach((controlArray) => {
          this.detectError(controlArray as FormGroup)
        })
      }
    });
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }



}
