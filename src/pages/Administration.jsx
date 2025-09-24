import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import LeaderCard from '../components/LeaderCard/LeaderCard';
import FloatingContact from '../components/FloatingContact/FloatingContact';
import { leadersData } from '../data/leadersData';
import './CSS/Administration.css';

const Administration = () => {
  const [activeDepartment, setActiveDepartment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const departments = [
    { id: 'all', label: 'Wote', icon: 'ri-team-line' },
    { id: 'executive', label: 'Uongozi Mkuu', icon: 'ri-user-star-line' },
    { id: 'spiritual', label: 'Kiroho', icon: 'ri-prayer-line' },
    { id: 'academic', label: 'Kielimu', icon: 'ri-graduation-cap-line' },
    { id: 'mission', label: 'Umisheni', icon: 'ri-globe-line' },
    { id: 'finance', label: 'Fedha', icon: 'ri-bank-line' },
    { id: 'media', label: 'Media', icon: 'ri-camera-line' }
  ];

  const filteredLeaders = leadersData.filter(leader => {
    const matchesSearch = leader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         leader.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         leader.department?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = activeDepartment === 'all' || leader.department === activeDepartment;
    return matchesSearch && matchesDepartment;
  });

  const executiveLeaders = leadersData.filter(leader => leader.department === 'executive');
  const otherLeaders = leadersData.filter(leader => leader.department !== 'executive');

  return (
    <div className="administration-page">
      <Header />
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="admin-hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <h1>KAMATI KUU YA UONGOZI USCF CCT TAKWIMU</h1>
                <p>Kutawala kwa hekima, kuongoza kwa upendo, na kuhudumia kwa uaminifu</p>
              </div>
              <div className="hero-stats">
                <div className="stat-item">
                  <i className="ri-user-line"></i>
                  <div>
                    <span className="stat-number">{leadersData.length}+</span>
                    <span className="stat-label">Wanakamati</span>
                  </div>
                </div>
                <div className="stat-item">
                  <i className="ri-building-line"></i>
                  <div>
                    <span className="stat-number">{new Set(leadersData.map(l => l.department)).size}</span>
                    <span className="stat-label">Idara</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="admin-controls-section">
          <div className="container">
            <div className="controls-grid">
              <div className="search-box">
                <i className="ri-search-line"></i>
                <input
                  type="text"
                  placeholder="Tafuta mwongozi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="department-filter">
                <h4>Chagua Idara:</h4>
                <div className="filter-buttons">
                  {departments.map(dept => (
                    <button
                      key={dept.id}
                      className={`filter-btn ${activeDepartment === dept.id ? 'active' : ''}`}
                      onClick={() => setActiveDepartment(dept.id)}
                    >
                      <i className={dept.icon}></i>
                      {dept.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="results-count">
              <p>Wanakamati waliopatikana: <strong>{filteredLeaders.length}</strong></p>
            </div>
          </div>
        </section>

        {/* Executive Leadership Section */}
        <section className="executive-section">
          <div className="container">
            <div className="section-header">
              <h2>Uongozi Mkuu</h2>
              <p>Viongozi wakuu wa USCF CCT TAKWIMU</p>
              <div className="section-divider"></div>
            </div>
            
            <div className="executive-grid">
              {executiveLeaders.map((leader, index) => (
                <LeaderCard key={index} leader={leader} isExecutive={true} />
              ))}
            </div>
          </div>
        </section>

        {/* All Leaders Section */}
        <section className="all-leaders-section">
          <div className="container">
            <div className="section-header">
              <h2>Wanakamati Wote</h2>
              <p>Timu yetu ya wote wanaohudumia kwa bidii</p>
            </div>
            
            {filteredLeaders.length > 0 ? (
              <div className="leaders-grid">
                {filteredLeaders.map((leader, index) => (
                  <LeaderCard key={index} leader={leader} />
                ))}
              </div>
            ) : (
              <div className="no-leaders-found">
                <i className="ri-search-eye-line"></i>
                <h3>Hakuna mwongozi aliyepatikana</h3>
                <p>Badilisha kichujio au neno linalotafutwa</p>
              </div>
            )}
          </div>
        </section>

        {/* Organization Structure */}
        <section className="org-structure-section">
          <div className="container">
            <div className="section-header">
              <h2>Muundo wa Uongozi</h2>
              <p>Mfumo wetu wa usimamizi na ushirikiano</p>
            </div>
            
            <div className="org-chart">
              <div className="org-level executive-level">
                <h4>Uongozi Mkuu</h4>
                <div className="org-members">
                  {executiveLeaders.slice(0, 3).map((leader, index) => (
                    <div key={index} className="org-member">
                      <div className="member-avatar">
                        <img src={leader.image} alt={leader.name} />
                      </div>
                      <div className="member-info">
                        <h5>{leader.name}</h5>
                        <span>{leader.position}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="org-connector">
                <div className="connector-line"></div>
              </div>
              
              <div className="org-level department-level">
                <h4>Idara Mbalimbali</h4>
                <div className="departments-grid">
                  {departments.filter(dept => dept.id !== 'all' && dept.id !== 'executive').map(dept => (
                    <div key={dept.id} className="department-card">
                      <i className={dept.icon}></i>
                      <h5>{dept.label}</h5>
                      <span>{leadersData.filter(l => l.department === dept.id).length} Wanachama</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Administration;