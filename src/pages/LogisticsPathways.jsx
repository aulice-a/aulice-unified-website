import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Data for the Pathway ---
const pathwayData = [
  {
    phase: "Phase 1: Foundations of Logistics & Supply Chain (Units 1–30)",
    englishFocus: "<strong>English Focus:</strong> Present Simple, Past Simple, core vocabulary for supply chain roles and components.",
    items: [
      "<strong>Units 1–6:</strong> Introduction to Logistics & the Supply Chain<br><em>Terminology: supply chain, logistics, shipping; roles: logistics manager, freight forwarder.</em>",
      "<strong>Units 7–12:</strong> Modes of Transport<br><em>Vocabulary: air freight, ocean freight, road transport; comparing features.</em>",
      "<strong>Units 13–18:</strong> Warehouse Operations<br><em>Imperatives: \"Store here,\" \"Label clearly\"; equipment terms: forklift, pallet.</em>",
      "<strong>Units 19–24:</strong> Inventory Management<br><em>Quantifiers: much/many; concepts: stock level, inventory turnover.</em>",
      "<strong>Units 25–30:</strong> Documentation Fundamentals<br><em>Key documents: Bill of Lading, packing list; understanding purpose.</em>"
    ]
  },
  {
    phase: "Phase 2: Global Trade & Customs (Units 31–60)",
    englishFocus: "<strong>English Focus:</strong> Explaining processes, conditionals, legal terminology.",
    items: [
      "<strong>Units 31–36:</strong> Incoterms 2020<br><em>Responsibilities: EXW, FOB, DDP; conditional: \"If the buyer arranges pickup...\"</em>",
      "<strong>Units 37–42:</strong> Customs Procedures<br><em>Vocabulary: customs declaration, certificate of origin; duties and tariffs.</em>",
      "<strong>Units 43–48:</strong> International Regulations<br><em>Legal terms; passive voice: \"The goods are inspected by customs.\"</em>",
      "<strong>Units 49–54:</strong> Risk Management in Shipping<br><em>Discussing risks: delay, damage; proposing solutions.</em>",
      "<strong>Units 55–60:</strong> Freight Forwarding & Brokering<br><em>Negotiation role-play; persuasive language for rates and terms.</em>"
    ]
  },
  {
    phase: "Phase 3: Operations & Technology (Units 61–90)",
    englishFocus: "<strong>English Focus:</strong> Giving instructions, reporting issues, describing systems.",
    items: [
      "<strong>Units 61–66:</strong> Fleet & Route Management<br><em>Prepositions of movement; discussing fuel efficiency and route optimization.</em>",
      "<strong>Units 67–72:</strong> Supply Chain Technology<br><em>Describing GPS tracking, WMS; explaining system functions.</em>",
      "<strong>Units 73–78:</strong> Cold Chain Logistics<br><em>Vocabulary: refrigerated, chilled; discussing temperature protocols.</em>",
      "<strong>Units 79–84:</strong> Reverse Logistics<br><em>Explaining returns and recycling; cause-and-effect language.</em>",
      "<strong>Units 85–90:</strong> E-commerce Logistics<br><em>Challenges of last-mile delivery and online fulfillment.</em>"
    ]
  },
  {
    phase: "Phase 4: Communication & Client Relations (Units 91–120)",
    englishFocus: "<strong>English Focus:</strong> Professional emails, persuasion, conflict resolution.",
    items: [
      "<strong>Units 91–96:</strong> Professional Email & Report Writing<br><em>Formal emails: inquiries, complaints, follow-ups.</em>",
      "<strong>Units 97–102:</strong> Client Service<br><em>Role-playing interactions; polite and helpful language.</em>",
      "<strong>Units 103–108:</strong> Complaint Handling<br><em>De-escalation phrases; offering solutions professionally.</em>",
      "<strong>Units 109–114:</strong> Negotiation Skills<br><em>Negotiating rates, terms, contracts with confidence.</em>",
      "<strong>Units 115–120:</strong> Team Communication<br><em>Daily task discussions, progress reports, feedback.</em>"
    ]
  },
  {
    phase: "Phase 5: Leadership & Strategy (Units 121–150)",
    englishFocus: "<strong>English Focus:</strong> Strategic planning, formal presentations, team leadership.",
    items: [
      "<strong>Units 121–127:</strong> Strategic Sourcing & Procurement<br><em>Explaining sourcing strategies; managing supplier relationships.</em>",
      "<strong>Units 128–134:</strong> Supply Chain Design<br><em>Presenting new supply chain plans; using technical vocabulary.</em>",
      "<strong>Units 135–141:</strong> Project Management<br><em>Planning large-scale logistics projects; coordination skills.</em>",
      "<strong>Units 142–148:</strong> Leadership & Management<br><em>Giving instructions, motivating teams, performance reviews.</em>",
      "<strong>Units 149–150:</strong> Final Project & Presentation<br><em>Deliver a capstone presentation on a real-world logistics case study.</em>"
    ]
  }
];

const exampleUnitData = {
  title: "📘 Example Unit: Unit 13 – Warehouse Operations",
  description: "This unit introduces the theory and practical application of warehouse operations.",
  items: [
    "<strong>Lecture 1: Warehouse Layouts & Systems</strong><br><em>Focus on vocabulary: storage racks, aisles, receiving bay, shipping dock.</em>",
    "<strong>Lecture 2: Receiving & Put-Away Procedures</strong><br><em>Practice Present Simple for routines; imperatives: \"Scan the barcode.\"</em>",
    "<strong>Lecture 3: Order Picking & Packing</strong><br><em>Role-play: Incorrect order. Report to supervisor: \"We shipped the wrong SKU.\"</em>",
    "<strong>Lecture 4: Inventory Checks & Reports</strong><br><em>Explain results: \"Inventory shows a 5% discrepancy in Section B.\"</em>"
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
      background: #2c3e50;
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
      background: #f0f2f5;
      border-left: 4px solid #2c3e50;
      border-radius: 8px;
    }
    .phase h3 {
      color: #2c3e50;
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
      border: 1px dashed #2c3e50;
    }
    .example-unit h4 {
      color: #2c3e50;
    }
    footer {
      text-align: center;
      padding: 40px;
      background: #2c3e50;
      color: white;
      margin-top: 60px;
    }
    
    /* Navigation Bar Styling */
    .top-nav {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 10;
      background-color: rgba(44, 62, 80, 0.9); /* Semi-transparent dark gray */
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
      color: #a0a8b3;
    }
  `}} />
);


// --- Main Component ---
function LogisticsPathwayPage() {
  
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
        <h1>🚚 Logistics Mastery Pathway</h1>
        <p>A 150-Session Program for Global Professionals</p>
      </header>

      <div className="container">

        <div className="pathway">
          <p>This pathway is designed to transform students into highly skilled logistics professionals who can operate and communicate with confidence in any international environment. The curriculum progresses from foundational terminology to advanced project management and global trade.</p>

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

export default LogisticsPathwayPage;