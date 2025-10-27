// src/components/OilGasExamSimulatorPage.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OIL_GAS_EXAM_DATA = {
  courseName: "Oil & Gas Operations",
  icon: "🛢️",
  situations: [
    {
      id: 1,
      scenario: "During drilling operations offshore, you notice a sudden, significant increase in drilling fluid return volume, followed by a slight drop in standpipe pressure. This indicates a potential **kick** (influx of formation fluid).",
      options: [
        { text: "Immediately shut in the well using the Blowout Preventer (BOP) stack and initiate the well control procedure (e.g., Drillers Method or Wait and Weight).", score: 125, outcome: "Immediate shut-in is the critical first response to contain an influx (kick) and prevent a blowout. Speed is essential to maintain control." },
        { text: "Increase the mud pump speed to push the influx back down the hole.", score: 0, outcome: "Increasing pump speed will only exacerbate the influx and increase the risk of a catastrophic blowout." },
        { text: "Call the well site supervisor to discuss the best approach before taking any action.", score: 50, outcome: "While supervision is required, the delay risks losing primary well control. Action must be immediate." },
        { text: "Reduce the drilling fluid weight (mud density) to decrease bottom hole pressure.", score: 25, outcome: "Reducing mud weight is the opposite of what's needed; you need to increase mud weight to control the high-pressure influx." }
      ]
    },
    {
      id: 2,
      scenario: "You are preparing a vessel for maintenance. A worker attempts to bypass the Lockout/Tagout (LOTO) procedure, claiming they are 'only touching one valve for a second.'",
      options: [
        { text: "Immediately stop the worker, enforce a complete shutdown and LOTO of the energy source, and report the safety violation to the supervisor for investigation.", score: 125, outcome: "LOTO is non-negotiable. Any violation creates an immediate, severe hazard of unexpected startup or energy release, requiring immediate cessation of work and reporting." },
        { text: "Allow the worker to quickly perform the task, but monitor them closely.", score: 0, outcome: "This validates the violation and exposes the worker and others to severe risk." },
        { text: "Install a temporary tag without a lock to cover the immediate work.", score: 25, outcome: "The lock is the essential physical barrier; a tag alone is insufficient and violates the procedure." },
        { text: "Ignore it since it is a minor procedural step and not a major mechanical issue.", score: 50, outcome: "LOTO is a major procedural requirement designed to prevent fatal incidents; it is never minor." }
      ]
    },
    {
      id: 3,
      scenario: "You detect the distinct smell of **Hydrogen Sulfide (H2S)** gas near a processing manifold. Your personal monitor has not yet alarmed.",
      options: [
        { text: "Initiate emergency procedures for H2S release: activate the local alarm, don your breathing apparatus (SCBA), and evacuate the area immediately following the wind direction.", score: 125, outcome: "H2S is lethal and acts quickly. Immediate donning of breathing apparatus and evacuation is the only acceptable response, regardless of initial monitor reading." },
        { text: "Assume the smell is from another source and wait for your monitor to reach the action level before responding.", score: 0, outcome: "H2S is often lethal before the high alarm threshold is reached, and the sense of smell is rapidly lost (olfactory fatigue)." },
        { text: "Proceed cautiously to inspect the manifold to confirm the source of the leak.", score: 50, outcome: "Entering a potentially high concentration area without SCBA risks immediate incapacitation and death." },
        { text: "Warn nearby colleagues verbally before attempting to find the nearest SCBA.", score: 75, outcome: "Warning colleagues is crucial, but personal protection (SCBA) is the first priority before attempting rescue or investigation." }
      ]
    },
    {
      id: 4,
      scenario: "During a shift handover, the outgoing operator states they are 'too tired' to complete the detailed process checks and simply signs the checklist as complete.",
      options: [
        { text: "Stop the handover, refuse to accept the incomplete sign-off, and insist the detailed checklist is performed by the outgoing or incoming team before taking responsibility.", score: 125, outcome: "Handover is a critical safety barrier. Accepting a fraudulent sign-off compromises process integrity and transfers unaccountable risk to the incoming team. Full compliance is mandatory." },
        { text: "Accept the sign-off but plan to re-do the checks yourself two hours into your shift.", score: 50, outcome: "Accepting the sign-off validates the procedural violation, and a two-hour delay leaves the process unverified during a critical transition." },
        { text: "Report the operator's fatigue and dishonesty to management after the shift is over.", score: 75, outcome: "The immediate danger is the unchecked equipment; the priority is resolving the procedural gap, then dealing with the operator's conduct." },
        { text: "Tell the operator to go home and worry about the checklist later.", score: 25, outcome: "While the operator should rest, the checklist must be completed before accepting control." }
      ]
    },
    {
      id: 5,
      scenario: "You are working on a pipe rack at height. A wrench slips from your hand and falls toward the process area 50 feet below, where other contractors are working.",
      options: [
        { text: "Immediately yell 'TOOL DOWN' or 'FALLING OBJECT' repeatedly to warn those below, and then report the incident to the supervisor and secure the area.", score: 125, outcome: "The immediate action must be to warn personnel below. A falling tool from that height is a potential fatality. Prevention and warning take priority over reporting." },
        { text: "Immediately fill out the 'Dropped Object' incident report and check the security of your lanyard.", score: 50, outcome: "Reporting is important, but the immediate safety of others below is the first concern." },
        { text: "Look over the edge to see where the wrench landed before doing anything else.", score: 0, outcome: "Yelling the warning must happen instantly; looking wastes critical time and may put your head into an unsafe position." },
        { text: "Assume the area below was clear since you didn't hear anyone scream.", score: 25, outcome: "A fatality can occur silently. Warning is mandatory regardless of perceived clearance." }
      ]
    },
    {
      id: 6,
      scenario: "A flare header is overpressuring due to an unexpected power outage that tripped several control valves. The pressure relief valve is about to lift.",
      options: [
        { text: "Initiate the emergency shutdown (ESD) sequence for the affected unit immediately to isolate the high-pressure source and manage the vessel inventory.", score: 125, outcome: "Isolation via ESD is the primary defense against overpressure/over-temperature, ensuring that no more inventory is added to the failing vessel or header." },
        { text: "Monitor the pressure gauge and wait for the relief valve to open to vent the pressure safely.", score: 75, outcome: "Waiting for the PRV is a passive response. Active intervention (ESD) to eliminate the source of the pressure is safer and preferred to prevent PRV chatter or failure." },
        { text: "Use the site PA system to tell all personnel in the unit to evacuate due to a potential explosion.", score: 50, outcome: "Unnecessary panic. Personnel should be informed of the emergency but focus should be on controlling the process, which eliminates the explosion risk." },
        { text: "Call the power company to ask when power will be restored.", score: 25, outcome: "Irrelevant to the immediate safety threat. Process control is the only priority." }
      ]
    },
    {
      id: 7,
      scenario: "You find a leak of crude oil near the base of an offshore platform leg. The oil is slowly dripping into the sea.",
      options: [
        { text: "Immediately secure the leak source if possible, deploy spill containment measures (booms/skimmers), report the release to the control room, and commence environmental cleanup protocol.", score: 125, outcome: "All spills require immediate source control, containment, and reporting to mitigate environmental damage and comply with regulations." },
        { text: "Ignore the leak since it is minor and will be diluted quickly by the ocean.", score: 0, outcome: "All oil spills, regardless of size, are mandatory reportable environmental incidents." },
        { text: "Take photos of the spill for documentation before attempting to secure the source.", score: 50, outcome: "Documentation is secondary to immediate containment and mitigation." },
        { text: "Use a water hose to wash the oil into the sea, dispersing it so it is less visible.", score: 25, outcome: "This constitutes using unapproved dispersants and is illegal in most jurisdictions." }
      ]
    },
    {
      id: 8,
      scenario: "A hot work (welding) Permit-to-Work (PTW) is required. The vessel being welded was purged with nitrogen yesterday, but the gas test today shows oxygen is slightly above the safe limit (21.5%).",
      options: [
        { text: "Stop the hot work immediately. Re-purge the vessel until the oxygen concentration is well within the acceptable safety limits (usually below 20.9%) and re-test, ensuring the area is isolated.", score: 125, outcome: "A high oxygen concentration significantly increases the risk of fire/explosion during welding. Work must stop, and conditions must be brought to specified safe limits." },
        { text: "Proceed with the hot work since the oxygen level is only 'slightly' above the limit.", score: 0, outcome: "Never compromise on gas testing limits; exceeding limits on oxygen or flammable gas is a critical violation." },
        { text: "Switch the planned hot work to cold work (e.g., grinding) to avoid the ignition risk.", score: 75, outcome: "While safer, grinding can still produce sparks or heat, and the vessel must still be confirmed inert before any work." },
        { text: "Ask the welder to move further away from the vessel to prevent ignition.", score: 25, outcome: "The hazard is inside the vessel/atmosphere; physical distance from the work area does not negate the explosion risk." }
      ]
    },
    {
      id: 9,
      scenario: "An incoming helicopter has reported severe turbulence and visibility issues. The helideck supervisor insists they land now to maintain schedule.",
      options: [
        { text: "Adhere strictly to minimum weather and visibility limits for landing. If below limits, instruct the pilot to hold or divert to an alternate site, overriding the supervisor's scheduling demand.", score: 125, outcome: "Safety overrides schedule. The helideck supervisor's job is to ensure minimum operating criteria are met; if they are not, the flight must be stopped or diverted." },
        { text: "Pressure the pilot to attempt the landing, citing the urgent need for supplies.", score: 0, outcome: "Pressuring flight crew to violate safety limits is a severe regulatory and ethical breach." },
        { text: "Ask the pilot to descend slowly and manually attempt the landing below the standard limits.", score: 50, outcome: "Manual landing under low visibility is high risk. Standard operating limits are established for safety." },
        { text: "Temporarily turn off some non-critical lights on the platform to improve the pilot's night vision.", score: 75, outcome: "Lighting is standardized. While well-intentioned, reducing mandatory lighting may confuse the pilot and does not resolve the turbulence/visibility issue." }
      ]
    },
    {
      id: 10,
      scenario: "A technician is performing work inside a large, empty storage tank (confined space) and appears to be showing signs of lethargy and confusion.",
      options: [
        { text: "The stand-by person (attendant) initiates the non-entry rescue procedure: activate the alarm, call for the emergency response team, and attempt rescue only via harness/retrieval system.", score: 125, outcome: "The attendant must never enter the confined space unless relieved and equipped. Immediate non-entry rescue is required to prevent the attendant from becoming a second victim." },
        { text: "The stand-by person immediately enters the tank to assist the technician, as time is critical.", score: 0, outcome: "Entering the tank without proper equipment or relief will lead to two casualties due to the same hazardous atmosphere." },
        { text: "Shine a bright light into the tank and tell the technician to 'snap out of it' and climb out.", score: 25, outcome: "The technician is likely suffering from an atmospheric issue and cannot simply 'snap out of it.'" },
        { text: "Wait 5 minutes to see if the symptoms subside before calling the emergency team.", score: 50, outcome: "Symptoms like lethargy and confusion in a confined space indicate a critical lack of oxygen or presence of toxic gas, requiring immediate action." }
      ]
    }
  ]
};

