import { useState, useEffect, useCallback } from 'react';
import Vibrant from 'node-vibrant';

export const useDominantColor = (videoElement: HTMLVideoElement | null) => {
  const [dominantColor, setDominantColor] = useState<string>('#8B7355');
  const [palette, setPalette] = useState<any>(null);

  const extractColor = useCallback(async () => {
    if (!videoElement || videoElement.readyState < 2) return;

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 100;
      canvas.height = 100;
      ctx.drawImage(videoElement, 0, 0, 100, 100);
      
      const vibrant = new Vibrant(canvas);
      const result = await vibrant.getPalette();
      
      if (result.Vibrant) {
        const rgb = result.Vibrant.rgb;
        // Desaturate and soften for UI
        const softened = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.7)`;
        setDominantColor(softened);
        setPalette(result);
      }
    } catch (error) {
      console.warn('Color extraction failed:', error);
    }
  }, [videoElement]);

  useEffect(() => {
    if (!videoElement) return;
    
    const handleTimeUpdate = () => extractColor();
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('loadeddata', extractColor);
    
    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('loadeddata', extractColor);
    };
  }, [videoElement, extractColor]);

  return { dominantColor, palette };
};