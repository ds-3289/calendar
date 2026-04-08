import React from 'react';
import { motion } from 'framer-motion';

export const Rings: React.FC = () => {
  return (
    <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 flex gap-8 z-50 pointer-events-none">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="relative"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="w-12 h-14 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full shadow-lg relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/30 to-transparent" />
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-gray-400 rounded-full" />
          </div>
          {/* Punched hole effect */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-[#faf9f6] rounded-full shadow-inner" />
        </motion.div>
      ))}
    </div>
  );
};