Interactive Wall Calendar – React + Vite 


Table of Contents
Overview
Features
Folder Structure
Installation
Usage
Technologies
Design & UI
Future Improvements


Overview

This project is an interactive, visually-rich wall calendar built using React, Vite, Tailwind CSS, and ShadCN UI (Radix).
Each month features a dedicated video background, dynamic dominant color extraction for seamless theme blending, and a floating, responsive calendar UI.

The goal of this project is to translate a physical wall calendar into a polished, responsive web experience while demonstrating advanced frontend engineering skills.

Features

Core Features

Wall Calendar Aesthetic
Mimics a real wall calendar with metal-ring details and a prominent hero video per month.
Video Background per Month
12 vertical videos for each month, integrated as a dynamic background.
Light and Dark theme toggle.
Interactive Date Selection
Users can select a range of dates with clear visual states: start, end, and in-between days.
Notes Section
Minimalist note-taking area with horizontal lines to jot down reminders or attach notes to date ranges.
Smooth Animations
Flutter-style month transition
Polished hover and active states
Responsive Design
Desktop: side-by-side layout with calendar overlay on video
Mobile: stacked layout for touch-friendly interactions
Optional / Creative Features
Classic red & black dates with clean typography
Metal-ring UI elements for a realistic wall calendar feel

Folder Structure

calendar/
├─ public/                   # Static assets (videos, images, backgrounds)
│  ├─ videos/
│  │  ├─ jan.mp4
│  │  ├─ feb.mp4
│  │  └─ ...
│  └─ images/
├─ src/
│  ├─ components/Calendar            # Reusable React components
│  │  ├─ Calendar.tsx
│  │  ├─ Calendar.css
│  ├─ App.tsx
│  └─ main.tsx
├─ tsconfig.json
├─ tsconfig.app.json
├─ vite.config.ts
├─ package.json
└─ README.md

Installation

Clone the repository
git clone https://github.com/yourusername/calendar.git
cd calendar

Install dependencies

npm install
Run the development server
npm run dev

Usage

Open http://localhost:5173 in your browser
Navigate months with the flutter/page-turn animation
Select a date range directly on the calendar
Write notes in the notes section
Mobile users: swipe vertically for month navigation

Technologies
Frontend: React, TypeScript, Vite
UI: Tailwind CSS
Video handling: <video> elements with dynamic overlays
Dynamic theme
Animations: CSS & Tailwind transitions

Design & UI
Videos as hero background: vertical videos positioned on the side
Overlaying dates: large red & black classic typography directly on video
Notes section: horizontal line for minimalistic style
Metal rings: realistic header elements for wall calendar effect

Future Improvements
Add holiday markers and special events
Store notes in localStorage or Firebase
Add theme switching per user preference
Improve video lazy-loading for faster performance
