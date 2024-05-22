import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMenuComponentComponent } from './list-menu-component.component';

describe('ListMenuComponentComponent', () => {
  let component: ListMenuComponentComponent;
  let fixture: ComponentFixture<ListMenuComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMenuComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListMenuComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
