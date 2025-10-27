// src/components/HospitalityExamSimulatorPage.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HOSPITALITY_EXAM_DATA = {
  courseName: "Hotel & Hospitality Professional",
  icon: "🏨",
  situations: [
    {
      id: 1,
      scenario: "A guest arrives at 3 AM, visibly upset, claiming their online reservation for a guaranteed late check-in was not honored, and their room was given away.",
      options: [
        { text: "Apologize sincerely, immediately arrange a comparable or upgraded room at a nearby partner hotel at your expense, and offer a full refund or complimentary night.", score: 125, outcome: "Recovering from a service failure requires immediate, generous action to rebuild trust. The cost is far less than the damage of a negative review or lost loyalty." },
        { text: "Explain that the front desk staff likely made an error, but all rooms are full, and offer a discount on their next stay.", score: 50, outcome: "An apology without immediate resolution is insufficient for a guaranteed reservation failure." },
        { text: "Check the system again and, if the reservation is confirmed, offer to put them in the manager's on-call room if available.", score: 100, outcome: "This is a good immediate solution, but should be paired with a tangible goodwill gesture (e.g., complimentary breakfast, room service)." },
        { text: "Tell the guest to file a formal complaint with corporate and that you will look into it tomorrow.", score: 0, outcome: "Deferring the issue until 'tomorrow' is a complete failure of service recovery for a guest in immediate distress." }
      ]
    },
    {
      id: 2,
      scenario: "During a busy breakfast service, a guest complains that their eggs are cold and the coffee is weak, and they are now late for a critical business meeting.",
      options: [
        { text: "Immediately apologize, offer to remake their entire breakfast fresh and fast, and provide a to-go box so they can take it with them to their meeting.", score: 125, outcome: "Speed and a complete solution are key. Offering a to-go option shows empathy for their time pressure." },
        { text: "Offer them a complimentary coffee refill and a discount on their room rate for the inconvenience.", score: 75, outcome: "This addresses the complaint but doesn't solve their immediate problem of being late." },
        { text: "Explain that the kitchen is very busy and it's hard to maintain perfect temperature during peak hours.", score: 25, outcome: "Explaining the reason is not an apology and shifts blame, worsening the guest's experience." },
        { text: "Tell them you will speak to the chef, but their breakfast cannot be remade as it would delay other guests.", score: 50, outcome: "Prioritizing other guests over a service recovery is poor judgment; one guest's critical need should be met." }
      ]
    },
    {
      id: 3,
      scenario: "You overhear a staff member speaking rudely about a guest's accent and mannerisms in the staff break room.",
      options: [
        { text: "Immediately address the staff member privately, reinforcing the hotel's policy on respect and cultural sensitivity, and require them to attend a refresher training session.", score: 125, outcome: "Zero tolerance for discriminatory behavior is essential. Immediate, private correction and mandatory training are the correct steps." },
        { text: "Ignore it, as it was just a private conversation and not directed at the guest.", score: 0, outcome: "Allowing this behavior to go unchallenged creates a toxic culture and risks future incidents." },
        { text: "Mention the incident in the next team meeting as a general reminder about professionalism, without naming the staff member.", score: 75, outcome: "A general reminder is better than nothing, but fails to hold the specific individual accountable." },
        { text: "Report the staff member directly to HR for disciplinary action without speaking to them first.", score: 50, outcome: "While serious, a first offense often warrants a direct, corrective conversation before formal HR involvement." }
      ]
    },
    {
      id: 4,
      scenario: "A guest with a severe nut allergy has clearly noted this on their reservation and during check-in. At dinner, they are served a dish containing a nut-based sauce.",
      options: [
        { text: "Immediately remove the dish, apologize profusely, ensure the guest is not having a reaction, and have the kitchen prepare a new, verified safe meal under direct supervision. Report the incident to management.", score: 125, outcome: "This is a life-threatening situation. Immediate action, verification, and reporting are non-negotiable." },
        { text: "Apologize and offer to replace the dish with a different menu item.", score: 25, outcome: "Simply replacing the dish without verifying its safety or checking on the guest's health is dangerously negligent." },
        { text: "Assure the guest that the sauce only contains a trace amount and is likely safe.", score: 0, outcome: "Minimizing a known allergen is a severe breach of duty and could have fatal consequences." },
        { text: "Blame the kitchen for not checking the notes and promise it won't happen again.", score: 50, outcome: "While the kitchen is at fault, the immediate focus must be on the guest's safety, not assigning blame." }
      ]
    },
    {
      id: 5,
      scenario: "A VIP guest is checking in, and the room they were promised (a specific suite with a view) is not ready due to a housekeeping delay.",
      options: [
        { text: "Upgrade them to the best available ready room, offer a personal apology from the manager, and provide an immediate, significant amenity (e.g., bottle of champagne, dinner for two).", score: 125, outcome: "VIPs expect flawless service. A proactive, generous upgrade and personal touch are required to maintain their loyalty." },
        { text: "Ask them to wait in the lounge with a complimentary drink while the room is prepared.", score: 75, outcome: "This is acceptable for a short delay, but for a VIP, an immediate alternative is preferred." },
        { text: "Explain the delay is due to an understaffed housekeeping team and offer a 10% discount on their stay.", score: 25, outcome: "Explaining the internal problem and offering a small discount is inadequate for a VIP who expects their specific request to be met." },
        { text: "Give them the room as-is and promise housekeeping will finish while they are at dinner.", score: 0, outcome: "Handing over an unclean or unprepared room to a VIP is a catastrophic service failure." }
      ]
    },
    {
      id: 6,
      scenario: "A guest posts a negative review online, claiming their room was dirty and the staff was unfriendly, but your internal records show the room passed inspection and the staff member has no prior complaints.",
      options: [
        { text: "Respond publicly with a sincere apology, state that this does not reflect your standards, and invite them to contact you directly so you can make it right.", score: 125, outcome: "A public, professional response shows you take feedback seriously, while moving the conversation offline allows for a personalized resolution." },
        { text: "Publicly defend your hotel, stating your records show the room was clean and the staff is well-trained.", score: 0, outcome: "Arguing with a guest online is a public relations disaster and validates their negative experience." },
        { text: "Ignore the review, as it is factually incorrect and responding might draw more attention to it.", score: 50, outcome: "Ignoring negative reviews signals to future guests that you don't care about feedback." },
        { text: "Contact the guest privately to ask them to remove the review in exchange for a future discount.", score: 25, outcome: "Asking for a review removal is against most platform policies and appears dishonest." }
      ]
    },
    {
      id: 7,
      scenario: "During a major conference, the hotel's Wi-Fi network crashes, affecting hundreds of business guests who need to present or connect remotely.",
      options: [
        { text: "Immediately inform all affected guests via in-room calls and lobby announcements, provide a clear timeline for resolution, and offer immediate alternatives (e.g., use of business center computers, mobile hotspots).", score: 125, outcome: "Transparent communication and immediate, practical alternatives are critical to managing a large-scale service failure." },
        { text: "Have the IT team work on it quietly and hope it's fixed before too many guests notice.", score: 0, outcome: "Silence will lead to mass frustration and a flood of complaints once the issue is discovered." },
        { text: "Offer a small credit to each guest's room for the inconvenience once the issue is resolved.", score: 75, outcome: "Compensation is good, but must be paired with proactive communication during the crisis." },
        { text: "Blame the internet service provider and assure guests it's out of your control.", score: 50, outcome: "While true, guests expect you to manage the situation, not just explain it." }
      ]
    },
    {
      id: 8,
      scenario: "A guest asks for a late checkout at 4 PM, but their room is needed for a new arrival with a pre-assigned room in the same category.",
      options: [
        { text: "Offer to store their luggage securely and provide full access to hotel facilities (pool, gym, lounge) until their transportation arrives, even if the room is not available.", score: 125, outcome: "This provides a high-value solution that respects both the departing and arriving guest's needs." },
        { text: "Grant the late checkout and move the new arrival to a different room, even if it's in a less desirable location.", score: 75, outcome: "This solves the problem but may create a new issue with the arriving guest." },
        { text: "Explain that late checkouts are not possible due to a full house and offer a 10% discount on their next stay.", score: 50, outcome: "A discount is a poor substitute for the requested service and feels like a brush-off." },
        { text: "Tell them the standard checkout time is 12 PM and they should have planned accordingly.", score: 0, outcome: "This is inflexible and rude, guaranteeing a negative review." }
      ]
    },
    {
      id: 9,
      scenario: "You see a colleague accept a large cash tip from a guest in exchange for bypassing the standard check-in procedure and giving them a room without a credit card on file.",
      options: [
        { text: "Report the incident immediately to your supervisor or the hotel's ethics hotline, as it is a serious breach of security and financial policy.", score: 125, outcome: "Accepting cash to bypass procedures is a major security and financial risk. Reporting it is a duty to the hotel and other guests." },
        { text: "Confront your colleague directly and tell them to return the money and follow procedure.", score: 50, outcome: "Direct confrontation is brave, but may be unsafe or ineffective; official channels are more appropriate." },
        { text: "Ignore it, as it's a common practice and the guest seemed happy.", score: 0, outcome: "Ignoring a clear policy violation enables theft and security breaches." },
        { text: "Ask your colleague for a cut of the tip to keep quiet.", score: 25, outcome: "This is complicity in the breach and a fireable offense." }
      ]
    },
    {
      id: 10,
      scenario: "A family with young children is checking in, and the children are loudly running through the lobby, disturbing other guests.",
      options: [
        { text: "Welcome the family warmly, discreetly provide them with a welcome pack for the children (coloring books, snacks), and gently suggest quiet play areas in the hotel.", score: 125, outcome: "Proactive, empathetic service prevents the issue from escalating and makes the family feel valued, not shamed." },
        { text: "Ask the parents to control their children immediately, as their behavior is unacceptable.", score: 25, outcome: "This is confrontational and will make the family feel unwelcome." },
        { text: "Ignore the behavior to avoid conflict.", score: 50, outcome: "This may upset other guests who expect a peaceful environment." },
        { text: "Offer to have a staff member take the children to the kids' club while the parents check in.", score: 100, outcome: "This is an excellent solution if a kids' club is available, but the welcome pack is a more universally applicable first step." }
      ]
    }
  ]
};

