import React, { useState } from 'react';
import './NewsCard.css';

const NewsCard = ({ news }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const getExcerpt = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('sw-TZ', options);
  };

  return (
    <div className="news-card">
      <div className="news-image-container">
        <div className="image-placeholder" style={{ display: imageLoaded ? 'none' : 'flex' }}>
          <i className="ri-image-line"></i>
        </div>
        {!imageError ? (
          <img 
            src={news.image} 
            alt={news.title}
            className={`news-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className="image-error">
            <i className="ri-error-warning-line"></i>
            <span>Picha haipatikani</span>
          </div>
        )}
        <div className="news-overlay">
          <div className="news-badge">{news.category || 'Habari'}</div>
          <div className="news-date">{formatDate(news.date)}</div>
        </div>
        <button className="news-share-btn">
          <i className="ri-share-line"></i>
        </button>
      </div>
      
      <div className="news-content">
        <h3 className="news-title">{news.title}</h3>
        
        <div className="news-meta">
          <span className="news-category-tag">{news.category || 'Jumuiya'}</span>
          <span className="news-read-time">
            <i className="ri-time-line"></i>
            {Math.ceil(news.excerpt.length / 200)} dakika
          </span>
        </div>
        
        <div className={`news-excerpt ${isExpanded ? 'expanded' : ''}`}>
          {isExpanded ? news.excerpt : getExcerpt(news.excerpt)}
        </div>
        
        {news.excerpt.length > 150 && (
          <button 
            className="read-more-btn"
            onClick={toggleExpand}
          >
            {isExpanded ? (
              <>
                <i className="ri-arrow-up-s-line"></i>
                Ficha
              </>
            ) : (
              <>
                <i className="ri-arrow-down-s-line"></i>
                Soma Zaidi
              </>
            )}
          </button>
        )}
        
        <div className="news-actions">
          {news.link && (
            <a href={news.link} className="news-link">
              Soma kamili <i className="ri-arrow-right-line"></i>
            </a>
          )}
          <button className="news-bookmark">
            <i className="ri-bookmark-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;