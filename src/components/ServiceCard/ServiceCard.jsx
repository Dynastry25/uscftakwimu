import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MissionSlider from '../MissionSlider/MissionSlider';
import ImageGallery from './ImageGallery';
import GraduationSlider from './GraduationSlider';
import './ServiceCard.css';

const ServiceCard = ({ service }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <article className={`service-card ${service.isShop ? 'shop-card' : ''}`}>
            {/* Card Header */}
            <div className="service-header">
                <div
                    className="service-icon"
                    style={{
                        backgroundColor: `${getColorByCategory(service.category)}20`,
                        color: getColorByCategory(service.category)
                    }}
                >
                    <i className={service.icon}></i>
                </div>
                <div className="service-title-section">
                    <h3 className="service-title">{service.title}</h3>
                    <span className="service-category">{getCategoryLabel(service.category)}</span>
                </div>
            </div>

            {/* Card Content */}
            <div className="service-content">
                <p className="service-description">{service.description}</p>

                {service.features && service.features.map((feature, index) => {
                    // Handle both string and object features
                    if (typeof feature === 'string') {
                        return (
                            <div key={index} className="feature-item">
                                <i className="ri-checkbox-circle-line"></i>
                                <span>{feature}</span>
                            </div>
                        );
                    } else if (feature && typeof feature === 'object') {
                        return (
                            <div key={index} className="feature-item">
                                <i className={feature.icon || "ri-checkbox-circle-line"}></i>
                                <span>{feature.text || feature}</span>
                            </div>
                        );
                    }
                    return null;
                })}

                {/* Mission Slider */}
                {service.missionSlides && (
                    <div className="mission-section">
                        <MissionSlider slides={service.missionSlides} />
                    </div>
                )}

                {/* Prayer Images Gallery */}
                {service.prayerImages && (
                    <div className="prayer-gallery">
                        <ImageGallery images={service.prayerImages} />
                    </div>
                )}

                {/* Graduation Slider */}
                {service.graduationSlides && (
                    <div className="graduation-section">
                        <GraduationSlider slides={service.graduationSlides} />
                        <div className="graduation-features">
                            {service.features && service.features.map((feature, index) => (
                                <div key={index} className="feature-item">
                                    <i className={feature.icon}></i>
                                    <span>{feature.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Highlights Grid */}
                {service.highlights && (
                    <div className="highlights-grid">
                        {service.highlights.map((highlight, index) => (
                            <div key={index} className="highlight-item">
                                <div className="highlight-icon">
                                    <i className={highlight.icon}></i>
                                </div>
                                <p>{highlight.text}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Seminars List */}
                {service.seminars && (
                    <div className="seminars-list">
                        {service.seminars.map((seminar, index) => (
                            <div key={index} className="seminar-item">
                                <h4>{seminar.title}</h4>
                                <p>{seminar.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Additional Content with Expand/Collapse */}
                {(service.missionContent || service.prayerContent || service.additionalContent) && (
                    <>
                        <div
                            className={`additional-content ${isExpanded ? 'expanded' : ''}`}
                            dangerouslySetInnerHTML={{
                                __html: service.missionContent || service.prayerContent || service.additionalContent
                            }}
                        />

                        <button className="expand-toggle-btn" onClick={toggleExpand}>
                            {isExpanded ? 'Ficha Maelezo' : 'Soma Zaidi'}
                            <i className={`ri-arrow-${isExpanded ? 'up' : 'down'}-s-line`}></i>
                        </button>
                    </>
                )}

                {/* Motto */}
                {service.motto && (
                    <div className="service-motto">
                        <i className="ri-double-quotes-l"></i>
                        {service.motto}
                        <i className="ri-double-quotes-r"></i>
                    </div>
                )}

                {/* Shop Specific Content */}
                {service.isShop && (
                    <div className="shop-content">
                        <p className="shop-slogan">{service.shopSlogan}</p>
                        <Link to="/shop" className="shop-button">
                            Nunua Sasa <i className="ri-shopping-cart-line"></i>
                        </Link>
                    </div>
                )}
            </div>

            {/* Card Footer */}
            <div className="service-footer">
                <button className="service-action-btn">
                    <i className="ri-information-line"></i>
                    Pata Maelezo Zaidi
                </button>
                <div className="service-meta">
                    <span className="service-duration">
                        <i className="ri-time-line"></i>
                        Huduma ya Kila Wiki
                    </span>
                </div>
            </div>
        </article>
    );
};

// Helper functions
const getColorByCategory = (category) => {
    const colors = {
        spiritual: '#4caf50',
        mission: '#ff6b35',
        academic: '#2196f3',
        community: '#e91e63',
        educational: '#9c27b0',
        commercial: '#ff9800',
        default: '#1a237e'
    };
    return colors[category] || colors.default;
};

const getCategoryLabel = (category) => {
    const labels = {
        spiritual: 'Huduma ya Kiroho',
        mission: 'Uinjilisti',
        academic: 'Kielimu',
        community: 'Huduma ya Jamii',
        educational: 'Elimu',
        commercial: 'Biashara',
        default: 'Huduma'
    };
    return labels[category] || labels.default;
};

export default ServiceCard;