import { Component } from '@angular/core';
import { OverviewCardComponent } from './overview-card/overview-card.component';
import { HabitSummaryComponent } from './habit-summary/habit-summary.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    OverviewCardComponent,
    HabitSummaryComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
 
}
