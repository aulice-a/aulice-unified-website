import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Helper Component for <style> ---
// Injects the original <style> tag directly.
const PageStyles = () => (
    <style dangerouslySetInnerHTML={{ __html: `
        body { /* Applied to root div */
            font-family: 'Inter', sans-serif;
            background-image: url('https://images.unsplash.com/photo-1544738590-b1d5c56e297e?q=80&w=2832&auto=format&fit=crop');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
        }
        /* No need for .nav-links a rule, Tailwind handles it */
    `}} />
);

// --- Main Component ---
function CabinCrewDemoSimulator() {
    // State for feedback message
    const [feedback, setFeedback] = useState(null);

    // Replaces the original chooseOption()
    const handleChooseOption = (choice) => {
        let feedbackData = {};
        let feedbackClass = ''; // For feedback div styling

        switch(choice) {
            case 'med_help':
                feedbackData.title = "The Best and Most Strategic Action";
                feedbackData.text = "This is the most critical first step. It leverages potential expertise on board, which could provide a more accurate diagnosis and care than a flight attendant could. It is the best use of available resources and allows you to prepare for the next steps with expert guidance.";
                feedbackClass = "border-green-500 bg-green-100 text-green-900";
                break;
            case 'self_first_aid':
                feedbackData.title = "An Unnecessary Risk";
                feedbackData.text = "While well-intentioned, attempting to treat a severe medical issue alone could be dangerous. Without a proper diagnosis from a professional, you risk making the situation worse. It is vital to use all resources at your disposal before taking on full responsibility yourself.";
                feedbackClass = "border-red-500 bg-red-100 text-red-900";
                break;
            case 'emergency_landing':
                feedbackData.title = "A Premature and Costly Decision";
                feedbackData.text = "Requesting an emergency landing before assessing the situation is a huge mistake. It can be incredibly disruptive, expensive, and is only necessary if the situation is life-threatening and cannot be managed in-flight. You must first gather information from a medical professional before taking such drastic action.";
                feedbackClass = "border-yellow-500 bg-yellow-100 text-yellow-900";
                break;
            case 'reassurance':
                feedbackData.title = "A Failure to Act";
                feedbackData.text = "While comforting the passenger is important, it is an insufficient response to a life-threatening emergency. You are a leader, and a leader must take decisive action to resolve a crisis, not simply wait for it to pass. You must do everything in your power to save the passenger's life.";
                feedbackClass = "border-purple-500 bg-purple-100 text-purple-900";
                break;
            default:
                feedbackData = null; // Should not happen
        }

        // Set the feedback object into state
        setFeedback({ ...feedbackData, feedbackClass });
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-4"> {/* Root div replaces body */}
            <PageStyles />

            <div className="bg-gray-900/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 max-w-2xl w-full text-center text-white flex-grow flex flex-col justify-center my-auto"> {/* Added my-auto */}
                {/* Header Banner */}
                <div className="bg-emerald-800 rounded-t-3xl -mt-8 -mx-8 px-8 py-6 shadow-xl border-b-4 border-white">
                    <h2 className="text-xl font-bold tracking-wide">Cabin Crew Simulation</h2>
                </div>

                {/* Simulator Content */}
                <div className="p-4 mt-6">
                    <h1 className="text-3xl font-extrabold text-white mb-2">✈️ In-Flight Medical Emergency</h1>
                    <p className="text-lg text-gray-300 mb-6">
                        You are a senior flight attendant on a transcontinental flight. A passenger in the middle of the cabin is in distress, clutching their chest and struggling to breathe. Other passengers are starting to panic.
                    </p>

                    <div className="bg-gray-800 p-6 rounded-2xl shadow-inner text-left mb-6 border-l-4 border-white">
                        <h3 className="text-xl font-bold text-sky-400 mb-2">⚠️ Situation</h3>
                        <p className="text-gray-300">
                            The passenger is showing signs of a potential heart attack. The captain is waiting for your report and a plan of action. You must choose a response that prioritizes the passenger's life while managing the situation calmly.
                        </p>
                        <ul className="list-disc list-inside mt-4 space-y-2">
                            <li><span className="font-semibold text-yellow-300">Option 1:</span> Call for any medical professionals on board.</li>
                            <li><span className="font-semibold text-green-300">Option 2:</span> Administer first aid yourself using the on-board medical kit.</li>
                            <li><span className="font-semibold text-blue-300">Option 3:</span> Inform the captain to make an emergency landing immediately.</li>
                            <li><span className="font-semibold text-red-300">Option 4:</span> Provide the passenger with water and reassurance.</li>
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button onClick={() => handleChooseOption('med_help')} className="w-full py-3 px-6 bg-green-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-green-700 transition-transform duration-200 transform hover:scale-105">
                            🩺 Call for Medical Help on Board
                        </button>
                        <button onClick={() => handleChooseOption('self_first_aid')} className="w-full py-3 px-6 bg-red-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-red-700 transition-transform duration-200 transform hover:scale-105">
                            🩹 Administer First Aid Alone
                        </button>
                        <button onClick={() => handleChooseOption('emergency_landing')} className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-blue-700 transition-transform duration-200 transform hover:scale-105">
                            🛬 Request Emergency Landing
                        </button>
                        <button onClick={() => handleChooseOption('reassurance')} className="w-full py-3 px-6 bg-gray-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-gray-700 transition-transform duration-200 transform hover:scale-105">
                            💧 Provide Comfort & Water
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
            <footer className="mt-auto py-4 bg-gray-900/50 backdrop-blur-sm text-white text-xs text-center font-light w-full">
                <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-4 mb-2 text-sm font-semibold text-white">
                    {/* Assuming these links are appropriate for the footer context */}
                    <a href="https://www.aulice.ca/" className="hover:underline">Gate</a>
                    <a href="https://aulice-main-hub.netlify.app/" className="hover:underline">Home</a>
                    <a href="https://aulice-about.netlify.app/" className="hover:underline">About us</a>
                    <a href="https://aulice-pricing-plans.netlify.app/" className="hover:underline">Pricing Plans</a>
                    <a href="https://aulice-lexicon.netlify.app/" className="hover:underline">Lexicon</a>
                    <a href="https://aulice-teacher-dashboard.netlify.app/" className="hover:underline">Teacher</a>
                    <a href="https://aulice-contact.netlify.app/" className="hover:underline">Contact</a>
                </div>
                <p>&copy; 2025 Aulice Academy.</p>
            </footer>
        </div>
    );
}

export default CabinCrewDemoSimulator;