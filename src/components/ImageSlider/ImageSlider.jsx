import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ImageSlider.css';

const ImageSlider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const handleSlideClick = (slide) => {
    if (slide.onClick) {
      slide.onClick();
    } else if (slide.link && slide.link.startsWith('/')) {
      navigate(slide.link);
    }
  };

  return (
    <div className="image-slider">
      <div className="slider-container">
        <div 
          className="slider-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="slide">
              <div className="slide-image-container">
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="slide-image"
                  loading="lazy"
                />
                <div className="slide-overlay"></div>
              </div>
              
              <div className="slide-content">
                <div className="container">
                  {slide.title && (
                    <h2 className="slide-title">
                      {slide.title}
                    </h2>
                  )}
                  {slide.text && (
                    <p className="slide-text">
                      {slide.text}
                    </p>
                  )}
                  {slide.link && (
                    <div>
                      <button 
                        className="slide-button"
                        onClick={() => handleSlideClick(slide)}
                      >
                        {slide.linkText}
                        <i className="ri-arrow-right-line"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button className="slider-nav prev" onClick={prevSlide}>
          <i className="ri-arrow-left-s-line"></i>
        </button>
        <button className="slider-nav next" onClick={nextSlide}>
          <i className="ri-arrow-right-s-line"></i>
        </button>

        {/* Auto-play Toggle */}
        <button 
          className={`auto-play-toggle ${isAutoPlaying ? 'playing' : 'paused'}`}
          onClick={toggleAutoPlay}
          title={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          <i className={isAutoPlaying ? 'ri-pause-line' : 'ri-play-line'}></i>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="slider-progress">
        <div 
          className="progress-bar"
          style={{ 
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
            animationPlayState: isAutoPlaying ? 'running' : 'paused'
          }}
        ></div>
      </div>

      {/* Dots Navigation */}
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

      {/* Slide Counter */}
      <div className="slide-counter">
        <span className="current">{currentSlide + 1}</span>
        <span className="separator">/</span>
        <span className="total">{slides.length}</span>
      </div>
    </div>
  );
};

export default ImageSlider;