import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    filter((auth) => auth !== null), // wait until checkAuthStatus completes
    take(1),
    map((isLoggedIn) => {
      if (isLoggedIn) {
        return true;
      } else {
        return router.parseUrl('/login');
      }
    })
  );
};
