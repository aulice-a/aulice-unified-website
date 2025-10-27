import React, { useState } from 'react';

function LegalDemoSimulator() {
    // Use React state to store the feedback message
    const [feedback, setFeedback] = useState(null);

    // Replaces the original chooseOption()
    const handleChooseOption = (choice) => {
        let feedbackData = {};
        let feedbackClass = ''; // Use Tailwind classes directly for text color too

        switch(choice) {
            case 'settle':
                feedbackData.title = "A Common and Prudent Legal Strategy";
                feedbackData.text = "This is a safe, pragmatic choice. While it can be expensive and may be seen as an admission of fault, it avoids the unpredictable and public nature of a trial. It allows the company to move forward and regain control of the narrative, protecting its long-term reputation.";
                feedbackClass = "border-yellow-500 bg-yellow-100 text-yellow-900"; // Added text color class
                break;
            case 'trial':
                feedbackData.title = "An Unnecessary and Dangerous Gamble";
                feedbackData.text = "Given the strong evidence, going to trial is an extremely high-risk move. A loss would not only result in a larger financial payout but would also severely damage the company's public trust and brand reputation. This is a gamble that a prudent CEO should avoid.";
                feedbackClass = "border-red-500 bg-red-100 text-red-900"; // Added text color class
                break;
            case 'apology':
                feedbackData.title = "The Best and Most Ethical Action";
                feedbackData.text = "This is the ideal choice. By taking immediate responsibility, you demonstrate corporate integrity and prioritize customer safety. While financially costly in the short term, this action will build immense public goodwill and may even help to settle the lawsuit on more favorable terms. This is a sign of true leadership.";
                feedbackClass = "border-green-500 bg-green-100 text-green-900"; // Added text color class
                break;
            default:
                setFeedback(null);
                return;
        }

        // Set the feedback object into state
        setFeedback({ ...feedbackData, feedbackClass });
    };

    // Styles from the <body> tag
    const pageStyles = {
        fontFamily: "'Inter', sans-serif",
        backgroundImage: "url('https://images.unsplash.com/photo-1579549339395-5853d919865a?q=80&w=2832&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
    };

    return (
        <div
            className="flex flex-col items-center min-h-screen p-4" // Root element matching body flex
            style={pageStyles}
        >
            {/* Top Right Navigation */}
            <nav className="absolute top-4 right-4 z-10 bg-gray-900/50 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <ul className="flex space-x-6 text-sm font-semibold text-white">
                    {/* Standard Nav Links */}
                    <li><a href="https://www.aulice.ca/" className="hover:text-indigo-300 transition-colors">Gate</a></li>
                    <li><a href="https://aulice-main-hub.netlify.app/" className="hover:text-indigo-300 transition-colors">Home</a></li>
                    <li><a href="https://aulice-about.netlify.app/" className="hover:text-indigo-300 transition-colors">About us</a></li>
                    <li><a href="https://aulice-pricing-plans.netlify.app/" className="hover:text-indigo-300 transition-colors">Pricing Plans</a></li>
                    <li><a href="https://aulice-lexicon.netlify.app/" className="hover:text-indigo-300 transition-colors">Lexicon</a></li>
                    <li><a href="https://aulice-teacher-dashboard.netlify.app/" className="hover:text-indigo-300 transition-colors">Teacher</a></li>
                    <li><a href="https://aulice-contact.netlify.app/" className="hover:text-indigo-300 transition-colors">Contact</a></li>
                </ul>
            </nav>

            {/* Main content card - Added my-auto for vertical centering */}
            <div className="bg-gray-900/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 max-w-2xl w-full text-center text-white flex-grow flex flex-col justify-center my-auto">
                {/* Header Banner */}
                <div className="bg-indigo-800 rounded-t-3xl -mt-8 -mx-8 px-8 py-6 shadow-xl border-b-4 border-white">
                    <h2 className="text-xl font-bold tracking-wide">Legal Crisis Simulation</h2>
                </div>

                {/* Simulator Content */}
                <div className="p-4 mt-6">
                    <h1 className="text-3xl font-extrabold text-white mb-2">⚖️ The Product Liability Lawsuit</h1>
                    <p className="text-lg text-gray-300 mb-6">
                        You are the CEO of a major tech company. Your flagship product has been linked to several user injuries, leading to a class-action lawsuit. The legal team has presented you with three options.
                    </p>

                    <div className="bg-gray-800 p-6 rounded-2xl shadow-inner text-left mb-6 border-l-4 border-white">
                        <h3 className="text-xl font-bold text-sky-400 mb-2">⚠️ The Case</h3>
                        <p className="text-gray-300">
                            The evidence against your company is strong, but not definitive. A public trial would be a media circus, potentially damaging your company's reputation and stock price regardless of the verdict.
                        </p>
                        <ul className="list-disc list-inside mt-4 space-y-2">
                             {/* Corrected Option numbers/colors if needed, kept as original */}
                            <li><span className="font-semibold text-yellow-300">Option 1:</span> Settle out of court to contain the issue.</li> {/* Changed color based on button color */}
                            <li><span className="font-semibold text-red-300">Option 2:</span> Go to trial and fight the claims vigorously.</li> {/* Changed color based on button color */}
                            <li><span className="font-semibold text-green-300">Option 3:</span> Issue a public apology and announce a full product recall.</li> {/* Changed color based on button color */}
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            onClick={() => handleChooseOption('settle')}
                            className="w-full py-3 px-6 bg-yellow-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-yellow-700 transition-transform duration-200 transform hover:scale-105"
                        >
                            🤝 Settle Out of Court
                        </button>
                        <button
                            onClick={() => handleChooseOption('trial')}
                            className="w-full py-3 px-6 bg-red-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-red-700 transition-transform duration-200 transform hover:scale-105"
                        >
                            👨‍⚖️ Go to Trial
                        </button>
                        <button
                            onClick={() => handleChooseOption('apology')}
                            className="w-full py-3 px-6 bg-green-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-green-700 transition-transform duration-200 transform hover:scale-105"
                        >
                            📢 Public Apology & Recall
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
            <footer className="mt-auto py-4 text-white text-xs text-center font-light drop-shadow-lg w-full">
                <p>&copy; 2025 Aulice Academy.</p>
            </footer>
        </div>
    );
}

export default LegalDemoSimulator; // Changed export name