import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Data for the exercises ---
// We extract the repetitive question data into an array to be mapped.
const parts = [
  {
    partTitle: "Part 1: Transportation & Operations",
    questions: [
      { id: 'q1', title: "1. A truck breaks down en route. How do you manage the delay?", prompt: "Think about: Do you reroute? Who do you inform? How do you update the client?" },
      { id: 'q2', title: "2. A warehouse has loaded the wrong item onto a truck. What is your action?", prompt: "Think about: Do you stop the truck? Who do you contact at the warehouse?" },
      { id: 'q3', title: "3. A shipment is held up at customs. What is your first point of contact and what do you do?", prompt: "Think about: What documents might be missing? What is the risk?" },
      { id: 'q4', title: "4. Severe weather is forecast on a major highway. How do you prepare your drivers and shipments?", prompt: "Think about: How do you communicate? What is the priority?" },
      { id: 'q5', title: "5. A driver is 3 hours late for a scheduled pickup. How do you communicate with the warehouse and the client?", prompt: "Think about: How do you explain the delay? What is the solution?" },
      { id: 'q6', title: "6. You notice a discrepancy between the packing list and the actual goods. How do you address this?", prompt: "Think about: What is the risk? What is the solution?" },
      { id: 'q7', title: "7. A client wants to change the destination of a shipment that is already in transit. How do you respond?", prompt: "Think about: Is it possible? What are the costs and risks?" },
      { id: 'q8', title: "8. A client is unhappy with a delay that was caused by a natural disaster. How do you handle the conversation?", prompt: "Think about: How do you explain the cause? How do you show empathy?" },
      { id: 'q9', title: "9. A client wants to know the status of their shipment every hour. How do you manage their expectations?", prompt: "Think about: How do you communicate without causing panic?" },
      { id: 'q10', title: "10. A carrier has submitted an invoice with an unexpected surcharge. How do you resolve this?", prompt: "Think about: What is the first step? What do you say to the carrier?" }
    ]
  },
  {
    partTitle: "Part 2: Client Communication & Problem-Solving",
    questions: [
      { id: 'q11', title: "11. A client wants a cost estimate for a new, complex delivery route. How do you respond?", prompt: "Think about: What information do you need?" },
      { id: 'q12', title: "12. A shipment of delicate goods has been damaged in transit. What is your first course of action?", prompt: "Think about: Who do you inform? What is the process for a claim?" },
      { id: 'q13', title: "13. You need to explain the concept of a 'bill of lading' to a new client. What is your explanation?", prompt: "Think about: Use simple language. What is its purpose?" },
      { id: 'q14', title: "14. A client wants to switch from sea freight to air freight. What do you tell them?", prompt: "Think about: What are the benefits and costs? What is the risk?" },
      { id: 'q15', title: "15. How do you communicate urgency to a driver without causing them to panic or rush?", prompt: "Think about: How do you motivate them?" },
      { id: 'q16', title: "16. A client has a question about a technical aspect of a delivery, such as the type of container. How do you respond?", prompt: "Think about: How do you show your expertise?" }
    ]
  },
  {
    partTitle: "Part 3: Supply Chain Management & Technology",
    questions: [
      { id: 'q17', title: "17. How do you explain the benefits of a new logistics tracking system to your team?", prompt: "Think about: How do you show value?" },
      { id: 'q18', title: "18. A major port is shut down due to a strike. How do you communicate this to clients and internal teams?", prompt: "Think about: What is the risk? What is the solution?" },
      { id: 'q19', title: "19. How do you coordinate with a supplier to expedite an urgent order?", prompt: "Think about: What do you say to the supplier?" },
      { id: 'q20', title: "20. How do you identify and mitigate a potential risk in the supply chain?", prompt: "Think about: What are the steps? What do you say to your team?" }
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
      background: #2c3e50;
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
      color: #2c3e50;
    }
    p, ul, ol {
      margin: 10px 0;
    }
    .btn {
      display: inline-block;
      padding: 10px 20px;
      background: #2c3e50;
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
      border-left: 4px solid #2c3e50;
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
      background-color: rgba(44, 62, 80, 0.8);
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
      color: #e8e8e8;
    }
  `}} />
);

// --- Main Component ---
function LogisticsScenarioPage() {
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
      feedbackMsg = "<strong>💡 Tip:</strong> Be specific. Include communication, coordination, and risk management.";
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
        <h1>🚚 Professional Practice Scenarios: Logistics Coordinators</h1>
        <p>Solve real operational challenges using English as your tool.</p>
      </header>

      <div className="container">

        <h2>🎯 After completing this lesson, you will be able to:</h2>
        <ul>
          <li>Explain delays and rerouting to clients clearly.</li>
          <li>Coordinate with drivers, warehouses, and customs.</li>
          <li>Lead during supply chain disruptions.</li>
          <li>Communicate urgency without panic.</li>
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

export default LogisticsScenarioPage;