import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRichTextComponent } from './input-rich-text.component';

describe('InputRichTextComponent', () => {
  let component: InputRichTextComponent;
  let fixture: ComponentFixture<InputRichTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputRichTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputRichTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
