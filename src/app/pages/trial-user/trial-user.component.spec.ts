import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialUserComponent } from './trial-user.component';

describe('TrialUserComponent', () => {
  let component: TrialUserComponent;
  let fixture: ComponentFixture<TrialUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrialUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
