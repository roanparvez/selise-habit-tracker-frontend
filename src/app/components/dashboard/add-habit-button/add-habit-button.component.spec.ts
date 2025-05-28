import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHabitButtonComponent } from './add-habit-button.component';

describe('AddHabitButtonComponent', () => {
  let component: AddHabitButtonComponent;
  let fixture: ComponentFixture<AddHabitButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHabitButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHabitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
