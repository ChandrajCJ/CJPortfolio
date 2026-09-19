import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const GradientCircularProgressBar = ({ percentage, gradientColors }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;


  const progressControls = useAnimation();
  const textControls = useAnimation();

  


  useEffect(() => {
    const animationConfig = { type: 'easeInOut', duration: 2 };

    progressControls.start({
      strokeDashoffset: [circumference, offset],
      transition: animationConfig,
    });

    textControls.start({
      textContent: `${percentage}%`,
      transition: animationConfig,
    });
  }, [percentage, circumference, offset, progressControls, textControls]);
  return (
    <svg className='h-[110px] w-[110px]' viewBox="0 0 100 100">
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(0)">
          {gradientColors.map((color, index) => (
            <stop key={index} offset={`${(index / (gradientColors.length - 1)) * 100}%`} stopColor={color} />
          ))}
        </linearGradient>
      </defs>
      {/* Trail Path */}
      <circle 
        
        className='shadow-inner shadow-slate-600 '
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        strokeWidth="8"
        stroke="var(--primaryDark)" // Trail color
        strokeLinecap="round" // Round stroke end
      />
      {/* Progress Path */}
      <motion.circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        strokeWidth="8"
        stroke={`url(#gradient)`}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 50 50)" // Start from the top
        strokeLinecap="round" // Round stroke ends
        animate={progressControls}
      />
      {/* Text in the middle */}
      <motion.text className='text-sm font-medium' x="50" y="50" textAnchor="middle" dominantBaseline="middle" fill="#D1D5DB"  animate={textControls}>
        {`${percentage}%`}
      </motion.text>
    </svg>
  );
};

export default GradientCircularProgressBar;
