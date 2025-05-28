import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { first, Observable } from 'rxjs';
import { Habit, HabitService } from '../../../services/habit.service';
import { AddHabitButtonComponent } from '../add-habit-button/add-habit-button.component';
import { CreateHabitComponent } from '../create-habit/create-habit.component';

@Component({
  selector: 'app-habit-summary',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AddHabitButtonComponent,
    CreateHabitComponent,
  ],
  templateUrl: './habit-summary.component.html',
})
export class HabitSummaryComponent implements OnInit {
  isModalOpen = false;
  habits$: Observable<Habit[]>;
  selectedHabitForUpdate: Habit | null = null;
  selectedHabitForDelete: Habit | null = null;

  constructor(private habitService: HabitService) {
    this.habits$ = this.habitService.getHabits();
  }

  ngOnInit(): void {
    this.habitService.fetchHabits().pipe(first()).subscribe();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onHabitCreated() {
    this.closeModal();
  }

  isCompleted(habit: Habit): boolean {
    const now = new Date();

    return habit.completedDates.some((dateStr) => {
      const date = new Date(dateStr);

      switch (habit.frequency) {
        case 'daily':
          return date.toDateString() === now.toDateString();
        case 'weekly':
          const currentWeek = this.getWeekNumber(now);
          const habitWeek = this.getWeekNumber(date);
          return (
            currentWeek === habitWeek &&
            date.getFullYear() === now.getFullYear()
          );
        case 'monthly':
          return (
            date.getFullYear() === now.getFullYear() &&
            date.getMonth() === now.getMonth()
          );
        default:
          return false;
      }
    });
  }

  getWeekNumber(date: Date): number {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const millisecsInDay = 86400000;
    return Math.ceil(
      ((date.getTime() - oneJan.getTime()) / millisecsInDay +
        oneJan.getDay() +
        1) /
        7
    );
  }

  markCompleted(id: string) {
    this.habitService.markHabitCompleted(id).subscribe(() => {
      this.habitService.fetchHabits().subscribe();
    });
  }

  onUpdateHabit(habit: Habit) {
    this.selectedHabitForUpdate = { ...habit };
  }

  closeUpdateModal() {
    this.selectedHabitForUpdate = null;
  }

  submitUpdate() {
    if (!this.selectedHabitForUpdate) return;

    this.habitService
      .updateHabit(this.selectedHabitForUpdate._id, {
        title: this.selectedHabitForUpdate.title,
        description: this.selectedHabitForUpdate.description,
        frequency: this.selectedHabitForUpdate.frequency,
      })
      .subscribe(() => {
        this.habitService.fetchHabits().subscribe();
        this.closeUpdateModal();
      });
  }

  onDeleteHabit(habit: Habit) {
    this.selectedHabitForDelete = habit;
  }

  closeDeleteModal() {
    this.selectedHabitForDelete = null;
  }

  confirmDelete() {
    if (!this.selectedHabitForDelete) return;

    this.habitService
      .deleteHabit(this.selectedHabitForDelete._id)
      .subscribe(() => {
        this.habitService.fetchHabits().subscribe();
        this.closeDeleteModal();
      });
  }
}
