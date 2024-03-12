import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyViewQuestionComponent } from './survey-view-question.component';

describe('SurveyViewQuestionComponent', () => {
  let component: SurveyViewQuestionComponent;
  let fixture: ComponentFixture<SurveyViewQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyViewQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurveyViewQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
