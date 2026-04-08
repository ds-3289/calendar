import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Calendar from './components/Calendar/Calendar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;