// src/pages/CustomTrackQuiz.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Style Component ---
const PageStyles = () => (
    <style dangerouslySetInnerHTML={{ __html: `
        body { /* Applied to root div */
            font-family: 'Inter', sans-serif;
            background-color: #f3f4f6; /* bg-gray-100 */
            display: flex; flex-direction: column;
            align-items: center; min-height: 100vh;
            padding: 1rem;
        }
        #share-status {
            position: fixed; bottom: 20px; left: 50%;
            transform: translateX(-50%); background-color: rgba(0, 0, 0, 0.7);
            color: white; padding: 10px 20px; border-radius: 8px;
            opacity: 0; transition: opacity 0.3s ease-in-out; z-index: 100;
        }
        #share-status.show { opacity: 1; }
        #mobile-menu { /* Basic mobile menu styles */
            transition: transform 0.3s ease-in-out;
            transform: translateY(-100%); position: fixed; /* Use fixed for overlay */
            top: 0; left: 0; width: 100%; height: 100%;
            background-color: rgba(255, 255, 255, 0.95); /* bg-white bg-opacity-95 */
            backdrop-filter: blur(4px); /* backdrop-blur-sm */
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            z-index: 50;
        }
        #mobile-menu.active { transform: translateY(0); }
        /* Tailwind button focus rings */
        button:focus {
            outline: 2px solid transparent; outline-offset: 2px;
            --tw-ring-color: #3b82f6; /* ring-blue-500 for share button */
             box-shadow: 0 0 0 2px var(--tw-ring-color), 0 0 0 4px white;
        }
        /* Answer button specific focus */
        #answers-container button:focus {
             --tw-ring-color: #d1d5db; /* ring-gray-300 or similar */
        }
        /* Color classes */
        .feedback-correct { color: #10b981; } /* text-green-600 */
        .feedback-incorrect { color: #ef4444; } /* text-red-600 */
        .answer-correct { background-color: #10b981; color: white; } /* bg-green-500 */
        .answer-incorrect { background-color: #ef4444; color: white; } /* bg-red-500 */
        .answer-default { background-color: #e5e7eb; color: #1f2937; } /* bg-gray-200 text-gray-800 */
        .answer-default:hover { background-color: #d1d5db; } /* hover:bg-gray-300 */
    `}} />
);

// --- Quiz Questions ---
const questions = [
    { question: "What is the most effective way to start a professional email?", answers: ["Hey, [name]", "To whom it may concern", "Dear [name]", "Yo, what's up"], correct: "Dear [name]" },
    { question: "In project management, what does the acronym 'KPI' stand for?", answers: ["Key Performance Indicator", "Known Project Issues", "Keep Project Information", "Kickstart Professional Initiatives"], correct: "Key Performance Indicator" },
    { question: "Which of these is a common strategy to improve a team's productivity and collaboration?", answers: ["Weekly status reports", "Daily stand-up meetings", "Individual performance reviews", "Mandatory silent work hours"], correct: "Daily stand-up meetings" },
    { question: "What is the primary purpose of a professional elevator pitch?", answers: ["To tell a long story about yourself", "To sell a specific product", "To introduce yourself and your value concisely", "To ask for a job on the spot"], correct: "To introduce yourself and your value concisely" },
    { question: "What is the 'cloud' in a business context?", answers: ["A physical server room within the office", "A remote server for data storage and services", "The internet itself", "A company's internal network"], correct: "A remote server for data storage and services" }
];

// --- Main Component ---
function CustomTrackQuiz() {
    const [currentScreen, setCurrentScreen] = useState('welcome'); // 'welcome', 'quiz', 'results'
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [shareStatus, setShareStatus] = useState({ show: false, message: '' });
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    const startQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setFeedback('');
        setSelectedAnswer(null);
        setCurrentScreen('quiz');
    };

    const handleAnswerSelect = (selected, correct) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(selected);
        if (selected === correct) {
            setScore(prev => prev + 1);
            setFeedback('Correct!');
        } else {
            setFeedback('Incorrect!');
        }
    };

    const nextQuestion = () => {
        const nextIndex = currentQuestionIndex + 1;
        setSelectedAnswer(null);
        setFeedback('');
        if (nextIndex < questions.length) {
            setCurrentQuestionIndex(nextIndex);
        } else {
            setCurrentScreen('results');
        }
    };

    const showShareMessage = (message) => {
        setShareStatus({ show: true, message: message });
        setTimeout(() => {
            setShareStatus({ show: false, message: '' });
        }, 3000);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => showShareMessage("Link copied to clipboard!"))
            .catch(err => console.error('Failed to copy: ', err));
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 w-full">
            <PageStyles />

            {/* Navigation Header */}
            <header className="w-full max-w-5xl mb-8 flex justify-between items-center bg-white p-4 rounded-full shadow-lg">
                {/* ... Header content (same as CustomTrackForm) ... */}
                 <div className="flex-shrink-0">
                    <a href="https://www.aulice.ca/" target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-blue-600 hover:text-blue-800 transition duration-300">
                        Aulice Academy
                    </a>
                 </div>
                 <nav className="hidden md:flex flex-grow justify-center space-x-6">
                     {/* ... Nav links ... */}
                    <a href="https://aulice-about.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 font-medium transition duration-300">About Us</a>
                    <a href="https://aulice-pricing-plans.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 font-medium transition duration-300">Pricing</a>
                    <a href="https://aulice-lexicon.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 font-medium transition duration-300">Lexicon</a>
                    <a href="https://aulice-teacher-dashboard.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 font-medium transition duration-300">Teacher</a>
                    <a href="https://aulice-contact.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 font-medium transition duration-300">Contact</a>
                 </nav>
                 <div className="flex items-center space-x-2">
                    <button id="share-button" onClick={handleShare} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Share
                    </button>
                    <button id="mobile-menu-button" onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-gray-600 hover:text-blue-600 focus:outline-none">
                        {/* ... SVG ... */}
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Main content container */}
            <div id="quiz-container" className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full text-center">
                {/* Welcome Screen */}
                {currentScreen === 'welcome' && (
                    <div id="welcome-screen" className="space-y-6">
                        <h1 className="text-4xl font-bold text-gray-800">Professional Awareness Quiz</h1>
                        <p className="text-lg text-gray-600">Test your knowledge of key business and professional concepts.</p>
                        <button id="start-button" onClick={startQuiz} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105">
                            Start Quiz
                        </button>
                    </div>
                )}

                {/* Quiz Screen */}
                {currentScreen === 'quiz' && currentQuestion && (
                    <div id="quiz-screen" className="space-y-6">
                        <h2 id="question-text" className="text-2xl font-semibold text-gray-800 mb-4">{currentQuestion.question}</h2>
                        <div id="answers-container" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentQuestion.answers.map((answer, index) => {
                                let buttonClass = 'answer-default font-semibold py-4 px-6 rounded-xl transition-colors w-full';
                                if (selectedAnswer !== null) {
                                    if (answer === currentQuestion.correct) {
                                        buttonClass = 'answer-correct font-semibold py-4 px-6 rounded-xl transition-colors w-full';
                                    } else if (answer === selectedAnswer) {
                                        buttonClass = 'answer-incorrect font-semibold py-4 px-6 rounded-xl transition-colors w-full';
                                    } else {
                                        buttonClass += ' opacity-50 cursor-not-allowed';
                                    }
                                }
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerSelect(answer, currentQuestion.correct)}
                                        className={buttonClass}
                                        disabled={selectedAnswer !== null}
                                    >
                                        {answer}
                                    </button>
                                );
                            })}
                        </div>
                        <p id="feedback" className={`text-lg font-medium mt-4 ${feedback === 'Correct!' ? 'feedback-correct' : 'feedback-incorrect'}`}>
                            {feedback}
                        </p>
                        {selectedAnswer !== null && (
                            <button id="next-button" onClick={nextQuestion} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105 mt-6">
                                {currentQuestionIndex === questions.length - 1 ? 'Show Results' : 'Next Question'}
                            </button>
                        )}
                    </div>
                )}

                {/* Results Screen */}
                {currentScreen === 'results' && (
                    <div id="results-screen" className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-800">Quiz Complete!</h2>
                        <p id="score-text" className="text-2xl text-gray-600">You scored {score} out of {questions.length}!</p>
                        <button id="restart-button" onClick={startQuiz} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105">
                            Restart Quiz
                        </button>
                        {/* Optional: Add link back to form or home */}
                         {/* <a href="/path-to-form-or-home" className="mt-4 inline-block text-blue-600 hover:underline">Continue to Course Design</a> */}
                    </div>
                )}
            </div>

             {/* Mobile Navigation Menu */}
             <div id="mobile-menu" className={` ${isMobileMenuOpen ? 'active' : ''} fixed top-0 left-0 w-full h-full space-y-8 `}>
                <button id="close-menu-button" onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 text-gray-600 hover:text-blue-600 focus:outline-none">
                    {/* ... Close SVG ... */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                 {/* ... Mobile Nav links ... */}
                <a href="https://www.aulice.ca/" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-800 hover:text-blue-600 font-bold transition duration-300">Gate</a>
                <a href="https://aulice-about.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-800 hover:text-blue-600 font-bold transition duration-300">About Us</a>
                <a href="https://aulice-pricing-plans.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-800 hover:text-blue-600 font-bold transition duration-300">Pricing Plans</a>
                <a href="https://aulice-lexicon.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-800 hover:text-blue-600 font-bold transition duration-300">Lexicon</a>
                <a href="https://aulice-teacher-dashboard.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-800 hover:text-blue-600 font-bold transition duration-300">Teacher</a>
                <a href="https://aulice-contact.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-800 hover:text-blue-600 font-bold transition duration-300">Contact</a>
            </div>


            {/* Share status message */}
            <div id="share-status" className={`${shareStatus.show ? 'show' : 'hidden'}`}>
                {shareStatus.message}
            </div>
        </div>
    );
}

export default CustomTrackQuiz;