import React, { useState, useEffect } from 'react';
import './LeaderManagement.css';

const LeaderManagement = () => {
  const [leaders, setLeaders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingLeader, setEditingLeader] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    image: '',
    contact: '',
    email: '',
    office: '',
    responsibilities: [],
    tenure: '',
    isExecutive: false
  });

  const API_URL = 'http://localhost:5000/api';

  const apiRequest = async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    try {
      const data = await apiRequest('/leaders');
      setLeaders(data);
    } catch (error) {
      console.error('Error fetching leaders:', error);
      alert('Error loading leaders. Please check if backend server is running.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingLeader) {
        // UPDATE leader
        await apiRequest(`/leaders/${editingLeader._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
        alert('Leader updated successfully!');
      } else {
        // CREATE new leader
        await apiRequest('/leaders', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        alert('Leader added successfully!');
      }
      
      setShowForm(false);
      setEditingLeader(null);
      setFormData({
        name: '',
        position: '',
        department: '',
        image: '',
        contact: '',
        email: '',
        office: '',
        responsibilities: [],
        tenure: '',
        isExecutive: false
      });
      fetchLeaders();
      
    } catch (error) {
      console.error('Error saving leader:', error);
      alert('Error saving leader. Please try again.');
    }
  };

  const handleEdit = (leader) => {
    setEditingLeader(leader);
    setFormData({
      name: leader.name,
      position: leader.position,
      department: leader.department,
      image: leader.image,
      contact: leader.contact,
      email: leader.email,
      office: leader.office,
      responsibilities: leader.responsibilities || [],
      tenure: leader.tenure,
      isExecutive: leader.isExecutive || false
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this leader?')) {
      try {
        await apiRequest(`/leaders/${id}`, {
          method: 'DELETE',
        });
        alert('Leader deleted successfully!');
        fetchLeaders();
      } catch (error) {
        console.error('Error deleting leader:', error);
        alert('Error deleting leader. Please try again.');
      }
    }
  };

  const addResponsibility = () => {
    setFormData({
      ...formData,
      responsibilities: [...formData.responsibilities, '']
    });
  };

  const updateResponsibility = (index, value) => {
    const newResponsibilities = [...formData.responsibilities];
    newResponsibilities[index] = value;
    setFormData({...formData, responsibilities: newResponsibilities});
  };

  const removeResponsibility = (index) => {
    const newResponsibilities = formData.responsibilities.filter((_, i) => i !== index);
    setFormData({...formData, responsibilities: newResponsibilities});
  };

  return (
    <div className="leader-management">
      <div className="page-header">
        <h1>Leader Management</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <i className="ri-user-add-line"></i>
          Add New Leader
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingLeader ? 'Edit Leader' : 'Add New Leader'}</h2>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowForm(false);
                  setEditingLeader(null);
                  setFormData({
                    name: '',
                    position: '',
                    department: '',
                    image: '',
                    contact: '',
                    email: '',
                    office: '',
                    responsibilities: [],
                    tenure: '',
                    isExecutive: false
                  });
                }}
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name:</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Position:</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Department:</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                  >
                    <option value="">Select Department</option>
                    <option value="executive">Executive</option>
                    <option value="spiritual">Spiritual</option>
                    <option value="academic">Academic</option>
                    <option value="mission">Mission</option>
                    <option value="finance">Finance</option>
                    <option value="media">Media</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Tenure:</label>
                  <input
                    type="text"
                    value={formData.tenure}
                    onChange={(e) => setFormData({...formData, tenure: e.target.value})}
                    placeholder="e.g., 2023-2024"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Contact:</label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Office Location:</label>
                <input
                  type="text"
                  value={formData.office}
                  onChange={(e) => setFormData({...formData, office: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Image URL:</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="Path to image file"
                />
              </div>
              
              <div className="form-group">
                <label>Responsibilities:</label>
                {formData.responsibilities.map((resp, index) => (
                  <div key={index} className="responsibility-item">
                    <input
                      type="text"
                      value={resp}
                      onChange={(e) => updateResponsibility(index, e.target.value)}
                      placeholder={`Responsibility ${index + 1}`}
                    />
                    <button 
                      type="button"
                      className="remove-btn"
                      onClick={() => removeResponsibility(index)}
                    >
                      <i className="ri-close-line"></i>
                    </button>
                  </div>
                ))}
                <button 
                  type="button"
                  className="add-responsibility-btn"
                  onClick={addResponsibility}
                >
                  <i className="ri-add-line"></i> Add Responsibility
                </button>
              </div>
              
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.isExecutive}
                    onChange={(e) => setFormData({...formData, isExecutive: e.target.checked})}
                  />
                  Executive Leader
                </label>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingLeader ? 'Update Leader' : 'Add Leader'}
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => {
                    setShowForm(false);
                    setEditingLeader(null);
                    setFormData({
                      name: '',
                      position: '',
                      department: '',
                      image: '',
                      contact: '',
                      email: '',
                      office: '',
                      responsibilities: [],
                      tenure: '',
                      isExecutive: false
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

      <div className="leaders-grid">
        {leaders.map((leader) => (
          <div key={leader._id} className="leader-card">
            <div className="leader-image">
              <img src={leader.image || '/images/default-avatar.png'} alt={leader.name} />
            </div>
            <div className="leader-info">
              <h3>{leader.name}</h3>
              <p className="position">{leader.position}</p>
              <p className="department">{leader.department}</p>
              <p className="tenure">{leader.tenure}</p>
              {leader.isExecutive && <span className="executive-badge">Executive</span>}
            </div>
            <div className="leader-actions">
              <button 
                className="btn-edit"
                onClick={() => handleEdit(leader)}
                title="Edit Leader"
              >
                <i className="ri-edit-line"></i>
              </button>
              <button 
                className="btn-delete"
                onClick={() => handleDelete(leader._id)}
                title="Delete Leader"
              >
                <i className="ri-delete-bin-line"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderManagement;