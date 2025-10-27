import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Data for the Pathway ---
const pathwayData = [
  {
    phase: "Phase 1: Foundations & Upstream Operations (Units 1–24)",
    englishFocus: "<strong>English Focus:</strong> Present Simple for facts and routines, core vocabulary for geology, exploration, and drilling.",
    items: [
      "<strong>Units 1–4:</strong> Introduction to the Oil & Gas Industry<br><em>Industry terminology (upstream, midstream, downstream), history of oil and gas.</em>",
      "<strong>Units 5–8:</strong> Geology & Exploration<br><em>Vocabulary for geological formations (reservoir, shale), explaining the exploration process.</em>",
      "<strong>Units 9–12:</strong> Drilling & Well Operations<br><em>Technical terms for drilling equipment (drill bit, derrick), team communication.</em>",
      "<strong>Units 13–16:</strong> Production & Reservoir Engineering<br><em>Explaining pressure, flow rate; using passive voice.</em>",
      "<strong>Units 17–20:</strong> Health & Safety Fundamentals<br><em>Modal verbs (must, should), safety terms (PPE, blowout).</em>",
      "<strong>Units 21–24:</strong> Onshore vs. Offshore Operations<br><em>Comparing environments and their challenges.</em>"
    ]
  },
  {
    phase: "Phase 2: Midstream & Downstream Operations (Units 25–48)",
    englishFocus: "<strong>English Focus:</strong> Explaining processes, sequence words, detailed instructions.",
    items: [
      "<strong>Units 25–29:</strong> Transport & Storage<br><em>Vocabulary for pipelines, tankers; logistics and timelines.</em>",
      "<strong>Units 30–34:</strong> Gas Processing & Liquefaction<br><em>Cause-and-effect language to explain technical processes.</em>",
      "<strong>Units 35–39:</strong> Refining & Petrochemicals<br><em>Terms for distillation column, reactor; describing chemical processes.</em>",
      "<strong>Units 40–44:</strong> Quality Control & Measurement<br><em>Vocabulary for volume, density; accurate reporting.</em>",
      "<strong>Units 45–48:</strong> Environmental & Compliance<br><em>Discussing impact; passive voice for regulations.</em>"
    ]
  },
  {
    phase: "Phase 3: Maintenance & Risk Management (Units 49–72)",
    englishFocus: "<strong>English Focus:</strong> Reporting incidents, safety briefings, legal jargon.",
    items: [
      "<strong>Units 49–53:</strong> Predictive & Preventive Maintenance<br><em>Explaining schedules; future tense for planned actions.</em>",
      "<strong>Units 54–58:</strong> Asset Integrity & Corrosion Control<br><em>NDT, ultrasound; reporting equipment condition.</em>",
      "<strong>Units 59–63:</strong> Incident Reporting & Investigation<br><em>Writing formal reports; Past Simple for events.</em>",
      "<strong>Units 64–68:</strong> Emergency Response & Crisis Management<br><em>Imperative verbs for calm commands.</em>",
      "<strong>Units 69–72:</strong> Regulatory Compliance & Audits<br><em>Legal terms; communicating with inspectors.</em>"
    ]
  },
  {
    phase: "Phase 4: Business, Finance & Commercial (Units 73–96)",
    englishFocus: "<strong>English Focus:</strong> Business communication, persuasion, formal presentations.",
    items: [
      "<strong>Units 73–77:</strong> Oil & Gas Economics<br><em>Vocabulary for ROI, CAPEX; discussing financial reports.</em>",
      "<strong>Units 78–82:</strong> Contracts & Negotiation<br><em>Persuasive language, legal jargon, formal communication.</em>",
      "<strong>Units 83–87:</strong> Project Management<br><em>Planning projects; project management terminology.</em>",
      "<strong>Units 88–92:</strong> Stakeholder Communication<br><em>Presenting to diverse audiences; managing Q&A.</em>",
      "<strong>Units 93–96:</strong> Public Relations & Crisis Communication<br><em>Handling media; crafting public statements.</em>"
    ]
  },
  {
    phase: "Phase 5: Technology & Innovation (Units 97–120)",
    englishFocus: "<strong>English Focus:</strong> Describing new tech, presenting research, professional discussion.",
    items: [
      "<strong>Units 97–101:</strong> Digitalization & Automation<br><em>IoT, AI; complex technical descriptions.</em>",
      "<strong>Units 102–106:</strong> Renewable Energy Integration<br><em>Discussing sustainable sources; fossil vs. renewables.</em>",
      "<strong>Units 107–111:</strong> Carbon Capture & Storage<br><em>Environmental tech; accurate technical terms.</em>",
      "<strong>Units 112–116:</strong> Offshore Wind & Solar<br><em>Vocabulary for new energy; benefits and challenges.</em>",
      "<strong>Units 117–120:</strong> Future of Energy & Global Trends<br><em>Global policy; debating future trends.</em>"
    ]
  },
  {
    phase: "Phase 6: Leadership & Capstone Project (Units 121–141)",
    englishFocus: "<strong>English Focus:</strong> Team leadership, strategic communication, final presentation.",
    items: [
      "<strong>Units 121–125:</strong> Team Leadership & Motivation<br><em>Giving feedback, coaching, motivating teams.</em>",
      "<strong>Units 126–130:</strong> Managing Intercultural Teams<br><em>Cross-cultural skills; respectful conflict handling.</em>",
      "<strong>Units 131–135:</strong> Ethics & Corporate Social Responsibility<br><em>Discussing dilemmas; presenting CSR initiatives.</em>",
      "<strong>Units 136–141:</strong> Final Project & Presentation<br><em>Deliver a capstone presentation on a real-world oil and gas project.</em>"
    ]
  }
];

