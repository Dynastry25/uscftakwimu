import React, { useState } from 'react';
import './LeaderCard.css';

const LeaderCard = ({ leader, isExecutive = false }) => {
  const [showContact, setShowContact] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const toggleContact = () => {
    setShowContact(!showContact);
  };

  const getDepartmentColor = (department) => {
    const colors = {
      executive: '#d32f2f',
      spiritual: '#388e3c',
      academic: '#1976d2',
      mission: '#f57c00',
      finance: '#7b1fa2',
      media: '#0097a7',
      default: '#5d4037'
    };
    return colors[department] || colors.default;
  };

  const getDepartmentIcon = (department) => {
    const icons = {
      executive: 'ri-user-star-fill',
      spiritual: 'ri-prayer-fill',
      academic: 'ri-graduation-cap-fill',
      mission: 'ri-globe-fill',
      finance: 'ri-bank-card-fill',
      media: 'ri-camera-fill',
      default: 'ri-user-fill'
    };
    return icons[department] || icons.default;
  };

  return (
    <div className={`leader-card ${isExecutive ? 'executive' : ''}`}>
      <div className="card-inner">
        {/* Front of Card */}
        <div className="card-front">
          <div className="leader-image-container">
            <div className="image-placeholder" style={{ display: imageLoaded ? 'none' : 'flex' }}>
              <i className="ri-user-line"></i>
            </div>
            {!imageError ? (
              <img 
                src={leader.image} 
                alt={leader.name}
                className={`leader-image ${imageLoaded ? 'loaded' : ''}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            ) : (
              <div className="image-error">
                <i className="ri-user-line"></i>
              </div>
            )}
            
            <div className="leader-overlay">
              <div 
                className="department-badge"
                style={{ backgroundColor: getDepartmentColor(leader.department) }}
              >
                <i className={getDepartmentIcon(leader.department)}></i>
              </div>
              
              {isExecutive && (
                <div className="executive-badge">
                  <i className="ri-star-fill"></i>
                </div>
              )}
            </div>
            
            <button className="contact-toggle" onClick={toggleContact}>
              <i className="ri-contacts-line"></i>
            </button>
          </div>
          
          <div className="leader-info">
            <h3 className="leader-name">{leader.name}</h3>
            <p className="leader-position">{leader.position}</p>
            
            <div className="leader-department">
              <i className="ri-building-line"></i>
              <span>{leader.department ? 
                leader.department === 'executive' ? 'Uongozi Mkuu' :
                leader.department === 'spiritual' ? 'Idara ya Kiroho' :
                leader.department === 'academic' ? 'Idara ya Kielimu' :
                leader.department === 'mission' ? 'Idara ya Umisheni' :
                leader.department === 'finance' ? 'Idara ya Fedha' :
                leader.department === 'media' ? 'Idara ya Media' : 'Idara'
                : 'Jumuiya'}</span>
            </div>
            
            {leader.tenure && (
              <div className="leader-tenure">
                <i className="ri-calendar-line"></i>
                <span>Mwaka: {leader.tenure}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Back of Card (Contact Info) */}
        <div className={`card-back ${showContact ? 'active' : ''}`}>
          <div className="contact-info">
            <h4>Mawasiliano</h4>
            
            {leader.contact && (
              <div className="contact-item">
                <i className="ri-phone-line"></i>
                <div>
                  <span>Simu</span>
                  <a href={`tel:${leader.contact}`}>{leader.contact}</a>
                </div>
              </div>
            )}
            
            {leader.email && (
              <div className="contact-item">
                <i className="ri-mail-line"></i>
                <div>
                  <span>Barua Pepe</span>
                  <a href={`mailto:${leader.email}`}>{leader.email}</a>
                </div>
              </div>
            )}
            
            {leader.office && (
              <div className="contact-item">
                <i className="ri-map-pin-line"></i>
                <div>
                  <span>Ofisi</span>
                  <span>{leader.office}</span>
                </div>
              </div>
            )}
            
            {leader.responsibilities && (
              <div className="responsibilities">
                <h5>Majukumu</h5>
                <ul>
                  {leader.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <button className="close-contact" onClick={toggleContact}>
              <i className="ri-arrow-left-line"></i>
              Rudi Nyuma
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderCard;