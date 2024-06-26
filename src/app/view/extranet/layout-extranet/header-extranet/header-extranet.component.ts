import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../../core/service/authentication.service';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { debounceTime, filter } from 'rxjs';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { DropdownMenuCustomComponent } from '../../../../shared/component/dropdown-menu-custom/dropdown-menu-custom.component';

@Component({
  selector: 'header-extranet',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [RouterLink , RouterModule , NzMenuModule , NzIconModule , CommonModule , DropdownMenuCustomComponent],
  templateUrl: './header-extranet.component.html',
  styleUrl: './header-extranet.component.scss'
})
export class HeaderExtranetComponent {

  authentificationService = inject(AuthenticationService);
  router = inject(Router);

  isShowScroll = signal(false);

  $userDetail = this.authentificationService.$userDetail;

  constructor(){
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        debounceTime(100)
      ).subscribe((r) => {
        this.isShowScroll.set(false);
        document.body.classList.remove('no-scroll');
      });
  }


  logout(){
    this.authentificationService.logout();
  }

  changeStateScroll(){
    this.isShowScroll.update((state) => !state );
    if(this.isShowScroll()){
      document.body.classList.add('no-scroll');
    }else {
      document.body.classList.remove('no-scroll');
    }
  }



}
