import React, { useState, useEffect } from 'react';
import './FinanceManagement.css';

const FinanceManagement = () => {
  const [activeTab, setActiveTab] = useState('income');
  const [incomeRecords, setIncomeRecords] = useState([]);
  const [expenseRecords, setExpenseRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formData, setFormData] = useState({
    type: 'income',
    date: '',
    name: '',
    paymentMethod: 'M-pesa',
    amount: '',
    event: '',
    reason: '',
    transactionFee: '0'
  });

  const paymentMethods = ['M-pesa', 'Mix by Yas', 'Bank', 'Cash'];
  const events = [
    'Mahafali', 'Misheni', 'Ibada', 'Mafundisho', 'Matengenezo', 
    'Vifaa', 'Mshahara', 'Usafiri', 'Nyingine'
  ];

  useEffect(() => {
    fetchFinanceData();
  }, [activeTab]);

  const fetchFinanceData = async () => {
    try {
      // Simulate API calls
      const incomeResponse = await fetch('/api/finance/income');
      const expenseResponse = await fetch('/api/finance/expenses');
      
      const incomeData = await incomeResponse.json();
      const expenseData = await expenseResponse.json();
      
      setIncomeRecords(incomeData);
      setExpenseRecords(expenseData);
    } catch (error) {
      console.error('Error fetching finance data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingRecord 
        ? `/api/finance/${editingRecord.id}`
        : '/api/finance';
      
      const method = editingRecord ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setShowForm(false);
        setEditingRecord(null);
        setFormData({
          type: 'income',
          date: '',
          name: '',
          paymentMethod: 'M-pesa',
          amount: '',
          event: '',
          reason: '',
          transactionFee: '0'
        });
        fetchFinanceData();
      }
    } catch (error) {
      console.error('Error saving finance record:', error);
    }
  };

  const handleEdit = (record, type) => {
    setEditingRecord(record);
    setFormData({
      type: type,
      date: record.date,
      name: record.name,
      paymentMethod: record.paymentMethod,
      amount: record.amount,
      event: record.event,
      reason: record.reason,
      transactionFee: record.transactionFee || '0'
    });
    setShowForm(true);
  };

  const handleDelete = async (id, type) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await fetch(`/api/finance/${id}`, { method: 'DELETE' });
        fetchFinanceData();
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    }
  };

  const calculateTotals = (records) => {
    return records.reduce((total, record) => total + parseFloat(record.amount), 0);
  };

  const incomeTotal = calculateTotals(incomeRecords);
  const expenseTotal = calculateTotals(expenseRecords);
  const balance = incomeTotal - expenseTotal;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('sw-TZ', {
      style: 'currency',
      currency: 'TZS'
    }).format(amount);
  };

  return (
    <div className="finance-management">
      <div className="page-header">
        <h1>Finance Management</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <i className="ri-add-line"></i>
          Add New Record
        </button>
      </div>

      {/* Finance Summary */}
      <div className="finance-summary">
        <div className="summary-card income">
          <div className="summary-icon">
            <i className="ri-money-dollar-circle-line"></i>
          </div>
          <div className="summary-content">
            <h3>Total Income</h3>
            <p className="amount">{formatCurrency(incomeTotal)}</p>
          </div>
        </div>

        <div className="summary-card expense">
          <div className="summary-icon">
            <i className="ri-money-dollar-box-line"></i>
          </div>
          <div className="summary-content">
            <h3>Total Expenses</h3>
            <p className="amount">{formatCurrency(expenseTotal)}</p>
          </div>
        </div>

        <div className="summary-card balance">
          <div className="summary-icon">
            <i className="ri-bank-card-line"></i>
          </div>
          <div className="summary-content">
            <h3>Current Balance</h3>
            <p className={`amount ${balance >= 0 ? 'positive' : 'negative'}`}>
              {formatCurrency(balance)}
            </p>
          </div>
        </div>
      </div>

      {/* Finance Tabs */}
      <div className="finance-tabs">
        <button 
          className={`tab-btn ${activeTab === 'income' ? 'active' : ''}`}
          onClick={() => setActiveTab('income')}
        >
          <i className="ri-arrow-up-circle-line"></i>
          Income Records
          <span className="count">{incomeRecords.length}</span>
        </button>
        
        <button 
          className={`tab-btn ${activeTab === 'expenses' ? 'active' : ''}`}
          onClick={() => setActiveTab('expenses')}
        >
          <i className="ri-arrow-down-circle-line"></i>
          Expense Records
          <span className="count">{expenseRecords.length}</span>
        </button>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingRecord ? 'Edit Record' : 'Add New Record'}</h2>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowForm(false);
                  setEditingRecord(null);
                  setFormData({
                    type: 'income',
                    date: '',
                    name: '',
                    paymentMethod: 'M-pesa',
                    amount: '',
                    event: '',
                    reason: '',
                    transactionFee: '0'
                  });
                }}
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Record Type:</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    required
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Date:</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Name/Description:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter name or description"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Payment Method:</label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                    required
                  >
                    {paymentMethods.map(method => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Amount (TZS):</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>
              </div>

              {formData.type === 'expense' && (
                <div className="form-group">
                  <label>Transaction Fee (TZS):</label>
                  <input
                    type="number"
                    value={formData.transactionFee}
                    onChange={(e) => setFormData({...formData, transactionFee: e.target.value})}
                    placeholder="0"
                    min="0"
                  />
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label>Event:</label>
                  <select
                    value={formData.event}
                    onChange={(e) => setFormData({...formData, event: e.target.value})}
                    required
                  >
                    <option value="">Select Event</option>
                    {events.map(event => (
                      <option key={event} value={event}>{event}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Reason/Purpose:</label>
                  <input
                    type="text"
                    value={formData.reason}
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                    placeholder="Enter reason or purpose"
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingRecord ? 'Update Record' : 'Add Record'}
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => {
                    setShowForm(false);
                    setEditingRecord(null);
                    setFormData({
                      type: 'income',
                      date: '',
                      name: '',
                      paymentMethod: 'M-pesa',
                      amount: '',
                      event: '',
                      reason: '',
                      transactionFee: '0'
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Records Table */}
      <div className="finance-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Payment Method</th>
              <th>Amount</th>
              <th>Event</th>
              <th>Reason</th>
              {activeTab === 'expenses' && <th>Transaction Fee</th>}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(activeTab === 'income' ? incomeRecords : expenseRecords).map((record) => (
              <tr key={record.id}>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>{record.name}</td>
                <td>
                  <span className={`payment-method ${record.paymentMethod.toLowerCase()}`}>
                    {record.paymentMethod}
                  </span>
                </td>
                <td className="amount-cell">
                  <span className={activeTab === 'income' ? 'income-amount' : 'expense-amount'}>
                    {formatCurrency(record.amount)}
                  </span>
                </td>
                <td>{record.event}</td>
                <td>{record.reason}</td>
                {activeTab === 'expenses' && (
                  <td>{record.transactionFee ? formatCurrency(record.transactionFee) : '-'}</td>
                )}
                <td className="actions">
                  <button 
                    className="btn-edit"
                    onClick={() => handleEdit(record, activeTab)}
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(record.id, activeTab)}
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(activeTab === 'income' ? incomeRecords : expenseRecords).length === 0 && (
          <div className="no-records">
            <i className="ri-file-list-line"></i>
            <p>No {activeTab} records found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceManagement;