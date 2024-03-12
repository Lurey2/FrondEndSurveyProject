import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainExtranetComponent } from './main-extranet.component';

describe('MainExtranetComponent', () => {
  let component: MainExtranetComponent;
  let fixture: ComponentFixture<MainExtranetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainExtranetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainExtranetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
