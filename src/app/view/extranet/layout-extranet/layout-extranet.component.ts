import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { HeaderExtranetComponent } from './header-extranet/header-extranet.component';
import { FooterExtranetComponent } from './footer-extranet/footer-extranet.component';

@Component({
  selector: 'layout-extranet',
  standalone: true,
  imports: [NzLayoutModule , HeaderExtranetComponent , FooterExtranetComponent]  ,
  templateUrl: './layout-extranet.component.html',
  styleUrl: './layout-extranet.component.scss'
})
export class LayoutExtranetComponent {

}
