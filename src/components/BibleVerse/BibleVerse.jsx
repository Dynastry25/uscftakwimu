import React, { useState, useEffect } from 'react';
import { bibleVerses } from '../../data/bibleVerses';
import logo1 from '../assets/USCF LOGO.png'
import './BibleVerse.css';

const BibleVerse = () => {
  const [verse, setVerse] = useState({ text: '', ref: '', version: 'NENO' });
  const [currentDate, setCurrentDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [logoImage, setLogoImage] = useState(null);

  useEffect(() => {
    updateVerse();
    const interval = setInterval(updateVerse, 24 * 60 * 60 * 1000); // Update daily
    return () => clearInterval(interval);
  }, []);

  // Load logo image on component mount
  useEffect(() => {
    const img = new Image();
    img.onload = () => setLogoImage(img);
    img.src = logo1;
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

  const downloadVerse = () => {
    setIsDownloading(true);
    
    // Create beautiful content for download
    const downloadContent = `

           AYA YA LEO                 
         USCF CCT TAKWIMU             


   "${verse.text}"

    ${verse.ref} (${verse.version})

    ${currentDate}

   "We serve the living God"


    www.uscftakwimu.or.tz               
    #USCFTakwimu #AyaYaLeo            

    `.trim();

    // Create blob and download link
    const blob = new Blob([downloadContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    // Create filename with current date
    const today = new Date();
    const filename = `Aya_Ya_Leo_${today.getDate()}_${today.getMonth() + 1}_${today.getFullYear()}.txt`;
    link.download = filename;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Show success message
    setTimeout(() => {
      setIsDownloading(false);
    }, 500);
  };

const downloadAsImage = () => {
  if (!logoImage) {
    console.error('Logo image not loaded yet');
    return;
  }

  setIsDownloading(true);
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const width = 800;
  const height = 600;
  
  canvas.width = width;
  canvas.height = height;
  
  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#1A202E');
  gradient.addColorStop(1, '#1A202E');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add decorative elements
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.font = 'bold 120px Arial';
  ctx.fillText('✝', 50, 150);
  
  // Draw the logo image with opacity adjustment
  const logoWidth = 80;
  const logoHeight = 80;
  const logoX = width - 200;
  const logoY = height - 100;
  
  // Weka opacity kwa logo (0.8 = 80% visibility)
  ctx.globalAlpha = 0.4;
  ctx.drawImage(logoImage, logoX, logoY, logoWidth, logoHeight);
  // Rudisha opacity kwa kawaida kwa mambo mengine
  ctx.globalAlpha = 1.0;
  
  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('AYA YA LEO', width / 2, 100);
  ctx.font = '20px Arial';
  ctx.fillText('USCF CCT TAKWIMU', width / 2, 130);
  
  // Verse text with word wrap
  ctx.font = 'italic 28px Arial';
  const maxWidth = 600;
  const words = verse.text.split(' ');
  let line = '';
  let y = 250;
  
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && i > 0) {
      ctx.fillText(`"${line}"`, width / 2, y);
      line = words[i] + ' ';
      y += 40;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(`"${line.trim()}"`, width / 2, y);
  
  // Reference and version
  ctx.font = 'bold 24px Arial';
  ctx.fillText(` ${verse.ref}`, width / 2, y + 60);
  
  // Date
  ctx.font = '18px Arial';
  ctx.fillText(currentDate, width / 2, y + 100);
  
  // Footer
  ctx.font = '16px Arial';
  ctx.fillText('"We serve the living God"', width / 2, height - 80);
  ctx.fillText('www.uscftakwimu.or.tz', width / 2, height - 50);
  
  // Convert to image and download
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    const today = new Date();
    const filename = `Aya_Ya_Leo_${today.getDate()}_${today.getMonth() + 1}_${today.getFullYear()}.png`;
    link.download = filename;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setIsDownloading(false);
  }, 'image/png');
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
            title="Share aya hii"
          >
            {isCopied ? (
              <>
                <i className="ri-check-line"></i>
                Imenakiliwa!
              </>
            ) : (
              <>
                <i className="ri-share-line"></i>
                Share
              </>
            )}
          </button>

          <button 
            className={`action-btn download-btn ${isDownloading ? 'downloading' : ''}`}
            onClick={downloadVerse}
            title="Shusha aya hii"
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <i className="ri-loader-4-line spin"></i>
                Inashusha...
              </>
            ) : (
              <>
                <i className="ri-copy-line"></i>
                Copy
              </>
            )}
          </button>

          <button 
            className="action-btn image-download-btn"
            onClick={downloadAsImage}
            title="Shusha aya kama picha"
            disabled={!logoImage || isDownloading}
          >
            {isDownloading ? (
              <>
                <i className="ri-loader-4-line spin"></i>
                Inashusha...
              </>
            ) : (
              <>
                <i className="ri-download-line"></i>
                Picha
              </>
            )}
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
        <div className="verse-decoration">
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