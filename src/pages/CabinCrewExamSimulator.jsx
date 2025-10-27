// src/components/CabinCrewExamSimulatorPage.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CABIN_CREW_EXAM_DATA = {
  courseName: "Cabin Crew Professional",
  icon: "✈️",
  situations: [
    {
      id: 1,
      scenario: "During takeoff, a passenger refuses to fasten their seatbelt and becomes verbally aggressive when asked to comply.",
      options: [
        { text: "Calmly but firmly explain the legal and safety requirement, and if they continue to refuse, inform the captain immediately for potential return to gate or diversion.", score: 125, outcome: "Safety regulations are non-negotiable. Escalating to the captain is the correct protocol for non-compliant passengers during critical phases of flight." },
        { text: "Ask another passenger to intervene and persuade them to buckle up.", score: 25, outcome: "Delegating safety enforcement to passengers is unprofessional and ineffective." },
        { text: "Ignore the passenger to avoid conflict, assuming the flight is short.", score: 0, outcome: "Ignoring a safety violation during takeoff is a severe breach of duty and endangers all on board." },
        { text: "Offer them a free drink after takeoff if they comply now.", score: 50, outcome: "Bribing a passenger undermines authority and sets a poor precedent for safety compliance." }
      ]
    },
    {
      id: 2,
      scenario: "A passenger with severe nut allergies is seated next to someone eating a nut-based snack. The allergic passenger is showing early signs of a reaction.",
      options: [
        { text: "Immediately ask the snacking passenger to stop, seal the snack in a bag, clean the surrounding area, and provide the allergic passenger with water and medical assistance if needed.", score: 125, outcome: "Swift action to eliminate the allergen and monitor the affected passenger is critical to prevent anaphylaxis." },
        { text: "Offer the allergic passenger an antihistamine from the onboard medical kit.", score: 75, outcome: "While helpful, the priority is removing the allergen source first." },
        { text: "Tell the allergic passenger to move to an empty seat if available.", score: 50, outcome: "This may help, but doesn't address the airborne or surface contamination from the snack." },
        { text: "Assure them it's just a mild reaction and will pass.", score: 0, outcome: "Minimizing a potential life-threatening allergy is dangerously negligent." }
      ]
    },
    {
      id: 3,
      scenario: "During turbulence, a passenger unfastens their seatbelt to use the lavatory, despite repeated announcements to remain seated.",
      options: [
        { text: "Firmly instruct them to return to their seat immediately and not leave it again until the seatbelt sign is off, citing safety policy.", score: 125, outcome: "Enforcing seatbelt rules during turbulence is a core safety duty. Clear, direct instruction is required." },
        { text: "Allow them to use the lavatory quickly if they promise to be careful.", score: 25, outcome: "This compromises safety for convenience and sets a dangerous precedent." },
        { text: "Wait until turbulence ends, then remind them of the policy.", score: 50, outcome: "The risk occurs during turbulence; post-event reminders don't mitigate the immediate danger." },
        { text: "Ignore them, as they are an adult and can make their own decisions.", score: 0, outcome: "Cabin crew are responsible for passenger safety; passive acceptance is a failure of duty." }
      ]
    },
    {
      id: 4,
      scenario: "A passenger appears intoxicated and is making inappropriate comments to other passengers, causing discomfort.",
      options: [
        { text: "Approach the passenger discreetly, set clear boundaries on behavior, and if it continues, involve the captain and consider restraining measures per airline policy.", score: 125, outcome: "Professional intervention with escalation protocols protects all passengers and maintains cabin order." },
        { text: "Publicly shame the passenger to deter the behavior.", score: 0, outcome: "Public humiliation escalates conflict and violates passenger dignity." },
        { text: "Offer them more alcohol to calm them down.", score: 25, outcome: "Serving more alcohol to an intoxicated passenger is reckless and against policy." },
        { text: "Ask nearby passengers to move seats to avoid the situation.", score: 75, outcome: "While a temporary fix, it doesn't address the root behavior and may spread discomfort." }
      ]
    },
    {
      id: 5,
      scenario: "During a medical emergency, a passenger claims to be a doctor and offers to assist, but cannot provide immediate proof of credentials.",
      options: [
        { text: "Thank them, ask for their name and credentials to log in the incident report, and allow them to assist while you monitor and support.", score: 125, outcome: "Good Samaritan laws protect volunteers. Logging details is prudent, but refusing help could worsen the emergency." },
        { text: "Refuse their help until they show a medical license.", score: 50, outcome: "In a life-threatening situation, delaying care for verification could be harmful." },
        { text: "Allow them to take full control of the medical response.", score: 75, outcome: "Cabin crew must remain in charge of the cabin; medical volunteers assist, not lead." },
        { text: "Ignore their offer and only use the onboard medical kit yourself.", score: 25, outcome: "Rejecting qualified help in a serious emergency is poor judgment." }
      ]
    },
    {
      id: 6,
      scenario: "A passenger demands to speak to the pilot about a service issue during cruise flight.",
      options: [
        { text: "Politely explain that the captain is operating the aircraft and cannot be disturbed for non-safety issues, but you will relay their feedback after landing.", score: 125, outcome: "Protecting the flight deck from non-essential interruptions is critical for safety and operational focus." },
        { text: "Use the intercom to connect them directly to the cockpit.", score: 0, outcome: "This is a serious breach of aviation security and protocol." },
        { text: "Tell them the pilot doesn't care about passenger complaints.", score: 25, outcome: "This is unprofessional and escalates dissatisfaction." },
        { text: "Promise to have the pilot call them after landing.", score: 50, outcome: "Overpromising is better than breaching protocol, but honesty about feedback channels is best." }
      ]
    },
    {
      id: 7,
      scenario: "You notice a passenger taking photos of the cockpit door and crew during boarding.",
      options: [
        { text: "Politely ask them to stop, explaining that photography of secure areas is prohibited for security reasons.", score: 125, outcome: "Proactively addressing security concerns is a key responsibility of cabin crew." },
        { text: "Wait to see if they post the photos online, then report it.", score: 50, outcome: "Reactive security is less effective than immediate intervention." },
        { text: "Assume they're just a plane enthusiast and ignore it.", score: 25, outcome: "Security protocols must be enforced regardless of intent." },
        { text: "Confiscate their phone immediately.", score: 0, outcome: "Crew have no authority to seize passenger property; polite request is the correct first step." }
      ]
    },
    {
      id: 8,
      scenario: "During a long-haul flight, a passenger complains of severe leg pain and swelling, suggesting possible deep vein thrombosis (DVT).",
      options: [
        { text: "Encourage them to walk in the aisle (if safe), elevate the leg, hydrate, and monitor for worsening symptoms; alert medical professionals if landing soon.", score: 125, outcome: "This follows standard DVT first-response protocol to prevent clot progression." },
        { text: "Give them aspirin from the medical kit to thin the blood.", score: 75, outcome: "Aspirin may be appropriate, but only after assessment; movement and hydration are safer first steps." },
        { text: "Tell them it's normal after sitting for long periods.", score: 25, outcome: "Dismissing potential DVT risks a life-threatening pulmonary embolism." },
        { text: "Ask them to stay seated to avoid disturbing others.", score: 0, outcome: "Restricting movement in a suspected DVT case is dangerous and contraindicated." }
      ]
    },
    {
      id: 9,
      scenario: "A family with a crying infant is receiving hostile comments from other passengers. The parents appear stressed and overwhelmed.",
      options: [
        { text: "Offer support to the family (e.g., warm bottle, walking the baby), and politely remind other passengers that children are welcome on flights.", score: 125, outcome: "Empathetic service de-escalates tension and upholds inclusive cabin culture." },
        { text: "Ask the family to move to the back of the plane to minimize disturbance.", score: 50, outcome: "This may help, but implies the family is at fault for a normal situation." },
        { text: "Tell the complaining passengers to be more understanding.", score: 75, outcome: "Good intent, but proactive support for the family is more effective." },
        { text: "Ignore the situation to avoid taking sides.", score: 25, outcome: "Passive management allows cabin tension to escalate." }
      ]
    },
    {
      id: 10,
      scenario: "During an emergency evacuation drill, a passenger refuses to leave their carry-on luggage behind, slowing the process.",
      options: [
        { text: "Firmly command them to drop the bag and evacuate immediately, emphasizing that 'lives over luggage' is a non-negotiable safety rule.", score: 125, outcome: "In emergencies, enforcing evacuation speed is critical; hesitation costs lives." },
        { text: "Grab the bag and carry it for them to speed things up.", score: 75, outcome: "Well-intentioned, but handling passenger bags slows crew and risks injury." },
        { text: "Allow them to keep the bag if it's small.", score: 50, outcome: "Any delay or obstruction in an evacuation is unacceptable." },
        { text: "Shout at them to drop it or they'll be left behind.", score: 25, outcome: "Aggressive tone may cause panic; calm authority is more effective." }
      ]
    }
  ]
};

