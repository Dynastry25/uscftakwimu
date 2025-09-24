import React, { useState, useEffect } from 'react';
import './FloatingContact.css';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [pulse, setPulse] = useState(false);

  // Ongeza animation ya pulse mara moja tu baada ya kupakia
  useEffect(() => {
    const timer = setTimeout(() => {
      setPulse(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Funga menyu kwa kubonyeka popote nje
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.floating-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // Weka scroll listener kuhimiza ufikiaji
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      if (Math.abs(window.scrollY - lastScrollY) > 50) {
        setIsVisible(window.scrollY < lastScrollY);
        lastScrollY = window.scrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setPulse(false); // Stop pulse animation after first interaction
  };

  return (
    <div className={`floating-container ${isVisible ? 'visible' : 'hidden'}`}>
      <div 
        className={`floating-button ${pulse ? 'pulse' : ''} ${isOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close contact options' : 'Open contact options'}
      >
        {isOpen ? '−' : '+'}
      </div>
      <div className={`element-container ${isOpen ? 'show' : ''}`}>
        <a 
          href="tel:+255755327135" 
          className="float-element tooltip-left"
          aria-label="Call Us"
          onClick={() => setIsOpen(false)}
        >
          <i className="material-icon">
            <i className="ri-phone-fill"></i>
          </i>
          <span className="tooltip">Call Us</span>
        </a>
        <a 
          href="https://wa.me/+255755327135" 
          className="float-element tooltip-left"
          aria-label="WhatsApp"
          onClick={() => setIsOpen(false)}
          target="_blank" 
          rel="noopener noreferrer"
        >
          <i className="material-icon">
            <i className="ri-whatsapp-line"></i>
          </i>
          <span className="tooltip">WhatsApp</span>
        </a>
        <a 
          href="sms:+255755327135?body=Bwana Yesu Asifiwe, Naomba kuuliza au kutoa maoni" 
          className="float-element tooltip-left"
          aria-label="Send SMS"
          onClick={() => setIsOpen(false)}
        >
          <i className="material-icon">
            <i className="ri-message-2-line"></i>
          </i>
          <span className="tooltip">SMS</span>
        </a>
      </div>
    </div>
  );
};

export default FloatingContact;