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

  useEffect(() => {
    fetchVerses();
  }, []);

  const fetchVerses = async () => {
    try {
      const response = await fetch('/api/bible-verses');
      const data = await response.json();
      setVerses(data);
    } catch (error) {
      console.error('Error fetching verses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingVerse 
        ? `/api/bible-verses/${editingVerse.id}`
        : '/api/bible-verses';
      
      const method = editingVerse ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setShowForm(false);
        setEditingVerse(null);
        setFormData({ text: '', ref: '', version: 'NENO' });
        fetchVerses();
      }
    } catch (error) {
      console.error('Error saving verse:', error);
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
        await fetch(`/api/bible-verses/${id}`, { method: 'DELETE' });
        fetchVerses();
      } catch (error) {
        console.error('Error deleting verse:', error);
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
              <tr key={verse.id}>
                <td>{verse.text.length > 100 ? verse.text.substring(0, 100) + '...' : verse.text}</td>
                <td>{verse.ref}</td>
                <td>{verse.version}</td>
                <td className="actions">
                  <button 
                    className="btn-edit"
                    onClick={() => handleEdit(verse)}
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(verse.id)}
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