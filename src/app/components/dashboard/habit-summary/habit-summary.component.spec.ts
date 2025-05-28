import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitSummaryComponent } from './habit-summary.component';

describe('HabitSummaryComponent', () => {
  let component: HabitSummaryComponent;
  let fixture: ComponentFixture<HabitSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
