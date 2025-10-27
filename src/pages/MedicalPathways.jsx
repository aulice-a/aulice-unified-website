import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Data for the Pathway ---
const pathwayData = [
  {
    phase: "Phase 1: Foundations & Human Anatomy (Units 1–25)",
    englishFocus: "<strong>English Focus:</strong> Present Simple for facts and routines, core vocabulary for anatomy, systems, and diseases.",
    items: [
      "<strong>Units 1–5:</strong> Introduction to Human Anatomy & Systems<br><em>Vocabulary: body parts, organ systems (skeletal, circulatory), anatomical directions.</em>",
      "<strong>Units 6–10:</strong> Common Medical Terminology & Prefixes<br><em>Roots and affixes: -itis, cardio-, gastro-.</em>",
      "<strong>Units 11–15:</strong> Vital Signs & Patient Assessment<br><em>Describing temperature, BP; imperative verbs: \"Sit down, please.\"</em>",
      "<strong>Units 16–20:</strong> Basic Pharmacology<br><em>Medication types: analgesics, antibiotics; explaining dosage.</em>",
      "<strong>Units 21–25:</strong> Asepsis & Infection Control<br><em>Modal verbs: \"must,\" \"should\"; terms: sterile, contaminate.</em>"
    ]
  },
  {
    phase: "Phase 2: Patient Communication & Diagnostics (Units 26–50)",
    englishFocus: "<strong>English Focus:</strong> Question formation, explaining diagnoses, empathetic communication.",
    items: [
      "<strong>Units 26–30:</strong> Taking a Patient History<br><em>Open-ended questions: \"Can you describe the pain?\"</em>",
      "<strong>Units 31–35:</strong> Symptom Reporting & Documentation<br><em>Precise descriptions; writing professional notes.</em>",
      "<strong>Units 36–40:</strong> Explaining a Diagnosis<br><em>Using non-technical language: \"You have an infection in your lungs.\"</em>",
      "<strong>Units 41–45:</strong> Managing Patient Questions<br><em>Responding with empathy: \"I understand this is worrying.\"</em>",
      "<strong>Units 46–50:</strong> Inter-Professional Communication<br><em>Consulting specialists; handover reports.</em>"
    ]
  },
  {
    phase: "Phase 3: Emergency Medicine & Triage (Units 51–75)",
    englishFocus: "<strong>English Focus:</strong> Clear commands, past tense for incident reporting.",
    items: [
      "<strong>Units 51–55:</strong> Triage in Emergency<br><em>Imperatives: \"Start IV,\" \"Monitor vitals.\" Prioritizing patients.</em>",
      "<strong>Units 56–60:</strong> First Aid & Trauma Management<br><em>Step-by-step instructions: \"Apply pressure to stop bleeding.\"</em>",
      "<strong>Units 61–65:</strong> Responding to Code Blue<br><em>Standardized CPR commands: \"Clear!\" \"Compressions!\"</em>",
      "<strong>Units 66–70:</strong> Incident Reporting & Investigation<br><em>Writing formal reports; Past Simple: \"The patient collapsed at 14:30.\"</em>",
      "<strong>Units 71–75:</strong> Crisis Management<br><em>Team coordination under extreme pressure.</em>"
    ]
  },
  {
    phase: "Phase 4: Pharmacology & Treatment Plans (Units 76–100)",
    englishFocus: "<strong>English Focus:</strong> Prescriptions, aftercare, patient compliance.",
    items: [
      "<strong>Units 76–80:</strong> Writing a Prescription<br><em>Abbreviations: q.d., b.i.d.; professional terminology.</em>",
      "<strong>Units 81–85:</strong> Explaining Medication Instructions<br><em>Modal verbs: \"should take,\" \"must avoid.\"</em>",
      "<strong>Units 86–90:</strong> Post-Op Care & Aftercare<br><em>Clear instructions: \"No driving for 24 hours.\"</em>",
      "<strong>Units 91–95:</strong> Patient Education & Compliance<br><em>Persuading patients to follow treatment.</em>",
      "<strong>Units 96–100:</strong> Discharge & Follow-Up<br><em>Discharge summaries; scheduling appointments.</em>"
    ]
  },
  {
    phase: "Phase 5: Surgical & Procedural English (Units 101–125)",
    englishFocus: "<strong>English Focus:</strong> Pre-op, intra-op, post-op communication, technical descriptions.",
    items: [
      "<strong>Units 101–105:</strong> Pre-Operative Assessment<br><em>Detailed history; explaining risks and consent.</em>",
      "<strong>Units 106–110:</strong> Surgical Instruments & Procedures<br><em>Vocabulary: scalpel, retractor; describing steps.</em>",
      "<strong>Units 111–115:</strong> Anesthesia & Sedation<br><em>Comforting language: \"You’ll feel relaxed and sleepy.\"</em>",
      "<strong>Units 116–120:</strong> Intra-Operative Communication<br><em>Precise team language: \"Suction,\" \"More light.\"</em>",
      "<strong>Units 121–125:</strong> Post-Operative Care<br><em>Recovery, pain management, complication monitoring.</em>"
    ]
  },
  {
    phase: "Phase 6: Professional Development & Leadership (Units 126–150)",
    englishFocus: "<strong>English Focus:</strong> Formal presentations, academic writing, strategic communication.",
    items: [
      "<strong>Units 126–130:</strong> Medical Research & Paper Writing<br><em>Abstracts, structure, citations.</em>",
      "<strong>Units 131–135:</strong> Presenting at a Medical Conference<br><em>Delivering research; managing Q&A.</em>",
      "<strong>Units 136–140:</strong> Leading a Medical Team<br><em>Delegation, feedback, motivation.</em>",
      "<strong>Units 141–145:</strong> Cross-Cultural Communication<br><em>Cultural sensitivity in healthcare.</em>",
      "<strong>Units 146–150:</strong> Final Capstone Project<br><em>Deliver a final presentation on a real-world medical case study.</em>"
    ]
  }
];

