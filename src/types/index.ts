export interface MonthData {
  id: number;
  name: string;
  year: number;
  days: number;
  startWeekday: number; // 0 = Sunday
  videoUrl: string;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface CalendarDay {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
}