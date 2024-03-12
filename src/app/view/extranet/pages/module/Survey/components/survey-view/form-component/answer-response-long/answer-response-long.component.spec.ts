import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerResponseLongComponent } from './answer-response-long.component';

describe('AnswerResponseLongComponent', () => {
  let component: AnswerResponseLongComponent;
  let fixture: ComponentFixture<AnswerResponseLongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerResponseLongComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnswerResponseLongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
