import React from 'react';
import { Textarea } from '../ui/textarea';

interface NotesSectionProps {
  themeColor: string;
}

export const NotesSection: React.FC<NotesSectionProps> = ({ themeColor }) => {
  return (
    <div className="w-full border-t border-gray-200/50 relative">
      {/* Ruled lines effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            to bottom,
            rgba(0,0,0,0.05) 0px,
            rgba(0,0,0,0.05) 1px,
            transparent 1px,
            transparent 36px
          )`
        }}
      />
      
      <div className="max-w-4xl mx-auto px-4 lg:px-12 py-8">
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="w-1 h-6 rounded-full"
            style={{ backgroundColor: themeColor }}
          />
          <h3 className="text-sm font-medium text-gray-400 tracking-wider">NOTES</h3>
        </div>
        
        <Textarea
          placeholder="Write your thoughts, memories, or notes here..."
          className="min-h-[120px] bg-transparent border-0 shadow-none resize-none focus-visible:ring-0 text-gray-600 placeholder:text-gray-300 text-base leading-9"
          style={{ fontFamily: "'Inter', monospace" }}
        />
      </div>
    </div>
  );
};