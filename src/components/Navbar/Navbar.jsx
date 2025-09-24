import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'
import USCFBarnner from '../assets/USCF CCT TAKWIMU-01.png'

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActiveLink = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link'
  }

  return (
    <nav className={`main-nav ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container-fluid">
        <div className="nav-brand">
            <Link to="/">
              <img src= {USCFBarnner} alt="USCF Logo" className="nav-logo" />
            </Link>
          </div>
        <div className="nav-container">
          
          
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className={isActiveLink('/')}>
                <i className="ri-home-4-line"></i> Nyumbani
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/services" className={isActiveLink('/services')}>
                <i className="ri-service-line"></i> Huduma
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/news" className={isActiveLink('/news')}>
                <i className="ri-newspaper-line"></i> Habari
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className={isActiveLink('/about')}>
                <i className="ri-information-line"></i> Kuhusu
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" 
                 onClick={(e) => {
                   e.preventDefault()
                   setIsDropdownOpen(!isDropdownOpen)
                 }}>
                <i className="ri-admin-line"></i> Utawala
              </a>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li><Link to="/administration" className="dropdown-item">EXCOM</Link></li>
                  <li><a className="dropdown-item" href="/sms.html">Admin</a></li>
                  <li><Link to="/leaders" className="dropdown-item">Viongozi</Link></li>
                </ul>
              )}
            </li>
          </ul>

          <div className="nav-actions">
            <Link to="/donation" className="donate-btn">
              <i className="ri-heart-line"></i> Changia
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar