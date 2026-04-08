import { useAnimation } from 'framer-motion';
import { useState } from 'react';

export const usePageTearAnimation = () => {
  const controls = useAnimation();
  const [isAnimating, setIsAnimating] = useState(false);

  const animatePageTear = async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    await controls.start({
      rotateX: [-0, -8, 0],
      scale: [1, 0.98, 1],
      opacity: [1, 0.7, 1],
      transition: { duration: 0.5, ease: "easeInOut" }
    });

    setIsAnimating(false);
  };

  const animateVideoCrossfade = async (newVideo: HTMLVideoElement) => {
    await controls.start({
      opacity: [1, 0, 1],
      transition: { duration: 0.4 }
    });
  };

  return { controls, isAnimating, animatePageTear, animateVideoCrossfade };
};