import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren, effect, inject, input, signal } from '@angular/core';
import { QuestionSelectSimpleComponent } from './form-component/question-select-simple/question-select-simple.component';
import { AbstractControl, ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Question, QuestionForm, tipoPregunta } from '../../model/survey.model';
import { QuestionResponseShortComponent } from './form-component/question-response-short/question-response-short.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { QuestionResponseLongComponent } from './form-component/question-response-long/question-response-long.component';
import { QuestionSelectMultipleComponent } from './form-component/question-select-multiple/question-select-multiple.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ComponentArray } from '../../interfaces/component-array';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { InputRichTextComponent } from '../custom-input/input-rich-text/input-rich-text.component';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { moveRowFormArray } from '../../../../../../../core/utils/form.utils';
import { ProviderSurveyService } from '../../service/provider-survey.service';
import { Subject, takeUntil } from 'rxjs';



@Component({
  selector: 'survey-question',
  standalone: true,
  imports: [ QuestionSelectSimpleComponent , DragDropModule  , InputRichTextComponent, CommonModule  ,NzButtonModule , NzDividerModule  , NzSwitchModule , QuestionSelectMultipleComponent , QuestionResponseLongComponent ,NzCardModule,  QuestionResponseShortComponent , FormsModule , ReactiveFormsModule,NzFlexModule , NzInputModule , NzSelectModule, NzIconModule, NzFormModule],
  templateUrl: './survey-question.component.html',
  styleUrl: './survey-question.component.scss',
})
export class SurveyQuestionComponent implements OnInit , ComponentArray<Question> , OnDestroy {


  @ViewChildren('Option') options!: QueryList<ComponentArray<any>>;
  @ViewChildren('titleQuestion') childrenTitleQuestion!: QueryList<ElementRef>;

  fb : FormBuilder = inject(FormBuilder);
  controlContainer : ControlContainer = inject(ControlContainer);
  cdr  : ChangeDetectorRef = inject(ChangeDetectorRef);
  provider : ProviderSurveyService= inject(ProviderSurveyService);

  sectionForm  = input.required<FormGroup>();
  isFocusSection = input.required<boolean>();

  countQuestionFocus = signal<number>(-1);

  typeMenu = [{ description : 'Respuesta simple' , value : 'respuestaCorta' , icon : 'minus'} , { description : 'Respuesta larga',value : 'parrafo' , icon : 'menu' } , { description : 'Opcion simple' , value : 'seleccion' , icon : 'ordered-list' } , { description : 'Opcion multiple', value : 'seleccionMultiple' , icon : 'unordered-list'  } ];

  destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.provider.messageComponent.pipe(takeUntil(this.destroy$)).subscribe(
      {
        next: (c) => {
          if(this.isFocusSection()){
            this.addIndexType(c);
          }
        }
      }
    )
  }

  get formGroup(): FormGroup<any>{
    const control : FormGroup<any> = this.sectionForm() ? this.sectionForm() : new FormGroup({});
    return control;
  }
  get detalleQuestion() : FormArray{
    return this.sectionForm().get('questions') as FormArray;
  }

  detalleFormArray() : FormGroup<QuestionForm>{
    return this.fb.group<QuestionForm>({
      id : new FormControl(null),
      description :  new FormControl(null),
      questionType : new FormControl('respuestaCorta' , {nonNullable : true}),
      order : new FormControl(0 , {nonNullable : true}),
      required : new FormControl(true , {nonNullable : true}),
      title : new FormControl('' , {nonNullable : true , validators : Validators.required}),
      options : new FormArray<any>([])
    })

  }

  getFormControl(control: AbstractControl , controlName : string) { return control.get(controlName) as FormControl; }
  getFormGroup(control: AbstractControl) { return control as FormGroup; }

  compareType(a : any , b : any){
    return a === b;
  }

  add(): FormGroup<QuestionForm>{
    const group = this.detalleFormArray();
    this.detalleQuestion.push(group);
    return group;
  }

  addIndex(index : number) {
    const group = this.detalleFormArray();
    this.detalleQuestion.insert(index, group);
    this.updateOrden();
    this.cdr.detectChanges();
    this.childrenTitleQuestion.get(index)?.nativeElement.focus();
  }

  addIndexType( type : tipoPregunta, index: number = this.detalleQuestion.length   ){
    const group = this.detalleFormArray();
    group.patchValue({
      questionType : type
    })
    this.detalleQuestion.insert(index, group);
    this.updateOrden();
    this.cdr.detectChanges();
    this.childrenTitleQuestion.get(index)?.nativeElement.focus();
  }

  moveList($event : any){
    const prevIndex : number = $event.previousIndex ;
    const currentIndex : number = $event.currentIndex ;
    moveRowFormArray(this.detalleQuestion , prevIndex , currentIndex);
    this.countQuestionFocus.set(currentIndex);
    this.updateOrden();
  }

  dragOverComponent(element : HTMLDivElement , event : DragEvent){
    event.preventDefault();
    element.classList.add('h-8' , 'border-2' , 'border-dashed' ,  'text-xs' , 'text-text-title-color' , 'flex' , 'items-center' , 'justify-center' )
    element.style.backgroundColor = '#E6E8FA';
    element.style.borderColor= '#BBBDFD';
    element.innerHTML = '<span>Agregar Componente</span>'
  }

  dragLeaveComponent(element : HTMLDivElement){
    element.classList.remove('h-8' , 'border-2' , 'border-dashed' ,  'text-xs' , 'text-text-title-color' , 'flex' , 'items-center' , 'justify-center' )
    element.style.backgroundColor = 'transparent';
    element.style.borderColor= 'inital';
    element.innerHTML = ''
  }

  dragDrop(event : DragEvent , element : HTMLDivElement , index : number ){
    event.preventDefault();
    this.dragLeaveComponent(element)
    const questionType = event.dataTransfer?.getData('component')! as tipoPregunta;
    this.addIndexType( questionType , index ,);
  }


  update(list: Question[]): void {
    list.forEach(data => {
      const group = this.add();
      group.patchValue({
        id : data.id,
        description : data.description,
        order : data.order,
        questionType : data.questionType ,
        required : data.required,
        title : data.title

      })
      this.cdr.detectChanges();
      this.options.last.update(data.options)
    })
  }

  updateOrden(){
    this.detalleQuestion.controls.forEach((c , i) => {
      c.get('orden')?.setValue(i);
    })
  }

  delete(index : number){
    this.detalleQuestion.removeAt(index);
    this.updateOrden()
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }


}
