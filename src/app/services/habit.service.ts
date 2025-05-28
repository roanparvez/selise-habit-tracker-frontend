import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface Habit {
  _id: string;
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  currentStreak: number;
  longestStreak: number;
  completedDates: Date[];
  user: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class HabitService {
  private habits$ = new BehaviorSubject<Habit[]>([]);
  public refreshSummary$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  fetchHabits(): Observable<Habit[]> {
    const url = `${environment.apiUrl}/habits`;
    return this.http
      .get<{ success: boolean; habits: Habit[] }>(url, {
        withCredentials: true,
      })
      .pipe(
        map((res) => {
          return res.habits;
        }),
        map((habits) => {
          this.habits$.next(habits);
          return habits;
        })
      );
  }

  getHabits(): Observable<Habit[]> {
    return this.habits$.asObservable();
  }

  addHabit(data: {
    title: string;
    description?: string;
    frequency: 'daily' | 'weekly' | 'monthly';
  }): Observable<Habit> {
    const url = `${environment.apiUrl}/habits/new`;
    return this.http.post<Habit>(url, data, { withCredentials: true });
  }

  markHabitCompleted(id: string): Observable<Habit> {
    const url = `${environment.apiUrl}/habits/${id}/complete`;
    return this.http.patch<Habit>(url, {}, { withCredentials: true }).pipe(
      map((habit) => {
        this.refreshSummary$.next(); // ✅ Emit refresh event
        return habit;
      })
    );
  }
  updateHabit(
    id: string,
    data: Partial<{
      title: string;
      description?: string;
      frequency: 'daily' | 'weekly' | 'monthly';
    }>
  ): Observable<Habit> {
    const url = `${environment.apiUrl}/habits/${id}`;
    return this.http.patch<Habit>(url, data, { withCredentials: true }).pipe(
      map((habit) => {
        this.refreshSummary$.next(); // Emit refresh event
        return habit;
      })
    );
  }

  deleteHabit(id: string): Observable<{ message: string }> {
    const url = `${environment.apiUrl}/habits/${id}`;
    return this.http.delete<{ message: string }>(url, {
      withCredentials: true,
    });
  }

  getHabitSummary(): Observable<{
    totalHabits: number;
    activeHabits: number;
    longestStreak: number;
  }> {
    const url = `${environment.apiUrl}/habits/summary`;
    return this.http
      .get<{
        success: boolean;
        summary: {
          totalHabits: number;
          activeHabits: number;
          longestStreak: number;
        };
      }>(url, { withCredentials: true })
      .pipe(map((res) => res.summary));
  }
}
