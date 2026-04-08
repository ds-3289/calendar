import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDominantColor } from '../../hooks/useDominantColor';

interface VideoPanelProps {
  videoUrl: string;
  onColorExtracted: (color: string) => void;
  isChanging: boolean;
}

export const VideoPanel: React.FC<VideoPanelProps> = ({ 
  videoUrl, 
  onColorExtracted, 
  isChanging 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { dominantColor } = useDominantColor(videoRef.current);

  useEffect(() => {
    if (dominantColor) {
      onColorExtracted(dominantColor);
    }
  }, [dominantColor, onColorExtracted]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={videoUrl}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative h-full w-full overflow-hidden"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Gradient blend overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${dominantColor}40 50%, #faf9f6 100%)`
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};