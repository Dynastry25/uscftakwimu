import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import BibleManagement from './pages/BibleManagement';
import QuizManagement from './pages/QuizManagement';
import MemberManagement from './pages/MemberManagement';
import LeaderManagement from './pages/LeaderManagement';
import NewsManagement from './pages/NewsManagement';
import MediaManagement from './pages/MediaManagement';
import EventManagement from './pages/EventManagement';
import FinanceManagement from './pages/FinanceManagement';
import ReportsAnalytics from './pages/ReportsAnalytics';
import Login from './pages/Login';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="app">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onLogout={handleLogout}
        />

        <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bible" element={<BibleManagement />} />
            <Route path="/quiz" element={<QuizManagement />} />
            <Route path="/members" element={<MemberManagement />} />
            <Route path="/leaders" element={<LeaderManagement />} />
            <Route path="/news" element={<NewsManagement />} />
            <Route path="/media" element={<MediaManagement />} />
            <Route path="/finance" element={<FinanceManagement />} />
            <Route path="/reports" element={<ReportsAnalytics />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;