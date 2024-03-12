import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyViewMainComponent } from './survey-view-main.component';

describe('SurveyViewMainComponent', () => {
  let component: SurveyViewMainComponent;
  let fixture: ComponentFixture<SurveyViewMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyViewMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurveyViewMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
