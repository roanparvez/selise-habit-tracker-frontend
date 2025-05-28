import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, map, take } from 'rxjs';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    filter((auth) => auth !== null), // wait until the checkAuthStatus resolves
    take(1),
    map((isLoggedIn) => {
      if (isLoggedIn) {
        return router.parseUrl('/dashboard');
      } else {
        return true;
      }
    })
  );
};
