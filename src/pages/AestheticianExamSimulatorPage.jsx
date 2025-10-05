// src/components/AestheticianExamSimulatorPage.jsx
import React, { useState, useEffect } from 'react';

const AESTHETICIAN_EXAM_DATA = {
  courseName: "Aesthetician Professional",
  icon: "🧖‍♀️",
  situations: [
    {
      id: 1,
      scenario: "During consultation, a new client with severe, inflamed, pustular acne requests a deep facial with aggressive manual extractions.",
      options: [
        { text: "Refuse deep extractions, recommend an anti-inflammatory LED light treatment, a calming mask, and refer them to a dermatologist for internal care.", score: 125, outcome: "Deep extractions on pustules can spread bacteria, increase inflammation, and lead to permanent scarring. Referral and gentle, calming treatments are the professional standard." },
        { text: "Proceed with the extractions only after applying a strong desincrustation fluid to soften the skin.", score: 25, outcome: "Desincrustation helps, but the underlying issue is the inflammation and risk of permanent damage from manual pressure." },
        { text: "Perform a light microdermabrasion to prepare the skin for easier extractions.", score: 0, outcome: "Microdermabrasion over inflamed acne is a severe contraindication that can spread infection and cause trauma." },
        { text: "Tell the client to use a stronger over-the-counter exfoliant at home before rescheduling.", score: 50, outcome: "At-home exfoliation is insufficient; the client needs clinical, professional guidance and often medical intervention." }
      ]
    },
    {
      id: 2,
      scenario: "A client who recently started taking prescription oral isotretinoin (Accutane) requests a medium-depth glycolic acid chemical peel.",
      options: [
        { text: "Immediately refuse the service. Explain that the medication causes severe skin thinning, and a peel would result in severe burns, delayed healing, and likely scarring.", score: 125, outcome: "Oral retinoids (like Accutane) are an absolute contraindication for medium-depth chemical peels, waxing, and micro-needling. Wait 6-12 months post-cessation." },
        { text: "Apply a lower-concentration peel but monitor the client closely for reactions.", score: 0, outcome: "Any peel during isotretinoin use is extremely dangerous due to compromised healing." },
        { text: "Ask the client to sign a waiver stating they are aware of the risks and proceed with the service.", score: 50, outcome: "Liability waivers do not override ethical safety standards or absolute contraindications." },
        { text: "Perform a facial massage and skip the peel, but charge the client for the full service.", score: 75, outcome: "While skipping the peel is correct, maintaining ethical charging practices is also necessary; adjust the service performed." }
      ]
    },
    {
      id: 3,
      scenario: "During an extraction service, a metallic comedone extractor slips from your hand and falls onto the floor.",
      options: [
        { text: "Immediately stop the service, pick up the tool with a gloved hand, place it in the soiled/biohazard container, and retrieve a replacement from a sterile pouch or drawer.", score: 125, outcome: "Dropping a tool breaks the chain of asepsis. It must go through the full sterilization process (cleaning, disinfection, sterilization) before reuse." },
        { text: "Wipe the tool quickly with a disinfectant wipe and continue using it for the service.", score: 0, outcome: "A wipe is insufficient for a tool that has been on the floor. This risks cross-contamination." },
        { text: "Rinse the tool under running water and place it on a clean towel to dry.", score: 25, outcome: "Rinsing removes visible debris but does not sterilize the tool." },
        { text: "Spray the floor area with disinfectant to sanitize the location where the tool fell.", score: 50, outcome: "Sanitizing the floor is good, but the priority is managing the contaminated tool." }
      ]
    },
    {
      id: 4,
      scenario: "You have just completed a micro-needling treatment. The client asks if it's okay to go sunbathing at the beach this weekend.",
      options: [
        { text: "Strongly advise against *any* sun exposure for 7-10 days, emphasizing the extremely high risk of Post-Inflammatory Hyperpigmentation (PIH) and potential scarring.", score: 125, outcome: "Micro-needling intentionally compromises the skin barrier, leaving it highly vulnerable to UV damage, which causes PIH and prolongs healing." },
        { text: "Tell them it's fine as long as they apply a high-SPF sunscreen every hour.", score: 25, outcome: "While sunscreen is mandatory, even with it, direct sun exposure is too risky for compromised skin." },
        { text: "Suggest they stay in the shade until the redness subsides, then they can sit in the sun.", score: 75, outcome: "Getting out of the sun is the correct priority, but the warning should be stricter—no direct exposure." },
        { text: "Tell them to wear a large hat and apply a hydrating serum before going outside.", score: 50, outcome: "Protection is needed, but the answer must be a firm refusal of sunbathing." }
      ]
    },
    {
      id: 5,
      scenario: "A client requests a deep-tissue face massage but has an active cold sore (Herpes Simplex Virus - HSV-1) outbreak on their lip.",
      options: [
        { text: "Cancel the massage immediately and explain that working over or near an active HSV lesion is a serious contraindication that risks spreading the virus (autoinoculation) and requires rescheduling.", score: 125, outcome: "Active viral, fungal, or bacterial lesions (cold sores, warts, impetigo) are absolute contraindications for any procedure that involves touching or manipulating the skin." },
        { text: "Continue the massage, but use gloves and strictly avoid the area of the cold sore.", score: 50, outcome: "Even with gloves and avoidance, there is a high risk of spreading the virus to other areas of the face or the esthetician's hands/tools." },
        { text: "Apply a lot of antiseptic cream to the lesion and then proceed with the massage.", score: 25, outcome: "Antiseptic cream does not kill the virus or prevent spread from manipulation." },
        { text: "Suggest they wait until the sore is fully healed, but finish the service today using only masks and cleansers.", score: 75, outcome: "Finishing with low-touch elements is better than massage, but canceling entirely is the safest protocol." }
      ]
    },
    {
      id: 6,
      scenario: "During a back wax, you notice several areas of raised, visible, and purplish **varicose veins** on the client's lower back.",
      options: [
        { text: "Do not apply wax over the varicose veins. Inform the client that waxing trauma could rupture the delicate vessel walls and suggest an alternative method or avoidance for those areas.", score: 125, outcome: "Varicose veins are a contraindication for waxing due to the risk of bruising, hematoma, or vessel rupture from the trauma of the strip removal." },
        { text: "Apply the wax but pull the strips off very slowly and gently.", score: 50, outcome: "The trauma of removal, even gentle, is still too much risk for compromised veins." },
        { text: "Wax the area quickly and apply firm pressure immediately after removal to mitigate bruising.", score: 0, outcome: "Proceeding with the service in a contraindication zone is dangerous." },
        { text: "Suggest the client consult a doctor about their veins before they reschedule any future waxing.", score: 75, outcome: "This is a good referral, but the immediate action is refusing to wax the affected zone." }
      ]
    },
    {
      id: 7,
      scenario: "You are setting up for a high-level chemical peel ($25\\%$ TCA) on a new client who has not been patch tested for this concentration.",
      options: [
        { text: "Stop the setup. Inform the client that a mandatory patch test must be performed 24-48 hours in advance to check for sensitivity and allergic reaction, and reschedule the peel.", score: 125, outcome: "Any high-concentration or high-risk chemical product requires mandatory patch testing to prevent severe reactions, especially on a new client." },
        { text: "Proceed with the peel since the client stated they've had peels before at a different spa.", score: 0, outcome: "Their history with other products/concentrations is irrelevant to the reaction to *your* specific product." },
        { text: "Apply a small amount to the jawline right now, wait 5 minutes, and if there is no reaction, proceed with the full peel.", score: 75, outcome: "This is a patch test, but a true test requires 24-48 hours to fully rule out delayed hypersensitivity reactions." },
        { text: "Ask them to sign a special release form for non-tested procedures.", score: 50, outcome: "Waivers do not replace the mandatory safety step of testing." }
      ]
    },
    {
      id: 8,
      scenario: "A client reports extreme pain and the skin appears to be blotchy, red, and swollen within 2 minutes of applying a high-grade enzyme mask.",
      options: [
        { text: "Immediately remove the mask entirely using cool, damp compresses. Apply a calming, neutral product (like aloe or cool water) and monitor the client closely for signs of anaphylaxis or blistering.", score: 125, outcome: "Any adverse reaction requires immediate cessation of the product, soothing the area, and continued monitoring for life-threatening symptoms." },
        { text: "Apply a neutralizing solution on top of the mask and wait a few minutes for the pain to subside.", score: 50, outcome: "Applying a neutralizer is correct for a chemical peel, but for a mask/enzyme, immediate, complete physical removal is required first." },
        { text: "Tell the client that 'some stinging is normal' and let the mask remain for the full duration.", score: 0, outcome: "Extreme pain/swelling is *never* normal and indicates a severe adverse reaction." },
        { text: "Remove the mask and recommend they take an over-the-counter painkiller immediately.", score: 25, outcome: "Painkiller is secondary; the primary response is mitigation of the chemical damage." }
      ]
    },
    {
      id: 9,
      scenario: "You notice a bottle of concentrated disinfectant solution is running low. You refill it, but accidentally pour pure, undiluted concentrate directly into a utility jar used for soaking tools.",
      options: [
        { text: "Immediately empty the jar into an appropriate chemical disposal receptacle, rinse the jar thoroughly with water, and then correctly prepare a new, diluted solution as per the manufacturer's instructions.", score: 125, outcome: "Undiluted chemicals are dangerous, corrosive, and can damage tools. They must be safely disposed of and replaced with the correct, measured concentration." },
        { text: "Add the necessary amount of water to the jar to dilute the concentrate and bring it up to the correct level.", score: 75, outcome: "While this fixes the dilution, measuring the *exact* final concentration is impossible and leaves the solution risky for tools/skin." },
        { text: "Leave the jar as is, assuming a stronger solution will clean the tools better and faster.", score: 0, outcome: "Incorrectly concentrated disinfectants can be corrosive, dangerous, or less effective than the manufacturer's directions." },
        { text: "Pour half of the solution out, then add water to fill it up, assuming you achieved a safe dilution.", score: 25, outcome: "Imprecise dilution is a safety hazard for both the user and the tools." }
      ]
    },
    {
      id: 10,
      scenario: "A client who has oily/combination skin but is experiencing dehydration insists on buying a rich, heavy night cream designed for extremely dry, mature skin.",
      options: [
        { text: "Educate the client on the difference between dehydration and oiliness. Recommend a lightweight, hydrating serum or gel moisturizer instead, explaining that the rich cream will likely clog their pores.", score: 125, outcome: "Professional ethics requires recommending products appropriate to the client's current skin condition, prioritizing skin health over an expensive, inappropriate sale." },
        { text: "Sell them the heavy cream they asked for, as the customer is always right.", score: 0, outcome: "This compromises the client's skin health and professional reputation." },
        { text: "Sell them the heavy cream but warn them they must only use a pea-sized amount.", score: 50, outcome: "While rationing helps, the formulation is still fundamentally wrong for an oily/combination skin type." },
        { text: "Suggest they use the heavy cream on their body instead, and then recommend a separate face product.", score: 75, outcome: "This is a good compromise for the product, but the priority is still recommending the correct face care solution." }
      ]
    }
  ]
};

