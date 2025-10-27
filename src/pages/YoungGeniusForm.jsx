// src/pages/YoungGeniusForm.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
// --- Firebase Setup (Add your config and initialize) ---
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import firebaseConfig from './firebaseConfig'; // Your Firebase config file

// Initialize Firebase (do this once, maybe in App.jsx or index.js)
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// --------------------------------------------------------


// --- Style Component ---
const PageStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    body { /* Applied to root or wrapper */
        font-family: 'Inter', sans-serif;
        background-color: #f3f4f6; /* bg-gray-100 */
    }
    .step-section {
        display: none;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }
    .step-section.active {
        display: block;
        opacity: 1;
    }
    #share-status {
        position: fixed; bottom: 20px; left: 50%;
        transform: translateX(-50%); background-color: rgba(0, 0, 0, 0.7);
        color: white; padding: 10px 20px; border-radius: 8px;
        opacity: 0; transition: opacity 0.3s ease-in-out; z-index: 50;
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
    /* Tailwind input focus rings */
    select:focus, input:focus, textarea:focus {
        --tw-ring-color: #a855f7; /* ring-purple-500 */
        --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
        --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
        box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
        border-color: #a855f7; /* border-purple-500 */
    }
    /* Quiz Answer Feedback */
     input.correct-answer {
        border-color: #10b981; /* border-green-500 */
        box-shadow: 0 0 0 2px #34d399; /* ring-2 ring-green-500 */
    }
    input.incorrect-answer {
        border-color: #ef4444; /* border-red-500 */
        box-shadow: 0 0 0 2px #f87171; /* ring-2 ring-red-500 */
    }
  `}} />
);

// --- Main Component ---
function YoungGeniusForm() {
    const [currentStep, setCurrentStep] = useState('subject'); // 'subject', 'quiz', 'form', 'final'
    const [formData, setFormData] = useState({
        age: '',
        subject: '',
        customSubject: '',
        name: '',
        email: '',
        phone: '',
        goal: '',
        customGoal: '',
    });
    const [quizAnswers, setQuizAnswers] = useState({ q1: '', q2: '', q3: '' });
    const [quizFeedback, setQuizFeedback] = useState({ q1: null, q2: null, q3: null }); // null, 'correct', 'incorrect'
    const [shareStatus, setShareStatus] = useState({ show: false, message: '' });
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // For Firebase submission

    const quizCorrectAnswers = { q1: '9', q2: 'mitochondria', q3: 'william shakespeare' };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));

        // Handle dependent visibility
        if (id === 'subject' && value !== 'Others') {
            setFormData(prev => ({ ...prev, customSubject: '' }));
        }
        if (id === 'goal' && value !== 'Other') {
            setFormData(prev => ({ ...prev, customGoal: '' }));
        }
    };

    const handleQuizInputChange = (e) => {
        const { id, value } = e.target;
        setQuizAnswers(prev => ({ ...prev, [id]: value }));
        // Clear feedback when user types
        setQuizFeedback(prev => ({ ...prev, [id]: null }));
    };

    const showShareMessage = (message) => {
        setShareStatus({ show: true, message: message });
        setTimeout(() => {
            setShareStatus({ show: false, message: '' });
        }, 3000);
    };

    const handleSubjectNext = () => {
        if (!formData.age || !formData.subject) {
            showShareMessage("Please select an age and a subject.");
            return;
        }
        if (formData.subject === 'Others' && !formData.customSubject.trim()) {
            showShareMessage("Please enter a custom subject name.");
            return;
        }
        setCurrentStep('quiz');
    };

    const handleQuizSubmit = (e) => {
        e.preventDefault();
        const feedback = {};
        let allCorrect = true;
        Object.keys(quizCorrectAnswers).forEach(key => {
            const isCorrect = quizAnswers[key].trim().toLowerCase() === quizCorrectAnswers[key];
            feedback[key] = isCorrect ? 'correct' : 'incorrect';
            if (!isCorrect) allCorrect = false;
        });
        setQuizFeedback(feedback);
        // Maybe wait a moment before proceeding? Or proceed immediately?
        // setTimeout(() => setCurrentStep('form'), 1000); // Optional delay
        setCurrentStep('form');
    };

    const handleUserInfoSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Indicate loading state

        const finalSubject = formData.subject === 'Others' ? formData.customSubject : formData.subject;
        const finalGoal = formData.goal === 'Other' ? formData.customGoal : formData.goal;

        const submissionData = {
            age: formData.age,
            subject: finalSubject,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            goal: finalGoal,
            quizAnswers: quizAnswers, // Include quiz answers if needed
            submittedAt: new Date(),
        };

        console.log('User Information:', submissionData);

        // --- Firebase Integration ---
        try {
            // Uncomment and use your initialized db instance
            // const docRef = await addDoc(collection(db, "youngGeniusSubmissions"), submissionData);
            // console.log("Document written with ID: ", docRef.id);

            // --- ConvertKit (Optional - See discussion below) ---
            // If using Firebase Functions:
            // await fetch('/.netlify/functions/subscribe-convertkit', { // Or your Firebase Function URL
            //    method: 'POST',
            //    body: JSON.stringify({ email: formData.email, name: formData.name, /* other tags/fields */ })
            // });

            setCurrentStep('final'); // Move to final step on success
        } catch (error) {
            console.error("Error adding document: ", error);
            showShareMessage("Submission failed. Please try again."); // Show error to user
        } finally {
            setIsSubmitting(false); // Reset loading state
        }
        // -----------------------------
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => showShareMessage("Link copied to clipboard!"))
            .catch(err => console.error('Failed to copy: ', err));
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 md:p-8">
            <PageStyles />

            {/* Navigation Header */}
            <header className="w-full max-w-5xl mb-8 flex justify-between items-center bg-white p-4 rounded-full shadow-lg">
                 {/* ... Header content ... */}
                 <div className="flex-shrink-0">
                    <a href="https://www.aulice.ca/" target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-purple-600 hover:text-purple-800 transition duration-300">
                        Aulice Academy
                    </a>
                 </div>
                 <nav className="hidden md:flex flex-grow justify-center space-x-6">
                    {/* ... Nav links ... */}
                    <a href="https://aulice-about.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600 font-medium transition duration-300">About Us</a>
                    <a href="https://aulice-pricing-plans.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600 font-medium transition duration-300">Pricing</a>
                    <a href="https://aulice-lexicon.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600 font-medium transition duration-300">Lexicon</a>
                    <a href="https://aulice-teacher-dashboard.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600 font-medium transition duration-300">Teacher</a>
                    <a href="https://aulice-contact.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600 font-medium transition duration-300">Contact</a>
                 </nav>
                 <div className="flex items-center space-x-2">
                    <button id="share-button" onClick={handleShare} className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
                        Share
                    </button>
                    <button id="mobile-menu-button" onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-gray-600 hover:text-purple-600 focus:outline-none">
                        {/* ... SVG ... */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Main content container */}
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-xl w-full">

                {/* Step 1: Subject and Age Selection */}
                <div id="subject-section" className={`step-section ${currentStep === 'subject' ? 'active' : ''}`}>
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Explore Your Genius!</h1>
                    <p className="text-center text-gray-500 mb-6">Select your age and subject of interest to get started.</p>

                    <div className="mb-4">
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">Your Age</label>
                        <select id="age" value={formData.age} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-150">
                            <option value="" disabled>-- Select your age --</option>
                            {[...Array(15).keys()].map(i => i + 7).map(age => <option key={age} value={age}>{age}</option>)} {/* Ages 7-21 */}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">School Subject</label>
                        <select id="subject" value={formData.subject} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-150">
                            <option value="" disabled>-- Select a subject --</option>
                            {["Mathematics", "Sciences", "Physics", "Chemistry", "Biology", "Zoology", "Literature", "Arts", "Sports", "Others"].map(subj => <option key={subj} value={subj}>{subj}</option>)}
                        </select>
                    </div>

                    <div id="custom-subject-input" className={formData.subject !== 'Others' ? 'hidden' : ''}>
                        <label htmlFor="customSubject" className="block text-sm font-medium text-gray-700 mb-2">Custom Subject</label>
                        <input type="text" id="customSubject" placeholder="e.g., Robotics" value={formData.customSubject} onChange={handleInputChange} required={formData.subject === 'Others'} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-150" />
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mt-6">
                        <button id="subject-next-btn" onClick={handleSubjectNext} className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-300">
                            Continue
                        </button>
                    </div>
                </div>

                {/* Step 2: Quick Quiz */}
                <div id="quiz-section" className={`step-section ${currentStep === 'quiz' ? 'active' : ''}`}>
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Quick School Subject Quiz</h1>
                    <p className="text-center text-gray-500 mb-6">Test your knowledge with these questions.</p>

                    <form id="quiz-form" onSubmit={handleQuizSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="q1" className="block text-sm font-medium text-gray-700 mb-2">1. What is the square root of 81?</label>
                            <input type="text" id="q1" value={quizAnswers.q1} onChange={handleQuizInputChange} required className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm ${quizFeedback.q1 ? (quizFeedback.q1 === 'correct' ? 'correct-answer' : 'incorrect-answer') : ''}`} />
                        </div>
                        <div>
                            <label htmlFor="q2" className="block text-sm font-medium text-gray-700 mb-2">2. What is the powerhouse of the cell?</label>
                            <input type="text" id="q2" value={quizAnswers.q2} onChange={handleQuizInputChange} required className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm ${quizFeedback.q2 ? (quizFeedback.q2 === 'correct' ? 'correct-answer' : 'incorrect-answer') : ''}`} />
                        </div>
                        <div>
                            <label htmlFor="q3" className="block text-sm font-medium text-gray-700 mb-2">3. Who wrote 'Romeo and Juliet'?</label>
                            <input type="text" id="q3" value={quizAnswers.q3} onChange={handleQuizInputChange} required className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm ${quizFeedback.q3 ? (quizFeedback.q3 === 'correct' ? 'correct-answer' : 'incorrect-answer') : ''}`} />
                        </div>

                        <button type="submit" className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-300">
                            Check My Answers & Continue
                        </button>
                    </form>
                </div>

                {/* Step 3: Congratulations & User Form */}
                <div id="form-section" className={`step-section ${currentStep === 'form' ? 'active' : ''}`}>
                    <h1 className="text-3xl font-bold text-center text-green-600 mb-4">Congratulations!</h1>
                    <p className="text-center text-lg text-gray-700 mb-8">You've won a **free consultation** to design your tailor-made on-demand course.</p>

                    <form id="user-info-form" onSubmit={handleUserInfoSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" id="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" value={formData.email} onChange={handleInputChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm" />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                            <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm" />
                        </div>
                        <div>
                             <label htmlFor="goal" className="block text-sm font-medium text-gray-700">Your Goal</label>
                            <select id="goal" value={formData.goal} onChange={handleInputChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm">
                                <option value="" disabled>-- Select a goal --</option>
                                {["Employment", "Promotion", "Relocation", "Exam", "Education", "Conference", "Project", "Business", "Other"].map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>
                        <div id="custom-goal-input" className={formData.goal !== 'Other' ? 'hidden' : ''}>
                            <label htmlFor="customGoal" className="block text-sm font-medium text-gray-700">Describe your goal</label>
                            <textarea id="customGoal" rows="3" value={formData.customGoal} onChange={handleInputChange} required={formData.goal === 'Other'} className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"></textarea>
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-300 disabled:opacity-50">
                            {isSubmitting ? 'Submitting...' : 'Submit & Schedule'}
                        </button>
                    </form>
                </div>

                {/* Step 4: Final Screen */}
                <div id="final-section" className={`step-section text-center ${currentStep === 'final' ? 'active' : ''}`}>
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">You're All Set!</h1>
                    <p className="text-center text-lg text-gray-600 mb-8">Click the button below to schedule your free consultation with one of our experts and start designing your course.</p>

                    <a href="https://calendly.com/aulice" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-purple-700 transition duration-300 transform hover:scale-105">
                        Schedule My Free Session 🗓️
                    </a>
                </div>

            </div> {/* End Main Content Container */}

            {/* Mobile Navigation Menu */}
             <div id="mobile-menu" className={` ${isMobileMenuOpen ? 'active' : ''} fixed top-0 left-0 w-full h-full space-y-8 `}> {/* Use fixed positioning */}
                <button id="close-menu-button" onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 text-gray-600 hover:text-purple-600 focus:outline-none">
                    {/* ... Close SVG ... */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {/* ... Mobile Nav links ... */}
                <a href="https://www.aulice.ca/" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-800 hover:text-purple-600 font-bold transition duration-300">Gate</a>
                <a href="https://aulice-about.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-800 hover:text-purple-600 font-bold transition duration-300">About Us</a>
                <a href="https://aulice-pricing-plans.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-800 hover:text-purple-600 font-bold transition duration-300">Pricing Plans</a>
                <a href="https://aulice-lexicon.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-800 hover:text-purple-600 font-bold transition duration-300">Lexicon</a>
                <a href="https://aulice-teacher-dashboard.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-800 hover:text-purple-600 font-bold transition duration-300">Teacher</a>
                <a href="https://aulice-contact.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-800 hover:text-purple-600 font-bold transition duration-300">Contact</a>
            </div>


            {/* Share status message */}
            <div id="share-status" className={`${shareStatus.show ? 'show' : 'hidden'}`}>
                {shareStatus.message}
            </div>

        </div> // End Root Div
    );
}

export default YoungGeniusForm;