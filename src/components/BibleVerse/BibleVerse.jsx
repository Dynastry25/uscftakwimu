import React, { useState, useEffect } from 'react';
import { bibleVerses } from '../../data/bibleVerses';
import './BibleVerse.css';

const BibleVerse = () => {
  const [verse, setVerse] = useState({ text: '', ref: '', version: 'NENO' });
  const [currentDate, setCurrentDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    updateVerse();
    const interval = setInterval(updateVerse, 24 * 60 * 60 * 1000); // Update daily
    return () => clearInterval(interval);
  }, []);

  const updateVerse = () => {
    setIsLoading(true);
    setFadeIn(false);
    
    setTimeout(() => {
      const today = new Date();
      const dateString = today.toLocaleDateString('sw-TZ', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      setCurrentDate(dateString);
      
      // Get verse based on day of year
      const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
      const index = dayOfYear % bibleVerses.length;
      setVerse(bibleVerses[index]);
      
      setIsLoading(false);
      setFadeIn(true);
    }, 500);
  };

  const shareVerse = async () => {
    const shareText = `"${verse.text}" - ${verse.ref} (${verse.version})\n\nAya ya Leo kutoka USCF CCT TAKWIMU`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Aya ya Leo - USCF CCT TAKWIMU',
          text: shareText,
          url: window.location.href
        });
      } catch (error) {
        console.log('Sharing cancelled');
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    }
  };

  const readAloud = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`${verse.text}. ${verse.ref}`);
      utterance.lang = 'sw-TZ';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (isLoading) {
    return (
      <div className="verse-container">
        <div className="verse-card loading">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <p>Inapakua aya ya leo...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="verse-container">
      <div className={`verse-card ${fadeIn ? 'fade-in' : ''}`}>
        {/* Header */}
        <div className="verse-header">
          <div className="verse-badge">
            <i className="ri-book-open-line"></i>
            Aya ya Leo
          </div>
          <div className="verse-date">{currentDate}</div>
        </div>

        {/* Content */}
        <div className="verse-content">
          <div className="bible-icon">
            <i className="ri-book-3-line"></i>
          </div>
          
          <div className="verse-text-container">
            <p className="verse-text">
              "{isExpanded ? verse.text : verse.text.length > 150 ? verse.text.substring(0, 150) + '...' : verse.text}"
            </p>
            
            {verse.text.length > 150 && (
              <button className="expand-btn" onClick={toggleExpand}>
                {isExpanded ? 'Ficha' : 'Soma Zaidi'} 
                <i className={`ri-arrow-${isExpanded ? 'up' : 'down'}-s-line`}></i>
              </button>
            )}
          </div>

          <div className="verse-reference">
            <span className="ref-text">{verse.ref}</span>
            <span className="version-badge">{verse.version}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="verse-actions">
          <button 
            className={`action-btn share-btn ${isCopied ? 'copied' : ''}`}
            onClick={shareVerse}
            title="Sherehekea aya hii"
          >
            {isCopied ? (
              <>
                <i className="ri-check-line"></i>
                Imenakiliwa!
              </>
            ) : (
              <>
                <i className="ri-share-line"></i>
                Sherehekea
              </>
            )}
          </button>

          <button 
            className="action-btn audio-btn"
            onClick={readAloud}
            title="Sikiliza aya"
          >
            <i className="ri-volume-up-line"></i>
            Sikiliza
          </button>

          <button 
            className="action-btn refresh-btn"
            onClick={updateVerse}
            title="Pata aya mpya"
          >
            <i className="ri-refresh-line"></i>
            Badilisha
          </button>
        </div>

        {/* Footer */}
        <div className="verse-footer">
          <div className="verse-stats">
            <span className="stat">
              <i className="ri-eye-line"></i>
              Aya ya {new Date().getDate()}/{new Date().getMonth() + 1}
            </span>
            <span className="stat">
              <i className="ri-heart-line"></i>
              {bibleVerses.length}+ Aya
            </span>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className verse-decoration>
          <div className="decoration-cross">✝</div>
          <div className="decoration-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BibleVerse;