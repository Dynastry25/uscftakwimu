import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import FloatingContact from '../components/FloatingContact/FloatingContact';
import './CSS/Registration.css';

const Registration2 = () => {
  const [formData, setFormData] = useState({
    member_name: '',
    course: '',
    phone_number: '',
    membership_type: 'regular',
    join_reason: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const courses = [
    'Diploma ya Takwimu',
    'Diploma ya IT',
    'Bachelor ya Takwimu',
    'Bachelor ya IT',
    'Bachelor ya Uhasibu',
    'Nyingine'
  ];

  const membershipTypes = [
    { value: 'regular', label: 'Mwanachama wa Kawaida', icon: 'ri-user-line' },
    { value: 'active', label: 'Mwanachama Active', icon: 'ri-user-heart-line' },
    { value: 'leader', label: 'Kiongozi', icon: 'ri-user-star-line' }
  ];

  const joinReasons = [
    'Kukuza imani yangu',
    'Kujumuika na wakristo wengine',
    'Kuhudumia katika misheni',
    'Kupata mafundisho ya kiroho',
    'Nyingine'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.member_name.trim()) {
      newErrors.member_name = 'Jina kamili linahitajika';
    } else if (formData.member_name.trim().length < 3) {
      newErrors.member_name = 'Jina lazima liwe na herufi zaidi ya 2';
    }

    if (!formData.course.trim()) {
      newErrors.course = 'Kozi inahitajika';
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = 'Namba ya simu inahitajika';
    } else if (!/^(\+255|0)[0-9]{9}$/.test(formData.phone_number.replace(/\s/g, ''))) {
      newErrors.phone_number = 'Tafadhali weka namba sahihi (anza na +255 au 0)';
    }

    if (!formData.join_reason) {
      newErrors.join_reason = 'Tafadhali chagua sababu ya kujiunga';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setFormData({
          member_name: '',
          course: '',
          phone_number: '',
          membership_type: 'regular',
          join_reason: ''
        });
        setShowSuccess(false);
      }, 3000);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="registration-page">
        <Header />
        <Navbar />
        
        <main>
          <div className="registration-hero">
            <div className="container">
              <h1>WELCOME TO USCF TAKWIMU</h1>
              <p className="tagline">#WE SERVE THE LIVING GOD</p>
            </div>
          </div>

          <div className="container">
            <div className="success-container">
              <div className="success-animation">
                <div className="success-icon">
                  <i className="ri-team-fill"></i>
                </div>
                <h2>Karibu Katika Familia!</h2>
                <p>Usajili wako umekamilika. Karibu katika familia ya USCF CCT TAKWIMU.</p>
                <div className="success-details">
                  <p><strong>Jina:</strong> {formData.member_name}</p>
                  <p><strong>Aina ya Uanachama:</strong> {
                    membershipTypes.find(type => type.value === formData.membership_type)?.label
                  }</p>
                </div>
                <div className="welcome-message">
                  <p>Tutawasiliana nawe kuhibu hatua za kujiunga na shughuli zetu.</p>
                </div>
                <button 
                  className="back-to-form-btn"
                  onClick={() => setShowSuccess(false)}
                >
                  <i className="ri-arrow-left-line"></i>
                  Sajili Mwingine
                </button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <FloatingContact />
      </div>
    );
  }

  return (
    <div className="registration-page">
      <Header />
      <Navbar />
      
      <main>
        <div className="registration-hero variant-2">
          <div className="container">
            <div className="hero-content">
              <h1>WELCOME TO USCF TAKWIMU</h1>
              <p className="tagline">#WE SERVE THE LIVING GOD</p>
              <div className="hero-stats">
                <div className="stat">
                  <i className="ri-team-line"></i>
                  <span>86+ Wanachama</span>
                </div>
                <div className="stat">
                  <i className="ri-calendar-check-line"></i>
                  <span>5+ Miaka ya Huduma</span>
                </div>
                <div className="stat">
                  <i className="ri-heart-line"></i>
                  <span>Jumuiya ya Upendo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="registration-section">
            <div className="form-container">
              <h2 className="form-title">Jisajili Kujiunga na USCF</h2>
              <p className="form-subtitle">Jiunge na jumuiya yetu ya Kikristo na ufurahie ushirika, mafundisho, na huduma</p>
              
              <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                  <label htmlFor="member_name">
                    <i className="ri-user-line"></i>
                    Jina Kamili
                  </label>
                  <input
                    type="text"
                    id="member_name"
                    name="member_name"
                    value={formData.member_name}
                    onChange={handleInputChange}
                    placeholder="Weka jina lako kamili"
                    className={errors.member_name ? 'error' : ''}
                  />
                  {errors.member_name && <span className="error-message">{errors.member_name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="course">
                    <i className="ri-book-line"></i>
                    Kozi Unayosoma
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className={errors.course ? 'error' : ''}
                  >
                    <option value="">Chagua kozi yako</option>
                    {courses.map((course, index) => (
                      <option key={index} value={course}>{course}</option>
                    ))}
                  </select>
                  {errors.course && <span className="error-message">{errors.course}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone_number">
                    <i className="ri-phone-line"></i>
                    Namba ya Simu
                  </label>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    placeholder="Mf: +255 XXX XXX XXX au 0XXX XXX XXX"
                    className={errors.phone_number ? 'error' : ''}
                  />
                  {errors.phone_number && <span className="error-message">{errors.phone_number}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="membership_type">
                    <i className="ri-user-settings-line"></i>
                    Aina ya Uanachama Unayotaka
                  </label>
                  <div className="radio-group">
                    {membershipTypes.map((type) => (
                      <label key={type.value} className="radio-option">
                        <input
                          type="radio"
                          name="membership_type"
                          value={type.value}
                          checked={formData.membership_type === type.value}
                          onChange={handleInputChange}
                        />
                        <div className="radio-content">
                          <i className={type.icon}></i>
                          <span>{type.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="join_reason">
                    <i className="ri-question-line"></i>
                    Kwa Nini Unataka Kujiunga?
                  </label>
                  <select
                    id="join_reason"
                    name="join_reason"
                    value={formData.join_reason}
                    onChange={handleInputChange}
                    className={errors.join_reason ? 'error' : ''}
                  >
                    <option value="">Chagua sababu</option>
                    {joinReasons.map((reason, index) => (
                      <option key={index} value={reason}>{reason}</option>
                    ))}
                  </select>
                  {errors.join_reason && <span className="error-message">{errors.join_reason}</span>}
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <i className="ri-loader-4-line spin"></i>
                      Inasajili...
                    </>
                  ) : (
                    <>
                      <i className="ri-user-add-line"></i>
                      Jisajili Sasa
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="registration-info">
              <div className="info-card">
                <h3>Karibu Katika USCF TAKWIMU</h3>
                <p>USCF CCT TAKWIMU ni jumuiya ya wanafunzi wa Kikristo inayolenga kuimarisha imani na kutoa huduma kwa jamii.</p>
                
                <div className="membership-benefits">
                  <h4>Faida za Uanachama:</h4>
                  <div className="benefit-item">
                    <i className="ri-team-line"></i>
                    <div>
                      <h5>Ushirika na Jamii</h5>
                      <p>Jumuika na wakristo wengine na ujenge urafiki</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <i className="ri-book-open-line"></i>
                    <div>
                      <h5>Mafundisho ya Kiroho</h5>
                      <p>Pata mafundisho ya kina ya Neno la Mungu</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <i className="ri-service-line"></i>
                    <div>
                      <h5>Fursa za Huduma</h5>
                      <p>Shiriki katika misheni na huduma za kijamii</p>
                    </div>
                  </div>
                </div>

                <div className="quick-info">
                  <h4>Mikutano Yetu:</h4>
                  <p><i className="ri-calendar-line"></i> Jumapili: Ibada kuu</p>
                  <p><i className="ri-time-line"></i> Jumatano: Mafundisho</p>
                  <p><i className="ri-map-pin-line"></i> Chuo cha Takwimu</p>
                </div>
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

export default Registration2;