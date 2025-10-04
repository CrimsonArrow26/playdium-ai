import React from 'react'
import ReactDOM from 'react-dom/client'
import HeroTagline from './components/HeroTagline'

// Function to render the hero tagline component
function initHeroTagline() {
  const heroElement = document.getElementById('hero-tagline');
  if (heroElement) {
    const root = ReactDOM.createRoot(heroElement);
    root.render(<HeroTagline />);
  }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroTagline);
} else {
  initHeroTagline();
}

export { HeroTagline };


