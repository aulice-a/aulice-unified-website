import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Helper Component for <style> ---
// This component injects the original <style> tag directly into the page.
const PageStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    /* body styles applied to root div */
    header {
      text-align: center;
      padding: 60px 20px 40px;
      background: #0056b3;
      color: white;
      border-bottom: 6px solid #ffd700;
    }
    header h1 {
      font-size: 36px;
      margin-bottom: 12px;
    }
    .tagline {
      font-size: 18px;
      opacity: 0.9;
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
      color: #0056b3;
      margin: 25px 0 15px;
    }
    .example {
      background: #e8f4f8;
      padding: 15px;
      border-left: 4px solid #3498db;
      margin: 20px 0;
      border-radius: 6px;
      font-style: italic;
    }
    .vocab {
      background: #fffde7;
      padding: 15px;
      border-left: 4px solid #ffc107;
      margin: 20px 0;
      border-radius: 6px;
      font-size: 0.95em;
    }
    .exercise {
      background: #f8f9fa;
      padding: 25px;
      margin: 25px 0;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }
    input[type="text"], select, textarea {
      width: 100%;
      padding: 12px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 16px;
      font-family: inherit; /* Added to make sure textarea font matches */
    }
    button {
      padding: 12px 20px;
      background: #0056b3;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
      margin: 10px 0;
    }
    button:hover {
      background: #004599;
    }
    .feedback {
      margin-top: 20px;
      padding: 15px;
      border-radius: 6px;
      color: #fff;
    }
    .feedback.correct {
      background: #27ae60;
    }
    .feedback.incorrect {
      background: #c0392b;
    }
    .cta-btn {
      display: block;
      width: 100%;
      max-width: 400px;
      margin: 30px auto;
      padding: 14px;
      background: #0056b3;
      color: white;
      font-weight: bold;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      text-decoration: none; /* For <a> tags */
      text-align: center; /* For <a> tags */
    }
    .model-answer {
      background: #e8f4f8;
      padding: 15px;
      border-left: 4px solid #3498db;
      margin: 10px 0;
      border-radius: 6px;
      font-style: italic;
    }
  `}} />
);

// --- Main Component ---
function MiningUnit1Page() {
  // State for all inputs
  const [q0, setQ0] = useState("");
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [q4, setQ4] = useState("");
  const [q5, setQ5] = useState("");
  const [q6, setQ6] = useState("");
  const [q7, setQ7] = useState("");
  const [corrections, setCorrections] = useState("");
  const [report, setReport] = useState("");

  // State for feedback messages
  const [feedback0, setFeedback0] = useState({ text: '', type: '' });
  const [feedback1, setFeedback1] = useState({ text: '', type: '' });
  const [feedback2, setFeedback2] = useState({ text: '', type: '' });

  // State for visibility
  const [showExplanation0, setShowExplanation0] = useState(false);
  const [showCorrectionsAnswer, setShowCorrectionsAnswer] = useState(false);
  const [showReportAnswer, setShowReportAnswer] = useState(false);

  // --- Event Handlers ---

  const handleCheckStartingPoint = () => {
    if (q0 === "Understood. Evacuate lower levels and activate the backup pump.") {
      setFeedback0({ text: "✅ Correct! This is the professional response to a pump failure.", type: 'correct' });
      setShowExplanation0(true);
    } else {
      setFeedback0({ text: "❌ Try again. Think about safety and immediate action.", type: 'incorrect' });
      setShowExplanation0(false);
    }
  };

  const handleCheckExercise1 = () => {
    const answers = [
      "The process of removing water from a mine",
      "Secondary pump system used if the primary fails",
      "To remove personnel from a dangerous area"
    ];
    let correct = 0;
    if (q1 === answers[0]) correct++;
    if (q2 === answers[1]) correct++;
    if (q3 === answers[2]) correct++;
    
    setFeedback1({ text: `You got ${correct}/3 correct.`, type: correct === 3 ? 'correct' : 'incorrect' });
  };

  const handleCheckExercise2 = () => {
    const answers = ["is rising", "are evacuating", "is monitoring", "is operating"];
    const inputs = [q4, q5, q6, q7];
    let correct = 0;
    
    inputs.forEach((input, index) => {
      if (input.trim().toLowerCase() === answers[index]) correct++;
    });

    setFeedback2({ text: `You got ${correct}/4 correct.`, type: correct === 4 ? 'correct' : 'incorrect' });
  };

  const handleSubmitCorrections = () => {
    // Basic check, can be made more robust
    const text = corrections.toLowerCase();
    if (text.includes("is rising") && text.includes("are evacuating") && text.includes("is monitoring") && text.includes("is working")) {
      alert("Corrections look great!");
    } else {
      alert("Some corrections might be missing. Double-check!");
    }
  };
  
  const handleSubmitReport = () => {
    if(report.length > 20) {
      alert("Report submitted! Well done.");
    } else {
      alert("Please write a more detailed report.");
    }
  };

  const handleSaveToLexicon = (term) => {
    // In a real app, this would send data to a context or API
    alert(`"${term}" saved to your Lexicon!`);
  };

  // Styles from the original <body> tag
  const bodyStyles = {
    fontFamily: "'Segoe UI', sans-serif",
    background: '#f7f9fc',
    color: '#2c3e50',
    lineHeight: 1.6
  };
  
  return (
    <div style={bodyStyles}>
      <PageStyles />

      <header>
        <h1>Unit 1: Mining English</h1>
        <p className="tagline">Dewatering Systems & Emergency Response | Professional Mining Engineering</p>
      </header>

      <div className="container">
        {/* STARTING POINT */}
        <h2>🔥 Starting Point: The Pump Has Failed</h2>
        <p>You are a mining engineer. The night shift reports: "The dewatering pump at Level 3 has failed." What do you say?</p>
        <div className="exercise">
          <select id="q0" value={q0} onChange={(e) => setQ0(e.target.value)}>
            <option value="">-- Choose --</option>
            <option value="I’ll check it tomorrow.">I’ll check it tomorrow.</option>
            <option value="Understood. Evacuate lower levels and activate the backup pump.">Understood. Evacuate lower levels and activate the backup pump.</option>
            <option value="Just let the water rise. It’ll stop eventually.">Just let the water rise. It’ll stop eventually.</option>
            <option value="Tell them to fix it themselves.">Tell them to fix it themselves.</option>
          </select>
          <button onClick={handleCheckStartingPoint}>✅ Check Answer</button>
          {feedback0.text && (
            <div className={`feedback ${feedback0.type}`}>{feedback0.text}</div>
          )}
        </div>

        {/* EXPLANATION AFTER CHOICE */}
        {showExplanation0 && (
          <div id="explanation0">
            <div className="example">
              <p><strong>Correct:</strong> "Understood. Evacuate lower levels and activate the backup pump."</p>
              <p><strong>Why?</strong> In underground mining, water accumulation is a critical safety hazard. Immediate action is required to protect personnel and equipment.</p>
            </div>
          </div>
        )}

        {/* EXAMPLE */}
        <h2>📌 Example: Emergency Response Report</h2>
        <div className="example">
          <p><strong>Shift Supervisor:</strong> "The dewatering pump at Level 3 failed at 03:15. Water is rising at 0.4 meters per hour."<br />
          <strong>Mining Engineer:</strong> "Copy that. Evacuate Levels 4 and 5. Activate Pump B. I’m on my way to assess the failure."<br />
          <strong>Shift Supervisor:</strong> "Evacuation in progress. Pump B is online. Water rise has slowed."<br />
          <strong>Mining Engineer:</strong> "Good. Monitor levels and report every 15 minutes until stable."</p>
        </div>

        {/* VOCABULARY */}
        <div className="vocab">
          <p><strong>Dewatering</strong>: The process of removing water from a mine to allow safe operations</p>
          <p><strong>Backup pump</strong>: Secondary pump system used if the primary fails</p>
          <p><strong>Water rise rate</strong>: Speed at which water accumulates (e.g., 0.5 m/h)</p>
          <p><strong>Evacuate</strong>: To remove personnel from a dangerous area</p>
          <p><strong>Monitor levels</strong>: To continuously check water or pressure levels</p>
          <p><strong>System failure</strong>: When a critical system stops working</p>
        </div>

        {/* EXERCISE 1: Vocabulary Matching */}
        <div className="exercise">
          <h2>📝 Exercise 1: Match the Term to Its Meaning</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', margin: '10px 0' }}>
            <thead>
              <tr style={{ background: '#0056b3', color: 'white' }}>
                <th style={{ padding: '10px' }}>Term</th>
                <th style={{ padding: '10px' }}>Definition</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dewatering</td>
                <td>
                  <select id="q1" value={q1} onChange={(e) => setQ1(e.target.value)}>
                    <option value="">-- Choose --</option>
                    <option value="The process of removing water from a mine">The process of removing water from a mine</option>
                    <option value="Drilling for ore">Drilling for ore</option>
                    <option value="Transporting minerals">Transporting minerals</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Backup pump</td>
                <td>
                  <select id="q2" value={q2} onChange={(e) => setQ2(e.target.value)}>
                    <option value="">-- Choose --</option>
                    <option value="Secondary pump system used if the primary fails">Secondary pump system used if the primary fails</option>
                    <option value="A small hand pump">A small hand pump</option>
                    <option value="A decorative model">A decorative model</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Evacuate</td>
                <td>
                  <select id="q3" value={q3} onChange={(e) => setQ3(e.target.value)}>
                    <option value="">-- Choose --</option>
                    <option value="To remove personnel from a dangerous area">To remove personnel from a dangerous area</option>
                    <option value="To celebrate a success">To celebrate a success</option>
                    <option value_="">To take a break</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={handleCheckExercise1}>✅ Check Answers</button>
          {feedback1.text && (
            <div className={`feedback ${feedback1.type}`}>{feedback1.text}</div>
          )}
        </div>

        {/* EXERCISE 2: Present Continuous */}
        <div className="exercise">
          <h2>📝 Exercise 2: Present Continuous – Reporting Current Status</h2>
          <p>Complete the sentences with the correct form of the verb.</p>
          <ol>
            <li>The water <input type="text" id="q4" value={q4} onChange={(e) => setQ4(e.target.value)} /> (rise) at 0.4 meters per hour.</li>
            <li>We <input type="text" id="q5" value={q5} onChange={(e) => setQ5(e.target.value)} /> (evacuate) Levels 4 and 5.</li>
            <li>The team <input type="text" id="q6" value={q6} onChange={(e) => setQ6(e.target.value)} /> (monitor) the water levels every 15 minutes.</li>
            <li>The backup pump <input type="text" id="q7" value={q7} onChange={(e) => setQ7(e.target.value)} /> (operate) normally.</li>
          </ol>
          <button onClick={handleCheckExercise2}>✅ Check Answers</button>
          {feedback2.text && (
            <div className={`feedback ${feedback2.type}`}>{feedback2.text}</div>
          )}
        </div>

        {/* EXERCISE 3: Error Correction */}
        <div className="exercise">
          <h2>📝 Exercise 3: Find and Correct the Errors</h2>
          <p>The engineer wrote this report. It has 4 errors.</p>
          <blockquote>
            The water is rise at 0.4 m/h. We is evacuating the lower levels. The team monitoring the levels. The backup pump are working.
          </blockquote>
          <textarea id="corrections" rows="6" placeholder="1. 'is rise' → 'is rising'" value={corrections} onChange={(e) => setCorrections(e.target.value)}></textarea>
          <button onClick={handleSubmitCorrections}>✅ Submit</button>
          <button onClick={() => setShowCorrectionsAnswer(!showCorrectionsAnswer)}>
            {showCorrectionsAnswer ? 'Hide' : '🔍 Show'} Model Answer
          </button>
          {showCorrectionsAnswer && (
            <div className="model-answer">
              1. 'is rise' → 'is rising'<br />
              2. 'is evacuating' → 'are evacuating'<br />
              3. 'monitoring' → 'is monitoring'<br />
              4. 'are working' → 'is working'
            </div>
          )}
        </div>

        {/* EXERCISE 4: Role-Play */}
        <div className="exercise">
          <h2>📝 Exercise 4: Write the Emergency Report</h2>
          <p>Write a full dialogue between the shift supervisor and the mining engineer.</p>
          <p><strong>Supervisor:</strong> "The dewatering pump at Level 3 has failed."<br />
          <strong>Engineer:</strong> "Understood. What is the water rise rate?"</p>
          <textarea id="report" rows="6" placeholder="Supervisor: 'Water is rising at 0.4 m/h...'" value={report} onChange={(e) => setReport(e.target.value)}></textarea>
          <button onClick={handleSubmitReport}>✅ Submit</button>
          <button onClick={() => setShowReportAnswer(!showReportAnswer)}>
            {showReportAnswer ? 'Hide' : '🔍 Show'} Model Answer
          </button>
          {showReportAnswer && (
            <div className="model-answer">
              Supervisor: "Water is rising at 0.4 m/h. We’re evacuating Levels 4 and 5."<br />
              Engineer: "Copy that. Activate the backup pump and monitor levels every 15 minutes."<br />
              Supervisor: "Backup pump is online. Water rise has slowed."<b />
              Engineer: "Good. Keep me updated."
            </div>
          )}
        </div>

        <h2>💡 Professional Tip</h2>
        <p><strong>Use Present Continuous for ongoing actions:</strong> "is rising", "are evacuating", "is monitoring". This shows the action is happening now and requires attention.</p>

        <h2>📜 Industry Insight: Safety & System Integrity</h2>
        <p><strong>Immediate Response:</strong> "Any failure in dewatering systems must be treated as a critical incident. Evacuation and backup activation are mandatory to ensure safety."</p>

        <button onClick={() => handleSaveToLexicon('dewatering')} className="cta-btn">💾 Save 'dewatering' to Lexicon</button>
        <a href="https://noparent.netlify.app" target="_blank" rel="noopener noreferrer" className="cta-btn">▶️ Play: Mining Engineering Case Study</a>
        <a href="https://aulice-main.netlify.app#results" target="_blank" rel="noopener noreferrer" className="cta-btn">🎁 Claim Your Free Class</a>
      </div>
    </div>
  );
}

export default MiningUnit1Page;