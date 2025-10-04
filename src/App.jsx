// src/App.jsx
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { setLogLevel } from 'firebase/firestore';

setLogLevel('Debug');

// --- RAL Color Approximations ---
const COLOR_MAP = {
  banking: { bg: 'bg-[#21436E]', text: 'text-white', iconBg: 'bg-[#21436E]', accent: 'text-indigo-300' },
  logistics: { bg: 'bg-gray-700', text: 'text-white', iconBg: 'bg-gray-700', accent: 'text-gray-300' },
  mining: { bg: 'bg-green-800', text: 'text-white', iconBg: 'bg-green-800', accent: 'text-green-300' },
  medical: { bg: 'bg-red-900', text: 'text-white', iconBg: 'bg-red-900', accent: 'text-red-300' },
  oilgas: { bg: 'bg-orange-600', text: 'text-white', iconBg: 'bg-orange-600', accent: 'text-orange-300' },
  aviation: { bg: 'bg-blue-800', text: 'text-white', iconBg: 'bg-blue-800', accent: 'text-blue-300' },
  aesthetic: { bg: 'bg-fuchsia-600', text: 'text-white', iconBg: 'bg-fuchsia-600', accent: 'text-fuchsia-300' },
  legal: { bg: 'bg-teal-600', text: 'text-white', iconBg: 'bg-teal-600', accent: 'text-teal-300' },
  hospitality: { bg: 'bg-green-900', text: 'text-yellow-400', iconBg: 'bg-green-900', accent: 'text-yellow-400' },
  cabin: { bg: 'bg-blue-600', text: 'text-white', iconBg: 'bg-blue-600', accent: 'text-blue-300' },
  younggenius: { bg: 'bg-purple-700', text: 'text-white', iconBg: 'bg-purple-700', accent: 'text-purple-300' },
  customtrack: { bg: 'bg-teal-700', text: 'text-white', iconBg: 'bg-teal-700', accent: 'text-teal-300' },
};

// --- Course Data ---
const COURSES_DATA = [
  { id: 'banking', title: 'Banking Specialists', logo: '💼', desc: 'Master communication for finance, client relations, and market analysis.', type: 'pro', details: ['Pathway', 'Scenario', 'Unit 1', 'Financial Portfolio Crisis'] },
  { id: 'logistics', title: 'Logistics Coordinator', logo: '🚚', desc: 'Master professional communication in the logistics and supply chain industry.', type: 'pro', details: ['Pathway', 'Scenario', 'Unit 1', 'Supply Chain Simulator'] },
  { id: 'mining', title: 'Mining Engineer', logo: '⛏️', desc: 'Communicate effectively on site, in meetings, and with international teams.', type: 'pro', details: ['Pathway', 'Scenario', 'Unit 1', 'Mine Collapse Crisis'] },
  { id: 'medical', title: 'Medical Professionals', logo: '⚕️', desc: 'Improve patient communication, medical reports, and academic writing skills.', type: 'pro', details: ['Pathway', 'Scenario', 'Unit 1', 'Medical Triage Simulator'] },
  { id: 'oilgas', title: 'Oil & Gas Professionals', logo: '🛢️', desc: 'Learn industry-specific vocabulary and report writing for the energy sector.', type: 'pro', details: ['Pathway', 'Scenario', 'Unit 1', 'Drilling Operations Scenario'] },
  { id: 'aviation', title: 'Civil Aviation Professionals - Pilots and ATCs', logo: '✈️', desc: 'Master clear and concise communication in aviation, vital for safety and efficiency.', type: 'pro', details: ['Pathway', 'Scenario', 'Unit 1', 'Aviation Crisis'] },
  { id: 'aesthetic', title: 'Aestheticians', logo: '💄', desc: 'Enhance client consultation and service delivery language for the beauty industry.', type: 'pro', details: ['Pathway', 'Scenario', 'Unit 1', 'Aesthetician Crisis'] },
  { id: 'legal', title: 'Legal Professionals', logo: '⚖️', desc: 'Improve legal writing, courtroom communication, and client relations skills.', type: 'pro', details: ['Pathway', 'Scenario', 'Unit 1', 'Legal Crisis Simulation'] },
  { id: 'hospitality', title: 'Hotel & Hospitality Professionals', logo: '🏨', desc: 'Provide exceptional guest experiences with polished and professional English.', type: 'pro', details: ['Pathway', 'Scenario', 'Unit 1', 'Hotel Emergency Crisis'] },
  { id: 'cabin', title: 'Cabin Crew Professionals', logo: '✈️', desc: 'Ensure clear, calm, and effective communication with passengers and crew.', type: 'pro', details: ['Pathway', 'Scenario', 'Unit 1', 'Cabin Crew Simulation'] },
  { id: 'younggenius', title: 'Young Geniuses Track', logo: '👶', desc: 'Tailor-made English programs for aspiring young professionals in various fields.', type: 'ondemand', details: ['Quiz', 'Form'] },
  { id: 'customtrack', title: 'Custom Track Design', logo: '💡', desc: 'We build custom learning paths to help you achieve your specific career goals.', type: 'ondemand', details: ['Quiz', 'Form'] },
];

// --- EXAM DATA ---
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
const LOGISTICS_MAX_SCORE = 1250;

