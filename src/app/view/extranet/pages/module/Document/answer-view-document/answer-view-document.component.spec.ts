import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerViewDocumentComponent } from './answer-view-document.component';

describe('AnswerViewDocumentComponent', () => {
  let component: AnswerViewDocumentComponent;
  let fixture: ComponentFixture<AnswerViewDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerViewDocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnswerViewDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
