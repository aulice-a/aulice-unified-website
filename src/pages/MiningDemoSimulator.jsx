import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MiningCrisisSimulator() {
    // Use React state to store the feedback message
    const [feedback, setFeedback] = useState(null);

    // This function replaces the original chooseOption()
    const handleChooseOption = (choice) => {
        let feedbackData = {};
        let feedbackClass = '';

        switch(choice) {
            case 'rapid':
                feedbackData.title = "High Risk, High Reward";
                feedbackData.text = "This is a courageous but dangerous choice. While it shows decisive leadership and could save lives quickly, it also places your rescue teams at a high risk. A true leader understands the balance between speed and safety.";
                feedbackClass = "border-yellow-500 bg-yellow-100 text-yellow-900";
                break;
            case 'protocol':
                feedbackData.title = "Prudent and Responsible";
                feedbackData.text = "This decision prioritizes the safety of the entire rescue team and avoids a potentially catastrophic second collapse. It demonstrates a commitment to established safety protocols, even under extreme pressure. While slower, it is the most reliable path.";
                feedbackClass = "border-green-500 bg-green-100 text-green-900";
                break;
            case 'seal':
                feedbackData.title = "Unethical and Unacceptable";
                feedbackData.text = "In this scenario, sealing the mine to protect assets, at the expense of trapped lives, is an ethically indefensible choice. It would ruin the company's reputation and lead to legal and criminal charges. Leadership means prioritizing people over profits.";
                feedbackClass = "border-red-500 bg-red-100 text-red-900";
                break;
            case 'wait':
                feedbackData.title = "Lack of Decisiveness";
                feedbackData.text = "Waiting for external help, while seemingly safe, is a failure to act. The trapped crew is on a finite timeline. A leader must be able to make critical decisions with the information at hand, not defer the responsibility to others.";
                feedbackClass = "border-purple-500 bg-purple-100 text-purple-900";
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
        backgroundImage: "url('https://images.unsplash.com/photo-1549414002-f8c6f6e520d2?q=80&w=2832&auto=format&fit=crop')",
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
                <div className="bg-stone-800 rounded-t-3xl -mt-8 -mx-8 px-8 py-6 shadow-xl border-b-4 border-white">
                    <h2 className="text-xl font-bold tracking-wide">Mine Collapse Crisis</h2>
                </div>

                {/* Simulator Content */}
                <div className="p-4 mt-6">
                    <h1 className="text-3xl font-extrabold text-white mb-2">⛏️ Shaft Collapse Reported</h1>
                    <p className="text-lg text-gray-300 mb-6">
                        You are the Mine Site Manager. A portion of the main shaft has caved in, trapping a small crew below ground.
                    </p>

                    <div className="bg-gray-800 p-6 rounded-2xl shadow-inner text-left mb-6 border-l-4 border-white">
                        <h3 className="text-xl font-bold text-orange-400 mb-2">⚠️ Situation</h3>
                        <p className="text-gray-300">
                            Your rescue teams are at the site. A direct, rapid rescue is possible but extremely dangerous, risking more lives. The safer, official protocol is much slower and could take too long.
                        </p>
                        <ul className="list-disc list-inside mt-4 space-y-2">
                            <li><span className="font-semibold text-yellow-300">Option 1:</span> Rapid, high-risk rescue attempt now.</li>
                            <li><span className="font-semibold text-green-300">Option 2:</span> Follow the official, slower rescue protocol.</li>
                            <li><span className="font-semibold text-blue-300">Option 3:</span> Prioritize sealing the shaft to prevent a wider collapse.</li>
                            <li><span className="font-semibold text-red-300">Option 4:</span> Wait for the national rescue task force to arrive.</li>
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button 
                            onClick={() => handleChooseOption('rapid')} 
                            className="w-full py-3 px-6 bg-red-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-red-700 transition-transform duration-200 transform hover:scale-105"
                        >
                            🚀 Attempt Rapid Rescue
                        </button>
                        <button 
                            onClick={() => handleChooseOption('protocol')} 
                            className="w-full py-3 px-6 bg-green-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-green-700 transition-transform duration-200 transform hover:scale-105"
                        >
                            ✅ Follow Official Protocol
                        </button>
                        <button 
                            onClick={() => handleChooseOption('seal')} 
                            className="w-full py-3 px-6 bg-gray-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-gray-700 transition-transform duration-200 transform hover:scale-105"
                        >
                            🚧 Seal the Mine Shaft
                        </button>
                        <button 
                            onClick={() => handleChooseOption('wait')} 
                            className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-blue-700 transition-transform duration-200 transform hover:scale-105"
                        >
                            ⏱️ Wait for Experts
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

export default MiningCrisisSimulator;