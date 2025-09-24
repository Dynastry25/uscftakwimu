import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import NewsCard from '../components/NewsCard/NewsCard';
import FloatingContact from '../components/FloatingContact/FloatingContact';
import { newsData } from '../data/newsData';
import './CSS/News.css';

const News = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['all', 'events', 'missions', 'graduation', 'prayer', 'announcements'];

  const filteredNews = newsData.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filter === 'all' || news.category === filter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="news-page">
      <Header />
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <div className="news-hero">
          <div className="container">
            <div className="hero-content">
              <h1>Habari na Matukio</h1>
              <p>Karibu kupata habari zilizopo na zilizopita za USCF CCT TAKWIMU</p>
              <div className="hero-search">
                <div className="search-box">
                  <i className="ri-search-line"></i>
                  <input
                    type="text"
                    placeholder="Tafuta habari..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {/* Filter Section */}
          <div className="news-filter-section">
            <div className="filter-tabs">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-tab ${filter === category ? 'active' : ''}`}
                  onClick={() => setFilter(category)}
                >
                  {category === 'all' ? 'Zote' : 
                   category === 'events' ? 'Matukio' :
                   category === 'missions' ? 'Misheni' :
                   category === 'graduation' ? 'Mahafali' :
                   category === 'prayer' ? 'Maombi' : 'Matangazo'}
                </button>
              ))}
            </div>
          </div>

          {/* News Count */}
          <div className="news-count">
            <p>Habari zilizopatikana: <strong>{filteredNews.length}</strong></p>
          </div>

          {/* News Grid */}
          <div className="news-section">
            <div className="news-grid">
              {filteredNews.map((news, index) => (
                <NewsCard key={index} news={news} />
              ))}
            </div>

            {filteredNews.length === 0 && (
              <div className="no-news-found">
                <i className="ri-search-eye-line"></i>
                <h3>Hakuna habari zilizopatikana</h3>
                <p>Badilisha kichujio au neno linalotafutwa</p>
              </div>
            )}
          </div>

          {/* Additional News Section */}
          <section className="featured-news-section">
            <div className="section-header">
              <h2 className="section-title">Habari Mpya Zaidi</h2>
              <div className="section-divider"></div>
            </div>
            
            <div className="featured-news-grid">
              {/* Mahafali */}
              <div className="featured-news-card large-card">
                <div className="news-image-container">
                  <img src="/src/components/assets/gradu4.jpg" alt="Mahafali" className="news-img" />
                  <div className="news-badge">Matukio</div>
                </div>
                <div className="news-content">
                  <span className="news-date">June 14, 2025</span>
                  <h3 className="news-title">MAHAFALI YA 4 YA USCF CCT TAKWIMU</h3>
                  <p className="news-excerpt">
                    Uongozi wa USCF CCT TAKWIMU unapenda kuwataarifu watu wote rasmi mahafali ya awamu ya 4 (2024/2025) 
                    yatakayofanyika mnamo tarehe 14 June 2025, AICT CHANGANYIKENI kuanzia saa 3 Asubuhi mpaka saa 9 Mchana...
                  </p>
                  <div className="news-meta">
                    <span className="news-category">Mahafali</span>
                    <button className="read-more-btn">Soma Zaidi</button>
                  </div>
                </div>
              </div>

              {/* Night to Seat at Lord's Feet */}
              <div className="featured-news-card">
                <div className="news-image-container">
                  <img src="/src/components/assets/mabibo.jpg" alt="The Night to Seat at Lord's Feet" className="news-img" />
                  <div className="news-badge">Ibada</div>
                </div>
                <div className="news-content">
                  <span className="news-date">May 23, 2025</span>
                  <h3 className="news-title">THE NIGHT TO SEAT AT LORD'S FEET</h3>
                  <p className="news-excerpt">
                    USCF Mabibo UDSM kupitia Wailing Ladies Ministry inakuletea usiku wa pekee wa ibada na maombi...
                  </p>
                  <div className="news-meta">
                    <span className="news-category">Maombi</span>
                    <button className="read-more-btn">Soma Zaidi</button>
                  </div>
                </div>
              </div>

              {/* Lift Your Voice to Jesus */}
              <div className="featured-news-card">
                <div className="news-image-container">
                  <img src="/src/components/assets/lift.jpg" alt="Lift Your Voice to Jesus" className="news-img" />
                  <div className="news-badge">Mkesha</div>
                </div>
                <div className="news-content">
                  <span className="news-date">May 30, 2025</span>
                  <h3 className="news-title">LIFT YOUR VOICE TO JESUS SEASON 1</h3>
                  <p className="news-excerpt">
                    Lift Your Voice to Jesus ni Mkesha wa Kusifu na Kuabudu. Karibu kwenye mkesha wa kipekee...
                  </p>
                  <div className="news-meta">
                    <span className="news-category">Sifa</span>
                    <button className="read-more-btn">Soma Zaidi</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Documents Section */}
          <div className="documents-section">
            <div className="section-header">
              <h2>Miongozo na Nyaraka mbalimbali</h2>
              <p>Pakua nyaraka muhimu za USCF CCT TAKWIMU</p>
            </div>
            <div className="documents-grid">
              <div className="document-item">
                <a href="/src/components/assets/Document/USCF_JOURNAL-2.pdf" download target="_blank" rel="noopener noreferrer">
                  <i className="ri-file-pdf-line"></i>
                  <div className="document-info">
                    <h4>NANYAMBA MISSION JOURNAL</h4>
                    <span>PDF Document</span>
                  </div>
                </a>
              </div>
              <div className="document-item">
                <a href="/pic/Document/USCF BRONCHURE.pdf" download target="_blank" rel="noopener noreferrer">
                  <i className="ri-file-pdf-line"></i>
                  <div className="document-info">
                    <h4>NANYAMBA MISSION BROCHURE</h4>
                    <span>PDF Document</span>
                  </div>
                </a>
              </div>
              <div className="document-item">
                <a href="/pic/Document/USCF ALMANAC JAN - JULY 2025.pdf" download target="_blank" rel="noopener noreferrer">
                  <i className="ri-file-pdf-line"></i>
                  <div className="document-info">
                    <h4>USCF CCT TAKWIMU ALMANAC</h4>
                    <span>PDF Document</span>
                  </div>
                </a>
              </div>
              <div className="document-item">
                <a href="/pic/Document/Muongozo wa Chaplaincy CCT.pdf" download target="_blank" rel="noopener noreferrer">
                  <i className="ri-file-pdf-line"></i>
                  <div className="document-info">
                    <h4>MUONGOZO WA CHAPLAINCY CCT</h4>
                    <span>PDF Document</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
};

export default News;