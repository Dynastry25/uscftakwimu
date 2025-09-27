import React, { useState, useEffect } from 'react';
import './QuizManagement.css';

const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [levels, setLevels] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    answer: '',
    explanation: '',
    reference: '',
    level: 'beginner',
    category: 'general'
  });

  const API_URL = 'http://localhost:5000/api';

  const difficultyLevels = [
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  const categories = [
    'general',
    'old_testament',
    'new_testament',
    'gospels',
    'miracles',
    'parables',
    'prophecy',
    'wisdom'
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
    fetchQuizzes();
    fetchLevels();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const data = await apiRequest('/quizzes');
      setQuizzes(data.quizzes || data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      alert('Error loading quizzes. Please check if backend server is running.');
    }
  };

  const fetchLevels = async () => {
    try {
      // Using static levels for now
      setLevels(difficultyLevels);
    } catch (error) {
      console.error('Error fetching levels:', error);
      setLevels(difficultyLevels); // Fallback to static levels
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that at least 2 options are filled
    const filledOptions = formData.options.filter(opt => opt.trim() !== '');
    if (filledOptions.length < 2) {
      alert('Please provide at least 2 options');
      return;
    }

    // Validate that answer is one of the filled options
    if (!filledOptions.includes(formData.answer)) {
      alert('Correct answer must be one of the provided options');
      return;
    }

    try {
      if (editingQuiz) {
        // UPDATE quiz
        await apiRequest(`/quizzes/${editingQuiz._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
        alert('Quiz question updated successfully!');
      } else {
        // CREATE new quiz
        await apiRequest('/quizzes', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        alert('Quiz question added successfully!');
      }
      
      setShowForm(false);
      setEditingQuiz(null);
      setFormData({
        question: '',
        options: ['', '', '', ''],
        answer: '',
        explanation: '',
        reference: '',
        level: 'beginner',
        category: 'general'
      });
      fetchQuizzes();
      
    } catch (error) {
      console.error('Error saving quiz:', error);
      alert('Error saving quiz question. Please try again.');
    }
  };

  const handleEdit = (quiz) => {
    setEditingQuiz(quiz);
    setFormData({
      question: quiz.question,
      options: quiz.options.length === 4 ? quiz.options : [...quiz.options, ...Array(4 - quiz.options.length).fill('')],
      answer: quiz.answer,
      explanation: quiz.explanation || '',
      reference: quiz.reference || '',
      level: quiz.level,
      category: quiz.category || 'general'
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await apiRequest(`/quizzes/${id}`, {
          method: 'DELETE',
        });
        alert('Question deleted successfully!');
        fetchQuizzes();
      } catch (error) {
        console.error('Error deleting quiz:', error);
        alert('Error deleting question. Please try again.');
      }
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({...formData, options: newOptions});
  };

  const addOption = () => {
    if (formData.options.length < 6) {
      setFormData({
        ...formData,
        options: [...formData.options, '']
      });
    }
  };

  const removeOption = (index) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        options: newOptions,
        answer: formData.answer === formData.options[index] ? '' : formData.answer
      });
    }
  };

  const clearForm = () => {
    setFormData({
      question: '',
      options: ['', '', '', ''],
      answer: '',
      explanation: '',
      reference: '',
      level: 'beginner',
      category: 'general'
    });
  };

  return (
    <div className="quiz-management">
      <div className="page-header">
        <h1>Quiz Management</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <i className="ri-add-line"></i>
          Add New Question
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingQuiz ? 'Edit Question' : 'Add New Question'}</h2>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowForm(false);
                  setEditingQuiz(null);
                  clearForm();
                }}
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Question:</label>
                <textarea
                  value={formData.question}
                  onChange={(e) => setFormData({...formData, question: e.target.value})}
                  required
                  rows="3"
                  placeholder="Enter the quiz question..."
                />
              </div>
              
              <div className="form-group">
                <label>Options:</label>
                <div className="options-container">
                  {formData.options.map((option, index) => (
                    <div key={index} className="option-input">
                      <span className="option-label">{String.fromCharCode(65 + index)}</span>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65 + index)}`}
                        required={index < 2}
                      />
                      {formData.options.length > 2 && (
                        <button 
                          type="button"
                          className="remove-option-btn"
                          onClick={() => removeOption(index)}
                          title="Remove option"
                        >
                          <i className="ri-close-line"></i>
                        </button>
                      )}
                    </div>
                  ))}
                  {formData.options.length < 6 && (
                    <button 
                      type="button"
                      className="add-option-btn"
                      onClick={addOption}
                    >
                      <i className="ri-add-line"></i> Add Option
                    </button>
                  )}
                </div>
              </div>
              
              <div className="form-group">
                <label>Correct Answer:</label>
                <select
                  value={formData.answer}
                  onChange={(e) => setFormData({...formData, answer: e.target.value})}
                  required
                >
                  <option value="">Select correct answer</option>
                  {formData.options.map((option, index) => (
                    option.trim() && (
                      <option key={index} value={option}>
                        {String.fromCharCode(65 + index)}: {option}
                      </option>
                    )
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Explanation (Optional):</label>
                <textarea
                  value={formData.explanation}
                  onChange={(e) => setFormData({...formData, explanation: e.target.value})}
                  rows="3"
                  placeholder="Explain why this is the correct answer..."
                />
              </div>
              
              <div className="form-group">
                <label>Bible Reference (Optional):</label>
                <input
                  type="text"
                  value={formData.reference}
                  onChange={(e) => setFormData({...formData, reference: e.target.value})}
                  placeholder="e.g., John 3:16"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Difficulty Level:</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                  >
                    {levels.map(level => (
                      <option key={level.id} value={level.id}>
                        {level.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Category:</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.split('_').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingQuiz ? 'Update Question' : 'Add Question'}
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => {
                    setShowForm(false);
                    setEditingQuiz(null);
                    clearForm();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="quizzes-table">
        <table>
          <thead>
            <tr>
              <th>Question</th>
              <th>Level</th>
              <th>Category</th>
              <th>Correct Answer</th>
              <th>Reference</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz._id}>
                <td>
                  <div className="question-text">
                    {quiz.question.length > 80 ? quiz.question.substring(0, 80) + '...' : quiz.question}
                  </div>
                </td>
                <td>
                  <span className={`level-badge ${quiz.level}`}>
                    {quiz.level}
                  </span>
                </td>
                <td>
                  <span className="category-badge">
                    {quiz.category}
                  </span>
                </td>
                <td>
                  <div className="correct-answer">
                    {quiz.answer.length > 30 ? quiz.answer.substring(0, 30) + '...' : quiz.answer}
                  </div>
                </td>
                <td>{quiz.reference || '-'}</td>
                <td className="actions">
                  <button 
                    className="btn-edit"
                    onClick={() => handleEdit(quiz)}
                    title="Edit Question"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(quiz._id)}
                    title="Delete Question"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {quizzes.length === 0 && (
          <div className="no-quizzes">
            <i className="ri-questionnaire-line"></i>
            <p>No quiz questions found</p>
            <button 
              className="btn-primary"
              onClick={() => setShowForm(true)}
            >
              Add First Question
            </button>
          </div>
        )}
      </div>

      {/* Quiz Statistics */}
      <div className="quiz-stats">
        <div className="stat-card">
          <i className="ri-question-answer-line"></i>
          <div>
            <h3>{quizzes.length}</h3>
            <p>Total Questions</p>
          </div>
        </div>
        <div className="stat-card">
          <i className="ri-medal-line"></i>
          <div>
            <h3>{quizzes.filter(q => q.level === 'advanced').length}</h3>
            <p>Advanced</p>
          </div>
        </div>
        <div className="stat-card">
          <i className="ri-star-line"></i>
          <div>
            <h3>{quizzes.filter(q => q.level === 'intermediate').length}</h3>
            <p>Intermediate</p>
          </div>
        </div>
        <div className="stat-card">
          <i className="ri-user-smile-line"></i>
          <div>
            <h3>{quizzes.filter(q => q.level === 'beginner').length}</h3>
            <p>Beginner</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizManagement;