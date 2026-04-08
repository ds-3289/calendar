import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rings } from './components/UI/Rings';
import { VideoPanel } from './components/Calendar/VideoPanel';
import { CalendarGrid } from './components/Calendar/CalendarGrid';
import { NotesSection } from './components/Notes/NotesSection';
import { useCalendar } from './hooks/useCalendar';
import { usePageTearAnimation } from './hooks/usePageTearAnimation';
import { Button } from './components/UI/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function App() {
  const [themeColor, setThemeColor] = useState('#8B7355');
  const { currentMonth, dateRange, hoverDate, changeMonth, selectDate, setHoverDate } = useCalendar();
  const { controls, isAnimating, animatePageTear } = usePageTearAnimation();

  const handleMonthChange = async (direction: 'prev' | 'next') => {
    if (isAnimating) return;
    await animatePageTear();
    changeMonth(direction);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] font-sans">
      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Video Panel - 35% */}
        <div className="w-[35%] fixed left-0 top-0 h-screen">
          <VideoPanel
            videoUrl={currentMonth.videoUrl}
            onColorExtracted={setThemeColor}
            isChanging={isAnimating}
          />
        </div>

        {/* Right Calendar Panel - 65% */}
        <motion.div 
          className="ml-[35%] w-[65%] min-h-screen relative"
          animate={controls}
        >
          <Rings />
          
          <div className="max-w-4xl mx-auto px-12 py-16">
            {/* Month Header */}
            <div className="flex justify-between items-center mb-12">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleMonthChange('prev')}
                className="hover:bg-black/5"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <motion.h1 
                key={currentMonth.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-serif font-light tracking-wide"
                style={{ color: themeColor }}
              >
                {currentMonth.name} {currentMonth.year}
              </motion.h1>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleMonthChange('next')}
                className="hover:bg-black/5"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Calendar Grid */}
            <CalendarGrid
              month={currentMonth}
              dateRange={dateRange}
              hoverDate={hoverDate}
              themeColor={themeColor}
              onDateSelect={selectDate}
              onDateHover={setHoverDate}
            />
          </div>
        </motion.div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="h-[250px] relative">
          <VideoPanel
            videoUrl={currentMonth.videoUrl}
            onColorExtracted={setThemeColor}
            isChanging={isAnimating}
          />
        </div>
        
        <div className="px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <Button variant="ghost" size="sm" onClick={() => handleMonthChange('prev')}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-2xl font-serif" style={{ color: themeColor }}>
              {currentMonth.name} {currentMonth.year}
            </h2>
            <Button variant="ghost" size="sm" onClick={() => handleMonthChange('next')}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          
          <CalendarGrid
            month={currentMonth}
            dateRange={dateRange}
            hoverDate={hoverDate}
            themeColor={themeColor}
            onDateSelect={selectDate}
            onDateHover={setHoverDate}
          />
        </div>
      </div>

      {/* Notes Section - Full Width */}
      <NotesSection themeColor={themeColor} />
    </div>
  );
}

export default App;