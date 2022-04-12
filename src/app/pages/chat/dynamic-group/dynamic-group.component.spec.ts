import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicGroupComponent } from './dynamic-group.component';

describe('DynamicGroupComponent', () => {
  let component: DynamicGroupComponent;
  let fixture: ComponentFixture<DynamicGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
