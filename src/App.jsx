// App.jsx
import React, { useState, useEffect } from 'react';

// ========================
// --- IMPORT ALL EXAM SIMULATORS ---
// ========================
import BankingExamSimulatorPage from './pages/BankingExamSimulatorPage.jsx';
import LogisticsExamSimulatorPage from './pages/LogisticsExamSimulatorPage.jsx';
import MedicalExamSimulatorPage from './pages/MedicalExamSimulatorPage.jsx';
import OilGasExamSimulatorPage from './pages/OilGasExamSimulatorPage.jsx';
import MiningExamSimulatorPage from './pages/MiningExamSimulatorPage.jsx';
import PilotExamSimulatorPage from './pages/PilotExamSimulatorPage.jsx';
import AestheticianExamSimulatorPage from './pages/AestheticianExamSimulatorPage.jsx';
import LegalExamSimulatorPage from './pages/LegalExamSimulatorPage.jsx';
import HospitalityExamSimulatorPage from './pages/HospitalityExamSimulatorPage.jsx';
import CabinCrewExamSimulatorPage from './pages/CabinCrewExamSimulatorPage.jsx';

// ========================
// --- DATA ---
// ========================
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

// ========================
// --- PAGE COMPONENTS ---
// ========================
const CourseCard = ({ course, handleButtonClick }) => {
  const colorStyle = COLOR_MAP[course.id] || {};
  const isPro = course.type === 'pro';
  return (
    <div className={`bg-white rounded-xl p-5 shadow-lg border-t-4 border-indigo-600 transition duration-300 hover:shadow-2xl hover:scale-[1.02]`}>
      <div className={`w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full text-2xl text-white ${colorStyle.iconBg}`}>{course.logo}</div>
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
          <button onClick={() => handleButtonClick('PricingPlans', course)} className="w-full py-3 bg-green-600 text-white rounded-lg text-lg font-extrabold hover:bg-green-700 transition shadow-lg mt-2">💰 ENROLL NOW</button>
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
      targetPage = course.id === 'younggenius' ? 'geniusForm' : 'customTrackForm';
    } else if (page === 'Quiz') {
      targetPage = 'quiz';
    }
    setCurrentPage(targetPage);
  };
  return (
    <div className="p-4 md:p-8">
      <header className="text-center p-10 md:p-16 bg-[#0056b3] text-white border-b-8 border-yellow-400 rounded-2xl shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">🎓 Aulice ProMastery Portal</h1>
        <p className="text-lg md:text-xl opacity-90 max-w-4xl mx-auto">Professional Language Mastery: English for High-Stakes Scenarios</p>
      </header>
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8 pt-4">📚 Our Specialized Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {COURSES_DATA.map(course => <CourseCard key={course.id} course={course} handleButtonClick={handleButtonClick} />)}
        </div>
      </div>
    </div>
  );
};

