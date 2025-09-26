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
    reference: '',
    level: 'beginner'
  });

  useEffect(() => {
    fetchQuizzes();
    fetchLevels();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch('/api/quizzes');
      const data = await response.json();
      setQuizzes(data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const fetchLevels = async () => {
    try {
      const response = await fetch('/api/quiz-levels');
      const data = await response.json();
      setLevels(data);
    } catch (error) {
      console.error('Error fetching levels:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingQuiz 
        ? `/api/quizzes/${editingQuiz.id}`
        : '/api/quizzes';
      
      const method = editingQuiz ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setShowForm(false);
        setEditingQuiz(null);
        setFormData({
          question: '',
          options: ['', '', '', ''],
          answer: '',
          reference: '',
          level: 'beginner'
        });
        fetchQuizzes();
      }
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({...formData, options: newOptions});
  };

  const handleEdit = (quiz) => {
    setEditingQuiz(quiz);
    setFormData({
      question: quiz.question,
      options: quiz.options,
      answer: quiz.answer,
      reference: quiz.reference,
      level: quiz.level
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await fetch(`/api/quizzes/${id}`, { method: 'DELETE' });
        fetchQuizzes();
      } catch (error) {
        console.error('Error deleting quiz:', error);
      }
    }
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
                  setFormData({
                    question: '',
                    options: ['', '', '', ''],
                    answer: '',
                    reference: '',
                    level: 'beginner'
                  });
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
                />
              </div>
              
              <div className="form-group">
                <label>Options:</label>
                {formData.options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    required
                  />
                ))}
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
                    <option key={index} value={option}>
                      {String.fromCharCode(65 + index)}: {option}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Bible Reference:</label>
                <input
                  type="text"
                  value={formData.reference}
                  onChange={(e) => setFormData({...formData, reference: e.target.value})}
                />
              </div>
              
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
                    setFormData({
                      question: '',
                      options: ['', '', '', ''],
                      answer: '',
                      reference: '',
                      level: 'beginner'
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

      <div className="quizzes-table">
        <table>
          <thead>
            <tr>
              <th>Question</th>
              <th>Level</th>
              <th>Answer</th>
              <th>Reference</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz.id}>
                <td>{quiz.question.length > 50 ? quiz.question.substring(0, 50) + '...' : quiz.question}</td>
                <td>{quiz.level}</td>
                <td>{quiz.answer.length > 20 ? quiz.answer.substring(0, 20) + '...' : quiz.answer}</td>
                <td>{quiz.reference}</td>
                <td className="actions">
                  <button 
                    className="btn-edit"
                    onClick={() => handleEdit(quiz)}
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(quiz.id)}
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

export default QuizManagement;