const MAX_SCORE = CABIN_CREW_EXAM_DATA.situations.reduce((sum, s) => sum + Math.max(...s.options.map(o => o.score)), 0);

const CabinCrewExamSimulatorPage = ({ course }) => {
  const [examState, setExamState] = useState('progress');
  const [currentSituationIndex, setCurrentSituationIndex] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [email, setEmail] = useState("");
  const [subscriptionMessage, setSubscriptionMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const currentOptions = CABIN_CREW_EXAM_DATA.situations[currentSituationIndex].options;
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
    if (currentSituationIndex < CABIN_CREW_EXAM_DATA.situations.length - 1) {
      setCurrentSituationIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
    } else {
      setExamState('results');
    }
  };

  const getFeedback = (score) => {
    const percentage = (score / MAX_SCORE) * 100;
    if (percentage >= 90) return { title: "Lead Cabin Attendant", description: "Your decisions reflect elite-level safety awareness, passenger empathy, and crisis management under pressure." };
    if (percentage >= 70) return { title: "Professional Crew Member", description: "You have strong situational judgment, though some responses could be more proactive in enforcing safety protocols." };
    if (percentage >= 50) return { title: "Developing Crew", description: "Your fundamentals are sound, but you need review on emergency response and assertive safety enforcement." };
    return { title: "Safety Protocol Review Required", description: "Your responses indicate significant gaps in aviation safety, passenger management, and emergency procedures." };
  };

  const handleSubscription = () => {
    if (!email || !email.includes('@')) {
      setSubscriptionMessage({ text: "Please enter a valid email address.", type: "yellow" });
      return;
    }
    setSubscriptionMessage({ text: "Success! Check your inbox for your detailed cabin crew protocol guide.", type: "green" });
    setIsSubmitting(true);
  };

  if (examState === 'results') {
    const feedback = getFeedback(finalScore);
    const percentage = Math.round((finalScore / MAX_SCORE) * 100);
    const shareText = `I scored ${percentage}% on the ${CABIN_CREW_EXAM_DATA.courseName} Simulator! Test your in-flight safety skills here.`;

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

  const currentSituation = CABIN_CREW_EXAM_DATA.situations[currentSituationIndex];
  const maxScoreOption = currentSituation.options.reduce((max, opt) => opt.score > max.score ? opt : max, { score: -Infinity });

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-center">
          {CABIN_CREW_EXAM_DATA.icon} {CABIN_CREW_EXAM_DATA.courseName} Simulator
        </h1>
        <p className="text-lg text-gray-600 mb-10 text-center">
          Test your critical decision-making in Passenger Safety, Emergency Response, and In-Flight Service.
        </p>
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-200">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-blue-700">
              Situation {currentSituationIndex + 1}/{CABIN_CREW_EXAM_DATA.situations.length}
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
                {currentSituationIndex === CABIN_CREW_EXAM_DATA.situations.length - 1 ? 'See Final Results' : 'Next Situation'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CabinCrewExamSimulatorPage;