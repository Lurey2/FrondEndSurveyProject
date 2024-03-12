import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerSelectMultipleComponent } from './answer-select-multiple.component';

describe('AnswerSelectMultipleComponent', () => {
  let component: AnswerSelectMultipleComponent;
  let fixture: ComponentFixture<AnswerSelectMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerSelectMultipleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnswerSelectMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
