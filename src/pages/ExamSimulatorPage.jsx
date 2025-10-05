// src/pages/ExamSimulatorPage.jsx
import React, { useState, useEffect } from 'react';

const EXAM_DATA_BY_COURSE = {
  banking: {
    courseName: "Banking Professional",
    icon: "🏦",
    situations: [
      // ... your existing 10 banking scenarios
    ]
  },
  medical: {
    courseName: "Medical Professional",
    icon: "⚕️",
    situations: [
      {
        id: 1,
        scenario: "A patient in the ER is unconscious with a medical alert bracelet indicating a severe penicillin allergy. The team is preparing to administer amoxicillin for a suspected infection.",
        options: [
          { text: "Immediately stop the team and verify the allergy, then suggest an alternative antibiotic.", score: 125, outcome: "Correct. Patient safety and allergy protocols are paramount in emergency care." },
          { text: "Assume the team knows and stay silent to avoid disrupting workflow.", score: 0, outcome: "Failing to speak up about a known life-threatening allergy is a critical error." },
          { text: "Wait to see if the patient reacts before intervening.", score: 25, outcome: "Waiting could be fatal. Proactive intervention is required." },
          { text: "Ask a senior doctor privately after the dose is given.", score: 50, outcome: "Too late. The error must be prevented, not reported after." }
        ]
      },
      // Add 9 more medical scenarios here
    ]
  }
  // Add other courses
};

