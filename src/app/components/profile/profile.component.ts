import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  userData: any = null;
  errorMessage = '';

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`${environment.apiUrl}/profile`).subscribe({
      next: (response: any) => {
        this.userData = response.user;
      },
      error: (error: any) => {
        console.error('Error fetching user data:', error);
        this.errorMessage = error.error?.message || 'Failed to load user data';
        this.userData = null;
      },
    });
  }

  onLogout(): void {
    this.authService.logout();
  }
}
