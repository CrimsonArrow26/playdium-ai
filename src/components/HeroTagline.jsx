import React from 'react';
import TypewriterText from './TypewriterText';
import BlurText from './BlurText';

const HeroTagline = () => {
  const texts = ['Turn concept', 'Transform ideas', 'Create concepts', 'Build visions'];
  
  return (
    <h2 className="reveal-up tw-text-center tw-text-7xl tw-font-semibold tw-uppercase tw-leading-[90px] max-lg:tw-text-4xl max-md:tw-leading-snug">
      <span className="">
        <TypewriterText 
          texts={texts} 
          speed={100} 
          deleteSpeed={50} 
          pauseTime={2000}
        />
      </span>
      <br />
      <BlurText delay={1500} duration={1.5}>
        into quests
      </BlurText>
    </h2>
  );
};

export default HeroTagline;


