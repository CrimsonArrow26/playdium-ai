# React Setup for Playdium Tagline Animations

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run start
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Components Created

### 1. TypewriterText Component (`src/components/TypewriterText.jsx`)
- Animates text typing and deleting
- Configurable speed, delete speed, and pause time
- Used for "Turn concept" animation

### 2. BlurText Component (`src/components/BlurText.jsx`)
- Applies blur animation effect using Framer Motion
- Fades in from blurred state to clear text
- Used for "into quests" animation

### 3. HeroTagline Component (`src/components/HeroTagline.jsx`)
- Combines TypewriterText and BlurText components
- Contains multiple text variations for the typewriter effect
- Maintains original styling classes

## Features

- **Typewriter Animation**: Cycles through multiple text variations:
  - "Turn concept"
  - "Transform ideas"
  - "Create concepts" 
  - "Build visions"

- **Blur Animation**: "into quests" text starts blurred and fades in smoothly

- **Responsive Design**: Maintains original Tailwind CSS responsive classes

- **Dark Mode Compatible**: Works with your existing dark mode implementation

## Usage

The React components are integrated into `index-react.html`. The tagline will automatically animate when the page loads. You can customize the animation by modifying:

- Text variations in `HeroTagline.jsx`
- Animation speeds in the component props
- Styling classes in each component

## File Structure

```
src/
├── components/
│   ├── TypewriterText.jsx
│   ├── BlurText.jsx
│   └── HeroTagline.jsx
├── main.jsx
└── ... (other files)

vite.config.js
index-react.html
setup-react.md
```


