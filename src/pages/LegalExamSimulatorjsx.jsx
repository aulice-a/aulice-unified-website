// src/components/LegalExamSimulatorPage.jsx
import React, { useState, useEffect } from 'react';

const LEGAL_EXAM_DATA = {
  courseName: "Legal Professional",
  icon: "⚖️",
  situations: [
    {
      id: 1,
      scenario: "Your client, facing a minor misdemeanor charge, suddenly admits during a private consultation that they are guilty of a much more serious, unrelated felony that the prosecution knows nothing about. Disclosure is not mandatory under attorney-client privilege.",
      options: [
        { text: "Continue representing the client on the misdemeanor, maintaining strict confidentiality regarding the felony.", score: 125, outcome: "The attorney-client privilege is sacrosanct. Unless the felony involves a threat of future harm, you must maintain confidentiality, even when the truth is known to you." },
        { text: "Anonymously tip off the police about the felony to ensure justice is served.", score: 0, outcome: "Anonymously tipping off authorities violates the trust and duty of confidentiality owed to the client. This is a severe ethical breach." },
        { text: "Advise the client to disclose the felony immediately to the court.", score: 50, outcome: "While you can advise the client on the risks of non-disclosure, you cannot compel them to waive privilege or disclose facts that may incriminate them." },
        { text: "Withdraw from the misdemeanor case without explanation.", score: 75, outcome: "Withdrawing is an option if the conflict makes continued representation impossible, but it may raise suspicion and is not strictly required if the representation on the misdemeanor remains ethical." }
      ]
    },
    {
      id: 2,
      scenario: "You discover a precedent in a jurisdiction outside of yours that is highly damaging to your client's case, but the opposing counsel has missed it. You have no professional obligation to disclose it.",
      options: [
        { text: "Do not disclose the foreign precedent; focus only on the law of the governing jurisdiction.", score: 100, outcome: "Your primary duty is to your client's best interest within the governing law. You are not obligated to do opposing counsel's work for them, especially regarding non-binding external precedents." },
        { text: "Inform the judge immediately, citing your duty to the truth.", score: 0, outcome: "Your duty to candor applies to binding precedent in the court's jurisdiction. Extending this to non-binding, foreign precedent is a violation of your fiduciary duty to your client." },
        { text: "Discreetly hint at the precedent to the opposing counsel to 'level the playing field'.", score: 25, outcome: "This acts against your client’s interest and improperly shares confidential strategy or discovered information." },
        { text: "Prepare a counter-argument just in case the opposing counsel discovers the precedent.", score: 75, outcome: "This is prudent trial preparation, but the initial decision is whether to disclose the damaging information, which you are not required to do." }
      ]
    },
    {
      id: 3,
      scenario: "You are preparing a brief for a high-profile case. Your supervising partner instructs you to omit a critical fact that slightly weakens your client's defense but is not directly misleading to the court.",
      options: [
        { text: "Raise your ethical concern privately with the partner, insisting the fact be included or, failing that, escalate the matter to the firm's ethics counsel.", score: 125, outcome: "Maintaining integrity and professional independence overrides instructions from a superior that compromise your duty of candor to the tribunal." },
        { text: "Omit the fact as instructed, citing the partner's superior judgment and experience.", score: 0, outcome: "Following an unethical order does not absolve you of responsibility. Your personal professional duties are paramount." },
        { text: "Document the instruction and proceed, but prepare a separate internal memo detailing your disagreement.", score: 50, outcome: "While documenting is good, proceeding with an ethically questionable action without escalation still makes you complicit." },
        { text: "Leak the full, accurate draft brief to a trusted journalist to ensure the truth is public.", score: 25, outcome: "This is a severe breach of client confidentiality and is highly unprofessional and likely illegal." }
      ]
    },
    {
      id: 4,
      scenario: "You are interviewing a witness who is providing very useful information, but you believe they are slightly fabricating or exaggerating key details. You cannot definitively prove they are lying.",
      options: [
        { text: "Use the information, but corroborate every detail with independent evidence before presenting it in court.", score: 100, outcome: "Your duty is to present evidence; you are not required to assume a witness is lying. Prudent practice requires corroboration to protect your case from cross-examination." },
        { text: "Stop the interview immediately and refuse to call the witness, as they lack credibility.", score: 50, outcome: "Unless you know the testimony is *false*, discarding useful, even if exaggerated, information may harm your client's case and is overly cautious." },
        { text: "Coach the witness on how to make their story more believable and consistent.", score: 0, outcome: "Coaching a witness to lie or embellish is subornation of perjury and is an immediate, career-ending ethical violation." },
        { text: "Ask the witness a leading question to confirm the detail you suspect is fabricated.", score: 75, outcome: "While aggressive, leading questions are a common interviewing tactic; the key is not to introduce the fabrication yourself." }
      ]
    },
    {
      id: 5,
      scenario: "You are handling a high-value real estate transaction for a major client. The client pressures you to rush the due diligence process and ignore minor environmental red flags to close the deal quickly.",
      options: [
        { text: "Inform the client that you cannot proceed until all standard due diligence is complete, stressing the potential liability and your professional duty.", score: 125, outcome: "Protecting the client from foreseeable legal harm (potential future environmental lawsuits) and upholding professional standards (thorough due diligence) overrides client pressure for speed." },
        { text: "Waive the due diligence and proceed to closing under the client's instruction, getting the instruction in writing.", score: 25, outcome: "Even with written instruction, knowingly facilitating a high-risk transaction against established professional standards is negligence and can expose you to liability." },
        { text: "Quietly outsource the remaining due diligence to an intern and review their report only superficially.", score: 0, outcome: "Delegating critical work without proper supervision and review constitutes professional malpractice and gross negligence." },
        { text: "Charge an exorbitant 'risk fee' to compensate for the expedited process and proceed.", score: 50, outcome: "This prioritizes financial gain over professional responsibility and does not mitigate the underlying legal risk to the client or yourself." }
      ]
    },
    {
      id: 6,
      scenario: "During a settlement negotiation, opposing counsel mistakenly sends you an email revealing their absolute bottom-line settlement number, which is much lower than you expected.",
      options: [
        { text: "Promptly notify the sender of the error and follow their instructions regarding the improperly obtained communication.", score: 125, outcome: "Model Rules of Professional Conduct generally require lawyers who receive inadvertently transmitted information to promptly notify the sender. It protects the integrity of the process." },
        { text: "Keep the information and use it immediately to secure a highly favorable settlement for your client.", score: 0, outcome: "While beneficial for the client, using inadvertently acquired confidential information is generally considered unethical and violates professional rules in many jurisdictions." },
        { text: "Ignore the email and continue negotiating as if you hadn't seen it.", score: 75, outcome: "Ignoring it may not be feasible if the information changes your strategy. The ethical duty usually mandates notification." },
        { text: "Tell your client the actual bottom line but suggest they keep it secret.", score: 25, outcome: "Telling your client the secret violates the spirit of the notification rule, even if you don't use it directly in the negotiation." }
      ]
    },
    {
      id: 7,
      scenario: "A prospective client explains a complex case to you, but you realize the case falls completely outside your area of expertise. The client is ready to pay a significant retainer.",
      options: [
        { text: "Decline the case and refer the client to a reputable lawyer specializing in that area of law.", score: 125, outcome: "A lawyer must provide competent representation. Accepting a case outside your competence without co-counsel or adequate preparation violates this fundamental duty." },
        { text: "Accept the retainer and promise to study the area of law quickly to catch up.", score: 25, outcome: "While diligent study is required, accepting a case knowing you are incompetent at the outset puts the client's interests at risk and is a violation of the duty of competence." },
        { text: "Accept the case, but immediately hire a junior associate who claims expertise in that area to do the main work.", score: 50, outcome: "You cannot delegate the ultimate responsibility for competence. Proper supervision of the associate is still required, and the client deserves to know who is primarily responsible." },
        { text: "Negotiate a higher retainer, citing the difficulty of the case, and then hire the specialist as 'co-counsel' but keep most of the fee.", score: 0, outcome: "This exploits the client financially and is unethical fee-splitting/charging for services you did not provide competently." }
      ]
    },
    {
      id: 8,
      scenario: "You are the head partner on a corporate merger. A junior lawyer on your team raises a concern about an obscure, minor regulatory violation that would significantly delay the closing if addressed.",
      options: [
        { text: "Thoroughly investigate the regulatory concern and advise the client on the risk and delay before proceeding.", score: 100, outcome: "Your professional duty requires addressing all known legal risks, regardless of size or impact on the timeline, to ensure the client is fully informed before making a business decision." },
        { text: "Acknowledge the concern but instruct the junior lawyer to ignore it, citing time pressure and the minor nature of the violation.", score: 0, outcome: "Instructing a subordinate to disregard a known regulatory violation compromises the transaction's legality and the firm's integrity." },
        { text: "Ask the client to sign a waiver stating they take responsibility for the specific regulatory risk.", score: 75, outcome: "A waiver may mitigate risk, but it does not remove your duty to properly investigate and advise the client on the extent of the risk." },
        { text: "Fire the junior lawyer for creating unnecessary delays and proceed with the closing.", score: 25, outcome: "Retaliating against a lawyer for raising a legitimate ethical or legal concern creates a toxic, unprofessional environment." }
      ]
    },
    {
      id: 9,
      scenario: "Your client, a small business owner, asks you to draft a contract provision that you believe is highly exploitative and unfairly biased against the other party (a vulnerable consumer). The provision is technically legal.",
      options: [
        { text: "Advise the client against the provision, explaining the risk of future litigation and potential reputational damage, and suggest a fairer, defensible alternative.", score: 125, outcome: "The lawyer's role is not just to act as an amoral technical drafter but to advise on the legal and practical consequences (including court challenges and business risk) of their actions." },
        { text: "Draft the provision exactly as requested, since it is technically legal and your only duty is to the client.", score: 50, outcome: "While technically permissible, ignoring the massive future litigation risk inherent in an overly exploitative clause is poor professional judgment." },
        { text: "Refuse to draft the provision and threaten to withdraw if the client insists.", score: 75, outcome: "Refusal is strong, but offering clear risk-based advice is often a better initial step than immediate confrontation/withdrawal." },
        { text: "Draft the provision but secretly insert a loophole that favors the consumer.", score: 0, outcome: "Sabotaging your own client's work is a profound breach of fiduciary duty and professional trust." }
      ]
    },
    {
      id: 10,
      scenario: "You discover that a paralegal in your office has been accessing client files unrelated to their assigned cases out of curiosity, but has not shared the information externally.",
      options: [
        { text: "Immediately address the breach with the paralegal, stop the unauthorized access, and notify the appropriate supervising partners about the privacy violation.", score: 100, outcome: "Unauthorized access, even internally, is a breach of client confidentiality. Immediate action and internal reporting are necessary to maintain ethical standards and firm security." },
        { text: "Ignore the violation since no external information leak occurred.", score: 0, outcome: "Ignoring an internal breach of confidentiality is negligent and leaves the firm vulnerable to a future, more serious leak." },
        { text: "Fire the paralegal immediately and without further investigation.", score: 50, outcome: "While termination may be warranted, immediate firing without investigation or internal reporting prevents the firm from understanding the extent of the breach and mitigating risk." },
        { text: "Ask the paralegal to sign a non-disclosure agreement and promise not to do it again.", score: 25, outcome: "A promise is insufficient; the breach of security must be formally addressed and stopped through system access changes and reporting." }
      ]
    }
  ]
};

