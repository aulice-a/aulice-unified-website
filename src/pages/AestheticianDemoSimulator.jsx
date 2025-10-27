import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AestheticianCrisisSimulator() {
    // Use React state to store the feedback message
    const [feedback, setFeedback] = useState(null);

    // This function replaces the original chooseOption()
    const handleChooseOption = (choice) => {
        let feedbackData = {};
        let feedbackClass = '';

        switch (choice) {
            case 'take_responsibility':
                feedbackData.title = "Ethical and Client-Focused";
                feedbackData.text = "This is the highest-integrity option. While it may be costly in the short term, it demonstrates a deep commitment to client safety and care, which can salvage your brand's reputation and possibly turn the influencer into a brand advocate.";
                feedbackClass = "border-green-500 bg-green-100 text-green-900";
                break;
            case 'blame_client':
                feedbackData.title = "Unprofessional and Risky";
                feedbackData.text = "This action is unethical and is the fastest way to lose client trust and damage your brand. In today's social media landscape, a single negative post with visual evidence can have devastating consequences for your business and career.";
                feedbackClass = "border-red-500 bg-red-100 text-red-900";
                break;
            case 'offer_refund':
                feedbackData.title = "A Compromise with Mixed Results";
                feedbackData.text = "While a good first step, this action might not fully address the client's panic or health concerns. It may be perceived as a quick attempt to silence them without taking full ownership, which could still lead to a negative social media reaction.";
                feedbackClass = "border-yellow-500 bg-yellow-100 text-yellow-900";
                break;
            case 'blame_manufacturer':
                feedbackData.title = "Passing the Buck";
                feedbackData.text = "This strategy is unlikely to satisfy the client and could lead to a messy legal battle between your business and the product manufacturer. It shows a lack of accountability and puts the client's safety second to business interests.";
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
        backgroundImage: "url('https://images.unsplash.com/photo-1590487985444-2ee6b0b5d56b?q=80&w=2835&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
    };

    return (
        <div
            className="flex flex-col items-center min-h-screen p-4"
            style={pageStyles}
        >
            {/* Top Right Navigation */}
            <nav className="absolute top-4 right-4 z-10 bg-gray-900/50 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <ul className="flex space-x-6 text-sm font-semibold text-white">
                    <li><a href="https://www.aulice.ca/" className="hover:text-fuchsia-300 transition-colors">Gate</a></li>
                    <li><a href="https://aulice-main-hub.netlify.app/" className="hover:text-fuchsia-300 transition-colors">Home</a></li>
                    <li><a href="https://aulice-about.netlify.app/" className="hover:text-fuchsia-300 transition-colors">About us</a></li>
                    <li><a href="https://aulice-pricing-plans.netlify.app/" className="hover:text-fuchsia-300 transition-colors">Pricing Plans</a></li>
                    <li><a href="https://aulice-lexicon.netlify.app/" className="hover:text-fuchsia-300 transition-colors">Lexicon</a></li>
                    <li><a href="https://aulice-teacher-dashboard.netlify.app/" className="hover:text-fuchsia-300 transition-colors">Teacher</a></li>
                    <li><a href="https://aulice-contact.netlify.app/" className="hover:text-fuchsia-300 transition-colors">Contact</a></li>
                </ul>
            </nav>

            <div className="bg-gray-900/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 max-w-2xl w-full text-center text-white flex-grow flex flex-col justify-center my-auto"> {/* Added my-auto for vertical centering */}
                {/* Header Banner */}
                <div className="bg-fuchsia-800 rounded-t-3xl -mt-8 -mx-8 px-8 py-6 shadow-xl border-b-4 border-white">
                    <h2 className="text-xl font-bold tracking-wide">Aesthetician Crisis</h2>
                </div>

                {/* Simulator Content */}
                <div className="p-4 mt-6">
                    <h1 className="text-3xl font-extrabold text-white mb-2">🧖‍♀️ Allergic Reaction Emergency</h1> {/* Corrected Emoji */}
                    <p className="text-lg text-gray-300 mb-6">
                        You are a lead aesthetician at a luxury spa. A high-profile client is having a severe allergic reaction to a new, exclusive facial serum. Her face is red, swollen, and she is visibly distressed.
                    </p>

                    <div className="bg-gray-800 p-6 rounded-2xl shadow-inner text-left mb-6 border-l-4 border-white">
                        <h3 className="text-xl font-bold text-pink-400 mb-2">🚨 Situation</h3>
                        <p className="text-gray-300">
                            The client, a prominent social media influencer, is threatening to post about her experience. The incident threatens your spa's reputation and could lead to significant financial loss and legal trouble.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            onClick={() => handleChooseOption('take_responsibility')}
                            className="w-full py-3 px-6 bg-green-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-green-700 transition-transform duration-200 transform hover:scale-105"
                        >
                            ✅ Take full responsibility & offer to pay for medical care
                        </button>
                        <button
                            onClick={() => handleChooseOption('blame_client')}
                            className="w-full py-3 px-6 bg-red-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-red-700 transition-transform duration-200 transform hover:scale-105"
                        >
                            🚫 Deny responsibility & blame a pre-existing condition
                        </button>
                        <button
                            onClick={() => handleChooseOption('offer_refund')}
                            className="w-full py-3 px-6 bg-yellow-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-yellow-700 transition-transform duration-200 transform hover:scale-105"
                        >
                            💰 Offer a full refund and a free future service
                        </button>
                        <button
                            onClick={() => handleChooseOption('blame_manufacturer')}
                            className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-blue-700 transition-transform duration-200 transform hover:scale-105"
                        >
                            📝 Blame the product manufacturer & distance yourself
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

export default AestheticianCrisisSimulator;