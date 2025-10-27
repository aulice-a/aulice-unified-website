import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Data for the Pathway ---
const pathwayData = [
  {
    part: "Part 1: Initial Consultation & Engagement (Sessions 1-30)",
    englishFocus: "<strong>English Focus:</strong> Formal greetings, open-ended questions, basic procedure explanations, and establishing rapport.",
    sessions: [
      { id: 1, title: "The Initial Greeting", description: "Practice formal and informal greetings to establish rapport." },
      { id: 2, title: "First Impressions", description: "Discuss positive opening phrases to make clients feel comfortable." },
      { id: 3, title: "Asking About Client Needs", description: "Formulate open-ended questions to understand client goals." },
      { id: 4, title: "Describing Basic Procedures", description: "Use simple, clear language to explain standard services." },
      { id: 5, title: "Discussing Expected Outcomes", description: "Phrase sentences to set realistic expectations for results." },
      { id: 6, title: "Explaining the Consultation Process", description: "Guide the client through the steps of the initial meeting." },
      { id: 7, title: "Addressing Common Concerns", description: "Practice responding to general client worries about a procedure." },
      { id: 8, title: "Confirming Personal Information", description: "Politely ask and verify a client's name, age, and contact details." },
      { id: 9, title: "Scheduling the Next Appointment", description: "Use polite questions to find a suitable time for the client." },
      { id: 10, title: "Ending the Consultation", description: "Practice polite closing statements and next steps." },
      { id: 11, title: "Welcoming Returning Clients", description: "Use appropriate language to greet clients who have visited before." },
      { id: 12, title: "Understanding Client History", description: "Ask questions about past medical procedures or treatments." },
      { id: 13, title: "Describing Materials and Tools", description: "Name and explain the use of basic materials (e.g., veneers, grafts)." }, // Note: Grafting might be more specific than general aesthetics
      { id: 14, title: "The Passive Voice for Explanations", description: "Describe a procedure focusing on the action, not the person performing it." },
      { id: 15, title: "Handling Language Barriers", description: "Practice speaking slowly and using simple sentences." },
      { id: 16, title: "Answering Phone Inquiries", description: "Learn standard phrases for taking calls from new clients." },
      { id: 17, title: "Responding to Email Inquiries", description: "Draft professional and helpful email replies to potential clients." },
      { id: 18, title: "Explaining Pricing and Costs", description: "Clearly and transparently discuss the cost of services." },
      { id: 19, title: "Offering Payment Options", description: "Describe different ways a client can pay for their procedure." },
      { id: 20, title: "Giving Directions to the Clinic", description: "Provide clear and easy-to-follow directions from local landmarks." },
      { id: 21, title: "Expressing Professional Opinion", description: "Politely offer advice or suggestions for a client's plan." },
      { id: 22, title: "Using Comparative Language", description: "Compare two treatment options using phrases like 'more effective' or 'less invasive.'" },
      { id: 23, title: "Expressing Possibility", description: "Use modal verbs to talk about potential outcomes and side effects." },
      { id: 24, title: "Asking About Client Expectations", description: "Ask clients what they hope to achieve from the procedure." },
      { id: 25, title: "Expressing Certainty", description: "Use strong, confident language to reassure the client about the process." },
      { id: 26, title: "Building Trust with Clear Language", description: "Use simple, direct sentences to avoid misunderstandings." },
      { id: 27, title: "Explaining Pre-Procedure Diet and Habits", description: "Give clear instructions for things to do or avoid before an operation." },
      { id: 28, title: "Reviewing Medical History Forms", description: "Formulate questions to clarify information on a client's form." },
      { id: 29, title: "Confirming the Final Plan", description: "Summarize the client's decision and the agreed-upon procedure." },
      { id: 30, title: "Documenting the Consultation", description: "Practice writing clear and concise notes about the client's visit." }
    ]
  },
  {
    part: "Part 2: Pre-Procedure & Preparation (Sessions 31-60)",
    englishFocus: "<strong>English Focus:</strong> Consent forms, anesthesia, pre-op instructions, and managing anxiety.",
    sessions: [
       { id: 31, title: "Reviewing the Consent Form", description: "Explain each section of the consent form in simple terms." },
       { id: 32, title: "Answering Last-Minute Questions", description: "Practice responding to final client queries before the procedure." },
       { id: 33, title: "Explaining Anesthesia Options", description: "Describe the different types of anesthesia available." },
       { id: 34, title: "Describing a Hair Grafting Procedure", description: "Break down the steps of a hair transplant." }, // Note: Specific procedure
       { id: 35, title: "Explaining a Dental Veneer Process", description: "Walk the client through the steps of getting veneers." }, // Note: Specific procedure
       { id: 36, title: "Describing a Facial Surgery Process", description: "Explain the stages of a cosmetic surgical procedure." }, // Note: Specific procedure
       { id: 37, title: "The First Conditional for Warnings", description: "Use 'If... then...' structures to explain potential risks and consequences." },
       { id: 38, title: "The First Conditional for Pre-Op Instructions", description: "Explain what to do if the client experiences certain symptoms before surgery." },
       { id: 39, title: "Giving Pre-Op Instructions", description: "Provide a numbered list of instructions for the client." },
       { id: 40, title: "Managing Client Anxiety", description: "Use reassuring language and empathetic phrases." },
       { id: 41, title: "Checking for Understanding", description: "Ask questions to ensure the client has understood the instructions." },
       { id: 42, title: "Discussing Preparation for Travel", description: "Advise international clients on how to prepare for their journey." },
       { id: 43, title: "Explaining Accommodation and Transport", description: "Provide details about where the client will stay and how they will get around." },
       { id: 44, title: "Using Adjectives to Describe Feelings", description: "Ask clients how they are feeling using descriptive words." },
       { id: 45, title: "Describing Medical Equipment", description: "Name and explain the function of the tools and machines used." },
       { id: 46, title: "Explaining the Timeline of the Procedure", description: "Inform the client how long each part of the process will take." },
       { id: 47, title: "The Passive Voice for Post-Op Care", description: "Explain aftercare using passive constructions (e.g., 'The area will be cleaned')." },
       { id: 48, title: "Explaining the Roles of the Team", description: "Introduce the different professionals involved and their roles." },
       { id: 49, title: "Discussing Potential Delays", description: "Explain why a procedure might be delayed and how to handle it." },
       { id: 50, title: "Answering Questions About Scars", description: "Provide clear and honest information about potential scarring." },
       { id: 51, title: "Describing the Recovery Room", description: "Explain what the client can expect immediately after the procedure." },
       { id: 52, title: "Discussing the 'What If' Scenarios", description: "Practice phrases to discuss and reassure clients about complications." },
       { id: 53, title: "Explaining the Purpose of Medications", description: "Describe what each prescribed medication is for." },
       { id: 54, title: "The Imperative for Instructions", description: "Give direct and clear commands for preparing for surgery." },
       { id: 55, title: "Answering Questions about Food and Drink", description: "Provide specific instructions on what to eat or drink before and after." },
       { id: 56, title: "Using Phrasal Verbs in Medical Context", description: "Practice common phrasal verbs like 'come to' or 'look after.'" },
       { id: 57, title: "Expressing Sympathy and Empathy", description: "Use phrases to show you understand and care about the client's feelings." },
       { id: 58, title: "Using Question Tags to Confirm", description: "Use tags like '..., isn't it?' to check for client agreement." },
       { id: 59, title: "Using Polite Requests", description: "Formulate polite requests using 'Would you mind...' or 'Could you please...'" },
       { id: 60, title: "Summarizing the Pre-Op Plan", description: "Recap all the instructions and information before the big day." }
    ]
  },
   {
    part: "Part 3: The Procedure & Real-Time Communication (Sessions 61-90)",
    englishFocus: "<strong>English Focus:</strong> Real-time instructions, managing discomfort, and procedural explanations.",
    sessions: [
      { id: 61, title: "The Final Check-in", description: "Use questions to confirm the client is ready for the procedure." },
      { id: 62, title: "Guiding the Client to the Room", description: "Give clear, simple instructions for getting ready." },
      { id: 63, title: "Using Direct Instructions During a Procedure", description: "Tell the client what to do (e.g., 'Please look up,' 'Open your mouth')." },
      { id: 64, title: "Providing Comfort and Reassurance", description: "Use comforting phrases like 'You're doing great' or 'Just a little longer.'" },
      { id: 65, title: "Explaining Noises and Sounds", description: "Reassure the client by explaining the sounds of the equipment." },
      { id: 66, title: "The Second Conditional for Hypotheticals", description: "Use 'If I were you...' to offer advice on aftercare." },
      { id: 67, title: "Handling Client Pain or Discomfort", description: "Ask questions and offer solutions for any pain the client feels." },
      { id: 68, title: "The Present Continuous for Actions", description: "Explain what is happening in the current moment (e.g., 'We are placing the graft now')." },
      { id: 69, title: "Using Adverbs to Describe an Action", description: "Describe how an action is being performed (e.g., 'We will work very carefully')." },
      { id: 70, title: "Discussing the Mid-Point of a Procedure", description: "Provide a progress update to the client." },
      { id: 71, title: "Using the Past Simple to Describe the Past", description: "Answer questions about previous stages of the procedure." },
      { id: 72, title: "Asking for Client Feedback in Real-Time", description: "Politely check in with the client throughout the process." },
      { id: 73, title: "The Third Conditional for Retrospection", description: "Discuss what could have been different if a past event had changed." },
      { id: 74, title: "Explaining Unexpected Findings", description: "Inform the client about any unexpected discoveries during the procedure." },
      { id: 75, title: "Discussing the End of the Procedure", description: "Announce that the procedure is almost finished." },
      { id: 76, title: "Using Superlatives to Praise a Client", description: "Use phrases like 'You were the best client' to build rapport." },
      { id: 77, title: "Explaining a Minor Adjustment", description: "Inform the client about a small change in the plan." },
      { id: 78, title: "Providing Information to the Assistant", description: "Practice giving clear instructions to a team member." },
      { id: 79, title: "Responding to a Client's Story", description: "Use listening signals and follow-up questions to show interest." },
      { id: 80, title: "The Past Perfect for Sequencing Events", description: "Use 'had done' to talk about what happened before a certain point in time." },
      { id: 81, title: "Explaining Pain Management During the Procedure", description: "Describe how discomfort is being handled in real-time." },
      { id: 82, title: "Expressing Optimism and Encouragement", description: "Use uplifting phrases to motivate the client." },
      { id: 83, title: "Using Direct Quotes in Reports", description: "Learn how to accurately document what a client said." },
      { id: 84, title: "Using Technical Jargon", description: "Learn to switch between technical terms and simple language." },
      { id: 85, title: "The Passive Voice for Describing Action", description: "Explain what is being done to the client without saying 'I' or 'we.'" },
      { id: 86, title: "Managing Interruptions", description: "Practice polite phrases for dealing with interruptions during the procedure." },
      { id: 87, title: "Explaining the Final Touches", description: "Describe the final steps of the procedure." },
      { id: 88, title: "Expressing Satisfaction with the Work", description: "Use positive language to describe the finished result." },
      { id: 89, title: "Transitioning to Post-Op Care", description: "Introduce the next phase of the client's journey." },
      { id: 90, title: "Finalizing the Procedure", description: "Formulate a clear statement that the procedure is complete." }
    ]
  },
  {
    part: "Part 4: Post-Procedure & Follow-up (Sessions 91-120)",
    englishFocus: "<strong>English Focus:</strong> Aftercare instructions, recovery timelines, and managing client feedback.",
    sessions: [
       { id: 91, title: "The Immediate Post-Op Check", description: "Ask the client how they are feeling right after the procedure." },
       { id: 92, title: "Giving Immediate Aftercare Instructions", description: "Provide clear and concise instructions for the first few hours." },
       { id: 93, title: "Discussing Pain and Discomfort", description: "Use a scale to ask about the client's pain level." },
       { id: 94, title: "Explaining the Recovery Timeline", description: "Provide a general timeline for the client's healing process." },
       { id: 95, title: "Using the Zero Conditional for Aftercare", description: "Use 'If... then...' for general truths and habits." },
       { id: 96, title: "Scheduling the First Follow-up", description: "Politely set a date and time for the first check-up." },
       { id: 97, title: "Giving Advice on Lifestyle Changes", description: "Offer suggestions for diet and activities during recovery." },
       { id: 98, title: "Answering Questions About Swelling and Bruising", description: "Explain what is normal and what is a sign of a problem." },
       { id: 99, title: "Discussing Potential Complications", description: "Explain what a complication is and what to do if one occurs." },
       { id: 100, title: "Using the First Conditional for Aftercare", description: "Give specific instructions on what to do if a symptom appears." },
       { id: 101, title: "Reassuring the Client", description: "Use language to calm the client if they are worried about their progress." },
       { id: 102, title: "Explaining the Healing Process", description: "Describe how the body heals itself over time." },
       { id: 103, title: "The Passive Voice in Medical Reports", description: "Practice writing reports that describe a patient's condition." },
       { id: 104, title: "Documenting Recovery Notes", description: "Write clear and objective notes about the client's recovery." },
       { id: 105, title: "Handling Client Feedback (Positive)", description: "Respond appropriately to a client who is happy with their results." },
       { id: 106, title: "Handling Client Feedback (Negative)", description: "Listen to a client's complaint and respond with empathy and solutions." },
       { id: 107, title: "Using Adverbs to Describe Recovery", description: "Ask about the client's progress using words like 'quickly' or 'slowly.'" },
       { id: 108, title: "Scheduling the Final Follow-up", description: "Set a final appointment to check on the long-term results." },
       { id: 109, title: "Describing the Final Outcome", description: "Use positive and professional language to talk about the final result." },
       { id: 110, title: "Providing Long-Term Care Instructions", description: "Give clients advice on how to maintain their results." },
       { id: 111, title: "Answering Questions About Future Treatments", description: "Discuss the possibility of future procedures or touch-ups." },
       { id: 112, title: "Expressing Gratitude", description: "Thank the client for choosing your clinic and trusting your team." },
       { id: 113, title: "The Second Conditional for Hypothetical Questions", description: "Ask clients what they would do if they had a problem at home." },
       { id: 114, title: "Using Relative Clauses to Add Detail", description: "Describe a procedure in more detail using 'which,' 'that,' or 'who.'" },
       { id: 115, title: "Explaining Legal Documents", description: "Explain legal waivers and release forms in simple language." },
       { id: 116, title: "The Third Conditional for What-If Scenarios", description: "Discuss what could have happened if a past decision had been different." },
       { id: 117, title: "Giving General Advice for Travel Home", description: "Provide tips for a comfortable and safe journey back home." },
       { id: 118, title: "Handling Emergency Calls", description: "Practice phrases to respond to a client calling with an emergency." },
       { id: 119, title: "The Passive Voice for Explaining Policies", description: "Use passive constructions to describe clinic policies and rules." },
       { id: 120, title: "Farewell and Long-Term Connection", description: "End the client relationship with a professional and friendly farewell." }
    ]
  }
];

