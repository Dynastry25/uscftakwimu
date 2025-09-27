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
    try {
      const token = localStorage.getItem('adminToken');
      
      const [statsRes, activitiesRes, financeRes] = await Promise.all([
        fetch('/api/admin/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/admin/activities', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/finance/summary', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      const statsData = await statsRes.json();
      const activitiesData = await activitiesRes.json();
      const financeData = await financeRes.json();

      setStats(statsData);
      setRecentActivities(activitiesData);
      setFinanceData(financeData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('sw-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Dashboard Overview</h1>
          <p>Welcome back! Here's what's happening with USCF CCT TAKWIMU today.</p>
        </div>
        <div className="header-actions">
          <button className="btn-refresh" onClick={fetchDashboardData}>
            <i className="ri-refresh-line"></i>
            Refresh
          </button>
          <div className="date-display">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          icon="ri-team-line"
          title="Total Members"
          value={stats.members}
          change="+5 this month"
          changeType="positive"
          link="/members"
          color="#4CAF50"
        />
        
        <StatCard
          icon="ri-user-star-line"
          title="Leaders"
          value={stats.leaders}
          change="Active"
          link="/leaders"
          color="#2196F3"
        />

        <StatCard
          icon="ri-newspaper-line"
          title="News Posts"
          value={stats.news}
          change="+2 new"
          changeType="positive"
          link="/news"
          color="#FF9800"
        />

        <StatCard
          icon="ri-calendar-event-line"
          title="Upcoming Events"
          value={stats.events}
          change="This month"
          link="/events"
          color="#9C27B0"
        />

        <StatCard
          icon="ri-money-dollar-circle-line"
          title="Total Income"
          value={formatCurrency(stats.income)}
          change="+15% growth"
          changeType="positive"
          link="/finance"
          color="#28a745"
        />

        <StatCard
          icon="ri-money-dollar-box-line"
          title="Total Expenses"
          value={formatCurrency(stats.expenses)}
          change="Managed"
          link="/finance"
          color="#dc3545"
        />

        <StatCard
          icon="ri-bank-card-line"
          title="Current Balance"
          value={formatCurrency(stats.balance)}
          change={stats.balance >= 0 ? 'Surplus' : 'Deficit'}
          changeType={stats.balance >= 0 ? 'positive' : 'negative'}
          link="/finance"
          color="#007bff"
        />
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="finance-chart">
          <h3>Financial Overview</h3>
          <FinanceChart data={financeData.monthlyTrend} />
        </div>
        
        <div className="quick-stats">
          <h3>Quick Insights</h3>
          <div className="insights-grid">
            <InsightCard
              icon="ri-user-heart-line"
              title="Member Engagement"
              value="85%"
              description="active participation rate"
              color="#4CAF50"
            />
            <InsightCard
              icon="ri-calendar-check-line"
              title="Event Attendance"
              value="45"
              description="average attendees"
              color="#9C27B0"
            />
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="recent-section">
        <div className="section-header">
          <h3>Recent Activities</h3>
          <Link to="/reports" className="view-all">View All</Link>
        </div>
        <ActivityList activities={recentActivities} />
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, title, value, change, changeType, link, color }) => (
  <div className="stat-card" style={{ borderLeftColor: color }}>
    <div className="stat-icon" style={{ backgroundColor: color }}>
      <i className={icon}></i>
    </div>
    <div className="stat-content">
      <h3>{value}</h3>
      <p>{title}</p>
      <span className={`stat-change ${changeType}`}>{change}</span>
    </div>
    <Link to={link} className="stat-link">
      <i className="ri-arrow-right-line"></i>
    </Link>
  </div>
);

// Finance Chart Component
const FinanceChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="no-data">No financial data available</div>;
  }

  const maxValue = Math.max(...data.map(d => Math.max(d.income, d.expenses)));

  return (
    <div className="chart-container">
      <div className="chart-bars">
        {data.map((item, index) => (
          <div key={index} className="bar-group">
            <div className="bar-label">{item._id.month}/{item._id.year}</div>
            <div className="bars">
              <div 
                className="bar income" 
                style={{ height: `${(item.income / maxValue) * 100}%` }}
              ></div>
              <div 
                className="bar expense" 
                style={{ height: `${(item.expenses / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Insight Card Component
const InsightCard = ({ icon, title, value, description, color }) => (
  <div className="insight-card">
    <div className="insight-icon" style={{ color }}>
      <i className={icon}></i>
    </div>
    <div className="insight-content">
      <h4>{title}</h4>
      <div className="insight-value">{value}</div>
      <p>{description}</p>
    </div>
  </div>
);

// Activity List Component
const ActivityList = ({ activities }) => (
  <div className="activity-list">
    {activities.slice(0, 5).map((activity, index) => (
      <div key={index} className="activity-item">
        <div className="activity-icon">
          <i className={getActivityIcon(activity.type)}></i>
        </div>
        <div className="activity-content">
          <p>{activity.description}</p>
          <span>{new Date(activity.timestamp).toLocaleDateString()}</span>
        </div>
      </div>
    ))}
  </div>
);

const getActivityIcon = (type) => {
  const icons = {
    member: 'ri-user-add-line',
    finance: 'ri-money-dollar-circle-line',
    event: 'ri-calendar-event-line',
    news: 'ri-newspaper-line'
  };
  return icons[type] || 'ri-notification-line';
};

export default Dashboard;