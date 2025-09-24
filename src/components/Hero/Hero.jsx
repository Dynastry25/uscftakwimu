import React, { useState } from "react";
import '../Hero/Hero.css';
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate('/doctors', { state: { search: searchTerm } });
    }
  };

  const handleRegister = () => {
    navigate('/login');
  };

  return (
    <div className="hero">
      <div className="hero-left">
        <h2>TIBA ASILI TANZANIA</h2>
        <div>
          <div className="hero-hand-icon">
            <p>Tunakutanisha Tabibu na Mgonjwa</p> 
          </div>
          <p className="card-title">Pata huduma bora za tiba asili kutoka kwa wataalamu walioidhinishwa kwa magonjwa mbalimbali</p>
        </div>
        <div className="search-container">
          <div className="search-input">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Tafuta mtaalamu wa tiba asili..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
        </div>
        <div className="icon-cont">
          <button className="card-cont" onClick={handleSearch}>
            Tafuta Mtaalamu 
          </button>
          <button className="card-cont secondary" onClick={handleRegister}>
            Jisajili Sasa
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;