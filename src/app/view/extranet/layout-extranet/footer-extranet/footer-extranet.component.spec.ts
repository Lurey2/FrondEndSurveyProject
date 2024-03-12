import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterExtranetComponent } from './footer-extranet.component';

describe('FooterExtranetComponent', () => {
  let component: FooterExtranetComponent;
  let fixture: ComponentFixture<FooterExtranetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterExtranetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterExtranetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
