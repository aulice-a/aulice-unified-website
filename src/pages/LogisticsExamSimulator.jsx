// src/pages/LogisticsExamSimulatorPage.jsx
import React, { useState, useEffect } from 'react';

const LOGISTICS_EXAM_DATA = {
  courseName: "Logistics & Supply Chain",
  icon: "🚢",
  situations: [
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
      scenario: "You observe a **forklift driver operating with the load raised high** while traveling at maximum speed near a blind intersection in the warehouse.",
      options: [
        { text: "Immediately intervene (using horn/whistle/radio) to stop the operation, demand the driver lower the load, and report the driver for mandatory retraining and disciplinary action due to unsafe driving.", score: 125, outcome: "Operating a forklift with a raised load and high speed is an immediate tip-over and collision risk. Stopping the operation and mandating correction is the priority." },
        { text: "Wait until the driver finishes the current task, then remind them about the safety rules during their next break.", score: 0, outcome: "Ignoring an immediate critical safety breach risks catastrophic failure or injury." },
        { text: "Put up a 'Blind Intersection' sign at the corner to warn the driver next time.", score: 50, outcome: "Signage is secondary; the driver's operation is the core unsafe act that must be corrected." },
        { text: "Increase the lighting in the warehouse to improve the driver's visibility.", score: 75, outcome: "Improved lighting is a good environmental safety measure, but it does not address the procedural violation (high speed, raised load)." }
      ]
    },
    {
      id: 4,
      scenario: "A shipment crossing an international border is delayed because the commercial invoice declared an incorrect **Harmonized Tariff Schedule (HTS) code** for the goods.",
      options: [
        { text: "Contact the customs broker immediately to provide the correct 10-digit HTS code, along with a revised invoice, to facilitate clearance and avoid hefty fines or seizure.", score: 125, outcome: "HTS codes dictate duties and compliance. The full, correct code must be provided instantly to the broker to resolve the customs hold." },
        { text: "Assume the customs agent will look up the correct code and wait for the shipment to clear.", score: 0, outcome: "It is the shipper's responsibility to provide accurate documentation, and the shipment will remain on hold or be penalized." },
        { text: "Call the customer and ask them to pay an extra fee to expedite the customs review.", score: 25, outcome: "The delay is due to a shipper error, not a lack of payment." },
        { text: "Try to argue with the customs agent that the 6-digit code is 'close enough' for clearance.", score: 50, outcome: "Customs requires precision; arguing will only prolong the delay and potentially invite deeper inspection." }
      ]
    },
    {
      id: 5,
      scenario: "A batch of refrigerated pharmaceuticals ($2^\\circ\\text{C}$ to $8^\\circ\\text{C}$) arrives. The temperature logger shows the temperature spiked to $15^\\circ\\text{C}$ for 4 hours during transit.",
      options: [
        { text: "Immediately **quarantine** the entire batch upon arrival. Flag the shipment as compromised and prevent distribution until Quality Assurance (QA) verifies product integrity and degradation risk.", score: 125, outcome: "Temperature breaches require immediate quarantine. Distributing compromised pharmaceuticals creates a severe quality and public health risk." },
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
        { text: "Increase your standing order quantity by $10\\%$ to build safety stock, hoping to cover the delays.", score: 75, outcome: "Building safety stock helps *mitigate* the pain but does not *fix* the root problem of the unreliable supplier." },
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
        { text: "Implement a **Reverse Logistics Triage** protocol: route the returns to a dedicated center for inspection, testing, grading (A, B, C), and disposition (refurbish, salvage, or scrap) before re-entry.", score: 125, outcome: "Returned electronics must be fully tested and graded. Re-entering untested product into forward stock creates a high risk of shipping damaged goods to new customers." },
        { text: "Only put the returns back into stock if the box looks visually undamaged.", score: 0, outcome: "The external box condition reveals nothing about internal product functionality or component damage." },
        { text: "Sell the returned products immediately to a liquidator at a discounted price to save testing costs.", score: 75, outcome: "Good for immediate capital recovery, but often sells functional items too cheaply, losing potential profit from refurbishment." },
        { text: "Ask the team to wipe the outside of the electronics and put them back in stock immediately.", score: 25, outcome: "Sanitation is secondary to functional testing." }
      ]
    }
  ]
};

const MAX_SCORE = LOGISTICS_EXAM_DATA.situations.reduce(
  (sum, s) => sum + Math.max(...s.options.map(o => o.score)),
  0
);

