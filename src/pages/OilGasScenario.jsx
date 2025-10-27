import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Data for the exercises ---
// Extracting question data into an array for mapping.
// Only questions present in the HTML are included.
const parts = [
  {
    partTitle: "Part 1: Your Role and Operational Responsibilities",
    questions: [
      { id: 'q1', title: "1. Describe a typical shift on an oil rig or at a processing plant. What are your main duties from start to finish?" },
      { id: 'q2', title: "2. What inspired you to pursue a career in the Oil & Gas industry?" },
      { id: 'q3', title: "3. What do you believe are the three most important qualities for a successful professional in this field?" },
      { id: 'q4', title: "4. How do you coordinate with your team members to ensure a smooth and safe operation?" },
      { id: 'q5', title: "5. What is the most challenging task you have to perform on a regular basis?" }
    ]
  },
  {
    partTitle: "Part 2: Technical Communication and Problem-Solving",
    questions: [
      { id: 'q6', title: "6. Explain the process of a standard well drilling operation to someone unfamiliar with the industry." },
      { id: 'q7', title: "7. How would you report a minor equipment malfunction to your supervisor?" },
      { id: 'q8', title: "8. Describe how you would conduct a safety briefing for a team of new workers on site." },
      { id: 'q9', title: "9. Explain the purpose of a particular piece of equipment you use regularly." },
      { id: 'q10', title: "10. What information is essential to include in a shift handover report?" }
      // Q11-Q12 were not in the provided HTML
    ]
  },
  {
    partTitle: "Part 3: Safety, Environmental, and Emergency Scenarios",
    questions: [
      { id: 'q13', title: "13. What is your immediate course of action if you notice a gas leak on site?" }
      // Q14-Q30 were not in the provided HTML
    ]
  }
];

// --- Helper Component for <style> ---
// Injects the original <style> tag directly.
const PageStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    /* body styles applied to root div */
    header {
      text-align: center;
      padding: 40px 20px;
      background: #d35400;
      color: white;
    }
    header h1 {
      font-size: 28px;
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
      color: #d35400;
    }
    p, ul, ol {
      margin: 10px 0;
    }
    .btn {
      display: inline-block;
      padding: 10px 20px;
      background: #d35400;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      margin: 10px 0;
      font-size: 14px;
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
      border-left: 4px solid #d35400;
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

    /* Navigation Bar Styling */
    .top-nav {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 10;
      background-color: rgba(211, 84, 0, 0.8);
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
function OilGasScenarioPage() {
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
      [id]: { ...prev[id], text: value }
    }));
  };

  // Handles submit button clicks
  const handleSubmit = (id) => {
    const text = responses[id].text.trim();
    let feedbackMsg = '';

    if (text.length < 20) {
      feedbackMsg = "<strong>💡 Tip:</strong> Be specific. Include actions, communication, and safety focus.";
    } else {
      feedbackMsg = "<strong>✅ Well done!</strong> Your response shows professionalism under pressure.";
    }
    
    setResponses(prev => ({
      ...prev,
      [id]: { ...prev[id], feedback: feedbackMsg }
    }));
  };

  // Styles from the original <body>
  const bodyStyles = {
    fontFamily: "'Segoe UI', sans-serif",
    background: '#f7f9fc',
    color: '#2c3e50',
    lineHeight: 1.6,
    position: 'relative' // Keep for nav positioning
  };

  return (
    <div style={bodyStyles}>
      <PageStyles />

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

      <header>
        <h1>🛢️ Professional Practice Scenarios: Oil & Gas Professionals</h1>
        <p>Solve real operational challenges using English as your tool.</p>
      </header>

      <div className="container">

        <h2>🎯 After completing this lesson, you will be able to:</h2>
        <ul>
          <li>Explain complex processes clearly.</li>
          <li>Lead during emergencies and equipment failures.</li>
          <li>Report incidents with precision and calm.</li>
          <li>Communicate effectively across roles and teams.</li>
        </ul>

        {/* Map over parts and questions */}
        {parts.map((part) => (
          <React.Fragment key={part.partTitle}>
            <h2>{part.partTitle}</h2>
            
            {part.questions.map((q) => (
              <div className="exercise" key={q.id}>
                <h3>{q.title}</h3>
                {/* Removed the <p> tag around the question title if not needed */}
                <textarea
                  id={q.id}
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
                    // Removed display:block override as feedback class handles it
                    className="feedback" 
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

export default OilGasScenarioPage;