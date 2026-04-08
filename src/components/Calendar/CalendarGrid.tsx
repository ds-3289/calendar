import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDay } from './CalendarDay';
import { MonthData, DateRange } from '../../types';

interface CalendarGridProps {
  month: MonthData;
  dateRange: DateRange;
  hoverDate: Date | null;
  themeColor: string;
  onDateSelect: (date: Date) => void;
  onDateHover: (date: Date | null) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  month,
  dateRange,
  hoverDate,
  themeColor,
  onDateSelect,
  onDateHover,
}) => {
  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  const generateDays = () => {
    const days: (Date | null)[] = [];
    const firstDay = new Date(month.year, month.id, 1);
    const startWeekday = firstDay.getDay();
    
    // Previous month
    const prevMonth = new Date(month.year, month.id, 0);
    for (let i = startWeekday - 1; i >= 0; i--) {
      days.push(new Date(month.year, month.id - 1, prevMonth.getDate() - i));
    }
    
    // Current month
    for (let i = 1; i <= month.days; i++) {
      days.push(new Date(month.year, month.id, i));
    }
    
    // Next month
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push(new Date(month.year, month.id + 1, i));
    }
    
    return days;
  };

  const isInRange = (date: Date) => {
    if (!dateRange.start || !dateRange.end) return false;
    return date >= dateRange.start && date <= dateRange.end;
  };

  const isStartOrEnd = (date: Date) => {
    return (dateRange.start && date.getTime() === dateRange.start.getTime()) ||
           (dateRange.end && date.getTime() === dateRange.end.getTime());
  };

  const days = generateDays();

  return (
    <div>
      <div className="grid grid-cols-7 mb-4">
        {weekdays.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-400 tracking-wider">
            {day}
          </div>
        ))}
      </div>
      
      <motion.div 
        className="grid grid-cols-7 gap-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {days.map((date, idx) => {
          if (!date) return <div key={idx} />;
          
          const isCurrentMonth = date.getMonth() === month.id;
          const isHoverPreview = hoverDate && dateRange.start && !dateRange.end &&
            ((date >= dateRange.start && date <= hoverDate) ||
             (date <= dateRange.start && date >= hoverDate));
          
          return (
            <CalendarDay
              key={idx}
              date={date.getDate()}
              isCurrentMonth={isCurrentMonth}
              isSelected={isStartOrEnd(date)}
              isStart={dateRange.start?.getTime() === date.getTime()}
              isEnd={dateRange.end?.getTime() === date.getTime()}
              isInRange={isInRange(date)}
              isHoverPreview={!!isHoverPreview}
              themeColor={themeColor}
              weekday={date.getDay()}
              onClick={() => onDateSelect(date)}
              onMouseEnter={() => onDateHover(date)}
              onMouseLeave={() => onDateHover(null)}
            />
          );
        })}
      </motion.div>
    </div>
  );
};