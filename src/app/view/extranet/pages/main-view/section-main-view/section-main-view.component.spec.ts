import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionMainViewComponent } from './section-main-view.component';

describe('SectionMainViewComponent', () => {
  let component: SectionMainViewComponent;
  let fixture: ComponentFixture<SectionMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionMainViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