const exampleUnitData = {
  title: "📘 Example Unit: Session 25 - Expressing Certainty",
  description: "This session focuses on using strong, confident language to reassure clients.",
  items: [
    "<strong>Key Phrases:</strong> \"I can guarantee,\" \"You will definitely see improvement,\" \"This method is highly effective.\"",
    "<strong>Practice:</strong> Reassure a client about a treatment outcome using confident language."
  ]
};

// --- Helper Component for <style> ---
const PageStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    /* body styles applied to the root div */
     header {
      text-align: center;
      padding: 40px 20px;
      background: #8e44ad;
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
      background: #f8f4f9;
      border-left: 4px solid #8e44ad;
      border-radius: 8px;
    }
    .phase h3 {
      color: #8e44ad;
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
      border: 1px dashed #8e44ad;
    }
    .example-unit h4 {
      color: #8e44ad;
    }
    footer {
      text-align: center;
      padding: 40px;
      background: #8e44ad;
      color: white;
      margin-top: 60px;
    }

    /* New Navigation Bar Styling */
    .top-nav {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 10;
      background-color: rgba(142, 68, 173, 0.8);
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
      color: #f2e6f7;
    }
  `}} />
);


// --- Main Component ---
function AestheticianPathwayPage() {

  // Styles from the original <body> tag
  const bodyStyles = {
    fontFamily: "'Segoe UI', sans-serif",
    background: '#f7f9fc',
    color: '#2c3e50',
    lineHeight: 1.6,
    position: 'relative' // Keep for nav positioning
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
        <h1>💄 Aesthetician - Client Communication Mastery</h1>
        <p>A Professional Language Pathway for Skincare & Cosmetic Professionals</p>
      </header>

      <div className="container">

        <div className="pathway">
          <p>This pathway is designed to transform students into confident, client-focused aesthetic professionals who can communicate effectively in any international environment. The curriculum progresses from initial consultations to advanced post-treatment follow-up, mastering professional language for all stages of client interaction.</p>

          {/* Render Pathway Parts Dynamically */}
          {pathwayData.map((partData) => (
            <div className="phase" key={partData.part}>
              <h3>{partData.part}</h3>
              <p dangerouslySetInnerHTML={{ __html: partData.englishFocus }} />
              <ul>
                {partData.sessions.map((session) => (
                  <li key={session.id}>
                    <strong>Session {session.id}:</strong> {session.title}<br />
                    <em>{session.description}</em>
                  </li>
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
                // Use dangerouslySetInnerHTML since items contain HTML
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

export default AestheticianPathwayPage;