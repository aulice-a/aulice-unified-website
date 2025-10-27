import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Helper Component for <style> ---
// This component injects the original <style> tag directly into the page.
const PageStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', sans-serif;
      background: #f7f9fc;
      color: #2c3e50;
      line-height: 1.6;
    }
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
    .exercise {
      background: #f8f9fa;
      padding: 20px;
      margin: 20px 0;
      border-left: 4px solid #2c3e50;
      border-radius: 6px;
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
    .inline-input {
      width: 180px;
      padding: 6px 10px;
      margin: 0 5px;
      border: 2px solid #2c3e50;
      border-radius: 4px;
      font-size: 16px;
      font-family: 'Segoe UI', sans-serif;
      color: #2c3e50;
      background: #f8f9fa;
    }
    .inline-input:focus {
      outline: none;
      background: white;
      box-shadow: 0 0 0 2px rgba(44, 62, 80, 0.3);
    }
    textarea {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-family: inherit;
    }
    footer {
      text-align: center;
      padding: 40px;
      background: #2c3e50;
      color: white;
      margin-top: 60px;
    }
    .nav-links {
      text-align: center;
      margin: 30px 0;
    }
    .nav-links a {
      margin: 0 10px;
      color: #2c3e50;
      text-decoration: none;
      font-weight: bold;
    }
  `}} />
);

// --- Main Component ---
function LogisticsUnit1Page() {
  // Styles from the original <body> tag
  const bodyStyles = {
    fontFamily: "'Segoe UI', sans-serif",
    background: '#f7f9fc',
    color: '#2c3e50',
    lineHeight: 1.6
  };

  // Note: This is a static conversion. The buttons and inputs are
  // not wired up to React state, as no checking logic was provided in the HTML.
  // To make this interactive, you would add useState for each input.
  
  return (
    <div style={bodyStyles}>
      <PageStyles />

      <header>
        <h1>🚚 Unit 1: Logistics English</h1>
        <p>Supply Chain Coordination & Problem Solving</p>
      </header>

      <div className="container">

        <h2>🎯 After completing this unit, you will be able to:</h2>
        <ul>
          <li>Report shipment delays clearly and professionally.</li>
          <li>Use key logistics vocabulary (ETA, BOL, customs clearance).</li>
          <li>Apply the Present Perfect tense to report changes.</li>
          <li>Write accurate, error-free logistics updates.</li>
          <li>Coordinate effectively between dispatcher, driver, and warehouse.</li>
        </ul>

        {/* Starting Point */}
        <div className="exercise">
          <h3>Starting Point: The Shipment Is Delayed</h3>
          <p>You are a logistics coordinator. The driver calls: "I’m stuck in traffic. I’ll be 2 hours late." What do you say?</p>
          <textarea placeholder="Your response..."></textarea>
          <button className="btn">✅ Submit</button>
        </div>

        {/* Example Dialogue */}
        <div className="exercise">
          <h3>Example: Dispatcher-Warehouse Dialogue</h3>
          <p><strong>Dispatcher:</strong> "Warehouse, this is Logistics. The inbound truck from Toronto is delayed by 2 hours due to congestion."</p>
          <p><strong>Warehouse:</strong> "Copy that. We’ll adjust the unloading schedule. Is the new ETA 14:00?"</p>
          <p><strong>Dispatcher:</strong> "Correct. I’ve updated the system. Please confirm receipt once unloaded."</p>
        </div>

        {/* Exercise 1: Vocabulary Match */}
        <div className="exercise">
          <h3>Exercise 1: Vocabulary Definitions</h3>
          <p>Match the term to its correct definition.</p>
          <table>
            <thead>
              <tr><th>Term</th><th>Definition</th></tr>
            </thead>
            <tbody>
              <tr><td>ETA</td><td>The expected time a shipment will arrive.</td></tr>
              <tr><td>BOL</td><td>Bill of Lading – legal document between shipper and carrier.</td></tr>
              <tr><td>Customs Clearance</td><td>Process of getting goods released by customs authorities.</td></tr>
            </tbody>
          </table>
          <textarea placeholder="Write your answers (e.g., ETA - The expected time...)"></textarea>
          <button className="btn">✅ Submit</button>
        </div>

        {/* Exercise 2: Present Perfect */}
        <div className="exercise">
          <h3>Exercise 2: Present Perfect – Reporting Changes</h3>
          <p>Complete the sentences with the correct form of the verb.</p>
          <ol>
            <li>The driver <input type="text" className="inline-input" /> (call). The truck is delayed.</li>
            <li>We <input type="text" className="inline-input" /> (update) the system with the new ETA.</li>
            <li>The warehouse <input type="text" className="inline-input" /> (confirm) receipt of the goods.</li>
          </ol>
          <button className="btn">✅ Submit</button>
        </div>

        {/* Exercise 3: Build the Update */}
        <div className="exercise">
          <h3>Exercise 3: Build the Logistics Update</h3>
          <p>Use these words to create a correct update message: has been delayed, new ETA, updated, confirmed</p>
          <p>"The shipment <input type="text" className="inline-input" /> due to weather. The <input type="text" className="inline-input" /> is 16:00. We have <input type="text" className="inline-input" /> the system. Warehouse has <input type="text" className="inline-input" /> receipt."</p>
          <button className="btn">✅ Submit</button>
        </div>

        {/* Exercise 4: Find Errors */}
        <div className="exercise">
          <h3>Exercise 4: Find and Correct the Errors</h3>
          <p>The dispatcher wrote this update. It has 4 errors.</p>
          <p>"The truck has delayed. The new ETA are 14:00. The warehouse was notifed. We has confirmed receipt."</p>
          <textarea placeholder="Corrected version..."></textarea>
          <button className="btn">✅ Submit</button>
        </div>

        {/* Exercise 5: Role-Play */}
        <div className="exercise">
          <h3>Exercise 5: Role-Play – Coordinate the Delay</h3>
          <p>Write a full dialogue between the dispatcher and the warehouse manager about a 3-hour delay due to mechanical issues.</p>
          <textarea placeholder="Your dialogue..." rows="6"></textarea>
          <button className="btn">✅ Submit</button>
        </div>

        {/* Professional Tip */}
        <div className="exercise">
          <h3>💡 Professional Tip</h3>
          <p>Always use clear, concise language. Say “has been delayed” not “is delayed.” This shows the action is complete and impacts the timeline.</p>
        </div>

        {/* Navigation */}
        <div className="nav-links">
          <a href="https://www.aulice.ca">🏠 Home</a>
          <a href="https://aulislab.netlify.app">🧩 Aulice Lab</a>
          <a href="https://aulice-lexicon.netlify.app">📘 Lexicon</a>
          <a href="https://teacher-aulice.netlify.app">👨‍🏫 Teacher Dashboard</a>
        </div>

      </div>

      <footer>
        <p>© 2025 Aulice Academy. Reality is programmable. Smart people are its architects.</p>
      </footer>
    </div>
  );
}

export default LogisticsUnit1Page;