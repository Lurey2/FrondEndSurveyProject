import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAutoSize]',
  standalone: true
})
export class AutoSizeDirective {

 

  constructor(
    private element: ElementRef,
  ) {
    element.nativeElement.style.overflow = 'hidden';
    element.nativeElement.style.resize = 'none';
  }

  @HostListener(':input')
  onInput() {
    this.resize();
  }

  ngOnInit() {
    if (this.element.nativeElement.scrollHeight) {
      setTimeout(() => this.resize());
    }
  }

  resize() {
    this.element.nativeElement.style.height = '0';
    const heightSize = this.element.nativeElement.scrollHeight <= 24 ? 24 : this.element.nativeElement.scrollHeight;
    this.element.nativeElement.style.height = heightSize + 'px';
  }
}
