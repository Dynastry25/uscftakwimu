import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import BibleVerse from '../components/BibleVerse/BibleVerse';
import ImageSlider from '../components/ImageSlider/ImageSlider';
import FloatingContact from '../components/FloatingContact/FloatingContact';
import NewsCard from '../components/NewsCard/NewsCard';
import './CSS/Home.css';
import { newsData } from '../data/newsData';

import boko from '../components/assets/boko 1.jpg'
import mission from '../components/assets/mission.jpg'
import slider3 from '../components/assets/mission 4.jpg'
import event1 from '../components/assets/yombo 2.jpg'
import event2 from '../components/assets/nanyamba 1.jpg'
import event3 from '../components/assets/jelly.jpg'
import event4 from '../components/assets/maombi .jpg'
import event5 from '../components/assets/kwaya.jpg'
import event6 from '../components/assets/welcome.jpg'
import mission2 from '../components/assets/uscf1.png'

const Home = () => {
  const [showMoreContent, setShowMoreContent] = useState(false);
  const [activeTab, setActiveTab] = useState('popularPosts');
  const [churches, setChurches] = useState([]);
  const navigate = useNavigate(); 

const slides = [
    {
      image: boko,
      title: "Karibu USCF CCT TAKWIMU",
      text: "Jumuiya ya Wanafunzi wa Kikristo inayojenga viongozi wa kesho",
      link: "/#registration", // Changed to hash link
      linkText: "Jisajili Sasa",
      onClick: () => navigate('/registration2') // Added onClick for programmatic navigation
    },
    {
      image: slider3,
      title: "Huduma Zetu",
      text: "Ibada, Masomo ya Biblia, Uinjilisti na huduma nyinginezo",
      link: "/#services", // Changed to hash link
      linkText: "Angalia Huduma",
      onClick: () => navigate('/services') // Added onClick for programmatic navigation
    },
    {
      image: mission,
      title: "Jiunge Nasi",
      text: "Unakaribishwa kujiunga na familia yetu ya Kikristo",
      link: "/#join", // Changed to hash link
      linkText: "Jisajili Sasa",
      onClick: () => navigate('/registration') // Added onClick for programmatic navigation
    }
  ];
  const quickCards = [
    {
      icon: 'ri-store-3-line',
      title: 'Duka',
      description: 'Nunua vitabu na vifaa vya Kikristo',
      link: '/shop',
      color: '#ff6b35'
    },
    {
      icon: 'ri-questionnaire-line',
      title: 'Bible Quiz',
      description: 'Jaribu ujuzi wako wa Biblia',
      link: '/quiz',
      color: '#4caf50'
    },
    {
      icon: 'ri-newspaper-line',
      title: 'Habari',
      description: 'Matukio na habari mpya',
      link: '/news',
      color: '#2196f3'
    },
    {
      icon: 'ri-heart-line',
      title: 'Changia',
      description: 'Boresha huduma zetu',
      link: '/donation',
      color: '#e91e63'
    }
  ];

  const eventsImages = [
    event1,
    event2,
    event3,
    event4,
    event5,
    event6
  ];

  const worshipSchedule = [
    { day: "Jumatatu", time: "18:00 - 19:30", activity: "Maombi", icon: "ri-prayer-line" },
    { day: "Jumanne", time: "18:00 - 21:00", activity: "Mazoezi ya Kwaya", icon: "ri-music-2-line" },
    { day: "Jumatano", time: "18:00 - 19:30", activity: "Neno la Mungu", icon: "ri-book-open-line" },
    { day: "Alhamisi", time: "18:00 - 19:30", activity: "Kusifu & Kuabudu", icon: "ri-heart-line" },
    { day: "Ijumaa", time: "18:00 - 19:30", activity: "Drama Ministry", icon: "ri-theater-line" },
    { day: "Jumamosi", time: "11:00 - 14:00", activity: "Mazoezi ya Kwaya", icon: "ri-music-2-line" }
  ];

  useEffect(() => {
    // Load churches data
    const churchesData = [
      "Evangelical Lutheran Church in Tanzania (ELCT)",
      "Anglican Church Tanzania (ACT)",
      "Moravian Church of Tanzania (MCT)",
      "Africa Inland Church Tanzania (AICT)",
      "Mennonite Church in Tanzania (MCT)",
      "Baptist Church in Tanzania (BCT)",
      "Salvation Army in Tanzania",
      "Presbyterian of East Africa (PEA)",
      "Bible Church in Tanzania",
      "Church of God in Tanzania",
      "Evangelistic Church in Tanzania",
      "Kanisa la Upendo wa kristo Masihi (KIUMA)"
    ];
    setChurches(churchesData);
  }, []);

  return (
    <div className="home-page">
      <Header />
      <Navbar />
      
      <main className="home-main">
        {/* Hero Slider */}
        <section className="hero-section">
          <ImageSlider slides={slides} />
        </section>

        {/* Welcome Section */}
        <section className="welcome-section">
          <div className="container">
            <div className="welcome-content">
              <h1>Karibu USCF CCT TAKWIMU!</h1>
              <div className="welcome-text">
                <p>
                  Sisi ni jumuiya ya wanafunzi wa vyuo vikuu tuliounganishwa katika imani, ushirika, na huduma
                  kwa Bwana wetu Yesu Kristo. Katika USCF Takwimu, tunajenga msingi imara wa kiroho, tunahimizana 
                  katika safari ya imani na tunakuwa mashahidi wa nuru ya Kristo chuoni na katika jamii pia.
                </p>
                
                {showMoreContent && (
                  <p className="additional-content">
                    Tunawakaribisha kujiunga nasi katika ibada, masomo ya Biblia, na huduma mbalimbali zenye mguso
                    kwa jamii. Tukiwa na lengo la kuleta mabadiliko chanya kwa misingi ya Maandiko Matakatifu. 
                    Kupitia mshikamano wetu tunajenga viongozi wa kesho wenye maadili, tunasimama imara katika wito 
                    wetu wa Kikristo na kushiriki upendo wa Kristo.
                  </p>
                )}
                
                <button 
                  className="read-more-btn"
                  onClick={() => setShowMoreContent(!showMoreContent)}
                >
                  {showMoreContent ? 'Ficha Maelezo' : 'Soma Zaidi'} 
                  <i className={`ri-arrow-${showMoreContent ? 'up' : 'down'}-s-line`}></i>
                </button>
                
                <div className="motto-section">
                  <i className="ri-double-quotes-l"></i>
                  <p className="motto">"We serve the living God"</p>
                  <i className="ri-double-quotes-r"></i>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bible Verse Section */}
        <section className="verse-section">
          <div className="container">
            <BibleVerse />
          </div>
        </section>

        {/* Quick Access Cards */}
        <section className="quick-cards-section">
          <div className="container">
            <h2 className="section-title">Huduma na Vitendo</h2>
            <div className="quick-cards-grid">
              {quickCards.map((card, index) => (
                <Link to={card.link} key={index} className="quick-card">
                  <div 
                    className="card-icon" 
                    style={{ backgroundColor: `${card.color}20`, color: card.color }}
                  >
                    <i className={card.icon}></i>
                  </div>
                  <div className="card-content">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                  <div className="card-arrow">
                    <i className="ri-arrow-right-line"></i>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* News and Updates Section */}
        <section className="news-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">USCF TAKWIMU NEWS</h2>
              <p className="section-subtitle">Habari, Matukio na Taarifa Muhimu</p>
            </div>

            {/* News Tabs */}
            <div className="news-tabs">
              <div className="tab-buttons">
                <button 
                  className={`tab-button ${activeTab === 'popularPosts' ? 'active' : ''}`}
                  onClick={() => setActiveTab('popularPosts')}
                >
                  <i className="ri-newspaper-line"></i>
                  HABARI NA MATUKIO
                </button>
                <button 
                  className={`tab-button ${activeTab === 'recentPosts' ? 'active' : ''}`}
                  onClick={() => setActiveTab('recentPosts')}
                >
                  <i className="ri-gallery-line"></i>
                  PICHA NA VIDEO
                </button>
                <button 
                  className={`tab-button ${activeTab === 'documents' ? 'active' : ''}`}
                  onClick={() => setActiveTab('documents')}
                >
                  <i className="ri-file-text-line"></i>
                  NYARAKA
                </button>
              </div>

              <div className="tab-content1">
                {/* Habari na Matukio Tab */}
                {activeTab === 'popularPosts' && (
                  <div className="tab-pane active">
                    <div className="news-grid">
                      {newsData.map((news, index) => (
                        <NewsCard key={index} news={news} />
                      ))}
                    </div>
                    <div className="view-all-news">
                      <Link to="/news" className="view-all-btn">
                        Angalia Habari Zote <i className="ri-arrow-right-line"></i>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Picha na Video Tab */}
                {activeTab === 'recentPosts' && (
                  <div className="tab-pane">
                    <div className="media-grid">
                      <div className="media-item">
                        <div className="video-container">
                          <iframe 
                            src="https://www.youtube.com/embed/cLv37ciPnmA?si=Jm_26QdY0VZ3eqA_" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allowFullScreen
                          ></iframe>
                        </div>
                        <p>Muhtasari wa Mission ya Nanyamba</p>
                      </div>
                      <div className="media-item">
                        <div className="video-container">
                          <iframe 
                            src="https://www.youtube.com/embed/XMlDJH4aQRM?si=_4Y4pMr6AUUlb77t" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allowFullScreen
                          ></iframe>
                        </div>
                        <p>Mkesha wa Kuabudu Season 4</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Nyaraka Tab */}
                {activeTab === 'documents' && (
                  <div className="tab-pane">
                    <div className="documents-list">
                      <a href="/documents/uscf-journal.pdf" download className="document-item">
                        <i className="ri-file-pdf-line"></i>
                        <span>Nanyamba Mission Journal</span>
                        <i className="ri-download-line"></i>
                      </a>
                      <a href="/documents/uscf-brochure.pdf" download className="document-item">
                        <i className="ri-file-pdf-line"></i>
                        <span>Nanyamba Mission Brochure</span>
                        <i className="ri-download-line"></i>
                      </a>
                      <a href="/documents/uscf-almanac.pdf" download className="document-item">
                        <i className="ri-file-pdf-line"></i>
                        <span>USCF CCT TAKWIMU ALMANAC</span>
                        <i className="ri-download-line"></i>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CCT Churches Section */}
        <section className="churches-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">MAKANISA YANAYOUNDA CCT</h2>
              <p className="section-subtitle">Jumuiya ya Makanisa ya Kikristo Tanzania</p>
            </div>
            <div className="churches-grid">
              {churches.map((church, index) => (
                <div key={index} className="church-item">
                  <i className="ri-church-line"></i>
                  <span>{church}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <div className="container">
            <div className="mission-content">
              <div className="mission-image">
                <img src={mission2} alt="USCF Mission" />
              </div>
              <div className="mission-text">
                <h2>USCF CCT TAKWIMU UTUME MOROGORO 2026</h2>
                <p className="mission-quote">
                  "Mwenyezi Mungu ametupa fursa ya kumtumikia Mkoa wa Morogoro kwa mwezi wa pili 2026, 
                  kwa uongozi wa Neno la Mungu kutoka (Luka 10:2)."
                </p>
                <div className="mission-details">
                  <div className="mission-target">
                    <h4>Tunatarajia:</h4>
                    <ul>
                      <li>Kupeleka watumishi 120 kwa ajili ya utume huu</li>
                      <li>Kukusanya Tsh. Milioni 30 kwa gharama za maandalizi</li>
                    </ul>
                  </div>
                  <p className="mission-call">
                    "Mungu atabariki sadaka yako kwa uaminifu wake. Asanteni kwa ushirikiano wenu!"
                  </p>
                  <div className="mission-tag">#SendMeLord</div>
                </div>
                <Link to="/registration" className="mission-btn">
                  Jisajili Kwenye Utume <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Events Gallery */}
        <section className="events-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Matukio Yetu</h2>
              <p>Picha za matukio mbalimbali yaliyofanyika ndani na nje ya USCF TAKWIMU</p>
            </div>
            <div className="events-gallery">
              {eventsImages.map((image, index) => (
                <div key={index} className="event-image">
                  <img src={image} alt={`Event ${index + 1}`} />
                  <div className="image-overlay">
                    <i className="ri-zoom-in-line"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Worship Schedule */}
        <section className="schedule-section">
          <div className="container">
            <div className="schedule-header">
              <div className="circle-icon">
                <i className="ri-calendar-schedule-line"></i>
              </div>
              <h2>RATIBA ZETU ZA IBADA</h2>
            </div>
            <div className="schedule-table">
              {worshipSchedule.map((item, index) => (
                <div key={index} className="schedule-item">
                  <div className="schedule-day">
                    <i className={item.icon}></i>
                    <span>{item.day}</span>
                  </div>
                  <div className="schedule-time">{item.time}</div>
                  <div className="schedule-activity">{item.activity}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="contact-section">
          <div className="container">
            <div className="contact-form-container">
              <h2>Maoni / Salamu</h2>
              <p>Tumepoke maoni yako na tutafurahi kukujibu</p>
              
              <form className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Jina lako" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Barua pepe yako" 
                      required 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <textarea 
                    name="message" 
                    rows="5" 
                    placeholder="Ujumbe wako..." 
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Tuma Ujumbe <i className="ri-send-plane-line"></i>
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Home;