import React, { useState, useEffect } from 'react';
import './MemberManagement.css';

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    year: '',
    department: '',
    membershipType: 'regular',
    status: 'active'
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch('/api/members');
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingMember 
        ? `/api/members/${editingMember.id}`
        : '/api/members';
      
      const method = editingMember ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setShowForm(false);
        setEditingMember(null);
        setFormData({
          name: '',
          email: '',
          phone: '',
          course: '',
          year: '',
          department: '',
          membershipType: 'regular',
          status: 'active'
        });
        fetchMembers();
      }
    } catch (error) {
      console.error('Error saving member:', error);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      course: member.course,
      year: member.year,
      department: member.department,
      membershipType: member.membershipType,
      status: member.status
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await fetch(`/api/members/${id}`, { method: 'DELETE' });
        fetchMembers();
      } catch (error) {
        console.error('Error deleting member:', error);
      }
    }
  };

  const toggleStatus = async (member) => {
    const newStatus = member.status === 'active' ? 'inactive' : 'active';
    
    try {
      await fetch(`/api/members/${member.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...member, status: newStatus}),
      });
      fetchMembers();
    } catch (error) {
      console.error('Error updating member status:', error);
    }
  };

  return (
    <div className="member-management">
      <div className="page-header">
        <h1>Member Management</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <i className="ri-user-add-line"></i>
          Add New Member
        </button>
      </div>

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
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    course: '',
                    year: '',
                    department: '',
                    membershipType: 'regular',
                    status: 'active'
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
                  <label>Email:</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Course:</label>
                  <input
                    type="text"
                    value={formData.course}
                    onChange={(e) => setFormData({...formData, course: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Year of Study:</label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                  >
                    <option value="">Select Year</option>
                    <option value="Year 1">Year 1</option>
                    <option value="Year 2">Year 2</option>
                    <option value="Year 3">Year 3</option>
                    <option value="Year 4">Year 4</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Department:</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                  >
                    <option value="">Select Department</option>
                    <option value="Kwaya">Kwaya</option>
                    <option value="Uinjilisti">Uinjilisti</option>
                    <option value="Maombi">Maombi</option>
                    <option value="IT">IT</option>
                    <option value="Nyingine">Nyingine</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Membership Type:</label>
                  <select
                    value={formData.membershipType}
                    onChange={(e) => setFormData({...formData, membershipType: e.target.value})}
                  >
                    <option value="regular">Regular</option>
                    <option value="active">Active</option>
                    <option value="leader">Leader</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Status:</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
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
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      course: '',
                      year: '',
                      department: '',
                      membershipType: 'regular',
                      status: 'active'
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

      <div className="members-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Course</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.course}</td>
                <td>{member.phone}</td>
                <td>{member.department}</td>
                <td>{member.membershipType}</td>
                <td>
                  <span className={`status-badge ${member.status}`}>
                    {member.status}
                  </span>
                </td>
                <td className="actions">
                  <button 
                    className="btn-edit"
                    onClick={() => handleEdit(member)}
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button 
                    className={`btn-status ${member.status === 'active' ? 'deactivate' : 'activate'}`}
                    onClick={() => toggleStatus(member)}
                  >
                    <i className={member.status === 'active' ? 'ri-user-unfollow-line' : 'ri-user-follow-line'}></i>
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(member.id)}
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberManagement;