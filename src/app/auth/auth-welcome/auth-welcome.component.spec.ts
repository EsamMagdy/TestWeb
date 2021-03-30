import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthWelcomeComponent } from './auth-welcome.component';

describe('AuthWelcomeComponent', () => {
  let component: AuthWelcomeComponent;
  let fixture: ComponentFixture<AuthWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthWelcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
