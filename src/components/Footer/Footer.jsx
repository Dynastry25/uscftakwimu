import React, { useState } from 'react';
import './Footer.css';

import logo from '../assets/USCF LOGO.png'

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { label: 'Nyumbani', path: '/' },
    { label: 'Huduma', path: '/services' },
    { label: 'Kuhusu Sisi', path: '/about' },
    { label: 'Habari', path: '/news' },
    { label: 'Utawala', path: '/administration' },
    { label: 'Changia', path: '/donation' }
  ];

  const services = [
    'Ibada za Kila Wiki',
    'Masomo ya Biblia',
    'Uinjilisti & Umisheni',
    'Kambi ya Maombi',
    'Mahafali',
    'Semina za Kiroho'
  ];

  const contactInfo = {
    address: 'EASTC, Dar es Salaam, Tanzania',
    phone: '+255 755 327 135',
    email: 'uscftakwimu@gmail.com',
    prayerLine: 'Conquer, Establish, Flourish'
  };

  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-content">
            {/* Brand Section */}
            <div className="footer-section brand-section">
              <img 
                src={logo} 
                alt="USCF CCT TAKWIMU" 
                className="footer-logo"
              />
              <p className="footer-description">
                Jumuiya ya Wanafunzi wa Kikristo katika Chuo cha Takwimu Mashariki mwa Afrika. 
                Tunajenga kizazi cha viongozi wa Kikristo wenye imani thabiti.
              </p>
              <div className="social-links">
                <a href="https://whatsapp.com/channel/0029Vb6EC9K7j6g5eKHtvA0D" className="social-link">
                  <i className="ri-whatsapp-fill"></i>
                </a>
                <a href="https://www.instagram.com/uscf_takwimu" className="social-link">
                  <i className="ri-instagram-fill"></i>
                </a>
                <a href="https://youtube.com/@uscfccttakwimu" className="social-link">
                  <i className="ri-youtube-fill"></i>
                </a>
                <a href="https://www.tiktok.com/@uscf_takwimu" className="social-link">
                  <i className="ri-tiktok-fill"></i>
                </a>
                <a href="mailto:uscftakwimu@gmail.com" className="social-link">
                  <i className="ri-mail-fill"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3>Haraka Links</h3>
              <ul className="footer-links">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.path}>
                      <i className="ri-arrow-right-s-line"></i>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="footer-section">
              <h3>Huduma Zetu</h3>
              <ul className="footer-links">
                {services.map((service, index) => (
                  <li key={index}>
                    <a href="/services">
                      <i className="ri-checkbox-circle-line"></i>
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Contact */}
            <div className="footer-section">
              <h3>Wasiliana Nasi</h3>
              <div className="contact-info">
                <div className="contact-item1">
                  <i className="ri-map-pin-2-fill"></i>
                  <span>{contactInfo.address}</span>
                </div>
                <div className="contact-item1">
                  <i className="ri-phone-fill"></i>
                  <span>{contactInfo.phone}</span>
                </div>
                <div className="contact-item1">
                  <i className="ri-mail-fill"></i>
                  <span>{contactInfo.email}</span>
                </div>
                <div className="contact-item1 prayer-line">
                  <i className="ri-prayer-line"></i>
                  <span>Theme: {contactInfo.prayerLine}</span>
                </div>
              </div>

              {/* Newsletter Subscription */}
              <div className="newsletter-section">
                <h4>Jiunge na Mailing List</h4>
                <form onSubmit={handleSubscribe} className="newsletter-form">
                  <div className="input-group">
                    <input
                      type="email"
                      placeholder="Weka barua pepe yako"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button type="submit" disabled={subscribed}>
                      {subscribed ? 'Imesajiliwa!' : 'Jiunge'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; 2025 USCF CCT TAKWIMU. Haki zote zimehifadhiwa.</p>
            </div>
            <div className="footer-bottom-links">
              <a href="/privacy">Sera ya Faragha</a>
              <a href="/terms">Masharti ya Matumizi</a>
              <a href="/sitemap">Ramani ya Tovuti</a>
            </div>
            <div className="developer-credit">
              <p>Imetengenezwa na <strong>USCF IT Department</strong></p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="quick-actions">
        <button className="quick-action prayer-btn">
          <i className="ri-shop-line"></i>
          <span>Duka</span>
        </button>
        <button className="quick-action donate-btn">
          <i className="ri-heart-line"></i>
          <span>Changia</span>
        </button>
        <button className="quick-action contact-btn">
          <i className="ri-customer-service-2-line"></i>
          <span>Wasiliana</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;