const exampleUnitData = {
  title: "📘 Example Unit: Unit 10 – Drilling & Well Operations",
  description: "This unit introduces the theory and practical application of drilling and well operations.",
  items: [
    "<strong>Lecture 1: The Drilling Process</strong><br><em>Focus on technical vocabulary: drill bit, drilling rig, wellbore, casing.</em>",
    "<strong>Lecture 2: Routine Checks & Reporting</strong><br><em>Practice Present Simple for checks; Past Simple for recent issues.</em>",
    "<strong>Lecture 3: Emergency Scenarios</strong><br><em>Role-play a pressure surge. Report clearly to supervisor.</em>",
    "<strong>Lecture 4: Communication with the Team</strong><br><em>Give clear instructions using imperatives and phrasal verbs.</em>"
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
      background: #d35400;
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
      background: #fff4e6;
      border-left: 4px solid #d35400;
      border-radius: 8px;
    }
    .phase h3 {
      color: #d35400;
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
      border: 1px dashed #d35400;
    }
    .example-unit h4 {
      color: #d35400;
    }
    footer {
      text-align: center;
      padding: 40px;
      background: #d35400;
      color: white;
      margin-top: 60px;
    }

    /* Navigation Bar Styling */
    .top-nav {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 10;
      background-color: rgba(211, 84, 0, 0.8);
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
      color: #f9cb9c;
    }
  `}} />
);


// --- Main Component ---
function OilGasPathwayPage() {
  
  // Styles from the original <body> tag
  const bodyStyles = {
    fontFamily: "'Segoe UI', sans-serif",
    background: '#f7f9fc',
    color: '#2c3e50',
    lineHeight: 1.6,
    position: 'relative' // Keep relative for nav positioning
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
        <h1>🛢️ Oil & Gas Mastery Pathway</h1>
        <p>A 141-Session Program for Global Professionals</p>
      </header>

      <div className="container">

        <div className="pathway">
          <p>This pathway is designed to transform students into highly skilled oil and gas professionals who can operate and communicate with confidence in any international environment. The curriculum progresses from foundational geological knowledge to advanced safety protocols and business operations.</p>

          {/* Render Phases Dynamically */}
          {pathwayData.map((phaseData) => (
            <div className="phase" key={phaseData.phase}>
              <h3>{phaseData.phase}</h3>
              <p dangerouslySetInnerHTML={{ __html: phaseData.englishFocus }} />
              <ul>
                {phaseData.items.map((item, index) => (
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

export default OilGasPathwayPage;