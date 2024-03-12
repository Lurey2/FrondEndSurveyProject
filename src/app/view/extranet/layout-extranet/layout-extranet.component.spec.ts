import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutExtranetComponent } from './layout-extranet.component';

describe('LayoutExtranetComponent', () => {
  let component: LayoutExtranetComponent;
  let fixture: ComponentFixture<LayoutExtranetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutExtranetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutExtranetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
