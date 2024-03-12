import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Renderer2, signal } from '@angular/core';

@Component({
  selector: 'section-main-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-main-view.component.html',
  styleUrl: './section-main-view.component.scss'
})
export class SectionMainViewComponent {

  show = signal(false);

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    // Obtén la posición del scroll
    const scrollPosition = window.scrollY;

    // Obtén la posición del componente en el DOM
    const componentPosition = this.el.nativeElement.offsetTop;

    // Verifica si el scroll llega al componente
    if ((window.innerHeight + scrollPosition )  >= componentPosition) {
      // Aquí puedes activar tu evento o realizar alguna acción
      this.show.set(true);
    }
  }
}
