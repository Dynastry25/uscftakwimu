import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import FloatingContact from '../components/FloatingContact/FloatingContact';
import './CSS/Services.css';

import pic1 from '../components/assets/Budekwa 1 (2).jpg'
import pic2 from '../components/assets/nanyamba 2.jpg'
import pic3 from '../components/assets/nanyamba 3.jpg'
import gradu1 from '../components/assets/Graduation.jpg'
import gradu2 from '../components/assets/Graduation 2.jpg'
import gradu3 from '../components/assets/Graduation 3.jpg'
import gradu4 from '../components/assets/Graduation 4.jpg'
import maombi1 from '../components/assets/boko 1.jpg'
import maombi2 from '../components/assets/maombi .jpg'
import maombi3 from '../components/assets/nanyamba 3.jpg'
import maombi4 from '../components/assets/nanyamba 5.jpg'
import maombi5 from '../components/assets/logo (3).jpg'

const Services = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const servicesData = [
    {
      id: 1,
      title: "Huduma Za USCF TAKWIMU",
      icon: "ri-home-heart-line",
      description: "USCF-CCT TAKWIMU huendesha shughuli mbalimbali za kiroho na kijamii",
      features: [
        "Ibada za Kila Wiki",
        "Masomo ya Biblia",
        "Maombi na Kuliombea Taifa",
        "Mafundisho na Semina",
        "Huduma za Kijamii",
        "Uinjilisti"
      ],
      additionalContent: "Mahali ambapo wanafunzi wanakua kiroho na kujifunza kuishi maisha yenye maana ndani ya Kristo.",
      motto: "We serve the living God.",
      category: "spiritual"
    },
    {
      id: 2,
      title: "Uinjilisti & Umisheni",
      icon: "ri-globe-line",
      description: "Umisionari ni kitendo cha kueneza dini Fulani (kikristo) kwa wasio waumini wa dini hiyo.",
      missionContent: `
        <p>Tunafurahia kutangaza mission zetu, ambazo huanza kwa maandalizi mazito ili kupata ruhusa na maeneo yanayohitajika.</p>
        <p>Kabla ya mission, tunashiriki katika maombi ili kujiandaa kiroho. Tunafanya shughuli za visitation na semina mbalimbali.</p>
        <p>Wakati wa mission, lengo letu kuu ni kufanya mikutano ili kushiriki ujumbe wa matumaini na wokovu.</p>
        <p>Tunashiriki katika shughuli za kijamii na bonanza fupi siku ya mwisho.</p>
      `,
      missionSlides: [
        {
          image: pic1,
          title: "Budekwa Mission",
          subtitle: "New beginning in Christ"
        },
        {
          image: pic2,
          title: "Nanyamba Mission",
          subtitle: "Till the whole world knows"
        },
        {
          image: pic3,
          title: "Nanyamba Mission",
          subtitle: "Till the whole world knows"
        }
      ],
      category: "mission"
    },
    {
      id: 3,
      title: "Kambi Ya Maombi",
      icon: "ri-prayer-line",
      description: "Kambi yetu ya Maombi hufanyika ili kutuandaa kiroho na kukuza ukuaji wa imani kupitia mafundisho na shughuli.",
      features: [
        "Kuombea semester yenye mafanikio",
        "Mafundisho ya kidini",
        "Michezo ya afya ya mwili na kiroho",
        "Maombi ya kina"
      ],
      prayerContent: `
        <p>Kabla ya kambi, tunashiriki katika maombi ya awali. Wakati wa kambi, kuna vipindi vya maombi ya kipekee na kufunga.</p>
        <p>Pia kuna maombi maalumu ya kuombea taifa na jamii.</p>
      `,
      prayerImages: [
        maombi1,
        maombi2,
        maombi3,
        maombi4,
        maombi5
      ],
      category: "spiritual"
    },
    {
      id: 4,
      title: "Mahafali",
      icon: "ri-graduation-cap-line",
      description: "Kama USCF, tunafanya mahafali kwa njia ya kipekee kwa ajili ya kuwaenzi wahitimu.",
      graduationSlides: [
        gradu1,
        gradu2,
        gradu3,
        gradu4
      ],
      features: [
        {
          icon: "ri-prayer-line",
          text: "Ibada ya Shukrani & Shuhuda kwa wahitimu"
        },
        {
          icon: "ri-megaphone-line",
          text: "Hotuba za Kuhamasisha"
        },
        {
          icon: "ri-gift-line",
          text: "Utoaji wa Zawadi & Vyeti"
        }
      ],
      additionalContent: "Lengo letu ni kuhakikisha wahitimu wanahisi kuthaminiwa na wanajengewa msingi imara wa maisha baada ya chuo.",
      category: "academic"
    },
    {
      id: 5,
      title: "Matendo Ya Huruma",
      icon: "ri-heart-3-line",
      description: "USCF inajitolea kuleta mabadiliko chanya kwa jamii kupitia juhudi zetu za hisani.",
      highlights: [
        {
          icon: "ri-restaurant-line",
          text: "Msaada wa chakula na mavazi"
        },
        {
          icon: "ri-book-line",
          text: "Msaada wa elimu"
        },
        {
          icon: "ri-home-8-line",
          text: "Utembeleaji wa vituo vya watoto yatima"
        }
      ],
      additionalContent: "Tunatekeleza maadili ya Kikristo ya upendo, huruma, na ukarimu.",
      category: "community"
    },
    {
      id: 6,
      title: "Semina",
      icon: "ri-presentation-line",
      description: "USCF inajitahidi kukuza ukuaji wa kiroho, kiakili, na kibinafsi kwa wanafunzi.",
      seminars: [
        {
          title: "Semina ya Umisheni",
          description: "Inayojikita katika utume na huduma"
        },
        {
          title: "Semina za Maisha ya Kikristo",
          description: "Masuala ya ukuaji wa kiroho na uongozi"
        }
      ],
      additionalContent: "Zinakusudiwa kuwahamasisha, kuwawezesha, na kuwajengea uwezo wanafunzi.",
      category: "educational"
    },
    {
      id: 7,
      title: "USCF CCT TAKWIMU SHOP",
      icon: "ri-store-3-line",
      description: "Duka letu linatoa bidhaa mbalimbali zinazokidhi mahitaji yako.",
      shopSlogan: "Furahia bidhaa zetu za kipekee!",
      isShop: true,
      category: "commercial"
    }
  ];

  const categories = [
    { id: 'all', label: 'Huduma Zote', icon: 'ri-apps-line' },
    { id: 'spiritual', label: 'Kiroho', icon: 'ri-prayer-line' },
    { id: 'mission', label: 'Umisheni', icon: 'ri-globe-line' },
    { id: 'academic', label: 'Kielimu', icon: 'ri-graduation-cap-line' },
    { id: 'community', label: 'Jamii', icon: 'ri-community-line' },
    { id: 'educational', label: 'Elimu', icon: 'ri-book-open-line' },
    { id: 'commercial', label: 'Biashara', icon: 'ri-store-3-line' }
  ];

  const filteredServices = activeFilter === 'all' 
    ? servicesData 
    : servicesData.filter(service => service.category === activeFilter);

  return (
    <div className="services-page">
      <Header />
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="services-hero">
          <div className="container">
            <div className="hero-content">
              <h1>Huduma Zetu</h1>
              <p>Karibu katika huduma mbalimbali za USCF CCT TAKWIMU zinazolenga kukuza na kuimarisha imani ya wanafunzi</p>
            </div>
          </div>
        </section>

        {/* Services Filter */}
        <section className="services-filter-section">
          <div className="container">
            <div className="filter-container">
              <h3>Chagua Aina ya Huduma:</h3>
              <div className="filter-buttons">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
                    onClick={() => setActiveFilter(category.id)}
                  >
                    <i className={category.icon}></i>
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="services-grid-section">
          <div className="container">
            <div className="services-grid">
              {filteredServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
            
            {filteredServices.length === 0 && (
              <div className="no-services">
                <i className="ri-search-line"></i>
                <h3>Hakuna huduma zilizopatikana kwa kichujio hiki</h3>
                <p>Badilisha kichujio au angalia huduma zote</p>
                <button 
                  className="reset-filter-btn"
                  onClick={() => setActiveFilter('all')}
                >
                  Angalia Huduma Zote
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="services-cta">
          <div className="container">
            <div className="cta-content">
              <h2>Je, Unapenda Kujiunga na Huduma Zetu?</h2>
              <p>Karibu ujumike na familia yetu ya Kikristo na ufurahie huduma zetu zenye kukuza kiroho na kiakili</p>
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

export default Services;