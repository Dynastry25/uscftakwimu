import React, { useState, useEffect } from 'react';
import './GraduationSlider.css';

const GraduationSlider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="graduation-slider">
      <div className="slider-container">
        <div 
          className="slider-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="graduation-slide">
              <img src={slide} alt={`Graduation ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GraduationSlider;