const BANKING_EXAM_DATA = {
  courseName: "Banking Professional",
  icon: "🏦",
  situations: [
    {
      id: 1,
      scenario: "A long-standing, high-net-worth client with a history of sporadic, large cash deposits attempts to deposit $15,000 in cash, stating it's for a 'personal debt repayment.' This exceeds the Cash Transaction Report (CTR) threshold.",
      options: [
        { text: "Complete the transaction and immediately file a mandatory Currency Transaction Report (CTR) with FinCEN.", score: 125, outcome: "This is the correct regulatory action. Transactions over $10,000 must be reported regardless of the client's relationship, adhering to BSA/AML compliance." },
        { text: "Refuse the deposit and ask the client to return with a wire transfer instead.", score: 50, outcome: "Refusing the deposit is unnecessary and impacts client relations. The focus should be on compliance, not avoidance." },
        { text: "Process the deposit without filing a report, based on the client's reliable history.", score: 0, outcome: "Failing to file a CTR is a severe violation of banking regulations (BSA) and compliance protocols." },
        { text: "Suggest the client deposit $8,000 today and $7,000 tomorrow to avoid the reporting requirement.", score: 25, outcome: "This constitutes 'structuring,' a felony under money laundering laws. Facilitating structuring is a serious compliance failure." }
      ]
    },
    {
      id: 2,
      scenario: "A corporate client is requesting a large, complex loan. During due diligence, you find discrepancies in their financial statements that suggest aggressive accounting, but their overall financial health is solid.",
      options: [
        { text: "Document the discrepancies, discuss them with the Credit Risk team, and require clarification/amendments before proceeding.", score: 125, outcome: "Thorough risk assessment and transparency are essential. Addressing red flags with the risk team and the client mitigates future losses and regulatory scrutiny." },
        { text: "Ignore the minor discrepancies to secure the large, profitable deal quickly.", score: 0, outcome: "This sacrifices the bank's integrity and long-term risk profile for short-term gain, leading to potential future write-downs and regulatory fines." },
        { text: "Approve the loan quickly, but charge a higher interest rate to cover the perceived risk.", score: 75, outcome: "While charging a premium for risk is standard, failing to clarify the statements exposes the bank to unnecessary, hidden risk." },
        { text: "Refer the client to a competitor to avoid dealing with the complex accounting.", score: 25, outcome: "Turning away a potentially viable client due to complexity is poor business development and fails the client's needs." }
      ]
    },
    {
        id: 3,
        scenario: "You receive an urgent subpoena for client financial records. The subpoena appears valid but requests highly sensitive, non-public personal information for multiple unrelated accounts.",
        options: [
            { text: "Verify the subpoena’s authenticity and scope with the Legal and Compliance departments before releasing any documents.", score: 100, outcome: "Releasing client information must adhere to strict internal protocols and legal review to protect client privacy and the bank from liability." },
            { text: "Immediately release the documents as requested to comply with the court order and avoid penalties.", score: 50, outcome: "Releasing documents without internal review risks violating privacy laws (like Gramm-Leach-Bliley) if the scope is overly broad or the subpoena is flawed." },
            { text: "Contact the clients whose records are requested to inform them of the subpoena and ask how they wish to proceed.", score: 75, outcome: "While transparency is good, legal advice often dictates that you should not notify clients until after the bank's legal team has reviewed the mandatory disclosure." },
            { text: "Refuse to comply, citing client confidentiality, and risk contempt of court.", score: 0, outcome: "A valid subpoena overrides client confidentiality; refusal without legal grounds is a major compliance failure." }
        ]
    },
    {
        id: 4,
        scenario: "You are preparing a pitch for a major institutional investor. Your supervisor gives you internal, non-public research from a different department that strongly supports your investment thesis.",
        options: [
            { text: "Review the research with the Compliance team to ensure it's permissible for external disclosure before including it in the pitch.", score: 125, outcome: "Using internal research without compliance clearance risks leaking Material Non-Public Information (MNPI), which could lead to insider trading accusations and regulatory action." },
            { text: "Include the research immediately, as it greatly strengthens the pitch and helps the bank win the deal.", score: 0, outcome: "This is a direct violation of information barriers ('Chinese Walls') and creates regulatory risk." },
            { text: "Only use the research to inform your argument but don't cite the internal document itself.", score: 50, outcome: "While better, the research might still contain MNPI that influences the client, making this a gray area that should be avoided." },
            { text: "Exclude the research entirely and base the pitch only on publicly available data.", score: 75, outcome: "This is the safest option, but you may lose a competitive edge. Full compliance review is the optimal path." }
        ]
    },
    {
        id: 5,
        scenario: "A junior colleague notices an anomaly in a trading algorithm—a temporary inefficiency that, if exploited manually, could yield a personal profit of $50,000 before the system patch.",
        options: [
            { text: "Immediately report the loophole to the Technology and Compliance teams to have the algorithm fixed and ensure no one else exploits it.", score: 125, outcome: "Reporting the flaw protects the bank's system integrity, prevents market manipulation, and is the highest standard of ethical conduct." },
            { text: "Exploit the loophole once for $50,000, then immediately report it.", score: 0, outcome: "Unauthorized trading using non-public information about a system flaw is unethical and illegal, often resulting in termination and regulatory fines." },
            { text: "Tell the colleague to ignore it, as exploiting it might lead to trouble.", score: 25, outcome: "Ignoring a known flaw is negligent and exposes the bank to massive risk if another employee or external entity finds it." },
            { text: "Discuss the potential profit with a senior colleague to see if they think it's worth the risk.", score: 50, outcome: "This spreads the knowledge of the flaw without addressing the core problem: the need for a system fix." }
        ]
    },
    {
        id: 6,
        scenario: "You are analyzing a client's portfolio performance when you notice a large, suspicious fund transfer to an offshore account in a high-risk jurisdiction, flagged internally as potential money laundering.",
        options: [
            { text: "Follow the bank's Anti-Money Laundering (AML) procedure, freeze the funds if necessary, and immediately file a Suspicious Activity Report (SAR).", score: 125, outcome: "Compliance with AML/KYC regulations is paramount. SAR filing is legally required when suspicion is present, and immediate action prevents further illicit activity." },
            { text: "Contact the client and ask them for a detailed explanation for the transfer.", score: 25, outcome: "Notifying the client of an SAR (known as 'tipping off') is illegal and hinders the investigation. You must proceed internally first." },
            { text: "Ignore the flag, as the client is very important and you do not want to jeopardize the relationship.", score: 0, outcome: "Prioritizing client relationship over AML compliance is a severe violation that can lead to catastrophic fines and criminal liability for the bank." },
            { text: "Wait a few weeks to see if similar suspicious activity occurs before filing the report.", score: 50, outcome: "Delaying an SAR compromises the investigation and the bank's duty to report suspicious activity promptly." }
        ]
    },
    {
        id: 7,
        scenario: "Your team is under immense pressure to meet quarterly sales targets. Your manager suggests offering highly complex, high-fee structured products to less sophisticated clients who might not fully understand the risk.",
        options: [
            { text: "Express concern to your manager, citing **Suitability** requirements, and escalate the sales practice to Compliance if the practice continues.", score: 125, outcome: "The duty of suitability requires that products sold match the client's financial sophistication, objectives, and risk tolerance. Escalation protects both the client and the bank's reputation." },
            { text: "Follow the manager's direction, as meeting targets is the priority and the clients signed a waiver.", score: 0, outcome: "Waivers do not absolve the bank of suitability duty, and selling unsuitable products is often predatory and leads to regulatory action (e.g., FINRA)." },
            { text: "Only offer the products to clients who ask about high-risk investments.", score: 75, outcome: "While better, you still have an affirmative duty to ensure the product is suitable, even if the client expresses interest." },
            { text: "Sell the products, but verbally warn the clients about the high risk.", score: 50, outcome: "A verbal warning is insufficient; documented suitability and full disclosure of complexity are required." }
        ]
    },
    {
        id: 8,
        scenario: "A private equity client asks for your bank to finance a leveraged buyout (LBO) of a competitor. You know the LBO will result in massive job losses in a local community where your bank has significant retail presence.",
        options: [
            { text: "Provide the financing if the deal meets all regulatory and credit risk criteria, separating business decisions from social impact.", score: 100, outcome: "While social responsibility is a factor, a bank's primary fiduciary and credit duty is to its shareholders and maintaining prudential lending standards. Blocking a profitable, compliant deal based purely on social risk is difficult to justify." },
            { text: "Refuse the financing to protect the bank's public reputation and the local community.", score: 50, outcome: "This is a decision based on social responsibility, which is important, but it neglects the bank's core function and its fiduciary duty to maximize shareholder return when all risk parameters are met." },
            { text: "Insist on a lower leverage ratio to minimize the risk of post-LBO default, regardless of social impact.", score: 75, outcome: "Focusing on credit risk is always correct, but it sidesteps the ethical/social question." },
            { text: "Anonymously inform the press about the LBO's negative community impact before the deal closes.", score: 0, outcome: "Leaking client deal information is a severe breach of confidentiality and trust." }
        ]
    },
    {
        id: 9,
        scenario: "You are the manager of a small branch. A long-time employee is consistently underperforming, but they are a single parent and firing them would cause severe hardship. You need to staff a new, critical compliance role.",
        options: [
            { text: "Reassign the employee to a non-critical administrative role that matches their current performance level, then hire a qualified candidate for the compliance position.", score: 125, outcome: "This balances the needs of the business (hiring a competent compliance officer) with compassion for the employee, showing ethical management." },
            { text: "Fire the employee immediately and hire a new person for the compliance role.", score: 50, outcome: "While efficiency is restored, this ignores the duty of care to employees and should be a last resort after performance management." },
            { text: "Place the underperforming employee in the critical compliance role, hoping they improve.", score: 0, outcome: "Placing an underperforming employee in a critical compliance role is negligent and exposes the bank to massive regulatory risk." },
            { text: "Keep the employee in their current role and simply outsource the new compliance function to a high-cost consultant.", score: 25, outcome: "This is fiscally irresponsible and avoids the core HR management issue." }
        ]
    },
    {
        id: 10,
        scenario: "You discover a pattern of gender-biased pay disparity among senior staff, which is not illegal but is against the bank’s stated corporate values of equity.",
        options: [
            { text: "Privately present the data and a proposal for a phased correction to the head of HR and the executive management team.", score: 100, outcome: "Addressing ethical disparities through formal channels is the most effective way to uphold corporate values without violating privacy or causing internal chaos." },
            { text: "Confront the executives responsible publicly during the next town hall meeting.", score: 25, outcome: "Public confrontation is unprofessional and likely to result in retaliation without solving the underlying issue." },
            { text: "Ignore the disparity, stating that if it were illegal, HR would have already addressed it.", score: 0, outcome: "Ignoring clear evidence of unfairness violates the bank's stated values and your professional ethical obligation." },
            { text: "Leak the anonymous pay data to the entire company via an internal email.", score: 50, outcome: "While high impact, leaking data violates confidentiality and makes you vulnerable to termination for inappropriate communication." }
        ]
    }
  ]
};
const BANKING_MAX_SCORE = 1250;

let db = null;
let auth = null;