const MAX_SCORE = HOSPITALITY_EXAM_DATA.situations.reduce((sum, s) => sum + Math.max(...s.options.map(o => o.score)), 0);

const HospitalityExamSimulatorPage = ({ course }) => {
  const [examState, setExamState] = useState('progress');
  const [currentSituationIndex, setCurrentSituationIndex] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [email, setEmail] = useState("");
  const [subscriptionMessage, setSubscriptionMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const currentOptions = HOSPITALITY_EXAM_DATA.situations[currentSituationIndex].options;
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
    if (currentSituationIndex < HOSPITALITY_EXAM_DATA.situations.length - 1) {
      setCurrentSituationIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
    } else {
      setExamState('results');
    }
  };

  const getFeedback = (score) => {
    const percentage = (score / MAX_SCORE) * 100;
    if (percentage >= 90) return { title: "Hospitality Excellence", description: "Your decisions reflect a masterful balance of guest empathy, operational efficiency, and brand protection. You turn problems into loyalty." };
    if (percentage >= 70) return { title: "Skilled Guest Relations Manager", description: "You have a strong grasp of service recovery and guest needs, but some responses missed the most proactive or generous resolution." };
    if (percentage >= 50) return { title: "Developing Service Professional", description: "Your fundamentals are sound, but you need review on immediate crisis response and the importance of over-delivering in recovery situations." };
    return { title: "Service Standards Review Required", description: "Your responses indicated a need for fundamental review of guest recovery protocols, cultural sensitivity, and proactive problem-solving." };
  };

  const handleSubscription = () => {
    if (!email || !email.includes('@')) {
      setSubscriptionMessage({ text: "Please enter a valid email address.", type: "yellow" });
      return;
    }
    setSubscriptionMessage({ text: "Success! Check your inbox for your detailed hospitality protocol guide.", type: "green" });
    setIsSubmitting(true);
  };

  if (examState === 'results') {
    const feedback = getFeedback(finalScore);
    const percentage = Math.round((finalScore / MAX_SCORE) * 100);
    const shareText = `I scored ${percentage}% on the ${HOSPITALITY_EXAM_DATA.courseName} Simulator! Test your guest service skills here.`;

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

  const currentSituation = HOSPITALITY_EXAM_DATA.situations[currentSituationIndex];
  const maxScoreOption = currentSituation.options.reduce((max, opt) => opt.score > max.score ? opt : max, { score: -Infinity });

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-center">
          {HOSPITALITY_EXAM_DATA.icon} {HOSPITALITY_EXAM_DATA.courseName} Simulator
        </h1>
        <p className="text-lg text-gray-600 mb-10 text-center">
          Test your critical decision-making in Guest Service, Crisis Management, and Cultural Sensitivity.
        </p>
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-200">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-blue-700">
              Situation {currentSituationIndex + 1}/{HOSPITALITY_EXAM_DATA.situations.length}
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
                {currentSituationIndex === HOSPITALITY_EXAM_DATA.situations.length - 1 ? 'See Final Results' : 'Next Situation'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalityExamSimulatorPage;