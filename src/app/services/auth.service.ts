import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Reactive state for authentication status
  isAuthenticated$ = new BehaviorSubject<boolean | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    const body = { email, password };
    return this.http.post(`${environment.apiUrl}/auth/register`, body);
  }

  login(email: string, password: string) {
    const body = { email, password };
    return this.http
      .post(`${environment.apiUrl}/auth/login`, body, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.isAuthenticated$.next(true);
        })
      );
  }

  logout() {
    this.http
      .post(`${environment.apiUrl}/auth/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.isAuthenticated$.next(false);
          this.router.navigate(['/login']);
        })
      )
      .subscribe();
  }

  checkAuthStatus() {
    return this.http
      .get<{ isAuthenticated: boolean }>(`${environment.apiUrl}/auth/status`, {
        withCredentials: true,
      })
      .pipe(
        tap(
          (res) => {
            this.isAuthenticated$.next(res.isAuthenticated);
          },
          (error) => {
            this.isAuthenticated$.next(false);
          }
        )
      );
  }

  isAuthenticated() {}
}
