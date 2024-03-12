import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyListPlantillaComponent } from './survey-list-plantilla.component';

describe('SurveyListPlantillaComponent', () => {
  let component: SurveyListPlantillaComponent;
  let fixture: ComponentFixture<SurveyListPlantillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyListPlantillaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurveyListPlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
