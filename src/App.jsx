// src/App.js
import React, { useState } from 'react';

// ====== DATA ======
const COLOR_MAP = {
  banking: { bg: 'bg-[#21436E]', text: 'text-white', iconBg: 'bg-[#21436E]', accent: 'text-indigo-300' },
  logistics: { bg: 'bg-gray-700', text: 'text-white', iconBg: 'bg-gray-700', accent: 'text-gray-300' },
  mining: { bg: 'bg-green-800', text: 'text-white', iconBg: 'bg-green-800', accent: 'text-green-300' },
  medical: { bg: 'bg-red-900', text: 'text-white', iconBg: 'bg-red-900', accent: 'text-red-300' },
  oilgas: { bg: 'bg-orange-600', text: 'text-white', iconBg: 'bg-orange-600', accent: 'text-orange-300' },
  aviation: { bg: 'bg-blue-800', text: 'text-white', iconBg: 'bg-blue-800', accent: 'text-blue-300' },
  aesthetic: { bg: 'bg-fuchsia-600', text: 'text-white', iconBg: 'bg-fuchsia-600', accent: 'text-fuchsia-300' },
  legal: { bg: 'bg-teal-600', text: 'text-white', iconBg: 'bg-teal-600', accent: 'text-teal-300' },
  hospitality: { bg: 'bg-green-900', text: 'text-yellow-400', iconBg: 'bg-green-900', accent: 'text-yellow-400' },
  cabin: { bg: 'bg-blue-600', text: 'text-white', iconBg: 'bg-blue-600', accent: 'text-blue-300' },
  younggenius: { bg: 'bg-purple-700', text: 'text-white', iconBg: 'bg-purple-700', accent: 'text-purple-300' },
  customtrack: { bg: 'bg-teal-700', text: 'text-white', iconBg: 'bg-teal-700', accent: 'text-teal-300' },
};

const COURSES_DATA = [
  { id: 'banking', title: 'Banking Specialists', logo: '💼', desc: 'Master communication for finance, client relations, and market analysis.', type: 'pro' },
  { id: 'logistics', title: 'Logistics Coordinator', logo: '🚚', desc: 'Master professional communication in the logistics and supply chain industry.', type: 'pro' },
  { id: 'mining', title: 'Mining Engineer', logo: '⛏️', desc: 'Communicate effectively on site, in meetings, and with international teams.', type: 'pro' },
  { id: 'medical', title: 'Medical Professionals', logo: '⚕️', desc: 'Improve patient communication, medical reports, and academic writing skills.', type: 'pro' },
  { id: 'oilgas', title: 'Oil & Gas Professionals', logo: '🛢️', desc: 'Learn industry-specific vocabulary and report writing for the energy sector.', type: 'pro' },
  { id: 'aviation', title: 'Civil Aviation Professionals - Pilots and ATCs', logo: '✈️', desc: 'Master clear and concise communication in aviation, vital for safety and efficiency.', type: 'pro' },
  { id: 'aesthetic', title: 'Aestheticians', logo: '💄', desc: 'Enhance client consultation and service delivery language for the beauty industry.', type: 'pro' },
  { id: 'legal', title: 'Legal Professionals', logo: '⚖️', desc: 'Improve legal writing, courtroom communication, and client relations skills.', type: 'pro' },
  { id: 'hospitality', title: 'Hotel & Hospitality Professionals', logo: '🏨', desc: 'Provide exceptional guest experiences with polished and professional English.', type: 'pro' },
  { id: 'cabin', title: 'Cabin Crew Professionals', logo: '✈️', desc: 'Ensure clear, calm, and effective communication with passengers and crew.', type: 'pro' },
  { id: 'younggenius', title: 'Young Geniuses Track', logo: '👶', desc: 'Tailor-made English programs for aspiring young professionals.', type: 'ondemand' },
  { id: 'customtrack', title: 'Custom Track Design', logo: '💡', desc: 'We build custom learning paths to help you achieve your specific career goals.', type: 'ondemand' },
];

