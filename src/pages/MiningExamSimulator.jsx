import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Data (defined outside the component) ---
const COURSE = {
  name: "Mining Safety Professional",
  slug: "mining-simulator",
  icon: "⛏️"
};

const situations = [
    {
      id: 1,
      scenario: "During an inspection of an underground drift, you notice several <strong>small rock chips flaking</strong> off the roof (back) and hear faint, intermittent cracking noises after blasting.",
      options: [
        { text: "Immediately secure and bar the immediate area, mark it as hazardous, report the ground stability issue, and prohibit all entry until scaled and supported.", score: 125, outcome: "Ground control is paramount in underground mining. Signs of scaling or cracking indicate instability that requires immediate, firm exclusion and support." },
        { text: "Continue the inspection but try to avoid walking directly under the affected area.", score: 0, outcome: "Ignoring ground instability is one of the quickest ways to cause a fatality." },
        { text: "Tell the haul truck operator to speed up when passing through this section to minimize exposure time.", score: 25, outcome: "This is unsafe; the area must be secured before personnel or equipment can pass." },
        { text: "Install a temporary safety ribbon but assume it's just minor post-blast settling.", score: 75, outcome: "The action of reporting and prohibiting entry (barring) is more critical than the ribbon alone. Assume every instability is critical." }
      ]
    },
    {
      id: 2,
      scenario: "In an open-pit mine, a haul truck operator is attempting to back into a shovel loading spot but their spotter is currently on a bathroom break.",
      options: [
        { text: "Immediately halt the truck using hand signals and radio contact. Inform the operator that the maneuver must not proceed without a designated spotter in position.", score: 125, outcome: "Maneuvering heavy equipment without a spotter is a major violation, risking collision or driving over the pit wall. Work must stop immediately." },
        { text: "Take over as the spotter yourself since the operator seems confident.", score: 50, outcome: "While intervention is good, you may not be a designated or qualified spotter, and your primary duties may be elsewhere." },
        { text: "Wait until the shovel operator notices the issue and stops the truck.", score: 0, outcome: "Passing the risk to another worker is unacceptable; you must intervene directly." },
        { text: "Allow the operator to back up slowly using their mirrors, since it's a small movement.", score: 25, outcome: "Mirrors have blind spots, which is why a dedicated spotter is mandatory for heavy equipment backing." }
      ]
    },
    {
        id: 3,
        scenario: "You are the shift supervisor. The ventilation system in a deep section of the mine has just failed, and atmospheric monitoring shows a slow buildup of diesel particulate matter (DPM).",
        options: [
            { text: "Initiate the <strong>mine evacuation procedure</strong> for the affected level/section immediately. Ensure all personnel are accounted for at the nearest refuge station or surface.", score: 125, outcome: "Loss of primary ventilation leads to hazardous air quality (DPM, lack of oxygen, heat) quickly. Evacuation is the only way to ensure life safety until ventilation is restored." },
            { text: "Send a mechanic to the ventilation fan to fix it while the miners continue working.", score: 25, outcome: "Putting a mechanic into a deteriorating atmosphere and keeping workers exposed is unacceptable." },
            { text: "Order all mobile diesel equipment in the area to shut down and wait for a recovery team.", score: 75, outcome: "This is a good mitigating step, but it doesn't solve the existing air quality issue, making evacuation necessary." },
            { text: "Order all miners to wear their respirators and continue working until the shift ends.", score: 50, outcome: "Respirators offer limited protection, and the atmosphere will eventually become irrespirable or overheat." }
        ]
    },
    {
        id: 4,
        scenario: "An unexpected <strong>water inflow</strong> occurs in a tunnel, carrying a significant amount of sludge and debris, and the water level is rising rapidly.",
        options: [
            { text: "Activate the mine flooding alarm, notify all personnel upstream and downstream to evacuate immediately, and prioritize isolation of main power to prevent electrical hazards.", score: 125, outcome: "Rapid water inflow is an immediate life threat. Alarming, immediate evacuation, and electrical isolation are the critical, mandatory first steps." },
            { text: "Attempt to build a temporary sandbag dam to redirect the flow away from the main haulage way.", score: 50, outcome: "Building a dam is secondary to life safety; the flow rate is likely too high, and time is better spent evacuating." },
            { text: "Contact the engineering team to review geological maps to find the source of the water.", score: 25, outcome: "Analysis must wait. Personnel safety is the only focus when rapid flooding occurs." },
            { text: "Shut down all active pumps to prevent them from becoming overloaded and failing.", score: 0, outcome: "This is counterproductive; pumps should be running to mitigate the flow, provided the electrical risk is managed." }
        ]
    },
    {
        id: 5,
        scenario: "You observe an experienced blaster illegally <strong>re-entering the blast zone</strong> after the 30-minute waiting period has expired, but before the required all-clear gas test has been conducted.",
        options: [
            { text: "Immediately use the two-way radio to order the blaster out of the zone and contact the supervisor/safety lead to enforce disciplinary action for the procedural breach.", score: 125, outcome: "Re-entry before gas testing is a fatal risk due to NOx (nitrous oxide) fumes or unexpected delayed explosions (misfires). Immediate verbal withdrawal is mandatory." },
            { text: "Quietly go after the blaster to personally tell them to leave the area.", score: 50, outcome: "Entering the blast zone is dangerous, and it removes you from being able to coordinate the safety response." },
            { text: "Assume the blast was clean and allow the blaster to check the face quickly.", score: 0, outcome: "Never assume a blast is safe without a documented gas test and physical inspection." },
            { text: "Wait for the ventilation system to clear the air for another 15 minutes, then test the gas.", score: 75, outcome: "This doesn't address the immediate violation and the danger of the blaster being in an un-tested environment now." }
        ]
    },
    {
        id: 6,
        scenario: "A worker reports they were exposed to excessive <strong>silica dust</strong> while using a pneumatic drill because the dust suppression water line failed, and they did not stop the work.",
        options: [
            { text: "Immediately stop the work, provide medical attention and documentation for the exposed worker, and tag out the equipment until the dust suppression system is repaired and verified.", score: 125, outcome: "Silica exposure is a severe, long-term health risk. Immediate cessation of work, medical review, and equipment isolation are mandatory safety steps." },
            { text: "Tell the worker to wear a better dust mask next time and continue the job with a hose.", score: 25, outcome: "A standard dust mask is insufficient for heavy silica exposure, and the core issue (broken system) must be fixed." },
            { text: "Ignore the report since the exposure was brief, but check the water line next week.", score: 0, outcome: "Ignoring silica exposure and failed safety controls is negligent." },
            { text: "Document the incident but ask the worker to finish the current cut before stopping.", score: 50, outcome: "Asking a worker to continue exposure to a known lethal hazard is unacceptable." }
        ]
    },
    {
        id: 7,
        scenario: "A fire starts in a heavy machinery maintenance shop located near the main underground access ramp. Visibility is rapidly deteriorating.",
        options: [
            { text: "Sound the fire alarm (if not automatic), notify the control room, confirm all personnel in the vicinity evacuate following the designated escape routes, and use appropriate extinguishers on the source if safe to do so.", score: 125, outcome: "Life safety (evacuation) is the first priority, followed by containment (alarm/control room) and suppression (extinguisher) only if safe." },
            { text: "Run toward the fire with a large extinguisher to put it out before calling the control room.", score: 50, outcome: "Notification and evacuation are required before risking a personal suppression attempt in a potentially high-hazard fire area." },
            { text: "Shut off all power to the entire mine to prevent the fire from spreading electrically.", score: 75, outcome: "While power isolation is crucial, shutting off *all* power without control can stop ventilation fans and trap people. Isolation should be targeted to the affected zone first." },
            { text: "Block the tunnel with a vehicle to prevent smoke from traveling into the main mine air intake.", score: 25, outcome: "This is unsafe and ignores the immediate need for evacuation and suppression." }
        ]
    },
    {
        id: 8,
        scenario: "An open-pit slope monitor alarm sounds, indicating significant movement (instability) on a critical pit wall above the current working bench.",
        options: [
            { text: "Immediately use the radio to order all heavy equipment and personnel to evacuate the area below the pit wall to a pre-determined safe zone (runout zone).", score: 125, outcome: "Pit wall instability (a high wall failure) is a major threat. Immediate, radio-enforced evacuation of the entire runout zone is the only safe action." },
            { text: "Send a drone up to visually inspect the exact area of the movement to assess the severity.", score: 50, outcome: "Visual inspection takes too long. The alarm means action is mandatory now." },
            { text: "Assume the alarm is false and wait 15 minutes to see if the movement continues.", score: 0, outcome: "Ignoring a slope stability alarm is a catastrophic violation of safety protocol." },
            { text: "Only move the shovel and the truck closest to the wall, letting others continue working.", score: 75, outcome: "The whole runout zone must be evacuated, not just the closest equipment, as the failure can be massive." }
        ]
    },
    {
        id: 9,
        scenario: "A miner is visibly injured after a fall. They are in pain but conscious. You are 20 minutes from the surface medical station.",
        options: [
            { text: "Provide immediate primary first aid (e.g., control bleeding, stabilize the spine/neck), call the control room for medical team dispatch, and document the incident location precisely.", score: 125, outcome: "Immediate first aid (Life Over Limb) and summoning professional help are the required steps. Stabilization prevents secondary injuries during transport." },
            { text: "Load the injured miner into a utility vehicle immediately and drive them quickly to the surface clinic.", score: 50, outcome: "Moving an injured person without proper stabilization can worsen spinal or internal injuries. You must stabilize first." },
            { text: "Ask the miner to slowly walk to the nearest emergency phone for transport.", score: 25, outcome: "If injured from a fall, they must not move on their own." },
            { text: "Wait until the medical team arrives before doing anything to avoid liability for further injury.", score: 75, outcome: "You have a duty to provide immediate basic first aid to save life and prevent further harm." }
        ]
    },
    {
        id: 10,
        scenario: "You are the shift supervisor conducting a pre-shift safety meeting. A team member reports they feel they were <strong>pressured by management</strong> to bypass a required equipment inspection to meet a production target.",
        options: [
            { text: "Immediately halt all non-inspected work, guarantee the worker anonymity and protection from retaliation, and escalate the report to the highest safety authority for investigation and resolution.", score: 125, outcome: "Any breach of safety integrity due to production pressure must be immediately stopped, fully protected for the whistleblower, and formally escalated to ensure root cause analysis." },
            { text: "Tell the worker that their safety is paramount, but ask them to sign off the inspection today 'just this once' to avoid confrontation with management.", score: 0, outcome: "This enables unsafe behavior and puts the worker in an impossible position." },
            { text: "Tell the worker to perform the inspection now and not to mention the pressure again.", score: 50, outcome: "Performing the inspection now is good, but ignoring the safety culture issue (pressure) is a systemic failure." },
            { text: "Privately confront the manager who allegedly applied the pressure.", score: 75, outcome: "Confronting the manager is important, but stopping the unsafe work and guaranteeing the worker's protection must happen first." }
      ]
    }
];