export default function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [activeCourse, setActiveCourse] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [showNotification, setShowNotification] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);

  // --- Notification Modal ---
  const NotificationModal = ({ message, type, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className={`bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full border-t-4 ${type === 'error' ? 'border-red-500' : 'border-indigo-500'}`}>
        <h3 className="text-xl font-bold mb-3">{type === 'error' ? 'Error' : 'Action Required'}</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <button 
          className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );

  // --- Firebase Setup ---
  useEffect(() => {
    try {
      const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
      if (Object.keys(firebaseConfig).length === 0) {
        console.error("Firebase config is missing.");
        setIsAuthReady(true);
        return;
      }
      
      const app = initializeApp(firebaseConfig);
      db = getFirestore(app);
      auth = getAuth(app);

      const signIn = async () => {
        const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
        try {
          if (initialAuthToken) await signInWithCustomToken(auth, initialAuthToken);
          else await signInAnonymously(auth);
        } catch (error) {
          console.error("Sign-in failed:", error);
          await signInAnonymously(auth); 
        }
      };
      signIn();

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserId(user.uid);
          setUserEmail(user.email || 'Anonymous Guest');
          setUserIsAuthenticated(!user.isAnonymous);
        } else {
          setUserId(crypto.randomUUID()); 
          setUserEmail('Unauthenticated Guest');
          setUserIsAuthenticated(false);
        }
        setIsAuthReady(true);
      });

      return () => unsubscribe();
    } catch (e) {
      console.error("Firebase setup error:", e);
      setIsAuthReady(true);
    }
  }, []);

  // --- Logistics Unit 1 View ---
  const LogisticsUnit1View = ({ course }) => {
    const [responses, setResponses] = useState({});
    const handleInputChange = (id, value) => setResponses(prev => ({ ...prev, [id]: value }));
    return (
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">🚚 Unit 1: Logistics English</h2>
        <p className="text-gray-600 mb-6">Supply Chain Coordination & Problem Solving</p>
        
        <div className="mb-6 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-600">
          <h3 className="text-xl font-bold text-indigo-700 mb-2">🎯 After completing this unit, you will be able to:</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Report shipment delays clearly and professionally.</li>
            <li>Use key logistics vocabulary (ETA, BOL, customs clearance).</li>
            <li>Apply the Present Perfect tense to report changes.</li>
            <li>Write accurate, error-free logistics updates.</li>
            <li>Coordinate effectively between dispatcher, driver, and warehouse.</li>
          </ul>
        </div>

        {[
          { id: 'start', title: "Starting Point: The Shipment Is Delayed", content: "You are a logistics coordinator. The driver calls: 'I’m stuck in traffic. I’ll be 2 hours late.' What do you say?" },
          { id: 'vocab', title: "Exercise 1: Vocabulary Definitions", content: "Match the term to its definition." },
          { id: 'present_perfect', title: "Exercise 2: Present Perfect – Reporting Changes", content: "Complete the sentences with the correct form of the verb." },
          { id: 'update', title: "Exercise 3: Build the Logistics Update", content: "Use these words to create a correct update message." },
          { id: 'errors', title: "Exercise 4: Find and Correct the Errors", content: "The dispatcher wrote this update. It has 4 errors." },
          { id: 'roleplay', title: "Exercise 5: Role-Play – Coordinate the Delay", content: "Write a full dialogue between the dispatcher and the warehouse manager." }
        ].map((ex) => (
          <div key={ex.id} className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-500">
            <h4 className="font-bold text-gray-800 mb-2">{ex.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{ex.content}</p>
            <textarea
              value={responses[ex.id] || ''}
              onChange={(e) => handleInputChange(ex.id, e.target.value)}
              placeholder="Your response..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              rows="3"
            />
            <button className="mt-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 transition">
              ✅ Submit
            </button>
          </div>
        ))}

        <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
          <h4 className="font-bold text-yellow-800">💡 Professional Tip</h4>
          <p className="text-yellow-700">Always use clear, concise language. Say “has been delayed” not “is delayed.” This shows the action is complete and impacts the timeline.</p>
        </div>
      </div>
    );
  };

  // --- Logistics Scenario View ---
  const LogisticsScenarioView = ({ course }) => {
    const [responses, setResponses] = useState({});
    const [feedbacks, setFeedbacks] = useState({});
    const questions = [
      { id: 'q1', title: "A truck breaks down en route. How do you manage the delay?", hint: "Do you reroute? Who do you inform? How do you update the client?" },
      { id: 'q2', title: "A warehouse has loaded the wrong item onto a truck. What is your action?", hint: "Do you stop the truck? Who do you contact at the warehouse?" },
      { id: 'q3', title: "A shipment is held up at customs. What is your first point of contact and what do you do?", hint: "What documents might be missing? What is the risk?" },
      { id: 'q4', title: "Severe weather is forecast on a major highway. How do you prepare your drivers and shipments?", hint: "How do you communicate? What is the priority?" },
      { id: 'q5', title: "A driver is 3 hours late for a scheduled pickup. How do you communicate with the warehouse and the client?", hint: "How do you explain the delay? What is the solution?" },
      { id: 'q6', title: "You notice a discrepancy between the packing list and the actual goods. How do you address this?", hint: "What is the risk? What is the solution?" },
      { id: 'q7', title: "A client wants to change the destination of a shipment that is already in transit. How do you respond?", hint: "Is it possible? What are the costs and risks?" },
      { id: 'q8', title: "A client is unhappy with a delay that was caused by a natural disaster. How do you handle the conversation?", hint: "How do you explain the cause? How do you show empathy?" },
      { id: 'q9', title: "A client wants to know the status of their shipment every hour. How do you manage their expectations?", hint: "How do you communicate without causing panic?" },
      { id: 'q10', title: "A carrier has submitted an invoice with an unexpected surcharge. How do you resolve this?", hint: "What is the first step? What do you say to the carrier?" },
      { id: 'q11', title: "A client wants a cost estimate for a new, complex delivery route. How do you respond?", hint: "What information do you need?" },
      { id: 'q12', title: "A shipment of delicate goods has been damaged in transit. What is your first course of action?", hint: "Who do you inform? What is the process for a claim?" },
      { id: 'q13', title: "You need to explain the concept of a 'bill of lading' to a new client. What is your explanation?", hint: "Use simple language. What is its purpose?" },
      { id: 'q14', title: "A client wants to switch from sea freight to air freight. What do you tell them?", hint: "What are the benefits and costs? What is the risk?" },
      { id: 'q15', title: "How do you communicate urgency to a driver without causing them to panic or rush?", hint: "How do you motivate them?" },
      { id: 'q16', title: "A client has a question about a technical aspect of a delivery, such as the type of container. How do you respond?", hint: "How do you show your expertise?" },
      { id: 'q17', title: "How do you explain the benefits of a new logistics tracking system to your team?", hint: "How do you show value?" },
      { id: 'q18', title: "A major port is shut down due to a strike. How do you communicate this to clients and internal teams?", hint: "What is the risk? What is the solution?" },
      { id: 'q19', title: "How do you coordinate with a supplier to expedite an urgent order?", hint: "What do you say to the supplier?" },
      { id: 'q20', title: "How do you identify and mitigate a potential risk in the supply chain?", hint: "What are the steps? What do you say to your team?" }
    ];
    const handleInputChange = (id, value) => setResponses(prev => ({ ...prev, [id]: value }));
    const handleSubmit = (id) => {
      const val = responses[id]?.trim() || '';
      const msg = val.length < 20 
        ? "<strong>💡 Tip:</strong> Be specific. Include communication, coordination, and risk management."
        : "<strong>✅ Well done!</strong> Your response shows leadership under pressure.";
      setFeedbacks(prev => ({ ...prev, [id]: msg }));
    };
    return (
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-indigo-800 mb-2">🧩 Professional Practice Scenarios</h2>
          <p className="text-gray-600">Solve real operational challenges using English as your tool.</p>
        </div>

        <div className="mb-6 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-600">
          <h3 className="text-xl font-bold text-indigo-700 mb-2">🎯 After completing this lesson, you will be able to:</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Explain delays and rerouting to clients clearly.</li>
            <li>Coordinate with drivers, warehouses, and customs.</li>
            <li>Lead during supply chain disruptions.</li>
            <li>Communicate urgency without panic.</li>
          </ul>
        </div>

        {/* Part 1 */}
        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2">Part 1: Transportation & Operations</h3>
        {questions.slice(0, 10).map(q => (
          <div key={q.id} className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-500">
            <h4 className="font-bold text-gray-800 mb-2">{q.title}</h4>
            <p className="text-sm text-gray-600 mb-3"><strong>Think about:</strong> {q.hint}</p>
            <textarea
              value={responses[q.id] || ''}
              onChange={(e) => handleInputChange(q.id, e.target.value)}
              placeholder="Your response..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              rows="3"
            />
            <button
              onClick={() => handleSubmit(q.id)}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 transition"
            >
              ✅ Submit
            </button>
            {feedbacks[q.id] && (
              <div
                className="mt-3 p-3 bg-blue-50 text-blue-800 rounded-md text-sm"
                dangerouslySetInnerHTML={{ __html: feedbacks[q.id] }}
              />
            )}
          </div>
        ))}

        {/* Part 2 */}
        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4 border-b pb-2">Part 2: Client Communication & Problem-Solving</h3>
        {questions.slice(10, 16).map(q => (
          <div key={q.id} className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-green-500">
            <h4 className="font-bold text-gray-800 mb-2">{q.title}</h4>
            <p className="text-sm text-gray-600 mb-3"><strong>Think about:</strong> {q.hint}</p>
            <textarea
              value={responses[q.id] || ''}
              onChange={(e) => handleInputChange(q.id, e.target.value)}
              placeholder="Your response..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              rows="3"
            />
            <button
              onClick={() => handleSubmit(q.id)}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 transition"
            >
              ✅ Submit
            </button>
            {feedbacks[q.id] && (
              <div
                className="mt-3 p-3 bg-blue-50 text-blue-800 rounded-md text-sm"
                dangerouslySetInnerHTML={{ __html: feedbacks[q.id] }}
              />
            )}
          </div>
        ))}

        {/* Part 3 */}
        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4 border-b pb-2">Part 3: Supply Chain Management & Technology</h3>
        {questions.slice(16).map(q => (
          <div key={q.id} className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-purple-500">
            <h4 className="font-bold text-gray-800 mb-2">{q.title}</h4>
            <p className="text-sm text-gray-600 mb-3"><strong>Think about:</strong> {q.hint}</p>
            <textarea
              value={responses[q.id] || ''}
              onChange={(e) => handleInputChange(q.id, e.target.value)}
              placeholder="Your response..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              rows="3"
            />
            <button
              onClick={() => handleSubmit(q.id)}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 transition"
            >
              ✅ Submit
            </button>
            {feedbacks[q.id] && (
              <div
                className="mt-3 p-3 bg-blue-50 text-blue-800 rounded-md text-sm"
                dangerouslySetInnerHTML={{ __html: feedbacks[q.id] }}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  // --- Logistics Pathway View ---
  const LogisticsPathwayView = ({ course }) => {
    return (
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
        <p className="text-gray-700 text-lg mb-8 border-l-4 border-indigo-400 pl-4 py-2 bg-indigo-50 rounded-r-lg">
          This pathway is designed to transform students into highly skilled logistics professionals who can operate and communicate with confidence in any international environment. The curriculum progresses from foundational terminology to advanced project management and global trade.
        </p>

        <div className="mb-8 p-6 bg-blue-50 rounded-xl border-l-4 border-blue-700">
          <h3 className="text-2xl font-bold text-blue-800 mb-3">Phase 1: Foundations of Logistics & Supply Chain (Units 1–30)</h3>
          <p className="font-medium text-gray-700 mb-3"><strong>English Focus:</strong> Present Simple, Past Simple, core vocabulary for supply chain roles and components.</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li><strong>Units 1–6:</strong> Introduction to Logistics & the Supply Chain<br /><em>Terminology: supply chain, logistics, shipping; roles: logistics manager, freight forwarder.</em></li>
            <li><strong>Units 7–12:</strong> Modes of Transport<br /><em>Vocabulary: air freight, ocean freight, road transport; comparing features.</em></li>
            <li><strong>Units 13–18:</strong> Warehouse Operations<br /><em>Imperatives: "Store here," "Label clearly"; equipment terms: forklift, pallet.</em></li>
            <li><strong>Units 19–24:</strong> Inventory Management<br /><em>Quantifiers: much/many; concepts: stock level, inventory turnover.</em></li>
            <li><strong>Units 25–30:</strong> Documentation Fundamentals<br /><em>Key documents: Bill of Lading, packing list; understanding purpose.</em></li>
          </ul>
        </div>

        <div className="mb-8 p-6 bg-green-50 rounded-xl border-l-4 border-green-700">
          <h3 className="text-2xl font-bold text-green-800 mb-3">Phase 2: Global Trade & Customs (Units 31–60)</h3>
          <p className="font-medium text-gray-700 mb-3"><strong>English Focus:</strong> Explaining processes, conditionals, legal terminology.</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li><strong>Units 31–36:</strong> Incoterms 2020<br /><em>Responsibilities: EXW, FOB, DDP; conditional: "If the buyer arranges pickup..."</em></li>
            <li><strong>Units 37–42:</strong> Customs Procedures<br /><em>Vocabulary: customs declaration, certificate of origin; duties and tariffs.</em></li>
            <li><strong>Units 43–48:</strong> International Regulations<br /><em>Legal terms; passive voice: "The goods are inspected by customs."</em></li>
            <li><strong>Units 49–54:</strong> Risk Management in Shipping<br /><em>Discussing risks: delay, damage; proposing solutions.</em></li>
            <li><strong>Units 55–60:</strong> Freight Forwarding & Brokering<br /><em>Negotiation role-play; persuasive language for rates and terms.</em></li>
          </ul>
        </div>

        <div className="mb-8 p-6 bg-purple-50 rounded-xl border-l-4 border-purple-700">
          <h3 className="text-2xl font-bold text-purple-800 mb-3">Phase 3: Operations & Technology (Units 61–90)</h3>
          <p className="font-medium text-gray-700 mb-3"><strong>English Focus:</strong> Giving instructions, reporting issues, describing systems.</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li><strong>Units 61–66:</strong> Fleet & Route Management<br /><em>Prepositions of movement; discussing fuel efficiency and route optimization.</em></li>
            <li><strong>Units 67–72:</strong> Supply Chain Technology<br /><em>Describing GPS tracking, WMS; explaining system functions.</em></li>
            <li><strong>Units 73–78:</strong> Cold Chain Logistics<br /><em>Vocabulary: refrigerated, chilled; discussing temperature protocols.</em></li>
            <li><strong>Units 79–84:</strong> Reverse Logistics<br /><em>Explaining returns and recycling; cause-and-effect language.</em></li>
            <li><strong>Units 85–90:</strong> E-commerce Logistics<br /><em>Challenges of last-mile delivery and online fulfillment.</em></li>
          </ul>
        </div>

        <div className="mb-8 p-6 bg-yellow-50 rounded-xl border-l-4 border-yellow-700">
          <h3 className="text-2xl font-bold text-yellow-800 mb-3">Phase 4: Communication & Client Relations (Units 91–120)</h3>
          <p className="font-medium text-gray-700 mb-3"><strong>English Focus:</strong> Professional emails, persuasion, conflict resolution.</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li><strong>Units 91–96:</strong> Professional Email & Report Writing<br /><em>Formal emails: inquiries, complaints, follow-ups.</em></li>
            <li><strong>Units 97–102:</strong> Client Service<br /><em>Role-playing interactions; polite and helpful language.</em></li>
            <li><strong>Units 103–108:</strong> Complaint Handling<br /><em>De-escalation phrases; offering solutions professionally.</em></li>
            <li><strong>Units 109–114:</strong> Negotiation Skills<br /><em>Negotiating rates, terms, contracts with confidence.</em></li>
            <li><strong>Units 115–120:</strong> Team Communication<br /><em>Daily task discussions, progress reports, feedback.</em></li>
          </ul>
        </div>

        <div className="mb-8 p-6 bg-indigo-50 rounded-xl border-l-4 border-indigo-700">
          <h3 className="text-2xl font-bold text-indigo-800 mb-3">Phase 5: Leadership & Strategy (Units 121–150)</h3>
          <p className="font-medium text-gray-700 mb-3"><strong>English Focus:</strong> Strategic planning, formal presentations, team leadership.</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li><strong>Units 121–127:</strong> Strategic Sourcing & Procurement<br /><em>Explaining sourcing strategies; managing supplier relationships.</em></li>
            <li><strong>Units 128–134:</strong> Supply Chain Design<br /><em>Presenting new supply chain plans; using technical vocabulary.</em></li>
            <li><strong>Units 135–141:</strong> Project Management<br /><em>Planning large-scale logistics projects; coordination skills.</em></li>
            <li><strong>Units 142–148:</strong> Leadership & Management<br /><em>Giving instructions, motivating teams, performance reviews.</em></li>
            <li><strong>Units 149–150:</strong> Final Project & Presentation<br /><em>Deliver a capstone presentation on a real-world logistics case study.</em></li>
          </ul>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl border border-dashed border-indigo-300">
          <h4 className="text-xl font-bold text-indigo-700 mb-3">📘 Example Unit: Unit 13 – Warehouse Operations</h4>
          <p className="font-medium mb-3"><strong>This unit introduces the theory and practical application of warehouse operations.</strong></p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li><strong>Lecture 1: Warehouse Layouts & Systems</strong><br /><em>Focus on vocabulary: storage racks, aisles, receiving bay, shipping dock.</em></li>
            <li><strong>Lecture 2: Receiving & Put-Away Procedures</strong><br /><em>Practice Present Simple for routines; imperatives: "Scan the barcode."</em></li>
            <li><strong>Lecture 3: Order Picking & Packing</strong><br /><em>Role-play: Incorrect order. Report to supervisor: "We shipped the wrong SKU."</em></li>
            <li><strong>Lecture 4: Inventory Checks & Reports</strong><br /><em>Explain results: "Inventory shows a 5% discrepancy in Section B."</em></li>
          </ul>
        </div>
      </div>
    );
  };

  // --- Logistics Exam Simulator ---
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
      if (LOGISTICS_EXAM_DATA.situations[currentSituationIndex]) {
        const opts = [...LOGISTICS_EXAM_DATA.situations[currentSituationIndex].options];
        setShuffledOptions(opts.sort(() => Math.random() - 0.5));
      }
    }, [currentSituationIndex]);

    const handleDecision = (option) => {
      if (selectedOption) return;
      setFinalScore(prev => prev + option.score);
      setSelectedOption(option);
    };

    const handleNext = () => {
      if (currentSituationIndex < LOGISTICS_EXAM_DATA.situations.length - 1) {
        setCurrentSituationIndex(prev => prev + 1);
        setSelectedOption(null);
      } else {
        setExamState('results');
      }
    };

    const getFeedback = (score) => {
      const pct = (score / LOGISTICS_MAX_SCORE) * 100;
      if (pct >= 90) return { title: "Supply Chain Excellence", description: "Your decisions optimize costs, ensure regulatory compliance (HTS, cold chain), and prioritize warehouse safety and efficiency. Masterful risk management.", color: "text-green-600", icon: "✅" };
      if (pct >= 70) return { title: "Competent Logistics Manager", description: "You have a solid awareness of supply chain threats, but some responses missed the absolute mandatory step in inventory control or the most cost-effective solution.", color: "text-blue-600", icon: "👍" };
      if (pct >= 50) return { title: "Developing Operations Planner", description: "Your understanding of transportation and warehousing is foundational, but you need review on critical areas like customs compliance and immediate safety violation intervention.", color: "text-yellow-600", icon: "⚠️" };
      return { title: "Operational Fundamentals Review Required", description: "Your responses indicated a need for fundamental review of inventory control, safety protocols, and effective crisis management strategies in transportation.", color: "text-red-600", icon: "🛑" };
    };

    const handleSubscription = async () => {
      const emailVal = email.trim();
      if (!emailVal || !emailVal.includes('@')) {
        setSubscriptionMessage({ text: "Please enter a valid email.", type: "yellow" });
        return;
      }
      setIsSubmitting(true);
      setTimeout(() => {
        setSubscriptionMessage({ text: "Success! Check your inbox for your detailed supply chain strategy breakdown.", type: "green" });
        setEmail("");
      }, 800);
    };

    if (examState === 'results') {
      const feedback = getFeedback(finalScore);
      const pct = Math.round((finalScore / LOGISTICS_MAX_SCORE) * 100);
      const shareText = `I scored ${pct}% on the ${LOGISTICS_EXAM_DATA.courseName} Simulator!`;
      return (
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-200 text-center max-w-4xl mx-auto my-10">
          <h2 className="text-5xl font-extrabold text-indigo-600 mb-4">Results Complete!</h2>
          <p className="text-3xl font-bold text-gray-800 mb-6">Total Score: {finalScore} / {LOGISTICS_MAX_SCORE} ({pct}%)</p>
          <div className="mx-auto max-w-2xl bg-indigo-50 p-6 rounded-xl">
            <h3 className={`text-3xl font-extrabold ${feedback.color} mb-2`}>{feedback.icon} {feedback.title}</h3>
            <p className="text-xl text-gray-700">{feedback.description}</p>
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-4 border-t pt-6 mt-6">Unlock Your Detailed Strategy Breakdown</h3>
          {!isSubmitting ? (
            <div className="mx-auto max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-center"
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
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-sky-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-sky-600 transition">
                <span>Share on X</span>
              </a>
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-blue-700 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-800 transition">
                <span>Share on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    const current = LOGISTICS_EXAM_DATA.situations[currentSituationIndex];
    const maxOpt = current.options.reduce((max, opt) => opt.score > max.score ? opt : max, { score: -Infinity });
    return (
      <div className="bg-gray-50 min-h-screen py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              {LOGISTICS_EXAM_DATA.icon} {LOGISTICS_EXAM_DATA.courseName} Simulator
            </h1>
            <p className="text-lg text-gray-600">Test your critical knowledge of Inventory Control, Customs Compliance, and Warehouse Safety.</p>
          </div>
          <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-200">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-blue-700">
                Situation {current.id}/{LOGISTICS_EXAM_DATA.situations.length}
              </h2>
              <span className="text-xl font-semibold text-gray-800">Score: {finalScore}</span>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">{current.scenario}</p>
            <div className="space-y-4 mb-8">
              {shuffledOptions.map((opt, idx) => {
                let cls = 'w-full text-left p-4 rounded-xl border border-gray-300 shadow-sm hover:shadow-md transition duration-150 ease-in-out bg-white';
                if (selectedOption) {
                  if (opt.text === selectedOption.text) {
                    if (selectedOption.score >= 100) cls += ' bg-green-500 text-white';
                    else if (selectedOption.score > 25) cls += ' bg-yellow-500 text-gray-900';
                    else cls += ' bg-red-500 text-white';
                    cls += ' shadow-lg';
                  } else if (opt.text === maxOpt.text) {
                    if (selectedOption.score !== maxOpt.score) {
                      cls += ' bg-blue-200 border-blue-500 opacity-70';
                    } else {
                      cls += ' opacity-50';
                    }
                  } else {
                    cls += ' opacity-50';
                  }
                }
                return (
                  <button
                    key={idx}
                    onClick={() => handleDecision(opt)}
                    className={cls}
                    disabled={!!selectedOption}
                  >
                    {opt.text}
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
                  className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  {currentSituationIndex === LOGISTICS_EXAM_DATA.situations.length - 1 ? 'See Final Results' : 'Next Situation'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // --- Logistics Demo Simulator ---
  const LogisticsDemoSimulatorPage = ({ course }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const handleChoice = (choice) => {
      if (selectedOption) return;
      setSelectedOption(choice);
    };
    const getFeedback = (choice) => {
      switch (choice) {
        case 'land_route':
          return { title: "A Solid Contingency Plan", text: "This is a good, reliable choice. While it may result in a slight delay, it ensures the shipment will arrive safely...", colorClass: "border-yellow-500 bg-yellow-100 text-yellow-900" };
        case 'air_freight':
          return { title: "The Best and Most Decisive Action", text: "This is the ideal solution. It guarantees the shipment will arrive on time...", colorClass: "border-green-500 bg-green-100 text-green-900" };
        case 'wait':
          return { title: "A Catastrophic Failure of Leadership", text: "Doing nothing is an unacceptable failure...", colorClass: "border-red-500 bg-red-100 text-red-900" };
        case 'back_road':
          return { title: "An Unnecessary Gamble", text: "Choosing a dangerous, unpaved road is reckless...", colorClass: "border-purple-500 bg-purple-100 text-purple-900" };
        default:
          return null;
      }
    };
    const feedback = selectedOption ? getFeedback(selectedOption) : null;
    return (
      <div className="flex items-center justify-center min-h-screen p-4" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1549480016-d87d464b97e9?q=80&w=2832&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div className="absolute top-4 w-full text-center">
          <nav className="space-x-4">
            <a href="https://www.aulice.ca/" className="text-white text-sm font-bold hover:text-yellow-300 transition">Gate</a>
            <button onClick={() => setCurrentPage('Home')} className="text-white text-sm font-bold hover:text-yellow-300 transition">Home</button>
            <button onClick={() => setCurrentPage('AboutUs')} className="text-white text-sm font-bold hover:text-yellow-300 transition">About</button>
            <button onClick={() => setCurrentPage('PricingPlans')} className="text-white text-sm font-bold hover:text-yellow-300 transition">Pricing</button>
            <button onClick={() => setCurrentPage('Lexicon')} className="text-white text-sm font-bold hover:text-yellow-300 transition">Lexicon</button>
          </nav>
        </div>
        <div className="bg-gray-900/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 max-w-2xl w-full text-center text-white">
          <div className="bg-blue-800 rounded-t-3xl -mt-8 -mx-8 px-8 py-6 shadow-xl border-b-4 border-white">
            <h2 className="text-xl font-bold tracking-wide">Supply Chain Simulation</h2>
          </div>
          <div className="p-4 mt-6">
            <h1 className="text-3xl font-extrabold text-white mb-2">📦 Urgent Shipment Delayed</h1>
            <p className="text-lg text-gray-300 mb-6">
              You are a Logistics Manager. A vital shipment of medical supplies is en route when a severe landslide blocks the primary highway...
            </p>
            <div className="bg-gray-800 p-6 rounded-2xl shadow-inner text-left mb-6 border-l-4 border-white">
              <h3 className="text-xl font-bold text-sky-400 mb-2">⚠️ Situation</h3>
              <p className="text-gray-300">The driver is stopped and awaiting instructions...</p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-gray-200">
                <li><span className="font-semibold text-yellow-300">Option 1:</span> Divert to a longer, secondary land route.</li>
                <li><span className="font-semibold text-green-300">Option 2:</span> Arrange an emergency air freight shipment.</li>
                <li><span className="font-semibold text-blue-300">Option 3:</span> Instruct the driver to wait for the landslide to be cleared.</li>
                <li><span className="font-semibold text-red-300">Option 4:</span> Attempt to navigate a dangerous, unpaved back road.</li>
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button onClick={() => handleChoice('land_route')} disabled={!!selectedOption} className={`w-full py-3 px-6 font-bold rounded-xl text-lg shadow-lg transition ${selectedOption === 'land_route' ? 'bg-yellow-700' : 'bg-red-600 hover:bg-red-700'} text-white`}>🛣️ Divert to Secondary Route</button>
              <button onClick={() => handleChoice('air_freight')} disabled={!!selectedOption} className={`w-full py-3 px-6 font-bold rounded-xl text-lg shadow-lg transition ${selectedOption === 'air_freight' ? 'bg-green-700' : 'bg-green-600 hover:bg-green-700'} text-white`}>✈️ Arrange Emergency Air Freight</button>
              <button onClick={() => handleChoice('wait')} disabled={!!selectedOption} className={`w-full py-3 px-6 font-bold rounded-xl text-lg shadow-lg transition ${selectedOption === 'wait' ? 'bg-red-700' : 'bg-gray-600 hover:bg-gray-700'} text-white`}>⏳ Wait for Highway to Clear</button>
              <button onClick={() => handleChoice('back_road')} disabled={!!selectedOption} className={`w-full py-3 px-6 font-bold rounded-xl text-lg shadow-lg transition ${selectedOption === 'back_road' ? 'bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}>⚠️ Attempt Back Road</button>
            </div>
            {feedback && (
              <div className={`mt-8 p-6 rounded-2xl text-left shadow-xl border-l-4 ${feedback.colorClass}`}>
                <h4 className="text-xl font-bold mb-2">💡 {feedback.title}</h4>
                <p className="font-semibold">{feedback.text}</p>
              </div>
            )}
          </div>
        </div>
        <footer className="absolute bottom-4 text-white text-xs text-center font-light w-full">
          <p>© 2025 Aulice Academy.</p>
        </footer>
      </div>
    );
  };

  // --- Banking Views (from previous messages) ---
  const BankingUnit1View = ({ course }) => {
    const [responses, setResponses] = useState({});
    const handleInputChange = (id, value) => setResponses(prev => ({ ...prev, [id]: value }));
    return (
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-bold text-indigo-800 mb-2">🧪 Unit 1: Introduction to Banking & the Financial System</h2>
        <p className="text-gray-600 mb-6">Foundations of Global Finance</p>
        <div className="mb-6 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-600">
          <h3 className="text-xl font-bold text-indigo-700 mb-2">🎯 After completing this unit, you will be able to:</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Define and use core banking terms like deposit, loan, and interest.</li>
            <li>Identify and describe different types of banks.</li>
            <li>Understand the roles and responsibilities of key banking professionals.</li>
            <li>Use the Present Simple tense to describe routine processes and facts.</li>
          </ul>
        </div>
        {[
          { id: 'vocab', title: "Lesson 1: Vocabulary & Core Concepts", content: "Match the term to its definition." },
          { id: 'banks', title: "Lesson 2: Types of Banks", content: "Fill in: retail, investment, central" },
          { id: 'roles', title: "Lesson 3: Professional Roles", content: "Complete with Present Simple verbs." },
          { id: 'dialogue', title: "Lesson 5: Professional Dialogue", content: "Complete the conversation." }
        ].map((lesson) => (
          <div key={lesson.id} className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-500">
            <h4 className="font-bold text-gray-800 mb-2">{lesson.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{lesson.content}</p>
            <textarea
              value={responses[lesson.id] || ''}
              onChange={(e) => handleInputChange(lesson.id, e.target.value)}
              placeholder="Your response..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              rows="3"
            />
            <button className="mt-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 transition">
              ✅ Submit
            </button>
          </div>
        ))}
      </div>
    );
  };

  const BankingScenarioView = ({ course }) => {
    const [responses, setResponses] = useState({});
    const [feedbacks, setFeedbacks] = useState({});
    const questions = [
      { id: 'q1', title: "A client loses money on an investment. How do you respond?", hint: "How do you show empathy? Do you offer a solution?" },
      { id: 'q2', title: "A client is upset about a service fee they didn't expect. How do you handle this complaint?", hint: "How do you explain the fee? Can you offer a one-time waiver?" },
      { id: 'q3', title: "A client's loan application has been rejected. How do you explain this decision to them?", hint: "How do you provide the news respectfully? What options do you suggest?" },
      { id: 'q4', title: "A new client is confused about the difference between a checking and a savings account. How do you explain it simply?", hint: "Use simple language and clear examples." },
      { id: 'q5', title: "A client asks about their current account balance. How do you respond?", hint: "What is the procedure for verifying identity? How do you maintain privacy?" },
      { id: 'q6', title: "A long-term client reports a fraudulent charge on their account. What is your first action?", hint: "What do you do? Who do you inform?" },
      { id: 'q7', title: "An elderly client wants to withdraw a very large sum of money to 'help a friend.' You suspect it's a scam. How do you handle this?", hint: "How do you raise concerns without accusing the client?" },
      { id: 'q8', title: "A client is very angry because they have been waiting for 20 minutes. How do you de-escalate the situation?", hint: "How do you show empathy? How do you offer a solution?" },
      { id: 'q9', title: "A client wants to transfer a large sum to a foreign bank account. How do you handle this?", hint: "What is the verification procedure? What questions do you ask?" },
      { id: 'q10', title: "A new client is interested in opening a business account. What services would you explain?", hint: "How do you present the value?" },
      { id: 'q11', title: "A bank system outage occurs. How do you manage clients in the branch?", hint: "How do you communicate? What do you do to help?" },
      { id: 'q12', title: "A colleague makes a mistake causing a client to be overcharged. How do you handle this?", hint: "What is your responsibility?" },
      { id: 'q13', title: "How would you explain the benefits of a home mortgage to a potential client?", hint: "What are the benefits? What are the risks?" },
      { id: 'q14', title: "How would you explain the importance of a good credit score to a young adult?", hint: "How do you make it relatable?" },
      { id: 'q15', title: "A client reports that their debit card has been stolen. How do you help them?", hint: "What is your first step? What do you do next?" },
      { id: 'q16', title: "How do you politely decline a client's request for a loan when they don't meet requirements?", hint: "How do you stay polite? How do you offer an alternative?" },
      { id: 'q17', title: "A client wants to close an account because they're unhappy. How do you respond?", hint: "How do you show empathy? How do you try to retain the client?" },
      { id: 'q18', title: "A client is concerned about online banking security. How do you reassure them?", hint: "What security features does the bank have?" },
      { id: 'q19', title: "A client wants to open an account for their child. What information do you give them?", hint: "What are the benefits? What are the requirements?" },
      { id: 'q20', title: "A client wants to set up direct deposit for their paycheck. How do you help them?", hint: "What information do they need? What is the procedure?" }
    ];
    const handleInputChange = (id, value) => setResponses(prev => ({ ...prev, [id]: value }));
    const handleSubmit = (id) => {
      const val = responses[id]?.trim() || '';
      const msg = val.length < 20 
        ? "<strong>💡 Tip:</strong> Be specific. Include empathy, procedure, and safety focus."
        : "<strong>✅ Well done!</strong> Your response shows professionalism under pressure.";
      setFeedbacks(prev => ({ ...prev, [id]: msg }));
    };
    return (
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-indigo-800 mb-2">🧩 Professional Practice Scenarios</h2>
          <p className="text-gray-600 mb-6">Solve real operational challenges using English as your tool.</p>
        </div>
        <div className="mb-6 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-600">
          <h3 className="text-xl font-bold text-indigo-700 mb-2">🎯 After completing this lesson, you will be able to:</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Explain financial products clearly.</li>
            <li>Handle client complaints with empathy.</li>
            <li>Report suspicious transactions.</li>
            <li>Lead during system outages.</li>
          </ul>
        </div>
        {questions.map(q => (
          <div key={q.id} className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-500">
            <h4 className="font-bold text-gray-800 mb-2">{q.title}</h4>
            <p className="text-sm text-gray-600 mb-3"><strong>Think about:</strong> {q.hint}</p>
            <textarea
              value={responses[q.id] || ''}
              onChange={(e) => handleInputChange(q.id, e.target.value)}
              placeholder="Your response..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              rows="3"
            />
            <button
              onClick={() => handleSubmit(q.id)}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 transition"
            >
              ✅ Submit
            </button>
            {feedbacks[q.id] && (
              <div
                className="mt-3 p-3 bg-blue-50 text-blue-800 rounded-md text-sm"
                dangerouslySetInnerHTML={{ __html: feedbacks[q.id] }}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const BankingPathwayView = ({ course }) => {
    return (
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
        <p className="text-gray-700 text-lg mb-8 border-l-4 border-indigo-400 pl-4 py-2 bg-indigo-50 rounded-r-lg">
          This pathway is designed to transform students into highly skilled banking professionals...
        </p>
        <div className="mb-8 p-6 bg-blue-50 rounded-xl border-l-4 border-blue-700">
          <h3 className="text-2xl font-bold text-blue-800 mb-3">Phase 1: Financial System & Fundamentals (Units 1–25)</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li><strong>Units 1–5:</strong> Introduction to Banking<br /><em>Vocabulary: retail, investment, central banks...</em></li>
            <li><strong>Units 6–10:</strong> The Financial Ecosystem<br /><em>Explaining institutions; sequence words...</em></li>
            <li><strong>Units 11–15:</strong> Banking Products & Services<br /><em>Describing checking/savings accounts...</em></li>
            <li><strong>Units 16–20:</strong> Customer Onboarding & KYC<br /><em>Role-playing interviews...</em></li>
            <li><strong>Units 21–25:</strong> Financial Terminology<br /><em>Learning terms: interest, principal...</em></li>
          </ul>
        </div>
        <div className="mb-8 p-6 bg-green-50 rounded-xl border-l-4 border-green-700">
          <h3 className="text-2xl font-bold text-green-800 mb-3">Phase 2: Retail & Corporate Banking (Units 26–50)</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li><strong>Units 26–30:</strong> Loans & Credit<br /><em>Loan types: mortgage, personal...</em></li>
            <li><strong>Units 31–35:</strong> Business Banking<br /><em>Payroll, business loans...</em></li>
            <li><strong>Units 36–40:</strong> International Payments & Transfers<br /><em>Vocabulary: SWIFT, IBAN...</em></li>
            <li><strong>Units 41–45:</strong> Managing Client Relationships<br /><em>Persuasive language...</em></li>
            <li><strong>Units 46–50:</strong> The Role of the Teller & Front Office<br /><em>Role-playing interactions...</em></li>
          </ul>
        </div>
        <div className="mb-8 p-6 bg-purple-50 rounded-xl border-l-4 border-purple-700">
          <h3 className="text-2xl font-bold text-purple-800 mb-3">Phase 3: Investments & Wealth Management (Units 51–75)</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li><strong>Units 51–55:</strong> Stocks & Bonds<br /><em>Difference between stocks and bonds...</em></li>
            <li><strong>Units 56–60:</strong> Mutual Funds & ETFs<br /><em>Risk and return vocabulary.</em></li>
            <li><strong>Units 61–65:</strong> Portfolio Management<br /><em>Giving advice; modal verbs...</em></li>
            <li><strong>Units 66–70:</strong> Retirement Planning<br /><em>Long-term goals and products.</em></li>
            <li><strong>Units 71–75:</strong> Wealth Management<br /><em>High-net-worth clients...</em></li>
          </ul>
        </div>
        <div className="mb-8 p-6 bg-red-50 rounded-xl border-l-4 border-red-700">
          <h3 className="text-2xl font-bold text-red-800 mb-3">Phase 4: Risk, Compliance & Ethics (Units 76–100)</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li><strong>Units 76–80:</strong> Anti-Money Laundering (AML)<br /><em>Detecting suspicious activity...</em></li>
            <li><strong>Units 81–85:</strong> Fraud Detection & Prevention<br /><em>Reporting suspected fraud...</em></li>
            <li><strong>Units 86–90:</strong> Data Privacy & Security<br /><em>Cybersecurity threats...</em></li>
            <li><strong>Units 91–95:</strong> Regulatory Frameworks<br /><em>Basel Accords...</em></li>
            <li><strong>Units 96–100:</strong> Ethical Dilemmas in Finance<br /><em>Debating issues...</em></li>
          </ul>
        </div>
        <div className="mb-8 p-6 bg-yellow-50 rounded-xl border-l-4 border-yellow-700">
          <h3 className="text-2xl font-bold text-yellow-800 mb-3">Phase 5: Financial Technology (Fintech) & Innovation (Units 101–125)</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li><strong>Units 101–105:</strong> Digital Banking & Mobile Payments<br /><em>App features...</em></li>
            <li><strong>Units 106–110:</strong> Blockchain & Cryptocurrency<br /><em>Explaining simply...</em></li>
            <li><strong>Units 111–115:</strong> AI & Machine Learning in Finance<br /><em>AI in credit scoring...</em></li>
            <li><strong>Units 116–120:</strong> Financial Inclusion<br /><em>Tech expanding access...</em></li>
            <li><strong>Units 121–125:</strong> The Future of Banking<br /><em>Predicting trends...</em></li>
          </ul>
        </div>
        <div className="mb-8 p-6 bg-indigo-50 rounded-xl border-l-4 border-indigo-700">
          <h3 className="text-2xl font-bold text-indigo-800 mb-3">Phase 6: Leadership & Capstone Project (Units 126–150)</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li><strong>Units 126–130:</strong> Financial Analysis & Reporting<br /><em>Discussing statements...</em></li>
            <li><strong>Units 131–135:</strong> Business Presentations<br /><em>Formal presentation...</em></li>
            <li><strong>Units 136–140:</strong> Crisis Management & PR<br /><em>Handling media...</em></li>
            <li><strong>Units 141–145:</strong> Negotiation Skills<br /><em>Negotiating deal terms...</em></li>
            <li><strong>Units 146–150:</strong> Final Capstone Project<br /><em>Deliver a final presentation...</em></li>
          </ul>
        </div>
        <div className="p-6 bg-gray-50 rounded-xl border border-dashed border-indigo-300">
          <h4 className="text-xl font-bold text-indigo-700 mb-3">📘 Example Unit: Unit 1 – Introduction to Banking</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li><strong>Exercise 1: Vocabulary & Definitions</strong></li>
            <li><strong>Exercise 2: Present Simple – Routine Processes</strong></li>
            <li><strong>Exercise 3: Professional Roles</strong></li>
            <li><strong>Exercise 4: Short Answer Questions</strong></li>
          </ul>
        </div>
      </div>
    );
  };

  const BankingExamSimulatorPage = ({ course }) => {
    const [examState, setExamState] = useState('progress');
    const [currentSituationIndex, setCurrentSituationIndex] = useState(0);
    const [finalScore, setFinalScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [email, setEmail] = useState("");
    const [subscriptionMessage, setSubscriptionMessage] = useState({ text: "", type: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
      if (BANKING_EXAM_DATA.situations[currentSituationIndex]) {
        const opts = [...BANKING_EXAM_DATA.situations[currentSituationIndex].options];
        setShuffledOptions(opts.sort(() => Math.random() - 0.5));
      }
    }, [currentSituationIndex]);

    const handleDecision = (option) => {
      if (selectedOption) return;
      setFinalScore(prev => prev + option.score);
      setSelectedOption(option);
    };

    const handleNext = () => {
      if (currentSituationIndex < BANKING_EXAM_DATA.situations.length - 1) {
        setCurrentSituationIndex(prev => prev + 1);
        setSelectedOption(null);
      } else {
        setExamState('results');
      }
    };

    const getFeedback = (score) => {
      const pct = (score / BANKING_MAX_SCORE) * 100;
      if (pct >= 90) return { title: "Master Compliance Officer", description: "Your judgment is excellent...", color: "text-green-600", icon: "✅" };
      if (pct >= 70) return { title: "Skilled Banker", description: "You possess a solid understanding...", color: "text-blue-600", icon: "👍" };
      if (pct >= 50) return { title: "Developing Analyst", description: "Your fundamentals are sound...", color: "text-yellow-600", icon: "⚠️" };
      return { title: "Needs Review", description: "Many of your decisions resulted in low scores...", color: "text-red-600", icon: "🛑" };
    };

    const handleSubscription = async () => {
      const emailVal = email.trim();
      if (!emailVal || !emailVal.includes('@')) {
        setSubscriptionMessage({ text: "Please enter a valid email.", type: "yellow" });
        return;
      }
      setIsSubmitting(true);
      setTimeout(() => {
        setSubscriptionMessage({ text: "Success! Check your inbox for your detailed compliance risk report.", type: "green" });
        setEmail("");
      }, 800);
    };

    if (examState === 'results') {
      const feedback = getFeedback(finalScore);
      const pct = Math.round((finalScore / BANKING_MAX_SCORE) * 100);
      const shareText = `I scored ${pct}% on the Banking Professional Simulator!`;
      return (
        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl border border-gray-100 text-center max-w-4xl mx-auto my-10">
          <h2 className="text-5xl font-extrabold text-indigo-600 mb-4">Assessment Complete!</h2>
          <p className="text-3xl font-bold text-gray-800 mb-6">Total Score: {finalScore} / {BANKING_MAX_SCORE} ({pct}%)</p>
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
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-sky-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-sky-600 transition shadow-md">
                <span>Share on X</span>
              </a>
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-blue-700 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-800 transition shadow-md">
                <span>Share on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    const current = BANKING_EXAM_DATA.situations[currentSituationIndex];
    const maxOpt = current.options.reduce((max, opt) => opt.score > max.score ? opt : max, { score: -Infinity });
    return (
      <div className="bg-gray-50 min-h-screen py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
              {BANKING_EXAM_DATA.icon} {BANKING_EXAM_DATA.courseName} Simulator
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Test your compliance knowledge, risk management, and financial ethics.
            </p>
          </div>
          <div className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-indigo-700 mb-2 sm:mb-0">
                Situation {currentSituationIndex + 1}/{BANKING_EXAM_DATA.situations.length}
              </h2>
              <span className="text-2xl font-extrabold text-gray-800 bg-indigo-100 px-4 py-1 rounded-full shadow-inner">
                Score: {finalScore}
              </span>
            </div>
            <p className="text-gray-700 text-xl leading-relaxed mb-8">{current.scenario}</p>
            <div className="space-y-4 mb-8">
              {shuffledOptions.map((opt, idx) => {
                let cls = 'w-full text-left p-4 rounded-xl border border-gray-300 shadow-sm bg-white hover:bg-indigo-50 hover:shadow-md transition duration-150 ease-in-out text-gray-800';
                if (selectedOption) {
                  if (opt.text === selectedOption.text) {
                    if (selectedOption.score >= 100) cls += ' bg-green-600 text-white';
                    else if (selectedOption.score >= 70) cls += ' bg-yellow-500 text-gray-900';
                    else if (selectedOption.score > 25) cls += ' bg-orange-500 text-white';
                    else cls += ' bg-red-600 text-white';
                    cls += ' ring-4 ring-offset-2 ring-opacity-50 ring-indigo-300 scale-[1.01]';
                  } else if (opt.text === maxOpt.text) {
                    cls += ' bg-blue-100 border-blue-500 opacity-90 shadow-md';
                  } else {
                    cls += ' opacity-50';
                  }
                }
                return (
                  <button
                    key={idx}
                    onClick={() => handleDecision(opt)}
                    className={cls}
                    disabled={!!selectedOption}
                  >
                    {opt.text}
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
                  {currentSituationIndex === BANKING_EXAM_DATA.situations.length - 1 ? 'See Final Results' : 'Next Situation'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const BankingDemoSimulatorPage = ({ course }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const handleChoice = (choice) => {
      if (selectedOption) return;
      setSelectedOption(choice);
    };
    const getFeedback = (choice) => {
      switch (choice) {
        case 'restructure':
          return { title: "Strategic and Client-Focused", text: "This is a strong leadership move...", colorClass: "border-green-500 bg-green-100 text-green-900" };
        case 'sell':
          return { title: "Risk Aversion, at a Cost", text: "This action removes the risk...", colorClass: "border-yellow-500 bg-yellow-100 text-yellow-900" };
        case 'liquidate':
          return { title: "Extreme, High-Impact Action", text: "This is a drastic measure...", colorClass: "border-red-500 bg-red-100 text-red-900" };
        case 'wait':
          return { title: "Potentially Fatal Delay", text: "In a rapidly unfolding crisis...", colorClass: "border-purple-500 bg-purple-100 text-purple-900" };
        default:
          return null;
      }
    };
    const feedback = selectedOption ? getFeedback(selectedOption) : null;
    return (
      <div className="flex items-center justify-center min-h-screen p-4" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2940&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div className="absolute top-4 w-full text-center">
          <nav className="space-x-4">
            <a href="https://www.aulice.ca/" className="text-white text-sm font-bold hover:text-yellow-300 transition">Gate</a>
            <button onClick={() => setCurrentPage('Home')} className="text-white text-sm font-bold hover:text-yellow-300 transition">Home</button>
            <button onClick={() => setCurrentPage('AboutUs')} className="text-white text-sm font-bold hover:text-yellow-300 transition">About</button>
            <button onClick={() => setCurrentPage('PricingPlans')} className="text-white text-sm font-bold hover:text-yellow-300 transition">Pricing</button>
            <button onClick={() => setCurrentPage('Lexicon')} className="text-white text-sm font-bold hover:text-yellow-300 transition">Lexicon</button>
          </nav>
        </div>
        <div className="bg-gray-900/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 max-w-2xl w-full text-center text-white">
          <div className="bg-blue-800 rounded-t-3xl -mt-8 -mx-8 px-8 py-6 shadow-xl border-b-4 border-white">
            <h2 className="text-xl font-bold tracking-wide">Financial Portfolio Crisis</h2>
          </div>
          <div className="p-4 mt-6">
            <h1 className="text-3xl font-extrabold text-white mb-2">📊 Sudden Market Volatility</h1>
            <p className="text-lg text-gray-300 mb-6">You are the CFO of a major financial institution...</p>
            <div className="bg-gray-800 p-6 rounded-2xl shadow-inner text-left mb-6 border-l-4 border-white">
              <h3 className="text-xl font-bold text-blue-400 mb-2">📉 Situation</h3>
              <p className="text-gray-300">The entire energy sector is facing a liquidity crisis...</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button onClick={() => handleChoice('restructure')} disabled={!!selectedOption} className={`w-full py-3 px-6 font-bold rounded-xl text-lg shadow-lg transition ${selectedOption === 'restructure' ? 'bg-green-700' : 'bg-green-600 hover:bg-green-700'} text-white`}>🤝 Restructure client loans</button>
              <button onClick={() => handleChoice('sell')} disabled={!!selectedOption} className={`w-full py-3 px-6 font-bold rounded-xl text-lg shadow-lg transition ${selectedOption === 'sell' ? 'bg-yellow-700' : 'bg-yellow-600 hover:bg-yellow-700'} text-white`}>📉 Sell off the high-risk portfolio</button>
              <button onClick={() => handleChoice('liquidate')} disabled={!!selectedOption} className={`w-full py-3 px-6 font-bold rounded-xl text-lg shadow-lg transition ${selectedOption === 'liquidate' ? 'bg-red-700' : 'bg-red-600 hover:bg-red-700'} text-white`}>🚨 Immediately liquidate assets</button>
              <button onClick={() => handleChoice('wait')} disabled={!!selectedOption} className={`w-full py-3 px-6 font-bold rounded-xl text-lg shadow-lg transition ${selectedOption === 'wait' ? 'bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'} text-white`}>⏱️ Wait for more data analysis</button>
            </div>
            {feedback && (
              <div className={`mt-8 p-6 rounded-2xl text-left shadow-xl border-l-4 ${feedback.colorClass}`}>
                <h4 className="text-xl font-bold mb-2">💡 {feedback.title}</h4>
                <p className="font-semibold">{feedback.text}</p>
              </div>
            )}
          </div>
        </div>
        <footer className="absolute bottom-4 text-white text-xs text-center font-light w-full">
          <p>© 2025 Aulice Academy.</p>
        </footer>
      </div>
    );
  };

  // --- Course Card ---
  const CourseCard = ({ course }) => {
    const colorStyle = COLOR_MAP[course.id] || {};
    const isPro = course.type === 'pro';
    const handleButtonClick = (action) => {
      if (isPro) {
        if (action === 'ENROLL') {
          setCurrentPage('PricingPlans');
          setActiveCourse(null);
        } else if (action === 'Demo Simulator') {
          setActiveCourse(course);
          setCurrentPage('DemoQuizForm');
        } else if (action === 'Exam Simulator') {
          setActiveCourse(course);
          setCurrentPage('ExamSimulator');
        } else if (['Pathway', 'Scenario', 'Unit 1'].includes(action)) {
          setActiveCourse({ ...course, initialTab: action });
          setCurrentPage('CourseDetails');
        }
      } else {
        if (action === 'Form') {
          setActiveCourse(course);
          setCurrentPage('CustomForm');
        } else if (action === 'Quiz') {
          setActiveCourse(course);
          setCurrentPage('DemoQuizForm');
        }
      }
    };
    const SimulatorChip = ({ label, action, colorClass }) => (
      <button
        onClick={() => handleButtonClick(action)}
        className={`px-3 py-1 text-sm font-semibold rounded-full transition duration-150 shadow-sm ${colorClass} hover:opacity-90`}
      >
        {label}
      </button>
    );
    return (
      <div className="bg-white rounded-xl p-5 shadow-lg border-t-4 border-indigo-600 transition duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <div className={`w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full text-2xl text-white ${colorStyle.iconBg}`}>
          {course.logo}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-1 text-center">{course.title}</h3>
        <p className="text-sm text-gray-500 mb-4 h-12 overflow-hidden text-center">{course.desc}</p>
        {isPro ? (
          <div className="space-y-3 mt-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <SimulatorChip label="▶️ Demo Simulator" action="Demo Simulator" colorClass="bg-yellow-100 text-yellow-800" />
              <SimulatorChip label="📝 Exam Simulator" action="Exam Simulator" colorClass="bg-blue-100 text-blue-800" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => handleButtonClick('Pathway')} className="px-2 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-medium hover:bg-indigo-200 transition">📘 Pathway</button>
              <button onClick={() => handleButtonClick('Scenario')} className="px-2 py-2 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition">🧩 Scenario</button>
              <button onClick={() => handleButtonClick('Unit 1')} className="px-2 py-2 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium hover:bg-purple-200 transition">🧪 Unit 1</button>
            </div>
            <button 
              onClick={() => handleButtonClick('ENROLL')} 
              className="w-full py-3 bg-red-600 text-white rounded-lg text-lg font-extrabold hover:bg-red-700 transition shadow-lg mt-2"
            >
              💰 ENROLL NOW
            </button>
          </div>
        ) else {
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button onClick={() => handleButtonClick('Form')} className="px-3 py-2 bg-red-600 text-white rounded-md text-xs font-medium hover:bg-red-700 transition">🚀 Start Journey</button>
            <button onClick={() => handleButtonClick('Quiz')} className="px-3 py-2 bg-yellow-400 text-gray-800 rounded-md text-xs font-medium hover:bg-yellow-500 transition">🧠 Play Quiz</button>
          </div>
        )}
      </div>
    );
  };

  // --- Nav Button ---
  const NavButton = ({ title, target, primary = false }) => (
    <button
      className={`px-4 py-2 mx-1 rounded-full text-sm font-medium transition duration-300 ${
        primary ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-600 shadow-md' : 'text-gray-100 hover:text-yellow-500'
      }`}
      onClick={() => {
        setCurrentPage(target);
        setActiveCourse(null);
      }}
    >
      {title}
    </button>
  );

  // --- Auth Page ---
  const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [authError, setAuthError] = useState('');
    const handleAuthAction = async () => {
      setAuthError('');
      if (!email || !password) {
        setAuthError("Email and password are required.");
        return;
      }
      try {
        if (isLogin) await signInWithEmailAndPassword(auth, email, password);
        else await createUserWithEmailAndPassword(auth, email, password);
        setEmail('');
        setPassword('');
      } catch (error) {
        setAuthError(error.message.replace('Firebase: ', ''));
      }
    };
    const handleSignOut = async () => {
      try {
        await signOut(auth);
        setCurrentPage('Home');
      } catch (error) {
        console.error("Sign Out Error:", error);
      }
    };
    return (
      <div className="p-6 md:p-12 max-w-lg mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
            {userIsAuthenticated ? 'My Profile' : (isLogin ? 'Student Login' : 'Create Account')}
        </h1>
        {userIsAuthenticated ? (
          <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-indigo-600">
            <p className="text-lg font-semibold mb-4 text-gray-800">
                Welcome, <span className="text-indigo-600 font-bold">{userEmail}</span>
            </p>
            <p className="text-sm text-gray-500 mb-6 break-words">
                Your Permanent User ID: <span className="font-mono bg-gray-100 p-1 rounded text-xs">{userId}</span>
            </p>
            <p className="mb-6 text-gray-700">
                You are currently signed in with a permanent account. Your course progress, lexicon entries, and exam scores are securely linked to this ID in Firestore.
            </p>
            <button 
              onClick={handleSignOut}
              className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition shadow-md"
            >
              Sign Out Securely
            </button>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-yellow-500">
            <p className="text-sm text-gray-500 mb-6">
                You are currently signed in as a guest (ID: <span className="font-mono bg-gray-100 p-1 rounded text-xs">{userId}</span>). Please log in or sign up to save your progress.
            </p>
            {authError && <p className="text-red-600 bg-red-100 p-3 rounded-lg mb-4 text-sm font-medium">{authError}</p>}
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
            <button onClick={handleAuthAction} className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-md mb-4">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
            <button onClick={() => { setIsLogin(!isLogin); setAuthError(''); }} className="w-full text-indigo-600 hover:text-indigo-800 text-sm font-medium transition">
              {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
            </button>
          </div>
        )}
      </div>
    );
  };

  // --- Course Details Page ---
  const CourseDetailsPage = () => {
    if (!activeCourse) return <h2 className="p-6 text-xl">Course not found.</h2>;
    const [selectedContent, setSelectedContent] = useState(activeCourse.initialTab || 'Pathway');
    const courseStyle = COLOR_MAP[activeCourse.id];
    const renderContent = () => {
      if (activeCourse.id === 'banking') {
        switch (selectedContent) {
          case 'Pathway': return <BankingPathwayView course={activeCourse} />;
          case 'Scenario': return <BankingScenarioView course={activeCourse} />;
          case 'Unit 1': return <BankingUnit1View course={activeCourse} />;
          default: return <BankingPathwayView course={activeCourse} />;
        }
      } else if (activeCourse.id === 'logistics') {
        switch (selectedContent) {
          case 'Pathway': return <LogisticsPathwayView course={activeCourse} />;
          case 'Scenario': return <LogisticsScenarioView course={activeCourse} />;
          case 'Unit 1': return <LogisticsUnit1View course={activeCourse} />;
          default: return <LogisticsPathwayView course={activeCourse} />;
        }
      } else {
        return <div className="p-6">Generic content for {activeCourse.title}</div>;
      }
    };
    return (
      <div className="p-6 md:p-12 max-w-6xl mx-auto">
        <div className={`p-6 rounded-2xl shadow-xl mb-8 ${courseStyle.bg} ${courseStyle.text}`}>
          <h1 className="text-4xl font-extrabold">{activeCourse.logo} {activeCourse.title} Mastery Track</h1>
          <p className={`mt-2 text-lg ${courseStyle.accent || 'text-gray-200'}`}>{activeCourse.desc}</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 p-4 bg-white rounded-xl shadow-lg border-b-4 border-indigo-400">
          <div className="flex flex-wrap gap-2 order-2 md:order-1">
            {['Pathway', 'Scenario', 'Unit 1'].map((tab) => (
              <button
                key={tab}
                className={`px-5 py-2 rounded-xl font-bold transition duration-200 shadow-md ${
                  selectedContent === tab
                    ? 'bg-indigo-600 text-white scale-[1.05]'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedContent(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 order-1 md:order-2 w-full md:w-auto">
            <button className="px-4 py-2 rounded-xl font-medium transition duration-200 text-white bg-red-600 hover:bg-red-700 shadow-xl font-extrabold flex-grow" onClick={() => setCurrentPage('PricingPlans')}>
              ENROLL NOW
            </button>
            <button className="px-3 py-2 rounded-xl font-medium transition duration-200 text-gray-900 bg-yellow-400 hover:bg-yellow-500 shadow-md text-sm" onClick={() => setCurrentPage('DemoQuizForm')}>
              Demo Sim
            </button>
            <button className="px-3 py-2 rounded-xl font-medium transition duration-200 text-white bg-blue-500 hover:bg-blue-600 shadow-md text-sm" onClick={() => setCurrentPage('ExamSimulator')}>
              Exam Sim
            </button>
          </div>
        </div>
        <div className="min-h-[500px] bg-gray-50 p-6 rounded-xl shadow-2xl border border-gray-200">
          {renderContent()}
        </div>
      </div>
    );
  };

  // --- Other Pages ---
  const HomePage = () => (
    <div className="p-4 md:p-8">
      <header className="text-center p-10 md:p-16 bg-[#0056b3] text-white border-b-6 border-yellow-500" style={{ borderBottomWidth: '6px', borderBottomColor: '#FFD700' }}>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">🎓 Aulice ProMastery Portal</h1>
        <p className="text-lg md:text-xl opacity-90 max-w-4xl mx-auto">
            Professional Language Mastery: English for High-Stakes Scenarios
        </p>
        <p className="mt-4 text-xs text-gray-300">
          User ID: <span className="font-mono bg-white bg-opacity-20 p-1 rounded-md">{userId || 'Loading...'}</span>
        </p>
      </header>
      <div className="max-w-7xl mx-auto p-4 md:p-8 -mt-16 sm:-mt-12 relative z-0">
        <h2 className="text-center text-3xl font-bold text-indigo-700 mb-8 pt-4">📚 Our Specialized Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {COURSES_DATA.map(course => <CourseCard key={course.id} course={course} />)}
        </div>
        <div className="text-center mt-12 border-t pt-8 border-gray-300">
          <h3 className="text-2xl font-bold text-gray-700 mb-4">Supporting Portals</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setCurrentPage('Lexicon')} className="text-lg text-indigo-600 hover:text-indigo-800 font-semibold transition">📘 Lexicon</button>
            <a href="https://aulislab.netlify.app" target="_blank" rel="noopener noreferrer" className="text-lg text-indigo-600 hover:text-indigo-800 font-semibold transition">🧩 Aulice Lab</a>
            <a href="https://teacher-aulice.netlify.app" target="_blank" rel="noopener noreferrer" className="text-lg text-indigo-600 hover:text-indigo-800 font-semibold transition">👨‍🏫 Teacher Dashboard</a>
          </div>
        </div>
      </div>
    </div>
  );

  const PricingPlansPage = () => (
    <div className="p-12 text-center max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold text-indigo-700 mb-4">Choose Your Mastery Plan</h2>
      <p className="text-lg text-gray-600 mb-10">Select the option that best fits your professional goals and begin your enrollment.</p>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-500">
          <h3 className="text-2xl font-bold mb-2">Monthly</h3>
          <p className="text-4xl font-extrabold text-gray-900 mb-6">$49/mo</p>
          <p className="text-sm text-gray-500 mb-6">Full access, pay as you go. Cancel anytime.</p>
          <button className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition">Select Monthly</button>
        </div>
        <div className="bg-indigo-600 p-6 rounded-xl shadow-2xl border-t-4 border-red-500 transform scale-[1.05]">
          <h3 className="text-2xl font-bold text-white mb-2">Annual (Best Value)</h3>
          <p className="text-4xl font-extrabold text-yellow-400 mb-6">$499/yr</p>
          <p className="text-sm text-indigo-200 mb-6">Save $89! Best for long-term mastery.</p>
          <button className="w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition shadow-xl">Select Annual</button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-gray-300">
          <h3 className="text-2xl font-bold mb-2">Team License</h3>
          <p className="text-4xl font-extrabold text-gray-900 mb-6">Custom Quote</p>
          <p className="text-sm text-gray-500 mb-6">For 5+ users. Includes dashboard access.</p>
          <button className="w-full py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition">Request Demo</button>
        </div>
      </div>
    </div>
  );

  const LexiconPage = () => (<div className="p-12 text-center">📘 Aulice Lexicon — Add words, master professional language.</div>);
  const CustomFormPage = () => (<div className="p-12 text-center">Custom Track Form — Tell us your goals.</div>);
  const DemoQuizFormPage = () => {
    if (!activeCourse) return <div className="p-12 text-center">No course selected.</div>;
    if (activeCourse.id === 'banking') return <BankingDemoSimulatorPage course={activeCourse} />;
    if (activeCourse.id === 'logistics') return <LogisticsDemoSimulatorPage course={activeCourse} />;
    return <div className="p-12 text-center">Demo for {activeCourse.title}</div>;
  };
  const ExamSimulatorPage = () => {
    if (!activeCourse) return <div className="p-12 text-center">No course selected.</div>;
    if (activeCourse.id === 'banking') return <BankingExamSimulatorPage course={activeCourse} />;
    if (activeCourse.id === 'logistics') return <LogisticsExamSimulatorPage course={activeCourse} />;
    return <div className="p-12 text-center">Full exam for {activeCourse.title} (enrollment required)</div>;
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Home': return <HomePage />;
      case 'Profile': return <AuthPage />;
      case 'AboutUs': return <div className="p-12 text-center"><h2>About Us</h2></div>;
      case 'Contact': return <div className="p-12 text-center"><h2>Contact</h2></div>;
      case 'PricingPlans': return <PricingPlansPage />;
      case 'Lexicon': return <LexiconPage />;
      case 'CourseDetails': return <CourseDetailsPage />;
      case 'DemoQuizForm': return <DemoQuizFormPage />;
      case 'ExamSimulator': return <ExamSimulatorPage />;
      case 'CustomForm': return <CustomFormPage />;
      default: return <HomePage />;
    }
  };

  if (!isAuthReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 rounded-xl bg-white shadow-lg">
          <svg className="animate-spin h-8 w-8 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600 font-medium">Connecting to Aulice Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {showNotification && (
        <NotificationModal 
          message={showNotification.message} 
          type={showNotification.type}
          onClose={() => setShowNotification(null)} 
        />
      )}
      <nav className="w-full bg-[#0056b3] shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <button className="text-xl font-extrabold text-yellow-400 hover:text-yellow-500 transition" onClick={() => setCurrentPage('Home')}>
            Aulice
          </button>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <NavButton title="Courses" target="Home" />
            <NavButton title="Pricing" target="PricingPlans" />
            <NavButton title="About" target="AboutUs" />
            <button
              className="px-4 py-2 ml-4 rounded-full text-sm font-semibold transition duration-300 bg-white text-indigo-700 hover:bg-gray-100 shadow-md flex items-center"
              onClick={() => setCurrentPage('Profile')}
            >
              {userIsAuthenticated ? 'My Profile' : 'Sign In'}
            </button>
          </div>
        </div>
      </nav>
      <div className="flex-grow pt-8 pb-12">{renderPage()}</div>
      <footer className="w-full bg-gray-900 text-gray-400 p-6">
        <div className="max-w-7xl mx-auto text-center text-sm">
          <p>&copy; 2025 Aulice ProMastery Portal. All rights reserved.</p>
          <p>Your secure ID: {userId}</p>
        </div>
      </footer>
    </div>
  );
}