// ====== COMPONENTS ======
const CourseCard = ({ course, handleButtonClick }) => {
  const colorStyle = COLOR_MAP[course.id] || {};
  const isPro = course.type === 'pro';

  return (
    <div className={`bg-white rounded-xl p-5 shadow-lg border-t-4 border-indigo-600 transition duration-300 hover:shadow-2xl hover:scale-[1.02]`}>
      <div className={`w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full text-2xl text-white ${colorStyle.iconBg}`}>
        {course.logo}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-1 text-center">{course.title}</h3>
      <p className="text-sm text-gray-500 mb-4 h-12 overflow-hidden text-center">{course.desc}</p>
      {isPro ? (
        <div className="space-y-3 mt-4">
          <div className="flex justify-center space-x-2 pb-3 border-b border-gray-100">
            <button onClick={() => handleButtonClick('DemoSimulator', course)} className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">▶️ Demo</button>
            <button onClick={() => handleButtonClick('ExamSimulator', course)} className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">📝 Exam</button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => handleButtonClick('Pathway', course)} className="px-2 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-medium">📘 Pathway</button>
            <button onClick={() => handleButtonClick('Scenario', course)} className="px-2 py-2 bg-green-100 text-green-700 rounded-lg text-xs font-medium">🧩 Scenario</button>
            <button onClick={() => handleButtonClick('Unit1', course)} className="px-2 py-2 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">🧪 Unit 1</button>
          </div>
          <button onClick={() => handleButtonClick('PricingPlans', course)} className="w-full py-3 bg-green-600 text-white rounded-lg text-lg font-extrabold hover:bg-green-700 transition shadow-lg mt-2">
            💰 ENROLL NOW
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button onClick={() => handleButtonClick('Form', course)} className="px-3 py-2 bg-red-600 text-white rounded-md text-xs font-medium">🚀 Start Journey</button>
          <button onClick={() => handleButtonClick('Quiz', course)} className="px-3 py-2 bg-yellow-400 text-gray-800 rounded-md text-xs font-medium">🧠 Play Quiz</button>
        </div>
      )}
    </div>
  );
};

