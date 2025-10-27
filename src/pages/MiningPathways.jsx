import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Data for the Pathway ---
const pathwayData = [
  {
    phase: "Phase 1: Foundations of Mining & Earth Science (Units 1–25)",
    englishFocus: "<strong>English Focus:</strong> Present Simple, prepositions, core vocabulary for geology, minerals, and methods.",
    items: [
      "<strong>Units 1–5:</strong> Introduction to Mining & Geology<br><em>Vocabulary: igneous, sedimentary rocks; surface vs. underground mining.</em>",
      "<strong>Units 6–10:</strong> Mineralogy & Resource Estimation<br><em>Passive voice: \"The ore is estimated at 2 million tonnes.\"</em>",
      "<strong>Units 11–15:</strong> Mine Life Cycle<br><em>Sequence words: first, then, finally; explaining exploration to closure.</em>",
      "<strong>Units 16–20:</strong> Health & Safety Fundamentals<br><em>Modal verbs: \"You must wear PPE.\" Safety terms: hazard, risk.</em>",
      "<strong>Units 21–25:</strong> Equipment & Machinery<br><em>Vocabulary: excavator, dump truck, drill jumbo; describing functions.</em>"
    ]
  },
  {
    phase: "Phase 2: Underground Operations & Infrastructure (Units 26–50)",
    englishFocus: "<strong>English Focus:</strong> Giving instructions, technical descriptions, conditionals.",
    items: [
      "<strong>Units 26–30:</strong> Tunneling & Excavation Methods<br><em>Imperatives: \"Drill here,\" \"Support the roof.\" Cause-and-effect language.</em>",
      "<strong>Units 31–35:</strong> Ventilation & Airflow Management<br><em>Conditional: \"If the fan fails, air quality will drop.\"</em>",
      "<strong>Units 36–40:</strong> Rock Mechanics & Ground Support<br><em>Describing properties: brittle, ductile; support systems terminology.</em>",
      "<strong>Units 41–45:</strong> Dewatering & Pumping<br><em>Reporting issues concisely: \"Pump offline at Level 3.\"</em>",
      "<strong>Units 46–50:</strong> Transport & Logistics<br><em>Vocabulary: conveyor belt, haulage truck; team communication.</em>"
    ]
  },
  {
    phase: "Phase 3: Surface Mining & Processing (Units 51–75)",
    englishFocus: "<strong>English Focus:</strong> Explaining large-scale ops, reporting progress, environmental impact.",
    items: [
      "<strong>Units 51–55:</strong> Open-Pit Mining & Blasting<br><em>Blasting terms: charge, detonator; giving warnings clearly.</em>",
      "<strong>Units 56–60:</strong> Material Handling<br><em>Phrasal verbs: \"haul away,\" \"load up\"; system descriptions.</em>",
      "<strong>Units 61–65:</strong> Mineral Processing<br><em>Terms: crusher, concentrator; chemical process explanations.</em>",
      "<strong>Units 66–70:</strong> Tailings & Waste Management<br><em>Discussing impact; passive voice: \"Waste is stored in containment.\"</em>",
      "<strong>Units 71–75:</strong> Reclamation & Closure<br><em>Vocabulary: rehabilitate, reforest; future planning language.</em>"
    ]
  },
  {
    phase: "Phase 4: Safety, Regulations & Risk Management (Units 76–100)",
    englishFocus: "<strong>English Focus:</strong> Incident reports, safety briefings, legal jargon.",
    items: [
      "<strong>Units 76–80:</strong> Incident Reporting & Investigation<br><em>Past Simple: \"The drill failed at 14:00.\" Formal report structure.</em>",
      "<strong>Units 81–85:</strong> Emergency Response & Evacuation<br><em>Imperative commands: \"Evacuate immediately!\" Calm leadership.</em>",
      "<strong>Units 86–90:</strong> Regulatory Compliance<br><em>Legal terms; modals: \"must,\" \"have to\" for obligations.</em>",
      "<strong>Units 91–95:</strong> Risk Assessment & Mitigation<br><em>Explaining risks and proposing solutions.</em>",
      "<strong>Units 96–100:</strong> Audits & Inspections<br><em>Answering inspector questions confidently.</em>"
    ]
  },
  {
    phase: "Phase 5: Financials & Project Management (Units 101–125)",
    englishFocus: "<strong>English Focus:</strong> Business communication, persuasion, formal presentations.",
    items: [
      "<strong>Units 101–105:</strong> Mine Economics & Feasibility Studies<br><em>Vocabulary: ROI, CAPEX; discussing financial viability.</em>",
      "<strong>Units 106–110:</strong> Budgeting & Cost Control<br><em>Explaining budget reports; negotiating suppliers.</em>",
      "<strong>Units 111–115:</strong> Project Management<br><em>Planning projects; using Gantt charts, milestones.</em>",
      "<strong>Units 116–120:</strong> Stakeholder Communication<br><em>Presenting to investors, communities, regulators.</em>",
      "<strong>Units 121–125:</strong> Contract Negotiation<br><em>Persuasive language, formal communication, legal terms.</em>"
    ]
  },
  {
    phase: "Phase 6: Leadership & Innovation (Units 126–150)",
    englishFocus: "<strong>English Focus:</strong> Team leadership, strategic communication, new tech.",
    items: [
      "<strong>Units 126–130:</strong> Team Leadership & Motivation<br><em>Giving feedback, coaching, motivating teams.</em>",
      "<strong>Units 131–135:</strong> Managing Intercultural Teams<br><em>Cross-cultural skills; respectful conflict handling.</em>",
      "<strong>Units 136–140:</strong> Autonomous Systems in Mining<br><em>Explaining self-driving trucks, AI monitoring.</em>",
      "<strong>Units 141–145:</strong> Sustainable Mining Practices<br><em>Discussing ESG, carbon footprint, CSR initiatives.</em>",
      "<strong>Units 146–150:</strong> Final Project & Presentation<br><em>Deliver a capstone presentation on a real-world mining project.</em>"
    ]
  }
];

