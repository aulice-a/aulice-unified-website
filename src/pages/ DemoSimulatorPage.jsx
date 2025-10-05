// src/pages/DemoSimulatorPage.jsx
import React, { useState } from 'react';

const DEMO_SCENARIOS = {
  banking: {
    title: "Financial Portfolio Crisis (Demo)",
    headline: "📊 Sudden Market Volatility",
    description: "You are the CFO... A key economic sector has collapsed, putting your largest loan portfolio at risk.",
    situation: "The entire energy sector is facing a liquidity crisis... You must act to protect the bank's assets and reputation.",
    options: [
      { id: 'restructure', label: '🤝 Restructure client loans' },
      { id: 'sell', label: '📉 Sell off the high-risk portfolio' },
      { id: 'liquidate', label: '🚨 Immediately liquidate assets' },
      { id: 'wait', label: '⏱️ Wait for more data analysis' }
    ],
    feedback: {
      restructure: {
        title: "Strategic and Client-Focused",
        text: "This is a strong leadership move. It demonstrates a commitment to long-term client relationships and can save a significant portion of the loan value, minimizing immediate losses and protecting the bank's reputation.",
        style: "border-green-500 bg-green-100 text-green-900"
      },
      sell: {
        title: "Risk Aversion, at a Cost",
        text: "This action removes the risk from your balance sheet, but you'll likely sell at a major loss. While it protects the bank, it signals a lack of confidence and could erode trust with investors.",
        style: "border-yellow-500 bg-yellow-100 text-yellow-900"
      },
      liquidate: {
        title: "Extreme, High-Impact Action",
        text: "This is a drastic measure that would severely damage client relationships and could trigger a wave of defaults, magnifying the crisis. It's a last resort that shows a lack of a cohesive strategy.",
        style: "border-red-500 bg-red-100 text-red-900"
      },
      wait: {
        title: "Potentially Fatal Delay",
        text: "In a rapidly unfolding crisis, waiting for more data can be a catastrophic mistake. The market could deteriorate further, making any future action far less effective and more costly. Action, even if imperfect, is often better than inaction.",
        style: "border-purple-500 bg-purple-100 text-purple-900"
      }
    }
  },
  medical: {
    title: "Medical Triage Simulator",
    headline: "🚨 Multiple Casualties Arriving",
    description: "You are the Lead Physician in the ER. An ambulance is arriving with four victims from a major traffic incident.",
    situation: "The paramedic gives you a quick rundown of the patients. Based on the initial report, you must decide who to treat first.",
    options: [
      { id: 'patient1', label: '🩻 Triage Patient 1' },
      { id: 'patient2', label: '🩹 Triage Patient 2' },
      { id: 'patient3', label: '🚶 Triage Patient 3' },
      { id: 'patient4', label: '🚫 Triage Patient 4' }
    ],
    feedback: {
      patient1: {
        title: "Immediate Priority",
        text: "Correct. This patient has a severe, life-threatening injury that is still treatable. They fall into the 'immediate' or 'red' category of triage, requiring your attention first to save their life.",
        style: "border-green-500 bg-green-100 text-green-900"
      },
      patient2: {
        title: "Delayed Care",
        text: "Incorrect. While this patient is in pain, their injuries are not immediately life-threatening. They would be triaged into the 'delayed' or 'yellow' category, meaning they can wait for care until the most critical patients are stabilized.",
        style: "border-yellow-500 bg-yellow-100 text-yellow-900"
      },
      patient3: {
        title: "Minor Injuries",
        text: "Incorrect. This patient is considered 'minor' or 'green' in triage. They can be treated last, as their injuries do not pose a serious risk to their life.",
        style: "border-blue-500 bg-blue-100 text-blue-900"
      },
      patient4: {
        title: "Deceased or Expectant",
        text: "Incorrect. In a multi-casualty incident, a patient with no pulse or breathing is considered 'expectant' or 'black.' Your resources would be spent on patients who have a chance of survival.",
        style: "border-red-500 bg-red-100 text-red-900"
      }
    }
  }
  // Add other courses here as needed
};

const DemoSimulatorPage = ({ course }) => {
  const scenario = DEMO_SCENARIOS[course.id] || DEMO_SCENARIOS.banking;
  const [feedback, setFeedback] = useState(null);

  const chooseOption = (choiceId) => {
    setFeedback(scenario.feedback[choiceId]);
  };

  return (
    <div className="flex items-center justify-center p-4 min-h-screen"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2940&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
      <div className="bg-gray-900/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 max-w-2xl w-full text-center text-white">
        <div className={`rounded-t-3xl -mt-8 -mx-8 px-8 py-6 shadow-xl border-b-4 border-white ${
          course.id === 'medical' ? 'bg-red-800' : 'bg-blue-800'
        }`}>
          <h2 className="text-xl font-bold tracking-wide">{scenario.title}</h2>
          <h3 className="text-sm opacity-80">{course.title}</h3>
        </div>
        <div className="p-4 mt-6">
          <h1 className="text-3xl font-extrabold text-white mb-2">{scenario.headline}</h1>
          <p className="text-lg text-gray-300 mb-6">{scenario.description}</p>
          <div className="bg-gray-800 p-6 rounded-2xl shadow-inner text-left mb-6 border-l-4 border-white">
            <h3 className="text-xl font-bold mb-2">
              {course.id === 'medical' ? '⚠️ Situation' : '📉 Situation'}
            </h3>
            <p className="text-gray-300">{scenario.situation}</p>
            {course.id === 'medical' && (
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li><span className="font-semibold text-yellow-300">Patient 1:</span> Unconscious, severe head trauma, breathing erratically.</li>
                <li><span className="font-semibold text-green-300">Patient 2:</span> Conscious, multiple broken bones, in severe pain but stable.</li>
                <li><span className="font-semibold text-blue-300">Patient 3:</span> Minor cuts and bruises, walking and talking.</li>
                <li><span className="font-semibold text-red-300">Patient 4:</span> Unconscious, no breathing detected, no pulse.</li>
              </ul>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scenario.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => chooseOption(opt.id)}
                className={`w-full py-3 px-6 font-bold rounded-xl text-lg shadow-lg transition-transform duration-200 transform hover:scale-105 ${
                  opt.id.startsWith('patient')
                    ? opt.id === 'patient1' ? 'bg-red-600 hover:bg-red-700'
                    : opt.id === 'patient2' ? 'bg-blue-600 hover:bg-blue-700'
                    : opt.id === 'patient3' ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-purple-600 hover:bg-purple-700'
                    : opt.id === 'restructure' ? 'bg-green-600 hover:bg-green-700'
                    : opt.id === 'sell' ? 'bg-yellow-600 hover:bg-yellow-700'
                    : opt.id === 'liquidate' ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-purple-600 hover:bg-purple-700'
                } text-white`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {feedback && (
            <div className="mt-8">
              <div className={`p-6 rounded-2xl text-left shadow-xl border-l-4 ${feedback.style}`}>
                <h4 className="text-xl font-bold mb-2">💡 {feedback.title}</h4>
                <p className="font-semibold">{feedback.text}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoSimulatorPage;