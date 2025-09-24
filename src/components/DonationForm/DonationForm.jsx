import React, { useState } from 'react';
import './DonationForm.css';

const DonationForm = () => {
  const [formData, setFormData] = useState({
    donor_name: '',
    email: '',
    phone: '',
    amount: '',
    payment_method: 'mobile',
    frequency: 'one-time',
    anonymous: false,
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const presetAmounts = [10000, 20000, 50000, 100000, 0];
  const paymentMethods = [
    { value: 'mobile', label: 'Malipo ya Simu', icon: 'ri-smartphone-line' },
    { value: 'bank', label: 'Benki', icon: 'ri-bank-line' },
    { value: 'cash', label: 'Fedha Taslimu', icon: 'ri-money-dollar-circle-line' }
  ];
  const frequencies = [
    { value: 'one-time', label: 'Mara Moja' },
    { value: 'monthly', label: 'Kila Mwezi' },
    { value: 'quarterly', label: 'Kila Robo Mwaka' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const setAmount = (amount) => {
    setFormData({
      ...formData,
      amount: amount === 0 ? '' : amount.toString()
    });
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.amount) {
        newErrors.amount = 'Tafadhali weka kiasi cha michango';
      } else if (parseInt(formData.amount) < 1000) {
        newErrors.amount = 'Kiasi kiwe angalau TZS 1,000';
      }

      if (!formData.frequency) {
        newErrors.frequency = 'Tafadhali chagua marudio ya mchango';
      }
    }

    if (step === 2) {
      if (!formData.donor_name.trim() && !formData.anonymous) {
        newErrors.donor_name = 'Jina linahitajika isipokuwa unataka kukaa anonymous';
      }

      if (!formData.anonymous) {
        if (!formData.phone.trim()) {
          newErrors.phone = 'Namba ya simu inahitajika';
        } else if (!/^(\+255|0)[0-9]{9}$/.test(formData.phone.replace(/\s/g, ''))) {
          newErrors.phone = 'Tafadhali weka namba sahihi';
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Barua pepe si sahihi';
        }
      }
    }

    if (step === 3) {
      if (!formData.payment_method) {
        newErrors.payment_method = 'Tafadhali chagua njia ya malipo';
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

    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setFormData({
          donor_name: '',
          email: '',
          phone: '',
          amount: '',
          payment_method: 'mobile',
          frequency: 'one-time',
          anonymous: false,
          message: ''
        });
        setCurrentStep(1);
        setShowSuccess(false);
      }, 5000);
    }, 3000);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('sw-TZ', {
      style: 'currency',
      currency: 'TZS'
    }).format(amount);
  };

  if (showSuccess) {
    return (
      <div className="donation-success">
        <div className="success-content">
          <div className="success-animation">
            <div className="success-icon">
              <i className="ri-heart-fill"></i>
            </div>
            <h2>Asante Kwa Mchango Wako!</h2>
            <p>Mchango wako wa {formatAmount(parseInt(formData.amount))} umepokelewa kikamilifu.</p>
            
            <div className="donation-details">
              <div className="detail-item">
                <span>Kiasi:</span>
                <strong>{formatAmount(parseInt(formData.amount))}</strong>
              </div>
              <div className="detail-item">
                <span>Marudio:</span>
                <strong>{frequencies.find(f => f.value === formData.frequency)?.label}</strong>
              </div>
              {!formData.anonymous && (
                <div className="detail-item">
                  <span>Jina:</span>
                  <strong>{formData.donor_name}</strong>
                </div>
              )}
            </div>

            <div className="success-message">
              <p>Mchango wako utasaidia kuendeleza huduma za USCF CCT TAKWIMU na misheni yetu.</p>
            </div>

            <button 
              className="back-to-donate-btn"
              onClick={() => setShowSuccess(false)}
            >
              <i className="ri-heart-line"></i>
              Toa Mchango Mwingine
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="donation-form-container">
      <div className="donation-header">
        <h2>Toa Mchango Wako</h2>
        <p>Usaidie kuendeleza huduma za USCF CCT TAKWIMU</p>
      </div>

      {/* Progress Steps */}
      <div className="donation-progress">
        <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
          <div className="step-number">1</div>
          <span>Kiasi</span>
        </div>
        <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
          <div className="step-number">2</div>
          <span>Taarifa</span>
        </div>
        <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <span>Malipo</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="donation-form">
        {/* Step 1: Amount Selection */}
        {currentStep === 1 && (
          <div className="form-step active">
            <div className="step-header">
              <h3>Chagua Kiasi cha Mchango</h3>
              <p>Chagua kiasi unachotaka kuchangia</p>
            </div>

            <div className="amount-selection">
              <div className="preset-amounts">
                {presetAmounts.map((amount, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`amount-btn ${formData.amount === amount.toString() ? 'selected' : ''} ${amount === 0 ? 'custom' : ''}`}
                    onClick={() => setAmount(amount)}
                  >
                    {amount === 0 ? (
                      <>Weka Kiasi</>
                    ) : (
                      formatAmount(amount)
                    )}
                  </button>
                ))}
              </div>

              <div className="custom-amount">
                <label htmlFor="amount">Au weka kiasi chako:</label>
                <div className="amount-input">
                  <span className="currency">TZS</span>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="1000"
                    className={errors.amount ? 'error' : ''}
                  />
                </div>
                {errors.amount && <span className="error-message">{errors.amount}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="frequency">
                <i className="ri-repeat-line"></i>
                Mchango wako ni wa:
              </label>
              <div className="radio-group horizontal">
                {frequencies.map((freq) => (
                  <label key={freq.value} className="radio-option">
                    <input
                      type="radio"
                      name="frequency"
                      value={freq.value}
                      checked={formData.frequency === freq.value}
                      onChange={handleInputChange}
                    />
                    <span>{freq.label}</span>
                  </label>
                ))}
              </div>
              {errors.frequency && <span className="error-message">{errors.frequency}</span>}
            </div>

            <div className="form-actions">
              <button type="button" className="btn-next" onClick={nextStep}>
                Endelea
                <i className="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Donor Information */}
        {currentStep === 2 && (
          <div className="form-step active">
            <div className="step-header">
              <h3>Taarifa za Mchangiaji</h3>
              <p>Weka taarifa zako (si lazima kukaa anonymous)</p>
            </div>

            <div className="anonymous-option">
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                Toa mchango kwa anonymous (bila kujulikana)
              </label>
            </div>

            {!formData.anonymous && (
              <>
                <div className="form-group">
                  <label htmlFor="donor_name">
                    <i className="ri-user-line"></i>
                    Jina Lako (Si lazima)
                  </label>
                  <input
                    type="text"
                    id="donor_name"
                    name="donor_name"
                    value={formData.donor_name}
                    onChange={handleInputChange}
                    placeholder="Weka jina lako"
                    className={errors.donor_name ? 'error' : ''}
                  />
                  {errors.donor_name && <span className="error-message">{errors.donor_name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <i className="ri-phone-line"></i>
                    Namba ya Simu
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+255 XXX XXX XXX"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
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

                <div className="form-group">
                  <label htmlFor="message">
                    <i className="ri-message-line"></i>
                    Ujumbe (Si lazima)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Andika ujumbe wako hapa..."
                    rows="3"
                  ></textarea>
                </div>
              </>
            )}

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

        {/* Step 3: Payment Method */}
        {currentStep === 3 && (
          <div className="form-step active">
            <div className="step-header">
              <h3>Chagua Njia ya Malipo</h3>
              <p>Chagua njia unayopendelea kulipa</p>
            </div>

            <div className="donation-summary">
              <h4>Muhtasari wa Mchango Wako:</h4>
              <div className="summary-item">
                <span>Kiasi:</span>
                <strong>{formatAmount(parseInt(formData.amount))}</strong>
              </div>
              <div className="summary-item">
                <span>Marudio:</span>
                <strong>{frequencies.find(f => f.value === formData.frequency)?.label}</strong>
              </div>
              {!formData.anonymous && formData.donor_name && (
                <div className="summary-item">
                  <span>Jina:</span>
                  <strong>{formData.donor_name}</strong>
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Chagua Njia ya Kulipa:</label>
              <div className="payment-methods">
                {paymentMethods.map((method) => (
                  <label key={method.value} className="payment-option">
                    <input
                      type="radio"
                      name="payment_method"
                      value={method.value}
                      checked={formData.payment_method === method.value}
                      onChange={handleInputChange}
                    />
                    <div className="payment-content">
                      <i className={method.icon}></i>
                      <span>{method.label}</span>
                    </div>
                  </label>
                ))}
              </div>
              {errors.payment_method && <span className="error-message">{errors.payment_method}</span>}
            </div>

            {/* Payment Instructions */}
            {formData.payment_method && (
              <div className="payment-instructions">
                <h4>Maelekezo ya Malipo:</h4>
                {formData.payment_method === 'mobile' && (
                  <div className="instructions">
                    <p>Tuma kiasi cha <strong>{formatAmount(parseInt(formData.amount))}</strong> kupitia:</p>
                    <div className="mobile-payments">
                      <div className="mobile-option">
                        <strong>M-Pesa:</strong> 0757 123 456
                      </div>
                      <div className="mobile-option">
                        <strong>Tigo Pesa:</strong> 0657 123 456
                      </div>
                      <div className="mobile-option">
                        <strong>Airtel Money:</strong> 0687 123 456
                      </div>
                    </div>
                  </div>
                )}
                {formData.payment_method === 'bank' && (
                  <div className="instructions">
                    <p>Weka akiba ya <strong>{formatAmount(parseInt(formData.amount))}</strong> kwenye akaunti:</p>
                    <div className="bank-details">
                      <p><strong>Benki:</strong> CRDB Bank</p>
                      <p><strong>Akaunti:</strong> 015235678900</p>
                      <p><strong>Jina:</strong> USCF CCT TAKWIMU</p>
                    </div>
                  </div>
                )}
                {formData.payment_method === 'cash' && (
                  <div className="instructions">
                    <p>Wasiliana na mhasibu wetu kwa mchango wa <strong>{formatAmount(parseInt(formData.amount))}</strong>:</p>
                    <div className="cash-details">
                      <p><strong>Simu:</strong> +255 757 123 456</p>
                      <p><strong>Mahali:</strong> Ofisi za USCF, Chuo cha Takwimu</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="form-actions">
              <button type="button" className="btn-prev" onClick={prevStep}>
                <i className="ri-arrow-left-line"></i>
                Nyuma
              </button>
              <button type="submit" className="btn-submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <i className="ri-loader-4-line spin"></i>
                    Inalipia...
                  </>
                ) : (
                  <>
                    <i className="ri-heart-line"></i>
                    Maliza Mchango
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Donation Info */}
      <div className="donation-info">
        <div className="info-card">
          <h3>Mchango Wako Unasaidia Nini?</h3>
          <div className="impact-list">
            <div className="impact-item">
              <i className="ri-book-open-line"></i>
              <div>
                <h4>Mafundisho ya Biblia</h4>
                <p>Usaidizi wa vitabu na nyenzo za mafundisho</p>
              </div>
            </div>
            <div className="impact-item">
              <i className="ri-globe-line"></i>
              <div>
                <h4>Misheni</h4>
                <p>Usafiri na nyenzo za kuinjilisha</p>
              </div>
            </div>
            <div className="impact-item">
              <i className="ri-community-line"></i>
              <div>
                <h4>Huduma za Jamii</h4>
                <p>Misaada kwa wenye mahitaji</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;