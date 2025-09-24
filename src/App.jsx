import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import News from './pages/News';
import Administration from './pages/Administration';
import Donation from './pages/Donation';
import Quiz from './pages/Quiz';
import Registration from './pages/Registration';
import Registration2 from './pages/Registration2';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/news" element={<News />} />
          <Route path="/administration" element={<Administration />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/registration2" element={<Registration2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;