const LogisticsExamSimulatorPage = ({ course }) => {
  const [examState, setExamState] = useState('progress');
  const [currentSituationIndex, setCurrentSituationIndex] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [email, setEmail] = useState("");
  const [subscriptionMessage, setSubscriptionMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const currentOptions = LOGISTICS_EXAM_DATA.situations[currentSituationIndex].options;
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
    if (currentSituationIndex < LOGISTICS_EXAM_DATA.situations.length - 1) {
      setCurrentSituationIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
    } else {
      setExamState('results');
    }
  };

  const getFeedback = (score) => {
    const percentage = (score / MAX_SCORE) * 100;
    if (percentage >= 90) return { title: "Supply Chain Excellence", description: "Your decisions optimize costs, ensure regulatory compliance (HTS, cold chain), and prioritize warehouse safety and efficiency. Masterful risk management." };
    if (percentage >= 70) return { title: "Competent Logistics Manager", description: "You have a solid awareness of supply chain threats, but some responses missed the absolute mandatory step in inventory control or the most cost-effective solution." };
    if (percentage >= 50) return { title: "Developing Operations Planner", description: "Your understanding of transportation and warehousing is foundational, but you need review on critical areas like customs compliance and immediate safety violation intervention." };
    return { title: "Operational Fundamentals Review Required", description: "Your responses indicated a need for fundamental review of inventory control, safety protocols, and effective crisis management strategies in transportation." };
  };

  const handleSubscription = () => {
    if (!email || !email.includes('@')) {
      setSubscriptionMessage({ text: "Please enter a valid email address.", type: "yellow" });
      return;
    }
    setSubscriptionMessage({ text: "Success! Check your inbox for your detailed supply chain strategy breakdown.", type: "green" });
    setIsSubmitting(true);
  };

  if (examState === 'results') {
    const feedback = getFeedback(finalScore);
    const percentage = Math.round((finalScore / MAX_SCORE) * 100);
    const shareText = `I scored ${percentage}% on the ${LOGISTICS_EXAM_DATA.courseName} Simulator! Test your inventory, customs, and safety knowledge here.`;

    return (
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-200 text-center max-w-4xl mx-auto my-10">
        <h2 className="text-5xl font-extrabold text-indigo-600 mb-4">Results Complete!</h2>
        <p className="text-3xl font-bold text-gray-800 mb-6">Total Score: {finalScore} / {MAX_SCORE} ({percentage}%)</p>
        <div className="mx-auto max-w-2xl bg-indigo-50 p-6 rounded-xl">
          <h3 className="text-xl font-bold">{feedback.title}</h3>
          <p className="mt-2 text-gray-700">{feedback.description}</p>
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Share Your Result</h4>
          <p className="text-gray-600 mb-4">{shareText}</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email for a detailed report"
            className="px-4 py-2 border border-gray-300 rounded-lg w-full max-w-md mb-3"
            disabled={isSubmitting}
          />
          <button
            onClick={handleSubscription}
            disabled={isSubmitting}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? "Sent!" : "Get Full Report"}
          </button>
          {subscriptionMessage.text && (
            <p className={`mt-2 text-${subscriptionMessage.type}-600 font-medium`}>
              {subscriptionMessage.text}
            </p>
          )}
        </div>
      </div>
    );
  }

  const currentSituation = LOGISTICS_EXAM_DATA.situations[currentSituationIndex];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{LOGISTICS_EXAM_DATA.courseName} Crisis Simulator</h1>
      <p className="text-gray-600 mb-6">Scenario {currentSituationIndex + 1} of {LOGISTICS_EXAM_DATA.situations.length}</p>
      <div className="bg-gray-50 p-6 rounded-xl mb-6">
        <p className="text-lg">{currentSituation.scenario}</p>
      </div>
      <div className="space-y-4">
        {shuffledOptions.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleDecision(option)}
            disabled={selectedOption !== null}
            className={`w-full text-left p-4 rounded-lg border transition ${
              selectedOption?.text === option.text
                ? option.score === 125
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            {option.text}
          </button>
        ))}
      </div>
      {selectedOption && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="font-medium text-blue-800">{selectedOption.outcome}</p>
          <button
            onClick={handleNext}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            {currentSituationIndex < LOGISTICS_EXAM_DATA.situations.length - 1 ? "Next Scenario" : "View Results"}
          </button>
        </div>
      )}
    </div>
  );
};

export default LogisticsExamSimulatorPage;