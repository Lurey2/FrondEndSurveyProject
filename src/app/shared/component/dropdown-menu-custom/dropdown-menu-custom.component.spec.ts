import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuCustomComponent } from './dropdown-menu-custom.component';

describe('DropdownMenuCustomComponent', () => {
  let component: DropdownMenuCustomComponent;
  let fixture: ComponentFixture<DropdownMenuCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownMenuCustomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdownMenuCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