const MAX_SCORE = situations.reduce((sum, s) => sum + Math.max(...s.options.map(o => o.score)), 0);

// --- Utility Functions (Pure) ---

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function getFeedback(score) {
    const percentage = (score / MAX_SCORE) * 100;
    
    if (percentage >= 90) {
      return { title: "Mine Safety Expert", description: "Your decisions are flawless, consistently prioritizing ground control, atmospheric safety, and immediate, decisive evacuation/intervention protocols. Excellent compliance focus." };
    } else if (percentage >= 70) {
      return { title: "Competent Mining Professional", description: "You have a strong grasp of major hazards, but sometimes hesitated on the absolute mandatory first step, especially regarding immediate work stoppage and evacuation." };
    } else if (percentage >= 50) {
      return { title: "Developing Safety Awareness", description: "Your responses show a developing understanding, but you often underestimated the immediate danger of ground movement, silica dust, or LOTO/Blasting rule breaches." };
    } else {
      return { title: "Fundamental Review Required", description: "Your safety awareness in the mining environment requires fundamental review, particularly in critical areas like ground control, ventilation failures, and fire response." };
    }
}

// --- React Component ---

function MiningExamSimulatorPage() {
  const [currentSituationIndex, setCurrentSituationIndex] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [view, setView] = useState('simulating'); // 'simulating' or 'results'
  const [selectedOption, setSelectedOption] = useState(null); // Stores the chosen option object
  
  // State for the email form
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState({ text: '', type: '' }); // type: 'success', 'error', 'info'

  const currentSituation = situations[currentSituationIndex];
  const maxScoreForCurrent = Math.max(...currentSituation.options.map(o => o.score));

  // useMemo shuffles options only when the situation changes, not on every re-render
  const shuffledOptions = useMemo(() => {
    return shuffleArray(currentSituation.options);
  }, [currentSituationIndex]); // Dependency array

  const handleDecision = (option) => {
    if (selectedOption) return; // Prevent multiple clicks
    
    setSelectedOption(option);
    setFinalScore(prevScore => prevScore + option.score);
  };

  const handleNext = () => {
    setSelectedOption(null); // Reset selection
    
    if (currentSituationIndex === situations.length - 1) {
      setView('results'); // Go to results view
    } else {
      setCurrentSituationIndex(prevIndex => prevIndex + 1); // Go to next situation
    }
  };

  const handleSubscription = async () => {
    if (!email || !email.includes('@')) {
      setSubscriptionMessage({ text: "Please enter a valid email address.", type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setSubscriptionMessage({ text: "Processing...", type: 'info' });

    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
        // Mock success
        setSubscriptionMessage({ text: "Success! Check your inbox for your detailed mining safety breakdown.", type: 'success' });
        setEmail(''); // Clear input on success
    } catch (error) {
        setSubscriptionMessage({ text: "Subscription failed. Please try again.", type: 'error' });
    } finally {
        setIsSubmitting(false);
    }
  };
  
  // --- Render Logic ---
  
  const renderSimulatorView = () => (
    <div className="simulator-card bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-200 transition-all duration-200 ease-in-out">
      
      {/* Situation & Score Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-blue-700">Situation {currentSituation.id}/{situations.length}</h2>
        <span className="text-xl font-semibold text-gray-800">Score: {finalScore}</span>
      </div>

      {/* Scenario Text (Renders HTML) */}
      <div className="mb-8">
        <p 
          className="text-gray-700 text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: currentSituation.scenario }}
        />
      </div>

      {/* Options Container */}
      <div className="space-y-4 mb-8">
        {shuffledOptions.map((option) => {
          
          const isSelected = selectedOption !== null;
          const isClicked = isSelected && selectedOption.text === option.text;
          const isCorrect = option.score === maxScoreForCurrent;
          
          // Base styles from the <style> tag
          let buttonClasses = "option-button w-full text-left p-4 rounded-xl border border-gray-300 shadow-sm transition duration-150 ease-in-out bg-gray-100 hover:bg-gray-200";

          if (isSelected) {
            if (isClicked) {
              if (option.score >= 100) buttonClasses = `${buttonClasses} bg-green-500 text-white shadow-lg`;
              else if (option.score > 25) buttonClasses = `${buttonClasses} bg-yellow-500 text-white shadow-lg`;
              else buttonClasses = `${buttonClasses} bg-red-500 text-white shadow-lg`;
            } else if (isCorrect) {
              buttonClasses = `${buttonClasses} bg-blue-200 border-blue-500 opacity-70`;
            } else {
              buttonClasses = `${buttonClasses} opacity-50`;
            }
          }

          return (
            <button
              key={option.text}
              className={buttonClasses}
              onClick={() => handleDecision(option)}
              disabled={isSelected}
            >
              {option.text}
            </button>
          );
        })}
      </div>
      
      {/* Outcome Section (Shows conditionally) */}
      {selectedOption && (
        <div className="bg-gray-100 p-5 rounded-xl border-l-4 border-gray-500 shadow-inner mb-6">
          <h3 className="font-bold text-lg text-gray-700 mb-2">Outcome Rationale:</h3>
          <p className="text-gray-800">{selectedOption.outcome}</p>
        </div>
      )}

      {/* Next Button (Shows conditionally) */}
      {selectedOption && (
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
  );

  const renderResultsView = () => {
    const feedback = getFeedback(finalScore);
    const percentage = Math.round((finalScore / MAX_SCORE) * 100);

    // Social sharing links
    const shareText = `I scored ${percentage}% on the ${COURSE.name} Simulator! Test your ground control and heavy equipment safety skills here.`;
    const encodedShareText = encodeURIComponent(shareText);
    const shareUrl = "https://aulice.ca" + "/mining-simulator/"; // Assuming this is the URL
    const twitterLink = `https://twitter.com/intent/tweet?text=${encodedShareText}&url=${encodeURIComponent(shareUrl)}`;
    const linkedinLink = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodedShareText}`;
    
    // Determine message color
    let messageColor = '';
    if (subscriptionMessage.type === 'success') messageColor = 'text-green-600';
    else if (subscriptionMessage.type === 'error') messageColor = 'text-red-600';
    else if (subscriptionMessage.type === 'info') messageColor = 'text-gray-600';

    return (
      <div className="simulator-card bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-200 text-center transition-all duration-200 ease-in-out">
          
          <div className="mb-8">
              <h2 className="text-5xl font-extrabold text-indigo-600 mb-4">Results Complete!</h2>
              <p className="text-3xl font-bold text-gray-800 mb-6">Total Score: {finalScore} / {MAX_SCORE} ({percentage}%)</p>
              <div className="mx-auto max-w-2xl bg-indigo-50 p-6 rounded-xl">
                <h3 className="text-3xl font-extrabold text-gray-900 mb-2">{feedback.title}</h3>
                <p className="text-xl text-gray-700">{feedback.description}</p>
              </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-700 mb-4 border-t pt-6 mt-6">Unlock Your Detailed Performance Report</h3>
          
          {/* Lead Magnet / Subscription Form */}
          <div className="mx-auto max-w-sm">
            {subscriptionMessage.type !== 'success' && (
              <>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address" 
                  className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={isSubmitting}
                />
                <button 
                  onClick={handleSubscription}
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Get Detailed Report"}
                </button>
              </>
            )}
            <p className={`mt-4 text-sm ${messageColor}`}>
              {subscriptionMessage.text}
            </p>
          </div>

          {/* Social Sharing */}
          <div className="mt-8 pt-6 border-t">
              <p className="text-lg text-gray-600 mb-4">Share your achievement:</p>
              <div className="flex justify-center space-x-4">
                  <a href={twitterLink} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-sky-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-sky-600 transition">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.046 9.273 9.423 12.872h-7.792l-5.698-7.788-6.075 7.788H1.2l8.349-9.596L.265 1.153H8.16l5.243 6.994L18.901 1.153zm-2.12 19.982h2.28L6.463 3.109H4.072l12.709 18.026z"/></svg>
                      <span>Share on X</span>
                  </a>
                  <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-blue-700 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-800 transition">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.367-4-3.524-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.754 7 2.404v6.831z"/></svg>
                      <span>Share on LinkedIn</span>
                  </a>
              </div>
          </div>

      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-center">
          {COURSE.icon} {COURSE.name} Simulator
        </h1>
        <p className="text-lg text-gray-600 mb-10 text-center">
          Test your critical knowledge of Ground Control, Atmospheric Hazards, and Heavy Equipment Safety.
        </p>

        {/* Conditional View */}
        {view === 'simulating' ? renderSimulatorView() : renderResultsView()}
      </div>
    </div>
  );
}

export default MiningExamSimulatorPage;