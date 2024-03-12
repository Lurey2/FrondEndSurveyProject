import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyViewSectionComponent } from './survey-view-section.component';

describe('SurveyViewSectionComponent', () => {
  let component: SurveyViewSectionComponent;
  let fixture: ComponentFixture<SurveyViewSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyViewSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurveyViewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
