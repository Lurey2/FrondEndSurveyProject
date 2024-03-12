import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output, input } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'checkbox-custom',
  standalone: true,
  imports: [NzCheckboxModule , CommonModule , FormsModule ,ReactiveFormsModule],
  templateUrl: './checkbox-custom.component.html',
  styleUrl: './checkbox-custom.component.scss'
})
export class CheckboxCustomComponent  implements OnInit, OnDestroy{
 
  @Output() change = new EventEmitter<any>();

  data  = input.required<Array<{ value : any , label : string , checked? : boolean}>>();
  form = new FormGroup({
    array : new FormArray<any>([])
  })

  $destroy = new Subject<void>();

  ngOnInit(): void {
    this.init();
    this.form.valueChanges.pipe(takeUntil(this.$destroy)).subscribe((r) => this.change.emit(r.array));
  }

  get detalleControlChecked() : FormArray<FormGroup<{ value : FormControl<any> , label : FormControl<string> , checked : FormControl<boolean>}>>{
    return this.form.get('array') as FormArray;
  }

  init(){
    this.data().forEach((v) => {
      const group = new FormGroup({
        value :  new FormControl<any>( v.value) , label : new FormControl<any>(v.label)  , checked : new FormControl<any>( v.checked ? v.checked : false) 
      })
      this.detalleControlChecked.push(group);
    })
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
  
}
