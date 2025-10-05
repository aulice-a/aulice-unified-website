import React, { useState, useEffect } from 'react';
/ Exam Simulators — one per course
import BankingExamSimulatorPage from './components/BankingExamSimulatorPage';
import LogisticsExamSimulatorPage from './components/LogisticsExamSimulatorPage';
import MedicalExamSimulatorPage from './components/MedicalExamSimulatorPage';
import OilGasExamSimulatorPage from './components/OilGasExamSimulatorPage';
import MiningExamSimulatorPage from './components/MiningExamSimulatorPage';
import PilotExamSimulatorPage from './components/PilotExamSimulatorPage';
import AestheticianExamSimulatorPage from './components/AestheticianExamSimulatorPage';
import LegalExamSimulatorPage from './components/LegalExamSimulatorPage';
import HospitalityExamSimulatorPage from './components/HospitalityExamSimulatorPage';
import CabinCrewExamSimulatorPage from './components/CabinCrewExamSimulatorPage';
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
          feedbackData = { title: "Immediate Priority", text: "Correct. This patient has a severe, life-threatening injury that is still treatable. They fall into the 'immediate' or 'red' category of triage, requiring your attention first to save their life.", style: "border-green-500 bg-green-100 text-green-900" };
          break;
        case 'patient2':
          feedbackData = { title: "Delayed Care", text: "Incorrect. While this patient is in pain, their injuries are not immediately life-threatening. They would be triaged into the 'delayed' or 'yellow' category, meaning they can wait for care until the most critical patients are stabilized.", style: "border-yellow-500 bg-yellow-100 text-yellow-900" };
          break;
        case 'patient3':
          feedbackData = { title: "Minor Injuries", text: "Incorrect. This patient is considered 'minor' or 'green' in triage. They can be treated last, as their injuries do not pose a serious risk to their life.", style: "border-blue-500 bg-blue-100 text-blue-900" };
          break;
        case 'patient4':
          feedbackData = { title: "Deceased or Expectant", text: "Incorrect. In a multi-casualty incident, a patient with no pulse or breathing is considered 'expectant' or 'black.' Your resources would be spent on patients who have a chance of survival.", style: "border-red-500 bg-red-100 text-red-900" };
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
            <p className="text-lg text-gray-300 mb-6">You are the Lead Physician in the ER. An ambulance is arriving with four victims from a major traffic incident.</p>
            <div className="bg-gray-800 p-6 rounded-2xl shadow-inner text-left mb-6 border-l-4 border-white">
              <h3 className="text-xl font-bold mb-2">⚠️ Situation</h3>
              <p className="text-gray-300">The paramedic gives you a quick rundown of the patients. Based on the initial report, you must decide who to treat first.</p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li><span className="font-semibold text-yellow-300">Patient 1:</span> Unconscious, severe head trauma, breathing erratically.</li>
                <li><span className="font-semibold text-green-300">Patient 2:</span> Conscious, multiple broken bones, in severe pain but stable.</li>
                <li><span className="font-semibold text-blue-300">Patient 3:</span> Minor cuts and bruises, walking and talking.</li>
                <li><span className="font-semibold text-red-300">Patient 4:</span> Unconscious, no breathing detected, no pulse.</li>
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
// --- EXAM SIMULATOR (Banking + Medical placeholder) ---
// ========================
const ExamSimulatorPage = ({ course }) => {
  if (course.id === 'medical') {
    return (
      <div className="p-8 text-center">
        <h2 className="text-3xl font-bold text-red-800">🩺 Medical Professional Exam</h2>
        <p className="mt-4 text-gray-600">Realistic 10-scenario exam coming soon. This is a placeholder with matching layout and styling.</p>
        <div className="mt-8 space-y-4 max-w-2xl mx-auto">
          <div className="h-24 bg-gray-100 rounded-lg border"></div>
          <div className="h-24 bg-gray-100 rounded-lg border"></div>
          <div className="h-24 bg-gray-100 rounded-lg border"></div>
        </div>
      </div>
    );
  }

  // Banking Exam (full)
  const EXAM_DATA = {
    courseName: "Banking Professional",
    icon: "🏦",
    situations: [
      { id: 1, scenario: "A long-standing, high-net-worth client with a history of sporadic, large cash deposits attempts to deposit $15,000 in cash...", options: [ { text: "Complete the transaction and immediately file a mandatory Currency Transaction Report (CTR) with FinCEN.", score: 125, outcome: "This is the correct regulatory action..." }, { text: "Refuse the deposit...", score: 50, outcome: "Refusing the deposit is unnecessary..." }, { text: "Process the deposit without filing a report...", score: 0, outcome: "Failing to file a CTR is a severe violation..." }, { text: "Suggest the client deposit $8,000 today...", score: 25, outcome: "This constitutes 'structuring,' a felony..." } ] },
      { id: 2, scenario: "A corporate client is requesting a large, complex loan...", options: [ { text: "Document the discrepancies...", score: 125, outcome: "Thorough risk assessment and transparency are essential..." }, { text: "Ignore the minor discrepancies...", score: 0, outcome: "This sacrifices the bank's integrity..." }, { text: "Approve the loan quickly...", score: 75, outcome: "While charging a premium for risk is standard..." }, { text: "Refer the client to a competitor...", score: 25, outcome: "Turning away a potentially viable client..." } ] },
      { id: 3, scenario: "You receive an urgent subpoena for client financial records...", options: [ { text: "Verify the subpoena’s authenticity...", score: 100, outcome: "Releasing client information must adhere to strict internal protocols..." }, { text: "Immediately release the documents...", score: 50, outcome: "Releasing documents without internal review risks violating privacy laws..." }, { text: "Contact the clients whose records are requested...", score: 75, outcome: "While transparency is good..." }, { text: "Refuse to comply...", score: 0, outcome: "A valid subpoena overrides client confidentiality..." } ] },
      { id: 4, scenario: "You are preparing a pitch for a major institutional investor...", options: [ { text: "Review the research with the Compliance team...", score: 125, outcome: "Using internal research without compliance clearance risks leaking Material Non-Public Information..." }, { text: "Include the research immediately...", score: 0, outcome: "This is a direct violation of information barriers..." }, { text: "Only use the research to inform your argument...", score: 50, outcome: "While better, the research might still contain MNPI..." }, { text: "Exclude the research entirely...", score: 75, outcome: "This is the safest option..." } ] },
      { id: 5, scenario: "A junior colleague notices an anomaly in a trading algorithm...", options: [ { text: "Immediately report the loophole...", score: 125, outcome: "Reporting the flaw protects the bank's system integrity..." }, { text: "Exploit the loophole once for $50,000...", score: 0, outcome: "Unauthorized trading using non-public information..." }, { text: "Tell the colleague to ignore it...", score: 25, outcome: "Ignoring a known flaw is negligent..." }, { text: "Discuss the potential profit with a senior colleague...", score: 50, outcome: "This spreads the knowledge of the flaw..." } ] },
      { id: 6, scenario: "You are analyzing a client's portfolio performance...", options: [ { text: "Follow the bank's Anti-Money Laundering (AML) procedure...", score: 125, outcome: "Compliance with AML/KYC regulations is paramount..." }, { text: "Contact the client and ask them for a detailed explanation...", score: 25, outcome: "Notifying the client of an SAR (known as 'tipping off') is illegal..." }, { text: "Ignore the flag...", score: 0, outcome: "Prioritizing client relationship over AML compliance..." }, { text: "Wait a few weeks...", score: 50, outcome: "Delaying an SAR compromises the investigation..." } ] },
      { id: 7, scenario: "Your team is under immense pressure to meet quarterly sales targets...", options: [ { text: "Express concern to your manager...", score: 125, outcome: "The duty of suitability requires that products sold match..." }, { text: "Follow the manager's direction...", score: 0, outcome: "Waivers do not absolve the bank of suitability duty..." }, { text: "Only offer the products to clients who ask...", score: 75, outcome: "While better, you still have an affirmative duty..." }, { text: "Sell the products, but verbally warn the clients...", score: 50, outcome: "A verbal warning is insufficient..." } ] },
      { id: 8, scenario: "A private equity client asks for your bank to finance a leveraged buyout...", options: [ { text: "Provide the financing if the deal meets all regulatory and credit risk criteria...", score: 100, outcome: "While social responsibility is a factor..." }, { text: "Refuse the financing to protect the bank's public reputation...", score: 50, outcome: "This is a decision based on social responsibility..." }, { text: "Insist on a lower leverage ratio...", score: 75, outcome: "Focusing on credit risk is always correct..." }, { text: "Anonymously inform the press...", score: 0, outcome: "Leaking client deal information is a severe breach..." } ] },
      { id: 9, scenario: "You are the manager of a small branch...", options: [ { text: "Reassign the employee to a non-critical administrative role...", score: 125, outcome: "This balances the needs of the business..." }, { text: "Fire the employee immediately...", score: 50, outcome: "While efficiency is restored..." }, { text: "Place the underperforming employee in the critical compliance role...", score: 0, outcome: "Placing an underperforming employee in a critical compliance role..." }, { text: "Keep the employee in their current role...", score: 25, outcome: "This is fiscally irresponsible..." } ] },
      { id: 10, scenario: "You discover a pattern of gender-biased pay disparity...", options: [ { text: "Privately present the data and a proposal...", score: 100, outcome: "Addressing ethical disparities through formal channels..." }, { text: "Confront the executives responsible publicly...", score: 25, outcome: "Public confrontation is unprofessional..." }, { text: "Ignore the disparity...", score: 0, outcome: "Ignoring clear evidence of unfairness..." }, { text: "Leak the anonymous pay data...", score: 50, outcome: "While high impact, leaking data violates confidentiality..." } ] }
    ]
  };

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
/
  const getFeedback = (score) => {
    const percentage = (score / MAX_SCORE) * 100;
    if (percentage >= 90) return { title: "Master Compliance Officer", description: "Your judgment is excellent...", color: "text-green-600", icon: "✅" };
    if (percentage >= 70) return { title: "Skilled Banker", description: "You possess a solid understanding...", color: "text-blue-600", icon: "👍" };
    if (percentage >= 50) return { title: "Developing Analyst", description: "Your fundamentals are sound...", color: "text-yellow-600", icon: "⚠️" };
    return { title: "Needs Review", description: "Many decisions resulted in low scores...", color: "text-red-600", icon: "🛑" };
  };

  const handleSubscription = async () => {
    setIsSubmitting(true);
    setSubscriptionMessage({ text: "Success! Check your inbox for your detailed performance report.", type: "green" });
  };

  if (examState === 'results') {
    const feedback = getFeedback(finalScore);
    const percentage = Math.round((finalScore / MAX_SCORE) * 100);
    const shareText = `I scored ${percentage}% on the ${EXAM_DATA.courseName} Simulator!`;

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
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Professional Email" className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-center" />
            <button onClick={handleSubscription} className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition">Get Detailed Report</button>
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
          <p className="text-lg md:text-xl text-gray-600">Test your compliance knowledge, risk management, and financial ethics.</p>
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
      case 'ExamSimulator': return <ExamSimulatorPage course={activeCourse} />;
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