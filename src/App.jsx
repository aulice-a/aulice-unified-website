import React, { useState, useEffect, useRef } from 'react';

// --- Data ---

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

// --- HomePage Components ---

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

    if(page === 'Form') {
        if(course.id === 'younggenius') targetPage = 'geniusForm';
        else targetPage = 'customTrackForm';
    } else if (page === 'Quiz') {
        if(course.id === 'younggenius') targetPage = 'quiz';
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
}


// --- Page Components ---

const PlaceholderPage = ({ pageTitle, course }) => (
    <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800">{pageTitle}</h1>
        {course && <h2 className="text-xl font-semibold text-gray-700 mt-2">Course: {course.title}</h2>}
        <p className="mt-4 text-gray-600">This is a placeholder page. Content will be added here.</p>
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

const DemoSimulatorPage = ({ course }) => {
    const [feedback, setFeedback] = useState(null);
    const chooseOption = (choice) => {
        let newFeedback = {};
        switch(choice) {
            case 'restructure': newFeedback = { title: "Strategic and Client-Focused", text: "This is a strong leadership move. It demonstrates a commitment to long-term client relationships and can save a significant portion of the loan value, minimizing immediate losses and protecting the bank's reputation.", style: "border-green-500 bg-green-100 text-green-900" }; break;
            case 'sell': newFeedback = { title: "Risk Aversion, at a Cost", text: "This action removes the risk from your balance sheet, but you'll likely sell at a major loss. While it protects the bank, it signals a lack of confidence and could erode trust with investors.", style: "border-yellow-500 bg-yellow-100 text-yellow-900" }; break;
            case 'liquidate': newFeedback = { title: "Extreme, High-Impact Action", text: "This is a drastic measure that would severely damage client relationships and could trigger a wave of defaults, magnifying the crisis. It's a last resort that shows a lack of a cohesive strategy.", style: "border-red-500 bg-red-100 text-red-900" }; break;
            case 'wait': newFeedback = { title: "Potentially Fatal Delay", text: "In a rapidly unfolding crisis, waiting for more data can be a catastrophic mistake. The market could deteriorate further, making any future action far less effective and more costly. Action, even if imperfect, is often better than inaction.", style: "border-purple-500 bg-purple-100 text-purple-900" }; break;
            default: newFeedback = null;
        }
        setFeedback(newFeedback);
    };
    return (
        <div className="flex items-center justify-center p-4 min-h-screen" style={{backgroundImage: "url('https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2940&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}}>
            <div className="bg-gray-900/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 max-w-2xl w-full text-center text-white">
                <div className="bg-blue-800 rounded-t-3xl -mt-8 -mx-8 px-8 py-6 shadow-xl border-b-4 border-white">
                    <h2 className="text-xl font-bold tracking-wide">Financial Portfolio Crisis (Demo)</h2>
                    <h3 className="text-sm opacity-80">{course.title}</h3>
                </div>
                <div className="p-4 mt-6">
                    <h1 className="text-3xl font-extrabold text-white mb-2">📊 Sudden Market Volatility</h1>
                    <p className="text-lg text-gray-300 mb-6">You are the CFO... A key economic sector has collapsed, putting your largest loan portfolio at risk.</p>
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-inner text-left mb-6 border-l-4 border-white">
                        <h3 className="text-xl font-bold text-blue-400 mb-2">📉 Situation</h3>
                        <p className="text-gray-300">The entire energy sector is facing a liquidity crisis... You must act to protect the bank's assets and reputation.</p>
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

// --- NEW/RESTORED Exam Simulator Component ---
const EXAM_DATA = {
    courseName: "Banking Professional",
    icon: "🏦",
    situations: [
        { id: 1, scenario: "A long-standing, high-net-worth client with a history of sporadic, large cash deposits attempts to deposit $15,000 in cash, stating it's for a 'personal debt repayment.' This exceeds the Cash Transaction Report (CTR) threshold.", options: [ { text: "Complete the transaction and immediately file a mandatory Currency Transaction Report (CTR) with FinCEN.", score: 125, outcome: "This is the correct regulatory action. Transactions over $10,000 must be reported regardless of the client's relationship, adhering to BSA/AML compliance." }, { text: "Refuse the deposit and ask the client to return with a wire transfer instead.", score: 50, outcome: "Refusing the deposit is unnecessary and impacts client relations. The focus should be on compliance, not avoidance." }, { text: "Process the deposit without filing a report, based on the client's reliable history.", score: 0, outcome: "Failing to file a CTR is a severe violation of banking regulations (BSA) and compliance protocols." }, { text: "Suggest the client deposit $8,000 today and $7,000 tomorrow to avoid the reporting requirement.", score: 25, outcome: "This constitutes 'structuring,' a felony under money laundering laws. Facilitating structuring is a serious compliance failure." } ] },
        { id: 2, scenario: "A corporate client is requesting a large, complex loan. During due diligence, you find discrepancies in their financial statements that suggest aggressive accounting, but their overall financial health is solid.", options: [ { text: "Document the discrepancies, discuss them with the Credit Risk team, and require clarification/amendments before proceeding.", score: 125, outcome: "Thorough risk assessment and transparency are essential. Addressing red flags with the risk team and the client mitigates future losses and regulatory scrutiny." }, { text: "Ignore the minor discrepancies to secure the large, profitable deal quickly.", score: 0, outcome: "This sacrifices the bank's integrity and long-term risk profile for short-term gain, leading to potential future write-downs and regulatory fines." }, { text: "Approve the loan quickly, but charge a higher interest rate to cover the perceived risk.", score: 75, outcome: "While charging a premium for risk is standard, failing to clarify the statements exposes the bank to unnecessary, hidden risk." }, { text: "Refer the client to a competitor to avoid dealing with the complex accounting.", score: 25, outcome: "Turning away a potentially viable client due to complexity is poor business development and fails the client's needs." } ] },
        { id: 3, scenario: "You receive an urgent subpoena for client financial records. The subpoena appears valid but requests highly sensitive, non-public personal information for multiple unrelated accounts.", options: [ { text: "Verify the subpoena’s authenticity and scope with the Legal and Compliance departments before releasing any documents.", score: 100, outcome: "Releasing client information must adhere to strict internal protocols and legal review to protect client privacy and the bank from liability." }, { text: "Immediately release the documents as requested to comply with the court order and avoid penalties.", score: 50, outcome: "Releasing documents without internal review risks violating privacy laws (like Gramm-Leach-Bliley) if the scope is overly broad or the subpoena is flawed." }, { text: "Contact the clients whose records are requested to inform them of the subpoena and ask how they wish to proceed.", score: 75, outcome: "While transparency is good, legal advice often dictates that you should not notify clients until after the bank's legal team has reviewed the mandatory disclosure." }, { text: "Refuse to comply, citing client confidentiality, and risk contempt of court.", score: 0, outcome: "A valid subpoena overrides client confidentiality; refusal without legal grounds is a major compliance failure." } ] },
        { id: 4, scenario: "You are preparing a pitch for a major institutional investor. Your supervisor gives you internal, non-public research from a different department that strongly supports your investment thesis.", options: [ { text: "Review the research with the Compliance team to ensure it's permissible for external disclosure before including it in the pitch.", score: 125, outcome: "Using internal research without compliance clearance risks leaking Material Non-Public Information (MNPI), which could lead to insider trading accusations and regulatory action." }, { text: "Include the research immediately, as it greatly strengthens the pitch and helps the bank win the deal.", score: 0, outcome: "This is a direct violation of information barriers ('Chinese Walls') and creates regulatory risk." }, { text: "Only use the research to inform your argument but don't cite the internal document itself.", score: 50, outcome: "While better, the research might still contain MNPI that influences the client, making this a gray area that should be avoided." }, { text: "Exclude the research entirely and base the pitch only on publicly available data.", score: 75, outcome: "This is the safest option, but you may lose a competitive edge. Full compliance review is the optimal path." } ] },
        { id: 5, scenario: "A junior colleague notices an anomaly in a trading algorithm—a temporary inefficiency that, if exploited manually, could yield a personal profit of $50,000 before the system patch.", options: [ { text: "Immediately report the loophole to the Technology and Compliance teams to have the algorithm fixed and ensure no one else exploits it.", score: 125, outcome: "Reporting the flaw protects the bank's system integrity, prevents market manipulation, and is the highest standard of ethical conduct." }, { text: "Exploit the loophole once for $50,000, then immediately report it.", score: 0, outcome: "Unauthorized trading using non-public information about a system flaw is unethical and illegal, often resulting in termination and regulatory fines." }, { text: "Tell the colleague to ignore it, as exploiting it might lead to trouble.", score: 25, outcome: "Ignoring a known flaw is negligent and exposes the bank to massive risk if another employee or external entity finds it." }, { text: "Discuss the potential profit with a senior colleague to see if they think it's worth the risk.", score: 50, outcome: "This spreads the knowledge of the flaw without addressing the core problem: the need for a system fix." } ] },
        { id: 6, scenario: "You are analyzing a client's portfolio performance when you notice a large, suspicious fund transfer to an offshore account in a high-risk jurisdiction, flagged internally as potential money laundering.", options: [ { text: "Follow the bank's Anti-Money Laundering (AML) procedure, freeze the funds if necessary, and immediately file a Suspicious Activity Report (SAR).", score: 125, outcome: "Compliance with AML/KYC regulations is paramount. SAR filing is legally required when suspicion is present, and immediate action prevents further illicit activity." }, { text: "Contact the client and ask them for a detailed explanation for the transfer.", score: 25, outcome: "Notifying the client of an SAR (known as 'tipping off') is illegal and hinders the investigation. You must proceed internally first." }, { text: "Ignore the flag, as the client is very important and you do not want to jeopardize the relationship.", score: 0, outcome: "Prioritizing client relationship over AML compliance is a severe violation that can lead to catastrophic fines and criminal liability for the bank." }, { text: "Wait a few weeks to see if similar suspicious activity occurs before filing the report.", score: 50, outcome: "Delaying an SAR compromises the investigation and the bank's duty to report suspicious activity promptly." } ] },
        { id: 7, scenario: "Your team is under immense pressure to meet quarterly sales targets. Your manager suggests offering highly complex, high-fee structured products to less sophisticated clients who might not fully understand the risk.", options: [ { text: "Express concern to your manager, citing **Suitability** requirements, and escalate the sales practice to Compliance if the practice continues.", score: 125, outcome: "The duty of suitability requires that products sold match the client's financial sophistication, objectives, and risk tolerance. Escalation protects both the client and the bank's reputation." }, { text: "Follow the manager's direction, as meeting targets is the priority and the clients signed a waiver.", score: 0, outcome: "Waivers do not absolve the bank of suitability duty, and selling unsuitable products is often predatory and leads to regulatory action (e.g., FINRA)." }, { text: "Only offer the products to clients who ask about high-risk investments.", score: 75, outcome: "While better, you still have an affirmative duty to ensure the product is suitable, even if the client expresses interest." }, { text: "Sell the products, but verbally warn the clients about the high risk.", score: 50, outcome: "A verbal warning is insufficient; documented suitability and full disclosure of complexity are required." } ] },
        { id: 8, scenario: "A private equity client asks for your bank to finance a leveraged buyout (LBO) of a competitor. You know the LBO will result in massive job losses in a local community where your bank has significant retail presence.", options: [ { text: "Provide the financing if the deal meets all regulatory and credit risk criteria, separating business decisions from social impact.", score: 100, outcome: "While social responsibility is a factor, a bank's primary fiduciary and credit duty is to its shareholders and maintaining prudential lending standards. Blocking a profitable, compliant deal based purely on social risk is difficult to justify." }, { text: "Refuse the financing to protect the bank's public reputation and the local community.", score: 50, outcome: "This is a decision based on social responsibility, which is important, but it neglects the bank's core function and its fiduciary duty to maximize shareholder return when all risk parameters are met." }, { text: "Insist on a lower leverage ratio to minimize the risk of post-LBO default, regardless of social impact.", score: 75, outcome: "Focusing on credit risk is always correct, but it sidesteps the ethical/social question." }, { text: "Anonymously inform the press about the LBO's negative community impact before the deal closes.", score: 0, outcome: "Leaking client deal information is a severe breach of confidentiality and trust." } ] },
        { id: 9, scenario: "You are the manager of a small branch. A long-time employee is consistently underperforming, but they are a single parent and firing them would cause severe hardship. You need to staff a new, critical compliance role.", options: [ { text: "Reassign the employee to a non-critical administrative role that matches their current performance level, then hire a qualified candidate for the compliance position.", score: 125, outcome: "This balances the needs of the business (hiring a competent compliance officer) with compassion for the employee, showing ethical management." }, { text: "Fire the employee immediately and hire a new person for the compliance role.", score: 50, outcome: "While efficiency is restored, this ignores the duty of care to employees and should be a last resort after performance management." }, { text: "Place the underperforming employee in the critical compliance role, hoping they improve.", score: 0, outcome: "Placing an underperforming employee in a critical compliance role is negligent and exposes the bank to massive regulatory risk." }, { text: "Keep the employee in their current role and simply outsource the new compliance function to a high-cost consultant.", score: 25, outcome: "This is fiscally irresponsible and avoids the core HR management issue." } ] },
        { id: 10, scenario: "You discover a pattern of gender-biased pay disparity among senior staff, which is not illegal but is against the bank’s stated corporate values of equity.", options: [ { text: "Privately present the data and a proposal for a phased correction to the head of HR and the executive management team.", score: 100, outcome: "Addressing ethical disparities through formal channels is the most effective way to uphold corporate values without violating privacy or causing internal chaos." }, { text: "Confront the executives responsible publicly during the next town hall meeting.", score: 25, outcome: "Public confrontation is unprofessional and likely to result in retaliation without solving the underlying issue." }, { text: "Ignore the disparity, stating that if it were illegal, HR would have already addressed it.", score: 0, outcome: "Ignoring clear evidence of unfairness violates the bank's stated values and your professional ethical obligation." }, { text: "Leak the anonymous pay data to the entire company via an internal email.", score: 50, outcome: "While high impact, leaking data violates confidentiality and makes you vulnerable to termination for inappropriate communication." } ] }
    ]
};
const MAX_SCORE = EXAM_DATA.situations.reduce((sum, s) => sum + Math.max(...s.options.map(o => o.score)), 0);

const ExamSimulatorPage = ({ course }) => {
    // --- State Management ---
    const [examState, setExamState] = useState('progress'); // 'progress' or 'results'
    const [currentSituationIndex, setCurrentSituationIndex] = useState(0);
    const [finalScore, setFinalScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);

    const [email, setEmail] = useState("");
    const [subscriptionMessage, setSubscriptionMessage] = useState({ text: "", type: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- Effects ---
    useEffect(() => {
        const currentOptions = EXAM_DATA.situations[currentSituationIndex].options;
        setShuffledOptions(shuffleArray(currentOptions));
    }, [currentSituationIndex]);
    
    // --- Utility Functions ---
    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };
    
    // --- Event Handlers ---
    const handleDecision = (option) => {
        if (selectedOption) return; // Prevent multiple clicks
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
      if (percentage >= 90) return { title: "Master Compliance Officer", description: "Your judgment is excellent, demonstrating deep knowledge of regulatory requirements (AML, Suitability) and risk management.", color: "text-green-600", icon: "✅" };
      if (percentage >= 70) return { title: "Skilled Banker", description: "You possess a solid understanding of financial ethics and client protection.", color: "text-blue-600", icon: "👍" };
      if (percentage >= 50) return { title: "Developing Analyst", description: "Your fundamentals are sound, but some decisions showed missed opportunities for identifying risks.", color: "text-yellow-600", icon: "⚠️" };
      return { title: "Needs Review", description: "Many decisions resulted in low scores, indicating significant areas for review regarding key regulations (BSA, AML).", color: "text-red-600", icon: "🛑" };
    };

    const handleSubscription = async () => {
        // NOTE: Replace with your actual ConvertKit keys
        const CONVERTKIT_API_KEY = "YOUR_CONVERTKIT_API_KEY_HERE"; 
        const CONVERTKIT_FORM_ID = "YOUR_CONVERTKIT_FORM_ID_HERE";
        
        if (!email || !email.includes('@')) {
            setSubscriptionMessage({ text: "Please enter a valid email address.", type: "yellow" });
            return;
        }
        if (CONVERTKIT_API_KEY === "YOUR_CONVERTKIT_API_KEY_HERE" || CONVERTKIT_FORM_ID === "YOUR_CONVERTKIT_FORM_ID_HERE") {
             setSubscriptionMessage({ text: "Success! Check your inbox for your detailed compliance risk report.", type: "green" });
             // This is a dummy success for demonstration since keys are not present
             setIsSubmitting(true); // To hide the form
             return;
        }
        // ... (real API call logic would go here)
    };

    // --- Rendering Logic ---
    if (examState === 'results') {
        const feedback = getFeedback(finalScore);
        const percentage = Math.round((finalScore / MAX_SCORE) * 100);
        const shareText = `I scored ${percentage}% on the ${EXAM_DATA.courseName} Simulator! Test your financial ethics and compliance knowledge.`;

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


const PathwayPage = ({ course }) => {
    // Helper component for nav links to avoid repetition
    const NavLinks = ({ className }) => (
        <div className={`nav-links text-center my-8 ${className}`}>
            <a href="https://aulice-main-hub.netlify.app/" className="mx-2 font-bold no-underline">Home</a>
            <a href="https://aulice-about.netlify.app/" className="mx-2 font-bold no-underline">About us</a>
            <a href="https://aulice-pricing-plans.netlify.app/" className="mx-2 font-bold no-underline">Pricing Plans</a>
            <a href="https://aulice-lexicon.netlify.app/" className="mx-2 font-bold no-underline">Lexicon</a>
            <a href="https://aulice-teacher-dashboard.netlify.app/" className="mx-2 font-bold no-underline">Teacher</a>
            <a href="https://aulice-contact.netlify.app/" className="mx-2 font-bold no-underline">Contact</a>
        </div>
    );

    return (
        <div className="font-['Segoe_UI',_sans-serif] bg-[#f7f9fc] text-[#2c3e50] leading-relaxed">
            <style>{`
                .nav-links a { text-decoration: none; }
                header .nav-links a, footer .nav-links a { color: white; }
            `}</style>
            
            <header className="text-center py-10 px-5 bg-[#1a365d] text-white">
                <NavLinks />
                <h1 className="text-3xl font-bold">💼 Banking Mastery Pathway</h1>
                <p>A 150-Session Program for Global Professionals</p>
            </header>

            <div className="max-w-5xl my-10 mx-auto p-8">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <p>This pathway is designed to transform students into highly skilled banking professionals who can operate and communicate with confidence in any international environment. The curriculum progresses from core financial concepts to advanced risk management, technology, and leadership.</p>

                    {/* Phase 1 */}
                    <div className="my-8 p-5 bg-[#f0f3ff] border-l-4 border-[#1a365d] rounded-lg">
                        <h3 className="text-[#1a365d] text-xl font-bold">Phase 1: Financial System & Fundamentals (Units 1–25)</h3>
                        <p><strong>English Focus:</strong> Present Simple for facts and routines, core vocabulary for finance, roles, and key concepts.</p>
                        <ul className="my-2 pl-5 list-disc">
                            <li className="my-2"><strong>Units 1–5:</strong> Introduction to Banking<br /><em>Vocabulary: retail, investment, central banks; deposit, withdrawal.</em></li>
                            <li className="my-2"><strong>Units 6–10:</strong> The Financial Ecosystem<br /><em>Explaining institutions; sequence words: first, then.</em></li>
                            <li className="my-2"><strong>Units 11–15:</strong> Banking Products & Services<br /><em>Describing checking/savings accounts; using "can" and "could".</em></li>
                            <li className="my-2"><strong>Units 16–20:</strong> Customer Onboarding & KYC<br /><em>Role-playing interviews; polite questions: "Can you please provide...?"</em></li>
                            <li className="my-2"><strong>Units 21–25:</strong> Financial Terminology<br /><em>Learning terms: interest, principal, currency.</em></li>
                        </ul>
                    </div>

                    {/* Phase 2 */}
                    <div className="my-8 p-5 bg-[#f0f3ff] border-l-4 border-[#1a365d] rounded-lg">
                        <h3 className="text-[#1a365d] text-xl font-bold">Phase 2: Retail & Corporate Banking (Units 26–50)</h3>
                        <p><strong>English Focus:</strong> Client communication, explaining products, formal dialogues.</p>
                        <ul className="my-2 pl-5 list-disc">
                          <li className="my-2"><strong>Units 26–30:</strong> Loans & Credit<br /><em>Loan types: mortgage, personal; conditional: "If you have good credit..."</em></li>
                          <li className="my-2"><strong>Units 31–35:</strong> Business Banking<br /><em>Payroll, business loans; formal communication.</em></li>
                          <li className="my-2"><strong>Units 36–40:</strong> International Payments & Transfers<br /><em>Vocabulary: SWIFT, IBAN; fees and timelines.</em></li>
                          <li className="my-2"><strong>Units 41–45:</strong> Managing Client Relationships<br /><em>Persuasive language; handling complaints professionally.</em></li>
                          <li className="my-2"><strong>Units 46–50:</strong> The Role of the Teller & Front Office<br /><em>Role-playing interactions; phrasal verbs: "cash out", "set up".</em></li>
                        </ul>
                    </div>

                    {/* Phase 3 */}
                    <div className="my-8 p-5 bg-[#f0f3ff] border-l-4 border-[#1a365d] rounded-lg">
                        <h3 className="text-[#1a365d] text-xl font-bold">Phase 3: Investments & Wealth Management (Units 51–75)</h3>
                        <p><strong>English Focus:</strong> Explaining complex concepts, comparatives, persuasion.</p>
                        <ul className="my-2 pl-5 list-disc">
                            <li className="my-2"><strong>Units 51–55:</strong> Stocks & Bonds<br /><em>Difference between stocks and bonds; active/passive voice.</em></li>
                            <li className="my-2"><strong>Units 56–60:</strong> Mutual Funds & ETFs<br /><em>Risk and return vocabulary.</em></li>
                            <li className="my-2"><strong>Units 61–65:</strong> Portfolio Management<br /><em>Giving advice; modal verbs: should, could.</em></li>
                            <li className="my-2"><strong>Units 66–70:</strong> Retirement Planning<br /><em>Long-term goals and products.</em></li>
                            <li className="my-2"><strong>Units 71–75:</strong> Wealth Management<br /><em>High-net-worth clients; formal language.</em></li>
                        </ul>
                    </div>

                    {/* Phase 4 */}
                     <div className="my-8 p-5 bg-[#f0f3ff] border-l-4 border-[#1a365d] rounded-lg">
                        <h3 className="text-[#1a365d] text-xl font-bold">Phase 4: Risk, Compliance & Ethics (Units 76–100)</h3>
                        <p><strong>English Focus:</strong> Reporting incidents, legal jargon, formal meetings.</p>
                        <ul className="my-2 pl-5 list-disc">
                            <li className="my-2"><strong>Units 76–80:</strong> Anti-Money Laundering (AML)<br /><em>Detecting suspicious activity; passive voice procedures.</em></li>
                            <li className="my-2"><strong>Units 81–85:</strong> Fraud Detection & Prevention<br /><em>Reporting suspected fraud clearly.</em></li>
                            <li className="my-2"><strong>Units 86–90:</strong> Data Privacy & Security<br /><em>Cybersecurity threats; technical vocabulary.</em></li>
                            <li className="my-2"><strong>Units 91–95:</strong> Regulatory Frameworks<br /><em>Basel Accords; formal reporting.</em></li>
                            <li className="my-2"><strong>Units 96–100:</strong> Ethical Dilemmas in Finance<br /><em>Debating issues; argumentative language.</em></li>
                        </ul>
                    </div>
                    
                    {/* Phase 5 */}
                    <div className="my-8 p-5 bg-[#f0f3ff] border-l-4 border-[#1a365d] rounded-lg">
                        <h3 className="text-[#1a365d] text-xl font-bold">Phase 5: Financial Technology (Fintech) & Innovation (Units 101–125)</h3>
                        <p><strong>English Focus:</strong> Explaining tech, discussing trends, presenting ideas.</p>
                        <ul className="my-2 pl-5 list-disc">
                            <li className="my-2"><strong>Units 101–105:</strong> Digital Banking & Mobile Payments<br /><em>App features; mobile transaction vocabulary.</em></li>
                            <li className="my-2"><strong>Units 106–110:</strong> Blockchain & Cryptocurrency<br /><em>Explaining simply; conditionals.</em></li>
                            <li className="my-2"><strong>Units 111–115:</strong> AI & Machine Learning in Finance<br /><em>AI in credit scoring and fraud detection.</em></li>
                            <li className="my-2"><strong>Units 116–120:</strong> Financial Inclusion<br /><em>Tech expanding access to services.</em></li>
                            <li className="my-2"><strong>Units 121–125:</strong> The Future of Banking<br /><em>Predicting trends; debating impact.</em></li>
                        </ul>
                    </div>
                    
                    {/* Phase 6 */}
                    <div className="my-8 p-5 bg-[#f0f3ff] border-l-4 border-[#1a365d] rounded-lg">
                        <h3 className="text-[#1a365d] text-xl font-bold">Phase 6: Leadership & Capstone Project (Units 126–150)</h3>
                        <p><strong>English Focus:</strong> Strategic planning, presentations, team leadership.</p>
                        <ul className="my-2 pl-5 list-disc">
                            <li className="my-2"><strong>Units 126–130:</strong> Financial Analysis & Reporting<br /><em>Discussing statements; presenting data.</em></li>
                            <li className="my-2"><strong>Units 131–135:</strong> Business Presentations<br /><em>Formal presentation to board or client.</em></li>
                            <li className="my-2"><strong>Units 136–140:</strong> Crisis Management & PR<br /><em>Handling media; crafting public statements.</em></li>
                            <li className="my-2"><strong>Units 141–145:</strong> Negotiation Skills<br /><em>Negotiating deal terms; persuasive language.</em></li>
                            <li className="my-2"><strong>Units 146–150:</strong> Final Capstone Project<br /><em>Deliver a final presentation on a real-world banking case study.</em></li>
                        </ul>
                    </div>

                    {/* Example Unit */}
                    <div className="my-8 p-5 bg-[#f8f9fa] rounded-lg border border-dashed border-[#1a365d]">
                        <h4 className="text-[#1a365d] text-lg font-bold">📘 Example Unit: Unit 1 – Introduction to Banking</h4>
                        <p><strong>This unit introduces foundational banking concepts and essential vocabulary.</strong></p>
                        <ul className="my-2 pl-5 list-disc">
                            <li className="my-2"><strong>Exercise 1: Vocabulary & Definitions</strong><br /><em>Match: Deposit, Withdrawal, Loan, Interest, ATM to definitions.</em></li>
                            <li className="my-2"><strong>Exercise 2: Present Simple – Routine Processes</strong><br /><em>"A bank teller ________ (help) customers with transactions."</em></li>
                            <li className="my-2"><strong>Exercise 3: Professional Roles</strong><br /><em>Describe: Bank Teller, Financial Analyst, Loan Officer.</em></li>
                            <li className="my-2"><strong>Exercise 4: Short Answer Questions</strong><br /><em>What's the difference between retail and investment banks?</em></li>
                        </ul>
                    </div>
                </div>
            </div>

            <footer className="text-center py-10 bg-[#1a365d] text-white mt-16">
                <NavLinks />
                <p>© 2025 Aulice Academy. Reality is programmable. Smart people are its architects.</p>
            </footer>
        </div>
    );
};

const ScenarioPage = ({ course }) => {
    const [answers, setAnswers] = useState({});
    const [feedbacks, setFeedbacks] = useState({});

    const handleInputChange = (e, id) => {
        setAnswers({ ...answers, [id]: e.target.value });
    };

    const submitAnswer = (id) => {
        const answer = answers[id] || '';
        const feedbackText = answer.trim().length < 20
            ? "<strong>💡 Tip:</strong> Be specific. Include empathy, procedure, and safety focus."
            : "<strong>✅ Well done!</strong> Your response shows professionalism under pressure.";
        setFeedbacks({ ...feedbacks, [id]: feedbackText });
    };

    const scenarios = [
      { id: 'q1', title: "1. A client loses money on an investment. How do you respond?", prompt: "How do you show empathy? Do you offer a solution?" },
      { id: 'q2', title: "2. A client is upset about a service fee they didn't expect. How do you handle this complaint?", prompt: "How do you explain the fee? Can you offer a one-time waiver?" },
      { id: 'q3', title: "3. A client's loan application has been rejected. How do you explain this decision to them?", prompt: "How do you provide the news respectfully? What options do you suggest?" },
      { id: 'q4', title: "4. A new client is confused about the difference between a checking and a savings account. How do you explain it simply?", prompt: "Use simple language and clear examples." },
      { id: 'q5', title: "5. A client asks about their current account balance. How do you respond?", prompt: "What is the procedure for verifying identity? How do you maintain privacy?" },
      { id: 'q6', title: "6. A long-term client reports a fraudulent charge on their account. What is your first action?", prompt: "What do you do? Who do you inform?" },
      { id: 'q7', title: "7. An elderly client wants to withdraw a very large sum of money to 'help a friend.' You suspect it's a scam. How do you handle this?", prompt: "How do you raise concerns without accusing the client?" },
      { id: 'q8', title: "8. A client is very angry because they have been waiting for 20 minutes. How do you de-escalate the situation?", prompt: "How do you show empathy? How do you offer a solution?" },
      { id: 'q9', title: "9. A client wants to transfer a large sum to a foreign bank account. How do you handle this?", prompt: "What is the verification procedure? What questions do you ask?" },
      { id: 'q10', title: "10. A new client is interested in opening a business account. What services would you explain?", prompt: "How do you present the value?" },
      { id: 'q11', title: "11. A bank system outage occurs. How do you manage clients in the branch?", prompt: "How do you communicate? What do you do to help?" },
      { id: 'q12', title: "12. A colleague makes a mistake causing a client to be overcharged. How do you handle this?", prompt: "What is your responsibility?" },
      { id: 'q13', title: "13. How would you explain the benefits of a home mortgage to a potential client?", prompt: "What are the benefits? What are the risks?" },
      { id: 'q14', title: "14. How would you explain the importance of a good credit score to a young adult?", prompt: "How do you make it relatable?" },
      { id: 'q15', title: "15. A client reports that their debit card has been stolen. How do you help them?", prompt: "What is your first step? What do you do next?" },
      { id: 'q16', title: "16. How do you politely decline a client's request for a loan when they don't meet requirements?", prompt: "How do you stay polite? How do you offer an alternative?" },
      { id: 'q17', title: "17. A client wants to close an account because they're unhappy. How do you respond?", prompt: "How do you show empathy? How do you try to retain the client?" },
      { id: 'q18', title: "18. A client is concerned about online banking security. How do you reassure them?", prompt: "What security features does the bank have?" },
      { id: 'q19', title: "19. A client wants to open an account for their child. What information do you give them?", prompt: "What are the benefits? What are the requirements?" },
      { id: 'q20', title: "20. A client wants to set up direct deposit for their paycheck. How do you help them?", prompt: "What information do they need? What is the procedure?" }
    ];

    // Helper component for nav links
    const NavLinks = ({ inHeader }) => (
        <div className="text-center my-8">
            <a href="https://aulice-main-hub.netlify.app/" className={`mx-2 font-bold no-underline ${inHeader ? 'text-white' : ''}`}>Home</a>
            <a href="https://aulice-about.netlify.app/" className={`mx-2 font-bold no-underline ${inHeader ? 'text-white' : ''}`}>About us</a>
            <a href="https://aulice-pricing-plans.netlify.app/" className={`mx-2 font-bold no-underline ${inHeader ? 'text-white' : ''}`}>Pricing Plans</a>
            <a href="https://aulice-lexicon.netlify.app/" className={`mx-2 font-bold no-underline ${inHeader ? 'text-white' : ''}`}>Lexicon</a>
            <a href="https://aulice-teacher-dashboard.netlify.app/" className={`mx-2 font-bold no-underline ${inHeader ? 'text-white' : ''}`}>Teacher</a>
            <a href="https://aulice-contact.netlify.app/" className={`mx-2 font-bold no-underline ${inHeader ? 'text-white' : ''}`}>Contact</a>
        </div>
    );

    return (
        <div className="font-['Segoe_UI',_sans-serif] bg-[#f7f9fc] text-[#2c3e50] leading-relaxed">
            <style>{`.btn { display: inline-block; padding: 10px 20px; background: #1a365d; color: white; border: none; border-radius: 6px; cursor: pointer; margin: 10px 0; font-size: 14px; }`}</style>
            <header className="text-center py-10 px-5 bg-[#1a365d] text-white">
                <NavLinks inHeader={true} />
                <h1 className="text-3xl font-bold">💼 Professional Practice Scenarios: Banking Professionals</h1>
                <p>Solve real operational challenges using English as your tool.</p>
            </header>
            <div className="max-w-4xl my-10 mx-auto p-8 bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-[#1a365d]">🎯 After completing this lesson, you will be able to:</h2>
                <ul className="my-2 pl-5 list-disc">
                    <li>Explain financial products clearly.</li>
                    <li>Handle client complaints with empathy.</li>
                    <li>Report suspicious transactions.</li>
                    <li>Lead during system outages.</li>
                </ul>
                <h2 className="text-2xl font-bold text-[#1a365d] mt-8">Part 1: Client Service & Communication</h2>
                {scenarios.map(({ id, title, prompt }) => (
                    <div key={id} className="bg-[#f8f9fa] p-5 my-5 border-l-4 border-[#1a365d] rounded-r-lg">
                        <h3 className="text-lg font-bold text-[#1a365d]">{title}</h3>
                        <p><strong>Think about:</strong> {prompt}</p>
                        <textarea
                            id={id}
                            value={answers[id] || ''}
                            onChange={(e) => handleInputChange(e, id)}
                            placeholder="Your response..."
                            className="w-full p-2 my-2 border border-gray-300 rounded"
                        ></textarea>
                        <button onClick={() => submitAnswer(id)} className="btn">✅ Submit</button>
                        {feedbacks[id] && (
                            <div
                                id={`${id}Feedback`}
                                className="my-2 p-2 bg-[#e8f4f8] rounded"
                                dangerouslySetInnerHTML={{ __html: feedbacks[id] }}
                            ></div>
                        )}
                    </div>
                ))}
            </div>
            <footer className="text-center py-10 bg-[#1a365d] text-white mt-16">
                <NavLinks inHeader={true} />
                <p>© 2025 Aulice Academy. Reality is programmable. Smart people are its architects.</p>
            </footer>
        </div>
    );
};

const Unit1Page = ({ course }) => {
    // Helper component for nav links
    const NavLinks = () => (
        <div className="text-center my-8">
            <a href="https://www.aulice.ca" className="mx-2 text-[#1a365d] font-bold no-underline">🏠 Home</a>
            <a href="https://aulislab.netlify.app" className="mx-2 text-[#1a365d] font-bold no-underline">🧩 Aulice Lab</a>
            <a href="https://aulice-lexicon.netlify.app" className="mx-2 text-[#1a365d] font-bold no-underline">📘 Lexicon</a>
            <a href="https://teacher-aulice.netlify.app" className="mx-2 text-[#1a365d] font-bold no-underline">👨‍🏫 Teacher Dashboard</a>
        </div>
    );

    const Exercise = ({ title, children }) => (
        <div className="bg-[#f8f9fa] p-5 my-5 border-l-4 border-[#1a365d] rounded-r-lg">
            <h3 className="text-xl font-bold text-[#1a365d] mb-4">{title}</h3>
            {children}
        </div>
    );
    
    return (
        <div className="font-['Segoe_UI',_sans-serif] bg-[#f7f9fc] text-[#2c3e50] leading-relaxed">
            <style>{`
              .inline-input { 
                width: 200px; padding: 6px 10px; margin: 0 5px; border: 2px solid #1a365d; 
                border-radius: 4px; font-size: 16px; color: #1a365d; background: #f8f9fa; 
              }
              .inline-input:focus { outline: none; background: white; box-shadow: 0 0 0 2px rgba(26, 54, 93, 0.3); }
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
                    <li>Identify and describe different types of banks.</li>
                    <li>Understand the roles and responsibilities of key banking professionals.</li>
                    <li>Use the Present Simple tense to describe routine processes and facts.</li>
                </ul>

                <Exercise title="Lesson 1: Vocabulary & Core Concepts">
                    <h4 className="font-semibold text-lg">Exercise 1: Vocabulary & Definitions</h4>
                    <p>Match the term to its correct definition.</p>
                    <table className="w-full mt-2 text-left">
                        <thead><tr><th className="p-2 bg-gray-200">Term</th><th className="p-2 bg-gray-200">Definition</th></tr></thead>
                        <tbody>
                            <tr><td className="p-2 border-b">Deposit</td><td className="p-2 border-b">The act of placing money into a bank account.</td></tr>
                            <tr><td className="p-2 border-b">Withdrawal</td><td className="p-2 border-b">The act of taking money out of a bank account.</td></tr>
                            <tr><td className="p-2 border-b">Loan</td><td className="p-2 border-b">Money borrowed from a bank that must be repaid with interest.</td></tr>
                            <tr><td className="p-2 border-b">Interest</td><td className="p-2 border-b">The fee a bank pays you for using your money, or the fee you pay for borrowing.</td></tr>
                            <tr><td className="p-2">ATM</td><td className="p-2">A machine that allows basic banking functions.</td></tr>
                        </tbody>
                    </table>
                    <textarea placeholder="Write your answers (e.g., Deposit - D)" className="w-full mt-4 p-2 border rounded"></textarea>
                    <button className="btn">✅ Submit</button>
                </Exercise>
                
                <Exercise title="Lesson 2: Types of Banks">
                     <h4 className="font-semibold text-lg">Exercise 2: Gap-Fill & Substitution</h4>
                     <p>Fill in the blanks with the correct type of bank: <strong>retail, investment, central</strong></p>
                     <ol className="list-decimal pl-5 mt-2 space-y-2">
                         <li>A <input type="text" className="inline-input" /> bank works with individuals, offering checking and savings accounts.</li>
                         <li>The <input type="text" className="inline-input" /> bank controls the money supply and sets national interest rates.</li>
                         <li>An <input type="text" className="inline-input" /> bank helps companies raise capital and handles mergers.</li>
                     </ol>
                     <button className="btn">✅ Submit</button>
                </Exercise>

                 <Exercise title="Lesson 3: Professional Roles">
                     <h4 className="font-semibold text-lg">Exercise 3: Present Simple – Routine Processes</h4>
                     <p>Complete the sentences using the correct form of the verb.</p>
                     <ol className="list-decimal pl-5 mt-2 space-y-2">
                         <li>A bank teller <input type="text" className="inline-input" placeholder="(help)" /> customers with transactions.</li>
                         <li>The bank <input type="text" className="inline-input" placeholder="(pay)" /> interest on savings accounts.</li>
                         <li>A loan officer <input type="text" className="inline-input" placeholder="(assess)" /> credit history.</li>
                         <li>The ATM <input type="text" className="inline-input" placeholder="(dispense)" /> cash.</li>
                         <li>A financial advisor <input type="text" className="inline-input" placeholder="(give)" /> investment advice.</li>
                     </ol>
                     <button className="btn">✅ Submit</button>
                </Exercise>
                
                <Exercise title="Lesson 4: Grammar & Sentence Structure">
                     <h4 className="font-semibold text-lg">Exercise 5: Sentence Scramble</h4>
                     <p>Put the words in order to make correct sentences.</p>
                     <ol className="list-decimal pl-5 mt-2 space-y-2">
                         <li>handles / an investment bank / acquisitions / mergers and<br/><input type="text" className="inline-input w-full max-w-md" /></li>
                         <li>a customer / money / deposits / into / their / account<br/><input type="text" className="inline-input w-full max-w-md" /></li>
                     </ol>
                     <button className="btn">✅ Submit</button>
                </Exercise>

                <NavLinks />

            </div>

            <footer className="text-center py-10 bg-[#1a365d] text-white mt-16">
                <p>© 2025 Aulice Academy. Reality is programmable. Smart people are its architects.</p>
            </footer>
        </div>
    );
};

const YoungGeniusQuizPage = () => <PlaceholderPage pageTitle="Young Genius Quiz" />;
const CustomTrackFormPage = () => <PlaceholderPage pageTitle="Custom Track Form" />;
const YoungGeniusFormPage = () => <PlaceholderPage pageTitle="Young Genius Form" />;


// --- Main App Component ---

export default function App() {
  const [page, setPage] = useState('home');
  const [activeCourse, setActiveCourse] = useState(null);

  const navigate = (newPage) => {
    setPage(newPage);
  };

  const renderPage = () => {
    switch (page) {
      case 'quiz':
        return <YoungGeniusQuizPage />;
      case 'customTrackForm':
        return <CustomTrackFormPage />;
      case 'geniusForm':
        return <YoungGeniusFormPage />;
      case 'DemoSimulator':
        return <DemoSimulatorPage course={activeCourse} />;
      case 'ExamSimulator':
        return <ExamSimulatorPage course={activeCourse} />;
      case 'Pathway':
        return <PathwayPage course={activeCourse} />;
      case 'Scenario':
        return <ScenarioPage course={activeCourse} />;
      case 'Unit1':
        return <Unit1Page course={activeCourse} />;
      case 'PricingPlans':
        return <PricingOptionsPage course={activeCourse} />;
      case 'home':
      default:
        return <HomePage setCurrentPage={navigate} setActiveCourse={setActiveCourse} />;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      <div className="w-full">
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

