import React, { useState, useEffect } from 'react';
import './NewsManagement.css';

const NewsManagement = () => {
  const [news, setNews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    author: '',
    category: 'general',
    tags: [],
    isPublished: false,
    publishDate: ''
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingNews 
        ? `/api/news/${editingNews.id}`
        : '/api/news';
      
      const method = editingNews ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setShowForm(false);
        setEditingNews(null);
        setFormData({
          title: '',
          content: '',
          image: '',
          author: '',
          category: 'general',
          tags: [],
          isPublished: false,
          publishDate: ''
        });
        fetchNews();
      }
    } catch (error) {
      console.error('Error saving news:', error);
    }
  };

  const handleEdit = (newsItem) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      image: newsItem.image,
      author: newsItem.author,
      category: newsItem.category,
      tags: newsItem.tags || [],
      isPublished: newsItem.isPublished,
      publishDate: newsItem.publishDate || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this news?')) {
      try {
        await fetch(`/api/news/${id}`, { method: 'DELETE' });
        fetchNews();
      } catch (error) {
        console.error('Error deleting news:', error);
      }
    }
  };

  const togglePublish = async (newsItem) => {
    const newStatus = !newsItem.isPublished;
    
    try {
      await fetch(`/api/news/${newsItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...newsItem, isPublished: newStatus}),
      });
      fetchNews();
    } catch (error) {
      console.error('Error updating news status:', error);
    }
  };

  const addTag = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      setFormData({
        ...formData,
        tags: [...formData.tags, e.target.value.trim()]
      });
      e.target.value = '';
    }
  };

  const removeTag = (index) => {
    const newTags = formData.tags.filter((_, i) => i !== index);
    setFormData({...formData, tags: newTags});
  };

  return (
    <div className="news-management">
      <div className="page-header">
        <h1>News Management</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <i className="ri-add-line"></i>
          Add New News
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingNews ? 'Edit News' : 'Add New News'}</h2>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowForm(false);
                  setEditingNews(null);
                  setFormData({
                    title: '',
                    content: '',
                    image: '',
                    author: '',
                    category: 'general',
                    tags: [],
                    isPublished: false,
                    publishDate: ''
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
                <label>Content:</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  required
                  rows="6"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Author:</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Category:</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="general">General</option>
                    <option value="spiritual">Spiritual</option>
                    <option value="academic">Academic</option>
                    <option value="events">Events</option>
                    <option value="announcements">Announcements</option>
                  </select>
                </div>
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
                <label>Tags:</label>
                <div className="tags-input">
                  <div className="tags-list">
                    {formData.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                        <button 
                          type="button"
                          onClick={() => removeTag(index)}
                        >
                          <i className="ri-close-line"></i>
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Type and press Enter to add tags"
                    onKeyDown={addTag}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Publish Date:</label>
                  <input
                    type="datetime-local"
                    value={formData.publishDate}
                    onChange={(e) => setFormData({...formData, publishDate: e.target.value})}
                  />
                </div>
                
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                    />
                    Publish Immediately
                  </label>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingNews ? 'Update News' : 'Add News'}
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => {
                    setShowForm(false);
                    setEditingNews(null);
                    setFormData({
                      title: '',
                      content: '',
                      image: '',
                      author: '',
                      category: 'general',
                      tags: [],
                      isPublished: false,
                      publishDate: ''
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

      <div className="news-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Published</th>
              <th>Publish Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map((newsItem) => (
              <tr key={newsItem.id}>
                <td>{newsItem.title}</td>
                <td>{newsItem.category}</td>
                <td>{newsItem.author}</td>
                <td>
                  <span className={`status-badge ${newsItem.isPublished ? 'published' : 'draft'}`}>
                    {newsItem.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td>{newsItem.publishDate ? new Date(newsItem.publishDate).toLocaleDateString() : '-'}</td>
                <td className="actions">
                  <button 
                    className="btn-edit"
                    onClick={() => handleEdit(newsItem)}
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button 
                    className={`btn-status ${newsItem.isPublished ? 'unpublish' : 'publish'}`}
                    onClick={() => togglePublish(newsItem)}
                  >
                    <i className={newsItem.isPublished ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(newsItem.id)}
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

export default NewsManagement;