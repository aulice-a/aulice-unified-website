import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Data for the exercises ---
// Extracting question data into an array for mapping.
const parts = [
  {
    partTitle: "Part 1: Client Relations & Ethics",
    questions: [
      { id: 'q1', title: "1. Your client admits guilt off-record but insists you win at all costs. How do you respond?", prompt: "Think about: Duty to the court vs. loyalty to the client." },
      { id: 'q2', title: "2. A junior lawyer makes a filing error that could cost the case. How do you correct it?", prompt: "Think about: Accountability and team leadership." },
      { id: 'q3', title: "3. A client wants to withhold key evidence that is damaging to their case. How do you advise them?", prompt: "Think about: The rules of discovery and consequences of withholding evidence." },
      { id: 'q4', title: "4. You discover a conflict of interest with a new client. How do you professionally decline to represent them?", prompt: "Think about: Explaining the conflict without revealing confidential information." },
      { id: 'q5', title: "5. A client is frustrated with the slow pace of the legal system and demands immediate action. How do you manage their expectations?", prompt: "Think about: Explaining legal timelines and processes clearly." },
      { id: 'q6', title: "6. You are conducting a client interview. The client is rambling and off-topic. How do you politely redirect the conversation?", prompt: "Think about: Keeping the interview focused and efficient." },
      { id: 'q7', title: "7. A client is a minor and is requesting legal advice without their parents' consent. How do you handle this?", prompt: "Think about: Legal age of consent, confidentiality, and your ethical obligations." },
      { id: 'q8', title: "8. A potential client's case lacks merit. How do you professionally explain this and decline to take the case?", prompt: "Think about: Being honest but compassionate." }
    ]
  },
  {
    partTitle: "Part 2: Negotiation & Dispute Resolution",
    questions: [
      { id: 'q9', title: "9. You are in a negotiation and the opposing counsel makes an unreasonable offer. How do you respond?", prompt: "Think about: Maintaining a professional tone while rejecting the offer." },
      { id: 'q10', title: "10. The opposing party in a negotiation is becoming aggressive. How do you de-escalate the situation?", prompt: "Think about: Using calm, professional language to regain control." },
      { id: 'q11', title: "11. How do you present a settlement offer to your client and explain the pros and cons?", prompt: "Think about: Balancing financial and non-financial aspects." },
      { id: 'q12', title: "12. You are asked to mediate a dispute between two parties. How do you explain your role and set the ground rules?", prompt: "Think about: Being neutral and guiding the conversation." },
      { id: 'q13', title: "13. A negotiation reaches an impasse. What strategic options do you propose to move forward?", prompt: "Think about: Suggesting new terms or a different approach." }
    ]
  },
  {
    partTitle: "Part 3: Courtroom & Public Speaking",
    questions: [
       { id: 'q14', title: "14. You are conducting a cross-examination. A witness is being evasive. How do you phrase your questions to get a direct answer?", prompt: "Think about: Using precise language and staying focused." },
       { id: 'q15', title: "15. You are delivering an opening statement. How do you present a complex case so a jury can understand?", prompt: "Think about: Using storytelling and clear language." },
       { id: 'q16', title: "16. A judge asks you to clarify a legal point. How do you respond confidently and accurately?", prompt: "Think about: Citing precedents and statutes." },
       { id: 'q17', title: "17. You are defending a public figure, and the media is present. How do you handle a post-verdict press conference?", prompt: "Think about: Managing the message and protecting your client's image." },
       { id: 'q18', title: "18. You are presenting a summary argument. How do you make your final points memorable and persuasive?", prompt: "Think about: Re-stating key arguments and ending strong." },
       { id: 'q19', title: "19. A witness starts to cry on the stand. How do you react professionally and continue your examination?", prompt: "Think about: Maintaining decorum while showing empathy." },
       { id: 'q20', title: "20. A juror seems confused by a piece of evidence. How do you re-explain it clearly?", prompt: "Think about: Using simpler terms and analogies." }
    ]
  },
  {
    partTitle: "Part 4: Crisis & Compliance",
    questions: [
        { id: 'q21', title: "21. A major client faces a PR crisis. How do you advise them on public statements and legal strategy?", prompt: "Think about: Balancing legal liability and public perception." },
        { id: 'q22', title: "22. Your company is under investigation by a regulatory body. How do you coordinate internal teams for compliance?", prompt: "Think about: Clear communication and documentation." },
        { id: 'q23', title: "23. A journalist asks you to comment on a confidential case. How do you decline professionally?", prompt: "Think about: Using \"no comment\" without admitting guilt." },
        { id: 'q24', title: "24. A team member has leaked confidential information. How do you address it internally?", prompt: "Think about: Legal and professional repercussions." },
        { id: 'q25', title: "25. You discover a potential legal risk in a new business venture. How do you present concerns to the board?", prompt: "Think about: Risk assessment and mitigation strategies." },
        { id: 'q26', title: "26. You are drafting a new policy for your firm. How do you ensure it's clear and legally compliant?", prompt: "Think about: Avoiding jargon and ambiguity." },
        { id: 'q27', title: "27. A client is requesting an illegal action. How do you firmly refuse while maintaining the relationship?", prompt: "Think about: Citing ethical guidelines and boundaries." },
        { id: 'q28', title: "28. You are advising a company on a data breach. How do you communicate urgency to executives?", prompt: "Think about: Immediate actions and long-term obligations." },
        { id: 'q29', title: "29. How do you explain a complex legal term to a non-legal colleague?", prompt: "Think about: Using analogies and real-world examples." },
        { id: 'q30', title: "30. A colleague asks you to sign off on a flawed document. How do you handle it without conflict?", prompt: "Think about: Expressing concern professionally and suggesting a solution." }
    ]
  }
];

