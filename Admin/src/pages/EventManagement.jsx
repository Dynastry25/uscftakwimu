import React, { useState, useEffect } from 'react';
import './EventManagement.css';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    type: 'regular',
    image: '',
    registrationRequired: false,
    maxAttendees: 0,
    status: 'upcoming'
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
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await apiRequest('/events');
      setEvents(data.events || data);
    } catch (error) {
      console.error('Error fetching events:', error);
      alert('Error loading events. Please check if backend server is running.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingEvent) {
        // UPDATE event
        await apiRequest(`/events/${editingEvent._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
        alert('Event updated successfully!');
      } else {
        // CREATE new event
        await apiRequest('/events', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        alert('Event added successfully!');
      }
      
      setShowForm(false);
      setEditingEvent(null);
      setFormData({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        location: '',
        type: 'regular',
        image: '',
        registrationRequired: false,
        maxAttendees: 0,
        status: 'upcoming'
      });
      fetchEvents();
      
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Error saving event. Please try again.');
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      startDate: event.startDate ? event.startDate.split('.')[0] : '',
      endDate: event.endDate ? event.endDate.split('.')[0] : '',
      location: event.location,
      type: event.type,
      image: event.image,
      registrationRequired: event.registrationRequired || false,
      maxAttendees: event.maxAttendees || 0,
      status: event.status
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await apiRequest(`/events/${id}`, {
          method: 'DELETE',
        });
        alert('Event deleted successfully!');
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Error deleting event. Please try again.');
      }
    }
  };

  const updateEventStatus = async (event, newStatus) => {
    try {
      await apiRequest(`/events/${event._id}`, {
        method: 'PUT',
        body: JSON.stringify({...event, status: newStatus}),
      });
      alert('Event status updated successfully!');
      fetchEvents();
    } catch (error) {
      console.error('Error updating event status:', error);
      alert('Error updating event status. Please try again.');
    }
  };

  const getEventStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (now < start) return 'upcoming';
    if (now >= start && now <= end) return 'ongoing';
    return 'completed';
  };

  return (
    <div className="event-management">
      <div className="page-header">
        <h1>Event Management</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <i className="ri-add-line"></i>
          Add New Event
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingEvent ? 'Edit Event' : 'Add New Event'}</h2>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowForm(false);
                  setEditingEvent(null);
                  setFormData({
                    title: '',
                    description: '',
                    startDate: '',
                    endDate: '',
                    location: '',
                    type: 'regular',
                    image: '',
                    registrationRequired: false,
                    maxAttendees: 0,
                    status: 'upcoming'
                  });
                }}
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Event Title:</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  rows="4"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date & Time:</label>
                  <input
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>End Date & Time:</label>
                  <input
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Location:</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Event Type:</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="regular">Regular</option>
                    <option value="special">Special</option>
                    <option value="conference">Conference</option>
                    <option value="retreat">Retreat</option>
                    <option value="workshop">Workshop</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Image URL:</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="Path to event image"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.registrationRequired}
                      onChange={(e) => setFormData({...formData, registrationRequired: e.target.checked})}
                    />
                    Registration Required
                  </label>
                </div>
                
                {formData.registrationRequired && (
                  <div className="form-group">
                    <label>Maximum Attendees:</label>
                    <input
                      type="number"
                      value={formData.maxAttendees}
                      onChange={(e) => setFormData({...formData, maxAttendees: parseInt(e.target.value) || 0})}
                      min="0"
                    />
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label>Status:</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingEvent ? 'Update Event' : 'Add Event'}
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => {
                    setShowForm(false);
                    setEditingEvent(null);
                    setFormData({
                      title: '',
                      description: '',
                      startDate: '',
                      endDate: '',
                      location: '',
                      type: 'regular',
                      image: '',
                      registrationRequired: false,
                      maxAttendees: 0,
                      status: 'upcoming'
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

      <div className="events-table">
        <table>
          <thead>
            <tr>
              <th>Event Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Type</th>
              <th>Status</th>
              <th>Registration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => {
              const eventStatus = getEventStatus(event.startDate, event.endDate);
              const status = event.status === 'cancelled' ? 'cancelled' : eventStatus;
              
              return (
                <tr key={event._id}>
                  <td>{event.title}</td>
                  <td>
                    {new Date(event.startDate).toLocaleDateString()} - {' '}
                    {new Date(event.endDate).toLocaleDateString()}
                  </td>
                  <td>{event.location}</td>
                  <td>{event.type}</td>
                  <td>
                    <span className={`status-badge ${status}`}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </td>
                  <td>
                    {event.registrationRequired ? 'Required' : 'Not Required'}
                  </td>
                  <td className="actions">
                    <button 
                      className="btn-edit"
                      onClick={() => handleEdit(event)}
                      title="Edit Event"
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    {status !== 'cancelled' && (
                      <button 
                        className="btn-cancel"
                        onClick={() => updateEventStatus(event, 'cancelled')}
                        title="Cancel Event"
                      >
                        <i className="ri-close-circle-line"></i>
                      </button>
                    )}
                    <button 
                      className="btn-delete"
                      onClick={() => handleDelete(event._id)}
                      title="Delete Event"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventManagement;