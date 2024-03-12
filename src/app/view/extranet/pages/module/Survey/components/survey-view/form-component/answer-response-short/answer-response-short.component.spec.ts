import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerResponseShortComponent } from './answer-response-short.component';

describe('AnswerResponseShortComponent', () => {
  let component: AnswerResponseShortComponent;
  let fixture: ComponentFixture<AnswerResponseShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerResponseShortComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnswerResponseShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
