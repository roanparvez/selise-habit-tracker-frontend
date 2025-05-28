import { Component, inject, OnInit } from '@angular/core';
import { HabitService } from '../../../services/habit.service';

@Component({
  selector: 'app-overview-card',
  imports: [],
  templateUrl: './overview-card.component.html',
  styleUrl: './overview-card.component.css',
})

export class OverviewCardComponent implements OnInit {
  habitService = inject(HabitService);
  summary = {
    totalHabits: 0,
    activeHabits: 0,
    longestStreak: 0,
  };

  ngOnInit() {
    this.reloadSummary();

    // ✅ Listen for refresh signal from anywhere
    this.habitService.refreshSummary$.subscribe(() => {
      this.reloadSummary();
    });
  }

  reloadSummary() {
    this.habitService.getHabitSummary().subscribe({
      next: (data) => (this.summary = data),
      error: (err) => console.error('Failed to fetch summary:', err),
    });
  }
}
