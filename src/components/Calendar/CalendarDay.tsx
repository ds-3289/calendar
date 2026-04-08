import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CalendarDayProps {
  date: number;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  isHoverPreview: boolean;
  themeColor: string;
  weekday: number;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  isCurrentMonth,
  isSelected,
  isStart,
  isEnd,
  isInRange,
  isHoverPreview,
  themeColor,
  weekday,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const isSunday = weekday === 0;
  
  return (
    <motion.div
      className={cn(
        "flex justify-center items-center py-2 cursor-pointer transition-all duration-200",
        !isCurrentMonth && "opacity-40"
      )}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={cn(
          "relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300",
          (isStart || isEnd) && "text-white shadow-lg",
          isInRange && !isStart && !isEnd && "bg-opacity-20 rounded-none",
          isHoverPreview && !isStart && !isEnd && "bg-opacity-10"
        )}
        style={{
          backgroundColor: (isStart || isEnd) ? themeColor : 
                          (isInRange || isHoverPreview) ? `${themeColor}20` : 'transparent',
          boxShadow: (isStart || isEnd) ? `0 0 20px ${themeColor}` : 'none',
        }}
      >
        <span
          className={cn(
            "text-2xl font-serif font-medium transition-all",
            isSunday && isCurrentMonth && !isStart && !isEnd && "text-red-500",
            (isStart || isEnd) && "text-white"
          )}
        >
          {date}
        </span>
      </div>
    </motion.div>
  );
};