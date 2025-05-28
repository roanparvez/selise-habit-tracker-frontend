export interface User {
  id: string;
  email: string;
  name: string;
}
export interface Habit {
  _id: string;
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  completedDates: string[];
  user: string;
  createdAt: string;
  updatedAt: string;

  currentStreak: number;
  longestStreak: number;
}

export const HABIT_COLORS = [
  'bg-red-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-orange-500',
  'bg-teal-500',
  'bg-cyan-500',
];
