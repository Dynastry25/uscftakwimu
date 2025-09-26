import React, { useState, useEffect } from 'react';
import './ReportsAnalytics.css';

const ReportsAnalytics = () => {
  const [activeReport, setActiveReport] = useState('overview');
  const [timeRange, setTimeRange] = useState('monthly');
  const [reportData, setReportData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const timeRanges = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const reports = [
    { id: 'overview', label: 'Overview', icon: 'ri-dashboard-line' },
    { id: 'finance', label: 'Finance', icon: 'ri-money-dollar-box-line' },
    { id: 'members', label: 'Members', icon: 'ri-team-line' },
    { id: 'events', label: 'Events', icon: 'ri-calendar-event-line' },
    { id: 'activities', label: 'Activities', icon: 'ri-line-chart-line' }
  ];

  useEffect(() => {
    fetchReportData();
  }, [activeReport, timeRange]);

  const fetchReportData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/reports/${activeReport}?range=${timeRange}`);
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
    setIsLoading(false);
  };

  const generateFinanceReport = () => {
    // Simulate finance report data
    return {
      totalIncome: 2500000,
      totalExpenses: 1800000,
      netBalance: 700000,
      topIncomeSources: [
        { name: 'Donations', amount: 1200000, percentage: 48 },
        { name: 'Events', amount: 800000, percentage: 32 },
        { name: 'Membership', amount: 500000, percentage: 20 }
      ],
      expenseCategories: [
        { name: 'Events', amount: 800000, percentage: 44 },
        { name: 'Operations', amount: 600000, percentage: 33 },
        { name: 'Salaries', amount: 400000, percentage: 23 }
      ],
      monthlyTrend: [
        { month: 'Jan', income: 200000, expenses: 150000 },
        { month: 'Feb', income: 300000, expenses: 180000 },
        { month: 'Mar', income: 400000, expenses: 220000 },
        { month: 'Apr', income: 350000, expenses: 250000 },
        { month: 'May', income: 500000, expenses: 300000 },
        { month: 'Jun', income: 450000, expenses: 280000 }
      ]
    };
  };

  const generateMembersReport = () => {
    return {
      totalMembers: 86,
      activeMembers: 60,
      newMembersThisMonth: 5,
      membershipGrowth: 12.5,
      departmentBreakdown: [
        { name: 'Kwaya', count: 25, percentage: 29 },
        { name: 'Uinjilisti', count: 20, percentage: 23 },
        { name: 'Maombi', count: 15, percentage: 17 },
        { name: 'IT', count: 10, percentage: 12 },
        { name: 'Others', count: 16, percentage: 19 }
      ]
    };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('sw-TZ', {
      style: 'currency',
      currency: 'TZS'
    }).format(amount);
  };

  const renderFinanceReport = () => {
    const data = generateFinanceReport();
    
    return (
      <div className="finance-report">
        <div className="report-summary">
          <div className="summary-item">
            <h3>Total Income</h3>
            <p className="amount income">{formatCurrency(data.totalIncome)}</p>
          </div>
          <div className="summary-item">
            <h3>Total Expenses</h3>
            <p className="amount expense">{formatCurrency(data.totalExpenses)}</p>
          </div>
          <div className="summary-item">
            <h3>Net Balance</h3>
            <p className="amount balance">{formatCurrency(data.netBalance)}</p>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h4>Income Sources</h4>
            <div className="chart-container">
              {data.topIncomeSources.map((source, index) => (
                <div key={index} className="chart-item">
                  <div className="chart-label">
                    <span>{source.name}</span>
                    <span>{formatCurrency(source.amount)}</span>
                  </div>
                  <div className="chart-bar">
                    <div 
                      className="bar-fill income"
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                  <span className="percentage">{source.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="chart-card">
            <h4>Expense Categories</h4>
            <div className="chart-container">
              {data.expenseCategories.map((category, index) => (
                <div key={index} className="chart-item">
                  <div className="chart-label">
                    <span>{category.name}</span>
                    <span>{formatCurrency(category.amount)}</span>
                  </div>
                  <div className="chart-bar">
                    <div 
                      className="bar-fill expense"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <span className="percentage">{category.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMembersReport = () => {
    const data = generateMembersReport();
    
    return (
      <div className="members-report">
        <div className="report-summary">
          <div className="summary-item">
            <h3>Total Members</h3>
            <p className="count total">{data.totalMembers}</p>
          </div>
          <div className="summary-item">
            <h3>Active Members</h3>
            <p className="count active">{data.activeMembers}</p>
          </div>
          <div className="summary-item">
            <h3>New This Month</h3>
            <p className="count new">{data.newMembersThisMonth}</p>
          </div>
          <div className="summary-item">
            <h3>Growth Rate</h3>
            <p className="count growth">+{data.membershipGrowth}%</p>
          </div>
        </div>

        <div className="department-chart">
          <h4>Department Breakdown</h4>
          <div className="chart-container">
            {data.departmentBreakdown.map((dept, index) => (
              <div key={index} className="department-item">
                <div className="dept-info">
                  <span className="dept-name">{dept.name}</span>
                  <span className="dept-count">{dept.count} members</span>
                </div>
                <div className="dept-bar">
                  <div 
                    className="dept-fill"
                    style={{ width: `${dept.percentage}%` }}
                  ></div>
                </div>
                <span className="dept-percentage">{dept.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderReportContent = () => {
    if (isLoading) {
      return (
        <div className="loading-state">
          <i className="ri-loader-4-line spin"></i>
          <p>Generating report...</p>
        </div>
      );
    }

    switch (activeReport) {
      case 'finance':
        return renderFinanceReport();
      case 'members':
        return renderMembersReport();
      case 'overview':
      case 'events':
      case 'activities':
      default:
        return (
          <div className="default-report">
            <div className="report-placeholder">
              <i className="ri-bar-chart-box-line"></i>
              <h3>Comprehensive Analytics</h3>
              <p>Detailed reports and insights for {activeReport} will be displayed here.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="reports-analytics">
      <div className="page-header">
        <h1>Reports & Analytics</h1>
        <div className="header-controls">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-range-select"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <button className="btn-primary">
            <i className="ri-download-line"></i>
            Export Report
          </button>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="reports-nav">
        {reports.map(report => (
          <button
            key={report.id}
            className={`report-tab ${activeReport === report.id ? 'active' : ''}`}
            onClick={() => setActiveReport(report.id)}
          >
            <i className={report.icon}></i>
            {report.label}
          </button>
        ))}
      </div>

      {/* Report Content */}
      <div className="report-content">
        {renderReportContent()}
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-card">
          <i className="ri-user-line"></i>
          <div>
            <h3>86</h3>
            <p>Total Members</p>
          </div>
        </div>
        <div className="stat-card">
          <i className="ri-money-dollar-circle-line"></i>
          <div>
            <h3>2.5M</h3>
            <p>Total Income</p>
          </div>
        </div>
        <div className="stat-card">
          <i className="ri-calendar-check-line"></i>
          <div>
            <h3>24</h3>
            <p>Events This Month</p>
          </div>
        </div>
        <div className="stat-card">
          <i className="ri-growth-line"></i>
          <div>
            <h3>+12.5%</h3>
            <p>Member Growth</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;