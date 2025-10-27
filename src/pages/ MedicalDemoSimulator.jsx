import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MedicalCrisisSimulator() {
    // Use React state to store the feedback message
    const [feedback, setFeedback] = useState(null);

    // This function replaces the original chooseOption()
    const handleChooseOption = (choice) => {
        let feedbackData = {};
        let feedbackClass = '';

        switch (choice) {
            case 'patient1':
                feedbackData.title = "Immediate Priority";
                feedbackData.text = "Correct. This patient has a severe, life-threatening injury that is still treatable. They fall into the 'immediate' or 'red' category of triage, requiring your attention first to save their life.";
                feedbackClass = "border-green-500 bg-green-100 text-green-900";
                break;
            case 'patient2':
                feedbackData.title = "Delayed Care";
                feedbackData.text = "Incorrect. While this patient is in pain, their injuries are not immediately life-threatening. They would be triaged into the 'delayed' or 'yellow' category, meaning they can wait for care until the most critical patients are stabilized.";
                feedbackClass = "border-yellow-500 bg-yellow-100 text-yellow-900";
                break;
            case 'patient3':
                feedbackData.title = "Minor Injuries";
                feedbackData.text = "Incorrect. This patient is considered 'minor' or 'green' in triage. They can be treated last, as their injuries do not pose a serious risk to their life.";
                feedbackClass = "border-blue-500 bg-blue-100 text-blue-900";
                break;
            case 'patient4':
                feedbackData.title = "Deceased or Expectant";
                feedbackData.text = "Incorrect. In a multi-casualty incident, a patient with no pulse or breathing is considered 'expectant' or 'black.' Your resources would be spent on patients who have a chance of survival.";
                feedbackClass = "border-red-500 bg-red-100 text-red-900";
                break;
            default:
                setFeedback(null);
                return;
        }

        // Set the feedback object into state
        setFeedback({ ...feedbackData, feedbackClass });
    };

    // Styles that were on the <body> tag, applied to the root div
    const pageStyles = {
        fontFamily: "'Inter', sans-serif",
        backgroundImage: "url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2940&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
    };
    
    // Replaced the custom CSS for nav links with Tailwind classes
    const navLinkClass = "text-white mx-2 font-bold text-sm hover:underline";

    return (
        <div 
            className="flex items-center justify-center min-h-screen p-4" 
            style={pageStyles}
        >
            {/* Header Navigation */}
            <header className="absolute top-4 w-full text-center">
                <nav>
                    <a href="https://www.aulice.ca/" className={navLinkClass}>Gate</a>
                    <a href="https://aulice-main-hub.netlify.app/" className={navLinkClass}>Home</a>
                    <a href="https://aulice-about.netlify.app/" className={navLinkClass}>About us</a>
                    <a href="https://aulice-pricing-plans.netlify.app/" className={navLinkClass}>Pricing Plans</a>
                    <a href="https://aulice-lexicon.netlify.app/" className={navLinkClass}>Lexicon</a>
                    <a href="https://aulice-teacher-dashboard.netlify.app/" className={navLinkClass}>Teacher</a>
                    <a href="https://aulice-contact.netlify.app/" className={navLinkClass}>Contact</a>
                </nav>
            </header>

            <div className="bg-gray-900/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 max-w-2xl w-full text-center text-white">
                {/* Header Banner */}
                <div className="bg-red-800 rounded-t-3xl -mt-8 -mx-8 px-8 py-6 shadow-xl border-b-4 border-white">
                    <h2 className="text-xl font-bold tracking-wide">Medical Triage Simulator</h2>
                </div>

                {/* Simulator Content */}
                <div className="p-4 mt-6">
                    <h1 className="text-3xl font-extrabold text-white mb-2">🚨 Multiple Casualties Arriving</h1>
                    <p className="text-lg text-gray-300 mb-6">
                        You are the Lead Physician in the ER. An ambulance is arriving with four victims from a major traffic incident.
                    </p>

                    <div className="bg-gray-800 p-6 rounded-2xl shadow-inner text-left mb-6 border-l-4 border-white">
                        <h3 className="text-xl font-bold text-red-400 mb-2">⚠️ Situation</h3>
                        <p className="text-gray-300">
                            The paramedic gives you a quick rundown of the patients. Based on the initial report, you must decide who to treat first.
                        </p>
                        <ul className="list-disc list-inside mt-4 space-y-2">
                            <li><span className="font-semibold text-yellow-300">Patient 1:</span> Unconscious, severe head trauma, breathing erratically.</li>
                            <li><span className="font-semibold text-green-300">Patient 2:</span> Conscious, multiple broken bones, in severe pain but stable.</li>
                            <li><span className="font-semibold text-blue-300">Patient 3:</span> Minor cuts and bruises, walking and talking.</li>
                            <li><span className="font-semibold text-red-300">Patient 4:</span> Unconscious, no breathing detected, no pulse.</li>
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button 
                            onClick={() => handleChooseOption('patient1')} 
                            className="w-full py-3 px-6 bg-red-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-red-700 transition-transform duration-200 transform hover:scale-105"
                        >
                            🩻 Triage Patient 1
                        </button>
                        <button 
                            onClick={() => handleChooseOption('patient2')} 
                            className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-blue-700 transition-transform duration-200 transform hover:scale-105"
                        >
                            🩹 Triage Patient 2
                        </button>
                        <button 
                            onClick={() => handleChooseOption('patient3')} 
                            className="w-full py-3 px-6 bg-green-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-green-700 transition-transform duration-200 transform hover:scale-105"
                        >
                            🚶 Triage Patient 3
                        </button>
                        <button 
                            onClick={() => handleChooseOption('patient4')} 
                            className="w-full py-3 px-6 bg-purple-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-purple-700 transition-transform duration-200 transform hover:scale-105"
                        >
                            🚫 Triage Patient 4
                        </button>
                    </div>

                    {/* Conditional rendering for the feedback */}
                    <div id="result" className="mt-8">
                        {feedback && (
                            <div className={`p-6 rounded-2xl text-left shadow-xl border-l-4 ${feedback.feedbackClass}`}>
                                <h4 className="text-xl font-bold mb-2">💡 {feedback.title}</h4>
                                <p className="font-semibold">{feedback.text}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="absolute bottom-4 text-white text-xs text-center font-light drop-shadow-lg w-full">
                <div className="mb-2">
                    <a href="https://www.aulice.ca/" className={navLinkClass}>Gate</a>
                    <a href="https://aulice-main-hub.netlify.app/" className={navLinkClass}>Home</a>
                    <a href="https://aulice-about.netlify.app/" className={navLinkClass}>About us</a>
                    <a href="https://aulice-pricing-plans.netlify.app/" className={navLinkClass}>Pricing Plans</a>
                    <a href="https://aulice-lexicon.netlify.app/" className={navLinkClass}>Lexicon</a>
                    <a href="https://aulice-teacher-dashboard.netlify.app/" className={navLinkClass}>Teacher</a>
                    <a href="https://aulice-contact.netlify.app/" className={navLinkClass}>Contact</a>
                </div>
                © 2025 Aulice Academy.
            </footer>
        </div>
    );
}

export default MedicalCrisisSimulator;