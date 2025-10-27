// src/pages/AviationCrisisSimulator.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AviationCrisisSimulator = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChoice = (choice) => {
    if (selectedOption) return;
    setSelectedOption(choice);
  };

  const getFeedback = (choice) => {
    switch (choice) {
      case 'clear_runway':
        return {
          title: "A Poor Choice",
          text: "This is a poor decision. You are relying on a non-professional pilot to make a series of rapid, precise actions to avoid a catastrophe. A leader must always pick the safest option, even if it is not the most convenient. The safest option is to keep the situation from getting worse, not relying on a positive outcome from a tense situation.",
          color: "red"
        };
      case 'go_around':
        return {
          title: "Correct and Decisive Action",
          text: "This is the safest and correct choice. Ordering a go-around immediately takes the high-speed, high-risk aircraft out of the danger zone. It places the safety of all passengers first and allows you to resolve the runway incursion on the ground without pressure.",
          color: "green"
        };
      case 'do_nothing':
        return {
          title: "A Catastrophic Failure of Leadership",
          text: "Doing nothing is a failure of your primary duty. Assuming the situation will resolve itself is reckless and would almost certainly lead to a catastrophic collision. A leader must always act with urgency in a crisis.",
          color: "yellow"
        };
      case 'hold_position':
        return {
          title: "An Incorrect and Dangerous Command",
          text: "This action is the exact opposite of what should be done. Ordering the aircraft to hold position on an active runway would ensure a collision. A leader must be able to think clearly under pressure and issue the correct instructions.",
          color: "purple"
        };
      default:
        return null;
    }
  };

  const feedback = selectedOption ? getFeedback(selectedOption) : null;

  return (
    <div 
      className="flex items-center justify-center min-h-screen p-4"
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundImage: "url('https://images.unsplash.com/photo-1541469192864-42f02f31f51d?q=80&w=2832&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Header Navigation */}
      <header className="absolute top-4 w-full text-center">
        <nav className="space-x-4">
          <a href="https://www.aulice.ca/" className="text-black text-sm font-bold no-underline hover:underline">Gate</a>
          <a href="/" className="text-black text-sm font-bold no-underline hover:underline">Home</a>
          <a href="/about" className="text-black text-sm font-bold no-underline hover:underline">About us</a>
          <a href="/pricing" className="text-black text-sm font-bold no-underline hover:underline">Pricing Plans</a>
          <a href="/lexicon" className="text-black text-sm font-bold no-underline hover:underline">Lexicon</a>
          <a href="/teacher" className="text-black text-sm font-bold no-underline hover:underline">Teacher</a>
          <a href="/contact" className="text-black text-sm font-bold no-underline hover:underline">Contact</a>
        </nav>
      </header>

      <div className="bg-gray-900/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 max-w-2xl w-full text-center text-white">
        {/* Header Banner */}
        <div className="bg-blue-800 rounded-t-3xl -mt-8 -mx-8 px-8 py-6 shadow-xl border-b-4 border-white">
          <h2 className="text-xl font-bold tracking-wide">Aviation Crisis</h2>
        </div>

        {/* Simulator Content */}
        <div className="p-4 mt-6">
          <h1 className="text-3xl font-extrabold text-white mb-2">✈️ Runway Incursion Emergency</h1>
          <p className="text-lg text-gray-300 mb-6">
            You are an Air Traffic Controller. A small private aircraft has just taxied onto an active runway without clearance. Simultaneously, a large commercial jet is on final approach, seconds from touchdown.
          </p>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-inner text-left mb-6 border-l-4 border-white">
            <h3 className="text-xl font-bold text-sky-400 mb-2">⚠️ Situation</h3>
            <p className="text-gray-300">
              Your immediate, decisive action is critical to prevent a collision. The commercial jet is too close to land, and the private aircraft is unaware of the impending danger.
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li><span className="font-semibold text-yellow-300">Option 1:</span> Order the small aircraft to exit the runway immediately.</li>
              <li><span className="font-semibold text-green-300">Option 2:</span> Order the commercial jet to perform an immediate go-around.</li>
              <li><span className="font-semibold text-blue-300">Option 3:</span> Do nothing, assuming the private plane will clear the runway.</li>
              <li><span className="font-semibold text-red-300">Option 4:</span> Order the small aircraft to hold position and wait.</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={() => handleChoice('clear_runway')}
              disabled={selectedOption}
              className="w-full py-3 px-6 bg-red-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-red-700 transition-transform duration-200 transform hover:scale-105 disabled:opacity-50"
            >
              🛩️ Order Small Plane to Exit
            </button>
            <button 
              onClick={() => handleChoice('go_around')}
              disabled={selectedOption}
              className="w-full py-3 px-6 bg-green-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-green-700 transition-transform duration-200 transform hover:scale-105 disabled:opacity-50"
            >
              ✅ Order Commercial Jet to Go Around
            </button>
            <button 
              onClick={() => handleChoice('do_nothing')}
              disabled={selectedOption}
              className="w-full py-3 px-6 bg-gray-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-gray-700 transition-transform duration-200 transform hover:scale-105 disabled:opacity-50"
            >
              ⏸️ Do Nothing
            </button>
            <button 
              onClick={() => handleChoice('hold_position')}
              disabled={selectedOption}
              className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-blue-700 transition-transform duration-200 transform hover:scale-105 disabled:opacity-50"
            >
              🚫 Order Small Plane to Hold Position
            </button>
          </div>

          {feedback && (
            <div 
              className="mt-8 p-6 rounded-2xl text-left shadow-xl border-l-4"
              style={{
                borderColor: feedback.color,
                backgroundColor: `rgba(${
                  feedback.color === 'green' ? '72,187,120' :
                  feedback.color === 'yellow' ? '234,179,8' :
                  feedback.color === 'red' ? '220,38,38' :
                  '168,85,247'
                }, 0.15)`,
                color: feedback.color === 'green' ? '#166534' :
                       feedback.color === 'yellow' ? '#92400e' :
                       feedback.color === 'red' ? '#991b1b' : '#7e22ce'
              }}
            >
              <h4 className="text-xl font-bold mb-2">💡 {feedback.title}</h4>
              <p className="font-semibold">{feedback.text}</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-white text-xs text-center font-light drop-shadow-lg w-full">
        <nav className="space-x-4 mb-2">
          <a href="https://www.aulice.ca/" className="no-underline hover:underline">Gate</a>
          <a href="/" className="no-underline hover:underline">Home</a>
          <a href="/about" className="no-underline hover:underline">About us</a>
          <a href="/pricing" className="no-underline hover:underline">Pricing Plans</a>
          <a href="/lexicon" className="no-underline hover:underline">Lexicon</a>
          <a href="/teacher" className="no-underline hover:underline">Teacher</a>
          <a href="/contact" className="no-underline hover:underline">Contact</a>
        </nav>
        © 2025 Aulice Academy.
      </footer>
    </div>
  );
};

export default AviationCrisisSimulator;