import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HabitService } from '../../../services/habit.service';

@Component({
  selector: 'app-create-habit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-habit.component.html',
  styleUrl: './create-habit.component.css',
})
export class CreateHabitComponent {
  @Output() habitCreated = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  habitForm: FormGroup;
  isSubmitting = false;
  message = '';

  constructor(private fb: FormBuilder, private habitService: HabitService) {
    this.habitForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.maxLength(300)],
      frequency: ['daily', Validators.required],
    });
  }

  onSubmit() {
    if (this.habitForm.invalid) return;

    this.isSubmitting = true;
    this.message = '';

    this.habitService.addHabit(this.habitForm.value).subscribe({
      next: () => {
        this.message = 'Habit created successfully!';
        this.habitForm.reset({ frequency: 'daily' }, { onlySelf: true }); // reset with default
        this.isSubmitting = false;
      },
      error: (err: any) => {
        this.message = err?.error?.message || 'Error creating habit';
        console.error(err);
        this.isSubmitting = false;
      },
    });

    this.habitCreated.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
