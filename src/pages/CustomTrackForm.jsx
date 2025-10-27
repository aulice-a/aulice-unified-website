// src/pages/CustomTrackForm.jsx
import React, { useState } from 'react';
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
    body { /* Applied to root div */
        font-family: 'Inter', sans-serif;
        background-color: #f3f4f6; /* bg-gray-100 */
    }
    .step-section {
        display: none; opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }
    .step-section.active { display: block; opacity: 1; }
    #share-status {
        position: fixed; bottom: 20px; left: 50%;
        transform: translateX(-50%); background-color: rgba(0, 0, 0, 0.7);
        color: white; padding: 10px 20px; border-radius: 8px;
        opacity: 0; transition: opacity 0.3s ease-in-out; z-index: 100;
    }
    #share-status.show { opacity: 1; }
    #mobile-menu { /* Mobile menu styles */
        transition: transform 0.3s ease-in-out;
        transform: translateY(-100%); position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background-color: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(4px);
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        z-index: 50;
    }
    #mobile-menu.active { transform: translateY(0); }
    /* Input focus */
    select:focus, input:focus, textarea:focus {
        --tw-ring-color: #3b82f6; /* ring-blue-500 */
        box-shadow: 0 0 0 1px var(--tw-ring-color), 0 0 0 3px rgba(59, 130, 246, 0.5); /* ring-blue-500 */
        border-color: #3b82f6; /* border-blue-500 */
    }
    /* Quiz/Assessment Feedback */
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
function CustomTrackForm() {
    const [currentStep, setCurrentStep] = useState('course'); // 'course', 'assessment', 'quiz', 'form', 'final'
    const [formData, setFormData] = useState({
        course: '',
        customCourse: '',
        name: '',
        email: '',
        phone: '',
        goal: '',
        customGoal: '',
    });
    const [assessmentAnswers, setAssessmentAnswers] = useState({ q1: '', q2: '', q3: '' });
    const [assessmentFeedback, setAssessmentFeedback] = useState({ q1: null, q2: null, q3: null });
    const [quizAnswers, setQuizAnswers] = useState({ q1: '', q2: '', q3: '' });
    const [quizFeedback, setQuizFeedback] = useState({ q1: null, q2: null, q3: null });
    const [shareStatus, setShareStatus] = useState({ show: false, message: '' });
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const assessmentCorrectAnswers = { q1: 'return on investment', q2: 'the final date for completion', q3: 'the combined effect of two or more agents is greater than the sum of their individual effects' };
    const quizCorrectAnswers = { q1: 'business to business', q2: 'profit and loss', q3: 'strengths, weaknesses, opportunities, threats' };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));

        if (id === 'course' && value !== 'Others') {
            setFormData(prev => ({ ...prev, customCourse: '' }));
        }
        if (id === 'goal' && value !== 'Other') { // Corrected ID check
            setFormData(prev => ({ ...prev, customGoal: '' }));
        }
    };

    const handleAssessmentInputChange = (e) => {
        const { id, value } = e.target;
        setAssessmentAnswers(prev => ({ ...prev, [id]: value }));
        setAssessmentFeedback(prev => ({ ...prev, [id]: null })); // Clear feedback
    };

    const handleQuizInputChange = (e) => {
        const { id, value } = e.target;
        setQuizAnswers(prev => ({ ...prev, [id]: value }));
        setQuizFeedback(prev => ({ ...prev, [id]: null })); // Clear feedback
    };

    const showShareMessage = (message) => {
        setShareStatus({ show: true, message: message });
        setTimeout(() => {
            setShareStatus({ show: false, message: '' });
        }, 3000);
    };

    const handleCourseNext = () => {
        if (!formData.course) {
            showShareMessage("Please select a course.");
            return;
        }
        if (formData.course === 'Others' && !formData.customCourse.trim()) {
            showShareMessage("Please enter a custom course name.");
            return;
        }
        setCurrentStep('assessment');
    };

    const handleQuizButton = () => {
        setCurrentStep('quiz');
    };

    const handleAssessmentSubmit = (e) => {
        e.preventDefault();
        const feedback = {};
        Object.keys(assessmentCorrectAnswers).forEach(key => {
            const isCorrect = assessmentAnswers[key].trim().toLowerCase() === assessmentCorrectAnswers[key];
            feedback[key] = isCorrect ? 'correct' : 'incorrect';
        });
        setAssessmentFeedback(feedback);
        setCurrentStep('form');
    };

    const handleQuizSubmit = (e) => {
        e.preventDefault();
        const feedback = {};
        Object.keys(quizCorrectAnswers).forEach(key => {
            const isCorrect = quizAnswers[key].trim().toLowerCase() === quizCorrectAnswers[key];
            feedback[key] = isCorrect ? 'correct' : 'incorrect';
        });
        setQuizFeedback(feedback);
        setCurrentStep('form');
    };

     const handleUserInfoSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const finalCourse = formData.course === 'Others' ? formData.customCourse : formData.course;
        const finalGoal = formData.goal === 'Other' ? formData.customGoal : formData.goal;

        const submissionData = {
            selectedCourse: finalCourse,
            assessmentAnswers: currentStep === 'assessment' ? assessmentAnswers : null, // Include based on path taken
            quizAnswers: currentStep === 'quiz' ? quizAnswers : null, // Include based on path taken
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            goal: finalGoal,
            submittedAt: new Date(),
            formType: 'CustomTrack', // Add identifier
        };

        console.log('User Information (Custom Track):', submissionData);

        // --- Firebase Integration ---
        try {
            // Uncomment and use your initialized db instance
            // const docRef = await addDoc(collection(db, "customTrackSubmissions"), submissionData);
            // console.log("Document written with ID: ", docRef.id);

            // --- ConvertKit (Optional - Via Firebase Function) ---
            // await fetch('/path/to/your/firebase/function', {
            //    method: 'POST',
            //    body: JSON.stringify({ email: formData.email, name: formData.name, tags: ['CustomTrackLead'] })
            // });

            setCurrentStep('final'); // Move to final step on success
        } catch (error) {
            console.error("Error adding document: ", error);
            showShareMessage("Submission failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
        // -----------------------------
    };


    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => showShareMessage("Link copied to clipboard!"))
            .catch(err => console.error('Failed to copy: ', err));
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 w-full"> {/* Root div */}
            <PageStyles />

            {/* Navigation Header */}
            <header className="w-full max-w-5xl mb-8 flex justify-between items-center bg-white p-4 rounded-full shadow-lg">
                 {/* ... Header content ... */}
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
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-xl w-full">

                {/* Step 1: Course Selection & Quiz Entry */}
                <div id="course-section" className={`step-section ${currentStep === 'course' ? 'active' : ''}`}>
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Design Your Custom Learning Path</h1>
                    <p className="text-center text-gray-500 mb-6">Select a general area or take a quiz to help us tailor your experience.</p>

                    <div className="mb-4">
                        <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">Primary Area of Interest</label>
                        <select id="course" value={formData.course} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-150">
                            <option value="" disabled>-- Select an area --</option>
                            {/* Example course areas */}
                            <option value="Professional English">Professional English</option>
                            <option value="Advanced Communication">Advanced Communication</option>
                            <option value="Leadership & Team Management">Leadership & Team Management</option>
                            <option value="Industry Specific (e.g., Tech, Finance)">Industry Specific</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <div id="custom-course-input" className={formData.course !== 'Others' ? 'hidden' : ''}>
                        <label htmlFor="customCourse" className="block text-sm font-medium text-gray-700 mb-2">Specify Your Area</label>
                        <input type="text" id="customCourse" placeholder="e.g., Marketing Strategy" value={formData.customCourse} onChange={handleInputChange} required={formData.course === 'Others'} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-150" />
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mt-6">
                        <button id="course-next-btn" onClick={handleCourseNext} className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                            Continue with Selection
                        </button>
                        <button id="quiz-btn" onClick={handleQuizButton} className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300">
                            Take a Quick Quiz Instead
                        </button>
                    </div>
                </div>

                {/* Step 2A: Course Assessment */}
                <div id="assessment-section" className={`step-section ${currentStep === 'assessment' ? 'active' : ''}`}>
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Quick Professional Challenge</h1>
                    <p className="text-center text-gray-500 mb-6">A few questions based on professional contexts.</p>

                    <form id="assessment-form" onSubmit={handleAssessmentSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="q1" className="block text-sm font-medium text-gray-700 mb-2">1. The term "ROI" stands for...</label>
                            <input type="text" id="q1" value={assessmentAnswers.q1} onChange={handleAssessmentInputChange} required className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm ${assessmentFeedback.q1 ? (assessmentFeedback.q1 === 'correct' ? 'correct-answer' : 'incorrect-answer') : ''}`} />
                        </div>
                        <div>
                            <label htmlFor="q2" className="block text-sm font-medium text-gray-700 mb-2">2. In project management, "deadline" refers to...</label>
                            <input type="text" id="q2" value={assessmentAnswers.q2} onChange={handleAssessmentInputChange} required className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm ${assessmentFeedback.q2 ? (assessmentFeedback.q2 === 'correct' ? 'correct-answer' : 'incorrect-answer') : ''}`} />
                        </div>
                        <div>
                            <label htmlFor="q3" className="block text-sm font-medium text-gray-700 mb-2">3. What is the meaning of "synergy"?</label>
                            <input type="text" id="q3" value={assessmentAnswers.q3} onChange={handleAssessmentInputChange} required className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm ${assessmentFeedback.q3 ? (assessmentFeedback.q3 === 'correct' ? 'correct-answer' : 'incorrect-answer') : ''}`} />
                        </div>

                        <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                            Check Answers & Continue
                        </button>
                    </form>
                </div>

                {/* Step 2B: Multi-Color Quiz */}
                 <div id="quiz-section" className={`step-section ${currentStep === 'quiz' ? 'active' : ''}`}>
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Quick Professional Awareness Quiz</h1>
                    <p className="text-center text-gray-500 mb-6">Test your knowledge. We'll show you the answers after.</p>

                    <form id="quiz-form" onSubmit={handleQuizSubmit} className="space-y-6">
                         <div>
                            <label htmlFor="q1" className="block text-sm font-medium text-gray-700 mb-2">1. The term "B2B" stands for...</label>
                            <input type="text" id="q1" value={quizAnswers.q1} onChange={handleQuizInputChange} required className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm ${quizFeedback.q1 ? (quizFeedback.q1 === 'correct' ? 'correct-answer' : 'incorrect-answer') : ''}`} />
                        </div>
                        <div>
                            <label htmlFor="q2" className="block text-sm font-medium text-gray-700 mb-2">2. In finance, what does "P&L" stand for?</label>
                            <input type="text" id="q2" value={quizAnswers.q2} onChange={handleQuizInputChange} required className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm ${quizFeedback.q2 ? (quizFeedback.q2 === 'correct' ? 'correct-answer' : 'incorrect-answer') : ''}`} />
                        </div>
                        <div>
                             <label htmlFor="q3" className="block text-sm font-medium text-gray-700 mb-2">3. A "SWOT analysis" evaluates...</label>
                            <input type="text" id="q3" value={quizAnswers.q3} onChange={handleQuizInputChange} required className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm ${quizFeedback.q3 ? (quizFeedback.q3 === 'correct' ? 'correct-answer' : 'incorrect-answer') : ''}`} />
                        </div>

                        <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                            Check My Answers & Continue
                        </button>
                    </form>
                </div>

                 {/* Step 3: Congratulations & User Form */}
                <div id="form-section" className={`step-section ${currentStep === 'form' ? 'active' : ''}`}>
                    <h1 className="text-3xl font-bold text-center text-green-600 mb-4">Congratulations!</h1>
                    <p className="text-center text-lg text-gray-700 mb-8">You qualify for a **free consultation** to design your custom learning track.</p>

                    <form id="user-info-form" onSubmit={handleUserInfoSubmit} className="space-y-4">
                        {/* Name, Email, Phone inputs - same as YoungGeniusForm */}
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
                        {/* Goal Select - same as YoungGeniusForm */}
                        <div>
                             <label htmlFor="goal" className="block text-sm font-medium text-gray-700">Your Goal</label>
                            <select id="goal" value={formData.goal} onChange={handleInputChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm">
                                <option value="" disabled>-- Select a goal --</option>
                                {["Employment", "Promotion", "Relocation", "Exam", "Education", "Conference", "Project", "Business", "Other"].map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>
                        {/* Custom Goal Input - same as YoungGeniusForm */}
                        <div id="custom-goal-input" className={formData.goal !== 'Other' ? 'hidden' : ''}>
                            <label htmlFor="customGoal" className="block text-sm font-medium text-gray-700">Describe your goal</label>
                            <textarea id="customGoal" rows="3" value={formData.customGoal} onChange={handleInputChange} required={formData.goal === 'Other'} className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"></textarea>
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 disabled:opacity-50">
                            {isSubmitting ? 'Submitting...' : 'Submit & Schedule'}
                        </button>
                    </form>
                </div>


                {/* Step 4: Final Screen */}
                <div id="final-section" className={`step-section text-center ${currentStep === 'final' ? 'active' : ''}`}>
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">You're All Set!</h1>
                    <p className="text-center text-lg text-gray-600 mb-8">Click below to schedule your free consultation and start designing your custom professional course.</p>

                    <a href="https://calendly.com/aulice" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
                        Schedule My Free Session 🗓️
                    </a>
                </div>

            </div> {/* End Main Content Container */}

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

        </div> // End Root Div
    );
}

export default CustomTrackForm;