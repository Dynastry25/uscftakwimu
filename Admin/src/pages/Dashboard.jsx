import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    members: 0,
    leaders: 0,
    news: 0,
    events: 0,
    bibleVerses: 0,
    quizzes: 0,
    income: 0,
    expenses: 0,
    balance: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [financeData, setFinanceData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Simulate API calls
      const statsResponse = await fetch('/api/admin/stats');
      const activitiesResponse = await fetch('/api/admin/activities');
      const financeResponse = await fetch('/api/finance/summary');
      
      const statsData = await statsResponse.json();
      const activitiesData = await activitiesResponse.json();
      const financeData = await financeResponse.json();
      
      setStats(statsData);
      setRecentActivities(activitiesData);
      setFinanceData(financeData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
    setIsLoading(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('sw-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getActivityIcon = (type) => {
    const icons = {
      member: 'ri-user-add-line',
      news: 'ri-newspaper-line',
      event: 'ri-calendar-event-line',
      finance: 'ri-money-dollar-circle-line',
      bible: 'ri-book-line',
      quiz: 'ri-questionnaire-line'
    };
    return icons[type] || 'ri-notification-line';
  };

  const getActivityColor = (type) => {
    const colors = {
      member: '#4CAF50',
      news: '#FF9800',
      event: '#9C27B0',
      finance: '#2196F3',
      bible: '#F44336',
      quiz: '#607D8B'
    };
    return colors[type] || '#6C757D';
  };

  // Sample finance chart data
  const financeChartData = [
    { month: 'Jan', income: 500000, expenses: 350000 },
    { month: 'Feb', income: 750000, expenses: 450000 },
    { month: 'Mar', income: 600000, expenses: 400000 },
    { month: 'Apr', income: 900000, expenses: 600000 },
    { month: 'May', income: 800000, expenses: 550000 },
    { month: 'Jun', income: 1200000, expenses: 800000 }
  ];

  const maxValue = Math.max(...financeChartData.map(d => Math.max(d.income, d.expenses)));

  if (isLoading) {
    return (
      <div className="dashboard">
        <div className="loading-state">
          <i className="ri-loader-4-line spin"></i>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>USCF CCT TAKWIMU Dashboard</h1>
          <p>Welcome to your admin panel. Here's an overview of your organization's activities.</p>
        </div>
        <div className="header-actions">
          <button className="btn-refresh" onClick={fetchDashboardData}>
            <i className="ri-refresh-line"></i>
            Refresh Data
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon members">
            <i className="ri-team-line"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.members}</h3>
            <p>Total Members</p>
            <span className="stat-change positive">+5 this month</span>
          </div>
          <Link to="/members" className="stat-link">
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        <div className="stat-card">
          <div className="stat-icon leaders">
            <i className="ri-user-star-line"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.leaders}</h3>
            <p>Leaders</p>
            <span className="stat-change">Active</span>
          </div>
          <Link to="/leaders" className="stat-link">
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        <div className="stat-card">
          <div className="stat-icon news">
            <i className="ri-newspaper-line"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.news}</h3>
            <p>News Posts</p>
            <span className="stat-change positive">+2 new</span>
          </div>
          <Link to="/news" className="stat-link">
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        <div className="stat-card">
          <div className="stat-icon events">
            <i className="ri-calendar-event-line"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.events}</h3>
            <p>Upcoming Events</p>
            <span className="stat-change">This month</span>
          </div>
          <Link to="/events" className="stat-link">
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        <div className="stat-card">
          <div className="stat-icon bible">
            <i className="ri-book-line"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.bibleVerses}</h3>
            <p>Bible Verses</p>
            <span className="stat-change">Active</span>
          </div>
          <Link to="/bible" className="stat-link">
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        <div className="stat-card">
          <div className="stat-icon quiz">
            <i className="ri-questionnaire-line"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.quizzes}</h3>
            <p>Quiz Questions</p>
            <span className="stat-change">Available</span>
          </div>
          <Link to="/quiz" className="stat-link">
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        {/* Finance Stats */}
        <div className="stat-card finance-income">
          <div className="stat-icon">
            <i className="ri-money-dollar-circle-line"></i>
          </div>
          <div className="stat-content">
            <h3>{formatCurrency(stats.income)}</h3>
            <p>Total Income</p>
            <span className="stat-change positive">+15% growth</span>
          </div>
          <Link to="/finance" className="stat-link">
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        <div className="stat-card finance-expense">
          <div className="stat-icon">
            <i className="ri-money-dollar-box-line"></i>
          </div>
          <div className="stat-content">
            <h3>{formatCurrency(stats.expenses)}</h3>
            <p>Total Expenses</p>
            <span className="stat-change">Managed</span>
          </div>
          <Link to="/finance" className="stat-link">
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        <div className="stat-card finance-balance">
          <div className="stat-icon">
            <i className="ri-bank-card-line"></i>
          </div>
          <div className="stat-content">
            <h3 className={stats.balance >= 0 ? 'positive' : 'negative'}>
              {formatCurrency(stats.balance)}
            </h3>
            <p>Current Balance</p>
            <span className={`stat-change ${stats.balance >= 0 ? 'positive' : 'negative'}`}>
              {stats.balance >= 0 ? 'Surplus' : 'Deficit'}
            </span>
          </div>
          <Link to="/finance" className="stat-link">
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </div>

      {/* Charts and Analytics Section */}
      <div className="analytics-section">
        <div className="finance-chart">
          <div className="chart-header">
            <h3>Finance Overview (Last 6 Months)</h3>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color income"></span>
                <span>Income</span>
              </div>
              <div className="legend-item">
                <span className="legend-color expense"></span>
                <span>Expenses</span>
              </div>
            </div>
          </div>
          <div className="chart-container">
            <div className="chart-bars">
              {financeChartData.map((data, index) => (
                <div key={index} className="bar-group">
                  <div className="bar-label">{data.month}</div>
                  <div className="bars-container">
                    <div 
                      className="bar income-bar"
                      style={{ height: `${(data.income / maxValue) * 100}%` }}
                      title={`Income: ${formatCurrency(data.income)}`}
                    ></div>
                    <div 
                      className="bar expense-bar"
                      style={{ height: `${(data.expenses / maxValue) * 100}%` }}
                      title={`Expenses: ${formatCurrency(data.expenses)}`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="quick-stats">
          <h3>Quick Insights</h3>
          <div className="insights-grid">
            <div className="insight-card">
              <i className="ri-user-heart-line" style={{ color: '#4CAF50' }}></i>
              <div>
                <h4>Member Engagement</h4>
                <p>85% active participation rate</p>
              </div>
            </div>
            <div className="insight-card">
              <i className="ri-calendar-check-line" style={{ color: '#9C27B0' }}></i>
              <div>
                <h4>Event Attendance</h4>
                <p>Average 45 attendees per event</p>
              </div>
            </div>
            <div className="insight-card">
              <i className="ri-growth-line" style={{ color: '#2196F3' }}></i>
              <div>
                <h4>Growth Trend</h4>
                <p>12.5% membership growth this year</p>
              </div>
            </div>
            <div className="insight-card">
              <i className="ri-funds-line" style={{ color: '#FF9800' }}></i>
              <div>
                <h4>Financial Health</h4>
                <p>Positive balance for 6 consecutive months</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="dashboard-bottom">
        <div className="recent-activities">
          <div className="section-header">
            <h3>Recent Activities</h3>
            <Link to="/reports" className="view-all">View All Reports</Link>
          </div>
          <div className="activities-list">
            {recentActivities.slice(0, 6).map((activity, index) => (
              <div key={index} className="activity-item">
                <div 
                  className="activity-icon"
                  style={{ backgroundColor: getActivityColor(activity.type) }}
                >
                  <i className={getActivityIcon(activity.type)}></i>
                </div>
                <div className="activity-content">
                  <p className="activity-title">{activity.title}</p>
                  <span className="activity-time">
                    {formatDate(activity.date)} • {activity.user}
                  </span>
                </div>
                <span className="activity-badge">{activity.type}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions">
          <div className="section-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="actions-grid">
            <Link to="/finance" className="action-card">
              <div className="action-icon" style={{ background: 'linear-gradient(135deg, #28a745, #20c997)' }}>
                <i className="ri-money-dollar-circle-line"></i>
              </div>
              <h4>Add Income</h4>
              <p>Record new income transaction</p>
            </Link>

            <Link to="/finance" className="action-card">
              <div className="action-icon" style={{ background: 'linear-gradient(135deg, #dc3545, #e83e8c)' }}>
                <i className="ri-money-dollar-box-line"></i>
              </div>
              <h4>Add Expense</h4>
              <p>Record new expense transaction</p>
            </Link>

            <Link to="/members" className="action-card">
              <div className="action-icon" style={{ background: 'linear-gradient(135deg, #007bff, #6610f2)' }}>
                <i className="ri-user-add-line"></i>
              </div>
              <h4>Add Member</h4>
              <p>Register new member</p>
            </Link>

            <Link to="/events" className="action-card">
              <div className="action-icon" style={{ background: 'linear-gradient(135deg, #6f42c1, #e83e8c)' }}>
                <i className="ri-calendar-event-line"></i>
              </div>
              <h4>Create Event</h4>
              <p>Schedule new event</p>
            </Link>

            <Link to="/news" className="action-card">
              <div className="action-icon" style={{ background: 'linear-gradient(135deg, #fd7e14, #ffc107)' }}>
                <i className="ri-newspaper-line"></i>
              </div>
              <h4>Post News</h4>
              <p>Publish news article</p>
            </Link>

            <Link to="/reports" className="action-card">
              <div className="action-icon" style={{ background: 'linear-gradient(135deg, #20c997, #28a745)' }}>
                <i className="ri-bar-chart-line"></i>
              </div>
              <h4>Generate Report</h4>
              <p>Create analytics report</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;