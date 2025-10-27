import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Data for the exercises ---
// We extract the repetitive question data into an array to be mapped.
const parts = [
  {
    partTitle: "Part 1: Safety & Emergency Response",
    questions: [
      { id: 'q1', title: "1. The dewatering pump fails underground. What do you do?", prompt: "Think about: Is there a backup? What’s the risk? Who do you inform?" },
      { id: 'q2', title: "2. A contractor uses unapproved equipment. How do you respond?", prompt: "Think about: How do you enforce standards? Can you stop work?" },
      { id: 'q3', title: "3. You notice cracks in the tunnel wall. What actions do you take?", prompt: "Think about: Is it structural? Who assesses it? Do you evacuate?" },
      { id: 'q4', title: "4. A gas alarm sounds in an active working area. What are your immediate actions?", prompt: "Think about: Who do you alert? What's the protocol for evacuation?" },
      { id: 'q5', title: "5. A rockfall occurs, blocking a main haulage road. How do you manage the situation?", prompt: "Think about: What is the first priority? Who do you call?" },
      { id: 'q6', title: "6. A new team member is not following the lockout-tagout procedure correctly. How do you intervene?", prompt: "Think about: How do you correct them safely? What do you say?" },
      { id: 'q7', title: "7. A conveyor belt is slipping and overheating. How do you handle this?", prompt: "Think about: What is the risk? What is your procedure?" },
      { id: 'q8', title: "8. You discover a piece of safety equipment, like a gas detector, is faulty. What is the protocol?", prompt: "Think about: Who do you report to? What do you do with the equipment?" },
      { id: 'q9', title: "9. An underground fire is reported. What are the key steps for fire containment and evacuation?", prompt: "Think about: What's the immediate action? What does a fire command sound like?" },
      { id: 'q10', title: "10. A worker reports a near-miss incident. How do you investigate it?", prompt: "Think about: What questions do you ask? What's the goal of the investigation?" }
    ]
  },
  {
    partTitle: "Part 2: Technical Operations & Communication",
    questions: [
      { id: 'q11', title: "11. Explain the purpose of a ventilation plan to a new hire.", prompt: "Think about: Why is it important? How does it work?" }
      // Other questions (Q12-Q22) were not included in the source HTML
    ]
  },
  {
    partTitle: "Part 3: Leadership & Professional Growth",
    questions: [
      { id: 'q23', title: "23. How do you stay calm and maintain control during an emergency situation?", prompt: "Think about: What are your steps?" },
      { id: 'q24', title: "24. A team member is struggling with a task. How do you help them without doing the work for them?", prompt: "Think about: How do you guide them?" }
      // Other questions (Q25-Q34) were not included in the source HTML
    ]
  }
];

// --- Helper Component for <style> ---
// This component injects the original <style> tag directly into the page.
const PageStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    /* body styles are applied to the root div */
    header {
      text-align: center;
      padding: 40px 20px;
      background: #27ae60;
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
      color: #27ae60;
    }
    p, ul, ol {
      margin: 10px 0;
    }
    .btn {
      display: inline-block;
      padding: 10px 20px;
      background: #27ae60;
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
    }
    .exercise {
      background: #f8f9fa;
      padding: 20px;
      margin: 20px 0;
      border-left: 4px solid #27ae60;
      border-radius: 6px;
    }
    .feedback {
      margin: 10px 0;
      padding: 10px;
      background: #e8f4f8;
      border-radius: 6px;
      display: none; /* We override this with inline style */
    }

    /* New Navigation Bar Styling */
    .top-nav {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 10;
      background-color: rgba(39, 174, 96, 0.8);
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
      color: #f0f0f0;
    }
  `}} />
);

// --- Main Component ---
function MiningScenarioPage() {
  // Create a single state object to hold all responses and feedback
  const [responses, setResponses] = useState(() => {
    const initialState = {};
    parts.forEach(part => {
      part.questions.forEach(q => {
        initialState[q.id] = { text: '', feedback: null };
      });
    });
    return initialState;
  });

  // Handles changes to any textarea
  const handleTextChange = (id, value) => {
    setResponses(prev => ({
      ...prev,
      [id]: { ...prev[id], text: value }
    }));
  };

  // Handles the submit button click for any exercise
  const handleSubmit = (id) => {
    const text = responses[id].text.trim();
    let feedbackMsg = '';

    if (text.length < 20) {
      feedbackMsg = "<strong>💡 Tip:</strong> Be specific. Include who you inform, what actions you take, and why.";
    } else {
      feedbackMsg = "<strong>✅ Well done!</strong> Your response shows leadership under pressure.";
    }
    
    setResponses(prev => ({
      ...prev,
      [id]: { ...prev[id], feedback: feedbackMsg }
    }));
  };

  // Styles from the original <body> tag
  const bodyStyles = {
    fontFamily: "'Segoe UI', sans-serif",
    background: '#f7f9fc',
    color: '#2c3e50',
    lineHeight: 1.6,
    position: 'relative'
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
        <h1>⛏️ Professional Practice Scenarios: Mining Engineers</h1>
        <p>Solve real engineering challenges using English as your tool.</p>
      </header>

      <div className="container">

        <h2>🎯 After completing this lesson, you will be able to:</h2>
        <ul>
          <li>Explain technical systems to non-engineers.</li>
          <li>Lead during dewatering and ventilation failures.</li>
          <li>Report risks and recommend solutions.</li>
          <li>Coordinate with contractors and safety teams.</li>
        </ul>

        {/* Map over the parts and questions to render them dynamically */}
        {parts.map((part) => (
          <React.Fragment key={part.partTitle}>
            <h2>{part.partTitle}</h2>
            
            {part.questions.map((q) => (
              <div className="exercise" key={q.id}>
                <h3>{q.title}</h3>
                <p>
                  <strong>{q.prompt.split(': ')[0]}:</strong> 
                  {q.prompt.split(': ')[1]}
                </p>
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
                
                {/* Conditional rendering for feedback */}
                {responses[q.id].feedback && (
                  <div
                    className="feedback"
                    style={{ display: 'block' }} // Override CSS 'display: none'
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

export default MiningScenarioPage;