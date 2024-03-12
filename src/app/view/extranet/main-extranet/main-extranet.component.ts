import { Component } from '@angular/core';
import { LayoutExtranetComponent } from '../layout-extranet/layout-extranet.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-extranet',
  standalone: true,
  imports: [LayoutExtranetComponent , RouterOutlet ],
  templateUrl: './main-extranet.component.html',
  styleUrl: './main-extranet.component.scss'
})
export class MainExtranetComponent {

}
