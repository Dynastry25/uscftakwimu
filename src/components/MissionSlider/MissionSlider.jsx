import React, { useState, useEffect } from 'react';
import './MissionSlider.css';

const MissionSlider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="mission-slider">
      <div className="slider-container">
        <div 
          className="slider-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="mission-slide">
              <div className="slide-image-container">
                <img src={slide.image} alt={slide.title} />
                <div className="slide-overlay"></div>
              </div>
              <div className="slide-content">
                <h4>{slide.title}</h4>
                <p>{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="slider-nav prev" onClick={prevSlide}>
          <i className="ri-arrow-left-s-line"></i>
        </button>
        <button className="slider-nav next" onClick={nextSlide}>
          <i className="ri-arrow-right-s-line"></i>
        </button>
      </div>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          >
            <span></span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MissionSlider;