const HomePage = ({ setCurrentPage, setActiveCourse }) => {
  const handleButtonClick = (page, course) => {
    setActiveCourse(course);
    let targetPage = page;
    if (page === 'Form') {
      if (course.id === 'younggenius') targetPage = 'geniusForm';
      else targetPage = 'customTrackForm';
    } else if (page === 'Quiz') {
      if (course.id === 'younggenius') targetPage = 'quiz';
    }
    setCurrentPage(targetPage);
  };

  return (
    <div className="p-4 md:p-8">
      <header className="text-center p-10 md:p-16 bg-[#0056b3] text-white border-b-8 border-yellow-400 rounded-2xl shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">🎓 Aulice ProMastery Portal</h1>
        <p className="text-lg md:text-xl opacity-90 max-w-4xl mx-auto">
          Professional Language Mastery: English for High-Stakes Scenarios
        </p>
      </header>
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8 pt-4">📚 Our Specialized Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {COURSES_DATA.map((course) => (
            <CourseCard key={course.id} course={course} handleButtonClick={handleButtonClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ====== PLACEHOLDER PAGES (for now) ======
const PlaceholderPage = ({ title, course }) => (
  <div className="p-8 text-center">
    <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
    {course && <p className="mt-2 text-xl text-gray-600">{course.title}</p>}
    <p className="mt-4 text-gray-500">Content coming soon.</p>
  </div>
);

const PricingOptionsPage = ({ course }) => {
  const [selection, setSelection] = useState({ mode: null, plan: null });
  const colorStyle = COLOR_MAP[course.id] || {};

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800">Enrollment Options</h1>
      <h2 className={`text-2xl font-semibold text-center mt-2 ${colorStyle.accent}`}>{course.title}</h2>
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-700 text-center">Step 1: Choose Your Training Mode</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {['1:1 Mode', 'Group', 'Pay as you go'].map((mode) => (
            <button
              key={mode}
              onClick={() => setSelection({ mode, plan: null })}
              className={`p-6 rounded-lg border-4 ${selection.mode === mode ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
            >
              <span className="text-2xl">{mode === '1:1 Mode' ? '👤' : mode === 'Group' ? '👥' : '💳'}</span>
              <p className="font-bold mt-2">{mode}</p>
            </button>
          ))}
        </div>

        {selection.mode && (
          <>
            <h3 className="text-xl font-semibold text-gray-700 text-center mt-8">Step 2: Select a Plan</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
              {['Annual', 'Monthly'].map((plan) => (
                <button
                  key={plan}
                  onClick={() => setSelection(prev => ({ ...prev, plan }))}
                  className={`p-6 rounded-lg border-4 ${selection.plan === plan ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                >
                  <p className="font-bold">{plan} Plan</p>
                </button>
              ))}
            </div>
          </>
        )}

        {selection.plan && (
          <div className="mt-10 p-6 bg-gray-100 rounded-lg">
            <h3 className="text-2xl font-bold">Your Selection:</h3>
            <p className="text-lg mt-2">
              <span className="font-semibold">{course.title}</span> – {selection.mode} – {selection.plan} Plan
            </p>
            <button className="mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ====== SIMULATORS (Banking + Logistics) ======
const BankingDemoSimulatorPage = ({ course }) => {
  const [feedback, setFeedback] = useState(null);
  const chooseOption = (choice) => {
    const feedbacks = {
      restructure: { title: "Strategic and Client-Focused", text: "This is a strong leadership move...", style: "border-green-500 bg-green-100 text-green-900" },
      sell: { title: "Risk Aversion, at a Cost", text: "This action removes the risk...", style: "border-yellow-500 bg-yellow-100 text-yellow-900" },
      liquidate: { title: "Extreme, High-Impact Action", text: "This is a drastic measure...", style: "border-red-500 bg-red-100 text-red-900" },
      wait: { title: "Potentially Fatal Delay", text: "In a rapidly unfolding crisis...", style: "border-purple-500 bg-purple-100 text-purple-900" }
    };
    setFeedback(feedbacks[choice] || null);
  };

  return (
    <div className="flex items-center justify-center p-4 min-h-screen" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2940&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="bg-gray-900/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 max-w-2xl w-full text-center text-white">
        <div className="bg-blue-800 rounded-t-3xl -mt-8 -mx-8 px-8 py-6 shadow-xl border-b-4 border-white">
          <h2 className="text-xl font-bold tracking-wide">Financial Portfolio Crisis (Demo)</h2>
          <h3 className="text-sm opacity-80">{course?.title || 'Banking Specialists'}</h3>
        </div>
        <div className="p-4 mt-6">
          <h1 className="text-3xl font-extrabold text-white mb-2">📊 Sudden Market Volatility</h1>
          <p className="text-lg text-gray-300 mb-6">You are the CFO... A key economic sector has collapsed...</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button onClick={() => chooseOption('restructure')} className="w-full py-3 px-6 bg-green-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-green-700">🤝 Restructure client loans</button>
            <button onClick={() => chooseOption('sell')} className="w-full py-3 px-6 bg-yellow-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-yellow-700">📉 Sell off the high-risk portfolio</button>
            <button onClick={() => chooseOption('liquidate')} className="w-full py-3 px-6 bg-red-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-red-700">🚨 Immediately liquidate assets</button>
            <button onClick={() => chooseOption('wait')} className="w-full py-3 px-6 bg-purple-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-purple-700">⏱️ Wait for more data analysis</button>
          </div>
          {feedback && (
            <div className={`mt-8 p-6 rounded-2xl text-left shadow-xl border-l-4 ${feedback.style}`}>
              <h4 className="text-xl font-bold mb-2">💡 {feedback.title}</h4>
              <p>{feedback.text}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const LogisticsDemoSimulatorPage = ({ course }) => {
  const [feedback, setFeedback] = useState(null);
  const chooseOption = (choice) => {
    const feedbacks = {
      land_route: { title: "A Solid Contingency Plan", text: "This is a good, reliable choice...", style: "border-yellow-500 bg-yellow-100 text-yellow-900" },
      air_freight: { title: "The Best and Most Decisive Action", text: "This is the ideal solution...", style: "border-green-500 bg-green-100 text-green-900" },
      wait: { title: "A Catastrophic Failure of Leadership", text: "Doing nothing is an unacceptable failure...", style: "border-red-500 bg-red-100 text-red-900" },
      back_road: { title: "An Unnecessary Gamble", text: "Choosing a dangerous, unpaved road...", style: "border-purple-500 bg-purple-100 text-purple-900" }
    };
    setFeedback(feedbacks[choice] || null);
  };

  return (
    <div className="flex items-center justify-center p-4 min-h-screen" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549480016-d87d464b97e9?q=80&w=2832&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="bg-gray-900/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 max-w-2xl w-full text-center text-white">
        <div className="bg-blue-800 rounded-t-3xl -mt-8 -mx-8 px-8 py-6 shadow-xl border-b-4 border-white">
          <h2 className="text-xl font-bold tracking-wide">Supply Chain Simulation</h2>
          <h3 className="text-sm opacity-80">{course?.title || 'Logistics Coordinator'}</h3>
        </div>
        <div className="p-4 mt-6">
          <h1 className="text-3xl font-extrabold text-white mb-2">📦 Urgent Shipment Delayed</h1>
          <p className="text-lg text-gray-300 mb-6">You are a Logistics Manager. A vital shipment...</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button onClick={() => chooseOption('land_route')} className="w-full py-3 px-6 bg-yellow-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-yellow-700">🛣️ Divert to Secondary Route</button>
            <button onClick={() => chooseOption('air_freight')} className="w-full py-3 px-6 bg-green-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-green-700">✈️ Arrange Emergency Air Freight</button>
            <button onClick={() => chooseOption('wait')} className="w-full py-3 px-6 bg-red-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-red-700">⏳ Wait for Highway to Clear</button>
            <button onClick={() => chooseOption('back_road')} className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-blue-700">⚠️ Attempt Back Road</button>
          </div>
          {feedback && (
            <div className={`mt-8 p-6 rounded-2xl text-left shadow-xl border-l-4 ${feedback.style}`}>
              <h4 className="text-xl font-bold mb-2">💡 {feedback.title}</h4>
              <p>{feedback.text}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ====== MAIN APP ======
export default function App() {
  const [page, setPage] = useState('home');
  const [activeCourse, setActiveCourse] = useState(null);

  const navigate = (newPage) => setPage(newPage);

  const renderPage = () => {
    switch (page) {
      case 'DemoSimulator':
        return activeCourse?.id === 'logistics' 
          ? <LogisticsDemoSimulatorPage course={activeCourse} /> 
          : <BankingDemoSimulatorPage course={activeCourse} />;
      case 'ExamSimulator':
      case 'Pathway':
      case 'Scenario':
      case 'Unit1':
        return <PlaceholderPage title={page} course={activeCourse} />;
      case 'PricingPlans':
        return <PricingOptionsPage course={activeCourse} />;
      case 'quiz':
      case 'customTrackForm':
      case 'geniusForm':
        return <PlaceholderPage title="Coming Soon" />;
      default:
        return <HomePage setCurrentPage={navigate} setActiveCourse={setActiveCourse} />;
    }
  };

  const showBackButton = !['home', 'DemoSimulator'].includes(page);

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      {showBackButton && (
        <button
          onClick={() => navigate('home')}
          className="absolute top-4 left-4 z-10 bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg shadow-md"
        >
          &larr; Back to Home
        </button>
      )}
      {renderPage()}
    </main>
  );
}