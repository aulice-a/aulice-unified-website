import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Data for the Pathway ---
const pathwayData = [
  {
    module: "Module 1: Foundational Legal Communication (Units 1-40)",
    focus: "Building a solid grammatical foundation with a legal context.",
    units: [
      "Parts of Speech: Identifying Key Legal Terminology", "Articles (a, an, the): Their Role in Legal Instruments", "Pronouns and Antecedents: Ensuring Clarity in Legal Texts",
      "Prepositions of Time and Place: Precision in Legal Documents", "Simple Tenses: Explaining Facts and Events", "Progressive Tenses: Describing Ongoing Legal Processes",
      "Perfect Tenses: Sequencing Past Actions", "Subject-Verb Agreement: Maintaining Formal Accuracy", "Adjectives and Adverbs: Modifying Legal Statements",
      "Conjunctions: Linking Legal Concepts", "Punctuation: The Power of Commas and Semicolons", "Sentence Structure: Writing Clear and Unambiguous Sentences",
      "Building Legal Vocabulary: The Basics", "Legal Idioms and Colloquialisms", "Asking Questions: Conducting Initial Client Intake",
      "Giving Directions: Guiding a Client Through a Process", "Using \"Shall\" and \"Will\": Differentiating Legal Obligation", "Understanding Legal Nuances: Denotation vs. Connotation",
      "Reading a Contract: Understanding Key Terms", "Writing a Short Memo: Summarizing a Case", "Active and Passive Voice: Choosing the Right Tone",
      "Conditional Clauses: Drafting Terms and Conditions", "Gerunds and Infinitives: Common Legal Constructions", "Phrasal Verbs: Their Use and Avoidance",
      "Formal vs. Informal Language: Register in Legal Contexts", "Reported Speech: Attributing Statements Accurately", "Pronunciation: Clear Articulation of Legal Terms",
      "Reading Comprehension: Case Summaries", "Listening Skills: Understanding Client Concerns", "Spelling and Punctuation: Avoiding Errors",
      "Modal Verbs: Expressing Possibility and Obligation", "Review: Foundational Legal Language Assessment", "Presenting a Case: A Simple Narrative",
      "Drafting a Simple Email: Client Communication", "Describing Legal Procedures: A Step-by-Step Guide", "Polite Requests: Interacting with Colleagues",
      "Expressing Cause and Effect: Legal Causation", "Vocabulary for Corporate Law", "Vocabulary for Criminal Law", "Vocabulary for Family Law"
    ]
  },
  {
    module: "Module 2: Legal Discourse and Argumentation (Units 41-80)",
    focus: "Building persuasive writing and speaking skills for legal professionals.",
    units: [
        "Legal Argumentation: The Art of Persuasion", "Organizing a Legal Argument: Introductions and Conclusions", "Paragraph Structure: The Claim-Evidence-Analysis Method",
        "Logical Fallacies: Identifying Weak Arguments", "Rhetorical Devices: Using Pathos, Ethos, and Logos", "Sentence Variety: Creating Emphasis and Rhythm",
        "Formal Language: Avoiding Slang and Contractions", "Advanced Punctuation: Commas, Semicolons, and Colons", "Writing a Client Letter: Setting the Right Tone",
        "Drafting a Complaint: A Formal Legal Document", "Drafting an Affidavit: A Statement of Fact", "Writing a Response to a Demand Letter",
        "Negotiation Strategies: Stating Your Case", "Conducting a Deposition: Asking Clear Questions", "Preparing for an Oral Argument",
        "Legal Vocabulary: Advanced Legal Terms", "Idiomatic Expressions: Advanced Legal English", "Cross-Examination: Formulating Effective Questions",
        "Legal Research: Presenting Findings", "Drafting a Legal Brief: Writing for a Judge", "The Art of the Closing Argument",
        "Mock Trial Simulation: Opening Statements", "Client Interview: Fact-Gathering and Listening", "Giving a Legal Opinion: Structuring an Analysis",
        "Review: Legal Argumentation Assessment", "Expressing Cause and Effect: Complex Sentences", "Comparison and Contrast: Analyzing Case Law",
        "Summarizing Legal Documents: Case Digests", "Public Speaking: Presenting Legal Concepts", "Legal Ethics: Vocabulary and Principles",
        "Intellectual Property Law", "Real Estate Law", "Constitutional Law", "Civil Rights Law", "Environmental Law", "Immigration Law",
        "Tax Law", "Employment Law", "International Law", "Review: Legal Discourse Assessment"
    ]
  },
  {
    module: "Module 3: Advanced Legal Writing and Advocacy (Units 81-120)",
    focus: "Mastering the craft of legal writing and courtroom advocacy.",
    units: [
        "Writing a Memo: Fact-Finding and Legal Analysis", "Drafting a Persuasive Brief: The Art of Advocacy", "Drafting a Research Paper: Scholarly Legal Writing",
        "Using Legal Citations: Bluebook and Other Formats", "The Rhetoric of Advocacy: Crafting a Powerful Argument", "Deposition Strategy: Preparing and Executing",
        "Cross-Cultural Legal Communication: Navigating Global Practice", "Advanced Legal Vocabulary: Latin and Foreign Phrases", "Drafting a Will: Precision in Estate Planning",
        "Drafting a Trust: Clauses and Language", "Drafting a Contract: Clauses and Provisions", "Negotiating a Settlement: Formal and Informal Language",
        "Conducting an Arbitration: Roles and Responsibilities", "The Art of Client Management: Building Trust", "Responding to an Interrogatory: Precise Answers",
        "Drafting a Motion to Dismiss", "Drafting a Subpoena: Legal Directives", "Writing a Legal Opinion Letter", "Appellate Brief Writing: Advanced Persuasion",
        "Courtroom Etiquette: Understanding Legal Protocol", "Mock Courtroom Simulation: Closing Arguments", "Legal Translation: English to English",
        "Drafting a Motion for Summary Judgment", "Negotiation Role-Playing: Practicing Skills", "Legal Research Skills: Locating Statutes and Cases",
        "Formal Speaking: Pronunciation and Intonation", "Business Law", "Bankruptcy Law", "Health Law", "Family Law", "Criminal Procedure",
        "Civil Procedure", "Advanced Legal Writing", "Legal Ethics and Professional Responsibility", "Evidence Law", "Torts Law", "Contracts Law",
        "Property Law", "Constitutional Law", "Final Assessment: Advanced Legal Writing and Advocacy"
    ]
  },
  {
    module: "Module 4: Professional Mastery & Crisis Communication (Units 121-158)",
    focus: "Applying all skills to high-stakes, real-world scenarios.",
    units: [
        "Drafting Professional Correspondence", "Writing a Professional Bio", "The Art of Networking", "Conducting an Effective Meeting", "Advanced Negotiation Strategies",
        "Legal Ethics in Practice", "Handling Ethical Conflicts", "Addressing Professional Misconduct", "Handling a Client's Admission of Guilt", "Managing Client Expectations",
        "Navigating a Conflict of Interest", "Courtroom Advocacy", "Preparing for a Cross-Examination", "Delivering a Persuasive Opening Statement", "Making a Closing Argument",
        "Responding to a Judge's Inquiry", "Handling Post-Verdict Press Conferences", "Dealing with an Emotional Witness", "Crisis & Compliance",
        "Advising on Public Statements and Legal Strategy", "Coordinating Internal Teams for Compliance", "Declining a Journalist's Request for Comment",
        "Addressing a Leak of Confidential Information", "Presenting Legal Risks to the Board", "Drafting a Policy for Legal Compliance", "Refusing a Client's Illegal Request",
        "Communicating Urgency During a Data Breach", "Explaining Complex Legal Terms", "Addressing a Flawed Document", "Responding to a Subpoena", "Drafting a Motion",
        "Appellate Advocacy", "Mediation and Dispute Resolution", "Final Mock Trial Simulation", "Capstone Project: A Full Legal Case", "Final Examination",
        "Professional Development", "Graduation"
    ]
  }
];