const ExamSimulatorPage = ({ course }) => {
  const EXAM_DATA = EXAM_DATA_BY_COURSE[course.id] || EXAM_DATA_BY_COURSE.banking;
  const MAX_SCORE = EXAM_DATA.situations.reduce((sum, s) => sum + Math.max(...s.options.map(o => o.score)), 0);

  const [examState, setExamState] = useState('progress');
  const [currentSituationIndex, setCurrentSituationIndex] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [email, setEmail] = useState("");
  const [subscriptionMessage, setSubscriptionMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const currentOptions = EXAM_DATA.situations[currentSituationIndex].options;
    setShuffledOptions(shuffleArray(currentOptions));
  }, [currentSituationIndex]);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleDecision = (option) => {
    if (selectedOption) return;
    setFinalScore(prevScore => prevScore + option.score);
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (currentSituationIndex < EXAM_DATA.situations.length - 1) {
      setCurrentSituationIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
    } else {
      setExamState('results');
    }
  };

  const getFeedback = (score) => {
    const percentage = (score / MAX_SCORE) * 100;
    if (percentage >= 90) return { title: "Expert Clinician", description: "Your judgment is exceptional under pressure.", color: "text-green-600", icon: "✅" };
    if (percentage >= 70) return { title: "Competent Practitioner", description: "Strong clinical reasoning with room to refine.", color: "text-blue-600", icon: "👍" };
    if (percentage >= 50) return { title: "Developing Professional", description: "You understand basics but missed key safety protocols.", color: "text-yellow-600", icon: "⚠️" };
    return { title: "Needs Supervision", description: "Critical gaps in patient safety and protocol adherence.", color: "text-red-600", icon: "🛑" };
  };

  const handleSubscription = async () => {
    // Your ConvertKit logic here
    setIsSubmitting(true);
    setSubscriptionMessage({ text: "Success! Check your inbox for your detailed performance report.", type: "green" });
  };

  if (examState === 'results') {
    const feedback = getFeedback(finalScore);
    const percentage = Math.round((finalScore / MAX_SCORE) * 100);
    const shareText = `I scored ${percentage}% on the ${EXAM_DATA.courseName} Simulator! Test your professional judgment.`;

    return (
      <div className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl border border-gray-100 text-center max-w-4xl mx-auto my-10">
        <h2 className="text-5xl font-extrabold text-indigo-600 mb-4">Assessment Complete!</h2>
        <p className="text-3xl font-bold text-gray-800 mb-6">Total Score: {finalScore} / {MAX_SCORE} ({percentage}%)</p>
        <div className="mx-auto max-w-2xl bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-indigo-200 shadow-lg">
          <h3 className={`text-3xl font-extrabold ${feedback.color} mb-2`}>{feedback.icon} {feedback.title}</h3>
          <p className="text-xl text-gray-700">{feedback.description}</p>
        </div>
        <h3 className="text-2xl font-bold text-gray-700 mb-4 border-t pt-6 mt-6">Unlock Your Detailed Performance Report</h3>
        {!isSubmitting ? (
          <div className="mx-auto max-w-sm">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Professional Email"
              className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-center"
            />
            <button onClick={handleSubscription} className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition">
              Get Detailed Report
            </button>
            {subscriptionMessage.text && <p className={`mt-4 text-sm font-semibold text-${subscriptionMessage.type}-600`}>{subscriptionMessage.text}</p>}
          </div>
        ) : (
          <p className="mt-4 text-sm font-semibold text-green-600">{subscriptionMessage.text}</p>
        )}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-lg text-gray-600 mb-4 font-semibold">Share your achievement:</p>
          <div className="flex justify-center space-x-4">
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-sky-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-sky-600 transition shadow-md">
              <span>Share on X</span>
            </a>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-blue-700 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-800 transition shadow-md">
              <span>Share on LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  const currentSituation = EXAM_DATA.situations[currentSituationIndex];
  const maxScoreOption = currentSituation.options.reduce((max, opt) => opt.score > max.score ? opt : max, { score: -Infinity });

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">{EXAM_DATA.icon} {EXAM_DATA.courseName} Simulator</h1>
          <p className="text-lg md:text-xl text-gray-600">Test your professional judgment and ethics.</p>
        </div>
        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-indigo-700 mb-2 sm:mb-0">Situation {currentSituationIndex + 1}/{EXAM_DATA.situations.length}</h2>
            <span className="text-2xl font-extrabold text-gray-800 bg-indigo-100 px-4 py-1 rounded-full shadow-inner">Score: {finalScore}</span>
          </div>
          <p className="text-gray-700 text-xl leading-relaxed mb-8">{currentSituation.scenario}</p>
          <div className="space-y-4 mb-8">
            {shuffledOptions.map((option, index) => {
              let buttonClass = 'w-full text-left p-4 rounded-xl border border-gray-300 shadow-sm bg-white hover:bg-indigo-50 hover:shadow-md transition duration-150 ease-in-out text-gray-800';
              if (selectedOption) {
                if (option.text === selectedOption.text) {
                  if (selectedOption.score >= 100) buttonClass += ' bg-green-600 text-white';
                  else if (selectedOption.score >= 70) buttonClass += ' bg-yellow-500 text-gray-900';
                  else if (selectedOption.score > 25) buttonClass += ' bg-orange-500 text-white';
                  else buttonClass += ' bg-red-600 text-white';
                  buttonClass += ' ring-4 ring-offset-2 ring-opacity-50 ring-indigo-300 scale-[1.01]';
                } else if (option.text === maxScoreOption.text) {
                  buttonClass += ' bg-blue-100 border-blue-500 opacity-90 shadow-md';
                } else {
                  buttonClass += ' opacity-50';
                }
              }
              return (
                <button key={index} onClick={() => handleDecision(option)} className={buttonClass} disabled={!!selectedOption}>
                  {option.text}
                </button>
              );
            })}
          </div>
          {selectedOption && (
            <div className="bg-indigo-50 p-5 rounded-xl border-l-4 border-indigo-500 shadow-inner mb-6">
              <h3 className="font-bold text-lg text-indigo-800 mb-2">Outcome Rationale:</h3>
              <p className="text-gray-800">{selectedOption.outcome}</p>
            </div>
          )}
          {selectedOption && (
            <div className="text-center">
              <button onClick={handleNext} className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-xl hover:bg-indigo-700 transition">
                {currentSituationIndex === EXAM_DATA.situations.length - 1 ? 'See Final Results' : 'Next Situation'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamSimulatorPage;