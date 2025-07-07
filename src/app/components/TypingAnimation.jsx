"use client"; // This component must be a Client Component

import React, { useState, useEffect } from 'react';

const TypingAnimation = ({ text, speed = 70, pause = 1000, delay = 500 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false); // Controls cursor visibility during typing
  const [cursorVisible, setCursorVisible] = useState(true); // Controls cursor blinking

  useEffect(() => {
    let textIndex = 0;
    let timer;

    const startTyping = () => {
      setIsTyping(true);
      setDisplayedText(''); // Clear text to start fresh
      textIndex = 0; // Reset character index
      clearTimeout(timer); // Clear any existing animation timer
      timer = setTimeout(typeCharacter, delay); // Start typing after an initial delay
    };

    const typeCharacter = () => {
      if (textIndex < text.length) {
        setDisplayedText((prev) => prev + text.charAt(textIndex));
        textIndex++;
        timer = setTimeout(typeCharacter, speed);
      } else {
        setIsTyping(false); // Typing finished
        // If you want the animation to loop indefinitely, uncomment the line below:
        // setTimeout(startTyping, pause);
      }
    };

    // Start the typing animation when the component mounts
    startTyping();

    // Set up the cursor blinking effect
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500); // Toggles visibility every 500ms

    // Clean up timers and intervals when the component unmounts or dependencies change
    return () => {
      clearTimeout(timer);
      clearInterval(cursorInterval);
    };
  }, [text, speed, pause, delay]); // Dependencies for the effect

  return (
    <span className="inline-block"> {/* Ensures the span wraps content and cursor */}
      {displayedText}
      {/* Blinking cursor: visible when typing, otherwise hidden */}
      <span className={`inline-block border-r-2 border-white transition-opacity duration-300 ${cursorVisible && isTyping ? 'opacity-100' : 'opacity-0'}`}>
        &nbsp; {/* Non-breaking space to give the cursor some width */}
      </span>
    </span>
  );
};

export default TypingAnimation;