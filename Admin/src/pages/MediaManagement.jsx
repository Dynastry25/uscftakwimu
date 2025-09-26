import React, { useState, useEffect } from 'react';
import './MediaManagement.css';

const MediaManagement = () => {
  const [media, setMedia] = useState([]);
  const [activeTab, setActiveTab] = useState('images');
  const [showForm, setShowForm] = useState(false);
  const [editingMedia, setEditingMedia] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'image',
    url: '',
    description: '',
    category: 'general',
    tags: []
  });

  useEffect(() => {
    fetchMedia();
  }, [activeTab]);

  const fetchMedia = async () => {
    try {
      const response = await fetch(`/api/media?type=${activeTab}`);
      const data = await response.json();
      setMedia(data);
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingMedia 
        ? `/api/media/${editingMedia.id}`
        : '/api/media';
      
      const method = editingMedia ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setShowForm(false);
        setEditingMedia(null);
        setFormData({
          title: '',
          type: 'image',
          url: '',
          description: '',
          category: 'general',
          tags: []
        });
        fetchMedia();
      }
    } catch (error) {
      console.error('Error saving media:', error);
    }
  };

  const handleEdit = (mediaItem) => {
    setEditingMedia(mediaItem);
    setFormData({
      title: mediaItem.title,
      type: mediaItem.type,
      url: mediaItem.url,
      description: mediaItem.description,
      category: mediaItem.category,
      tags: mediaItem.tags || []
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this media?')) {
      try {
        await fetch(`/api/media/${id}`, { method: 'DELETE' });
        fetchMedia();
      } catch (error) {
        console.error('Error deleting media:', error);
      }
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      if (data.url) {
        setFormData({...formData, url: data.url});
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="media-management">
      <div className="page-header">
        <h1>Media Management</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <i className="ri-add-line"></i>
          Add New Media
        </button>
      </div>

      <div className="media-tabs">
        <button 
          className={`tab-btn ${activeTab === 'images' ? 'active' : ''}`}
          onClick={() => setActiveTab('images')}
        >
          <i className="ri-image-line"></i>
          Images
        </button>
        <button 
          className={`tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
          onClick={() => setActiveTab('videos')}
        >
          <i className="ri-video-line"></i>
          Videos
        </button>
        <button 
          className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
          onClick={() => setActiveTab('documents')}
        >
          <i className="ri-file-text-line"></i>
          Documents
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingMedia ? 'Edit Media' : 'Add New Media'}</h2>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowForm(false);
                  setEditingMedia(null);
                  setFormData({
                    title: '',
                    type: 'image',
                    url: '',
                    description: '',
                    category: 'general',
                    tags: []
                  });
                }}
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Type:</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                  <option value="document">Document</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="3"
                />
              </div>
              
              <div className="form-group">
                <label>Category:</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="general">General</option>
                  <option value="events">Events</option>
                  <option value="sermons">Sermons</option>
                  <option value="documents">Documents</option>
                  <option value="gallery">Gallery</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>File:</label>
                <div className="file-upload">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept={formData.type === 'image' ? 'image/*' : formData.type === 'video' ? 'video/*' : '*/*'}
                  />
                  <span>Choose file or enter URL below</span>
                </div>
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  placeholder="File URL"
                  required
                />
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingMedia ? 'Update Media' : 'Add Media'}
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => {
                    setShowForm(false);
                    setEditingMedia(null);
                    setFormData({
                      title: '',
                      type: 'image',
                      url: '',
                      description: '',
                      category: 'general',
                      tags: []
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

      <div className="media-grid">
        {media.map((mediaItem) => (
          <div key={mediaItem.id} className="media-card">
            <div className="media-preview">
              {mediaItem.type === 'image' && (
                <img src={mediaItem.url} alt={mediaItem.title} />
              )}
              {mediaItem.type === 'video' && (
                <div className="video-preview">
                  <i className="ri-video-line"></i>
                  <span>Video</span>
                </div>
              )}
              {mediaItem.type === 'document' && (
                <div className="document-preview">
                  <i className="ri-file-text-line"></i>
                  <span>Document</span>
                </div>
              )}
            </div>
            <div className="media-info">
              <h3>{mediaItem.title}</h3>
              <p>{mediaItem.description}</p>
              <span className="media-type">{mediaItem.type}</span>
              <span className="media-category">{mediaItem.category}</span>
            </div>
            <div className="media-actions">
              <button 
                className="btn-edit"
                onClick={() => handleEdit(mediaItem)}
              >
                <i className="ri-edit-line"></i>
              </button>
              <button 
                className="btn-delete"
                onClick={() => handleDelete(mediaItem.id)}
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

export default MediaManagement;