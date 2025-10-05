// src/pages/ExamSimulatorPage.jsx
import React, { useState, useEffect } from 'react';

// --- Exam Data (currently Banking-only) ---
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
      setIsSubmitting(true);
      return;
    }
    // Real API logic would go here
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
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Professional Email"
              className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-center"
            />
            <button
              onClick={handleSubscription}
              className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
              Get Detailed Report
            </button>
            {subscriptionMessage.text && (
              <p className={`mt-4 text-sm font-semibold text-${subscriptionMessage.type}-600`}>
                {subscriptionMessage.text}
              </p>
            )}
          </div>
        ) : (
          <p className="mt-4 text-sm font-semibold text-green-600">{subscriptionMessage.text}</p>
        )}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-lg text-gray-600 mb-4 font-semibold">Share your achievement:</p>
          <div className="flex justify-center space-x-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-sky-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-sky-600 transition shadow-md"
            >
              <span>Share on X</span>
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-blue-700 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-800 transition shadow-md"
            >
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
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
            {EXAM_DATA.icon} {EXAM_DATA.courseName} Simulator
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Test your compliance knowledge, risk management, and financial ethics.
          </p>
        </div>
        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-indigo-700 mb-2 sm:mb-0">
              Situation {currentSituationIndex + 1}/{EXAM_DATA.situations.length}
            </h2>
            <span className="text-2xl font-extrabold text-gray-800 bg-indigo-100 px-4 py-1 rounded-full shadow-inner">
              Score: {finalScore}
            </span>
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
                <button
                  key={index}
                  onClick={() => handleDecision(option)}
                  className={buttonClass}
                  disabled={!!selectedOption}
                >
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
              <button
                onClick={handleNext}
                className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-xl hover:bg-indigo-700 transition"
              >
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