import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyListSaveComponent } from './survey-list-save.component';

describe('SurveyListSaveComponent', () => {
  let component: SurveyListSaveComponent;
  let fixture: ComponentFixture<SurveyListSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyListSaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurveyListSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
