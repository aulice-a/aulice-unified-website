import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Helper Component for <style> ---
const PageStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { /* Applied to root div */
      font-family: 'Segoe UI', sans-serif;
      background: #f7f9fc;
      color: #2c3e50;
      line-height: 1.6;
    }
    header {
      text-align: center;
      padding: 40px 20px;
      background: #8e44ad;
      color: white;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
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
    .exercise-unit {
        margin: 30px 0;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 8px;
        border: 1px dashed #8e44ad;
    }
    .exercise-unit h4 {
      color: #8e44ad;
      margin-bottom: 15px;
    }
    .exercise-unit p {
      margin-bottom: 10px;
    }
    .exercise-unit ul {
      margin-bottom: 20px;
      padding-left: 20px;
    }
    .exercise-unit li {
      margin: 8px 0;
    }
    .blank-input {
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        transition: border-color 0.3s, background-color 0.3s;
        margin: 0 5px; /* Added for spacing */
        font-family: inherit; /* Ensure font matches */
        font-size: 1em; /* Ensure size matches */
    }
    /* Specific width adjustments */
    #ex1_1, #ex1_2, #ex1_3, #ex1_4, #ex1_5, #ex1_6 { width: 100px; }
    #ex3_1, #ex3_2, #ex3_3, #ex3_4, #ex3_5 { width: 100%; }
    #ex4_1, #ex4_2, #ex4_3, #ex4_4 { width: 100px; }
    #ex5_1, #ex5_2, #ex5_3, #ex5_4 { width: 100%; height: 60px; } /* Textarea */
    #ex6_1, #ex6_2, #ex6_3, #ex6_4, #ex6_5 { width: 100px; }
    #ex7_1, #ex7_2, #ex7_3, #ex7_4 { width: 80px; }
    #ex8_1 { width: 100%; height: 80px; } /* Textarea */
    #ex9_1, #ex9_2, #ex9_3, #ex9_4, #ex9_5 { width: 100px; }
    #ex10_1, #ex10_2, #ex10_3, #ex10_4, #ex10_5 { width: 100px; }
    #ex11_1, #ex11_2, #ex11_3, #ex11_4, #ex11_5 { width: 100px; }
    #ex12_1, #ex12_2, #ex12_3, #ex12_4 { width: 150px; }

    .sentence-item {
        background: #f0f0f0;
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 10px;
        margin-bottom: 10px;
        cursor: grab;
        transition: transform 0.2s, box-shadow 0.2s, background-color 0.3s, border-color 0.3s;
        touch-action: none; /* For mobile drag */
    }
    .sentence-item:active {
        cursor: grabbing;
    }
    .sentence-item.dragging {
        opacity: 0.5;
        transform: scale(1.02);
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }
    .answer-feedback { /* Not used directly? Check logic */
        margin-top: 10px;
        padding: 10px;
        border-radius: 6px;
        font-weight: bold;
    }
    .correct {
      background-color: #e6f9e6 !important; /* Use !important if needed */
      border-color: #4CAF50 !important;
    }
    .incorrect {
      background-color: #fcebeb !important;
      border-color: #f44336 !important;
    }
    .score-container {
        text-align: center;
        margin-top: 20px;
        font-size: 20px;
        font-weight: bold;
        color: #8e44ad;
    }
    .check-button {
        display: block;
        width: 250px;
        margin: 40px auto;
        padding: 15px 25px;
        font-size: 18px;
        font-weight: bold;
        color: white;
        background: #8e44ad;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }
    .check-button:hover {
        background-color: #72318c;
        transform: translateY(-2px);
    }
    footer {
      text-align: center;
      padding: 40px;
      background: #8e44ad;
      color: white;
      margin-top: 60px;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }
    .nav-links {
      text-align: center;
      margin: 30px 0;
    }
    .nav-links a {
      margin: 0 10px;
      color: #8e44ad;
      text-decoration: none;
      font-weight: bold;
    }
  `}} />
);

// --- Correct Answers ---
// Define outside component for clarity
const correctAnswers = {
    ex1: { 1: ["my name is", "i am"], 2: ["meet", "welcome"], 3: ["seat", "sit"], 4: ["help", "assist"], 5: ["through", "during"], 6: ["ask", "raise"] },
    ex2Order: [1, 2, 3, 4, 5, 6], // Expected order by data-order attribute
    ex3: {
        1: "what are your primary goals for this procedure?",
        2: "what expectations do you have for this treatment?",
        3: "what are you most concerned about?",
        4: "what do you hope to achieve with your new smile?",
        5: "has anyone told you about the recovery time?",
    },
    ex4: { 1: ["first", "first,"], 2: ["next", "next,"], 3: ["after that", "after that,"], 4: ["finally", "finally,"] },
    ex5: { // Flexible checks for rephrasing
        1: ["may cause", "could cause", "mild discomfort"],
        2: ["ask you to follow", "recommend following", "important to follow"],
        3: ["may experience", "could experience", "some swelling"],
        4: ["highly effective", "very effective", "most clients"],
    },
    ex6: { 1: ["group", "bundle"], 2: ["grow", "emerge"], 3: ["extract", "remove"], 4: ["place", "implant"], 5: ["create", "achieve"] },
    ex7: { 1: ["haven't we", "have we not"], 2: ["don't you", "do you not"], 3: ["isn't it", "is it not"], 4: ["can't you", "can you not"] },
    ex8: { 1: ["natural result", "complement your features", "not an exact copy"] }, // Flexible check
    ex9: { 1: ["can", "could"], 2: ["will", "are going to"], 3: ["will", "would"], 4: ["work", "be ok", "be fine"], 5: ["will", "would"] },
    ex10: { 1: ["have", "take"], 2: ["concerned", "worried"], 3: ["will do", "will make"], 4: ["goals", "aims", "expectations"], 5: ["will", "should"] },
    ex11: { 1: ["inquiry", "question", "follow-up"], 2: ["questions", "inquiry"], 3: ["takes", "lasts"], 4: ["takes", "is", "requires"], 5: ["further", "additional", "more"] },
    ex12: { // Example answers, accept reasonable variations
        1: ["hair graft", "veneers", "facial surgery"],
        2: ["fuller hairline", "whiter teeth", "natural result", "more confident"],
        3: ["pain", "swelling", "cost", "recovery time"],
        4: ["monday at 10 am", "january 20, 2025", "next week"],
    }
};
// Calculate total questions dynamically
const totalQuestions = Object.values(correctAnswers).reduce((count, answers) => {
    if (Array.isArray(answers)) return count + answers.length; // Count items in arrays (like ex5 rephrases)
    if (typeof answers === 'object') return count + Object.keys(answers).length; // Count keys in objects (inputs)
    return count + 1; // Count single answers (like ex2Order, ex3 questions)
}, 0);


// --- Main Component ---
function AestheticianUnit1Page() {
    // State for all inputs
    const [inputs, setInputs] = useState({
        ex1_1: '', ex1_2: '', ex1_3: '', ex1_4: '', ex1_5: '', ex1_6: '',
        ex3_1: '', ex3_2: '', ex3_3: '', ex3_4: '', ex3_5: '',
        ex4_1: '', ex4_2: '', ex4_3: '', ex4_4: '',
        ex5_1: '', ex5_2: '', ex5_3: '', ex5_4: '',
        ex6_1: '', ex6_2: '', ex6_3: '', ex6_4: '', ex6_5: '',
        ex7_1: '', ex7_2: '', ex7_3: '', ex7_4: '',
        ex8_1: '',
        ex9_1: '', ex9_2: '', ex9_3: '', ex9_4: '', ex9_5: '',
        ex10_1: '', ex10_2: '', ex10_3: '', ex10_4: '', ex10_5: '',
        ex11_1: '', ex11_2: '', ex11_3: '', ex11_4: '', ex11_5: '',
        ex12_1: '', ex12_2: '', ex12_3: '', ex12_4: '',
    });
    // State for feedback classes
    const [feedback, setFeedback] = useState({});
    // State for score
    const [score, setScore] = useState(null);

    // --- Drag and Drop State & Refs ---
    const [sentencesEx2, setSentencesEx2] = useState([
        { id: 'ex2-3', text: 'Then, we will prepare your teeth for the veneers.', order: 3 },
        { id: 'ex2-5', text: 'The final step is to securely bond the veneers to your teeth.', order: 5 },
        { id: 'ex2-1', text: "First, we'll design a set of veneers that perfectly suits your smile.", order: 1 },
        { id: 'ex2-4', text: "After that, we'll give you temporary veneers to wear.", order: 4 },
        { id: 'ex2-2', text: 'Next, we will take an impression of your teeth.', order: 2 },
        { id: 'ex2-6', text: 'Finally, you will leave with a beautiful, new smile.', order: 6 },
    ]);
    const dragItem = useRef(null); // Index of item being dragged
    const dragOverItem = useRef(null); // Index of item being dragged over
    const [isEx2Correct, setIsEx2Correct] = useState(null); // null, true, or false

     // Initialize sentencesEx2 randomly on component mount
    useEffect(() => {
        setSentencesEx2(prevSentences => {
            const shuffled = [...prevSentences];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        });
    }, []); // Empty dependency array ensures this runs only once on mount


    // --- Event Handlers ---
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setInputs(prev => ({ ...prev, [id]: value }));
        // Clear feedback when user types
        setFeedback(prev => ({ ...prev, [id]: null }));
    };

    const handleDragStart = (index) => {
        dragItem.current = index;
        // Add dragging class visually
        const item = document.getElementById(sentencesEx2[index].id);
        if (item) setTimeout(() => item.classList.add('dragging'), 0);
        setIsEx2Correct(null); // Clear feedback on drag start
    };

    const handleDragEnter = (index) => {
        dragOverItem.current = index;
    };

    const handleDragEnd = () => {
        const dragItemIndex = dragItem.current;
        const dragOverItemIndex = dragOverItem.current;

         // Remove dragging class visually
         if (dragItemIndex !== null) {
            const item = document.getElementById(sentencesEx2[dragItemIndex].id);
            if (item) item.classList.remove('dragging');
        }


        if (dragItemIndex !== null && dragOverItemIndex !== null && dragItemIndex !== dragOverItemIndex) {
            const sentencesCopy = [...sentencesEx2];
            const draggedItemContent = sentencesCopy.splice(dragItemIndex, 1)[0];
            sentencesCopy.splice(dragOverItemIndex, 0, draggedItemContent);
            setSentencesEx2(sentencesCopy);
        }
        dragItem.current = null;
        dragOverItem.current = null;
    };

    const handleTouchStart = (e, index) => {
        dragItem.current = index;
        const item = document.getElementById(sentencesEx2[index].id);
        if (item) item.classList.add('dragging');
        setIsEx2Correct(null);
    };

    const handleTouchMove = (e) => {
        e.preventDefault(); // Prevent scrolling
        if (dragItem.current === null) return;

        const touch = e.touches[0];
        const elementOver = document.elementFromPoint(touch.clientX, touch.clientY);
        const targetItem = elementOver?.closest('.sentence-item');

        if (targetItem) {
            const targetIndex = sentencesEx2.findIndex(item => item.id === targetItem.id);
            if (targetIndex !== -1) {
                 dragOverItem.current = targetIndex;
                 // Optional: Visual indicator while dragging over
            }
        } else {
            dragOverItem.current = null;
        }
    };

     const handleTouchEnd = () => {
        handleDragEnd(); // Reuse the same logic as dragEnd
    };


    const checkAnswers = () => {
        let currentScore = 0;
        const newFeedback = {};

        // Helper to check answers and update score/feedback
        const checkInput = (id, correctSet) => {
            const value = inputs[id].trim().toLowerCase();
            let isCorrect = false;
            if (Array.isArray(correctSet)) {
                // Check if value matches any in the array OR includes key phrases for longer answers
                isCorrect = correctSet.some(answer =>
                    answer.toLowerCase() === value ||
                    (answer.length > 15 && value.includes(answer.toLowerCase().split(' ')[1])) // Basic check for rephrased answers
                );
            } else {
                isCorrect = value === correctSet.replace(/[?.]/g, '').toLowerCase();
            }

            newFeedback[id] = isCorrect ? 'correct' : 'incorrect';
            if (isCorrect) currentScore++;
        };

        // Check Exercise 1
        Object.keys(correctAnswers.ex1).forEach(keyIndex => checkInput(`ex1_${keyIndex}`, correctAnswers.ex1[keyIndex]));
        // Check Exercise 3
        Object.keys(correctAnswers.ex3).forEach(keyIndex => checkInput(`ex3_${keyIndex}`, correctAnswers.ex3[keyIndex]));
        // Check Exercise 4
        Object.keys(correctAnswers.ex4).forEach(keyIndex => checkInput(`ex4_${keyIndex}`, correctAnswers.ex4[keyIndex]));
        // Check Exercise 5 (Flexible check)
        Object.keys(correctAnswers.ex5).forEach(keyIndex => {
             const id = `ex5_${keyIndex}`;
             const value = inputs[id].trim().toLowerCase();
             const keywords = correctAnswers.ex5[keyIndex];
             // Check if the rephrased answer contains essential keywords/phrases
             const isCorrect = keywords.some(keyword => value.includes(keyword.toLowerCase()));
             newFeedback[id] = isCorrect ? 'correct' : 'incorrect';
             if (isCorrect) currentScore++;
        });
        // Check Exercise 6
        Object.keys(correctAnswers.ex6).forEach(keyIndex => checkInput(`ex6_${keyIndex}`, correctAnswers.ex6[keyIndex]));
         // Check Exercise 7
        Object.keys(correctAnswers.ex7).forEach(keyIndex => checkInput(`ex7_${keyIndex}`, correctAnswers.ex7[keyIndex]));
        // Check Exercise 8 (Flexible)
        const idEx8 = 'ex8_1';
        const valueEx8 = inputs[idEx8].trim().toLowerCase();
        const keywordsEx8 = correctAnswers.ex8[1]; // Get keywords array
        const isCorrectEx8 = keywordsEx8.some(keyword => valueEx8.includes(keyword.toLowerCase()));
        newFeedback[idEx8] = isCorrectEx8 ? 'correct' : 'incorrect';
        if (isCorrectEx8) currentScore++;
        // Check Exercise 9
        Object.keys(correctAnswers.ex9).forEach(keyIndex => checkInput(`ex9_${keyIndex}`, correctAnswers.ex9[keyIndex]));
        // Check Exercise 10
        Object.keys(correctAnswers.ex10).forEach(keyIndex => checkInput(`ex10_${keyIndex}`, correctAnswers.ex10[keyIndex]));
         // Check Exercise 11
        Object.keys(correctAnswers.ex11).forEach(keyIndex => checkInput(`ex11_${keyIndex}`, correctAnswers.ex11[keyIndex]));
        // Check Exercise 12 (Accept flexible answers)
         Object.keys(correctAnswers.ex12).forEach(keyIndex => {
             const id = `ex12_${keyIndex}`;
             const value = inputs[id].trim().toLowerCase();
             // Simple check if the input is not empty for this exercise
             const isCorrect = value.length > 2; // Basic check, adjust if needed
             newFeedback[id] = isCorrect ? 'correct' : 'incorrect';
             if (isCorrect) currentScore++;
        });


        // Check Exercise 2 (Order)
        let ex2Correct = true;
        for (let i = 0; i < sentencesEx2.length; i++) {
            if (sentencesEx2[i].order !== (i + 1)) {
                ex2Correct = false;
                break;
            }
        }
        setIsEx2Correct(ex2Correct); // Update state for visual feedback
        if (ex2Correct) currentScore++;


        setFeedback(newFeedback);
        setScore(currentScore);
    };


    // Styles from the original <body> tag
    const bodyStyles = {
        fontFamily: "'Segoe UI', sans-serif",
        background: '#f7f9fc',
        color: '#2c3e50',
        lineHeight: 1.6,
    };

    return (
        <div style={bodyStyles}>
            <PageStyles />

            <header>
                <h1>Aesthetican Unit 1: Interactive Drills</h1>
                <p>Practice your client communication skills with these grammar exercises.</p>
            </header>

            <div className="container">
                <div className="pathway">
                    {/* Exercise 1 */}
                    <div className="exercise-unit">
                        <h4>Exercise 1: Greetings and First Impressions (Gap-Fill)</h4>
                        <p><strong>Instructions:</strong> Fill in the blanks with the most appropriate words to complete the dialogue.</p>
                        <p>
                            You: Hello, my name is <input type="text" id="ex1_1" className={`blank-input ${feedback.ex1_1 || ''}`} value={inputs.ex1_1} onChange={handleInputChange} />. Welcome to our clinic. It is a pleasure to <input type="text" id="ex1_2" className={`blank-input ${feedback.ex1_2 || ''}`} value={inputs.ex1_2} onChange={handleInputChange} /> you. Please, have a <input type="text" id="ex1_3" className={`blank-input ${feedback.ex1_3 || ''}`} value={inputs.ex1_3} onChange={handleInputChange} />. How can I <input type="text" id="ex1_4" className={`blank-input ${feedback.ex1_4 || ''}`} value={inputs.ex1_4} onChange={handleInputChange} /> you today?<br />
                            Client: Thank you. I am here for a consultation about dental veneers.<br />
                            You: Of course. I will be your guide <input type="text" id="ex1_5" className={`blank-input ${feedback.ex1_5 || ''}`} value={inputs.ex1_5} onChange={handleInputChange} /> the entire process. Please, feel free to <input type="text" id="ex1_6" className={`blank-input ${feedback.ex1_6 || ''}`} value={inputs.ex1_6} onChange={handleInputChange} /> any questions you may have.
                        </p>
                    </div>

                    {/* Exercise 2 */}
                    <div className="exercise-unit">
                        <h4>Exercise 2: Explaining a Procedure (Sentence Reordering)</h4>
                        <p><strong>Instructions:</strong> Drag and drop the sentences into the correct order to create a clear explanation.</p>
                        <div id="ex2-container">
                             {sentencesEx2.map((sentence, index) => (
                                <div
                                    key={sentence.id}
                                    id={sentence.id} // Added ID for removing dragging class
                                    className={`sentence-item ${isEx2Correct === true ? 'correct' : isEx2Correct === false ? 'incorrect' : ''}`}
                                    draggable="true"
                                    onDragStart={() => handleDragStart(index)}
                                    onDragEnter={() => handleDragEnter(index)}
                                    onDragEnd={handleDragEnd}
                                    onDragOver={(e) => e.preventDefault()} // Necessary for drop to work
                                    onTouchStart={(e) => handleTouchStart(e, index)}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                    data-order={sentence.order} // Keep original order if needed for checking later
                                >
                                    {sentence.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Exercise 3 */}
                    <div className="exercise-unit">
                        <h4>Exercise 3: Asking Questions to Understand Client Goals (Question Formation)</h4>
                        <p><strong>Instructions:</strong> The words are scrambled. Type the complete and polite question below.</p>
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={`ex3-${i}`}>
                                <p>
                                    {i === 1 && "1. procedure / what / your / are / primary / goals / this / for?"}
                                    {i === 2 && "2. have / you / expectations / what / for / this / treatment?"}
                                    {i === 3 && "3. most / about / what / are / you / concerned / the?"}
                                    {i === 4 && "4. you / what / hope / to / achieve / to / with / your new smile?"}
                                    {i === 5 && "5. you / told / has / anyone / about / the recovery / time?"}
                                </p>
                                <input
                                    type="text"
                                    id={`ex3_${i}`}
                                    className={`blank-input ${feedback[`ex3_${i}`] || ''}`}
                                    style={{ width: '100%' }}
                                    value={inputs[`ex3_${i}`]}
                                    onChange={handleInputChange}
                                />
                                <br /><br />
                            </div>
                        ))}
                    </div>

                     {/* Exercise 4 */}
                     <div className="exercise-unit">
                        <h4>Exercise 4: Guiding the Client (Sequencing Words)</h4>
                        <p><strong>Instructions:</strong> Complete the sentences using the correct sequencing words (e.g., First, Next, After that, Finally). You can use each word only once.</p>
                        <p>
                            <input type="text" id="ex4_1" className={`blank-input ${feedback.ex4_1 || ''}`} value={inputs.ex4_1} onChange={handleInputChange} />, please fill out your personal information at the top of the form.
                            <input type="text" id="ex4_2" className={`blank-input ${feedback.ex4_2 || ''}`} value={inputs.ex4_2} onChange={handleInputChange} />, you can move to the section on your medical history.
                            <input type="text" id="ex4_3" className={`blank-input ${feedback.ex4_3 || ''}`} value={inputs.ex4_3} onChange={handleInputChange} />, please sign the form at the bottom.
                            <input type="text" id="ex4_4" className={`blank-input ${feedback.ex4_4 || ''}`} value={inputs.ex4_4} onChange={handleInputChange} />, I will take a look at the information to see if we need to discuss anything in more detail.
                        </p>
                    </div>

                    {/* Exercise 5 */}
                    <div className="exercise-unit">
                        <h4>Exercise 5: Responding to Concerns (Phrasing Substitution)</h4>
                        <p><strong>Instructions:</strong> Rephrase the following sentences to be more polite, reassuring, and professional. Use modal verbs like **'may,'** **'could,'** or **'will.'**</p>
                        {[1, 2, 3, 4].map(i => (
                             <p key={`ex5-p-${i}`}>
                                {i === 1 && "1. \"Don't worry, the pain will not be bad.\""}
                                {i === 2 && "2. \"You have to do exactly what I tell you after the procedure.\""}
                                {i === 3 && "3. \"Your face might get swollen after surgery.\""}
                                {i === 4 && "4. \"This treatment works for everyone.\""}
                                <br />
                                <textarea
                                    id={`ex5_${i}`}
                                    rows="2"
                                    className={`blank-input ${feedback[`ex5_${i}`] || ''}`}
                                    style={{ width: '100%', height: '60px' }}
                                    value={inputs[`ex5_${i}`]}
                                    onChange={handleInputChange}
                                ></textarea>
                            </p>
                        ))}
                    </div>

                     {/* Exercise 6 */}
                    <div className="exercise-unit">
                        <h4>Exercise 6: Defining a Technical Term (Gap-Fill)</h4>
                        <p><strong>Instructions:</strong> Fill in the blanks to complete the explanation of a technical term.</p>
                        <p>
                            A "follicular unit" is a small <input type="text" id="ex6_1" className={`blank-input ${feedback.ex6_1 || ''}`} value={inputs.ex6_1} onChange={handleInputChange} /> of hairs that naturally <input type="text" id="ex6_2" className={`blank-input ${feedback.ex6_2 || ''}`} value={inputs.ex6_2} onChange={handleInputChange} /> together. In a hair graft procedure, we carefully <input type="text" id="ex6_3" className={`blank-input ${feedback.ex6_3 || ''}`} value={inputs.ex6_3} onChange={handleInputChange} /> these units from the donor area, usually at the back of the head. We then gently <input type="text" id="ex6_4" className={`blank-input ${feedback.ex6_4 || ''}`} value={inputs.ex6_4} onChange={handleInputChange} /> them into the recipient area. The goal is to <input type="text" id="ex6_5" className={`blank-input ${feedback.ex6_5 || ''}`} value={inputs.ex6_5} onChange={handleInputChange} /> a natural and full result.
                        </p>
                    </div>

                    {/* Exercise 7 */}
                    <div className="exercise-unit">
                        <h4>Exercise 7: Confirming Client Understanding (Question Tags)</h4>
                        <p><strong>Instructions:</strong> Complete the questions by adding the correct question tag at the end.</p>
                        <ol>
                            <li>We've covered everything on the consent form, <input type="text" id="ex7_1" className={`blank-input ${feedback.ex7_1 || ''}`} style={{ width: '80px' }} value={inputs.ex7_1} onChange={handleInputChange} />?</li>
                            <li>You understand the aftercare instructions, <input type="text" id="ex7_2" className={`blank-input ${feedback.ex7_2 || ''}`} style={{ width: '80px' }} value={inputs.ex7_2} onChange={handleInputChange} />?</li>
                            <li>The cost of the procedure is clear to you, <input type="text" id="ex7_3" className={`blank-input ${feedback.ex7_3 || ''}`} style={{ width: '80px' }} value={inputs.ex7_3} onChange={handleInputChange} />?</li>
                            <li>You can take this information home with you, <input type="text" id="ex7_4" className={`blank-input ${feedback.ex7_4 || ''}`} style={{ width: '80px' }} value={inputs.ex7_4} onChange={handleInputChange} />?</li>
                        </ol>
                    </div>

                     {/* Exercise 8 */}
                    <div className="exercise-unit">
                        <h4>Exercise 8: Setting Realistic Expectations (Polite Substitution)</h4>
                        <p><strong>Instructions:</strong> Rephrase the following client statement to be more polite and professional.</p>
                        <p><strong>Client Statement:</strong> "I want my hair to look exactly like the picture of this model."</p>
                        <p><strong>Your Response:</strong></p>
                        <textarea
                            id="ex8_1"
                            rows="3"
                            className={`blank-input ${feedback.ex8_1 || ''}`}
                            style={{ width: '100%', height: '80px' }}
                            value={inputs.ex8_1}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    {/* Exercise 9 */}
                     <div className="exercise-unit">
                        <h4>Exercise 9: Scheduling the Next Appointment (Future Tense)</h4>
                        <p><strong>Instructions:</strong> Complete the dialogue by putting the verbs in parentheses into the correct future tense.</p>
                        <p>
                            You: I think we have a clear plan. When would you like to schedule your procedure?<br />
                            Client: I am flying back to Israel in two weeks.<br />
                            You: We <input type="text" id="ex9_1" className={`blank-input ${feedback.ex9_1 || ''}`} value={inputs.ex9_1} onChange={handleInputChange} /> (can/could) do the procedure before then. We <input type="text" id="ex9_2" className={`blank-input ${feedback.ex9_2 || ''}`} value={inputs.ex9_2} onChange={handleInputChange} /> (will/are going to) send you a few options by email. <input type="text" id="ex9_3" className={`blank-input ${feedback.ex9_3 || ''}`} /> (Will/Would) that <input type="text" id="ex9_4" className={`blank-input ${feedback.ex9_4 || ''}`} /> (work/be ok) for you?<br />
                            Client: Yes, that <input type="text" id="ex9_5" className={`blank-input ${feedback.ex9_5 || ''}`} /> (will/would) be perfect. Thank you.
                        </p>
                    </div>

                    {/* Exercise 10 */}
                    <div className="exercise-unit">
                        <h4>Exercise 10: Full Dialogue Role-Play (Mixed Gap-Fill)</h4>
                        <p><strong>Instructions:</strong> Fill in the gaps to create a complete and natural conversation.</p>
                        <p>
                            You: Hello, I'm Dr. Smith. Welcome! Please, <input type="text" id="ex10_1" className={`blank-input ${feedback.ex10_1 || ''}`} value={inputs.ex10_1} onChange={handleInputChange} /> a seat.<br />
                            Client: Thank you. I have some questions about veneers.<br />
                            You: Of course. What are you most <input type="text" id="ex10_2" className={`blank-input ${feedback.ex10_2 || ''}`} value={inputs.ex10_2} onChange={handleInputChange} /> about?<br />
                            Client: I'm worried about the pain.<br />
                            You: I understand. We <input type="text" id="ex10_3" className={`blank-input ${feedback.ex10_3 || ''}`} /> everything we can to make you comfortable. What are your main <input type="text" id="ex10_4" className={`blank-input ${feedback.ex10_4 || ''}`} /> for your new smile?<br />
                            Client: I just want to feel confident.<br />
                            You: We will help you with that. The consultation <input type="text" id="ex10_5" className={`blank-input ${feedback.ex10_5 || ''}`} /> be complete in about 20 minutes.
                        </p>
                    </div>

                     {/* Exercise 11 */}
                    <div className="exercise-unit">
                        <h4>Exercise 11: Professional Email Response (Gap-Fill)</h4>
                        <p><strong>Instructions:</strong> Complete the professional email template.</p>
                        <p>
                            <strong>Subject:</strong> <input type="text" id="ex11_1" className={`blank-input ${feedback.ex11_1 || ''}`} value={inputs.ex11_1} onChange={handleInputChange} /> about Your Consultation<br />
                            <strong>Body:</strong><br />
                            Dear Mr. Johnson,<br />
                            Thank you for your inquiry about the hair graft procedure. I would be happy to answer your <input type="text" id="ex11_2" className={`blank-input ${feedback.ex11_2 || ''}`} value={inputs.ex11_2} onChange={handleInputChange} />.<br />
                            The procedure typically <input type="text" id="ex11_3" className={`blank-input ${feedback.ex11_3 || ''}`} value={inputs.ex11_3} onChange={handleInputChange} /> about 6-8 hours, depending on the number of grafts. The recovery <input type="text" id="ex11_4" className={`blank-input ${feedback.ex11_4 || ''}`} value={inputs.ex11_4} onChange={handleInputChange} /> a few weeks, but you can return to normal activities in just a few days.<br />
                            If you have any <input type="text" id="ex11_5" className={`blank-input ${feedback.ex11_5 || ''}`} value={inputs.ex11_5} onChange={handleInputChange} /> questions, please feel free to ask.<br />
                            Best regards,<br />
                            Dr. Lee
                        </p>
                    </div>

                    {/* Exercise 12 */}
                     <div className="exercise-unit">
                        <h4>Exercise 12: Summarizing the Consultation (Gap-Fill)</h4>
                        <p><strong>Instructions:</strong> Fill in the blanks to create a brief summary of a client's consultation for your notes.</p>
                        <p>
                            <strong>Consultation Summary:</strong><br />
                            Client: Jane Doe<br />
                            Procedure: <input type="text" id="ex12_1" className={`blank-input ${feedback.ex12_1 || ''}`} value={inputs.ex12_1} onChange={handleInputChange} /><br />
                            Primary goals: <input type="text" id="ex12_2" className={`blank-input ${feedback.ex12_2 || ''}`} value={inputs.ex12_2} onChange={handleInputChange} /><br />
                            Specific concerns: <input type="text" id="ex12_3" className={`blank-input ${feedback.ex12_3 || ''}`} value={inputs.ex12_3} onChange={handleInputChange} /><br />
                            Date of next appointment: <input type="text" id="ex12_4" className={`blank-input ${feedback.ex12_4 || ''}`} value={inputs.ex12_4} onChange={handleInputChange} />
                        </p>
                    </div>


                    {score !== null && (
                        <div className="score-container">
                            Your score: {score}/{totalQuestions} correct!
                        </div>
                    )}
                    <button className="check-button" onClick={checkAnswers}>Check Your Answers</button>

                    <div className="nav-links">
                        <a href="https://www.aulice.ca">🏠 Home</a>
                        <a href="https://aulislab.netlify.app">🧩 Aulice Lab</a>
                        <a href="https://aulice-lexicon.netlify.app">📘 Lexicon</a>
                        <a href="https://teacher-aulice.netlify.app">👨‍🏫 Teacher Dashboard</a>
                    </div>
                </div>
            </div>

            <footer>
                <p>© 2025 Aulice Academy. Reality is programmable. Smart people are its architects.</p>
            </footer>
        </div>
    );
}

export default AestheticianUnit1Page;