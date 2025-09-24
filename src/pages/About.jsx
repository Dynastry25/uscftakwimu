import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import FloatingContact from '../components/FloatingContact/FloatingContact';
import './CSS/About.css';

const About = () => {
  const [activeTab, setActiveTab] = useState('about');

  const missionItems = [
    "Kukuza na kuimarisha imani ya wanafunzi kupitia mafundisho ya Biblia na ushirika wa Kikristo.",
    "Kuhamasisha maisha ya maombi, utakatifu, na ibada halisi kwa Mungu aliye hai.",
    "Kuwawezesha wanafunzi kuwa viongozi wa kiroho na waadilifu katika jamii.",
    "Kushiriki huduma za kijamii kwa upendo wa Kristo, ikiwemo kusaidia wahitaji na kuhubiri Injili."
  ];

  const stats = [
    { number: "86+", label: "Washirika Jumla", icon: "ri-team-line" },
    { number: "60+", label: "Washirika Hai", icon: "ri-user-heart-line" },
    { number: "21+", label: "Viongozi", icon: "ri-user-star-line" },
    { number: "5+", label: "Miaka ya Huduma", icon: "ri-history-line" }
  ];

  const values = [
    {
      icon: "ri-heart-line",
      title: "Upendo",
      description: "Tunaaminika kuwa upendo wa Kristo ndio msingi wa huduma zetu zote."
    },
    {
      icon: "ri-scales-3-line",
      title: "Uadilifu",
      description: "Tunahimiza uadilifu na uwazi katika kila hatua ya utendaji wetu."
    },
    {
      icon: "ri-hand-heart-line",
      title: "Huduma",
      description: "Tunajitolea kwa huduma bora kwa wanafunzi na jamii kwa ujumla."
    },
    {
      icon: "ri-lightbulb-flash-line",
      title: "Uvuvio",
      description: "Tunakuza uvuvio na ubunifu katika kuhudumia jamii ya wanafunzi."
    }
  ];

  return (
    <div className="about-page">
      <Header />
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="about-hero">
          <div className="container">
            <div className="hero-content">
              <h1>Kuhusu USCF CCT TAKWIMU</h1>
              <p>Kutangaza injili, kujenga imani, na kuwawezesha viongozi wa kesho</p>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="about-tabs-section">
          <div className="container">
            <div className="tabs-container">
              <button 
                className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => setActiveTab('about')}
              >
                <i className="ri-information-line"></i>
                Kuhusu Sisi
              </button>
              <button 
                className={`tab-btn ${activeTab === 'mission' ? 'active' : ''}`}
                onClick={() => setActiveTab('mission')}
              >
                <i className="ri-target-line"></i>
                Lengo na Malengo
              </button>
              <button 
                className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                <i className="ri-history-line"></i>
                Historia Yetu
              </button>
              <button 
                className={`tab-btn ${activeTab === 'values' ? 'active' : ''}`}
                onClick={() => setActiveTab('values')}
              >
                <i className="ri-heart-line"></i>
                Thamani Zetu
              </button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">
                    <i className={stat.icon}></i>
                  </div>
                  <div className="stat-content">
                    <h3>{stat.number}</h3>
                    <p>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container">
          {/* About Tab Content */}
          {activeTab === 'about' && (
            <div className="tab-content active">
              <div className="about-grid">
                <div className="about-card main-card">
                  <h2>Kuhusu Sisi</h2>
                  <p>
                    University Students Christian Fellowship – Christian Council of Tanzania (USCF-CCT) TAKWIMU 
                    ni jumuiya ya wanafunzi wa Kikristo katika Chuo cha Takwimu Mashariki mwa Afrika, inayojumuisha 
                    wanafunzi kutoka madhehebu mbalimbali ya Kikristo.
                  </p>
                  <p>
                    Tukiwa chini ya mwavuli wa Christian Council of Tanzania (CCT), tunalenga kuimarisha maisha ya 
                    kiroho ya wanafunzi kwa misingi ya Neno la Mungu, maombi, ushirika, na huduma kwa jamii.
                  </p>
                </div>
                

                <div className="about-card image-card">
                  <img src="src/components/assets/boko 1.jpg" alt="USCF CCT TAKWIMU Family" />
                  <div className="image-overlay">
                    <h3>Familia ya USCF</h3>
                    <p>Pamoja tunaweza, pamoja tunashinda</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mission Tab Content */}
          {activeTab === 'mission' && (
            <div className="tab-content active">
              <div className="mission-grid">
                <div className="mission-card">
                  <div className="mission-header">
                    <div className="mission-icon">
                      <i className="ri-target-line"></i>
                    </div>
                    <h3>Lengo Letu</h3>
                  </div>
                  <p>
                    Kuwa jumuiya inayojenga kizazi cha wanafunzi wenye imani thabiti kwa Kristo, 
                    wakiongozwa na Neno la Mungu katika maisha yao ya kila siku na taaluma zao.
                  </p>
                </div>

                <div className="mission-card">
                  <div className="mission-header">
                    <div className="mission-icon">
                      <i className="ri-footprint-line"></i>
                    </div>
                    <h3>Dhamira Yetu</h3>
                  </div>
                  <div className="mission-items">
                    {missionItems.map((item, index) => (
                      <div key={index} className="mission-item">
                        <i className="ri-checkbox-circle-fill"></i>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mission-card">
                  <div className="mission-header">
                    <div className="mission-icon">
                      <i className="ri-quill-pen-line"></i>
                    </div>
                    <h3>Kauli Mbiu</h3>
                  </div>
                  <p className="motto-text">"We serve the living God"</p>
                  <p className="motto-subtext">Tunamwabudu Mungu aliye hai na kumtumikia kwa uaminifu</p>
                </div>
              </div>
            </div>
          )}

          {/* History Tab Content */}
          {activeTab === 'history' && (
            <div className="tab-content active">
              <div className="history-timeline">
                <div className="timeline-item">
                  <div className="timeline-year">2020/2021</div>
                  <div className="timeline-content">
                    <h4>Kuanzishwa kwa USCF CCT TAKWIMU</h4>
                    <p>
                      USCF CCT TAKWIMU ilianzishwa rasmi katika mwaka wa masomo 2020/2021 ikiwa na 
                      wanachama wasiozidi 20, miongoni mwao viongozi walikuwa watano.
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-year">2021/2022</div>
                  <div className="timeline-content">
                    <h4>Kukuza na Kupanuka</h4>
                    <p>
                      Mwaka wa pili wa shirika uliona ongezeko la wanachama na kuanzishwa kwa ministries 
                      mbalimbali ikiwemo Kikundi cha kusifu na kuabudu, IT na Kwaya.
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-year">2023</div>
                  <div className="timeline-content">
                    <h4>Misheni na Huduma za Jamii</h4>
                    <p>
                      Kufanikiwa kwa misheni mbalimbali na kuanza kwa huduma za kijamii zilizolenga 
                      kuwasaidia wanafunzi na jamii kwa ujumla.
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-year">2024</div>
                  <div className="timeline-content">
                    <h4>Ukuaji wa Kiutendaji</h4>
                    <p>
                      Kufikia washarika takribani 86 ambao kati yao washarika hai ni takribani 60 tu 
                      ambao wanashiriki katika ibada na matukio mbalimbali.
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-year">2025</div>
                  <div className="timeline-content">
                    <h4>Kuendelea na Misioni</h4>
                    <p>
                      Kuendelea na misheni, mahafali, na matukio mbalimbali yanayolenga kuimarisha imani 
                      ya wanafunzi na kuwapa ujuzi wa maisha.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Values Tab Content */}
          {activeTab === 'values' && (
            <div className="tab-content active">
              <div className="values-grid">
                {values.map((value, index) => (
                  <div key={index} className="value-card">
                    <div className="value-icon">
                      <i className={value.icon}></i>
                    </div>
                    <h4>{value.title}</h4>
                    <p>{value.description}</p>
                  </div>
                ))}
              </div>

              <div className="values-statement">
                <h3>Kauli ya Thamani Zetu</h3>
                <p>
                  Katika USCF CCT TAKWIMU, tunaamini katika kuwa na msingi imara wa maadili ya Kikristo. 
                  Thamani zetu zinatujenga na kutuongoza katika kila hatua tunayochukua. Tunajivunia kuwa 
                  jumuiya inayojenga, inayohudumia, na inayokuza vipaji vya wanachama wake.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <section className="about-cta">
          <div className="container">
            <div className="cta-content">
              <h2>Je, Unapenda Kujiunga Nasi?</h2>
              <p>Karibu uwe sehemu ya familia yetu ya Kikristo na ujione ukiukua kiroho na kiakili</p>
              <div className="cta-buttons">
                <a href="/registration" className="cta-btn primary">
                  <i className="ri-user-add-line"></i>
                  Jisajili Sasa
                </a>
                <a href="/contact" className="cta-btn secondary">
                  <i className="ri-customer-service-2-line"></i>
                  Wasiliana Nasi
                </a>
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

export default About;