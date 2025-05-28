import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupData = { email: '', password: '' };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup() {
    this.successMessage = '';
    this.errorMessage = '';

    const { email, password } = this.signupData;
    this.authService.signUp(email, password).subscribe({
      next: () => {
        this.successMessage = 'Registration successful! Please login.';

        this.signupData = { email: '', password: '' };
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'Registration failed. Please try again.';
      },
    });
  }
}