// ========================
// --- DEMO SIMULATOR (Banking + Medical) ---
// ========================
const DemoSimulatorPage = ({ course }) => {
  const [feedback, setFeedback] = useState(null);
  if (course.id === 'medical') {
    const chooseOption = (choice) => {
      let feedbackData = {};
      switch (choice) {
        case 'patient1':
          feedbackData = { title: "Immediate Priority", text: "Correct. This patient has a severe, life-threatening injury that is still treatable...", style: "border-green-500 bg-green-100 text-green-900" };
          break;
        case 'patient2':
          feedbackData = { title: "Delayed Care", text: "Incorrect. While this patient is in pain, their injuries are not immediately life-threatening...", style: "border-yellow-500 bg-yellow-100 text-yellow-900" };
          break;
        case 'patient3':
          feedbackData = { title: "Minor Injuries", text: "Incorrect. This patient is considered 'minor' or 'green' in triage...", style: "border-blue-500 bg-blue-100 text-blue-900" };
          break;
        case 'patient4':
          feedbackData = { title: "Deceased or Expectant", text: "Incorrect. In a multi-casualty incident, a patient with no pulse or breathing is considered 'expectant'...", style: "border-red-500 bg-red-100 text-red-900" };
          break;
        default:
          feedbackData = null;
      }
      setFeedback(feedbackData);
    };
    return (
      <div className="flex items-center justify-center p-4 min-h-screen" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2940&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className="bg-gray-900/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 max-w-2xl w-full text-center text-white">
          <div className="bg-red-800 rounded-t-3xl -mt-8 -mx-8 px-8 py-6 shadow-xl border-b-4 border-white">
            <h2 className="text-xl font-bold tracking-wide">Medical Triage Simulator</h2>
            <h3 className="text-sm opacity-80">{course.title}</h3>
          </div>
          <div className="p-4 mt-6">
            <h1 className="text-3xl font-extrabold text-white mb-2">🚨 Multiple Casualties Arriving</h1>
            <p className="text-lg text-gray-300 mb-6">You are the Lead Physician in the ER...</p>
            <div className="bg-gray-800 p-6 rounded-2xl shadow-inner text-left mb-6 border-l-4 border-white">
              <h3 className="text-xl font-bold mb-2">⚠️ Situation</h3>
              <p className="text-gray-300">The paramedic gives you a quick rundown...</p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li><span className="font-semibold text-yellow-300">Patient 1:</span> Unconscious, severe head trauma...</li>
                <li><span className="font-semibold text-green-300">Patient 2:</span> Conscious, multiple broken bones...</li>
                <li><span className="font-semibold text-blue-300">Patient 3:</span> Minor cuts and bruises...</li>
                <li><span className="font-semibold text-red-300">Patient 4:</span> Unconscious, no breathing detected...</li>
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button onClick={() => chooseOption('patient1')} className="w-full py-3 px-6 bg-red-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-red-700 transition-transform duration-200 transform hover:scale-105">🩻 Triage Patient 1</button>
              <button onClick={() => chooseOption('patient2')} className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-blue-700 transition-transform duration-200 transform hover:scale-105">🩹 Triage Patient 2</button>
              <button onClick={() => chooseOption('patient3')} className="w-full py-3 px-6 bg-green-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-green-700 transition-transform duration-200 transform hover:scale-105">🚶 Triage Patient 3</button>
              <button onClick={() => chooseOption('patient4')} className="w-full py-3 px-6 bg-purple-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-purple-700 transition-transform duration-200 transform hover:scale-105">🚫 Triage Patient 4</button>
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
  }
  // Default: Banking
  const chooseOption = (choice) => {
    let feedbackData = {};
    switch (choice) {
      case 'restructure': feedbackData = { title: "Strategic and Client-Focused", text: "This is a strong leadership move...", style: "border-green-500 bg-green-100 text-green-900" }; break;
      case 'sell': feedbackData = { title: "Risk Aversion, at a Cost", text: "This action removes the risk...", style: "border-yellow-500 bg-yellow-100 text-yellow-900" }; break;
      case 'liquidate': feedbackData = { title: "Extreme, High-Impact Action", text: "This is a drastic measure...", style: "border-red-500 bg-red-100 text-red-900" }; break;
      case 'wait': feedbackData = { title: "Potentially Fatal Delay", text: "In a rapidly unfolding crisis...", style: "border-purple-500 bg-purple-100 text-purple-900" }; break;
      default: feedbackData = null;
    }
    setFeedback(feedbackData);
  };
  return (
    <div className="flex items-center justify-center p-4 min-h-screen" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2940&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="bg-gray-900/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 max-w-2xl w-full text-center text-white">
        <div className="bg-blue-800 rounded-t-3xl -mt-8 -mx-8 px-8 py-6 shadow-xl border-b-4 border-white">
          <h2 className="text-xl font-bold tracking-wide">Financial Portfolio Crisis (Demo)</h2>
          <h3 className="text-sm opacity-80">{course.title}</h3>
        </div>
        <div className="p-4 mt-6">
          <h1 className="text-3xl font-extrabold text-white mb-2">📊 Sudden Market Volatility</h1>
          <p className="text-lg text-gray-300 mb-6">You are the CFO... A key economic sector has collapsed...</p>
          <div className="bg-gray-800 p-6 rounded-2xl shadow-inner text-left mb-6 border-l-4 border-white">
            <h3 className="text-xl font-bold text-blue-400 mb-2">📉 Situation</h3>
            <p className="text-gray-300">The entire energy sector is facing a liquidity crisis...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button onClick={() => chooseOption('restructure')} className="w-full py-3 px-6 bg-green-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-green-700 transition-transform duration-200 transform hover:scale-105">🤝 Restructure client loans</button>
            <button onClick={() => chooseOption('sell')} className="w-full py-3 px-6 bg-yellow-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-yellow-700 transition-transform duration-200 transform hover:scale-105">📉 Sell off the high-risk portfolio</button>
            <button onClick={() => chooseOption('liquidate')} className="w-full py-3 px-6 bg-red-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-red-700 transition-transform duration-200 transform hover:scale-105">🚨 Immediately liquidate assets</button>
            <button onClick={() => chooseOption('wait')} className="w-full py-3 px-6 bg-purple-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-purple-700 transition-transform duration-200 transform hover:scale-105">⏱️ Wait for more data analysis</button>
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

// ========================
// --- GENERIC PLACEHOLDER PAGES ---
// ========================
const PlaceholderPage = ({ pageTitle, course }) => (
  <div className="p-8 max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold text-gray-800 text-center">{pageTitle}</h1>
    <h2 className="text-xl font-semibold text-gray-700 text-center mt-2">Course: {course.title}</h2>
    <div className="mt-8 bg-white p-8 rounded-xl shadow-lg">
      <p className="text-gray-600 text-center mb-6">Real content coming soon. This is a realistic placeholder with matching layout and styling.</p>
      <div className="space-y-4">
        <div className="h-16 bg-gray-100 rounded-lg"></div>
        <div className="h-16 bg-gray-100 rounded-lg"></div>
        <div className="h-16 bg-gray-100 rounded-lg"></div>
      </div>
    </div>
  </div>
);

const PathwayPage = ({ course }) => {
  if (course.id === 'banking') {
    return (
      <div className="font-['Segoe_UI',_sans-serif] bg-[#f7f9fc] text-[#2c3e50] leading-relaxed">
        <style>{`
          .nav-links a { text-decoration: none; }
          header .nav-links a, footer .nav-links a { color: white; }
        `}</style>
        <header className="text-center py-10 px-5 bg-[#1a365d] text-white">
          <div className="nav-links text-center my-8">
            <a href="https://aulice-main-hub.netlify.app/" className="mx-2 font-bold no-underline">Home</a>
            <a href="https://aulice-about.netlify.app/" className="mx-2 font-bold no-underline">About us</a>
            <a href="https://aulice-pricing-plans.netlify.app/" className="mx-2 font-bold no-underline">Pricing Plans</a>
            <a href="https://aulice-lexicon.netlify.app/" className="mx-2 font-bold no-underline">Lexicon</a>
            <a href="https://aulice-teacher-dashboard.netlify.app/" className="mx-2 font-bold no-underline">Teacher</a>
            <a href="https://aulice-contact.netlify.app/" className="mx-2 font-bold no-underline">Contact</a>
          </div>
          <h1 className="text-3xl font-bold">💼 Banking Mastery Pathway</h1>
          <p>A 150-Session Program for Global Professionals</p>
        </header>
        <div className="max-w-5xl my-10 mx-auto p-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <p>This pathway is designed to transform students into highly skilled banking professionals...</p>
            <div className="my-8 p-5 bg-[#f0f3ff] border-l-4 border-[#1a365d] rounded-lg">
              <h3 className="text-[#1a365d] text-xl font-bold">Phase 1: Financial System & Fundamentals (Units 1–25)</h3>
              <ul className="my-2 pl-5 list-disc">
                <li><strong>Units 1–5:</strong> Introduction to Banking</li>
                <li><strong>Units 6–10:</strong> The Financial Ecosystem</li>
              </ul>
            </div>
          </div>
        </div>
        <footer className="text-center py-10 bg-[#1a365d] text-white mt-16">
          <div className="nav-links text-center my-8">
            <a href="https://aulice-main-hub.netlify.app/" className="mx-2 font-bold no-underline">Home</a>
            <a href="https://aulice-about.netlify.app/" className="mx-2 font-bold no-underline">About us</a>
            <a href="https://aulice-pricing-plans.netlify.app/" className="mx-2 font-bold no-underline">Pricing Plans</a>
            <a href="https://aulice-lexicon.netlify.app/" className="mx-2 font-bold no-underline">Lexicon</a>
            <a href="https://aulice-teacher-dashboard.netlify.app/" className="mx-2 font-bold no-underline">Teacher</a>
            <a href="https://aulice-contact.netlify.app/" className="mx-2 font-bold no-underline">Contact</a>
          </div>
          <p>© 2025 Aulice Academy.</p>
        </footer>
      </div>
    );
  }
  return <PlaceholderPage pageTitle="Mastery Pathway" course={course} />;
};

const ScenarioPage = ({ course }) => {
  if (course.id === 'banking') {
    return (
      <div className="font-['Segoe_UI',_sans-serif] bg-[#f7f9fc] text-[#2c3e50] leading-relaxed">
        <style>{`.btn { display: inline-block; padding: 10px 20px; background: #1a365d; color: white; border: none; border-radius: 6px; cursor: pointer; margin: 10px 0; font-size: 14px; }`}</style>
        <header className="text-center py-10 px-5 bg-[#1a365d] text-white">
          <div className="text-center my-8">
            <a href="https://aulice-main-hub.netlify.app/" className="mx-2 font-bold no-underline text-white">Home</a>
            <a href="https://aulice-about.netlify.app/" className="mx-2 font-bold no-underline text-white">About us</a>
            <a href="https://aulice-pricing-plans.netlify.app/" className="mx-2 font-bold no-underline text-white">Pricing Plans</a>
            <a href="https://aulice-lexicon.netlify.app/" className="mx-2 font-bold no-underline text-white">Lexicon</a>
            <a href="https://aulice-teacher-dashboard.netlify.app/" className="mx-2 font-bold no-underline text-white">Teacher</a>
            <a href="https://aulice-contact.netlify.app/" className="mx-2 font-bold no-underline text-white">Contact</a>
          </div>
          <h1 className="text-3xl font-bold">💼 Professional Practice Scenarios: Banking Professionals</h1>
          <p>Solve real operational challenges using English as your tool.</p>
        </header>
        <div className="max-w-4xl my-10 mx-auto p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-[#1a365d]">🎯 After completing this lesson, you will be able to:</h2>
          <ul className="my-2 pl-5 list-disc">
            <li>Explain financial products clearly.</li>
            <li>Handle client complaints with empathy.</li>
          </ul>
          <div className="bg-[#f8f9fa] p-5 my-5 border-l-4 border-[#1a365d] rounded-r-lg">
            <h3 className="text-lg font-bold text-[#1a365d]">1. A client loses money on an investment. How do you respond?</h3>
            <textarea placeholder="Your response..." className="w-full p-2 my-2 border border-gray-300 rounded"></textarea>
            <button className="btn">✅ Submit</button>
          </div>
        </div>
        <footer className="text-center py-10 bg-[#1a365d] text-white mt-16">
          <div className="text-center my-8">
            <a href="https://aulice-main-hub.netlify.app/" className="mx-2 font-bold no-underline text-white">Home</a>
            <a href="https://aulice-about.netlify.app/" className="mx-2 font-bold no-underline text-white">About us</a>
            <a href="https://aulice-pricing-plans.netlify.app/" className="mx-2 font-bold no-underline text-white">Pricing Plans</a>
            <a href="https://aulice-lexicon.netlify.app/" className="mx-2 font-bold no-underline text-white">Lexicon</a>
            <a href="https://aulice-teacher-dashboard.netlify.app/" className="mx-2 font-bold no-underline text-white">Teacher</a>
            <a href="https://aulice-contact.netlify.app/" className="mx-2 font-bold no-underline text-white">Contact</a>
          </div>
          <p>© 2025 Aulice Academy.</p>
        </footer>
      </div>
    );
  }
  return <PlaceholderPage pageTitle="Professional Practice Scenarios" course={course} />;
};

const Unit1Page = ({ course }) => {
  if (course.id === 'banking') {
    return (
      <div className="font-['Segoe_UI',_sans-serif] bg-[#f7f9fc] text-[#2c3e50] leading-relaxed">
        <style>{`
          .inline-input { width: 200px; padding: 6px 10px; margin: 0 5px; border: 2px solid #1a365d; border-radius: 4px; font-size: 16px; color: #1a365d; background: #f8f9fa; }
          .btn { display: inline-block; padding: 10px 20px; background: #1a365d; color: white; border: none; border-radius: 6px; cursor: pointer; margin-top: 10px; font-size: 14px; }
        `}</style>
        <header className="text-center py-10 px-5 bg-[#1a365d] text-white">
          <h1 className="text-3xl font-bold">💼 Unit 1: Introduction to Banking & the Financial System</h1>
          <p>Foundations of Global Finance</p>
        </header>
        <div className="max-w-4xl my-10 mx-auto p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-[#1a365d]">🎯 After completing this unit, you will be able to:</h2>
          <ul className="my-2 pl-5 list-disc space-y-1">
            <li>Define and use core banking terms like deposit, loan, and interest.</li>
          </ul>
          <div className="bg-[#f8f9fa] p-5 my-5 border-l-4 border-[#1a365d] rounded-r-lg">
            <h3 className="text-xl font-bold text-[#1a365d] mb-4">Lesson 1: Vocabulary & Core Concepts</h3>
            <textarea placeholder="Write your answers..." className="w-full mt-4 p-2 border rounded"></textarea>
            <button className="btn">✅ Submit</button>
          </div>
          <div className="text-center my-8">
            <a href="https://www.aulice.ca" className="mx-2 text-[#1a365d] font-bold no-underline">🏠 Home</a>
            <a href="https://aulislab.netlify.app" className="mx-2 text-[#1a365d] font-bold no-underline">🧩 Aulice Lab</a>
            <a href="https://aulice-lexicon.netlify.app" className="mx-2 text-[#1a365d] font-bold no-underline">📘 Lexicon</a>
            <a href="https://teacher-aulice.netlify.app" className="mx-2 text-[#1a365d] font-bold no-underline">👨‍🏫 Teacher Dashboard</a>
          </div>
        </div>
        <footer className="text-center py-10 bg-[#1a365d] text-white mt-16">
          <p>© 2025 Aulice Academy.</p>
        </footer>
      </div>
    );
  }
  return <PlaceholderPage pageTitle="Unit 1" course={course} />;
};

const PricingOptionsPage = ({ course }) => {
  const [selection, setSelection] = useState({ mode: null, plan: null });
  const colorStyle = COLOR_MAP[course.id] || {};
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800">Enrollment Options</h1>
      <h2 className={`text-2xl font-semibold text-center mt-2 ${colorStyle.accent}`}>{course.title}</h2>
      <div className="mt-10">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-700">Step 1: Choose Your Training Mode</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button onClick={() => setSelection({ mode: '1:1 Mode', plan: null })} className={`p-6 rounded-lg border-4 transition ${selection.mode === '1:1 Mode' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
              <span className="text-2xl">👤</span><p className="font-bold text-lg mt-2">1:1 Mode</p>
            </button>
            <button onClick={() => setSelection({ mode: 'Group', plan: null })} className={`p-6 rounded-lg border-4 transition ${selection.mode === 'Group' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
              <span className="text-2xl">👥</span><p className="font-bold text-lg mt-2">Group Sessions</p>
            </button>
            <button onClick={() => setSelection({ mode: 'Pay as you go', plan: null })} className={`p-6 rounded-lg border-4 transition ${selection.mode === 'Pay as you go' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
              <span className="text-2xl">💳</span><p className="font-bold text-lg mt-2">Pay As You Go</p>
            </button>
          </div>
        </div>
        {selection.mode && (
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-gray-700">Step 2: Select a Plan for {selection.mode}</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
              <button onClick={() => setSelection(prev => ({ ...prev, plan: 'Annual' }))} className={`p-6 rounded-lg border-4 transition ${selection.plan === 'Annual' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                <p className="font-bold text-lg">Annual Plan</p><p className="text-sm text-green-600 font-semibold">Discounted Rate</p>
              </button>
              <button onClick={() => setSelection(prev => ({ ...prev, plan: 'Monthly' }))} className={`p-6 rounded-lg border-4 transition ${selection.plan === 'Monthly' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                <p className="font-bold text-lg">Monthly Plan</p><p className="text-sm text-gray-500">Standard Rate</p>
              </button>
            </div>
          </div>
        )}
        {selection.plan && (
          <div className="mt-12 p-6 bg-gray-100 rounded-lg text-center">
             <h3 className="text-2xl font-bold text-gray-800">Your Selection:</h3>
             <p className="text-lg mt-2"><span className="font-semibold">{course.title}</span> - <span className="font-medium">{selection.mode}</span> - <span className="font-medium">{selection.plan} Plan</span></p>
             <button className="mt-6 bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

const YoungGeniusQuizPage = () => <PlaceholderPage pageTitle="Young Genius Quiz" course={{ title: "Young Geniuses Track" }} />;
const CustomTrackFormPage = () => <PlaceholderPage pageTitle="Custom Track Form" course={{ title: "Custom Track Design" }} />;
const YoungGeniusFormPage = () => <PlaceholderPage pageTitle="Young Genius Form" course={{ title: "Young Geniuses Track" }} />;

// ========================
// --- MAIN APP ---
// ========================
export default function App() {
  const [page, setPage] = useState('home');
  const [activeCourse, setActiveCourse] = useState(COURSES_DATA[0]);

  const navigate = (newPage) => {
    setPage(newPage);
  };

  const renderPage = () => {
    switch (page) {
      case 'quiz': return <YoungGeniusQuizPage />;
      case 'customTrackForm': return <CustomTrackFormPage />;
      case 'geniusForm': return <YoungGeniusFormPage />;
      case 'DemoSimulator': return <DemoSimulatorPage course={activeCourse} />;
      case 'ExamSimulator':
        // 🔥 Route to the correct exam simulator based on course.id
        switch (activeCourse.id) {
          case 'banking': return <BankingExamSimulatorPage course={activeCourse} />;
          case 'logistics': return <LogisticsExamSimulatorPage course={activeCourse} />;
          case 'medical': return <MedicalExamSimulatorPage course={activeCourse} />;
          case 'oilgas': return <OilGasExamSimulatorPage course={activeCourse} />;
          case 'mining': return <MiningExamSimulatorPage course={activeCourse} />;
          case 'aviation': return <PilotExamSimulatorPage course={activeCourse} />;
          case 'aesthetic': return <AestheticianExamSimulatorPage course={activeCourse} />;
          case 'legal': return <LegalExamSimulatorPage course={activeCourse} />;
          case 'hospitality': return <HospitalityExamSimulatorPage course={activeCourse} />;
          case 'cabin': return <CabinCrewExamSimulatorPage course={activeCourse} />;
          default: return <PlaceholderPage pageTitle="Exam Simulator" course={activeCourse} />;
        }
      case 'Pathway': return <PathwayPage course={activeCourse} />;
      case 'Scenario': return <ScenarioPage course={activeCourse} />;
      case 'Unit1': return <Unit1Page course={activeCourse} />;
      case 'PricingPlans': return <PricingOptionsPage course={activeCourse} />;
      default: return <HomePage setCurrentPage={navigate} setActiveCourse={setActiveCourse} />;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      <div className="w-full relative">
        {page !== 'home' && page !== 'DemoSimulator' && page !== 'ExamSimulator' && (
          <button 
            onClick={() => navigate('home')} 
            className="absolute top-4 left-4 z-10 bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors shadow-md"
          >
            &larr; Back to Home
          </button>
        )}
        {renderPage()}
      </div>
    </main>
  );
}