const MAX_SCORE = LEGAL_EXAM_DATA.situations.reduce((sum, s) => sum + Math.max(...s.options.map(o => o.score)), 0);

const LegalExamSimulatorPage = ({ course }) => {
  const [examState, setExamState] = useState('progress');
  const [currentSituationIndex, setCurrentSituationIndex] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [email, setEmail] = useState("");
  const [subscriptionMessage, setSubscriptionMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const currentOptions = LEGAL_EXAM_DATA.situations[currentSituationIndex].options;
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
    if (currentSituationIndex < LEGAL_EXAM_DATA.situations.length - 1) {
      setCurrentSituationIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
    } else {
      setExamState('results');
    }
  };

  const getFeedback = (score) => {
    const percentage = (score / MAX_SCORE) * 100;
    if (percentage >= 90) return { title: "Master Litigator", description: "Your judgment reflects a strong commitment to ethical duty, client confidentiality, and legal candor. You possess the elite judgment of a top-tier lawyer." };
    if (percentage >= 70) return { title: "Skilled Counsel", description: "You possess a solid understanding of complex legal and ethical dilemmas, prioritizing professional conduct in most scenarios." };
    if (percentage >= 50) return { title: "Developing Associate", description: "Your fundamentals are sound, but some decisions showed missed opportunities regarding your duty of candor or conflict of interest. Focus on stricter adherence to ethical rules." };
    return { title: "Needs Review", description: "Many of your decisions resulted in low scores, indicating significant areas for review regarding core professional responsibility and ethical guidelines." };
  };

  const handleSubscription = () => {
    if (!email || !email.includes('@')) {
      setSubscriptionMessage({ text: "Please enter a valid email address.", type: "yellow" });
      return;
    }
    setSubscriptionMessage({ text: "Success! Check your inbox to confirm your subscription and receive your detailed legal ethics report.", type: "green" });
    setIsSubmitting(true);
  };

  if (examState === 'results') {
    const feedback = getFeedback(finalScore);
    const percentage = Math.round((finalScore / MAX_SCORE) * 100);
    const shareText = `I scored ${percentage}% on the ${LEGAL_EXAM_DATA.courseName} Simulator! Test your legal judgment here.`;

    return (
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-200 text-center max-w-4xl mx-auto my-10">
        <h2 className="text-5xl font-extrabold text-indigo-600 mb-4">Results Complete!</h2>
        <p className="text-3xl font-bold text-gray-800 mb-6">Total Score: {finalScore} / {MAX_SCORE} ({percentage}%)</p>
        <div className="mx-auto max-w-2xl bg-indigo-50 p-6 rounded-xl">
          <h3 className="text-3xl font-extrabold text-gray-900 mb-2">{feedback.title}</h3>
          <p className="text-xl text-gray-700">{feedback.description}</p>
        </div>
        <h3 className="text-2xl font-bold text-gray-700 mb-4 border-t pt-6 mt-6">Unlock Your Detailed Performance Report</h3>
        {!isSubmitting ? (
          <div className="mx-auto max-w-sm">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email Address"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
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
        <div className="mt-8 pt-6 border-t">
          <p className="text-lg text-gray-600 mb-4">Share your achievement:</p>
          <div className="flex justify-center space-x-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-sky-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-sky-600 transition"
            >
              <span>Share on X</span>
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-blue-700 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-800 transition"
            >
              <span>Share on LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  const currentSituation = LEGAL_EXAM_DATA.situations[currentSituationIndex];
  const maxScoreOption = currentSituation.options.reduce((max, opt) => opt.score > max.score ? opt : max, { score: -Infinity });

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-center">
          {LEGAL_EXAM_DATA.icon} {LEGAL_EXAM_DATA.courseName} Simulator
        </h1>
        <p className="text-lg text-gray-600 mb-10 text-center">
          Test your professional conduct, ethical judgment, and duty of candor.
        </p>
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-200">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-blue-700">
              Situation {currentSituationIndex + 1}/{LEGAL_EXAM_DATA.situations.length}
            </h2>
            <span className="text-xl font-semibold text-gray-800">Score: {finalScore}</span>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">{currentSituation.scenario}</p>
          <div className="space-y-4 mb-8">
            {shuffledOptions.map((option, index) => {
              let buttonClass = 'w-full text-left p-4 rounded-xl border border-gray-300 shadow-sm hover:shadow-md transition duration-150 ease-in-out';
              if (selectedOption) {
                if (option.text === selectedOption.text) {
                  if (selectedOption.score >= 100) buttonClass += ' bg-green-500 text-white';
                  else if (selectedOption.score > 25) buttonClass += ' bg-yellow-500 text-white';
                  else buttonClass += ' bg-red-500 text-white';
                  buttonClass += ' shadow-lg';
                } else if (option.text === maxScoreOption.text) {
                  if (selectedOption.score !== maxScoreOption.score) {
                    buttonClass += ' bg-blue-200 border-blue-500 opacity-70';
                  } else {
                    buttonClass += ' opacity-50';
                  }
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
            <div className="bg-gray-100 p-5 rounded-xl border-l-4 border-gray-500 shadow-inner mb-6">
              <h3 className="font-bold text-lg text-gray-700 mb-2">Outcome Rationale:</h3>
              <p className="text-gray-800">{selectedOption.outcome}</p>
            </div>
          )}
          {selectedOption && (
            <div className="text-center">
              <button
                onClick={handleNext}
                className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-700 transition"
              >
                {currentSituationIndex === LEGAL_EXAM_DATA.situations.length - 1 ? 'See Final Results' : 'Next Situation'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LegalExamSimulatorPage;