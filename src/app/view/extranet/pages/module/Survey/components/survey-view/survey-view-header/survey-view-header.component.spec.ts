import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyViewHeaderComponent } from './survey-view-header.component';

describe('SurveyViewHeaderComponent', () => {
  let component: SurveyViewHeaderComponent;
  let fixture: ComponentFixture<SurveyViewHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyViewHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurveyViewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
