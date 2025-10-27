import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Data for the Pathway ---
const pathwayData = [
  {
    module: "Module 1: Introduction to Cabin Crew & Aviation Regulations (20 hours)",
    units: [
      { id: "1.1", title: "The Role of Cabin Crew:", description: "Responsibilities, teamwork, and professional standards." },
      { id: "1.2", title: "Aviation Authority & Regulations:", description: "ICAO and national civil aviation authority roles." },
      { id: "1.3", title: "Aviation English & Terminology:", description: "Standard phraseology and common acronyms." },
      { id: "1.4", title: "Aviation Security Fundamentals:", description: "Introduction to security protocols and threat awareness." },
      { id: "1.5", title: "Airport and Aircraft Familiarization:", description: "Layouts, components, and cabin zones." },
      { id: "1.6", title: "Crew Resource Management (CRM):", description: "Communication, leadership, and decision-making." }
    ]
  },
  {
    module: "Module 2: Safety & Emergency Procedures (50 hours)",
    units: [
      { id: "2.1", title: "Aircraft Safety Systems:", description: "Fire extinguishers, oxygen masks, life jackets, survival gear." },
      { id: "2.2", title: "Fire Fighting & Smoke Control:", description: "Practical use of extinguishers and fire types." },
      { id: "2.3", title: "Decompression Procedures:", description: "Rapid and slow decompression scenarios." },
      { id: "2.4", title: "Planned & Unplanned Emergency Landings:", description: "Brace positions, evacuation commands." },
      { id: "2.5", title: "Ditching & Water Evacuation:", description: "Slide deployment, life rafts, sea survival." },
      { id: "2.6", title: "Medical Emergencies:", description: "First aid, CPR, use of emergency medical kits." },
      { id: "2.7", title: "Dangerous Goods:", description: "Recognition and handling procedures." },
      { id: "2.8", title: "Security Procedures:", description: "Threat levels, hijacking, bomb threats." },
      { id: "2.9", title: "Unruly Passenger Management:", description: "De-escalation techniques and legal responsibilities." }
    ]
  },
  {
    module: "Module 3: Passenger Service & Communication (30 hours)",
    units: [
      { id: "3.1", title: "Customer Service Excellence:", description: "Empathy, attitude, and professionalism." },
      { id: "3.2", title: "Boarding & Disembarking:", description: "Welcoming passengers, seat assignments, assisting special needs." },
      { id: "3.3", title: "In-Flight Service:", description: "Meal and beverage service, handling special requests." },
      { id: "3.4", title: "Dealing with Difficult Situations:", description: "Complaints, intoxicated passengers, emotional distress." },
      { id: "3.5", title: "Public Address (PA) System:", description: "Clear and concise safety announcements." },
      { id: "3.6", title: "Cultural Awareness & Diversity:", description: "Respecting different cultures and customs." }
    ]
  },
  {
    module: "Module 4: Practical & Recurrent Training (20 hours)",
    units: [
      { id: "4.1", title: "Mock-Up Cabin Drills:", description: "Door operation, slide deployment, emergency simulations." },
      { id: "4.2", title: "First Aid & CPR Practice:", description: "Hands-on CPR, Heimlich maneuver, basic first aid." },
      { id: "4.3", title: "Fire Fighting Simulation:", description: "Live fire training with various extinguishers." },
      { id: "4.4", title: "Water Survival Training:", description: "Life vests and rafts in a pool environment." },
      { id: "4.5", title: "Final Assessment & Evaluation:", description: "Written exam and practical skills demonstration." }
    ]
  }
];

// --- Helper Component for <style> ---
const PageStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    /* body styles applied to root div */
    .root-div {
      font-family: 'Segoe UI', sans-serif;
      background: #f7f9fc;
      color: #2c3e50;
      line-height: 1.6;
      position: relative; /* Keep for nav positioning */
      display: flex; /* Added for footer positioning */
      flex-direction: column; /* Added for footer positioning */
      min-height: 100vh; /* Added for footer positioning */
    }
    header {
      text-align: center;
      padding: 40px 20px;
      background: #1a73e8; /* Blue */
      color: white;
    }
    header h1 {
      font-size: 28px;
    }
    .container {
      max-width: 1000px;
      margin: 40px auto;
      padding: 30px;
      flex-grow: 1; /* Added for footer positioning */
    }
    .pathway {
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.1);
    }
    .module {
      margin: 30px 0;
      padding: 20px;
      background: #f0f7ff; /* Light blue */
      border-left: 4px solid #1a73e8; /* Blue */
      border-radius: 8px;
    }
    .module h3 {
      color: #1a73e8; /* Blue */
    }
    ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    li {
      margin: 8px 0;
    }
    footer {
      text-align: center;
      padding: 40px;
      background: #1a73e8; /* Blue */
      color: white;
      margin-top: 60px; /* Original margin */
      width: 100%; /* Ensure footer spans width */
    }

    /* New Navigation Bar Styling */
    .top-nav {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 10;
      background-color: rgba(26, 115, 232, 0.8); /* Blue with transparency */
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
      color: #e6f0ff; /* Lighter blue */
    }
  `}} />
);


// --- Main Component ---
function CabinCrewPathways() {

  return (
    <div className="root-div"> {/* Apply body styles here */}
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
        <h1>✈️ Cabin Crew Mastery Pathway</h1>
        <p>120-Hour Professional Training Program</p>
      </header>

      <main className="container"> {/* Changed div to main for semantics */}

        <div className="pathway">
          <p>This pathway is designed to transform students into confident, safety-focused cabin crew professionals who can operate and communicate effectively in any international aviation environment. The curriculum progresses from foundational regulations to advanced emergency response and passenger service.</p>

          {/* Render Modules Dynamically */}
          {pathwayData.map((moduleData) => (
            <div className="module" key={moduleData.module}>
              <h3>{moduleData.module}</h3>
              <ul>
                {moduleData.units.map((unit) => (
                  <li key={unit.id}>
                    <strong>{unit.id} {unit.title}</strong> {unit.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

      </main>

      <footer>
        <p>© 2025 Aulice Academy. Reality is programmable. Smart people are its architects.</p>
      </footer>
    </div>
  );
}

export default CabinCrewPathways;