// --- Helper Component for <style> ---
const PageStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    /* body styles applied to root div */
    .root-div {
      font-family: 'Segoe UI', sans-serif;
      background: #f7f9fc;
      color: #2c3e50;
      line-height: 1.6;
    }
    header {
      text-align: center;
      padding: 40px 20px;
      background: #008080; /* Teal */
      color: white;
      position: relative; /* Keep relative for nav positioning */
    }
    header h1 {
      font-size: 28px;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.4);
    }
    .container {
      max-width: 900px;
      margin: 40px auto;
      padding: 30px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.1);
    }
    h2, h3 {
      margin: 20px 0 10px;
      color: #008080; /* Teal */
    }
    p, ul, ol {
      margin: 10px 0;
    }
    .btn {
      display: inline-block;
      padding: 10px 20px;
      background: #008080; /* Teal */
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      margin: 10px 0;
      font-size: 14px;
      font-weight: bold;
    }
    input[type="text"], textarea {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-family: inherit; /* Ensure textarea font matches */
    }
    .exercise {
      background: #f8f9fa;
      padding: 20px;
      margin: 20px 0;
      border-left: 4px solid #008080; /* Teal */
      border-radius: 6px;
    }
    .feedback {
      margin: 10px 0;
      padding: 10px;
      background: #e8f4f8; /* Light blue background */
      border-radius: 6px;
      border-left: 4px solid #3498db; /* Blue border */
      color: #2c3e50; /* Darker text */
    }
    /* Top Right Navigation Styling */
    .top-nav {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 10;
      background-color: rgba(0, 128, 128, 0.8); /* Teal with transparency */
      backdrop-filter: blur(8px);
      border-radius: 2rem;
      padding: 0.5rem 1.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    .top-nav ul {
      display: flex;
      list-style-type: none;
      margin: 0;
      padding: 0;
      gap: 1.5rem;
    }
    .top-nav a {
      color: white;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.875rem;
      transition: color 0.3s ease;
    }
    .top-nav a:hover {
      color: #f0f0f0; /* Lighter color on hover */
    }
  `}} />
);

// --- Main Component ---
function LegalScenarioPage() {
  // Single state object for all responses and feedback
  const [responses, setResponses] = useState(() => {
    const initialState = {};
    parts.forEach(part => {
      part.questions.forEach(q => {
        initialState[q.id] = { text: '', feedback: null };
      });
    });
    return initialState;
  });

  // Handles textarea changes
  const handleTextChange = (id, value) => {
    setResponses(prev => ({
      ...prev,
      [id]: { ...prev[id], text: value, feedback: null } // Clear feedback on change
    }));
  };

  // Handles submit button clicks
  const handleSubmit = (id) => {
    const text = responses[id].text.trim();
    let feedbackMsg = '';

    if (text.length < 20) {
      feedbackMsg = "<strong>💡 Tip:</strong> Be specific. Include ethics, procedure, and professionalism.";
    } else {
      feedbackMsg = "<strong>✅ Well done!</strong> Your response shows leadership under pressure.";
    }

    setResponses(prev => ({
      ...prev,
      [id]: { ...prev[id], feedback: feedbackMsg }
    }));
  };

  return (
    <div className="root-div"> {/* Apply body styles here */}
      <PageStyles />

      <header>
        <h1>⚖️ Professional Practice Scenarios: Legal Professionals</h1>
        <p>Solve real operational challenges using English as your tool.</p>
        {/* Top Right Navigation */}
        <nav className="top-nav">
          <ul>
            <li><a href="https://aulice-main-hub.netlify.app/">Home</a></li>
            <li><a href="https://aulice-about.netlify.app/">About us</a></li>
            <li><a href="https://aulice-pricing-plans.netlify.app/">Pricing Plans</a></li>
            <li><a href="https://aulice-lexicon.netlify.app/">Lexicon</a></li>
            <li><a href="https://aulice-teacher-dashboard.netlify.app/">Teacher</a></li>
            <li><a href="https://aulice-contact.netlify.app/">Contact</a></li>
          </ul>
        </nav>
      </header>

      <div className="container">

        <h2>🎯 After completing this lesson, you will be able to:</h2>
        <ul>
          <li>Conduct client interviews in clear, professional English.</li>
          <li>Handle ethical conflicts with integrity.</li>
          <li>Speak confidently in court or negotiation.</li>
          <li>Lead during PR or compliance crises.</li>
        </ul>

        {/* Map over parts and questions */}
        {parts.map((part) => (
          <React.Fragment key={part.partTitle}>
            <h2>{part.partTitle}</h2>

            {part.questions.map((q) => (
              <div className="exercise" key={q.id}>
                <h3>{q.title}</h3>
                <p><strong>{q.prompt.split(': ')[0]}:</strong> {q.prompt.split(': ').slice(1).join(': ')}</p>
                <textarea
                  id={q.id} // Keep ID if needed
                  placeholder="Your response..."
                  value={responses[q.id].text}
                  onChange={(e) => handleTextChange(q.id, e.target.value)}
                />
                <button
                  onClick={() => handleSubmit(q.id)}
                  className="btn"
                >
                  ✅ Submit
                </button>

                {/* Conditional feedback rendering */}
                {responses[q.id].feedback && (
                  <div
                    className="feedback"
                    style={{ display: 'block' }} // Ensure feedback is visible when state updates
                    dangerouslySetInnerHTML={{ __html: responses[q.id].feedback }}
                  />
                )}
              </div>
            ))}
          </React.Fragment>
        ))}

      </div>
    </div>
  );
}

export default LegalScenarioPage;