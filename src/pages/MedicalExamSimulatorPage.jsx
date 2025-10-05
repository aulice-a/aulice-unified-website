// src/components/MedicalExamSimulatorPage.jsx
import React, { useState, useEffect } from 'react';

const MEDICAL_EXAM_DATA = {
  courseName: "Medical Professional",
  icon: "⚕️",
  situations: [
    {
      id: 1,
      scenario: "A 45-year-old patient presents with chronic fatigue, joint pain, and a low-grade fever that have persisted for months. Initial lab results are inconclusive. The patient is anxious and wants a definitive diagnosis immediately, but you suspect a complex autoimmune disorder that will require more tests.",
      options: [
        { text: "Order all necessary diagnostic tests at once, explaining the process to the patient and managing their expectations.", score: 125, outcome: "You take a systematic, evidence-based approach. By explaining the need for further tests, you build trust with the patient and avoid a premature, incorrect diagnosis. This is the gold standard for clinical practice." },
        { text: "Refer the patient to a specialist without further investigation.", score: 50, outcome: "While specialists are crucial, failing to conduct basic initial management and patient education shows a lack of primary care leadership and may delay necessary treatment." },
        { text: "Give a vague, speculative diagnosis to reassure the patient.", score: 0, outcome: "Speculating on a diagnosis without sufficient evidence is unethical and potentially harmful, undermining patient trust and potentially leading to malpractice." },
        { text: "Prescribe a broad-spectrum antibiotic to treat a possible infection while you wait for more information.", score: 25, outcome: "Prescribing antibiotics empirically for an undiagnosed non-infectious condition contributes to antibiotic resistance and is poor medical practice." }
      ]
    },
    {
      id: 2,
      scenario: "You are preparing a discharge plan for an elderly patient who had a successful surgery. The patient lives alone and admits to having difficulty managing their medications and making follow-up appointments in the past.",
      options: [
        { text: "Call a social worker immediately to arrange home care support and a visiting nurse before discharge.", score: 125, outcome: "Effective discharge planning requires a multidisciplinary approach focused on patient safety and continuity of care. Utilizing social work resources ensures a safe transition home." },
        { text: "Give the patient written instructions and assume they will manage.", score: 25, outcome: "This decision neglects the patient's stated risk factors (living alone, history of difficulty with compliance) and increases the risk of readmission." },
        { text: "Ask the family to manage the medications, even if they live far away.", score: 75, outcome: "While involving family is good, relying solely on distant family without professional home support is inadequate for high-risk patients." },
        { text: "Keep the patient hospitalized until they can prove they can manage their regimen perfectly.", score: 0, outcome: "Prolonged hospitalization for non-medical reasons is inefficient, expensive, and risks hospital-acquired complications. It is not an ethical use of resources." }
      ]
    },
    {
      id: 3,
      scenario: "You are the head of a small clinic and face budget constraints. You can afford either a new, state-of-the-art diagnostic machine (improving quality for a few complex cases) OR hire another nurse practitioner (improving access and speed for many routine cases).",
      options: [
        { text: "Hire the nurse practitioner to improve access and reduce wait times for the majority of patients.", score: 100, outcome: "Prioritizing access and basic care for the community often provides the greatest overall health benefit, aligning with principles of distributive justice." },
        { text: "Purchase the new diagnostic machine.", score: 50, outcome: "While quality is important, neglecting the needs of the majority for a small improvement in complex care is poor resource allocation, especially under budget constraints." },
        { text: "Start a lengthy fundraising campaign to try and get both.", score: 25, outcome: "While ambitious, this decision fails to address the immediate need of the community and demonstrates poor leadership in immediate resource management." },
        { text: "Cut back on non-clinical staff to afford both.", score: 0, outcome: "Cutting essential support staff (e.g., reception, billing) leads to administrative chaos, physician burnout, and a rapid decrease in overall clinic efficiency." }
      ]
    },
    {
      id: 4,
      scenario: "A patient refuses a life-saving blood transfusion due to religious beliefs, but is incapacitated after an accident. They carry a medical directive explicitly stating this refusal.",
      options: [
        { text: "Respect the patient’s advance directive and religious autonomy, even if it leads to death.", score: 125, outcome: "Upholding patient autonomy, even when decisions conflict with clinical recommendations, is a cornerstone of medical ethics and legal precedent." },
        { text: "Give the transfusion anyway, citing the principle of beneficence (acting in the patient's best interest).", score: 0, outcome: "Violating a clear, legally-binding advance directive is a severe breach of autonomy and can lead to legal action and a breakdown of trust between the medical profession and the public." },
        { text: "Call for an immediate ethics committee review while the patient's condition rapidly declines.", score: 50, outcome: "While appropriate for uncertain cases, in the face of an explicit directive and imminent danger, rapid decision-making is necessary. Delaying is often a decision in itself." },
        { text: "Ask the next of kin to override the advance directive.", score: 75, outcome: "Next of kin cannot legally override a clear, capacitated patient's expressed wishes in an advance directive." }
      ]
    },
    {
      id: 5,
      scenario: "You receive test results indicating a common but sensitive genetic marker in a patient. This marker has no immediate health implications for the patient but significantly increases the risk for a future, treatable condition.",
      options: [
        { text: "Disclose the finding immediately, explaining the lack of urgency but stressing the importance of future monitoring.", score: 100, outcome: "Full and transparent disclosure is key to informed consent and allows the patient to make lifestyle and future medical decisions based on complete data." },
        { text: "Do not mention the finding until the patient asks about genetic risk factors, to avoid causing unnecessary anxiety.", score: 25, outcome: "Withholding relevant medical information, even with good intentions, violates the patient's right to full information and autonomous decision-making." },
        { text: "Record the finding but only tell the patient's spouse, as it could affect family planning.", score: 0, outcome: "Sharing confidential genetic information with a third party without the patient's express permission is a grave violation of patient privacy (HIPAA/GDPR) and confidentiality." },
        { text: "Schedule the patient for immediate, expensive follow-up testing to confirm the non-urgent finding.", score: 50, outcome: "Over-testing based on a non-urgent finding is defensive medicine, wastes resources, and subjects the patient to unnecessary procedures." }
      ]
    },
    {
      id: 6,
      scenario: "You discover that a senior colleague, who is generally well-respected, is consistently making small, non-critical documentation errors due to signs of fatigue.",
      options: [
        { text: "Discreetly approach the colleague in private, express concern, and offer to help review charts or discuss workload management.", score: 125, outcome: "Professional integrity requires addressing risks, but doing so respectfully through direct, private communication supports a culture of safety and peer support." },
        { text: "Report the colleague immediately to the hospital board for incompetence.", score: 0, outcome: "Reporting immediately without seeking context or offering peer support is overly punitive and bypasses professional channels for handling colleague difficulties." },
        { text: "Ignore it, as the errors are non-critical and the colleague is senior.", score: 25, outcome: "Ignoring safety risks, no matter how small or who the person is, violates your professional duty to patient safety." },
        { text: "Discuss the colleague's errors with other junior staff to gather consensus before acting.", score: 50, outcome: "Discussing a colleague's performance with other staff violates confidentiality and creates an unprofessional work environment based on gossip." }
      ]
    },
    {
      id: 7,
      scenario: "A pharmaceutical representative offers you an expensive lunch and a gift card in exchange for taking 30 minutes to discuss their new drug.",
      options: [
        { text: "Politely decline the gift card and lunch, but agree to meet for 15 minutes to review the data package provided by the representative.", score: 100, outcome: "Ethical medical practice requires evaluating new treatments based on evidence, not incentives. Accepting the information while avoiding personal gain is the balanced approach." },
        { text: "Accept the meal and gift card, then listen to the pitch.", score: 0, outcome: "Accepting direct financial incentives creates a conflict of interest that biases clinical decision-making and is often against institutional policy." },
        { text: "Refuse the meeting entirely, ignoring all pharmaceutical data.", score: 50, outcome: "While cautious, refusing all information can lead to missing out on genuinely useful therapeutic advances, which is detrimental to patient care." },
        { text: "Ask the representative to leave a data sheet, but refuse all conversation and gifts.", score: 75, outcome: "A reasonable approach, but a quick conversation can often clarify complex data points more efficiently than reading a large packet." }
      ]
    },
    {
      id: 8,
      scenario: "During a public health crisis, you have limited doses of a vaccine. You are asked to develop a fair system for distribution.",
      options: [
        { text: "Prioritize distribution based on risk of exposure and severity of illness (e.g., frontline workers, elderly, and those with underlying conditions).", score: 125, outcome: "Ethical resource allocation during scarcity emphasizes utility (saving the most lives/years of life) and equity (protecting those most vulnerable)." },
        { text: "Distribute the vaccine randomly via a lottery system to ensure every citizen has an equal chance.", score: 50, outcome: "While equitable, random distribution ignores the utility principle and fails to protect the most vulnerable or those essential to maintaining public services." },
        { text: "Prioritize those who can pay the highest price, generating funds for more vaccines later.", score: 0, outcome: "This violates the principle of equity, turning life-saving medicine into a commodity based on wealth." },
        { text: "Give all doses to the most visible and influential members of the community first (e.g., politicians, celebrities).", score: 25, outcome: "This violates the principle of fairness and equity, favoring influence over medical need." }
      ]
    },
    {
      id: 9,
      scenario: "A patient tells you they are planning to harm another specific individual, and their threat appears credible and immediate.",
      options: [
        { text: "Immediately notify the intended victim and the police, breaching confidentiality under the duty to warn (Tarasoff rule).", score: 125, outcome: "The duty to warn overrides patient confidentiality when a credible threat of serious physical harm to an identifiable victim exists." },
        { text: "Try to talk the patient out of it, but maintain confidentiality, as required by ethics.", score: 0, outcome: "While de-escalation is good, maintaining confidentiality in this situation violates the highest duty to public safety." },
        { text: "Record the conversation in the chart and wait to see if the patient brings it up again.", score: 25, outcome: "This inaction exposes the intended victim to imminent danger and fails the duty to protect." },
        { text: "Only inform the patient's spouse, asking them to monitor the patient.", score: 50, outcome: "This inappropriately delegates the safety duty and does not fulfill the legal requirement to warn the victim and authorities." }
      ]
    },
    {
      id: 10,
      scenario: "You are asked to participate in a study using a new drug for a rare disease. The drug has promising initial results but significant potential side effects. The patient population is desperate.",
      options: [
        { text: "Ensure the consent form clearly and thoroughly explains both the potential benefits and all known, potential risks in plain language before enrolling any patient.", score: 125, outcome: "Informed consent must be truly informed, especially in high-risk trials involving vulnerable populations. Complete transparency is mandatory." },
        { text: "Focus primarily on the benefits of the drug during the consent process, as the population is desperate and needs hope.", score: 0, outcome: "Minimizing risks to encourage enrollment violates the ethical principle of informed consent and exploits patient vulnerability." },
        { text: "Only tell the patients the risks if they specifically ask about side effects.", score: 25, outcome: "Risks must be volunteered and explained clearly, not hidden until prompted by the patient." },
        { text: "Ask the trial sponsor to handle the consent process so you are not liable for explaining the risks.", score: 50, outcome: "The principal investigator (you) maintains the primary responsibility for ensuring the ethical conduct of the trial, including the quality of the consent process." }
      ]
    }
  ]
};

