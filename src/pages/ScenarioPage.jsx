// src/pages/ScenarioPage.jsx
import React, { useState } from 'react';

const ScenarioPage = ({ course }) => {
  const [answers, setAnswers] = useState({});
  const [feedbacks, setFeedbacks] = useState({});

  const handleInputChange = (e, id) => {
    setAnswers({ ...answers, [id]: e.target.value });
  };

  const submitAnswer = (id) => {
    const answer = answers[id] || '';
    const feedbackText = answer.trim().length < 20
      ? "<strong>💡 Tip:</strong> Be specific. Include empathy, procedure, and safety focus."
      : "<strong>✅ Well done!</strong> Your response shows professionalism under pressure.";
    setFeedbacks({ ...feedbacks, [id]: feedbackText });
  };

  const scenarios = [
    { id: 'q1', title: "1. A client loses money on an investment. How do you respond?", prompt: "How do you show empathy? Do you offer a solution?" },
    { id: 'q2', title: "2. A client is upset about a service fee they didn't expect. How do you handle this complaint?", prompt: "How do you explain the fee? Can you offer a one-time waiver?" },
    { id: 'q3', title: "3. A client's loan application has been rejected. How do you explain this decision to them?", prompt: "How do you provide the news respectfully? What options do you suggest?" },
    { id: 'q4', title: "4. A new client is confused about the difference between a checking and a savings account. How do you explain it simply?", prompt: "Use simple language and clear examples." },
    { id: 'q5', title: "5. A client asks about their current account balance. How do you respond?", prompt: "What is the procedure for verifying identity? How do you maintain privacy?" },
    { id: 'q6', title: "6. A long-term client reports a fraudulent charge on their account. What is your first action?", prompt: "What do you do? Who do you inform?" },
    { id: 'q7', title: "7. An elderly client wants to withdraw a very large sum of money to 'help a friend.' You suspect it's a scam. How do you handle this?", prompt: "How do you raise concerns without accusing the client?" },
    { id: 'q8', title: "8. A client is very angry because they have been waiting for 20 minutes. How do you de-escalate the situation?", prompt: "How do you show empathy? How do you offer a solution?" },
    { id: 'q9', title: "9. A client wants to transfer a large sum to a foreign bank account. How do you handle this?", prompt: "What is the verification procedure? What questions do you ask?" },
    { id: 'q10', title: "10. A new client is interested in opening a business account. What services would you explain?", prompt: "How do you present the value?" },
    { id: 'q11', title: "11. A bank system outage occurs. How do you manage clients in the branch?", prompt: "How do you communicate? What do you do to help?" },
    { id: 'q12', title: "12. A colleague makes a mistake causing a client to be overcharged. How do you handle this?", prompt: "What is your responsibility?" },
    { id: 'q13', title: "13. How would you explain the benefits of a home mortgage to a potential client?", prompt: "What are the benefits? What are the risks?" },
    { id: 'q14', title: "14. How would you explain the importance of a good credit score to a young adult?", prompt: "How do you make it relatable?" },
    { id: 'q15', title: "15. A client reports that their debit card has been stolen. How do you help them?", prompt: "What is your first step? What do you do next?" },
    { id: 'q16', title: "16. How do you politely decline a client's request for a loan when they don't meet requirements?", prompt: "How do you stay polite? How do you offer an alternative?" },
    { id: 'q17', title: "17. A client wants to close an account because they're unhappy. How do you respond?", prompt: "How do you show empathy? How do you try to retain the client?" },
    { id: 'q18', title: "18. A client is concerned about online banking security. How do you reassure them?", prompt: "What security features does the bank have?" },
    { id: 'q19', title: "19. A client wants to open an account for their child. What information do you give them?", prompt: "What are the benefits? What are the requirements?" },
    { id: 'q20', title: "20. A client wants to set up direct deposit for their paycheck. How do you help them?", prompt: "What information do they need? What is the procedure?" }
  ];

  // Helper component for nav links
  const NavLinks = ({ inHeader }) => (
    <div className="text-center my-8">
      <a href="https://aulice-main-hub.netlify.app/" className={`mx-2 font-bold no-underline ${inHeader ? 'text-white' : ''}`}>Home</a>
      <a href="https://aulice-about.netlify.app/" className={`mx-2 font-bold no-underline ${inHeader ? 'text-white' : ''}`}>About us</a>
      <a href="https://aulice-pricing-plans.netlify.app/" className={`mx-2 font-bold no-underline ${inHeader ? 'text-white' : ''}`}>Pricing Plans</a>
      <a href="https://aulice-lexicon.netlify.app/" className={`mx-2 font-bold no-underline ${inHeader ? 'text-white' : ''}`}>Lexicon</a>
      <a href="https://aulice-teacher-dashboard.netlify.app/" className={`mx-2 font-bold no-underline ${inHeader ? 'text-white' : ''}`}>Teacher</a>
      <a href="https://aulice-contact.netlify.app/" className={`mx-2 font-bold no-underline ${inHeader ? 'text-white' : ''}`}>Contact</a>
    </div>
  );

  return (
    <div className="font-['Segoe_UI',_sans-serif] bg-[#f7f9fc] text-[#2c3e50] leading-relaxed">
      <style>{`.btn { display: inline-block; padding: 10px 20px; background: #1a365d; color: white; border: none; border-radius: 6px; cursor: pointer; margin: 10px 0; font-size: 14px; }`}</style>
      <header className="text-center py-10 px-5 bg-[#1a365d] text-white">
        <NavLinks inHeader={true} />
        <h1 className="text-3xl font-bold">💼 Professional Practice Scenarios: Banking Professionals</h1>
        <p>Solve real operational challenges using English as your tool.</p>
      </header>
      <div className="max-w-4xl my-10 mx-auto p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#1a365d]">🎯 After completing this lesson, you will be able to:</h2>
        <ul className="my-2 pl-5 list-disc">
          <li>Explain financial products clearly.</li>
          <li>Handle client complaints with empathy.</li>
          <li>Report suspicious transactions.</li>
          <li>Lead during system outages.</li>
        </ul>
        <h2 className="text-2xl font-bold text-[#1a365d] mt-8">Part 1: Client Service & Communication</h2>
        {scenarios.map(({ id, title, prompt }) => (
          <div key={id} className="bg-[#f8f9fa] p-5 my-5 border-l-4 border-[#1a365d] rounded-r-lg">
            <h3 className="text-lg font-bold text-[#1a365d]">{title}</h3>
            <p><strong>Think about:</strong> {prompt}</p>
            <textarea
              id={id}
              value={answers[id] || ''}
              onChange={(e) => handleInputChange(e, id)}
              placeholder="Your response..."
              className="w-full p-2 my-2 border border-gray-300 rounded"
            ></textarea>
            <button onClick={() => submitAnswer(id)} className="btn">✅ Submit</button>
            {feedbacks[id] && (
              <div
                id={`${id}Feedback`}
                className="my-2 p-2 bg-[#e8f4f8] rounded"
                dangerouslySetInnerHTML={{ __html: feedbacks[id] }}
              ></div>
            )}
          </div>
        ))}
      </div>
      <footer className="text-center py-10 bg-[#1a365d] text-white mt-16">
        <NavLinks inHeader={true} />
        <p>© 2025 Aulice Academy. Reality is programmable. Smart people are its architects.</p>
      </footer>
    </div>
  );
};

export default ScenarioPage;