import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { SurveyService } from '../../Survey/service/survey.service';
import { SurveyAnswerDTO } from '../../../../../../core/models/dto';
import { Subject, debounce, debounceTime, exhaustMap, filter, finalize, pipe, shareReplay, take, takeUntil } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { Page } from '../../../../../../core/models/Page.interface';

@Component({
  selector: 'app-main-document',
  standalone: true,
  imports: [CommonModule , NzIconModule ,NzPaginationModule , RouterLink , NzSwitchModule , NzButtonModule , ReactiveFormsModule],
  templateUrl: './main-document.component.html',
  styleUrl: './main-document.component.scss'
})
export class MainDocumentComponent  implements OnInit , OnDestroy{

  surveyService = inject(SurveyService);
  route = inject(Router);
  router =  inject(ActivatedRoute);

  pageSurveyAnswer = signal<SurveyAnswerDTO[] >([]);
  loading = signal<boolean>(true);
  pagination = signal<{pageIndex :number ,  size : number , total : number}>( { pageIndex : 1 , size : 10 , total : 0 })

  controlFilter = new FormControl<string>('');

  destroy$ = new Subject<void>();


  ngOnInit(): void {
    this.loadData();
    this.addFilter();
  }

  loadData(filter = '',page : number = 0 , size :number  = 10, asc : boolean = false , order = 'idSurvey'){
    this.loading.set(true);
    this.surveyService.findByIdUser(filter , page, size , asc , order).pipe(finalize(() => this.loading.set(false)) , debounceTime(100)  ).subscribe(
      {
        next: (r) => {
          console.log(4)
          this.pageSurveyAnswer.set(r.content);
          this.pagination.update(() => {
            return {
              pageIndex : r.number + 1,
              size : r.size,
              total : r.totalElements
            };
          })
        }
      }
    )
    console.log(5)
  }

  addFilter(){
    this.controlFilter.valueChanges.pipe(debounceTime(100) , takeUntil(this.destroy$)).subscribe(
      {
        next: (v) => {
          const filterValue = v || '';
          this.loadData(filterValue , this.pagination().pageIndex  - 1  , this.pagination().size);
        }
      }
    )
  }

  pageIndexChange(index : number){
    this.pagination.update(s => {s.pageIndex = index ; return s});
    if(!this.loading()){
      this.loadData(this.controlFilter.value! , this.pagination().pageIndex -1 , this.pagination().size)
    }
  }

  pageSizeChange(size : number){
    this.pagination.update(s => {s.size = size ; return s});
    this.loadData(this.controlFilter.value! , 0, this.pagination().size)
  }

  viewDocument(id : number){
    this.route.navigate(['./' + encodeURIComponent(btoa(`${id}`))] , {relativeTo : this.router })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
