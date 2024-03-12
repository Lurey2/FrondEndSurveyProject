import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderExtranetComponent } from './header-extranet.component';

describe('HeaderExtranetComponent', () => {
  let component: HeaderExtranetComponent;
  let fixture: ComponentFixture<HeaderExtranetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderExtranetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderExtranetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
