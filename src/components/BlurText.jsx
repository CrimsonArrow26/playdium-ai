import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BlurText = ({ children, delay = 2000, duration = 1 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.span
      initial={{ filter: 'blur(10px)', opacity: 0.3 }}
      animate={{
        filter: isVisible ? 'blur(0px)' : 'blur(10px)',
        opacity: isVisible ? 1 : 0.3
      }}
      transition={{
        duration: duration,
        ease: 'easeOut'
      }}
      className="tw-font-light tw-font-serif tw-tracking-wide"
    >
      {children}
    </motion.span>
  );
};

export default BlurText;


