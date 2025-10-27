import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      max-width: 900px;
      margin: 40px auto;
      padding: 30px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.1);
    }
    h2, h3 {
      margin: 20px 0 10px;
      color: #1a73e8; /* Blue */
    }
    p, ul, ol {
      margin: 10px 0;
    }
    .btn {
      display: inline-block;
      padding: 10px 20px;
      background: #1a73e8; /* Blue */
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      margin: 10px 0;
      font-size: 14px;
      font-weight: bold;
    }
    input[type="text"], textarea {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-family: inherit; /* Ensure font matches */
    }
    .inline-input { /* Style for inline text inputs */
        display: inline-block;
        width: auto;
        min-width: 150px;
        vertical-align: baseline;
        margin: 0 5px;
        padding: 4px 8px;
    }
    .exercise {
      background: #f8f9fa;
      padding: 20px;
      margin: 20px 0;
      border-left: 4px solid #1a73e8; /* Blue */
      border-radius: 6px;
    }
    .feedback {
      margin: 10px 0;
      padding: 10px;
      background: #e8f4f8; /* Light blue background */
      border-radius: 6px;
      border-left: 4px solid #3498db; /* Another Blue border */
      color: #2c3e50; /* Darker text */
    }
    .nav-links {
      text-align: center;
      margin: 30px 0;
    }
    .nav-links a {
      margin: 0 10px;
      color: #1a73e8; /* Blue */
      text-decoration: none;
      font-weight: bold;
    }
     table {
        width: 100%;
        border-collapse: collapse;
        margin: 15px 0;
    }
    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }
    th {
        background-color: #f2f2f2;
    }
  `}} />
);

// --- Main Component ---
function CabinCrewUnit1() {
  // State object to hold values and feedback for all exercises
  const [exerciseState, setExerciseState] = useState({
    ex1: { value: '', feedback: null },
    ex2: { inputs: Array(10).fill(''), feedback: null },
    ex3: { inputs: Array(10).fill(''), textarea: '', feedback: null },
    ex4: { inputs: Array(10).fill(''), textarea: '', feedback: null },
    ex5: { inputs: Array(10).fill(''), feedback: null },
    ex6: { inputs: Array(10).fill(''), feedback: null },
    ex7: { value: '', feedback: null },
    ex8: { inputs: Array(8).fill(''), feedback: null },
    ex9: { value: '', feedback: null },
  });

  // Generic handler for textarea changes
  const handleTextareaChange = (exId, value) => {
    setExerciseState(prev => ({
      ...prev,
      [exId]: { ...prev[exId], value: value, feedback: null } // Clear feedback on change
    }));
  };

  // Generic handler for multiple input changes within an exercise
  const handleMultiInputChange = (exId, index, value) => {
    setExerciseState(prev => {
        const newInputs = [...prev[exId].inputs];
        newInputs[index] = value;
        return {
            ...prev,
            [exId]: { ...prev[exId], inputs: newInputs, feedback: null } // Clear feedback on change
        };
    });
};

  // Generic handler for submit buttons
  const handleSubmit = (exId) => {
    let valueToCheck = '';
    // Determine which property holds the user's input for the given exercise ID
    if (exerciseState[exId]?.value !== undefined) {
        valueToCheck = exerciseState[exId].value.trim();
    } else if (exerciseState[exId]?.inputs?.length > 0) {
        // For multi-input, consider it filled if at least one has content
        valueToCheck = exerciseState[exId].inputs.some(input => input.trim().length > 0) ? 'filled' : '';
    } else if (exerciseState[exId]?.textarea !== undefined) { // Handle cases with separate textarea state
         valueToCheck = exerciseState[exId].textarea.trim();
    }

    let feedbackMsg = '';
    // Use a length threshold (can be adjusted)
    const lengthThreshold = (exId === 'ex1' || exId === 'ex7' || exId === 'ex9') ? 10 : 5; // Different thresholds perhaps

    if (valueToCheck === 'filled' || valueToCheck.length >= lengthThreshold) {
      feedbackMsg = "<strong>✅ Well done!</strong> Your response shows understanding of cabin crew basics.";
    } else {
      feedbackMsg = "<strong>💡 Tip:</strong> Be specific. Include aviation vocabulary and grammar.";
    }

    setExerciseState(prev => ({
      ...prev,
      [exId]: { ...prev[exId], feedback: feedbackMsg }
    }));
  };

  return (
    <div className="root-div"> {/* Apply body styles here */}
      <PageStyles />

      <header>
        <h1>✈️ Unit 1: First Impressions</h1>
        <p>Foundations of Professional Cabin Crew Communication</p>
      </header>

      <div className="container">

        <h2>🎯 After completing this unit, you will be able to:</h2>
        <ul>
          <li>Use basic cabin crew vocabulary and terminology.</li>
          <li>Apply the Present Simple tense to describe routines and facts.</li>
          <li>Understand standard phraseology and procedures.</li>
          <li>Communicate clearly in routine pre-flight and in-flight operations.</li>
        </ul>

        {/* Exercise 1 */}
        <div className="exercise">
          <h3>Exercise 1: Vocabulary Match</h3>
          <p>Match the cabin crew term with its correct definition.</p>
          <table>
            <thead>
              <tr><th>Term</th><th>Definition</th></tr>
            </thead>
            <tbody>
              <tr><td>Galley</td><td>C. A small kitchen area on the plane.</td></tr>
              <tr><td>Boarding Pass</td><td>D. A document that allows a passenger to board a flight.</td></tr>
              <tr><td>Turbulence</td><td>F. Unstable air that can cause the plane to shake.</td></tr>
              <tr><td>Overhead Locker</td><td>E. A storage compartment above the seats.</td></tr>
              <tr><td>Fuselage</td><td>A. The main body of the aircraft.</td></tr>
              <tr><td>Disembark</td><td>B. To leave the aircraft after landing.</td></tr>
              <tr><td>Briefing</td><td>G. A pre-flight meeting for the cabin crew.</td></tr>
              <tr><td>Carry-on</td><td>H. The luggage that a passenger takes into the cabin.</td></tr>
            </tbody>
          </table>
          <textarea
            placeholder="Write your answers (e.g., Galley - C)"
            value={exerciseState.ex1.value}
            onChange={(e) => handleTextareaChange('ex1', e.target.value)}
          />
          <button onClick={() => handleSubmit('ex1')} className="btn">✅ Submit</button>
          {exerciseState.ex1.feedback && (
            <div className="feedback" style={{display:'block'}} dangerouslySetInnerHTML={{ __html: exerciseState.ex1.feedback }} />
          )}
        </div>

        {/* Exercise 2 */}
        <div className="exercise">
            <h3>Exercise 2: Fill in the Blanks (Vocabulary)</h3>
            <p>Complete the sentences with the best word from the list below.</p>
            <p><strong>Words:</strong> fuselage, disembark, turbulence, galley, boarding pass, carry-on, briefing, overhead locker</p>
            <ol>
                {exerciseState.ex2.inputs.map((value, index) => (
                   <li key={`ex2-${index}`}>
                    {index === 0 && "Before the flight, the crew has a "}
                    {index === 1 && "Please place your small bag in the "}
                    {index === 2 && "The pilot announced that we might experience some light "}
                    {index === 3 && "The flight attendant is preparing meals in the "}
                    {index === 4 && "You must show your "}
                    {index === 5 && "The engineer is inspecting the aircraft's "}
                    {index === 6 && "The crew will tell passengers when it is safe to "}
                    {index === 7 && "My small suitcase is my only "}
                    {index === 8 && "Please ensure your "}
                    {index === 9 && "The flight attendant will serve food from the "}
                    <input
                       type="text"
                       className="inline-input"
                       value={value}
                       onChange={(e) => handleMultiInputChange('ex2', index, e.target.value)}
                    />
                    {index === 0 && " to discuss safety and service."}
                    {index === 1 && " above your seat."}
                    {index === 2 && "."}
                    {index === 3 && " at the back of the plane."}
                    {index === 4 && " at the gate to get on the plane."}
                    {index === 5 && " before departure."}
                    {index === 6 && " after landing."}
                    {index === 7 && " for this trip."}
                    {index === 8 && " is stored correctly."}
                    {index === 9 && "."}
                   </li>
                ))}
            </ol>
            <button onClick={() => handleSubmit('ex2')} className="btn">✅ Submit</button>
            {exerciseState.ex2.feedback && (
                <div className="feedback" style={{display:'block'}} dangerouslySetInnerHTML={{ __html: exerciseState.ex2.feedback }} />
            )}
        </div>

        {/* Exercise 3 */}
        <div className="exercise">
            <h3>Exercise 3: Present Simple - Daily Routines</h3>
            <p>Write sentences using the present simple tense to describe a flight attendant's typical workday.</p>
             <ol>
                 {exerciseState.ex3.inputs.map((value, index) => (
                   <li key={`ex3-${index}`}>
                    {index === 0 && "A flight attendant "}
                    {index === 1 && "He "}
                    {index === 2 && "The crew "}
                    {index === 3 && "She "}
                    {index === 4 && "The pilot "}
                    {index === 5 && "They "}
                    {index === 6 && "The attendant "}
                    {index === 7 && "The crew "}
                    {index === 8 && "The plane "}
                    {index === 9 && "They "}
                     <input
                        type="text"
                        className="inline-input"
                        value={value}
                        onChange={(e) => handleMultiInputChange('ex3', index, e.target.value)}
                     />
                    {index === 0 && " at the airport two hours before the flight."}
                    {index === 1 && " the pre-flight briefing."}
                    {index === 2 && " the cabin for passengers."}
                    {index === 3 && " every passenger at the door."}
                    {index === 4 && " the plane."}
                    {index === 5 && " meals and drinks during the flight."}
                    {index === 6 && " that all seatbelts are fastened."}
                    {index === 7 && " questions from passengers."}
                    {index === 8 && " safely at its destination."}
                    {index === 9 && " goodbye to the passengers."}
                   </li>
                 ))}
            </ol>
            {/* Original had textarea too - decide if needed */}
            {/* <textarea placeholder="Your sentences..." value={exerciseState.ex3.textarea} onChange={(e)=> handleTextareaChange('ex3', e.target.value)} /> */}
            <button onClick={() => handleSubmit('ex3')} className="btn">✅ Submit</button>
            {exerciseState.ex3.feedback && (
                <div className="feedback" style={{display:'block'}} dangerouslySetInnerHTML={{ __html: exerciseState.ex3.feedback }} />
            )}
        </div>

        {/* Exercise 4 */}
        <div className="exercise">
            <h3>Exercise 4: Present Simple - Questions</h3>
            <p>Form questions using the present simple to ask about flight operations.</p>
            <ol>
                {exerciseState.ex4.inputs.map((value, index) => (
                    <li key={`ex4-${index}`}>
                     <input
                        type="text"
                        className="inline-input"
                        value={value}
                        onChange={(e) => handleMultiInputChange('ex4', index, e.target.value)}
                     />
                    {index === 0 && " (Do / cabin crew / wear) a uniform?"}
                    {index === 1 && " (Does / a flight attendant / speak) more than one language?"}
                    {index === 2 && " (Do / they / serve) hot meals on this flight?"}
                    {index === 3 && " (Does / the pilot / announce) the weather?"}
                    {index === 4 && " (Do / passengers / have) to show their passport?"}
                    {index === 5 && " (Does / a flight attendant / assist) with luggage?"}
                    {index === 6 && " (Do / they / give) a safety demonstration?"}
                    {index === 7 && " (Does / the plane / have) Wi-Fi?"}
                    {index === 8 && " (Do / passengers / like) the food?"}
                    {index === 9 && " (Does / a flight attendant / work) long hours?"}
                    </li>
                ))}
            </ol>
            {/* <textarea placeholder="Your questions..." value={exerciseState.ex4.textarea} onChange={(e)=> handleTextareaChange('ex4', e.target.value)} /> */}
            <button onClick={() => handleSubmit('ex4')} className="btn">✅ Submit</button>
            {exerciseState.ex4.feedback && (
                <div className="feedback" style={{display:'block'}} dangerouslySetInnerHTML={{ __html: exerciseState.ex4.feedback }} />
            )}
        </div>

        {/* Exercise 5 */}
        <div className="exercise">
            <h3>Exercise 5: There is / There are (Positive)</h3>
            <p>Describe the inside of an airplane using "There is" or "There are."</p>
             <ol>
                {exerciseState.ex5.inputs.map((value, index) => (
                    <li key={`ex5-${index}`}>
                    {index === 0 && "There is "}
                    {index === 1 && "There are "}
                    {index === 2 && "There is "}
                    {index === 3 && "There are "}
                    {index === 4 && "There is "}
                    {index === 5 && "There are "}
                    {index === 6 && "There is "}
                    {index === 7 && "There are "}
                    {index === 8 && "There is "}
                    {index === 9 && "There are "}
                     <input
                        type="text"
                        className="inline-input"
                        value={value}
                        onChange={(e) => handleMultiInputChange('ex5', index, e.target.value)}
                     />
                    {index === 0 && " a seat for every passenger."}
                    {index === 1 && " many overhead lockers."}
                    {index === 2 && " a small table on the back of each seat."}
                    {index === 3 && " some life vests under the seats."}
                    {index === 4 && " a lot of luggage in the hold."}
                    {index === 5 && " several emergency exits."}
                    {index === 6 && " a small window next to each row."}
                    {index === 7 && " some pillows and blankets available."}
                    {index === 8 && " a restroom at the back of the cabin."}
                    {index === 9 && " three different meal options."}
                    </li>
                ))}
            </ol>
            <button onClick={() => handleSubmit('ex5')} className="btn">✅ Submit</button>
            {exerciseState.ex5.feedback && (
                <div className="feedback" style={{display:'block'}} dangerouslySetInnerHTML={{ __html: exerciseState.ex5.feedback }} />
            )}
        </div>

         {/* Exercise 6 */}
        <div className="exercise">
            <h3>Exercise 6: There is / There are (Questions)</h3>
            <p>Form questions using "Is there" or "Are there."</p>
             <ol>
                {exerciseState.ex6.inputs.map((value, index) => (
                    <li key={`ex6-${index}`}>
                     <input
                        type="text"
                        className="inline-input"
                        value={value}
                        onChange={(e) => handleMultiInputChange('ex6', index, e.target.value)}
                     />
                    {index === 0 && " (Is there) any space in the overhead locker?"}
                    {index === 1 && " (Is there) a power outlet at my seat?"}
                    {index === 2 && " (Are there) any vegetarian food?"}
                    {index === 3 && " (Are there) many empty seats on the plane?"}
                    {index === 4 && " (Is there) a call button above my head?"}
                    {index === 5 && " (Are there) any magazines to read?"}
                    {index === 6 && " (Is there) a baby changing table in the restroom?"}
                    {index === 7 && " (Are there) any hot coffee available?"}
                    {index === 8 && " (Is there) a flight map on the screen?"}
                    {index === 9 && " (Are there) any duty-free products for sale?"}
                    </li>
                ))}
            </ol>
            <button onClick={() => handleSubmit('ex6')} className="btn">✅ Submit</button>
            {exerciseState.ex6.feedback && (
                <div className="feedback" style={{display:'block'}} dangerouslySetInnerHTML={{ __html: exerciseState.ex6.feedback }} />
            )}
        </div>

        {/* Exercise 7 */}
        <div className="exercise">
          <h3>Exercise 7: Sentence Structure</h3>
          <p>Rearrange the words to form a complete and correct sentence.</p>
          <ol>
            <li>passengers / the flight attendant / welcomes / at the door.</li>
            <li>the safety demonstration / we / perform / before takeoff.</li>
            <li>every seat / a life vest / is / under.</li>
            <li>you / your seatbelt / must / fasten / during takeoff.</li>
            <li>bags / in the overhead locker / passengers / put / their.</li>
            <li>the pilot / the flight information / announces / to the passengers.</li>
            <li>for / the crew / is responsible / passenger safety.</li>
            <li>on the plane / are / many / different jobs / there.</li>
            <li>the cabin / assists / the passengers / with their bags.</li>
            <li>during the flight / they / serve / drinks and snacks.</li>
          </ol>
          <textarea
            placeholder="Your rearranged sentences..."
            value={exerciseState.ex7.value}
            onChange={(e) => handleTextareaChange('ex7', e.target.value)}
           />
          <button onClick={() => handleSubmit('ex7')} className="btn">✅ Submit</button>
          {exerciseState.ex7.feedback && (
            <div className="feedback" style={{display:'block'}} dangerouslySetInnerHTML={{ __html: exerciseState.ex7.feedback }} />
          )}
        </div>

        {/* Exercise 8 */}
        <div className="exercise">
            <h3>Exercise 8: Gap Fill (Text)</h3>
            <p>Read the text about a flight and fill in the blanks with the correct words.</p>
            <p><strong>Words:</strong> briefing, passengers, call button, takeoff, cabin, safety, meal, turbulence</p>
             <p>
                Our flight begins with a pre-flight
                <input type="text" className="inline-input" value={exerciseState.ex8.inputs[0]} onChange={(e) => handleMultiInputChange('ex8', 0, e.target.value)} />
                where the crew reviews all the important details. After the
                <input type="text" className="inline-input" value={exerciseState.ex8.inputs[1]} onChange={(e) => handleMultiInputChange('ex8', 1, e.target.value)} />
                , the flight attendants welcome the
                <input type="text" className="inline-input" value={exerciseState.ex8.inputs[2]} onChange={(e) => handleMultiInputChange('ex8', 2, e.target.value)} />
                into the
                <input type="text" className="inline-input" value={exerciseState.ex8.inputs[3]} onChange={(e) => handleMultiInputChange('ex8', 3, e.target.value)} />
                . The first priority is always
                <input type="text" className="inline-input" value={exerciseState.ex8.inputs[4]} onChange={(e) => handleMultiInputChange('ex8', 4, e.target.value)} />
                , so they check that all seatbelts are fastened. During the flight, they serve a
                <input type="text" className="inline-input" value={exerciseState.ex8.inputs[5]} onChange={(e) => handleMultiInputChange('ex8', 5, e.target.value)} />
                and drinks. If you need assistance, please press your
                <input type="text" className="inline-input" value={exerciseState.ex8.inputs[6]} onChange={(e) => handleMultiInputChange('ex8', 6, e.target.value)} />
                . Sometimes, the plane experiences light
                <input type="text" className="inline-input" value={exerciseState.ex8.inputs[7]} onChange={(e) => handleMultiInputChange('ex8', 7, e.target.value)} />
                . The crew will be ready for it.
            </p>
            <button onClick={() => handleSubmit('ex8')} className="btn">✅ Submit</button>
            {exerciseState.ex8.feedback && (
                <div className="feedback" style={{display:'block'}} dangerouslySetInnerHTML={{ __html: exerciseState.ex8.feedback }} />
            )}
        </div>

         {/* Exercise 9 */}
        <div className="exercise">
          <h3>Exercise 9: Speaking / Discussion</h3>
          <p>Work with a partner or in a small group to answer these questions.</p>
          <ul>
            <li>What are some important qualities of a good flight attendant?</li>
            <li>Why is teamwork so important for cabin crew?</li>
            <li>What are the different types of emergencies a flight attendant should be prepared for?</li>
            <li>What is the most challenging part of being a flight attendant?</li>
            <li>Describe the steps of a typical passenger's journey from check-in to arrival.</li>
            <li>How do you think a flight attendant handles a difficult or upset passenger?</li>
            <li>What kind of questions do passengers often ask?</li>
            <li>Why is the safety demonstration so important?</li>
            <li>Do you think being a flight attendant is an interesting job? Why or why not?</li>
            <li>What are some things that make a flight comfortable for a passenger?</li>
          </ul>
          <textarea
            placeholder="Your discussion points..."
            value={exerciseState.ex9.value}
            onChange={(e) => handleTextareaChange('ex9', e.target.value)}
          />
          <button onClick={() => handleSubmit('ex9')} className="btn">✅ Submit</button>
          {exerciseState.ex9.feedback && (
            <div className="feedback" style={{display:'block'}} dangerouslySetInnerHTML={{ __html: exerciseState.ex9.feedback }} />
          )}
        </div>

        {/* Navigation */}
        <div className="nav-links">
          <a href="https://www.aulice.ca">🏠 Home</a>
          <a href="https://aulislab.netlify.app">🧩 Aulice Lab</a>
          <a href="https://aulice-lexicon.netlify.app">📘 Lexicon</a>
          <a href="https://teacher-aulice.netlify.app">👨‍🏫 Teacher Dashboard</a>
        </div>

      </div>
    </div>
  );
}

export default CabinCrewUnit1;