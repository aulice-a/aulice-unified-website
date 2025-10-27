import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Data for the exercises ---
// Extracting question data into an array for mapping.
const parts = [
  {
    partTitle: "Part 1: Handling Passengers & Service",
    questions: [
      { id: 'q1', title: "1. How do you calm an anxious passenger during takeoff?", prompt: "Think about: What do you say? How do you use tone and body language?" },
      { id: 'q2', title: "2. A passenger refuses to turn off their phone. How do you respond?", prompt: "Think about: How do you enforce rules without escalating?" },
      { id: 'q3', title: "3. You smell smoke in the cabin. What do you do?", prompt: "Think about: Who do you inform? What actions do you take? How do you speak to passengers?" },
      { id: 'q4', title: "4. A passenger asks for a special meal they did not pre-order. How do you handle this?", prompt: "Think about: How do you manage expectations and offer alternatives?" },
      { id: 'q5', title: "5. What do you do if a passenger is intoxicated and becoming disruptive?", prompt: "Think about: What is the protocol? Who do you involve?" },
      { id: 'q6', title: "6. A passenger is upset about a flight delay. How do you de-escalate the situation?", prompt: "Think about: How do you show empathy while providing information?" },
      { id: 'q7', title: "7. How do you assist a passenger with a physical disability during boarding and the flight?", prompt: "Think about: What support do you offer? How do you respect their independence?" },
      { id: 'q8', title: "8. You find an unattended bag in the overhead compartment. What is the protocol?", prompt: "Think about: Who do you inform? What announcement do you make?" },
      { id: 'q9', title: "9. A passenger feels faint. What are your first steps?", prompt: "Think about: How do you assess the situation? Who do you call for help?" },
      { id: 'q10', title: "10. What is your procedure for handling a passenger with a nosebleed?", prompt: "Think about: What are the first aid steps? What supplies do you use?" },
      { id: 'q11', title: "11. How do you respond to a passenger who is constantly using the call button?", prompt: "Think about: How do you handle the situation without showing irritation?" },
      { id: 'q12', title: "12. A passenger complains about the food, saying it's cold. How do you handle this complaint?", prompt: "Think about: How do you offer a solution?" }
    ]
  },
  {
    partTitle: "Part 2: Safety and Emergency Communication",
    questions: [
        { id: 'q13', title: "13. How do you prepare the cabin for an emergency landing?", prompt: "Think about: What do you tell the passengers? What actions do you take?" },
        { id: 'q14', title: "14. How would you make a calming announcement during severe turbulence?", prompt: "Think about: How do you project confidence and authority?" },
        { id: 'q15', title: "15. What are the key commands you would use during an evacuation?", prompt: "Think about: What commands are most important for passenger safety?" },
        { id: 'q16', title: "16. A pilot reports a medical emergency on board. What is your immediate course of action?", prompt: "Think about: What is the first thing you must do?" },
        { id: 'q17', title: "17. Describe the procedure for an unplanned go-around or missed approach.", prompt: "Think about: What do you say to the passengers? What do you do in the cabin?" },
        { id: 'q18', title: "18. What is the most challenging emergency you've had to manage, and how did you handle it?", prompt: "Think about: A specific example, the steps you took, and the final outcome." },
        { id: 'q19', title: "19. A fire has broken out in the lavatory. What do you do?", prompt: "Think about: What is the first step? What tools do you use?" },
        { id: 'q20', title: "20. How would you handle a passenger who is panicking and refusing to use a life vest?", prompt: "Think about: How do you stay calm and enforce safety?" },
        { id: 'q21', title: "21. A passenger is having a seizure. What do you do?", prompt: "Think about: What is the medical procedure?" },
        { id: 'q22', title: "22. You have a pilot with a difficult or negative attitude. How do you maintain a positive relationship with them while on duty?", prompt: "Think about: How do you stay professional?" }
    ]
  },
   {
    partTitle: "Part 3: Professional Development and Teamwork",
    questions: [
        { id: 'q23', title: "23. Describe a time when you had to quickly coordinate with your team during the boarding process.", prompt: "Think about: What was the situation? How did you communicate effectively?" },
        { id: 'q24', title: "24. How do you handle a language barrier with a passenger?", prompt: "Think about: What resources do you use? How do you still provide good service?" },
        { id: 'q25', title: "25. What is the most challenging thing you've had to learn in your career so far?", prompt: "Think about: A specific challenge and how you overcame it." },
        { id: 'q26', title: "26. What advice would you give to a new cabin crew member just starting their career?", prompt: "Think about: The most important lessons you have learned." },
        { id: 'q27', title: "27. How do you stay up-to-date with new safety regulations and procedures?", prompt: "Think about: Training, internal communication, and personal study." },
        { id: 'q28', title: "28. Describe your duties and responsibilities after the passengers have disembarked.", prompt: "Think about: What checks do you perform? What information do you give to the cleaning crew?" },
        { id: 'q29', title: "29. What is your role in a medical emergency?", prompt: "Think about: How do you assist a sick passenger?" },
        { id: 'q30', title: "30. How do you deal with a customer who is very demanding?", prompt: "Think about: How do you handle a passenger who asks for an unreasonable request?" }
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
      background: #1a73e8; /* Blue */
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
      color: #1a73e8; /* Blue */
    }
    p, ul, ol {
      margin: 10px 0;
    }
    .btn {
      display: inline-block;
      padding: 10px 20px;
      background: #1a73e8; /* Blue */
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      margin: 10px 0;
      font-size: 14px;
      font-weight: bold; /* Added bold */
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
      border-left: 4px solid #1a73e8; /* Blue */
      border-radius: 6px;
    }
    .feedback {
      margin: 10px 0;
      padding: 10px;
      background: #e8f4f8; /* Light blue background */
      border-radius: 6px;
      border-left: 4px solid #3498db; /* Another Blue border */
      color: #2c3e50; /* Darker text */
    }
    /* Top Right Navigation Styling */
    .top-nav {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 10;
      background-color: rgba(26, 115, 232, 0.8); /* Blue with transparency */
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
function CabinCrewScenario() {
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
      feedbackMsg = "<strong>💡 Tip:</strong> Be specific. Include tone, phrasing, and safety focus.";
    } else {
      feedbackMsg = "<strong>✅ Well done!</strong> Your response shows calmness and control under pressure.";
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
        <h1>✈️ Professional Practice Scenarios: Cabin Crew</h1>
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
          <li>Deliver safety briefings with confidence and clarity.</li>
          <li>Handle difficult passengers with professionalism.</li>
          <li>Communicate emergencies to passengers and cockpit.</li>
          <li>Demonstrate leadership during turbulence and evacuation.</li>
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
                    style={{ display: 'block' }} // Ensure feedback is visible
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

export default CabinCrewScenario;