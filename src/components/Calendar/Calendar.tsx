import React, { useState, useRef, useEffect } from 'react';
import './Calendar.css';

interface CalendarProps {
  year?: number;
}

const Calendar: React.FC<CalendarProps> = ({ year = 2026 }) => {
  const [currentMonth, setCurrentMonth] = useState(0); // 0 = January
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to light mode
  const [noteText, setNoteText] = useState('');
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'forward' | 'backward'>('forward');
  const [selectionMode, setSelectionMode] = useState(false);
  const [startDate, setStartDate] = useState<number | null>(null);
  const [endDate, setEndDate] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthMedia = [
    { type: 'image', src: '/jan-img.jpg' },      // January
    { type: 'video', src: '/july.mp4' },      // February
    { type: 'image', src: '/march-img.jpg' },    // March
    { type: 'video', src: '/april.mp4' },        // April
    { type: 'video', src: '/may.mp4' },          // May
    { type: 'video', src: '/june.mp4' },         // June
    { type: 'image', src: '/feb-img.jpg' },         // July
    { type: 'video', src: '/aug.mp4' },          // August
    { type: 'video', src: '/sept.mp4' },         // September
    { type: 'video', src: '/oct.mp4' },          // October
    { type: 'video', src: '/nov.mp4' },          // November
    { type: 'video', src: '/dec.mp4' }           // December
  ];

  // Change video when month changes
  useEffect(() => {
    if (videoRef.current && monthMedia[currentMonth].type === 'video') {
      videoRef.current.load();
      videoRef.current.play().catch(err => console.log('Autoplay prevented:', err));
    }
  }, [currentMonth]);

  // Handle theme change and background video
  useEffect(() => {
    if (isDarkMode) {
      if (bgVideoRef.current) {
        bgVideoRef.current.pause();
      }
    } else {
      if (bgVideoRef.current) {
        bgVideoRef.current.play().catch(err => console.log('Light background video autoplay prevented:', err));
      }
    }
  }, [isDarkMode]);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (day: number) => {
    if (!selectionMode) return;
    
    if (startDate === null) {
      setStartDate(day);
      setEndDate(null);
    } else if (endDate === null) {
      if (day >= startDate) {
        setEndDate(day);
      } else {
        setStartDate(day);
      }
    } else {
      setStartDate(day);
      setEndDate(null);
    }
  };

  const isDateInRange = (day: number): boolean => {
    if (startDate === null) return false;
    if (endDate === null) return day === startDate;
    return day >= startDate && day <= endDate;
  };

  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    if (selectionMode) {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, year);
    const firstDay = getFirstDayOfMonth(currentMonth, year);
    const days = [];

    // Empty cells for days before the 1st of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, currentMonth, day);
      const isSunday = date.getDay() === 0;
      const inRange = isDateInRange(day);
      
      days.push(
        <div 
          key={day}
          className={`calendar-day ${isSunday ? 'sunday' : 'weekday'} ${inRange ? 'in-range' : ''} ${selectionMode ? 'selectable' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          <span className="date-number">{day}</span>
        </div>
      );
    }

    return days;
  };

  const changeMonth = (direction: number) => {
    setIsFlipping(true);
    setFlipDirection(direction > 0 ? 'forward' : 'backward');
    
    setTimeout(() => {
      let newMonth = currentMonth + direction;
      if (newMonth < 0) newMonth = 11;
      if (newMonth > 11) newMonth = 0;
      setCurrentMonth(newMonth);
      
      setTimeout(() => {
        setIsFlipping(false);
      }, 50);
    }, 400);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={`calendar-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Metal rings at top */}
      <div className="metal-rings">
        <div className="ring ring-left"></div>
        <div className="ring ring-right"></div>
        <div className="ring-bar"></div>
      </div>

      {/* Dark mode solid black background */}
      {isDarkMode && <div className="dark-background"></div>}

      {/* Background Video for Light Theme */}
      {!isDarkMode && (
        <video
          ref={bgVideoRef}
          className="background-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/light-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Main content area */}
      <div className={`main-content ${isFlipping ? `flipping flip-${flipDirection}` : ''}`}>
        {/* Left side - Video/Image */}
        <div className="video-section">
          <div className="video-wrapper">
            {monthMedia[currentMonth].type === 'video' ? (
              <video
                ref={videoRef}
                className="month-video"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={monthMedia[currentMonth].src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={monthMedia[currentMonth].src}
                alt={months[currentMonth]}
                className="month-video"
              />
            )}
          </div>
        </div>

        {/* Right side - Calendar Grid */}
        <div className="calendar-section">
          <div className="calendar-header">
            <div className="month-navigation-group">
              <button 
                onClick={() => changeMonth(-1)} 
                className="month-nav-btn" 
                aria-label="Previous month"
                disabled={isFlipping}
              >
                <span className="nav-arrow">‹</span>
              </button>
              <h2 className="calendar-title">{months[currentMonth]} {year}</h2>
              <button 
                onClick={() => changeMonth(1)} 
                className="month-nav-btn" 
                aria-label="Next month"
                disabled={isFlipping}
              >
                <span className="nav-arrow">›</span>
              </button>
            </div>
            <div className="header-actions">
              <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
          
          <div className="weekdays-grid">
            {weekDays.map(day => (
              <div 
                key={day} 
                className={`weekday-header ${day === 'Sun' ? 'sunday' : ''}`}
              >
                {day}
              </div>
            ))}
          </div>
          
          <div className="calendar-grid-wrapper">
            <div className="calendar-grid">
              {renderCalendar()}
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="notes-section">
        <div className="notes-header">
          <h3 className="notes-title">Notes</h3>
          <button 
            onClick={toggleSelectionMode} 
            className={`range-select-btn ${selectionMode ? 'active' : ''}`}
            title={selectionMode ? 'Cancel selection' : 'Select date range'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
              {startDate && endDate && (
                <>
                  <circle cx="9" cy="15" r="1" fill="currentColor"></circle>
                  <circle cx="15" cy="15" r="1" fill="currentColor"></circle>
                </>
              )}
            </svg>
            <span>Select Range</span>
            {selectionMode && startDate && !endDate && (
              <span className="selection-hint">Select end date</span>
            )}
            {startDate && endDate && (
              <span className="selection-result">{startDate}-{endDate} {months[currentMonth].slice(0, 3)}</span>
            )}
          </button>
        </div>
        <div className="notes-input-wrapper">
          <input
            type="text"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write your notes here..."
            className="notes-input"
          />
          <div className="notes-line"></div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;