const MAX_SCORE = AESTHETICIAN_EXAM_DATA.situations.reduce((sum, s) => sum + Math.max(...s.options.map(o => o.score)), 0);

const AestheticianExamSimulatorPage = ({ course }) => {
  const [examState, setExamState] = useState('progress');
  const [currentSituationIndex, setCurrentSituationIndex] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [email, setEmail] = useState("");
  const [subscriptionMessage, setSubscriptionMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const currentOptions = AESTHETICIAN_EXAM_DATA.situations[currentSituationIndex].options;
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
    if (currentSituationIndex < AESTHETICIAN_EXAM_DATA.situations.length - 1) {
      setCurrentSituationIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
    } else {
      setExamState('results');
    }
  };

  const getFeedback = (score) => {
    const percentage = (score / MAX_SCORE) * 100;
    if (percentage >= 90) return { title: "Clinical Esthetics Master", description: "Your decisions demonstrate expert-level knowledge of contraindications, sterilization, and professional ethics. You prioritize client safety above all else." };
    if (percentage >= 70) return { title: "Competent Skincare Specialist", description: "You have a strong understanding of major skin conditions and treatment protocols, but some responses missed the absolute need for patch testing or correct product knowledge." };
    if (percentage >= 50) return { title: "Foundational Practitioner", description: "Your safety awareness is developing, but you need significant review on absolute contraindications (like isotretinoin) and cross-contamination protocols." };
    return { title: "Immediate Safety Review Required", description: "Your responses indicated a need for fundamental review of sanitation, chemical safety, and client contraindications before performing high-risk services." };
  };

  const handleSubscription = () => {
    if (!email || !email.includes('@')) {
      setSubscriptionMessage({ text: "Please enter a valid email address.", type: "yellow" });
      return;
    }
    setSubscriptionMessage({ text: "Success! Check your inbox for your detailed skincare protocol breakdown.", type: "green" });
    setIsSubmitting(true);
  };

  if (examState === 'results') {
    const feedback = getFeedback(finalScore);
    const percentage = Math.round((finalScore / MAX_SCORE) * 100);
    const shareText = `I scored ${percentage}% on the ${AESTHETICIAN_EXAM_DATA.courseName} Simulator! Test your contraindication and sanitation knowledge here.`;

    return (
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-200 text-center max-w-4xl mx-auto my-10">
        <h2 className="text-5xl font-extrabold text-indigo-600 mb-4">Results Complete!</h2>
        <p className="text-3xl font-bold text-gray-800 mb-6">Total Score: {finalScore} / {MAX_SCORE} ({percentage}%)</p>
        <div className="mx-auto max-w-2xl bg-indigo-50 p-6 rounded-xl">
          <h3 className="text-3xl font-extrabold text-gray-900 mb-2">{feedback.title}</h3>
          <p className="text-xl text-gray-700">{feedback.description}</p>
        </div>
        <h3 className="text-2xl font-bold text-gray-700 mb-4 border-t pt-6 mt-6">Unlock Your Detailed Protocol Guide</h3>
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

  const currentSituation = AESTHETICIAN_EXAM_DATA.situations[currentSituationIndex];
  const maxScoreOption = currentSituation.options.reduce((max, opt) => opt.score > max.score ? opt : max, { score: -Infinity });

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-center">
          {AESTHETICIAN_EXAM_DATA.icon} {AESTHETICIAN_EXAM_DATA.courseName} Simulator
        </h1>
        <p className="text-lg text-gray-600 mb-10 text-center">
          Test your critical decision-making in Sanitation, Contraindications, and Client Consultation.
        </p>
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-200">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-blue-700">
              Situation {currentSituationIndex + 1}/{AESTHETICIAN_EXAM_DATA.situations.length}
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
                {currentSituationIndex === AESTHETICIAN_EXAM_DATA.situations.length - 1 ? 'See Final Results' : 'Next Situation'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AestheticianExamSimulatorPage;