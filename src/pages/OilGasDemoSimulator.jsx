import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function OilGasDrillingSimulator() {
    // Use React state to store the feedback message
    const [feedback, setFeedback] = useState(null);

    // This function replaces the original chooseOption()
    const handleChooseOption = (choice) => {
        let feedbackData = {};
        let feedbackClass = '';

        switch(choice) {
            case 'evacuate':
                feedbackData.title = "Safety First";
                feedbackData.text = "By prioritizing evacuation, you’ve protected your team from a potential hazard. This responsible decision allows for a full diagnostic and safe return to operations.";
                feedbackClass = "border-green-500 bg-green-100 text-green-900";
                break;
            case 'hold':
                feedbackData.title = "High-Risk Strategy";
                feedbackData.text = "Without a functioning data logger, holding a position is extremely risky. You lack the critical information needed to confirm safety, putting the entire operation in jeopardy.";
                feedbackClass = "border-red-500 bg-red-100 text-red-900";
                break;
            case 'test':
                feedbackData.title = "A Measured Approach";
                feedbackData.text = "This is a smart, measured response. By running a manual pressure test, you’ve confirmed the well’s integrity without needing a costly and time-consuming evacuation. You've balanced safety with operational efficiency.";
                feedbackClass = "border-yellow-500 bg-yellow-100 text-yellow-900";
                break;
            case 'report':
                feedbackData.title = "Responsible and Compliant";
                feedbackData.text = "This is a necessary step to ensure compliance with all regulations. However, it is not a primary safety action. You would need to take a more direct action, like a pressure test or evacuation, in parallel with your report.";
                feedbackClass = "border-blue-500 bg-blue-100 text-blue-900";
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
        backgroundImage: "url('https://images.unsplash.com/photo-1628177694362-e2566141a4a4?q=80&w=2942&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
    };
    
    // Custom classes for nav links based on context (header vs. footer)
    const headerNavLinkClass = "text-black mx-2 font-bold text-sm hover:underline";
    const footerNavLinkClass = "text-white mx-2 font-bold text-sm hover:underline";

    return (
        <div 
            className="flex items-center justify-center min-h-screen p-4" 
            style={pageStyles}
        >
            {/* Header Navigation */}
            <header className="absolute top-4 w-full text-center">
                <nav>
                    <a href="https://www.aulice.ca/" className={headerNavLinkClass}>Gate</a>
                    <a href="https://aulice-main-hub.netlify.app/" className={headerNavLinkClass}>Home</a>
                    <a href="https://aulice-about.netlify.app/" className={headerNavLinkClass}>About us</a>
                    <a href="https://aulice-pricing-plans.netlify.app/" className={headerNavLinkClass}>Pricing Plans</a>
                    <a href="https://aulice-lexicon.netlify.app/" className={headerNavLinkClass}>Lexicon</a>
                    <a href="https://aulice-teacher-dashboard.netlify.app/" className={headerNavLinkClass}>Teacher</a>
                    <a href="https://aulice-contact.netlify.app/" className={headerNavLinkClass}>Contact</a>
                </nav>
            </header>

            <div className="bg-gray-900/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 max-w-2xl w-full text-center text-white">
                {/* Header Banner */}
                <div className="bg-blue-800 rounded-t-3xl -mt-8 -mx-8 px-8 py-6 shadow-xl border-b-4 border-yellow-400">
                    <h2 className="text-xl font-bold tracking-wide">Drilling Operations Scenario</h2>
                </div>

                {/* Simulator Content */}
                <div className="p-4 mt-6">
                    <h1 className="text-3xl font-extrabold text-white mb-2">🛢️ Well Pressure Rising</h1>
                    <p className="text-lg text-gray-300 mb-6">
                        You are the Drilling Supervisor. Your team is faced with a sudden pressure increase on the well.
                    </p>

                    <div className="bg-gray-800 p-6 rounded-2xl shadow-inner text-left mb-6 border-l-4 border-yellow-500">
                        <h3 className="text-xl font-bold text-yellow-400 mb-2">🚨 Situation</h3>
                        <p className="text-gray-300">
                            The pressure is rising. The Blowout Preventer (BOP) seal is intact, but the data logger has failed. You have no real-time data.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button 
                            onClick={() => handleChooseOption('evacuate')} 
                            className="w-full py-3 px-6 bg-red-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-red-700 transition-transform duration-200 transform hover:scale-105"
                        >
                            🚨 Evacuate the rig
                        </button>
                        <button 
                            onClick={() => handleChooseOption('hold')} 
                            className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-blue-700 transition-transform duration-200 transform hover:scale-105"
                        >
                            🛑 Hold and monitor
                        </button>
                        <button 
                            onClick={() => handleChooseOption('test')} 
                            className="w-full py-3 px-6 bg-green-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-green-700 transition-transform duration-200 transform hover:scale-105"
                        >
                            🔧 Run manual pressure test
                        </button>
                        <button 
                            onClick={() => handleChooseOption('report')} 
                            className="w-full py-3 px-6 bg-purple-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-purple-700 transition-transform duration-200 transform hover:scale-105"
                        >
                            📝 Report to Regulator
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
                    <a href="https://www.aulice.ca/" className={footerNavLinkClass}>Gate</a>
                    <a href="https://aulice-main-hub.netlify.app/" className={footerNavLinkClass}>Home</a>
                    <a href="https://aulice-about.netlify.app/" className={footerNavLinkClass}>About us</a>
                    <a href="https://aulice-pricing-plans.netlify.app/" className={footerNavLinkClass}>Pricing Plans</a>
                    <a href="https://aulice-lexicon.netlify.app/" className={footerNavLinkClass}>Lexicon</a>
                    <a href="https://aulice-teacher-dashboard.netlify.app/" className={footerNavLinkClass}>Teacher</a>
                    <a href="https://aulice-contact.netlify.app/" className={footerNavLinkClass}>Contact</a>
                </div>
                © 2025 Aulice Academy.
            </footer>
        </div>
    );
}

export default OilGasDrillingSimulator;