// src/pages/PilotExamSimulator.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PilotExamSimulator = () => {
  const [currentSituationIndex, setCurrentSituationIndex] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [showOutcome, setShowOutcome] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState('');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const situations = [
    {
      id: 1,
      scenario: "During the takeoff roll at V1 (decision speed), you experience a loud bang and severe yaw to the left, indicating an **engine failure**.",
      options: [
        { text: "Continue the takeoff, maintaining directional control, and execute the 'Engine Failure Above V1' checklist immediately after becoming airborne.", score: 125, outcome: "At or above V1, the safest course is always to continue the takeoff. Stopping will result in an uncontained runway excursion due to insufficient remaining runway length. Speed is life." },
        { text: "Reject the takeoff immediately by closing thrust levers and applying maximum braking.", score: 0, outcome: "Rejecting above V1 is highly dangerous and may lead to a runway overrun, risking aircraft damage and passenger injury." },
        { text: "Feather the failed engine before rotation to reduce drag.", score: 50, outcome: "Feathering is done after positive climb rate is established and is part of the post-takeoff checklist, not during the roll or initial climb." },
        { text: "Ask Air Traffic Control (ATC) if the runway is long enough to stop.", score: 25, outcome: "You must act instantly based on speed. Waiting for ATC wastes critical seconds and risks disaster." }
      ]
    },
    {
      id: 2,
      scenario: "Cruising at FL350, you receive a 'Cabin Altitude' warning, indicating a rapid loss of pressure. Passengers are likely experiencing hypoxia.",
      options: [
        { text: "Immediately don oxygen masks, execute the 'Emergency Descent' checklist, and descend rapidly to 10,000 feet or minimum safe altitude.", score: 125, outcome: "The primary response to depressurization is donning oxygen, followed by an immediate emergency descent to an altitude where passengers and crew can breathe without supplemental oxygen (usually 10,000 feet)." },
        { text: "Attempt to fix the pressurization system while maintaining cruise altitude.", score: 25, outcome: "Attempting complex troubleshooting while hypoxia is setting in wastes time. Descent is the priority." },
        { text: "Notify the flight attendants to start distributing portable oxygen bottles.", score: 75, outcome: "While necessary, this comes *after* securing the flight deck and initiating the descent, as supplemental oxygen only buys limited time." },
        { text: "Immediately broadcast a 'Mayday' to ATC without initiating descent.", score: 50, outcome: "Communicating the emergency is important, but flying the aircraft and descending to a safe altitude takes precedence." }
      ]
    },
    {
      id: 3,
      scenario: "You are on final approach in heavy rain. The RVR (Runway Visual Range) drops below minimums, and you are currently at 300 feet AGL (Above Ground Level).",
      options: [
        { text: "Execute an immediate missed approach/go-around according to standard operating procedures (SOPs).", score: 125, outcome: "If visual references are not established and the RVR is below minimums at the Decision Height (DH) or Minimum Descent Altitude (MDA), a go-around must be executed to maintain safety margins." },
        { text: "Continue the approach, hoping to see the lights before the threshold.", score: 0, outcome: "Continuing an approach below minimums is a violation of regulations and severely risks a controlled flight into terrain (CFIT)." },
        { text: "Ask ATC for the latest RVR update and continue if it hasn't changed.", score: 50, outcome: "The decision must be made at or near DH/MDA. Any RVR below minimums requires a go-around." },
        { text: "Switch to autopilot and let the aircraft complete the automatic landing sequence.", score: 75, outcome: "While autoland is designed for low visibility, the pilot must still decide whether to proceed based on established RVR minimums and company policy, making the Go-Around the safer immediate default." }
      ]
    },
    {
      id: 4,
      scenario: "During pushback, the ground crew reports a fuel leak on the left wing. You have a departure slot in 15 minutes.",
      options: [
        { text: "Stop pushback immediately, inform the ground crew to deploy fire suppression, and contact maintenance to assess the leak severity.", score: 125, outcome: "A fuel leak is an immediate fire hazard. Safety is paramount; the aircraft must be immediately secured and assessed before any further movement or preparation." },
        { text: "Complete the pushback, then shut down the engine and call maintenance to assess the issue.", score: 25, outcome: "Moving the aircraft while fuel is leaking is highly dangerous due to potential ignition sources (hot brakes, sparks)." },
        { text: "Inform ATC that you will be delayed and ask the cabin crew to monitor the leak visually.", score: 50, outcome: "This is a maintenance and fire safety issue, not an operational delay. Cabin crew are not trained for this assessment." },
        { text: "Engine start the good engine and taxi to the maintenance area for assessment.", score: 0, outcome: "Starting an engine near a fuel leak risks a catastrophic fire." }
      ]
    },
    {
      id: 5,
      scenario: "You have a sick passenger requiring immediate medical attention. The nearest large airport is 30 minutes away, but a smaller airfield is 10 minutes away, though it has marginal crosswind limits.",
      options: [
        { text: "Divert to the nearest suitable airport (the smaller airfield) to minimize time to care, provided the conditions are within the aircraft's and crew’s absolute limits.", score: 125, outcome: "In a medical emergency, minimizing time to ground contact and medical help is the primary objective. The risk of the shorter flight is acceptable if within limits (Pilot-in-Command discretion)." },
        { text: "Continue to the large airport 30 minutes away, ensuring a familiar ILS approach.", score: 50, outcome: "Delaying medical help by 20 minutes is too risky for the passenger's health." },
        { text: "Ask the flight attendants to manage the passenger until you reach your original destination.", score: 0, outcome: "Delaying medical diversion for a critical patient is negligent." },
        { text: "Descend to a lower altitude to see if that helps the passenger’s condition, then reassess.", score: 75, outcome: "While a temporary fix for some conditions, it does not replace the need for an immediate medical diversion." }
      ]
    },
    {
      id: 6,
      scenario: "During a long-haul flight, the First Officer (FO) appears fatigued and makes two non-critical but noticeable procedural errors in a short period.",
      options: [
        { text: "Acknowledge the errors non-confrontationally, increase monitoring duties, and discreetly manage the remainder of the leg with extra vigilance and clear communication.", score: 125, outcome: "Crew Resource Management (CRM) dictates recognizing fatigue risk. The Captain must take full command, increase safety margins, and manage the FO's workload to ensure safety without causing undue stress." },
        { text: "Immediately tell the FO they are off duty and perform all duties yourself for the rest of the flight.", score: 50, outcome: "This creates more fatigue risk for the Captain and may worsen the relationship, violating CRM principles." },
        { text: "Ignore the errors, hoping the FO will self-correct after a short rest break.", score: 0, outcome: "Ignoring crew fatigue and errors is a serious flight safety breach." },
        { text: "File an immediate report with the company detailing the FO's poor performance.", score: 75, outcome: "A report is necessary, but the safety of the current flight takes priority over administrative tasks." }
      ]
    },
    {
      id: 7,
      scenario: "You receive a bomb threat via a cryptic message relayed by ATC. The authenticity is unknown.",
      options: [
        { text: "Execute the 'Bomb Threat' checklist: notify ATC of the emergency, follow guidance to a remote location, and maintain flight deck security while conducting searches as directed by company procedures.", score: 125, outcome: "Any threat must be treated as genuine. Following the checklist ensures all crew members are coordinated, and the aircraft is secured and isolated if necessary." },
        { text: "Immediately land at the nearest airport without communicating the nature of the threat to avoid panic.", score: 50, outcome: "Landing without communication prevents ground support and security from preparing, putting the passengers and airport at risk." },
        { text: "Tell the cabin crew to discreetly announce a 'technical issue' and start searching luggage.", score: 75, outcome: "While searching is part of the procedure, the initial steps involve securing the flight deck and coordinating with ground command centers." },
        { text: "Dismiss the threat as a likely hoax to avoid scaring the passengers.", score: 0, outcome: "Failing to act on a security threat is a catastrophic professional failure." }
      ]
    },
    {
      id: 8,
      scenario: "You are preparing for an approach. The air conditioning/pressurization system has failed, making the flight deck extremely hot and impairing concentration.",
      options: [
        { text: "Implement the required procedures to manage aircraft temperature, request holding or a prolonged vectors to buy time, and prioritize the landing checklist above all else.", score: 125, outcome: "The crew must prioritize tasks to maintain flight safety. If conditions impair concentration, requesting operational delay (holding) is prudent for managing cockpit workload." },
        { text: "Declare an emergency and execute an immediate straight-in landing.", score: 75, outcome: "While an emergency declaration is warranted for incapacitation risk, an immediate straight-in might not allow time for crucial landing checklists." },
        { text: "Continue the approach as planned, trying to ignore the discomfort.", score: 0, outcome: "Environmental stress impairs cognitive function and decision-making, increasing the risk of pilot error." },
        { text: "Hand over controls to the First Officer and take a break until the approach brief.", score: 50, outcome: "Switching control during a critical phase like approach preparation is contrary to good CRM practices." }
      ]
    },
    {
      id: 9,
      scenario: "You receive a red warning light indicating a potential **cargo fire**. The fire suppression is activated but the light remains on.",
      options: [
        { text: "Execute the emergency descent and prepare for an immediate landing at the nearest suitable airport, regardless of distance or convenience.", score: 125, outcome: "A cargo fire that cannot be suppressed is one of the most critical emergencies. Time is the enemy. Getting the aircraft on the ground immediately is the only way to save the plane." },
        { text: "Activate the second fire bottle and wait 30 minutes to see if the fire light extinguishes.", score: 50, outcome: "Delaying diversion allows the fire to grow and potentially compromise the airframe. Immediate landing preparation is non-negotiable." },
        { text: "Request a higher altitude to reduce the oxygen supply to the fire compartment.", score: 25, outcome: "Fire suppression is key, but climbing takes time and may move the aircraft further from a diversion airport." },
        { text: "Announce to passengers that there is a minor fire in the luggage compartment and they should remain calm.", score: 0, outcome: "Announcing specifics of a serious emergency to passengers can cause panic without offering a solution." }
      ]
    },
    {
      id: 10,
      scenario: "ATC clears you for a visual approach, but the First Officer insists they are not stabilized on the glide path and must go around.",
      options: [
        { text: "Respect the First Officer's call. Announce 'Go-Around, Flaps 20, Max Thrust' and immediately execute the missed approach procedure.", score: 125, outcome: "The **Pilot Flying's call** (or any crew member's call) to Go-Around must be honored immediately under Crew Resource Management (CRM). It is an unassailable decision to enhance safety." },
        { text: "Tell the First Officer to relax and try to correct the glide path deviation, continuing the approach.", score: 0, outcome: "Ignoring a crew member's safety call is a severe breach of CRM and compromises safety." },
        { text: "Ask ATC for an instrument approach instead of a visual one to confirm the glide path.", score: 50, outcome: "This delays the required action. The decision to go around is immediate." },
        { text: "Take control of the aircraft and try to salvage the approach yourself.", score: 75, outcome: "While the Captain can take control, ignoring the FO's explicit 'Go-Around' call is poor judgment when a safety limit is perceived to be breached." }
      ]
    }
  ];

  const MAX_SCORE = situations.reduce((sum, s) => sum + Math.max(...s.options.map(o => o.score)), 0);

  useEffect(() => {
    const currentOptions = situations[currentSituationIndex].options;
    const shuffled = [...currentOptions].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
    setSelectedOption(null);
    setShowOutcome(false);
  }, [currentSituationIndex]);

  const handleDecision = (option) => {
    if (selectedOption) return;
    setSelectedOption(option);
    setFinalScore(prev => prev + option.score);
    setShowOutcome(true);
  };

  const handleNext = () => {
    if (currentSituationIndex < situations.length - 1) {
      setCurrentSituationIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const getFeedback = (score) => {
    const percentage = (score / MAX_SCORE) * 100;
    if (percentage >= 90) return { title: "Commander of the Skies", description: "Your judgment reflects the highest standards of aviation safety, emergency procedure adherence, and Crew Resource Management (CRM). You prioritize flying the aircraft first." };
    if (percentage >= 70) return { title: "Skilled First Officer", description: "You possess a solid understanding of critical emergency checklists and operational decision-making. Most decisions align with standard safety protocols." };
    if (percentage >= 50) return { title: "Developing Pilot", description: "Your fundamentals are sound, but some decisions showed missed opportunities for immediate emergency action or prioritizing aircraft control/CRM. Focus on immediate threat assessment." };
    return { title: "Needs Review", description: "Many of your decisions resulted in low scores, indicating significant areas for review regarding V1 decisions, pressurization emergencies, and fire/security protocols." };
  };

  const handleSubscription = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubscriptionMessage("Please enter a valid email address.");
      return;
    }

    // TODO: Replace with real ConvertKit integration via Firebase Functions
    setSubscriptionMessage("Success! Check your inbox for your detailed flight operations report.");
    setIsSubmitting(true);
  };

  if (showResults) {
    const feedback = getFeedback(finalScore);
    const percentage = Math.round((finalScore / MAX_SCORE) * 100);
    const shareText = `I scored ${percentage}% on the Pilot Professional Simulator! Test your aviation emergency skills here.`;
    const encodedShareText = encodeURIComponent(shareText);
    const shareUrl = encodeURIComponent(window.location.href);

    return (
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-200 text-center max-w-4xl mx-auto my-10">
        <h2 className="text-5xl font-extrabold text-indigo-600 mb-4">Results Complete!</h2>
        <p className="text-3xl font-bold text-gray-800 mb-6">Total Score: {finalScore} / {MAX_SCORE} ({percentage}%)</p>
        <div className="mx-auto max-w-2xl bg-indigo-50 p-6 rounded-xl">
          <h3 className="text-3xl font-extrabold text-gray-900 mb-2">{feedback.title}</h3>
          <p className="text-xl text-gray-700">{feedback.description}</p>
        </div>

        <h3 className="text-2xl font-bold text-gray-700 mb-4 border-t pt-6 mt-6">Unlock Your Detailed Performance Report</h3>
        <div className="mx-auto max-w-sm">
          <form onSubmit={handleSubscription}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email Address"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition duration-150 ease-in-out"
            >
              {isSubmitting ? "Sent!" : "Get Detailed Report"}
            </button>
          </form>
          {subscriptionMessage && (
            <p className={`mt-4 text-sm font-semibold ${
              subscriptionMessage.includes('Success') ? 'text-green-600' : 
              subscriptionMessage.includes('valid') ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {subscriptionMessage}
            </p>
          )}
        </div>

        <div className="mt-8 pt-6 border-t">
          <p className="text-lg text-gray-600 mb-4">Share your achievement:</p>
          <div className="flex justify-center space-x-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodedShareText}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-sky-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-sky-600 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.901 1.153h3.68l-8.046 9.273 9.423 12.872h-7.792l-5.698-7.788-6.075 7.788H1.2l8.349-9.596L.265 1.153H8.16l5.243 6.994L18.901 1.153zm-2.12 19.982h2.28L6.463 3.109H4.072l12.709 18.026z"/>
              </svg>
              <span>Share on X</span>
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodedShareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-blue-700 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-800 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.367-4-3.524-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.754 7 2.404v6.831z"/>
              </svg>
              <span>Share on LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  const currentSituation = situations[currentSituationIndex];

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-center">✈️ Pilot Professional Simulator</h1>
        <p className="text-lg text-gray-600 mb-10 text-center">
          Test your critical decision-making, emergency procedure knowledge, and Crew Resource Management (CRM).
        </p>

        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-200">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-blue-700">
              Situation {currentSituation.id}/{situations.length}
            </h2>
            <span className="text-xl font-semibold text-gray-800">Score: {finalScore}</span>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            {currentSituation.scenario}
          </p>

          <div className="space-y-4 mb-8">
            {shuffledOptions.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleDecision(option)}
                disabled={selectedOption !== null}
                className={`w-full text-left p-4 rounded-xl border shadow-sm transition duration-150 ease-in-out ${
                  selectedOption?.text === option.text
                    ? option.score >= 100
                      ? 'bg-green-500 text-white shadow-lg'
                      : option.score > 25
                      ? 'bg-yellow-500 text-gray-900 shadow-lg'
                      : 'bg-red-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>

          {showOutcome && (
            <div className="bg-gray-100 p-5 rounded-xl border-l-4 border-gray-500 shadow-inner mb-6">
              <h3 className="font-bold text-lg text-gray-700 mb-2">Outcome Rationale:</h3>
              <p className="text-gray-800">{selectedOption.outcome}</p>
            </div>
          )}

          {showOutcome && (
            <div className="text-center">
              <button
                onClick={handleNext}
                className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-700 transition duration-150 ease-in-out"
              >
                {currentSituationIndex === situations.length - 1 ? "See Final Results" : "Next Situation"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PilotExamSimulator;