const exampleUnitData = {
  title: "📘 Example Unit: Unit 1 – Introduction to Human Anatomy & Systems",
  description: "This unit introduces foundational concepts of the human body and essential vocabulary.",
  items: [
    "<strong>Exercise 1: Vocabulary & Definitions</strong><br><em>Match: Skeletal, Muscular, Circulatory, Respiratory, Nervous to definitions.</em>",
    "<strong>Exercise 2: Present Simple – Routine Processes</strong><br><em>\"The heart ________ (pump) blood through the body.\"</em>",
    "<strong>Exercise 3: Describe a System</strong><br><em>Explain: Digestive, Endocrine, Immune systems.</em>",
    "<strong>Exercise 4: Short Answer Questions</strong><br><em>What's the difference between circulatory and respiratory systems?</em>"
  ]
};

// --- Helper Component for <style> ---
const PageStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    /* body styles are applied to the root div */
    header {
      text-align: center;
      padding: 40px 20px;
      background: #800020; /* Mahogany */
      color: white;
    }
    header h1 {
      font-size: 28px;
    }
    .container {
      max-width: 1000px;
      margin: 40px auto;
      padding: 30px;
    }
    .pathway {
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.1);
    }
    .phase {
      margin: 30px 0;
      padding: 20px;
      background: #f8f4f0; /* Light mahogany tint */
      border-left: 4px solid #800020; /* Mahogany */
      border-radius: 8px;
    }
    .phase h3 {
      color: #800020; /* Mahogany */
    }
    ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    li {
      margin: 8px 0;
    }
    .example-unit {
      margin: 30px 0;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      border: 1px dashed #800020; /* Mahogany */
    }
    .example-unit h4 {
      color: #800020; /* Mahogany */
    }
    footer {
      text-align: center;
      padding: 40px;
      background: #800020; /* Mahogany */
      color: white;
      margin-top: 60px;
    }
    
    /* Navigation Bar Styling */
    .top-nav {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 10;
      background-color: rgba(128, 0, 32, 0.8); /* Semi-transparent mahogany */
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
      color: #fff;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.875rem;
      transition: color 0.3s ease;
    }

    .top-nav a:hover {
      color: #ffb8c4;
    }
  `}} />
);


// --- Main Component ---
function MedicalPathwayPage() {
  
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
        <h1>⚕️ Medical Mastery Pathway</h1>
        <p>A 150-Session Program for Global Professionals</p>
      </header>

      <div className="container">

        <div className="pathway">
          <p>This pathway is designed to transform students into well-rounded medical professionals who can communicate with confidence in any international environment. The curriculum progresses from foundational knowledge to high-stakes emergency scenarios and leadership skills.</p>

          {/* Render Phases Dynamically */}
          {pathwayData.map((phase) => (
            <div className="phase" key={phase.phase}>
              <h3>{phase.phase}</h3>
              <p dangerouslySetInnerHTML={{ __html: phase.englishFocus }} />
              <ul>
                {phase.items.map((item, index) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            </div>
          ))}

          {/* Example Unit */}
          <div className="example-unit">
            <h4>{exampleUnitData.title}</h4>
            <p>{exampleUnitData.description}</p>
            <ul>
              {exampleUnitData.items.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>
        </div>

      </div>

      <footer>
        <p>© 2025 Aulice Academy. Reality is programmable. Smart people are its architects.</p>
      </footer>
    </div>
  );
}

export default MedicalPathwayPage;