import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Helper Component for <style> ---
// Injects the original <style> tag directly.
const PageStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    /* body styles applied to root div */
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
      max-width: 900px;
      margin: 40px auto;
      padding: 30px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.1);
    }
    h2, h3 {
      margin: 20px 0 10px;
      color: #d35400;
    }
    p, ul, ol {
      margin: 10px 0;
    }
    .btn {
      display: inline-block;
      padding: 10px 20px;
      background: #d35400;
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
      font-family: inherit; /* Ensure input/textarea font matches */
    }
    .inline-input { /* Style for inline text inputs if needed */
        display: inline-block; /* Adjust display */
        width: auto; /* Adjust width */
        min-width: 150px; /* Example min-width */
        vertical-align: baseline; /* Align with text */
        margin: 0 5px; /* Adjust spacing */
        padding: 4px 8px; /* Adjust padding */
    }
    .exercise {
      background: #f8f9fa;
      padding: 20px;
      margin: 20px 0;
      border-left: 4px solid #d35400;
      border-radius: 6px;
    }
    .feedback {
      margin: 10px 0;
      padding: 10px;
      background: #e8f4f8; /* Light blue background */
      border-radius: 6px;
      border-left: 4px solid #3498db; /* Blue border */
      color: #2c3e50; /* Darker text */
    }
    .nav-links {
      text-align: center;
      margin: 30px 0;
    }
    .nav-links a {
      margin: 0 10px;
      color: #d35400;
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
function OilGasUnit1Page() {
  // State object to hold values and feedback for all exercises
  const [exerciseState, setExerciseState] = useState({
    ex1: { value: '', feedback: null },
    ex2: {
        inputs: Array(10).fill(''), // For the 10 inputs in Ex2
        feedback: null
    },
    ex3: {
        inputs: Array(10).fill(''), // For the 10 inputs in Ex3
        textarea: '',
        feedback: null
    },
    ex4: {
        inputs: Array(10).fill(''), // For the 10 inputs in Ex4
        textarea: '',
        feedback: null
    },
    ex5: {
        inputs: Array(10).fill(''), // For the 10 inputs in Ex5
        feedback: null
    },
    ex6: {
        inputs: Array(10).fill(''), // For the 10 inputs in Ex6
        feedback: null
    },
    ex7: { value: '', feedback: null },
    ex8: {
        inputs: Array(8).fill(''), // For the 8 inputs in Ex8
        feedback: null
    },
    ex9: { value: '', feedback: null },
  });

  // Generic handler for textarea changes
  const handleTextareaChange = (exId, value) => {
    setExerciseState(prev => ({
      ...prev,
      [exId]: { ...prev[exId], value: value }
    }));
  };

   // Generic handler for single input changes (used in some text areas that act like inputs)
   const handleSingleInputChange = (exId, value) => {
    setExerciseState(prev => ({
      ...prev,
      [exId]: { ...prev[exId], value: value } // Assuming single value property
    }));
  };

  // Generic handler for multiple input changes within an exercise
  const handleMultiInputChange = (exId, index, value) => {
    setExerciseState(prev => {
        const newInputs = [...prev[exId].inputs];
        newInputs[index] = value;
        return {
            ...prev,
            [exId]: { ...prev[exId], inputs: newInputs }
        };
    });
};

  // Generic handler for submit buttons
  const handleSubmit = (exId) => {
    // Determine the value to check based on exercise structure
    let valueToCheck = '';
    if (exerciseState[exId].value !== undefined) {
        valueToCheck = exerciseState[exId].value.trim();
    } else if (exerciseState[exId].inputs && exerciseState[exId].inputs.length > 0) {
        // For multi-input exercises, check if at least one input has content
        valueToCheck = exerciseState[exId].inputs.some(input => input.trim().length > 0) ? 'filled' : '';
    } else if (exerciseState[exId].textarea !== undefined) {
        valueToCheck = exerciseState[exId].textarea.trim();
    }


    let feedbackMsg = '';
    // Use a length threshold appropriate for the expected answer type
    const lengthThreshold = (exId === 'ex1' || exId === 'ex7' || exId === 'ex8' || exId === 'ex9') ? 10 : 5; // Shorter for inputs

    if (valueToCheck.length < lengthThreshold && valueToCheck !== 'filled') { // 'filled' bypasses length check for multi-input
        feedbackMsg = "<strong>💡 Tip:</strong> Be specific. Include industry vocabulary and grammar.";
    } else {
        feedbackMsg = "<strong>✅ Well done!</strong> Your response shows understanding of oil & gas basics.";
    }

    setExerciseState(prev => ({
      ...prev,
      [exId]: { ...prev[exId], feedback: feedbackMsg }
    }));
  };

  // Styles from the original <body>
  const bodyStyles = {
    fontFamily: "'Segoe UI', sans-serif",
    background: '#f7f9fc',
    color: '#2c3e50',
    lineHeight: 1.6
  };

  return (
    <div style={bodyStyles}>
      <PageStyles />

      <header>
        <h1>🛢️ Unit 1: The Fundamentals</h1>
        <p>Foundations of Professional Oil & Gas Communication</p>
      </header>

      <div className="container">

        <h2>🎯 After completing this unit, you will be able to:</h2>
        <ul>
          <li>Use basic oil and gas vocabulary and terminology.</li>
          <li>Apply the Present Simple tense to describe routines and facts.</li>
          <li>Understand core industry processes and procedures.</li>
          <li>Communicate clearly in routine exploration, drilling, and production operations.</li>
        </ul>

        {/* Exercise 1 */}
        <div className="exercise">
          <h3>Exercise 1: Vocabulary Match</h3>
          <p>Match the term with its correct definition.</p>
          <table>
            <thead>
              <tr><th>Term</th><th>Definition</th></tr>
            </thead>
            <tbody>
              <tr><td>Rig</td><td>B. A machine used to drill oil or gas wells.</td></tr>
              <tr><td>Reservoir</td><td>D. A large underground area that holds oil or gas.</td></tr>
              <tr><td>Refinery</td><td>C. A station where crude oil is processed into gasoline and other products.</td></tr>
              <tr><td>Wellhead</td><td>E. The beginning of a well at the surface of the ground.</td></tr>
              <tr><td>Crude Oil</td><td>A. The natural, unrefined oil found underground.</td></tr>
              <tr><td>Pipeline</td><td>G. A long pipe used to transport oil or gas over long distances.</td></tr>
              <tr><td>Exploration</td><td>F. The process of searching for new oil and gas deposits.</td></tr>
              <tr><td>Petroleum</td><td>H. A general term for oil and gas from the earth.</td></tr>
            </tbody>
          </table>
          <textarea
            placeholder="Write your answers (e.g., Rig - B)"
            value={exerciseState.ex1.value}
            onChange={(e) => handleTextareaChange('ex1', e.target.value)}
          />
          <button onClick={() => handleSubmit('ex1')} className="btn">✅ Submit</button>
          {exerciseState.ex1.feedback && (
            <div className="feedback" dangerouslySetInnerHTML={{ __html: exerciseState.ex1.feedback }} />
          )}
        </div>

        {/* Exercise 2 */}
        <div className="exercise">
            <h3>Exercise 2: Fill in the Blanks (Vocabulary)</h3>
            <p>Complete the sentences with the best word from the list below.</p>
            <p><strong>Words:</strong> rig, reservoir, refinery, wellhead, crude oil, pipeline, exploration, petroleum</p>
            <ol>
                {/* Map inputs for Ex2 */}
                {exerciseState.ex2.inputs.map((value, index) => (
                   <li key={index}>
                    {index === 0 && "The team of geologists is responsible for the "}
                    {index === 1 && "The company built a new "}
                    {index === 2 && "We found a large "}
                    {index === 3 && "The tanker truck is filled with "}
                    {index === 4 && "The worker checks the pressure and gauges at the "}
                    {index === 5 && "The new "}
                    {index === 6 && "The "}
                    {index === 7 && "This company is a leader in the global "}
                    {index === 8 && "The new "}
                    {index === 9 && "The company needs to find a new "}
                    <input
                       type="text"
                       className="inline-input"
                       value={value}
                       onChange={(e) => handleMultiInputChange('ex2', index, e.target.value)}
                    />
                    {index === 0 && " phase."}
                    {index === 1 && " to produce cleaner fuels."}
                    {index === 2 && " of natural gas deep under the ocean."}
                    {index === 3 && " from the oil field."}
                    {index === 4 && "."}
                    {index === 5 && " is very large and can drill to great depths."}
                    {index === 6 && " transports the gas from the source to the city."}
                    {index === 7 && " industry."}
                    {index === 8 && " is located offshore and operates 24/7."}
                    {index === 9 && " to store the oil."}
                   </li>
                ))}
            </ol>
            <button onClick={() => handleSubmit('ex2')} className="btn">✅ Submit</button>
            {exerciseState.ex2.feedback && (
                <div className="feedback" dangerouslySetInnerHTML={{ __html: exerciseState.ex2.feedback }} />
            )}
        </div>


        {/* Exercise 3 */}
        <div className="exercise">
            <h3>Exercise 3: Present Simple - Daily Routines</h3>
            <p>Write sentences using the present simple tense to describe a worker's typical workday on a rig.</p>
            <ol>
                 {exerciseState.ex3.inputs.map((value, index) => (
                   <li key={index}>
                    {index === 0 && "A driller "}
                    {index === 1 && "He "}
                    {index === 2 && "The supervisor "}
                    {index === 3 && "They "}
                    {index === 4 && "The team "}
                    {index === 5 && "They "}
                    {index === 6 && "The shift "}
                    {index === 7 && "The crew "}
                    {index === 8 && "He "}
                    {index === 9 && "The company "}
                     <input
                        type="text"
                        className="inline-input"
                        value={value}
                        onChange={(e) => handleMultiInputChange('ex3', index, e.target.value)}
                     />
                    {index === 0 && " early to start the shift."}
                    {index === 1 && " his safety gear."}
                    {index === 2 && " a safety meeting."}
                    {index === 3 && " the equipment before starting."}
                    {index === 4 && " the drilling process continuously."}
                    {index === 5 && " all safety protocols and procedures."}
                    {index === 6 && " at 6 p.m."}
                    {index === 7 && " meals together in the mess hall."}
                    {index === 8 && " to the gym after his shift."}
                    {index === 9 && " transportation to the rig."}
                   </li>
                 ))}
            </ol>
             {/* Note: The original HTML had both inline inputs AND a textarea. Adjust if needed. */}
            {/* <textarea placeholder="Your sentences..." value={exerciseState.ex3.textarea} onChange={(e) => setExerciseState(prev => ({ ...prev, ex3: {...prev.ex3, textarea: e.target.value}}))}></textarea> */}
            <button onClick={() => handleSubmit('ex3')} className="btn">✅ Submit</button>
            {exerciseState.ex3.feedback && (
                <div className="feedback" dangerouslySetInnerHTML={{ __html: exerciseState.ex3.feedback }} />
            )}
        </div>

        {/* Exercise 4 */}
        <div className="exercise">
            <h3>Exercise 4: Present Simple - Questions</h3>
            <p>Form questions using the present simple to ask about oil and gas operations.</p>
            <ol>
                {exerciseState.ex4.inputs.map((value, index) => (
                    <li key={index}>
                     <input
                        type="text"
                        className="inline-input"
                        value={value}
                        onChange={(e) => handleMultiInputChange('ex4', index, e.target.value)}
                     />
                    {index === 0 && " (Do / workers / wear) special protective clothing?"}
                    {index === 1 && " (Does / a geologist / study) the rock layers?"}
                    {index === 2 && " (Do / they / use) large cranes on the rig?"}
                    {index === 3 && " (Does / the foreman / supervise) the crew?"}
                    {index === 4 && " (Do / workers / live) on the offshore rig?"}
                    {index === 5 && " (Does / the pipeline / transport) crude oil?"}
                    {index === 6 && " (Do / they / use) helicopters for transport?"}
                    {index === 7 && " (Does / the drilling process / make) a lot of noise?"}
                    {index === 8 && " (Do / they / have) to be very careful with safety?"}
                    {index === 9 && " (Does / the company / have) an environmental policy?"}
                    </li>
                ))}
            </ol>
             {/* Note: The original HTML had both inline inputs AND a textarea. Adjust if needed. */}
            {/* <textarea placeholder="Your questions..." value={exerciseState.ex4.textarea} onChange={(e) => setExerciseState(prev => ({ ...prev, ex4: {...prev.ex4, textarea: e.target.value}}))}></textarea> */}
            <button onClick={() => handleSubmit('ex4')} className="btn">✅ Submit</button>
            {exerciseState.ex4.feedback && (
                <div className="feedback" dangerouslySetInnerHTML={{ __html: exerciseState.ex4.feedback }} />
            )}
        </div>

        {/* Exercise 5 */}
        <div className="exercise">
            <h3>Exercise 5: There is / There are (Positive)</h3>
            <p>Describe an oil rig using "There is" or "There are."</p>
             <ol>
                {exerciseState.ex5.inputs.map((value, index) => (
                    <li key={index}>
                    {index === 0 && "There is "}
                    {index === 1 && "There are "}
                    {index === 2 && "There are "}
                    {index === 3 && "There is "}
                    {index === 4 && "There are "}
                    {index === 5 && "There is "}
                    {index === 6 && "There is "}
                    {index === 7 && "There are "}
                    {index === 8 && "There is "}
                    {index === 9 && "There is "}
                     <input
                        type="text"
                        className="inline-input"
                        value={value}
                        onChange={(e) => handleMultiInputChange('ex5', index, e.target.value)}
                     />
                    {index === 0 && " a large drill on the top of the rig."}
                    {index === 1 && " many pipes and hoses on the deck."}
                    {index === 2 && " some lifeboats for emergencies."}
                    {index === 3 && " a lot of metal and steel."}
                    {index === 4 && " several cranes to move heavy equipment."}
                    {index === 5 && " a helipad for air transport."}
                    {index === 6 && " a control room with many monitors."}
                    {index === 7 && " a few rooms for the workers to sleep."}
                    {index === 8 && " a safety officer on every shift."}
                    {index === 9 && " a lot of noise from the machinery."}
                    </li>
                ))}
            </ol>
            <button onClick={() => handleSubmit('ex5')} className="btn">✅ Submit</button>
            {exerciseState.ex5.feedback && (
                <div className="feedback" dangerouslySetInnerHTML={{ __html: exerciseState.ex5.feedback }} />
            )}
        </div>

        {/* Exercise 6 */}
        <div className="exercise">
            <h3>Exercise 6: There is / There are (Questions)</h3>
            <p>Form questions using "Is there" or "Are there."</p>
            <ol>
                {exerciseState.ex6.inputs.map((value, index) => (
                    <li key={index}>
                     <input
                        type="text"
                        className="inline-input"
                        value={value}
                        onChange={(e) => handleMultiInputChange('ex6', index, e.target.value)}
                     />
                    {index === 0 && " (Is there) any fresh water on the rig?"}
                    {index === 1 && " (Is there) a kitchen where the cooks prepare food?"}
                    {index === 2 && " (Are there) any special training for new workers?"}
                    {index === 3 && " (Are there) many helicopters that land here daily?"}
                    {index === 4 && " (Is there) a hospital or clinic on board?"}
                    {index === 5 && " (Are there) any fire-fighting equipment?"}
                    {index === 6 && " (Is there) a specific procedure for starting a drill?"}
                    {index === 7 && " (Are there) any safety signs on the doors?"}
                    {index === 8 && " (Is there) a recreation room for the crew?"}
                    {index === 9 && " (Are there) any difficult weather conditions?"}
                    </li>
                ))}
            </ol>
            <button onClick={() => handleSubmit('ex6')} className="btn">✅ Submit</button>
            {exerciseState.ex6.feedback && (
                <div className="feedback" dangerouslySetInnerHTML={{ __html: exerciseState.ex6.feedback }} />
            )}
        </div>


        {/* Exercise 7 */}
        <div className="exercise">
          <h3>Exercise 7: Sentence Structure</h3>
          <p>Rearrange the words to form a complete and correct sentence.</p>
          <ol>
            <li>from / the reservoir / we / extract / oil.</li>
            <li>a demanding / offshore / job / is / working.</li>
            <li>the crew / inspects / the equipment / morning / every.</li>
            <li>drilled / a new / the company / well / last month.</li>
            <li>safety / is / on the rig / the first priority.</li>
            <li>for / they / new deposits / search / underground.</li>
            <li>oil / the pipelines / transport / to the refinery.</li>
            <li>the rig / workers / on / work / long hours.</li>
            <li>safety glasses / every worker / wears / a hard hat / and.</li>
            <li>the team / the driller / supervises / on the floor.</li>
          </ol>
          <textarea
            placeholder="Your rearranged sentences..."
            value={exerciseState.ex7.value}
            onChange={(e) => handleTextareaChange('ex7', e.target.value)}
           />
          <button onClick={() => handleSubmit('ex7')} className="btn">✅ Submit</button>
          {exerciseState.ex7.feedback && (
            <div className="feedback" dangerouslySetInnerHTML={{ __html: exerciseState.ex7.feedback }} />
          )}
        </div>

        {/* Exercise 8 */}
        <div className="exercise">
            <h3>Exercise 8: Gap Fill (Text)</h3>
            <p>Read the text about the oil process and fill in the blanks with the correct words.</p>
            <p><strong>Words:</strong> drilling, rig, reservoir, refinery, crude oil, pipelines, wellhead, exploration</p>
            <p>
                The oil and gas industry is very complex. It begins with
                <input type="text" className="inline-input" value={exerciseState.ex8.inputs[0]} onChange={(e) => handleMultiInputChange('ex8', 0, e.target.value)} />
                to find new underground
                <input type="text" className="inline-input" value={exerciseState.ex8.inputs[1]} onChange={(e) => handleMultiInputChange('ex8', 1, e.target.value)} />
                . Once a new source is found, a large
                <input type="text" className="inline-input" value={exerciseState.ex8.inputs[2]} onChange={(e) => handleMultiInputChange('ex8', 2, e.target.value)} />
                is set up for continuous
                <input type="text" className="inline-input" value={exerciseState.ex8.inputs[3]} onChange={(e) => handleMultiInputChange('ex8', 3, e.target.value)} />
                . The {/* Assuming 'rig' was intended here based on context */}
                 <input type="text" className="inline-input" placeholder="rig (example)" value={exerciseState.ex8.inputs[4]} onChange={(e) => handleMultiInputChange('ex8', 4, e.target.value)} />
                 is the main structure for this process. From the
                <input type="text" className="inline-input" value={exerciseState.ex8.inputs[5]} onChange={(e) => handleMultiInputChange('ex8', 5, e.target.value)} />
                , the oil flows through a network of
                <input type="text" className="inline-input" value={exerciseState.ex8.inputs[6]} onChange={(e) => handleMultiInputChange('ex8', 6, e.target.value)} />
                . Finally, the {/* Assuming 'crude oil' was intended */}
                <input type="text" className="inline-input" placeholder="crude oil (example)" value={exerciseState.ex8.inputs[7]} onChange={(e) => handleMultiInputChange('ex8', 7, e.target.value)} />
                is transported to a
                <input type="text" className="inline-input" value={exerciseState.ex8.inputs[8]} onChange={(e) => handleMultiInputChange('ex8', 8, e.target.value)} /> {/* Extra input based on sentence structure */}
                 for processing.
            </p>
            <button onClick={() => handleSubmit('ex8')} className="btn">✅ Submit</button>
            {exerciseState.ex8.feedback && (
                <div className="feedback" dangerouslySetInnerHTML={{ __html: exerciseState.ex8.feedback }} />
            )}
        </div>


        {/* Exercise 9 */}
        <div className="exercise">
          <h3>Exercise 9: Speaking / Discussion</h3>
          <p>Work with a partner or in a small group to answer these questions.</p>
          <ul>
            <li>What are the different types of energy sources you know about?</li>
            <li>Why is safety so important in the oil and gas industry?</li>
            <li>What kind of skills does a good oil and gas worker need to have?</li>
            <li>How does the industry impact the environment, both positively and negatively?</li>
            <li>What are some of the tools and machines used on an oil rig?</li>
            <li>Describe what the inside of a refinery might look like.</li>
            <li>Do you think a job in the oil and gas industry is challenging? Why or why not?</li>
            <li>What are some products we use every day that come from petroleum?</li>
            <li>What is the difference between an offshore and a land-based rig?</li>
            <li>Do you think the industry will change in the future?</li>
          </ul>
          <textarea
            placeholder="Your discussion points..."
            value={exerciseState.ex9.value}
            onChange={(e) => handleTextareaChange('ex9', e.target.value)}
          />
          <button onClick={() => handleSubmit('ex9')} className="btn">✅ Submit</button>
          {exerciseState.ex9.feedback && (
            <div className="feedback" dangerouslySetInnerHTML={{ __html: exerciseState.ex9.feedback }} />
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

export default OilGasUnit1Page;