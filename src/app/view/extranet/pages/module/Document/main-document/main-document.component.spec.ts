import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDocumentComponent } from './main-document.component';

describe('MainDocumentComponent', () => {
  let component: MainDocumentComponent;
  let fixture: ComponentFixture<MainDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
