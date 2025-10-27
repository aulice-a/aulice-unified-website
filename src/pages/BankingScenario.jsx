// src/pages/BankingScenario.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BankingScenario = () => {
  const [answers, setAnswers] = useState({});
  const [feedbacks, setFeedbacks] = useState({});

  const handleInputChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (id) => {
    const value = answers[id]?.trim() || '';
    if (value.length < 20) {
      setFeedbacks(prev => ({
        ...prev,
        [id]: "💡 Tip: Be specific. Include empathy, procedure, and safety focus."
      }));
    } else {
      setFeedbacks(prev => ({
        ...prev,
        [id]: "✅ Well done! Your response shows professionalism under pressure."
      }));
    }
  };

  const questions = [
    {
      id: 'q1',
      title: "1. A client loses money on an investment. How do you respond?",
      hint: "How do you show empathy? Do you offer a solution?"
    },
    {
      id: 'q2',
      title: "2. A client is upset about a service fee they didn't expect. How do you handle this complaint?",
      hint: "How do you explain the fee? Can you offer a one-time waiver?"
    },
    {
      id: 'q3',
      title: "3. A client's loan application has been rejected. How do you explain this decision to them?",
      hint: "How do you provide the news respectfully? What options do you suggest?"
    },
    {
      id: 'q4',
      title: "4. A new client is confused about the difference between a checking and a savings account. How do you explain it simply?",
      hint: "Use simple language and clear examples."
    },
    {
      id: 'q5',
      title: "5. A client asks about their current account balance. How do you respond?",
      hint: "What is the procedure for verifying identity? How do you maintain privacy?"
    },
    {
      id: 'q6',
      title: "6. A long-term client reports a fraudulent charge on their account. What is your first action?",
      hint: "What do you do? Who do you inform?"
    },
    {
      id: 'q7',
      title: "7. An elderly client wants to withdraw a very large sum of money to 'help a friend.' You suspect it's a scam. How do you handle this?",
      hint: "How do you raise concerns without accusing the client?"
    },
    {
      id: 'q8',
      title: "8. A client is very angry because they have been waiting for 20 minutes. How do you de-escalate the situation?",
      hint: "How do you show empathy? How do you offer a solution?"
    },
    {
      id: 'q9',
      title: "9. A client wants to transfer a large sum to a foreign bank account. How do you handle this?",
      hint: "What is the verification procedure? What questions do you ask?"
    },
    {
      id: 'q10',
      title: "10. A new client is interested in opening a business account. What services would you explain?",
      hint: "How do you present the value?"
    },
    {
      id: 'q11',
      title: "11. A bank system outage occurs. How do you manage clients in the branch?",
      hint: "How do you communicate? What do you do to help?"
    },
    {
      id: 'q12',
      title: "12. A colleague makes a mistake causing a client to be overcharged. How do you handle this?",
      hint: "What is your responsibility?"
    },
    {
      id: 'q13',
      title: "13. How would you explain the benefits of a home mortgage to a potential client?",
      hint: "What are the benefits? What are the risks?"
    },
    {
      id: 'q14',
      title: "14. How would you explain the importance of a good credit score to a young adult?",
      hint: "How do you make it relatable?"
    },
    {
      id: 'q15',
      title: "15. A client reports that their debit card has been stolen. How do you help them?",
      hint: "What is your first step? What do you do next?"
    },
    {
      id: 'q16',
      title: "16. How do you politely decline a client's request for a loan when they don't meet requirements?",
      hint: "How do you stay polite? How do you offer an alternative?"
    },
    {
      id: 'q17',
      title: "17. A client wants to close an account because they're unhappy. How do you respond?",
      hint: "How do you show empathy? How do you try to retain the client?"
    },
    {
      id: 'q18',
      title: "18. A client is concerned about online banking security. How do you reassure them?",
      hint: "What security features does the bank have?"
    },
    {
      id: 'q19',
      title: "19. A client wants to open an account for their child. What information do you give them?",
      hint: "What are the benefits? What are the requirements?"
    },
    {
      id: 'q20',
      title: "20. A client wants to set up direct deposit for their paycheck. How do you help them?",
      hint: "What information do they need? What is the procedure?"
    }
  ];

  return (
    <div className="font-sans bg-[#f7f9fc] text-[#2c3e50] leading-relaxed">
      {/* Header */}
      <header className="text-center py-10 px-5 bg-[#1a365d] text-white">
        <nav className="mb-6 space-x-4">
          <a href="/" className="text-white font-bold no-underline hover:underline">Home</a>
          <a href="/about" className="text-white font-bold no-underline hover:underline">About us</a>
          <a href="/pricing" className="text-white font-bold no-underline hover:underline">Pricing Plans</a>
          <a href="/lexicon" className="text-white font-bold no-underline hover:underline">Lexicon</a>
          <a href="/teacher" className="text-white font-bold no-underline hover:underline">Teacher</a>
          <a href="/contact" className="text-white font-bold no-underline hover:underline">Contact</a>
        </nav>
        <h1 className="text-2xl md:text-3xl font-bold">💼 Professional Practice Scenarios: Banking Professionals</h1>
        <p className="mt-2">Solve real operational challenges using English as your tool.</p>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-10 px-5">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-[#1a365d] mb-4">🎯 After completing this lesson, you will be able to:</h2>
          <ul className="list-disc pl-5 space-y-1 mb-8">
            <li>Explain financial products clearly.</li>
            <li>Handle client complaints with empathy.</li>
            <li>Report suspicious transactions.</li>
            <li>Lead during system outages.</li>
          </ul>

          {/* Part 1: Client Service & Communication */}
          <h2 className="text-2xl font-bold text-[#1a365d] mt-8 mb-6">Part 1: Client Service & Communication</h2>
          
          {questions.slice(0, 10).map((q) => (
            <div key={q.id} className="mb-6 p-5 bg-[#f8f9fa] border-l-4 border-[#1a365d] rounded">
              <h3 className="font-bold text-lg text-[#1a365d] mb-2">{q.title}</h3>
              <p className="text-sm text-gray-600 mb-3"><strong>Think about:</strong> {q.hint}</p>
              <textarea
                value={answers[q.id] || ''}
                onChange={(e) => handleInputChange(q.id, e.target.value)}
                placeholder="Your response..."
                className="w-full p-3 border border-gray-300 rounded mb-3"
                rows="3"
              />
              <button
                onClick={() => handleSubmit(q.id)}
                className="inline-block px-4 py-2 bg-[#1a365d] text-white rounded cursor-pointer hover:bg-[#2c4a7d] transition"
              >
                ✅ Submit
              </button>
              {feedbacks[q.id] && (
                <div className="mt-3 p-3 bg-[#e8f4f8] rounded text-sm">
                  {feedbacks[q.id]}
                </div>
              )}
            </div>
          ))}

          {/* Part 2: Risk, Compliance & Security */}
          <h2 className="text-2xl font-bold text-[#1a365d] mt-10 mb-6">Part 2: Risk, Compliance & Security</h2>
          
          {questions.slice(10).map((q) => (
            <div key={q.id} className="mb-6 p-5 bg-[#f8f9fa] border-l-4 border-[#1a365d] rounded">
              <h3 className="font-bold text-lg text-[#1a365d] mb-2">{q.title}</h3>
              <p className="text-sm text-gray-600 mb-3"><strong>Think about:</strong> {q.hint}</p>
              <textarea
                value={answers[q.id] || ''}
                onChange={(e) => handleInputChange(q.id, e.target.value)}
                placeholder="Your response..."
                className="w-full p-3 border border-gray-300 rounded mb-3"
                rows="3"
              />
              <button
                onClick={() => handleSubmit(q.id)}
                className="inline-block px-4 py-2 bg-[#1a365d] text-white rounded cursor-pointer hover:bg-[#2c4a7d] transition"
              >
                ✅ Submit
              </button>
              {feedbacks[q.id] && (
                <div className="mt-3 p-3 bg-[#e8f4f8] rounded text-sm">
                  {feedbacks[q.id]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-10 px-5 bg-[#1a365d] text-white mt-16">
        <nav className="mb-4 space-x-4">
          <a href="/" className="text-white font-bold no-underline hover:underline">Home</a>
          <a href="/about" className="text-white font-bold no-underline hover:underline">About us</a>
          <a href="/pricing" className="text-white font-bold no-underline hover:underline">Pricing Plans</a>
          <a href="/lexicon" className="text-white font-bold no-underline hover:underline">Lexicon</a>
          <a href="/teacher" className="text-white font-bold no-underline hover:underline">Teacher</a>
          <a href="/contact" className="text-white font-bold no-underline hover:underline">Contact</a>
        </nav>
        <p>© 2025 Aulice Academy. Reality is programmable. Smart people are its architects.</p>
      </footer>
    </div>
  );
};

export default BankingScenario;