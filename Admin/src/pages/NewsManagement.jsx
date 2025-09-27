import React, { useState, useEffect } from 'react';
import './NewsManagement.css';

const NewsManagement = () => {
  const [news, setNews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    image: '',
    author: '',
    category: 'general',
    tags: [],
    isPublished: false,
    publishDate: new Date().toISOString().split('T')[0]
  });

  const API_URL = 'http://localhost:5000/api';

  const categories = [
    'general',
    'spiritual',
    'academic',
    'events',
    'announcements',
    'missions',
    'graduation',
    'prayer'
  ];

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
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const data = await apiRequest('/news');
      setNews(data.news || data);
    } catch (error) {
      console.error('Error fetching news:', error);
      alert('Error loading news. Please check if backend server is running.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Auto-generate excerpt if not provided
    const newsData = {
      ...formData,
      excerpt: formData.excerpt || formData.content.substring(0, 150) + '...'
    };

    try {
      if (editingNews) {
        // UPDATE news
        await apiRequest(`/news/${editingNews._id}`, {
          method: 'PUT',
          body: JSON.stringify(newsData),
        });
        alert('News updated successfully!');
      } else {
        // CREATE new news
        await apiRequest('/news', {
          method: 'POST',
          body: JSON.stringify(newsData),
        });
        alert('News added successfully!');
      }
      
      setShowForm(false);
      setEditingNews(null);
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        image: '',
        author: '',
        category: 'general',
        tags: [],
        isPublished: false,
        publishDate: new Date().toISOString().split('T')[0]
      });
      fetchNews();
      
    } catch (error) {
      console.error('Error saving news:', error);
      alert('Error saving news. Please try again.');
    }
  };

  const handleEdit = (newsItem) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      excerpt: newsItem.excerpt || '',
      image: newsItem.image,
      author: newsItem.author,
      category: newsItem.category,
      tags: newsItem.tags || [],
      isPublished: newsItem.isPublished,
      publishDate: newsItem.publishDate ? newsItem.publishDate.split('T')[0] : new Date().toISOString().split('T')[0]
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this news?')) {
      try {
        await apiRequest(`/news/${id}`, {
          method: 'DELETE',
        });
        alert('News deleted successfully!');
        fetchNews();
      } catch (error) {
        console.error('Error deleting news:', error);
        alert('Error deleting news. Please try again.');
      }
    }
  };

  const togglePublish = async (newsItem) => {
    const newStatus = !newsItem.isPublished;
    
    try {
      await apiRequest(`/news/${newsItem._id}`, {
        method: 'PUT',
        body: JSON.stringify({...newsItem, isPublished: newStatus}),
      });
      alert(`News ${newStatus ? 'published' : 'unpublished'} successfully!`);
      fetchNews();
    } catch (error) {
      console.error('Error updating news status:', error);
      alert('Error updating news status. Please try again.');
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

  const handleContentChange = (e) => {
    const content = e.target.value;
    setFormData({
      ...formData,
      content: content,
      // Auto-generate excerpt if content changes and excerpt is empty
      excerpt: formData.excerpt || content.substring(0, 150) + '...'
    });
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
                    excerpt: '',
                    image: '',
                    author: '',
                    category: 'general',
                    tags: [],
                    isPublished: false,
                    publishDate: new Date().toISOString().split('T')[0]
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
                  onChange={handleContentChange}
                  required
                  rows="6"
                  placeholder="Write your news content here..."
                />
              </div>

              <div className="form-group">
                <label>Excerpt:</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  rows="3"
                  placeholder="Short summary of the news (auto-generated if empty)"
                />
                <small>Auto-generates if left empty (first 150 characters of content)</small>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Author:</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Category:</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
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
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => setFormData({...formData, publishDate: e.target.value})}
                    required
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
                      excerpt: '',
                      image: '',
                      author: '',
                      category: 'general',
                      tags: [],
                      isPublished: false,
                      publishDate: new Date().toISOString().split('T')[0]
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
              <tr key={newsItem._id}>
                <td>
                  <div className="news-title">
                    {newsItem.title}
                    {newsItem.featured && <span className="featured-badge">Featured</span>}
                  </div>
                </td>
                <td>
                  <span className="category-badge">{newsItem.category}</span>
                </td>
                <td>{newsItem.author}</td>
                <td>
                  <span className={`status-badge ${newsItem.isPublished ? 'published' : 'draft'}`}>
                    {newsItem.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td>
                  {newsItem.publishDate ? new Date(newsItem.publishDate).toLocaleDateString() : 'Not set'}
                </td>
                <td className="actions">
                  <button 
                    className="btn-edit"
                    onClick={() => handleEdit(newsItem)}
                    title="Edit News"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button 
                    className={`btn-status ${newsItem.isPublished ? 'unpublish' : 'publish'}`}
                    onClick={() => togglePublish(newsItem)}
                    title={newsItem.isPublished ? 'Unpublish' : 'Publish'}
                  >
                    <i className={newsItem.isPublished ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(newsItem._id)}
                    title="Delete News"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {news.length === 0 && (
          <div className="no-news">
            <i className="ri-newspaper-line"></i>
            <p>No news articles found</p>
            <button 
              className="btn-primary"
              onClick={() => setShowForm(true)}
            >
              Add First News Article
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsManagement;