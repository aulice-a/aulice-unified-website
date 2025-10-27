import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Data for the exercises ---
// Extracting question data into an array for mapping.
const parts = [
  {
    partTitle: "Part 1: Client Consultation & Treatment",
    questions: [
      { id: 'q1', title: "1. A client has a reaction to a facial product. What do you do?", prompt: "Think about: How do you calm them? What treatment do you apply?" },
      { id: 'q2', title: "2. A client has a skin condition you are not trained to treat. How do you respond?", prompt: "Think about: How do you show you care? Do you refer them to someone else?" },
      { id: 'q3', title: "3. A client wants a treatment but has a contraindication. How do you explain why you can't proceed?", prompt: "Think about: How do you explain it professionally?" },
      { id: 'q4', title: "4. A client asks about a new, trendy treatment you don't offer. How do you manage their expectations and pivot to your services?", prompt: "Think about: How do you show your expertise?" },
      { id: 'q5', title: "5. A new client is unsure what treatment to get. How do you conduct a consultation to recommend the right service?", prompt: "Think about: What questions do you ask?" },
      { id: 'q6', title: "6. A client wants to know the difference between microdermabrasion and a chemical peel. How do you explain it simply?", prompt: "Think about: Use a metaphor." },
      { id: 'q7', title: "7. A client is hesitant about the pain level of a waxing service. How do you reassure them?", prompt: "Think about: How do you show empathy?" },
      { id: 'q8', title: "8. A client requests an unrealistic result from a treatment. How do you manage their expectations professionally?", prompt: "Think about: How do you stay honest?" },
      { id: 'q9', title: "9. How do you upsell a service without sounding pushy?", prompt: "Think about: How do you explain the value?" },
      { id: 'q10', title: "10. A client asks about the safety of a laser treatment on their skin type. How do you respond?", prompt: "Think about: How do you show your expertise?" }
    ]
  },
  {
    partTitle: "Part 2: Aftercare & Product Recommendations",
    questions: [
      { id: 'q11', title: "11. A client wants to skip the aftercare products to save money. How do you explain their importance?", prompt: "Think about: How do you show the value?" },
      { id: 'q12', title: "12. You need to explain the post-treatment redness after a chemical peel. How do you manage their concern?", prompt: "Think about: How do you show you care?" },
      { id: 'q13', title: "13. A client is concerned about a breakout after their facial. How do you reassure them and give advice?", prompt: "Think about: How do you show empathy?" },
      { id: 'q14', title: "14. How do you recommend a product for a client with sensitive skin?", prompt: "Think about: How do you show your expertise?" },
      { id: 'q15', title: "15. A client asks about a product they can buy online for a lower price. How do you explain the value of your professional products?", prompt: "Think about: How do you show the value?" },
      { id: 'q16', title: "16. How do you explain the importance of daily SPF after a treatment?", prompt: "Think about: How do you explain the value?" },
      { id: 'q17', title: "17. A client wants to know the difference between a serum and a moisturizer. How do you explain it?", prompt: "Think about: Use simple terms." }
    ]
  },
  {
    partTitle: "Part 3: Troubleshooting & Client Retention",
    questions: [
      { id: 'q18', title: "18. A client misses their appointment. How do you follow up?", prompt: "Think about: How do you show you care? How do you offer to reschedule?" },
      { id: 'q19', title: "19. A client is late for their appointment, and you have another client waiting. How do you handle it?", prompt: "Think about: How do you stay professional?" },
      { id: 'q20', title: "20. A client is unhappy with the results of their treatment. How do you handle the complaint?", prompt: "Think about: How do you show empathy?" },
      { id: 'q21', title: "21. A client is talking on their phone during a service. How do you politely ask them to end the call?", prompt: "Think about: How do you stay professional?" },
      { id: 'q22', title: "22. A client is unhappy with a technician and wants to switch. How do you handle the request?", prompt: "Think about: How do you show you care?" },
      { id: 'q23', title: "23. You need to lead a team meeting about a new service. How do you explain it to them?", prompt: "Think about: How do you show value?" },
      { id: 'q24', title: "24. A client wants a discount on a service. How do you politely decline while retaining them?", prompt: "Think about: How do you show you care?" },
      { id: 'q25', title: "25. A client asks you for your personal skincare routine. How do you respond professionally?", prompt: "Think about: How do you show your expertise?" }
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
      background: #8e44ad;
      color: white;
      position: relative; /* Keep relative for nav positioning */
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
      color: #8e44ad;
    }
    p, ul, ol {
      margin: 10px 0;
    }
    .btn {
      display: inline-block;
      padding: 10px 20px;
      background: #8e44ad;
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
      border-left: 4px solid #8e44ad;
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
      background-color: rgba(142, 68, 173, 0.8);
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
function AestheticianScenarioPage() {
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
      feedbackMsg = "<strong>💡 Tip:</strong> Try to include both empathy and action.";
    } else {
      feedbackMsg = "<strong>✅ Great job!</strong> Your response shows professionalism.";
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
    lineHeight: 1.6
    // position: 'relative' is handled by the root div if needed, but not necessary here
  };

  return (
    <div style={bodyStyles}>
      <PageStyles />

      <header>
        <h1>💄 Professional Practice Scenarios: Aestheticians</h1>
        <p>Apply your skills in real-world situations using English as the tool.</p>
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
          <li>Explain treatments and aftercare clearly.</li>
          <li>Handle allergic reactions professionally.</li>
          <li>Manage client expectations.</li>
          <li>Lead in a high-service environment.</li>
        </ul>

        {/* Map over parts and questions */}
        {parts.map((part) => (
          <React.Fragment key={part.partTitle}>
            <h2>{part.partTitle}</h2>

            {part.questions.map((q) => (
              <div className="exercise" key={q.id}>
                <h3>{q.title}</h3>
                <p><strong>{q.prompt.split(': ')[0]}:</strong> {q.prompt.split(': ')[1]}</p>
                <textarea
                  id={q.id} // Keep ID if needed, though not strictly necessary in React
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
                    // style={{ display: 'block' }} // No longer needed, CSS class handles initial display
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

export default AestheticianScenarioPage;