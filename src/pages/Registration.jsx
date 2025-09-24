import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import FloatingContact from '../components/FloatingContact/FloatingContact';
import './CSS/Registration.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    member_name: '',
    course: '',
    email: '',
    phone_number: '',
    year_of_study: '',
    department: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const courses = [
    'Diploma ya Takwimu',
    'Diploma ya IT',
    'Bachelor ya Takwimu',
    'Bachelor ya IT',
    'Bachelor ya Uhasibu',
    'Nyingine'
  ];

  const years = ['Mwaka 1', 'Mwaka 2', 'Mwaka 3', 'Mwaka 4'];
  const departments = ['Takwimu', 'Teknolojia ya Habari', 'Uhasibu', 'Usimamizi', 'Nyingine'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.member_name.trim()) {
        newErrors.member_name = 'Jina kamili linahitajika';
      } else if (formData.member_name.trim().length < 3) {
        newErrors.member_name = 'Jina lazima liwe na herufi zaidi ya 2';
      }

      if (!formData.phone_number.trim()) {
        newErrors.phone_number = 'Namba ya simu inahitajika';
      } else if (!/^(\+255|0)[0-9]{9}$/.test(formData.phone_number.replace(/\s/g, ''))) {
        newErrors.phone_number = 'Tafadhali weka namba sahihi (anza na +255 au 0)';
      }
    }

    if (step === 2) {
      if (!formData.course.trim()) {
        newErrors.course = 'Kozi inahitajika';
      }

      if (!formData.year_of_study) {
        newErrors.year_of_study = 'Mwaka wa masomo unahitajika';
      }

      if (!formData.department) {
        newErrors.department = 'Idara inahitajika';
      }

      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Barua pepe si sahihi';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          member_name: '',
          course: '',
          email: '',
          phone_number: '',
          year_of_study: '',
          department: ''
        });
        setCurrentStep(1);
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
              <h1>TWENZETU MISSION</h1>
              <p className="tagline">#SEND ME LORD</p>
            </div>
          </div>

          <div className="container">
            <div className="success-container">
              <div className="success-animation">
                <div className="success-icon">
                  <i className="ri-checkbox-circle-fill"></i>
                </div>
                <h2>Usajili Umekamilika!</h2>
                <p>Asante kwa kujiunga na TWENZETU MISSION. Tutawasiliana nawe hivi karibuni.</p>
                <div className="success-details">
                  <p><strong>Jina:</strong> {formData.member_name}</p>
                  <p><strong>Simu:</strong> {formData.phone_number}</p>
                  <p><strong>Kozi:</strong> {formData.course}</p>
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
        <div className="registration-hero">
          <div className="container">
            <div className="hero-content">
              <h1>TWENZETU MISSION</h1>
              <p className="tagline">#SEND ME LORD</p>
              <div className="hero-stats">
                <div className="stat">
                  <i className="ri-user-heart-line"></i>
                  <span>Jiunge na Misheni</span>
                </div>
                <div className="stat">
                  <i className="ri-globe-line"></i>
                  <span>Tangaza Injili</span>
                </div>
                <div className="stat">
                  <i className="ri-team-line"></i>
                  <span>Jumuika na Wakristo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="registration-section">
            <div className="form-container">
              {/* Progress Steps */}
              <div className="progress-steps">
                <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                  <div className="step-number">1</div>
                  <span>Taarifa Binafsi</span>
                </div>
                <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                  <div className="step-number">2</div>
                  <span>Taarifa za Masomo</span>
                </div>
                <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                  <div className="step-number">3</div>
                  <span>Thibitisha</span>
                </div>
              </div>

              <h2 className="form-title">Jisajili kwa TWENZETU MISSION</h2>
              
              <form onSubmit={handleSubmit} className="registration-form">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="form-step active">
                    <div className="step-header">
                      <h3>Taarifa Binafsi</h3>
                      <p>Weka taarifa zako za msingi</p>
                    </div>

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

                    <div className="form-actions">
                      <button type="button" className="btn-next" onClick={nextStep}>
                        Endelea
                        <i className="ri-arrow-right-line"></i>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Academic Information */}
                {currentStep === 2 && (
                  <div className="form-step active">
                    <div className="step-header">
                      <h3>Taarifa za Masomo</h3>
                      <p>Weka taarifa za kozi na masomo yako</p>
                    </div>

                    <div className="form-group">
                      <label htmlFor="course">
                        <i className="ri-book-line"></i>
                        Chagua Kozi
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

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="year_of_study">
                          <i className="ri-calendar-line"></i>
                          Mwaka wa Masomo
                        </label>
                        <select
                          id="year_of_study"
                          name="year_of_study"
                          value={formData.year_of_study}
                          onChange={handleInputChange}
                          className={errors.year_of_study ? 'error' : ''}
                        >
                          <option value="">Chagua mwaka</option>
                          {years.map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                          ))}
                        </select>
                        {errors.year_of_study && <span className="error-message">{errors.year_of_study}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="department">
                          <i className="ri-building-line"></i>
                          Idara
                        </label>
                        <select
                          id="department"
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          className={errors.department ? 'error' : ''}
                        >
                          <option value="">Chagua idara</option>
                          {departments.map((dept, index) => (
                            <option key={index} value={dept}>{dept}</option>
                          ))}
                        </select>
                        {errors.department && <span className="error-message">{errors.department}</span>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">
                        <i className="ri-mail-line"></i>
                        Barua Pepe (Si lazima)
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="barua@example.com"
                        className={errors.email ? 'error' : ''}
                      />
                      {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-actions">
                      <button type="button" className="btn-prev" onClick={prevStep}>
                        <i className="ri-arrow-left-line"></i>
                        Nyuma
                      </button>
                      <button type="button" className="btn-next" onClick={nextStep}>
                        Endelea
                        <i className="ri-arrow-right-line"></i>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Review and Submit */}
                {currentStep === 3 && (
                  <div className="form-step active">
                    <div className="step-header">
                      <h3>Hakiki Taarifa</h3>
                      <p>Thibitisha taarifa zako kabla ya kutumia</p>
                    </div>

                    <div className="review-section">
                      <div className="review-card">
                        <h4>Taarifa Binafsi</h4>
                        <div className="review-item">
                          <span>Jina Kamili:</span>
                          <strong>{formData.member_name}</strong>
                        </div>
                        <div className="review-item">
                          <span>Namba ya Simu:</span>
                          <strong>{formData.phone_number}</strong>
                        </div>
                        {formData.email && (
                          <div className="review-item">
                            <span>Barua Pepe:</span>
                            <strong>{formData.email}</strong>
                          </div>
                        )}
                      </div>

                      <div className="review-card">
                        <h4>Taarifa za Masomo</h4>
                        <div className="review-item">
                          <span>Kozi:</span>
                          <strong>{formData.course}</strong>
                        </div>
                        <div className="review-item">
                          <span>Mwaka:</span>
                          <strong>{formData.year_of_study}</strong>
                        </div>
                        <div className="review-item">
                          <span>Idara:</span>
                          <strong>{formData.department}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="button" className="btn-prev" onClick={prevStep}>
                        <i className="ri-arrow-left-line"></i>
                        Rekebisha
                      </button>
                      <button type="submit" className="btn-submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <i className="ri-loader-4-line spin"></i>
                            Inasajili...
                          </>
                        ) : (
                          <>
                            <i className="ri-check-line"></i>
                            Thibitisha Usajili
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Side Info */}
            <div className="registration-info">
              <div className="info-card">
                <h3>Kuhusu TWENZETU MISSION</h3>
                <p>TWENZETU MISSION ni juhudi maalum ya kueneza Injili na kuhudumia jamii kupitia vijana wa Kikristo.</p>
                
                <div className="benefits-list">
                  <h4>Faida za Kujiunga:</h4>
                  <ul>
                    <li><i className="ri-check-line"></i> Ujuzi wa kiroho na kiimani</li>
                    <li><i className="ri-check-line"></i> Uongozi na ujuzi wa maisha</li>
                    <li><i className="ri-check-line"></i> Usaidizi wa kijamii na kielimu</li>
                    <li><i className="ri-check-line"></i> Nafasi za kuhudumia katika misheni</li>
                  </ul>
                </div>

                <div className="contact-info">
                  <h4>Maswali? Wasiliana Nasi:</h4>
                  <p><i className="ri-phone-line"></i> +255 755 327 135</p>
                  <p><i className="ri-mail-line"></i> uscftakwimu@gmai.com</p>
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

export default Registration;