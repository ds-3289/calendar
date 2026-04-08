import { useState, useCallback } from 'react';
import { monthsData } from '../lib/utils';
import { MonthData, DateRange } from '../types';

export const useCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState<MonthData>(monthsData[5]); // June
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const generateCalendarDays = useCallback((month: MonthData) => {
    const days: (number | null)[] = [];
    const prevMonth = monthsData[month.id === 0 ? 11 : month.id - 1];
    
    // Previous month days
    for (let i = 0; i < month.startWeekday; i++) {
      days.push(prevMonth.days - month.startWeekday + i + 1);
    }
    
    // Current month days
    for (let i = 1; i <= month.days; i++) {
      days.push(i);
    }
    
    // Next month days
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push(i);
    }
    
    return days;
  }, []);

  const changeMonth = useCallback((direction: 'prev' | 'next') => {
    const newId = direction === 'next' 
      ? (currentMonth.id + 1) % 12
      : (currentMonth.id - 1 + 12) % 12;
    setCurrentMonth(monthsData[newId]);
    setDateRange({ start: null, end: null });
  }, [currentMonth]);

  const selectDate = useCallback((date: Date) => {
    if (!dateRange.start || (dateRange.start && dateRange.end)) {
      setDateRange({ start: date, end: null });
    } else if (dateRange.start && !dateRange.end) {
      if (date < dateRange.start) {
        setDateRange({ start: date, end: dateRange.start });
      } else {
        setDateRange({ start: dateRange.start, end: date });
      }
    }
  }, [dateRange]);

  return {
    currentMonth,
    dateRange,
    hoverDate,
    setHoverDate,
    changeMonth,
    selectDate,
    generateCalendarDays,
  };
};