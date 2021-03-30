import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePickSourceComponent } from './employee-pick-source.component';

describe('EmployeePickSourceComponent', () => {
  let component: EmployeePickSourceComponent;
  let fixture: ComponentFixture<EmployeePickSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePickSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePickSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
