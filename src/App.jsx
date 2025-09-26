
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import News from './pages/News';
import Administration from './pages/Administration';
import Donation from './pages/Donation';
import Registration from './pages/Registration';
import Registration2 from './pages/Registration2';
import Quiz from './pages/Quiz';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './App.css'

function App() {
  return (
     <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/news" element={<News />} />
            <Route path="/administration" element={<Administration />} />
            <Route path="/donation" element={<Donation />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/registration2" element={<Registration2 />} />
            <Route path="/quiz" element={<Quiz />} />
            
            {/* Fallback route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;