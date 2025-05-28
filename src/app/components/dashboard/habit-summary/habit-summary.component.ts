import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
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

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onHabitCreated() {
    this.closeModal();
  }

  habits$: Observable<Habit[]>;

  selectedHabitForUpdate: Habit | null = null;
  selectedHabitForDelete: Habit | null = null;

  constructor(private habitService: HabitService) {
    this.habits$ = this.habitService.getHabits();
  }

  ngOnInit(): void {
    this.habitService.fetchHabits().subscribe();
  }

  isCompletedToday(habit: Habit): boolean {
    const today = new Date().toDateString();
    return habit.completedDates.some(
      (date) => new Date(date).toDateString() === today
    );
  }

  markCompleted(id: string) {
    this.habitService.markHabitCompleted(id).subscribe(() => {
      this.habitService.fetchHabits().subscribe();
    });
  }

  // Open update modal
  onUpdateHabit(habit: Habit) {
    this.selectedHabitForUpdate = { ...habit }; // Clone to avoid immediate mutation
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
      })
      .subscribe(() => {
        this.habitService.fetchHabits().subscribe();
        this.closeUpdateModal();
      });
  }

  // Open delete modal
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
