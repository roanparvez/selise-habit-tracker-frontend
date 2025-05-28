import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIf],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  showMobileMenu = signal(false);
  authService = inject(AuthService);
  router = inject(Router);

  isAuthenticated = this.authService.isAuthenticated$;
  userEmail: string | null = null;

  constructor() {
    this.authService.checkAuthStatus().subscribe((res: any) => {
      if (res?.user?.email) this.userEmail = res.user.email;
    });
  }

  toggleMenu() {
    this.showMobileMenu.update((prev) => !prev);
  }

  logout() {
    this.authService.logout(); 
    this.showMobileMenu.set(false);
  }
}
