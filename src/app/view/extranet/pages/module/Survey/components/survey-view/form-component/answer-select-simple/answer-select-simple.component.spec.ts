import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerSelectSimpleComponent } from './answer-select-simple.component';

describe('AnswerSelectSimpleComponent', () => {
  let component: AnswerSelectSimpleComponent;
  let fixture: ComponentFixture<AnswerSelectSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerSelectSimpleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnswerSelectSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
