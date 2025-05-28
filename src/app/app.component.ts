import { Component, inject } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    FormsModule,
    CommonModule,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  authService = inject(AuthService);
  showNavbar = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const hiddenRouter = ['/login', '/signup'];
        this.showNavbar = !hiddenRouter.includes(event.urlAfterRedirects);
      });
  }

  ngOnInit(): void {
    // Check authentication status on app initialization
    this.authService.checkAuthStatus().subscribe({
      next: (res) => {
        // console.log('Authentication status checked:', res);
      },
      error: (err) => {
        console.error('Error checking authentication status:', err);
      },
    });
  }
}
