import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import FloatingContact from '../components/FloatingContact/FloatingContact';
import './CSS/Quiz.css';

const Quiz = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [levelScore, setLevelScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const levels = [
    {
      name: "Mwanzo",
      difficulty: "Rahisi",
      questions: [
        {
          question: "Mungu aliumba dunia kwa siku ngapi?",
          options: ["Siku 3", "Siku 10", "Siku 7", "Siku 6"],
          answer: "Siku 6",
          reference: "Mwanzo 1:31"
        },
        {
          question: "Yesu alikuwa na wanafunzi wangapi?",
          options: ["Wanafunzi 10", "Wanafunzi 12", "Wanafunzi 7", "Wanafunzi 5"],
          answer: "Wanafunzi 12",
          reference: "Mathayo 10:1"
        },
        {
          question: "Nuhu alijenga nini?",
          options: ["Mnara", "Safina", "Hekalu", "Meli"],
          answer: "Safina",
          reference: "Mwanzo 6:14"
        },
        {
          question: "Yuda alimsaliti Yesu kwa nini?",
          options: ["Dhahabu", "Fedha", "Upendo", "Hasira"],
          answer: "Fedha",
          reference: "Mathayo 26:15"
        },
        {
          question: "Ni nini mshahara wa dhambi kulingana na Warumi 6:23?",
          options: ["Mauti", "Uzima wa milele", "Baraka", "Hasara"],
          answer: "Mauti",
          reference: "Warumi 6:23"
        }
      ]
    },
    {
      name: "Wasifu wa Yesu",
      difficulty: "Wastani",
      questions: [
        {
          question: "Yesu alizaliwa mahali gani?",
          options: ["Yerusalemu", "Bethlehemu", "Nazareti", "Yeriko"],
          answer: "Bethlehemu",
          reference: "Mathayo 2:1"
        },
        {
          question: "Yesu alifanya mwisho wa miujiza yake ya kwanza?",
          options: ["Kafarnaumu", "Kana", "Yerusalemu", "Yeriko"],
          answer: "Kana",
          reference: "Yohana 2:11"
        },
        {
          question: "Yesu alifufuka siku ya ngapi baada ya kufa?",
          options: ["Siku ya 1", "Siku ya 3", "Siku ya 7", "Siku ya 40"],
          answer: "Siku ya 3",
          reference: "Luka 24:7"
        }
      ]
    },
    {
      name: "Mafundisho",
      difficulty: "Ngumu",
      questions: [
        {
          question: "Ni wapi Agano Jipya linaandika 'Mungu ni upendo'?",
          options: ["1 Yohana 4:8", "Warumi 5:8", "Yohana 3:16", "1 Wakorintho 13:4"],
          answer: "1 Yohana 4:8",
          reference: "1 Yohana 4:8"
        },
        {
          question: "Nani aliandika 'Imetimiza wakati, na ufalme wa Mungu umekaribiu'?",
          options: ["Yesu", "Yohana Mbatizaji", "Petro", "Paulo"],
          answer: "Yesu",
          reference: "Marko 1:15"
        }
      ]
    }
  ];

  useEffect(() => {
    const savedHighScore = localStorage.getItem("bibleQuizHighScore") || 0;
    setHighScore(parseInt(savedHighScore));
  }, []);

  useEffect(() => {
    if (quizStarted && !showResult && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
  }, [timeLeft, quizStarted, showResult]);

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(30);
  };

  const handleTimeUp = () => {
    setShowResult(true);
    setIsCorrect(false);
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const checkAnswer = (selectedOption) => {
    if (showResult) return;
    
    setSelectedAnswer(selectedOption);
    setShowResult(true);
    const correctAnswer = levels[currentLevel].questions[currentQuestion].answer;
    const correct = selectedOption === correctAnswer;
    
    setIsCorrect(correct);
    
    if (correct) {
      const newScore = score + 1;
      const newLevelScore = levelScore + 1;
      setScore(newScore);
      setLevelScore(newLevelScore);

      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("bibleQuizHighScore", newScore.toString());
      }
    }

    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    setTimeLeft(30);
    
    if (currentQuestion + 1 < levels[currentLevel].questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      if (currentLevel + 1 < levels.length) {
        setShowCongrats(true);
      } else {
        finishQuiz();
      }
    }
  };

  const continueToNextLevel = () => {
    if (currentLevel + 1 < levels.length) {
      setCurrentLevel(currentLevel + 1);
      setCurrentQuestion(0);
      setLevelScore(0);
      setShowCongrats(false);
    } else {
      finishQuiz();
    }
  };

  const restartQuiz = () => {
    setCurrentLevel(0);
    setCurrentQuestion(0);
    setScore(0);
    setLevelScore(0);
    setShowCongrats(false);
    setQuizFinished(false);
    setQuizStarted(false);
    setTimeLeft(30);
  };

  const finishQuiz = () => {
    setShowCongrats(false);
    setQuizFinished(true);
  };

  const getProgressPercentage = () => {
    const totalQuestions = levels.reduce((total, level) => total + level.questions.length, 0);
    const answeredQuestions = levels.slice(0, currentLevel).reduce((total, level) => total + level.questions.length, 0) + currentQuestion;
    return (answeredQuestions / totalQuestions) * 100;
  };

  if (!quizStarted) {
    return (
      <div className="quiz-page">
        <Header />
        <Navbar />
        
        <main>
          <div className="quiz-container">
            <div className="quiz-intro">
              <div className="intro-card">
                <h1>Bible Quiz Challenge</h1>
                <p>Jaribu ujuzi wako wa Biblia na upate alama!</p>
                
                <div className="quiz-stats">
                  <div className="stat">
                    <i className="ri-book-line"></i>
                    <span>{levels.length} Levels</span>
                  </div>
                  <div className="stat">
                    <i className="ri-question-line"></i>
                    <span>{levels.reduce((total, level) => total + level.questions.length, 0)} Maswali</span>
                  </div>
                  <div className="stat">
                    <i className="ri-trophy-line"></i>
                    <span>Alama ya Juu: {highScore}</span>
                  </div>
                </div>

                <div className="levels-preview">
                  <h3>Viwango vya Changamoto</h3>
                  <div className="levels-list">
                    {levels.map((level, index) => (
                      <div key={index} className="level-preview">
                        <span className="level-number">Level {index + 1}</span>
                        <span className="level-name">{level.name}</span>
                        <span className={`difficulty-badge ${level.difficulty.toLowerCase()}`}>
                          {level.difficulty}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="start-quiz-btn" onClick={startQuiz}>
                  <i className="ri-play-circle-line"></i>
                  Anza Quiz
                </button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <FloatingContact />
      </div>
    );
  }

  if (quizFinished) {
    return (
      <div className="quiz-page">
        <Header />
        <Navbar />
        
        <main>
          <div className="quiz-container">
            <div className="quiz-results">
              <div className="results-card">
                <div className="trophy-icon">
                  <i className="ri-trophy-fill"></i>
                </div>
                <h2>Hongera! Umemaliza Quiz</h2>
                <div className="score-display">
                  <div className="final-score">
                    <span className="score-number">{score}</span>
                    <span className="score-label">Alama</span>
                  </div>
                  <div className="score-details">
                    <p>Umefanya vizuri sana! Umejibu {score} kati ya {levels.reduce((total, level) => total + level.questions.length, 0)} maswali kwa usahihi.</p>
                  </div>
                </div>

                {score === highScore && (
                  <div className="high-score-badge">
                    <i className="ri-star-fill"></i>
                    Rekodi Mpya!
                  </div>
                )}

                <div className="results-actions">
                  <button className="action-btn primary" onClick={restartQuiz}>
                    <i className="ri-restart-line"></i>
                    Cheza Tena
                  </button>
                  <button className="action-btn secondary">
                    <i className="ri-share-line"></i>
                    Sherehekea
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <FloatingContact />
      </div>
    );
  }

  if (showCongrats) {
    return (
      <div className="quiz-page">
        <Header />
        <Navbar />
        
        <main>
          <div className="quiz-container">
            <div className="level-complete">
              <div className="congrats-card">
                <div className="celebration-icon">
                  <i className="ri-confetti-line"></i>
                </div>
                <h2>🎉 Hongera! Umemaliza Level {currentLevel + 1}</h2>
                <p>Umeshinda alama {levelScore} kati ya {levels[currentLevel].questions.length}!</p>
                
                {currentLevel + 1 < levels.length ? (
                  <>
                    <p>Level inayofuata: <strong>{levels[currentLevel + 1].name}</strong></p>
                    <div className="level-actions">
                      <button onClick={continueToNextLevel} className="quiz-btn primary">
                        Endelea na Level {currentLevel + 2}
                      </button>
                      <button onClick={restartQuiz} className="quiz-btn secondary">
                        Anza Tena
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p>Umemaliza maswali yote! Jumla ya alama zako: {score}</p>
                    <button onClick={finishQuiz} className="quiz-btn primary">
                      Tazama Matokeo
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <FloatingContact />
      </div>
    );
  }

  const currentLevelData = levels[currentLevel];
  const currentQ = currentLevelData.questions[currentQuestion];

  return (
    <div className="quiz-page">
      <Header />
      <Navbar />
      
      <main>
        <div className="quiz-container">
          {/* Quiz Header */}
          <div className="quiz-header">
            <div className="quiz-info">
              <div className="level-info">
                <span className="level-badge">Level {currentLevel + 1}</span>
                <span className="level-name">{currentLevelData.name}</span>
                <span className={`difficulty ${currentLevelData.difficulty.toLowerCase()}`}>
                  {currentLevelData.difficulty}
                </span>
              </div>
              <div className="score-info">
                <span className="score">Alama: {score}</span>
                <span className="high-score">Rekodi: {highScore}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-section">
              <div className="progress-header">
                <span>Swali {currentQuestion + 1} ya {currentLevelData.questions.length}</span>
                <span className="time-left">
                  <i className="ri-time-line"></i>
                  {timeLeft}s
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${((currentQuestion + 1) / currentLevelData.questions.length) * 100}%` }}
                ></div>
                <div 
                  className="time-progress"
                  style={{ width: `${(timeLeft / 30) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Question Section */}
          <div className="question-section">
            <div className="question-card">
              <div className="question-header">
                <h2>{currentQ.question}</h2>
                {currentQ.reference && (
                  <span className="bible-reference">{currentQ.reference}</span>
                )}
              </div>

              <div className="options-grid">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    className={`option-btn ${
                      showResult 
                        ? option === currentQ.answer 
                          ? 'correct' 
                          : selectedAnswer === option 
                            ? 'incorrect' 
                            : ''
                        : selectedAnswer === option 
                          ? 'selected' 
                          : ''
                    }`}
                    onClick={() => checkAnswer(option)}
                    disabled={showResult}
                  >
                    <span className="option-number">{String.fromCharCode(65 + index)}</span>
                    <span className="option-text">{option}</span>
                    {showResult && option === currentQ.answer && (
                      <i className="ri-check-line"></i>
                    )}
                    {showResult && selectedAnswer === option && option !== currentQ.answer && (
                      <i className="ri-close-line"></i>
                    )}
                  </button>
                ))}
              </div>

              {/* Result Feedback */}
              {showResult && (
                <div className={`result-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="feedback-icon">
                    <i className={isCorrect ? 'ri-checkbox-circle-fill' : 'ri-error-warning-fill'}></i>
                  </div>
                  <div className="feedback-content">
                    <h3>{isCorrect ? 'Sahihi!' : 'Si Sahihi'}</h3>
                    <p>
                      {isCorrect 
                        ? 'Umepata alama! Jibu sahihi ni: ' 
                        : 'Jibu sahihi ni: '
                      }
                      <strong>{currentQ.answer}</strong>
                    </p>
                    {currentQ.reference && (
                      <span className="reference">{currentQ.reference}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quiz Navigation */}
          <div className="quiz-navigation">
            <button className="nav-btn" onClick={restartQuiz}>
              <i className="ri-restart-line"></i>
              Anza Upya
            </button>
            <div className="progress-circle">
              <div className="circle-background"></div>
              <div className="circle-progress" style={{ 
                transform: `rotate(${getProgressPercentage() * 3.6}deg)` 
              }}></div>
              <span className="progress-text">
                {Math.round(getProgressPercentage())}%
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Quiz;