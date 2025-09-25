import React, { useState, useEffect } from 'react';
import './MissionSlider.css';

const MissionSlider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    
    setTimeout(() => setIsTransitioning(false), 600);
  };

  return (
    <div className="mission-slider">
      <div className="slider-container">
        <div 
          className={`slider-track ${isTransitioning ? 'transitioning' : ''}`}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="mission-slide">
              <div className="slide-image-container">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  loading="lazy"
                />
                <div className="slide-overlay"></div>
              </div>
              <div className="slide-content">
                <div className="content-wrapper">
                  <span className="slide-badge">{slide.title}</span>
                  <p className="slide-subtitle">{slide.subtitle}</p>
                  {slide.buttonText && (
                    <button className="slide-button">
                      {slide.buttonText} <i className="ri-arrow-right-line"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="slider-nav prev" onClick={prevSlide} aria-label="Previous slide">
          <i className="ri-arrow-left-s-line"></i>
        </button>
        <button className="slider-nav next" onClick={nextSlide} aria-label="Next slide">
          <i className="ri-arrow-right-s-line"></i>
        </button>

        <div className="slide-counter">
          <span className="current">{currentSlide + 1}</span>
          <span className="separator">/</span>
          <span className="total">{slides.length}</span>
        </div>
      </div>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span></span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MissionSlider;