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
        },
        {
          question: "Biblia ina Agano ngapi?",
          options: ["Agano 1", "Agano 3", "Agano 2", "Agano 4"],
          answer: "Agano 2",
          reference: "2 Wakorintho 3:6"
        },
        {
          question: "Danieli alitupwa wapi?",
          options: ["Jangwani", "Shimoni la simba", "Bahari", "Gerezani"],
          answer: "Shimoni la simba",
          reference: "Danieli 6:16"
        },
        {
          question: "Mungu alitoa amri ngapi kwa Musa?",
          options: ["Amri 5", "Amri 7", "Amri 10", "Amri 12"],
          answer: "Amri 10",
          reference: "Kutoka 20:1-17"
        },
        {
          question: "Yesu alizaliwa mji gani?",
          options: ["Nazareti", "Yerusalemu", "Bethlehemu", "Galilaya"],
          answer: "Bethlehemu",
          reference: "Mathayo 2:1"
        },
        {
          question: "Yesu alifufuka baada ya siku ngapi?",
          options: ["Siku 1", "Siku 2", "Siku 3", "Siku 4"],
          answer: "Siku 3",
          reference: "Luka 24:7"
        },
        {
          question: "Nani alimkana Yesu mara tatu?",
          options: ["Yohana", "Petro", "Yakobo", "Andereya"],
          answer: "Petro",
          reference: "Mathayo 26:69-75"
        },
        {
          question: "Kitabu cha kwanza cha Biblia ni?",
          options: ["Kutoka", "Mwanzo", "Walawi", "Yoshua"],
          answer: "Mwanzo",
          reference: "Mwanzo 1:1"
        },
        {
          question: "Mfalme gani aliomba hekma kwa Mungu?",
          options: ["Faro", "Suleimani", "Daudi", "Sauli"],
          answer: "Suleimani",
          reference: "1 Wafalme 3:9"
        },
        {
          question: "Nani aliwaokoa Waisraeli kutoka kwa Wafilisti?",
          options: ["Samsoni", "Gideoni", "Samweli", "Debora"],
          answer: "Samsoni",
          reference: "Waamuzi 13-16"
        },
        {
          question: "Yesu alifanya mwujiza wa kwanza wapi?",
          options: ["Kafarnaumu", "Kana", "Yerusalemu", "Yeriko"],
          answer: "Kana",
          reference: "Yohana 2:11"
        }
      ]
    },
    {
      name: "Msalaba na Kufa",
      difficulty: "Wastani",
      questions: [
        {
          question: "Yesu alisulubiwa wapi?",
          options: ["Mlima Sinai", "Kalvari (Golgotha)", "Mlima wa Zeituni", "Bustani ya Getsemane"],
          answer: "Kalvari (Golgotha)",
          reference: "Mathayo 27:33"
        },
        {
          question: "Nani aliagiza msalaba wa Yesu?",
          options: ["Mfalme Herode", "Pontio Pilato", "Kayafa Kuhani Mkuu", "Kaiza Tiberius"],
          answer: "Pontio Pilato",
          reference: "Mathayo 27:26"
        },
        {
          question: "Yesu alishtakiwa kwa nini?",
          options: ["Wizi", "Kumtukana Mungu", "Uasi dhidi ya Roma", "Kuvunja Sabato"],
          answer: "Kumtukana Mungu",
          reference: "Mathayo 26:65"
        },
        {
          question: "Yuda alimsaliti Yesu kwa fedha ngapi?",
          options: ["Denari 20", "Denari 30", "Denari 40", "Denari 50"],
          answer: "Denari 30",
          reference: "Mathayo 26:15"
        },
        {
          question: "Askari walimvisha Yesu nini kabla ya kumsulibisha?",
          options: ["Taji ya dhahabu", "Taji ya miiba", "Kitambaa cha kitani", "Kofia ya kijeshi"],
          answer: "Taji ya miiba",
          reference: "Mathayo 27:29"
        },
        {
          question: "Nani alimsaidia Yesu kubeba msalaba?",
          options: ["Simoni wa Kurene", "Yosefu wa Arimathea", "Nikodemo", "Baraba"],
          answer: "Simoni wa Kurene",
          reference: "Mathayo 27:32"
        },
        {
          question: "Ilikuwaje juu ya msalaba wa Yesu?",
          options: ["Nabii wa Nazareti", "Mfalme wa Wayahudi", "Anajidai kuwa Masihi", "Adui wa Roma"],
          answer: "Mfalme wa Wayahudi",
          reference: "Mathayo 27:37"
        },
        {
          question: "Ni yupi mwizi aliyetubu alipokuwa amesulubiwa kando ya Yesu?",
          options: ["Gestas", "Dismas", "Baraba", "Yuda"],
          answer: "Dismas",
          reference: "Luka 23:39-43"
        },
        {
          question: "Ni tukio gani la kimiujiza lilitokea Yesu alipokufa?",
          options: ["Kupatwa kwa jua", "Paranda ya hekalu ikachanika", "Tetemeko la ardhi", "Yote hapo juu"],
          answer: "Yote hapo juu",
          reference: "Mathayo 27:45, 51-52"
        },
        {
          question: "Nani aliomba mwili wa Yesu kwa ajili ya kuzika?",
          options: ["Nikodemo", "Yosefu wa Arimathea", "Petro", "Yohana Mbatizaji"],
          answer: "Yosefu wa Arimathea",
          reference: "Mathayo 27:57-58"
        },
        {
          question: "Yesu alisema nini msalabani: 'Eli, Eli, lama sabachthani' inamaanisha?",
          options: ["Baba nimtie mkono", "Baba nimekamilisha", "Mungu wangu, kwa nini umeniacha", "Msamaha wao"],
          answer: "Mungu wangu, kwa nini umeniacha",
          reference: "Mathayo 27:46"
        },
        {
          question: "Askari walichukua nini kutoka kwa Yesu msalabani?",
          options: ["Mavazi yake", "Mikanda yake", "Viatu vyake", "Kamba zake"],
          answer: "Mavazi yake",
          reference: "Yohana 19:23-24"
        },
        {
          question: "Yesu aliwapa nini mama yake na Yohana msalabani?",
          options: ["Amri ya kuwaambatana", "Baraka ya mwisho", "Ushauri wa kuondoka", "Ahadi ya kufufuka"],
          answer: "Amri ya kuwaambatana",
          reference: "Yohana 19:26-27"
        },
        {
          question: "Mto gani ulitoka kwa Yesu alipochomwa mkuki?",
          options: ["Maji na damu", "Maji tu", "Damu tu", "Mafuta na maji"],
          answer: "Maji na damu",
          reference: "Yohana 19:34"
        },
        {
          question: "Yesu alikufa saa ngapi?",
          options: ["Saa tisa", "Saa sita", "Saa tatu", "Saa kumi na mbili"],
          answer: "Saa tisa",
          reference: "Mathayo 27:45-50"
        }
      ]
    },
    {
      name: "Kufufuka na Kupaa",
      difficulty: "Ngumu",
      questions: [
        {
          question: "Kaburi la Yesu lilifungwa vipi?",
          options: ["Kwa mlango wa mbao", "Kwa jiwe kubwa", "Kwa walinzi Waroma", "Yote hapo juu"],
          answer: "Kwa jiwe kubwa",
          reference: "Mathayo 27:60"
        },
        {
          question: "Yesu alifufuka siku gani?",
          options: ["Sabato (Jumamosi)", "Siku ya tatu (Jumapili)", "Siku ya nne (Jumatatu)", "Siku ya saba"],
          answer: "Siku ya tatu (Jumapili)",
          reference: "Mathayo 28:1"
        },
        {
          question: "Nani walikuwa mashahidi wa kwanza wa kaburi lililokuwa wazi?",
          options: ["Petro na Yohana", "Maria Magdalena na wanawake wengine", "Walinzi Waroma", "Mafarisayo"],
          answer: "Maria Magdalena na wanawake wengine",
          reference: "Mathayo 28:1"
        },
        {
          question: "Ni yupi mwanafunzi aliyeshuku kufufuka kwa Yesu hadi akaona vidonda vyake?",
          options: ["Thoma", "Andereya", "Mathayo", "Filipo"],
          answer: "Thoma",
          reference: "Yohana 20:24-29"
        },
        {
          question: "Yesu aliwaonekana kwa wanafunzi wake kwa siku ngapi baada ya kufufuka?",
          options: ["Siku 3", "Siku 7", "Siku 40", "Siku 100"],
          answer: "Siku 40",
          reference: "Matendo 1:3"
        },
        {
          question: "Yesu alipaa mbinguni wapi?",
          options: ["Mlima Sinai", "Mlima wa Zeituni", "Bustani ya Getsemane", "Bahari ya Galilaya"],
          answer: "Mlima wa Zeituni",
          reference: "Matendo 1:9-12"
        },
        {
          question: "Yesu alikula nini baada ya kufufuka kuthibitisha kuwa sio kivuli?",
          options: ["Mkate na divai", "Samaki na asali", "Manna", "Nyama ya kondoo"],
          answer: "Samaki na asali",
          reference: "Luka 24:42-43"
        },
        {
          question: "Nani walilinda kaburi la Yesu kuzuia kuibwa mwili wake?",
          options: ["Makuhani Wayahudi", "Walinzi Waroma", "Walindi wa hekalu", "Wanafunzi"],
          answer: "Walinzi Waroma",
          reference: "Mathayo 27:65-66"
        },
        {
          question: "Ni nabii gani wa Agano la Kale aliyeabiri kufufuka kwa Yesu?",
          options: ["Isaya", "Yona", "Danieli", "Daudi"],
          answer: "Yona",
          reference: "Mathayo 12:40"
        },
        {
          question: "Malaika aliwaambia nini wanawake walipofika kaburini?",
          options: ["Analala", "Yuko hapa; amefufuka!", "Nendeni mwaambie Mafarisayo", "Subirieni hapa kwa ajili ya kurudi kwake"],
          answer: "Yuko hapa; amefufuka!",
          reference: "Mathayo 28:6"
        },
        {
          question: "Yesu aliwapa wanafunzi wake amri gani mwisho kabla ya kupaa mbinguni?",
          options: ["Amri ya kuinjilisha", "Amri ya kujenga kanisa", "Amri ya kuandika Biblia", "Amri ya kufanya miujiza"],
          answer: "Amri ya kuinjilisha",
          reference: "Matendo 1:8"
        },
        {
          question: "Wanafunzi wangapi waliomuona Yesu alipopaa mbinguni?",
          options: ["Wote 12", "11 tu", "10 tu", "Wachache tu"],
          answer: "11 tu",
          reference: "Matendo 1:9-11"
        },
        {
          question: "Yesu aliwahidi nini wanafunzi wake kabla ya kupaa?",
          options: ["Kurudi haraka", "Kutuma Roho Mtakatifu", "Kuwapa ufalme", "Kuwapa utajiri"],
          answer: "Kutuma Roho Mtakatifu",
          reference: "Matendo 1:4-5"
        },
        {
          question: "Yesu alimwambia nini Maria Magdalena alipomwona baada ya kufufuka?",
          options: ["Usiniguse", "Nenda uwaambie ndugu zangu", "Subiri hapa", "Toka hapa"],
          answer: "Usiniguse",
          reference: "Yohana 20:17"
        },
        {
          question: "Yesu aliwaonekana kwa wanafunzi wake wapi walipokuwa wamefunika mlango?",
          options: ["Uwanjani", "Sokoni", "Chumbani", "Mlimani"],
          answer: "Chumbani",
          reference: "Yohana 20:19"
        }
      ]
    },
    {
      name: "Agano la Kale",
      difficulty: "Bingwa",
      questions: [
        {
          question: "Nani alijenga hekalu la kwanza la Mungu katika Yerusalemu?",
          options: ["Suleimani", "Daudi", "Musa", "Eliya"],
          answer: "Suleimani",
          reference: "1 Wafalme 6:1"
        },
        {
          question: "Kwa miaka mingapi Waisraeli walikaa jangwani baada ya kutoka Misri?",
          options: ["Miaka 20", "Miaka 30", "Miaka 40", "Miaka 50"],
          answer: "Miaka 40",
          reference: "Kumbukumbu la Torati 8:2"
        },
        {
          question: "Nani aliandika Zaburi nyingi katika Biblia?",
          options: ["Suleimani", "Daudi", "Isaya", "Yeremia"],
          answer: "Daudi",
          reference: "Zaburi 73:20"
        },
        {
          question: "Ni agano gani lililofanywa kati ya Mungu na Waisraeli katika Mlima Sinai?",
          options: ["Agano la Kale", "Agano Jipya", "Agano la Musa", "Agano la Sheria"],
          answer: "Agano la Sheria",
          reference: "Kutoka 24:7-8"
        },
        {
          question: "Nani alikuwa mwanamke wa kwanza katika Biblia?",
          options: ["Sara", "Rehema", "Hawa", "Eva"],
          answer: "Hawa",
          reference: "Mwanzo 3:20"
        },
        {
          question: "Mtu gani aliandika vitabu vingi zaidi katika Agano la Kale?",
          options: ["Musa", "Daudi", "Isaya", "Yeremia"],
          answer: "Musa",
          reference: "Kutoka 24:4"
        },
        {
          question: "Nani aliomba mvua isimame miaka 3 na nusu?",
          options: ["Eliya", "Elisha", "Isaya", "Yeremia"],
          answer: "Eliya",
          reference: "1 Wafalme 17:1"
        },
        {
          question: "Mtu gani alitembea na Mungu na hakufa?",
          options: ["Henoki", "Eliya", "Musa", "Abrahamu"],
          answer: "Henoki",
          reference: "Mwanzo 5:24"
        },
        {
          question: "Nani aliwaokoa Waisraeli kutoka kwa Wamidiani?",
          options: ["Samsoni", "Gideoni", "Samweli", "Debora"],
          answer: "Gideoni",
          reference: "Waamuzi 6:11-16"
        },
        {
          question: "Mtu gani aliandika kitabu cha Ayubu?",
          options: ["Ayubu mwenyewe", "Musa", "Suleimani", "Haijulikani"],
          answer: "Haijulikani",
          reference: "Ayubu 1:1"
        },
        {
          question: "Nani alikuwa kuhani mkuu wa kwanza wa Israeli?",
          options: ["Haruni", "Musa", "Eleazari", "Itamari"],
          answer: "Haruni",
          reference: "Kutoka 28:1"
        },
        {
          question: "Mtu gani aliwaambia Waisraeli 'Mchague leo mtakayemtumikia'?",
          options: ["Yoshua", "Musa", "Samweli", "Daudi"],
          answer: "Yoshua",
          reference: "Yoshua 24:15"
        },
        {
          question: "Nani aliwaambia Waisraeli 'Usiogope, maana Bwana atapambana nanyi'?",
          options: ["Musa", "Yoshua", "Samweli", "Isaya"],
          answer: "Musa",
          reference: "Kutoka 14:13-14"
        },
        {
          question: "Mtu gani alikuwa nabii mwenye nguvu zaidi katika Agano la Kale?",
          options: ["Musa", "Eliya", "Isaya", "Yeremia"],
          answer: "Musa",
          reference: "Kumbukumbu la Torati 34:10-12"
        },
        {
          question: "Nani aliandika 'Hofu ya Bwana ndiyo mwanzo wa hekima'?",
          options: ["Suleimani", "Daudi", "Ayubu", "Musa"],
          answer: "Suleimani",
          reference: "Mithali 9:10"
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