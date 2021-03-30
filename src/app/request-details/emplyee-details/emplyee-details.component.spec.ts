import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplyeeDetailsComponent } from './emplyee-details.component';

describe('EmplyeeDetailsComponent', () => {
  let component: EmplyeeDetailsComponent;
  let fixture: ComponentFixture<EmplyeeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmplyeeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmplyeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
