import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-habit-button',
  imports: [CommonModule],
  templateUrl: './add-habit-button.component.html',
  styleUrls: ['./add-habit-button.component.css'],
})
export class AddHabitButtonComponent {
  isAddHabitModalOpen = false;

  openAddHabitModal() {
    this.isAddHabitModalOpen = true;
  }

  closeAddHabitModal() {
    this.isAddHabitModalOpen = false;
  }

  onHabitCreated() {
    this.closeAddHabitModal();
    // Optionally refresh habit list or show toast
  }
}
