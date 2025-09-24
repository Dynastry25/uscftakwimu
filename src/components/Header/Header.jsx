import React, { useState, useEffect } from 'react';
import './Header.css';
import USCFBanner from '../assets/USCF CCT TAKWIMU-01.png'

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="text-center py-3">
        <img src={USCFBanner} alt="USCF CCT Takwimu" className="logo" />
      </div>
    </header>
  );
};

export default Header;