import React, { useState, useEffect } from 'react';
import './BibleManagement.css';

const BibleManagement = () => {
  const [verses, setVerses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingVerse, setEditingVerse] = useState(null);
  const [formData, setFormData] = useState({
    text: '',
    ref: '',
    version: 'NENO'
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
    fetchVerses();
  }, []);

  const fetchVerses = async () => {
    try {
      const data = await apiRequest('/bible-verses');
      setVerses(data.verses || data);
    } catch (error) {
      console.error('Error fetching verses:', error);
      alert('Error loading verses. Please check if backend server is running.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingVerse) {
        // UPDATE verse
        await apiRequest(`/bible-verses/${editingVerse._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
        alert('Verse updated successfully!');
      } else {
        // CREATE new verse
        await apiRequest('/bible-verses', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        alert('Verse added successfully!');
      }
      
      setShowForm(false);
      setEditingVerse(null);
      setFormData({ text: '', ref: '', version: 'NENO' });
      fetchVerses();
      
    } catch (error) {
      console.error('Error saving verse:', error);
      alert('Error saving verse. Please try again.');
    }
  };

  const handleEdit = (verse) => {
    setEditingVerse(verse);
    setFormData({
      text: verse.text,
      ref: verse.ref,
      version: verse.version
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this verse?')) {
      try {
        await apiRequest(`/bible-verses/${id}`, {
          method: 'DELETE',
        });
        alert('Verse deleted successfully!');
        fetchVerses();
      } catch (error) {
        console.error('Error deleting verse:', error);
        alert('Error deleting verse. Please try again.');
      }
    }
  };

  return (
    <div className="bible-management">
      <div className="page-header">
        <h1>Bible Verse Management</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <i className="ri-add-line"></i>
          Add New Verse
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingVerse ? 'Edit Verse' : 'Add New Verse'}</h2>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowForm(false);
                  setEditingVerse(null);
                  setFormData({ text: '', ref: '', version: 'NENO' });
                }}
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Verse Text:</label>
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData({...formData, text: e.target.value})}
                  required
                  rows="4"
                />
              </div>
              
              <div className="form-group">
                <label>Reference:</label>
                <input
                  type="text"
                  value={formData.ref}
                  onChange={(e) => setFormData({...formData, ref: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Version:</label>
                <select
                  value={formData.version}
                  onChange={(e) => setFormData({...formData, version: e.target.value})}
                >
                  <option value="NENO">NENO</option>
                  <option value="NIV">NIV</option>
                  <option value="KJV">KJV</option>
                </select>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingVerse ? 'Update Verse' : 'Add Verse'}
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => {
                    setShowForm(false);
                    setEditingVerse(null);
                    setFormData({ text: '', ref: '', version: 'NENO' });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="verses-table">
        <table>
          <thead>
            <tr>
              <th>Verse Text</th>
              <th>Reference</th>
              <th>Version</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {verses.map((verse) => (
              <tr key={verse._id}>
                <td>{verse.text.length > 100 ? verse.text.substring(0, 100) + '...' : verse.text}</td>
                <td>{verse.ref}</td>
                <td>{verse.version}</td>
                <td className="actions">
                  <button 
                    className="btn-edit"
                    onClick={() => handleEdit(verse)}
                    title="Edit Verse"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(verse._id)}
                    title="Delete Verse"
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

export default BibleManagement;