import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Data (defined outside the component) ---
const COURSE = {
  name: "Logistics & Supply Chain",
  slug: "logistics-simulator",
  icon: "🚢"
};

// Corrected the LaTeX-like string in situation 5
const situations = [
    {
      id: 1,
      scenario: "Your Warehouse Management System (WMS) shows 500 units of Product X, but a cycle count reveals only 450 units are physically present on the shelf (a 10% variance).",
      options: [
        { text: "Immediately stop picking of Product X, launch a root cause analysis, and audit transaction history (putaway, picking, adjustments) before correcting the WMS count.", score: 125, outcome: "Inventory accuracy is vital. Correcting the WMS without investigation only masks the process flaw causing the shrink. Root cause analysis is mandatory." },
        { text: "Update the WMS to 450 units and continue operations to avoid delaying orders.", score: 0, outcome: "This is a form of inventory negligence; the loss reason must be identified before correcting the book entry." },
        { text: "Assume the 50 missing units were picked but not scanned and focus the search on the shipping dock.", score: 75, outcome: "A reasonable assumption, but a full process audit is required to confirm the gap." },
        { text: "Perform a full physical inventory (PI) count of the entire warehouse immediately.", score: 50, outcome: "While thorough, a full PI is expensive and disruptive. Targeted cycle count investigation is the standard, efficient first step." }
      ]
    },
    {
      id: 2,
      scenario: "A major coastal port announces an immediate, indefinite labor strike, halting all container movement through your primary receiving hub.",
      options: [
        { text: "Activate the crisis contingency plan: immediately notify all impacted procurement/sales teams, divert incoming vessels to alternative ports, and arrange expensive expedited inland freight (drayage).", score: 125, outcome: "Crisis management requires immediate communication and proactive rerouting/re-sequencing to mitigate manufacturing delays or lost sales." },
        { text: "Wait 48 hours for the situation to resolve, assuming the government will intervene.", score: 0, outcome: "Supply chains cannot afford a 48-hour delay in a major crisis; proactive action is required immediately." },
        { text: "Air freight all remaining shipments from the origin country to your facility.", score: 50, outcome: "Air freight is extremely expensive and only viable for high-value/low-volume goods; a diversion is more cost-effective for containers." },
        { text: "Inform the sales team but tell them the components will be delayed by one month.", score: 25, outcome: "Communication is good, but offering a firm, long delay without taking mitigation steps is unacceptable." }
      ]
    },
    {
        id: 3,
        scenario: "You observe a <strong>forklift driver operating with the load raised high</strong> while traveling at maximum speed near a blind intersection in the warehouse.",
        options: [
            { text: "Immediately intervene (using horn/whistle/radio) to stop the operation, demand the driver lower the load, and report the driver for mandatory retraining and disciplinary action due to unsafe driving.", score: 125, outcome: "Operating a forklift with a raised load and high speed is an immediate tip-over and collision risk. Stopping the operation and mandating correction is the priority." },
            { text: "Wait until the driver finishes the current task, then remind them about the safety rules during their next break.", score: 0, outcome: "Ignoring an immediate critical safety breach risks catastrophic failure or injury." },
            { text: "Put up a 'Blind Intersection' sign at the corner to warn the driver next time.", score: 50, outcome: "Signage is secondary; the driver's operation is the core unsafe act that must be corrected." },
            { text: "Increase the lighting in the warehouse to improve the driver's visibility.", score: 75, outcome: "Improved lighting is a good environmental safety measure, but it does not address the procedural violation (high speed, raised load)." }
        ]
    },
    {
        id: 4,
        scenario: "A shipment crossing an international border is delayed because the commercial invoice declared an incorrect <strong>Harmonized Tariff Schedule (HTS) code</strong> for the goods.",
        options: [
            { text: "Contact the customs broker immediately to provide the correct 10-digit HTS code, along with a revised invoice, to facilitate clearance and avoid hefty fines or seizure.", score: 125, outcome: "HTS codes dictate duties and compliance. The full, correct code must be provided instantly to the broker to resolve the customs hold." },
            { text: "Assume the customs agent will look up the correct code and wait for the shipment to clear.", score: 0, outcome: "It is the shipper's responsibility to provide accurate documentation, and the shipment will remain on hold or be penalized." },
            { text: "Call the customer and ask them to pay an extra fee to expedite the customs review.", score: 25, outcome: "The delay is due to a shipper error, not a lack of payment." },
            { text: "Try to argue with the customs agent that the 6-digit code is 'close enough' for clearance.", score: 50, outcome: "Customs requires precision; arguing will only prolong the delay and potentially invite deeper inspection." }
        ]
    },
    {
        id: 5,
        scenario: "A batch of refrigerated pharmaceuticals (2°C to 8°C) arrives. The temperature logger shows the temperature spiked to 15°C for 4 hours during transit.",
        options: [
            { text: "Immediately <strong>quarantine</strong> the entire batch upon arrival. Flag the shipment as compromised and prevent distribution until Quality Assurance (QA) verifies product integrity and degradation risk.", score: 125, outcome: "Temperature breaches require immediate quarantine. Distributing compromised pharmaceuticals creates a severe quality and public health risk." },
            { text: "Place the products immediately into the cold room to rapidly cool them back down to temperature.", score: 50, outcome: "Cooling them is required, but the product is already compromised; QA must determine if the breach rendered them unusable." },
            { text: "Trust the supplier's manifest that the product is safe and allow it to be put away and sold.", score: 0, outcome: "Ignoring data logger evidence in cold chain logistics is a catastrophic quality violation." },
            { text: "Review the data logger but only flag the products that were sitting near the container door.", score: 75, outcome: "The entire container environment was compromised; the entire batch must be reviewed." }
        ]
    },
    {
        id: 6,
        scenario: "A key electronic component supplier consistently fails to meet their delivery schedule, causing your manufacturing line to lose an average of 3 production days per month.",
        options: [
            { text: "Schedule a formal meeting with the supplier's leadership, define a Corrective Action Plan (CAP) with measurable, contractually binding performance metrics, and simultaneously source a secondary supplier.", score: 125, outcome: "Chronic poor performance requires a formal, tracked resolution plan and the development of supply chain redundancy (a dual-source strategy)." },
            { text: "Increase your standing order quantity by $10\%$ to build safety stock, hoping to cover the delays.", score: 75, outcome: "Building safety stock helps *mitigate* the pain but does not *fix* the root problem of the unreliable supplier." },
            { text: "Switch suppliers immediately to the first alternative you can find, regardless of cost.", score: 50, outcome: "Immediate switching is risky; due diligence is needed, but the primary supplier must be held accountable first." },
            { text: "Accept the delays and inform manufacturing that this is the new normal.", score: 0, outcome: "Accepting chronic delays erodes efficiency and competitive advantage." }
        ]
    },
    {
        id: 7,
        scenario: "The outbound shipping department is wasting time and money due to excessive amounts of void fill (bubble wrap, plastic peanuts) in every box.",
        options: [
            { text: "Implement a 'right-sizing' strategy: use box sizes that match product dimensions and replace plastic void fill with paper-based protective dunnage for sustainability and efficiency.", score: 125, outcome: "Right-sizing reduces materials cost, dim weight, and labor time. Sustainable packaging also meets growing regulatory/customer demands." },
            { text: "Hire more packaging staff to work faster and ensure the void fill is packed more tightly.", score: 25, outcome: "Increasing labor to manage poor material choices is inefficient and expensive." },
            { text: "Switch from plastic bubble wrap to a cheaper form of plastic void fill (e.g., plastic peanuts).", score: 50, outcome: "This solves cost slightly but fails to address the volume, space, and sustainability issues." },
            { text: "Ask the team to use less void fill, even if the products shift inside the box.", score: 0, outcome: "Reducing dunnage at the expense of product protection increases damage rates." }
        ]
    },
    {
        id: 8,
        scenario: "You discover high-value inventory is being staged in an unsupervised dock area overnight with no camera coverage before morning loading.",
        options: [
            { text: "Immediately enforce a security protocol: move high-value staging to a locked, secured cage or under 24/7 CCTV surveillance, and implement a dual-person custody check (signature required) during handover.", score: 125, outcome: "Security is a top priority for high-value goods. Reducing opportunity (locking, cameras) and enforcing accountability (custody check) minimizes theft risk." },
            { text: "Install a motion-activated floodlight in the dock area to deter theft.", score: 75, outcome: "Good for deterrence, but it does not prevent a determined thief and lacks accountability." },
            { text: "Ask the security guard to walk the dock area every hour during the night shift.", score: 50, outcome: "Intermittent checks are inadequate for high-value items, as theft can occur quickly between rounds." },
            { text: "Change the door code for the dock area and inform only authorized employees.", score: 25, outcome: "This helps but fails to address the lack of visibility and physical security on the internal staging." }
        ]
    },
    {
        id: 9,
        scenario: "The average cost per shipment for your parcel deliveries (last mile) is rising due to driver idle time and inefficient routing in metropolitan areas.",
        options: [
            { text: "Invest in and implement dynamic route optimization software, integrate real-time traffic/geo-fencing data, and audit driver adherence to scheduled stops and idle time reduction goals.", score: 125, outcome: "Optimization software is the most effective tool to minimize mileage, fuel consumption, and labor hours in dense last-mile delivery operations." },
            { text: "Reduce the number of drivers and increase the delivery quotas for the remaining staff.", score: 0, outcome: "This will lead to burnout, missed delivery windows, and poor customer service." },
            { text: "Switch all delivery operations to a single, cheaper third-party courier without reviewing service level agreements.", score: 50, outcome: "Cost reduction is good, but without SLA review, quality of service often plummets." },
            { text: "Tell the drivers to park further away from the delivery point to ensure a better route adherence score.", score: 25, outcome: "This increases walking time and does not fix the underlying routing inefficiency." }
        ]
    },
    {
        id: 10,
        scenario: "You need to process 1,000 returned consumer electronics items. The current plan is to put them all back into regular stock.",
        options: [
            { text: "Implement a <strong>Reverse Logistics Triage</strong> protocol: route the returns to a dedicated center for inspection, testing, grading (A, B, C), and disposition (refurbish, salvage, or scrap) before re-entry.", score: 125, outcome: "Returned electronics must be fully tested and graded. Re-entering untested product into forward stock creates a high risk of shipping damaged goods to new customers." },
            { text: "Only put the returns back into stock if the box looks visually undamaged.", score: 0, outcome: "The external box condition reveals nothing about internal product functionality or component damage." },
            { text: "Sell the returned products immediately to a liquidator at a discounted price to save testing costs.", score: 75, outcome: "Good for immediate capital recovery, but often sells functional items too cheaply, losing potential profit from refurbishment." },
            { text: "Ask the team to wipe the outside of the electronics and put them back in stock immediately.", score: 25, outcome: "Sanitation is secondary to functional testing." }
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
      return { title: "Supply Chain Excellence", description: "Your decisions optimize costs, ensure regulatory compliance (HTS, cold chain), and prioritize warehouse safety and efficiency. Masterful risk management." };
    } else if (percentage >= 70) {
      return { title: "Competent Logistics Manager", description: "You have a solid awareness of supply chain threats, but some responses missed the absolute mandatory step in inventory control or the most cost-effective solution." };
    } else if (percentage >= 50) {
      return { title: "Developing Operations Planner", description: "Your understanding of transportation and warehousing is foundational, but you need review on critical areas like customs compliance and immediate safety violation intervention." };
    } else {
      return { title: "Operational Fundamentals Review Required", description: "Your responses indicated a need for fundamental review of inventory control, safety protocols, and effective crisis management strategies in transportation." };
    }
}

// --- React Component ---

function LogisticsExamSimulatorPage() {
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
        setSubscriptionMessage({ text: "Success! Check your inbox for your detailed supply chain strategy breakdown.", type: 'success' });
        setEmail(''); // Clear input on success
        // In a real app, you might hide the form here
    } catch (error) {
        setSubscriptionMessage({ text: "Subscription failed. Please try again.", type: 'error' });
    } finally {
        setIsSubmitting(false);
    }
  };
  
  // --- Render Logic ---
  
  const renderSimulatorView = () => (
    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-200 transition-all duration-200 ease-in-out">
      
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
          
          let buttonClasses = "option-button w-full text-left p-4 rounded-xl border border-gray-300 shadow-sm hover:shadow-md transition duration-150 ease-in-out bg-gray-100 hover:bg-gray-200";

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
          <p 
            className="text-gray-800"
            dangerouslySetInnerHTML={{ __html: selectedOption.outcome }}
          />
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
    const shareText = `I scored ${percentage}% on the ${COURSE.name} Simulator! Test your inventory, customs, and safety knowledge here.`;
    const encodedShareText = encodeURIComponent(shareText);
    const shareUrl = encodeURIComponent(window.location.href);
    const twitterLink = `https://twitter.com/intent/tweet?text=${encodedShareText}&url=${shareUrl}`;
    const linkedinLink = `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodedShareText}`;
    
    // Determine message color
    let messageColor = '';
    if (subscriptionMessage.type === 'success') messageColor = 'text-green-600';
    else if (subscriptionMessage.type === 'error') messageColor = 'text-red-600';
    else if (subscriptionMessage.type === 'info') messageColor = 'text-gray-600';

    return (
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-200 text-center transition-all duration-200 ease-in-out">
          
          <div className="mb-8">
              <h2 className="text-5xl font-extrabold text-indigo-600 mb-4">Results Complete!</h2>
              <p className="text-3xl font-bold text-gray-800 mb-6">Total Score: {finalScore} / {MAX_SCORE} ({percentage}%)</p>
              <div className="mx-auto max-w-2xl bg-indigo-50 p-6 rounded-xl">
                <h3 className="text-3xl font-extrabold text-gray-900 mb-2">{feedback.title}</h3>
                <p className="text-xl text-gray-700">{feedback.description}</p>
              </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-700 mb-4 border-t pt-6 mt-6">Unlock Your Detailed Strategy Breakdown</h3>
          
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
          Test your critical knowledge of Inventory Control, Customs Compliance, and Warehouse Safety.
        </p>

        {/* Conditional View */}
        {view === 'simulating' ? renderSimulatorView() : renderResultsView()}
      </div>
    </div>
  );
}

export default LogisticsExamSimulatorPage;