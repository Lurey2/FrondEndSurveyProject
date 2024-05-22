import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, inject, input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';

@Component({
  selector: 'input-rich-text',
  standalone: true,
  imports: [NgxEditorModule , ReactiveFormsModule , FormsModule],
  templateUrl: './input-rich-text.component.html',
  styleUrl: './input-rich-text.component.scss'
})
export class InputRichTextComponent implements OnInit , AfterViewInit {

  rederer = inject(Renderer2);
  el  = inject(ElementRef);

  control = input.required<FormControl>();
  className= input('placeholder-blue-500');
  placeholder = input('');


  ngxElement : any;
  editor: Editor = new Editor();
  toolbar: Toolbar = [
    ['bold', 'italic'], // Aquí defines las opciones que deseas mostrar en el menú flotante
  ];

  constructor(){

  }


  ngOnInit(): void {
    const parentElement =    this.el.nativeElement;
    this.ngxElement=    parentElement.querySelector('.NgxEditor');

    this.rederer.removeClass(this.ngxElement, 'NgxEditor');
    this.rederer.addClass(this.ngxElement, 'NgxEditorCustom');
    if(this.className() != ''){

      this.ngxElement.classList.add(...this.className().split(" "))
    }


  }

  ngAfterViewInit(): void {
    const inputElement = this.ngxElement.firstElementChild;
    this.rederer.listen(inputElement, 'focus', () => {
      this.rederer.addClass(this.ngxElement, 'bg-input-bg-gray');
    });

    this.rederer.listen(inputElement, 'blur', () => {
      this.rederer.removeClass(this.ngxElement, 'bg-input-bg-gray');
    });
  }



}