const exampleUnitData = {
  title: "📘 Example Unit: Unit 32 – Ventilation & Airflow Management",
  description: "This unit introduces the theory and practical application of mine ventilation systems.",
  items: [
    "<strong>Lecture 1: Principles of Mine Ventilation</strong><br><em>Key concepts: airflow, pressure, resistance; vocabulary: intake, return.</em>",
    "<strong>Lecture 2: System Design & Fans</strong><br><em>Types of fans; calculating required airflow.</em>",
    "<strong>Lecture 3: Emergency Scenarios</strong><br><em>Role-play: Fan failure. Report to shift boss: \"Ventilation lost at Sector B.\"</em>",
    "<strong>Lecture 4: Communication with the Team</strong><br><em>Give clear updates: \"Air quality is stable. Continue drilling.\"</em>"
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
      background: #27ae60;
      color: white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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
      background: #e8f5e8;
      border-left: 4px solid #27ae60;
      border-radius: 8px;
    }
    .phase h3 {
      color: #27ae60;
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
      border: 1px dashed #27ae60;
    }
    .example-unit h4 {
      color: #27ae60;
    }
    footer {
      text-align: center;
      padding: 40px;
      background: #27ae60;
      color: white;
      margin-top: 60px;
    }
    
    /* Navigation Bar Styling */
    .top-nav {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 10;
      background-color: rgba(45, 65, 52, 0.8); /* Semi-transparent dark green */
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
      color: #d1e2d1;
    }
  `}} />
);


// --- Main Component ---
function MiningPathwayPage() {
  
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
        <h1>⛏️ Mining Engineering Mastery Pathway</h1>
        <p>A 150-Session Program for Global Professionals</p>
      </header>

      <div className="container">

        <div className="pathway">
          <p>This pathway is designed to transform students into well-rounded mining professionals who can operate and communicate with confidence in any international environment. The curriculum progresses from foundational geological knowledge to advanced safety protocols and business operations.</p>

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

export default MiningPathwayPage;