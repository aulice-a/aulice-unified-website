// src/pages/AviationPilotATCScenario.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AviationPilotATCScenario = () => {
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
        [id]: "💡 Tip: Be specific. Include phraseology, coordination, and safety focus."
      }));
    } else {
      setFeedbacks(prev => ({
        ...prev,
        [id]: "✅ Well done! Your response shows leadership under pressure."
      }));
    }
  };

  const questions = [
    // Part 1: Your Role and Experience
    { id: 'q1', part: 1, text: "Describe a typical shift at your job. What are your primary responsibilities from start to finish?" },
    { id: 'q2', part: 1, text: "What inspired you to pursue a career in civil aviation or air traffic control?" },
    { id: 'q3', part: 1, text: "What do you believe are the three most important qualities for a successful air traffic controller or civil aviation professional?" },
    { id: 'q4', part: 1, text: "Describe a situation where you had to coordinate with a pilot and another air traffic controller to resolve a problem." },
    { id: 'q5', part: 1, text: "How do you manage stress and maintain focus during high-pressure situations or busy periods?" },

    // Part 2: Routine Operations and Communication
    { id: 'q6', part: 2, text: "Explain the standard phraseology you would use to give an aircraft clearance to land." },
    { id: 'q7', part: 2, text: "What steps do you take to ensure clear and concise communication, especially when dealing with a pilot from a different country?" },
    { id: 'q8', part: 2, text: "How would you explain a temporary runway closure or a taxiway change to a pilot?" },
    { id: 'q9', part: 2, text: "Describe your procedure for a routine handoff of an aircraft to the next control sector." },
    { id: 'q10', part: 2, text: "What information is essential to include in a pre-shift briefing with your colleagues?" },
    { id: 'q11', part: 2, text: "How do you handle a situation where a pilot's transmission is unclear or you have a poor radio connection?" },
    { id: 'q12', part: 2, text: "A pilot reports a minor maintenance issue that does not require an emergency declaration. What information do you need, and what advice would you provide?" },

    // Part 3: Safety and Emergency Scenarios
    { id: 'q13', part: 3, text: "What is your immediate course of action if a pilot declares a medical emergency on board?" },
    { id: 'q14', part: 3, text: "Describe a time when you had to manage an aircraft with a declared emergency, such as an engine failure or an electrical issue." },
    { id: 'q15', part: 3, text: "What procedures do you follow for a \"lost communication\" aircraft? How do you re-establish contact?" },
    { id: 'q16', part: 3, text: "How would you coordinate with emergency services for a fire or other serious incident on the runway?" },
    { id: 'q17', part: 3, text: "A pilot reports a bird strike. What information do you need, and what are your first instructions to them?" },
    { id: 'q18', part: 3, text: "How do you maintain calmness and focus during a high-stress emergency?" },
    { id: 'q19', part: 3, text: "What would you do if you noticed a potential runway incursion incident?" },
    { id: 'q20', part: 3, text: "Describe the procedure for an unplanned go-around or missed approach." },

    // Part 4: Problem-Solving and Professional Growth
    { id: 'q21', part: 4, text: "Describe a time you had to make a difficult decision under pressure. What was the outcome?" },
    { id: 'q22', part: 4, text: "How do you resolve a situation where a pilot's flight plan does not match the information in your system?" },
    { id: 'q23', part: 4, text: "What would you do if you noticed a colleague was not following standard operating procedures?" },
    { id: 'q24', part: 4, text: "How do you handle a pilot who is frustrated, angry, or questioning your instructions?" },
    { id: 'q25', part: 4, text: "What is the most challenging thing you've had to learn in your career so far?" },
    { id: 'q26', part: 4, text: "How do you stay up-to-date with new regulations and technologies in civil aviation?" },
    { id: 'q27', part: 4, text: "Where do you see yourself in five years within the aviation industry?" },
    { id: 'q28', part: 4, text: "How would you describe the relationship between air traffic controllers and pilots?" },
    { id: 'q29', part: 4, text: "What is the biggest misconception that people have about your job?" },
    { id: 'q30', part: 4, text: "What advice would you give to someone who is just starting their career in civil aviation?" }
  ];

  const renderPart = (partNumber, title) => (
    <>
      <h2 className="text-2xl font-bold text-[#0056b3] mt-8 mb-6">{title}</h2>
      {questions
        .filter(q => q.part === partNumber)
        .map(q => (
          <div key={q.id} className="mb-6 p-5 bg-[#f8f9fa] border-l-4 border-[#0056b3] rounded">
            <h3 className="font-bold text-lg text-[#0056b3] mb-2">{q.id.slice(1)}. {q.text}</h3>
            <textarea
              value={answers[q.id] || ''}
              onChange={(e) => handleInputChange(q.id, e.target.value)}
              placeholder="Your response..."
              className="w-full p-3 border border-gray-300 rounded mb-3"
              rows="4"
            />
            <button
              onClick={() => handleSubmit(q.id)}
              className="px-4 py-2 bg-[#0056b3] text-white rounded hover:bg-[#004a99] transition"
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
    </>
  );

  return (
    <div className="font-sans bg-[#f7f9fc] text-[#2c3e50] leading-relaxed relative">
      {/* Top Right Navigation */}
      <nav className="absolute top-4 right-4 z-10 bg-[#0056b3cc] backdrop-blur-md rounded-2xl p-2 shadow-lg">
        <ul className="flex list-none m-0 p-0 gap-6">
          <li><a href="/" className="text-white no-underline font-semibold text-sm hover:text-[#f0f0f0] transition">Home</a></li>
          <li><a href="/about" className="text-white no-underline font-semibold text-sm hover:text-[#f0f0f0] transition">About us</a></li>
          <li><a href="/pricing" className="text-white no-underline font-semibold text-sm hover:text-[#f0f0f0] transition">Pricing Plans</a></li>
          <li><a href="/lexicon" className="text-white no-underline font-semibold text-sm hover:text-[#f0f0f0] transition">Lexicon</a></li>
          <li><a href="/teacher" className="text-white no-underline font-semibold text-sm hover:text-[#f0f0f0] transition">Teacher</a></li>
          <li><a href="/contact" className="text-white no-underline font-semibold text-sm hover:text-[#f0f0f0] transition">Contact</a></li>
        </ul>
      </nav>

      {/* Header */}
      <header className="text-center py-10 px-5 bg-[#0056b3] text-white">
        <h1 className="text-2xl md:text-3xl font-bold">✈️ Professional Practice Scenarios: Civil Aviation Professionals</h1>
        <p className="mt-2">Solve real operational challenges using English as your tool.</p>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-10 px-5">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-[#0056b3] mb-4">🎯 After completing this lesson, you will be able to:</h2>
          <ul className="list-disc pl-5 space-y-1 mb-8">
            <li>Communicate clearly using ICAO-standard phraseology.</li>
            <li>Lead during emergencies like medical incidents or engine failure.</li>
            <li>Resolve conflicts between pilots, controllers, and systems.</li>
            <li>Maintain calmness and precision under pressure.</li>
          </ul>

          {renderPart(1, "Part 1: Your Role and Experience")}
          {renderPart(2, "Part 2: Routine Operations and Communication")}
          {renderPart(3, "Part 3: Safety and Emergency Scenarios")}
          {renderPart(4, "Part 4: Problem-Solving and Professional Growth")}
        </div>
      </div>
    </div>
  );
};

export default AviationPilotATCScenario;