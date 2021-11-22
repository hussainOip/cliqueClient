import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresidebarComponent } from './scoresidebar.component';

describe('ScoresidebarComponent', () => {
  let component: ScoresidebarComponent;
  let fixture: ComponentFixture<ScoresidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoresidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
