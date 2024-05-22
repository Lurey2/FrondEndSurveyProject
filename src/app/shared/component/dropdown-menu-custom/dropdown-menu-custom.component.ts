import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostBinding, HostListener, OnInit, TemplateRef, ViewEncapsulation, computed, inject, input, signal } from '@angular/core';

@Component({
  selector: 'dropdown-menu-custom',
  standalone: true,
  imports: [CommonModule],
  encapsulation : ViewEncapsulation.None,
  templateUrl: './dropdown-menu-custom.component.html',
  styleUrl: './dropdown-menu-custom.component.scss'
})
export class DropdownMenuCustomComponent  {

  @HostBinding('tabindex') tabindex = 0;

  elementRef = inject(ElementRef);

  label = input.required<string | TemplateRef<any>>();
  template = computed(() =>
     this.label() instanceof TemplateRef ? this.label() as TemplateRef<any> : null
   )

  @HostListener('click')
  clickHandler() {
    const element = this.elementRef.nativeElement as HTMLElement;
    element.classList.toggle('activeMenuCustom');
  }

  @HostListener('blur')
  blurHandler() {
    const element = this.elementRef.nativeElement as HTMLElement;
    element.classList.remove('activeMenuCustom');
  }

}