const MAX_SCORE = OIL_GAS_EXAM_DATA.situations.reduce((sum, s) => sum + Math.max(...s.options.map(o => o.score)), 0);

const OilGasExamSimulatorPage = ({ course }) => {
  const [examState, setExamState] = useState('progress');
  const [currentSituationIndex, setCurrentSituationIndex] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [email, setEmail] = useState("");
  const [subscriptionMessage, setSubscriptionMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const currentOptions = OIL_GAS_EXAM_DATA.situations[currentSituationIndex].options;
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
    if (currentSituationIndex < OIL_GAS_EXAM_DATA.situations.length - 1) {
      setCurrentSituationIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
    } else {
      setExamState('results');
    }
  };

  const getFeedback = (score) => {
    const percentage = (score / MAX_SCORE) * 100;
    if (percentage >= 90) return { title: "Process Safety Master", description: "Your decisions prioritize **Life Critical Safety Rules** (LCS) and emergency procedures, demonstrating expert-level adherence to well control, LOTO, and gas management." };
    if (percentage >= 70) return { title: "Competent Operations Lead", description: "You have a solid understanding of operational threats, but some responses missed the *immediate* mandatory safety action, particularly in procedural compliance." };
    if (percentage >= 50) return { title: "Safety Protocol Learner", description: "Your awareness of hazards is developing, but you often missed the critical, non-negotiable first step in high-risk scenarios like H2S release or LOTO violations." };
    return { title: "Fundamental Review Required", description: "Your responses indicated a need for fundamental review of the most critical threats in the industry, including well control, dropped objects, and atmospheric hazards." };
  };

  const handleSubscription = () => {
    if (!email || !email.includes('@')) {
      setSubscriptionMessage({ text: "Please enter a valid email address.", type: "yellow" });
      return;
    }
    setSubscriptionMessage({ text: "Success! Check your inbox for your detailed process safety breakdown.", type: "green" });
    setIsSubmitting(true);
  };

  if (examState === 'results') {
    const feedback = getFeedback(finalScore);
    const percentage = Math.round((finalScore / MAX_SCORE) * 100);
    const shareText = `I scored ${percentage}% on the ${OIL_GAS_EXAM_DATA.courseName} Operations Simulator! Test your well control and safety skills here.`;

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

  const currentSituation = OIL_GAS_EXAM_DATA.situations[currentSituationIndex];
  const maxScoreOption = currentSituation.options.reduce((max, opt) => opt.score > max.score ? opt : max, { score: -Infinity });

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-center">
          {OIL_GAS_EXAM_DATA.icon} {OIL_GAS_EXAM_DATA.courseName} Simulator
        </h1>
        <p className="text-lg text-gray-600 mb-10 text-center">
          Test your critical decision-making in Process Safety, Emergency Response, and Well Control.
        </p>
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-200">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-blue-700">
              Situation {currentSituationIndex + 1}/{OIL_GAS_EXAM_DATA.situations.length}
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
                {currentSituationIndex === OIL_GAS_EXAM_DATA.situations.length - 1 ? 'See Final Results' : 'Next Situation'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OilGasExamSimulatorPage;