// --- Helper Component for <style> ---
const PageStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    :root {
      --primary-color: #008080; /* Teal */
      --secondary-color: #2c3e50; /* Dark Grey */
      --background-color: #f7f9fc; /* Light Grey/Blue */
      --container-bg-color: #ffffff; /* White */
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* Styles applied to root div */
    .root-div {
      font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
      background-color: var(--background-color);
      color: var(--secondary-color);
      line-height: 1.6;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      position: relative; /* Needed for absolute positioning of nav */
    }

    header {
      background-color: var(--primary-color);
      color: #fff;
      text-align: center;
      padding: 4rem 1rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
    }

    .container {
      max-width: 900px;
      margin: 2.5rem auto;
      padding: 2rem;
      background-color: var(--container-bg-color);
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
      flex-grow: 1; /* Allows main content to fill space */
    }

    h2 {
      color: var(--primary-color);
      margin-top: 2rem;
      margin-bottom: 0.5rem;
      border-bottom: 2px solid var(--primary-color);
      padding-bottom: 0.5rem;
    }

    h3 {
      color: var(--secondary-color);
      margin-top: 1.5rem;
      font-size: 1.25rem;
    }

    p {
      margin-bottom: 1rem;
    }

    ol {
      list-style-type: decimal;
      margin-left: 2rem;
      padding-top: 1rem;
    }

    li {
      margin-bottom: 0.5rem;
      line-height: 1.4;
      font-size: 0.95rem;
    }

    footer {
      text-align: center;
      padding: 1rem;
      background-color: var(--secondary-color);
      color: #fff;
      font-size: 0.8rem;
      margin-top: auto; /* Push footer to bottom */
    }

    /* Navigation Bar Styling */
    .top-nav {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 10;
      background-color: rgba(44, 62, 80, 0.5); /* Semi-transparent secondary color */
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
      color: var(--primary-color);
    }
    hr {
        border: 0;
        height: 1px;
        background-color: #ccc;
        margin: 2rem 0;
    }
  `}} />
);

// --- Main Component ---
function LegalPathwayPage() {

  return (
    <div className="root-div"> {/* Apply body styles here */}
      <PageStyles />

      {/* Top Right Navigation */}
      <nav className="top-nav">
        <ul>
          <li><a href="https://www.aulice.ca/">Gate</a></li>
          <li><a href="https://aulice-main-hub.netlify.app/">Home</a></li>
          <li><a href="https://aulice-about.netlify.app/">About us</a></li>
          <li><a href="https://aulice-pricing-plans.netlify.app/">Pricing Plans</a></li>
          <li><a href="https://aulice-lexicon.netlify.app/">Lexicon</a></li>
          <li><a href="https://aulice-teacher-dashboard.netlify.app/">Teacher</a></li>
          <li><a href="https://aulice-contact.netlify.app/">Contact</a></li>
        </ul>
      </nav>

      <header>
        <h1>Mastery Pathway for Legal English</h1>
        <p>A comprehensive curriculum for legal professionals.</p>
      </header>

      <main className="container">

        <p>This comprehensive pathway is designed to equip legal professionals with the specialized English language skills needed to excel in a global legal environment. The curriculum progresses from foundational grammar to advanced legal discourse, advocacy, and professional communication.</p>

        <hr />

        {/* Render Modules Dynamically */}
        {pathwayData.map((moduleData, index) => (
          <React.Fragment key={moduleData.module}>
            <h2>{moduleData.module}</h2>
            <h3>Focus: {moduleData.focus}</h3>
            <ol start={index === 0 ? 1 : pathwayData[index - 1].units.length + (index > 1 ? pathwayData[index-2].units.length : 0) + (index > 2 ? pathwayData[index-3].units.length : 0) + 1}>
               {/* Note: Complex start calculation assumes units are sequential */}
              {moduleData.units.map((unit, unitIndex) => (
                <li key={unitIndex}>
                  {/* Basic check for bolding based on presence of ':' */}
                  {unit.includes(':') ? (
                    <>
                      <b>{unit.split(':')[0]}:</b>{unit.split(':').slice(1).join(':')}
                    </>
                  ) : (
                    unit
                  )}
                </li>
              ))}
            </ol>
            {index < pathwayData.length - 1 && <hr />} {/* Add HR between modules */}
          </React.Fragment>
        ))}

      </main>

      <footer>
        &copy; 2024 Legal English Mastery. All Rights Reserved. {/* Corrected year? */}
      </footer>
    </div>
  );
}

export default LegalPathwayPage;