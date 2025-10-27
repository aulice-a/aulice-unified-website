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
      background: #800020;
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
      color: #800020;
    }
    p, ul, ol {
      margin: 10px 0;
    }
    .exercise {
      background: #f8f9fa;
      padding: 20px;
      margin: 20px 0;
      border-left: 4px solid #800020;
      border-radius: 6px;
    }
    .btn {
      display: inline-block;
      padding: 10px 20px;
      background: #800020;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      margin: 10px 0;
      font-size: 14px;
    }
    .inline-input {
      width: 200px;
      padding: 6px 10px;
      margin: 0 5px;
      border: 2px solid #800020;
      border-radius: 4px;
      font-size: 16px;
      font-family: inherit;
      color: #800020;
      background: #f8f9fa;
    }
    .inline-input:focus {
      outline: none;
      background: white;
      box-shadow: 0 0 0 2px rgba(128, 0, 32, 0.3);
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
      background: #800020;
      color: white;
      margin-top: 60px;
    }
    .nav-links {
      text-align: center;
      margin: 30px 0;
    }
    .nav-links a {
      margin: 0 10px;
      color: #800020;
      text-decoration: none;
      font-weight: bold;
    }
  `}} />
);

// --- Main Component ---
function MedicalUnit1Page() {
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
        <h1>🩺 Unit 1: Introduction to Human Anatomy & Medical Terminology</h1>
        <p>Foundations of Global Healthcare</p>
      </header>

      <div className="container">

        <h2>🎯 After completing this unit, you will be able to:</h2>
        <ul>
          <li>Identify and name the major human organ systems.</li>
          <li>Understand the basic function of each system.</li>
          <li>Define and use core medical terms and common prefixes/suffixes.</li>
          <li>Use the Present Simple tense to describe biological processes and facts.</li>
        </ul>

        {/* Lesson 1: Human Anatomy */}
        <div className="exercise">
          <h3>Lesson 1: Human Anatomy</h3>
          <h4>Exercise 1: Vocabulary & Definitions</h4>
          <p>Match the term to its correct definition.</p>
          <table>
            <thead>
              <tr><th>Term</th><th>Definition</th></tr>
            </thead>
            <tbody>
              <tr><td>Skeletal System</td><td>Provides structure and support for the body.</td></tr>
              <tr><td>Muscular System</td><td>Enables movement and maintains posture.</td></tr>
              <tr><td>Circulatory System</td><td>Transports blood, oxygen, and nutrients.</td></tr>
              <tr><td>Respiratory System</td><td>Enables exchange of oxygen and CO₂.</td></tr>
              <tr><td>Nervous System</td><td>Transmits signals between brain and body.</td></tr>
            </tbody>
          </table>
          <textarea placeholder="Write your answers (e.g., Skeletal System - D)"></textarea>
          <button className="btn">✅ Submit</button>
        </div>

        {/* Lesson 2: Medical Terminology */}
        <div className="exercise">
          <h3>Lesson 2: Core Medical Terminology</h3>
          <h4>Exercise 2: Understanding Prefixes & Suffixes</h4>
          <p>Complete the sentences using the correct prefix or suffix.</p>
          <ol>
            <li>The doctor specializes in the <input type="text" className="inline-input" />vascular system, which involves the heart.</li>
            <li>The patient's high blood pressure is called hyper<input type="text" className="inline-input" />.</li>
            <li>An inflammation of the liver is known as hepat<input type="text" className="inline-input" />.</li>
            <li>A specialist in heart disease is a cardi<input type="text" className="inline-input" />.</li>
            <li>Hypo<input type="text" className="inline-input" /> is a condition of low blood sugar.</li>
          </ol>
          <button className="btn">✅ Submit</button>
        </div>

        <div className="exercise">
          <h4>Exercise 3: Gap-Fill & Substitution</h4>
          <p>Fill in the blanks with the correct term: <strong>anatomy, diagnosis, symptom, prognosis, prescription</strong></p>
          <ol>
            <li>The doctor's <input type="text" className="inline-input" /> was pneumonia.</li>
            <li>A common <input type="text" className="inline-input" /> of the flu is a high fever.</li>
            <li>Human <input type="text" className="inline-input" /> is the study of body structure.</li>
            <li>The doctor wrote a <input type="text" className="inline-input" /> for antibiotics.</li>
            <li>The patient's <input type="text" className="inline-input" /> is good, and recovery is expected.</li>
          </ol>
          <button className="btn">✅ Submit</button>
        </div>

        {/* Lesson 3: Grammar */}
        <div className="exercise">
          <h3>Lesson 3: Grammar & Communication</h3>
          <h4>Exercise 4: Present Simple – Routine Processes</h4>
          <p>Complete the sentences using the correct verb form.</p>
          <ol>
            <li>The heart <input type="text" className="inline-input" /> (pump) blood through the body.</li>
            <li>The lungs <input type="text" className="inline-input" /> (take) in oxygen.</li>
            <li>The skeletal system <input type="text" className="inline-input" /> (support) the body.</li>
            <li>The muscles <input type="text" className="inline-input" /> (contract) and <input type="text" className="inline-input" /> (relax).</li>
            <li>A nerve cell <input type="text" className="inline-input" /> (transmit) electrical signals.</li>
          </ol>
          <button className="btn">✅ Submit</button>
        </div>

        <div className="exercise">
          <h4>Exercise 5: Sentence Scramble</h4>
          <p>Put the words in order to make correct sentences.</p>
          <ol>
            <li>circulatory system / transports / the body / blood / through<br /><input type="text" className="inline-input" style={{ width: '350px' }} /></li>
            <li>doctor / a diagnosis / a patient / gives / a<br /><input type="text" className="inline-input" style={{ width: '350px' }} /></li>
            <li>the muscular system / helps / with / body movement<br /><input type="text" className="inline-input" style={{ width: '350px' }} /></li>
          </ol>
          <button className="btn">✅ Submit</button>
        </div>

        {/* Lesson 4: Dialogue */}
        <div className="exercise">
          <h3>Lesson 4: Professional Dialogue</h3>
          <h4>Exercise 6: Dialogue Completion</h4>
          <p>Complete the conversation between a doctor and a nurse.</p>
          <p><strong>Doctor:</strong> "Nurse, I've just seen a new patient. Can you <input type="text" className="inline-input" /> her vital signs?"</p>
          <p><strong>Nurse:</strong> "Certainly, Doctor. What are her main <input type="text" className="inline-input" />?"</p>
          <p><strong>Doctor:</strong> "She has a headache and a high temperature. We need to monitor her <input type="text" className="inline-input" />."</p>
          <p><strong>Nurse:</strong> "Understood. I will record all her vitals and update her <input type="text" className="inline-input" />."</p>
          <p><strong>Doctor:</strong> "Thank you. Please also make sure she gets her prescribed <input type="text" className="inline-input" /> on time."</p>
          <button className="btn">✅ Submit</button>
        </div>

        <div className="exercise">
          <h4>Exercise 7: Short Answer Questions</h4>
          <p>Answer in clear, professional English.</p>
          <ol>
            <li>What is the main difference between a symptom and a diagnosis?</li>
            <li>Why is the nervous system essential for a doctor?</li>
            <li>How does the skeletal system protect the body?</li>
          </ol>
          <textarea placeholder="Your answers..." rows="6"></textarea>
          <button className="btn">✅ Submit</button>
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

export default MedicalUnit1Page;