const MAX_SCORE = MEDICAL_EXAM_DATA.situations.reduce((sum, s) => sum + Math.max(...s.options.map(o => o.score)), 0);

const MedicalExamSimulatorPage = ({ course }) => {
  const [examState, setExamState] = useState('progress');
  const [currentSituationIndex, setCurrentSituationIndex] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [email, setEmail] = useState("");
  const [subscriptionMessage, setSubscriptionMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const currentOptions = MEDICAL_EXAM_DATA.situations[currentSituationIndex].options;
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
    if (currentSituationIndex < MEDICAL_EXAM_DATA.situations.length - 1) {
      setCurrentSituationIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
    } else {
      setExamState('results');
    }
  };

  const getFeedback = (score) => {
    const percentage = (score / MAX_SCORE) * 100;
    if (percentage >= 90) return { title: "Master Clinician", description: "Your judgment reflects a strong commitment to ethical practice, patient autonomy, and evidence-based care. You consistently made the highest-scoring decisions." };
    if (percentage >= 70) return { title: "Skilled Professional", description: "You possess a solid understanding of complex medical and ethical situations, prioritizing patient well-being and resource management in most scenarios." };
    if (percentage >= 50) return { title: "Developing Practitioner", description: "Your fundamentals are sound, but some decisions showed missed opportunities for optimal patient safety or ethical transparency. Focus on systemic thinking." };
    return { title: "Needs Review", description: "Many of your decisions resulted in low scores, indicating significant areas for review regarding patient care protocols, legal duties, and ethical frameworks." };
  };

  const handleSubscription = () => {
    if (!email || !email.includes('@')) {
      setSubscriptionMessage({ text: "Please enter a valid email address.", type: "yellow" });
      return;
    }
    setSubscriptionMessage({ text: "Success! Check your inbox to confirm your subscription and receive your detailed report.", type: "green" });
    setIsSubmitting(true);
  };

  if (examState === 'results') {
    const feedback = getFeedback(finalScore);
    const percentage = Math.round((finalScore / MAX_SCORE) * 100);
    const shareText = `I scored ${percentage}% on the ${MEDICAL_EXAM_DATA.courseName} Simulator! Test your professional judgment here.`;

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

  const currentSituation = MEDICAL_EXAM_DATA.situations[currentSituationIndex];
  const maxScoreOption = currentSituation.options.reduce((max, opt) => opt.score > max.score ? opt : max, { score: -Infinity });

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-center">
          {MEDICAL_EXAM_DATA.icon} {MEDICAL_EXAM_DATA.courseName} Simulator
        </h1>
        <p className="text-lg text-gray-600 mb-10 text-center">
          Test your diagnostic skills, ethical judgment, and patient care.
        </p>
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-200">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-blue-700">
              Situation {currentSituationIndex + 1}/{MEDICAL_EXAM_DATA.situations.length}
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
                {currentSituationIndex === MEDICAL_EXAM_DATA.situations.length - 1 ? 'See Final Results' : 'Next Situation'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalExamSimulatorPage;