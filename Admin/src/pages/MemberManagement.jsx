import React, { useState, useEffect } from 'react';
import './MemberManagement.css';

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = 'http://localhost:5000/api'; // Backend URL

  const courses = [
    'Bachelor Degree in Official Statistics',
    'Bachelor Degree in Business Statistics and Economics',
    'Bachelor Degree in Agriculture Statistics and Economics',
    'Bachelor Degree in Data Science',
    'Bachelor Degree in Actuarial Statistics',
    'Basic Technician Certificate in Statistics',
    'Basic Technician Certificate in Information Technology',
    'Ordinary Diploma in Statistics',
    'Ordinary Diploma in Information Technology',
    'Nyingine'
  ];

  const departments = ['Kwaya', 'Uinjilisti', 'Maombi', 'IT', 'Nyingine'];
  const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Graduated'];
  const genders = ['Male', 'Female', 'Other'];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    gender: '',
    course: '',
    yearOfStudy: '',
    department: '',
    membershipType: 'regular',
    status: 'active'
  });

  // Function to make API requests
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
    fetchMembers();
  }, []);

  useEffect(() => {
    filterMembers();
  }, [members, searchTerm, statusFilter]);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const data = await apiRequest('/members');
      setMembers(data.members || data);
    } catch (error) {
      console.error('Error fetching members:', error);
      alert('Error loading members. Please check if backend server is running.');
    }
    setIsLoading(false);
  };

  const filterMembers = () => {
    let filtered = members;

    if (searchTerm) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.phone.includes(searchTerm) ||
        (member.email && member.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(member => member.status === statusFilter);
    }

    setFilteredMembers(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingMember) {
        // UPDATE member
        await apiRequest(`/members/${editingMember._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
        alert('Member updated successfully!');
      } else {
        // CREATE new member
        await apiRequest('/members', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        alert('Member added successfully!');
      }
      
      setShowForm(false);
      setEditingMember(null);
      resetForm();
      fetchMembers(); // Refresh the list
      
    } catch (error) {
      console.error('Error saving member:', error);
      alert('Error saving member. Please try again.');
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      phone: member.phone,
      email: member.email || '',
      gender: member.gender,
      course: member.course,
      yearOfStudy: member.yearOfStudy,
      department: member.department,
      membershipType: member.membershipType,
      status: member.status
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await apiRequest(`/members/${id}`, {
          method: 'DELETE',
        });
        alert('Member deleted successfully!');
        fetchMembers(); // Refresh the list
      } catch (error) {
        console.error('Error deleting member:', error);
        alert('Error deleting member. Please try again.');
      }
    }
  };

  const toggleStatus = async (member) => {
    const newStatus = member.status === 'active' ? 'inactive' : 'active';
    
    try {
      await apiRequest(`/members/${member._id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...member, status: newStatus }),
      });
      alert(`Member ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
      fetchMembers(); // Refresh the list
    } catch (error) {
      console.error('Error updating member status:', error);
      alert('Error updating member status. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      gender: '',
      course: '',
      yearOfStudy: '',
      department: '',
      membershipType: 'regular',
      status: 'active'
    });
  };

  if (isLoading) {
    return (
      <div className="member-management">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="member-management">
      <div className="page-header">
        <div>
          <h1>Member Management</h1>
          <p>Manage USCF members information</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <i className="ri-user-add-line"></i>
          Add New Member
        </button>
      </div>

      {/* Search and Filter */}
      <div className="filters-section">
        <div className="search-box">
          <i className="ri-search-line"></i>
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Stats Summary */}
      <div className="stats-summary">
        <div className="stat-item">
          <span className="stat-number">{members.length}</span>
          <span className="stat-label">Total Members</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{members.filter(m => m.status === 'active').length}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{members.filter(m => m.membershipType === 'leader').length}</span>
          <span className="stat-label">Leaders</span>
        </div>
      </div>

      {/* Add/Edit Member Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingMember ? 'Edit Member' : 'Add New Member'}</h2>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowForm(false);
                  setEditingMember(null);
                  resetForm();
                }}
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="member-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    required
                  >
                    <option value="">Select Gender</option>
                    {genders.map(gender => (
                      <option key={gender} value={gender}>{gender}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Course *</label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({...formData, course: e.target.value})}
                    required
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Year of Study *</label>
                  <select
                    value={formData.yearOfStudy}
                    onChange={(e) => setFormData({...formData, yearOfStudy: e.target.value})}
                    required
                  >
                    <option value="">Select Year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Department *</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Membership Type *</label>
                  <select
                    value={formData.membershipType}
                    onChange={(e) => setFormData({...formData, membershipType: e.target.value})}
                    required
                  >
                    <option value="regular">Regular Member</option>
                    <option value="active">Active Member</option>
                    <option value="leader">Leader</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingMember ? 'Update Member' : 'Add Member'}
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => {
                    setShowForm(false);
                    setEditingMember(null);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Members Table */}
      <div className="members-table-container">
        <div className="table-header">
          <h3>Members List ({filteredMembers.length} members)</h3>
        </div>

        {filteredMembers.length === 0 ? (
          <div className="no-members">
            <i className="ri-user-search-line"></i>
            <p>No members found</p>
            {members.length === 0 && (
              <button 
                className="btn-primary"
                onClick={() => setShowForm(true)}
              >
                Add First Member
              </button>
            )}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="members-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Course</th>
                  <th>Year</th>
                  <th>Department</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member._id}>
                    <td>
                      <div className="member-name">{member.name}</div>
                    </td>
                    <td>{member.phone}</td>
                    <td>{member.email || '-'}</td>
                    <td>
                      <span className="gender-badge">{member.gender}</span>
                    </td>
                    <td>
                      <span className="course-badge">
                        {member.course}
                      </span>
                    </td>
                    <td>
                      <span className="year-badge">{member.yearOfStudy}</span>
                    </td>
                    <td>
                      <span className="department-badge">
                        {member.department}
                      </span>
                    </td>
                    <td>
                      <span className={`type-badge ${member.membershipType}`}>
                        {member.membershipType}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${member.status}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="actions">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(member)}
                        title="Edit Member"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      <button 
                        className={`btn-status ${member.status === 'active' ? 'deactivate' : 'activate'}`}
                        onClick={() => toggleStatus(member)}
                        title={member.status === 'active' ? 'Deactivate' : 'Activate'}
                      >
                        <i className={member.status === 'active' ? 'ri-user-unfollow-line' : 'ri-user-follow-line'}></i>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(member._id)}
                        title="Delete Member"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberManagement;