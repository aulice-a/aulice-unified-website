import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Helper Component for <style> ---
const PageStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display.swap');
    :root {
      --primary-color: #008080; /* Teal */
      --secondary-color: #2c3e50; /* Dark Grey */
      --background-color: #f7f9fc; /* Light Grey/Blue */
      --container-bg-color: #ffffff; /* White */
    }
    .root-div { /* Applied to root div instead of body */
        font-family: 'Inter', sans-serif;
        background-color: var(--background-color);
        color: var(--secondary-color);
        padding: 1rem; /* Adjust padding as needed */
    }
    .container-card {
        background-color: var(--container-bg-color);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        max-width: 48rem; /* max-w-4xl */
        margin-left: auto;
        margin-right: auto;
        border-radius: 0.75rem; /* rounded-xl */
        padding: 1.5rem; /* p-6 */
    }
    @media (min-width: 768px) { /* md: */
        .container-card {
            padding: 3rem; /* md:p-12 */
        }
    }
    .header-bg {
        background-color: var(--primary-color);
        border-top-left-radius: 0.5rem; /* rounded-t-lg */
        border-top-right-radius: 0.5rem;
        margin-bottom: 2rem; /* mb-8 */
        padding-top: 2rem; /* py-8 */
        padding-bottom: 2rem;
    }
    .exercise-card {
        background-color: #f0f4f8; /* A slightly darker light-grey */
        border: 1px solid #d1d9e0;
        padding: 1.5rem; /* p-6 */
        border-radius: 0.5rem; /* rounded-lg */
        margin-bottom: 1.5rem; /* mb-6 */
    }
    .exercise-title {
        color: var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
        padding-bottom: 0.5rem; /* pb-2 */
        margin-bottom: 1rem; /* mb-4 */
        font-size: 1.25rem; /* text-xl */
        font-weight: 500; /* font-medium */
    }
    .exercise-instruction {
        color: #4b5563; /* Tailwind gray-600 */
        margin-bottom: 1rem; /* mb-4 */
    }
    .feedback-message {
        margin-top: 1rem; /* mt-4 */
        text-align: center;
        font-size: 0.875rem; /* text-sm */
        font-weight: 500; /* font-medium */
    }
    .correct-feedback {
        color: #10b981; /* Tailwind green-500 */
    }
    .incorrect-feedback {
        color: #ef4444; /* Tailwind red-500 */
    }
    /* Input/Select base styles */
    select, input[type="text"] {
        border-radius: 0.375rem; /* rounded-md */
        border: 1px solid #d1d5db; /* border-gray-300 */
        padding: 0.5rem 0.75rem; /* px-3 py-2 or similar */
        margin: 0 0.25rem; /* Add minimal margin */
    }
    button {
        margin-top: 1rem; /* mt-4 */
        padding-left: 1rem; /* px-4 */
        padding-right: 1rem;
        padding-top: 0.5rem; /* py-2 */
        padding-bottom: 0.5rem;
        background-color: #0d9488; /* bg-teal-600 */
        color: white;
        border-radius: 0.375rem; /* rounded-md */
        transition-property: background-color;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 200ms;
    }
    button:hover {
        background-color: #0f766e; /* hover:bg-teal-700 */
    }
    button:focus {
         outline: 2px solid transparent;
         outline-offset: 2px;
         box-shadow: 0 0 0 2px var(--primary-color), 0 0 0 4px white; /* focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 */
    }
    /* Specific input widths */
    .w-input-substitute { width: 100%; } /* Default to full width for small screens */
    @media (min-width: 640px) { /* sm: */
        .w-input-substitute { width: 50%; } /* sm:w-1/2 */
    }
    .w-input-error { width: 33.33%; } /* w-1/3 */

    /* Tailwind utility classes */
    .list-disc { list-style-type: disc; }
    .list-inside { list-style-position: inside; }
    .list-decimal { list-style-type: decimal; }
    .pl-4 { padding-left: 1rem; }
    .pl-8 { padding-left: 2rem; }
    .mt-2 { margin-top: 0.5rem; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mb-4 { margin-bottom: 1rem; }
    .mb-6 { margin-bottom: 1.5rem; }
    .mb-8 { margin-bottom: 2rem; }
    .mb-10 { margin-bottom: 2.5rem; }
    .text-center { text-align: center; }
    .text-lg { font-size: 1.125rem; }
    .text-xl { font-size: 1.25rem; }
    .text-2xl { font-size: 1.5rem; }
    .text-3xl { font-size: 1.875rem; }
    .text-4xl { font-size: 2.25rem; }
    .font-semibold { font-weight: 600; }
    .font-bold { font-weight: 700; }
    .font-medium { font-weight: 500; }
    .tracking-tight { letter-spacing: -0.025em; }
    .leading-relaxed { line-height: 1.625; }
    .italic { font-style: italic; }
    .space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 1rem; } /* Tailwind space-y-4 */
    .text-teal-700 { color: #0f766e; }
    .text-teal-800 { color: #115e59; }
    .border-b-2 { border-bottom-width: 2px; }
    .border-teal-700 { border-color: #0f766e; }
    .border-gray-300 { border-color: #d1d5db; }
    .text-gray-700 { color: #374151; }
    .text-gray-800 { color: #1f2937; }
    .shadow-inner { box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05); }
    .bg-white { background-color: #ffffff; }
  `}} />
);

// --- Correct Answers ---
const correctAnswers = {
    ex1: { q1: 'noun', q2: 'verb', q3: 'adjective', q4: 'adverb', q5: 'noun', q6: 'adjective', q7: 'verb', q8: 'adjective' }, // Corrected Q6 & Q8
    ex2: { q1: 'defendant', q2: 'plaintiff', q3: 'allege', q4: 'injunction', q5: 'statute', q6: 'subpoena', q7: 'liable', q8: 'settlement', q9: 'testimony', q10: 'witness' }, // Corrected Q10
    ex3: { q1: 'plead', q2: 'jurisdiction', q3: 'contract', q4: 'sue', q5: 'affidavit', q6: 'precedent', q7: 'venue', q8: 'liable', q9: 'formally', q10: 'litigation' },
    ex4: { // Example correct rewrites (flexible checking needed)
        q1: ['decision on the case'], q2: ['intend to file'], q3: ['formally requested'], q4: ['persuasive argument', 'persuasive speaking'],
        q5: ['stipulated', 'stipulating'], q6: ['national law', 'country-wide law'], q7: ['binding nature', 'resolution binds'], q8: ['responded promptly', 'prompt response']
    },
    ex5: {
        q1: { incorrect: 'respond', correct: 'responded' },
        q2: { incorrect: 'formally', correct: 'formal' }, // Corrected based on sentence context
        q3: { incorrect: 'reach', correct: 'reached' }
    }
};

// --- Main Component ---
function LegalUnit1Page() {
    // State for all inputs
    const [inputs, setInputs] = useState({
        // Ex1
        'ex1-q1': '', 'ex1-q2': '', 'ex1-q3': '', 'ex1-q4': '', 'ex1-q5': '', 'ex1-q6': '', 'ex1-q7': '', 'ex1-q8': '',
        // Ex2
        'ex2-q1': '', 'ex2-q2': '', 'ex2-q3': '', 'ex2-q4': '', 'ex2-q5': '', 'ex2-q6': '', 'ex2-q7': '', 'ex2-q8': '', 'ex2-q9': '', 'ex2-q10': '',
        // Ex3
        'ex3-q1': '', 'ex3-q2': '', 'ex3-q3': '', 'ex3-q4': '', 'ex3-q5': '', 'ex3-q6': '', 'ex3-q7': '', 'ex3-q8': '', 'ex3-q9': '', 'ex3-q10': '',
        // Ex4
        'ex4-q1': '', 'ex4-q2': '', 'ex4-q3': '', 'ex4-q4': '', 'ex4-q5': '', 'ex4-q6': '', 'ex4-q7': '', 'ex4-q8': '',
        // Ex5
        'ex5-q1-incorrect': '', 'ex5-q1-correct': '', 'ex5-q2-incorrect': '', 'ex5-q2-correct': '', 'ex5-q3-incorrect': '', 'ex5-q3-correct': '',
    });

    // State for feedback messages { text: string, type: 'correct' | 'incorrect' | null }
    const [feedback, setFeedback] = useState({
        ex1: null, ex2: null, ex3: null, ex4: null, ex5: null,
    });

    // --- Event Handlers ---
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setInputs(prev => ({ ...prev, [id]: value }));
        // Optionally clear feedback on change
        // const exerciseId = id.split('-')[0];
        // setFeedback(prev => ({ ...prev, [exerciseId]: null }));
    };

    // Generic function to display feedback
    const showFeedback = (exerciseId, message, isCorrect) => {
        setFeedback(prev => ({
            ...prev,
            [exerciseId]: { text: message, type: isCorrect ? 'correct' : 'incorrect' }
        }));
    };

    // Exercise 1 Check
    const handleCheckExercise1 = () => {
        let correctCount = 0;
        const total = Object.keys(correctAnswers.ex1).length;
        for (const [key, correctValue] of Object.entries(correctAnswers.ex1)) {
            if (inputs[`ex1-${key}`] === correctValue) {
                correctCount++;
            }
        }
        const message = `You got ${correctCount} out of ${total} correct.`;
        showFeedback('ex1', message, correctCount === total);
    };

    // Exercise 2 Check
    const handleCheckExercise2 = () => {
        let correctCount = 0;
        const total = Object.keys(correctAnswers.ex2).length;
        for (const [key, correctValue] of Object.entries(correctAnswers.ex2)) {
             if (inputs[`ex2-${key}`]?.trim().toLowerCase() === correctValue.toLowerCase()) {
                correctCount++;
            }
        }
        const message = `You got ${correctCount} out of ${total} correct.`;
        showFeedback('ex2', message, correctCount === total);
    };

     // Exercise 3 Check
     const handleCheckExercise3 = () => {
        let correctCount = 0;
        const total = Object.keys(correctAnswers.ex3).length;
        for (const [key, correctValue] of Object.entries(correctAnswers.ex3)) {
            if (inputs[`ex3-${key}`] === correctValue) {
                correctCount++;
            }
        }
        const message = `You got ${correctCount} out of ${total} correct.`;
        showFeedback('ex3', message, correctCount === total);
    };

    // Exercise 4 Check (Flexible)
    const handleCheckExercise4 = () => {
        let correctCount = 0;
        const total = Object.keys(correctAnswers.ex4).length;
        for (const [key, correctValues] of Object.entries(correctAnswers.ex4)) {
            const userValue = inputs[`ex4-${key}`]?.trim().toLowerCase() || '';
            const isCorrect = correctValues.some(val => userValue.includes(val.toLowerCase()));
            if (isCorrect) {
                correctCount++;
            }
        }
        const message = `You got ${correctCount} out of ${total} correct. (Note: checks for key phrases, variations possible)`;
        showFeedback('ex4', message, correctCount >= total * 0.75); // Mark correct if mostly right due to flexibility
    };

     // Exercise 5 Check
     const handleCheckExercise5 = () => {
        let allCorrect = true;
        for (let i = 1; i <= 3; i++) {
            const incorrectInputVal = inputs[`ex5-q${i}-incorrect`]?.trim().toLowerCase();
            const correctInputVal = inputs[`ex5-q${i}-correct`]?.trim().toLowerCase();
            const expectedIncorrect = correctAnswers.ex5[`q${i}`].incorrect.toLowerCase();
            const expectedCorrect = correctAnswers.ex5[`q${i}`].correct.toLowerCase();

            if (incorrectInputVal !== expectedIncorrect || correctInputVal !== expectedCorrect) {
                allCorrect = false;
                break;
            }
        }
        const message = allCorrect ?
            'Correct! All three errors were identified and corrected.' :
            'Incorrect. Please review the paragraph and try again.';
        showFeedback('ex5', message, allCorrect);
    };


    return (
        <div className="root-div">
            <PageStyles />

            <div className="container-card mx-auto max-w-4xl rounded-xl p-6 md:p-12">

                {/* Header */}
                <header className="header-bg text-white text-center py-8 rounded-t-lg mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Unit 1: Parts of Speech</h1>
                    <p className="mt-2 text-lg font-medium">Identifying Key Legal Terminology</p>
                </header>

                {/* Introduction */}
                <section id="introduction" className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4 text-teal-700 border-b-2 border-teal-700 pb-2">Introduction</h2>
                    <p className="text-gray-700 leading-relaxed">
                        In legal English, precision is paramount. Every word serves a specific function. Mastering the parts of speech is the foundation for drafting clear, unambiguous, and legally sound documents. This unit will reacquaint you with the core parts of speech, focusing on their specific application within legal terminology.
                    </p>
                </section>

                {/* Lesson */}
                <section id="lesson" className="mb-10">
                     <h2 className="text-2xl font-semibold mb-4 text-teal-700 border-b-2 border-teal-700 pb-2">The Lesson: Legal Parts of Speech</h2>
                    {/* Nouns */}
                    <div className="mb-6">
                        <h3 className="text-xl font-medium text-gray-800 mb-2">1. Nouns (Person, Place, Thing, or Idea)</h3>
                        <p className="text-gray-700 pl-4">In law, nouns are crucial for identifying the parties, objects, and concepts involved in a case. They are the "who," "what," and "where."</p>
                        <ul className="list-disc list-inside text-gray-700 pl-8 mt-2">
                            <li><strong className="font-semibold text-teal-800">Person:</strong> <span className="italic">Plaintiff, Defendant, Attorney, Witness</span></li>
                            <li><strong className="font-semibold text-teal-800">Place:</strong> <span className="italic">Jurisdiction, Courtroom, Venue</span></li>
                            <li><strong className="font-semibold text-teal-800">Thing/Idea:</strong> <span className="italic">Contract, Statute, Motion, Precedent, Liability</span></li>
                        </ul>
                    </div>
                    {/* Verbs */}
                    <div className="mb-6">
                        <h3 className="text-xl font-medium text-gray-800 mb-2">2. Verbs (Action or State of Being)</h3>
                        <p className="text-gray-700 pl-4">Verbs describe the actions that take place in legal matters. They are the "doing" words that drive the narrative of a legal document or argument.</p>
                        <ul className="list-disc list-inside text-gray-700 pl-8 mt-2">
                            <li><strong className="font-semibold text-teal-800">Action:</strong> <span className="italic">sue, file, allege, defend, stipulate</span></li>
                            <li><strong className="font-semibold text-teal-800">State:</strong> <span className="italic">is, are, was, were</span> (e.g., "The defendant was found liable.")</li>
                        </ul>
                    </div>
                    {/* Adjectives */}
                    <div className="mb-6">
                        <h3 className="text-xl font-medium text-gray-800 mb-2">3. Adjectives (Describes a Noun)</h3>
                        <p className="text-gray-700 pl-4">Adjectives provide detail and specificity, qualifying nouns to ensure there is no ambiguity. They define the nature of the parties, terms, or evidence.</p>
                        <ul className="list-disc list-inside text-gray-700 pl-8 mt-2">
                            <li><strong className="font-semibold text-teal-800">Examples:</strong> <span className="italic">amicable</span> (settlement), <span className="italic">valid</span> (contract), <span className="italic">binding</span> (agreement)</li>
                        </ul>
                    </div>
                    {/* Adverbs */}
                    <div className="mb-6">
                        <h3 className="text-xl font-medium text-gray-800 mb-2">4. Adverbs (Describes a Verb, Adjective, or another Adverb)</h3>
                        <p className="text-gray-700 pl-4">Adverbs modify verbs to clarify <span className="italic">how, when, where,</span> or <span className="italic">to what extent</span> an action occurred. They are critical for establishing conditions and timelines.</p>
                        <ul className="list-disc list-inside text-gray-700 pl-8 mt-2">
                            <li><strong className="font-semibold text-teal-800">Examples:</strong> <span className="italic">formally</span> (request), <span className="italic">legally</span> (binding), <span className="italic">promptly</span> (respond)</li>
                        </ul>
                    </div>
                </section>

                <hr className="my-8 border-gray-300" />

                {/* Interactive Exercises Section */}
                <section id="new-exercises" className="mb-10">
                    <h2 className="text-2xl font-semibold mb-6 text-teal-700 border-b-2 border-teal-700 pb-2">Additional Exercises</h2>

                    {/* Exercise 1 */}
                    <div className="exercise-card">
                        <h3 className="exercise-title">Exercise 1: Gap-Fill (Part of Speech)</h3>
                        <p className="exercise-instruction">Complete each sentence by choosing the correct part of speech for the blank space.</p>
                        <ol className="list-decimal list-inside text-gray-700 space-y-4">
                            <li>The prosecution presented a strong case with compelling <select id="ex1-q1" value={inputs['ex1-q1']} onChange={handleInputChange}>
                                <option value="">--Select--</option><option value="verb">VERB</option><option value="noun">NOUN</option>
                            </select>.</li>
                            <li>The court will <select id="ex1-q2" value={inputs['ex1-q2']} onChange={handleInputChange}>
                                <option value="">--Select--</option><option value="verb">VERB</option><option value="adjective">ADJECTIVE</option>
                            </select> on the matter next week.</li>
                             <li>A <select id="ex1-q3" value={inputs['ex1-q3']} onChange={handleInputChange}>
                                <option value="">--Select--</option><option value="adverb">ADVERB</option><option value="adjective">ADJECTIVE</option>
                            </select> decision was reached after lengthy negotiations.</li>
                            <li>The attorney requested that the client respond <select id="ex1-q4" value={inputs['ex1-q4']} onChange={handleInputChange}>
                                <option value="">--Select--</option><option value="adjective">ADJECTIVE</option><option value="adverb">ADVERB</option>
                            </select>.</li>
                             <li>The <select id="ex1-q5" value={inputs['ex1-q5']} onChange={handleInputChange}>
                                <option value="">--Select--</option><option value="noun">NOUN</option><option value="adverb">ADVERB</option>
                            </select> must provide all necessary documentation.</li>
                            <li>The terms of the contract are considered <select id="ex1-q6" value={inputs['ex1-q6']} onChange={handleInputChange}>
                                <option value="">--Select--</option><option value="adverb">ADVERB</option><option value="adjective">ADJECTIVE</option> {/* Corrected answer */}
                            </select> binding.</li>
                             <li>The judge will <select id="ex1-q7" value={inputs['ex1-q7']} onChange={handleInputChange}>
                                <option value="">--Select--</option><option value="verb">VERB</option><option value="noun">NOUN</option>
                            </select> the trial to hear from the final witness.</li>
                            <li>The new law is <select id="ex1-q8" value={inputs['ex1-q8']} onChange={handleInputChange}>
                                <option value="">--Select--</option><option value="adverb">ADVERB</option><option value="adjective">ADJECTIVE</option>{/* Corrected answer */}
                            </select> applicable to all residents.</li> {/* Corrected question text */}
                        </ol>
                        <button onClick={handleCheckExercise1}>Check Answers</button>
                        {feedback.ex1 && <div className={`feedback-message ${feedback.ex1.type}-feedback`}>{feedback.ex1.text}</div>}
                    </div>

                    {/* Exercise 2 */}
                    <div className="exercise-card">
                        <h3 className="exercise-title">Exercise 2: Substitution</h3>
                        <p className="exercise-instruction">Replace the bolded informal word with a more precise legal term. Type your answer in the box provided.</p>
                        <p className="mb-4 italic">List: defendant, plaintiff, subpoena, statute, injunction, allege, liable, damages, settlement, motion, testimony, witness</p>
                        <ol className="list-decimal list-inside text-gray-700 space-y-4">
                             <li>The person being sued, known as the <strong>accused</strong>, denied all claims. <input type="text" id="ex2-q1" value={inputs['ex2-q1']} onChange={handleInputChange} className="w-input-substitute" /></li>
                             <li>The injured party, or the <strong>claimant</strong>, seeks compensation. <input type="text" id="ex2-q2" value={inputs['ex2-q2']} onChange={handleInputChange} className="w-input-substitute" /></li>
                             <li>The attorney will <strong>claim</strong> that her client was not at the scene of the crime. <input type="text" id="ex2-q3" value={inputs['ex2-q3']} onChange={handleInputChange} className="w-input-substitute" /></li>
                             <li>A court order was issued to stop the company's activities, which is a type of <strong>ban</strong>. <input type="text" id="ex2-q4" value={inputs['ex2-q4']} onChange={handleInputChange} className="w-input-substitute" /></li>
                             <li>The new <strong>rule</strong> was passed to regulate consumer protection. <input type="text" id="ex2-q5" value={inputs['ex2-q5']} onChange={handleInputChange} className="w-input-substitute" /></li>
                             <li>A court order requiring someone to appear is called a <strong>demand</strong>. <input type="text" id="ex2-q6" value={inputs['ex2-q6']} onChange={handleInputChange} className="w-input-substitute" /></li>
                             <li>The company was found to be <strong>responsible</strong> for the environmental contamination. <input type="text" id="ex2-q7" value={inputs['ex2-q7']} onChange={handleInputChange} className="w-input-substitute" /></li>
                             <li>The agreement was reached through a confidential <strong>deal</strong>. <input type="text" id="ex2-q8" value={inputs['ex2-q8']} onChange={handleInputChange} className="w-input-substitute" /></li>
                             <li>The oral evidence given in court is the <strong>story</strong> of the event. <input type="text" id="ex2-q9" value={inputs['ex2-q9']} onChange={handleInputChange} className="w-input-substitute" /></li>
                             <li>The expert's <strong>statement</strong> proved to be very important. <input type="text" id="ex2-q10" value={inputs['ex2-q10']} onChange={handleInputChange} className="w-input-substitute" /></li> {/* Corrected question text */}
                        </ol>
                        <button onClick={handleCheckExercise2}>Check Answers</button>
                        {feedback.ex2 && <div className={`feedback-message ${feedback.ex2.type}-feedback`}>{feedback.ex2.text}</div>}
                    </div>

                     {/* Exercise 3 */}
                     <div className="exercise-card">
                        <h3 className="exercise-title">Exercise 3: Gap-Fill (Legal Terms)</h3>
                        <p className="exercise-instruction">Complete each sentence with the most appropriate legal term from the provided list.</p>
                        <p className="mb-4 italic">List: affidavit, litigation, contract, liable, venue, plead, precedent, sue, jurisdiction, formally</p>
                         <ol className="list-decimal list-inside text-gray-700 space-y-4">
                            <li>The attorney advised his client to <select id="ex3-q1" value={inputs['ex3-q1']} onChange={handleInputChange}>
                                <option value="">--Select--</option><option value="plead">plead</option><option value="jurisdiction">jurisdiction</option><option value="contract">contract</option><option value="liable">liable</option><option value="venue">venue</option>
                            </select> not guilty.</li>
                            <li>The court has a wide <select id="ex3-q2" value={inputs['ex3-q2']} onChange={handleInputChange}>
                                <option value="">--Select--</option><option value="jurisdiction">jurisdiction</option><option value="sue">sue</option><option value="affidavit">affidavit</option><option value="precedent">precedent</option><option value="formally">formally</option>
                            </select> over criminal cases.</li>
                            <li>The two parties entered into a legally binding <select id="ex3-q3" value={inputs['ex3-q3']} onChange={handleInputChange}>
                                <option value="">--Select--</option><option value="affidavit">affidavit</option><option value="contract">contract</option><option value="litigation">litigation</option><option value="liable">liable</option><option value="plead">plead</option>
                            </select>.</li>
                            <li>The plaintiff plans to <select id="ex3-q4" value={inputs['ex3-q4']} onChange={handleInputChange}>
                                <option value="">--Select--</option><option value="sue">sue</option><option value="liable">liable</option><option value="venue">venue</option><option value="formally">formally</option><option value="plead">plead</option>
                            </select> the company for negligence.</li>
                             <li>She submitted a sworn <select id="ex3-q5" value={inputs['ex3-q5']} onChange={handleInputChange}>
                                <option value="">--Select--</option><option value="affidavit">affidavit</option><option value="litigation">litigation</option><option value="contract">contract</option><option value="precedent">precedent</option><option value="venue">venue</option>
                            </select> as part of her evidence.</li>
                            <li>This case could establish a new <select id="ex3-q6" value={inputs['ex3-q6']} onChange={handleInputChange}>
                                <option value="">--Select--</option><option value="plead">plead</option><option value="precedent">precedent</option><option value="venue">venue</option><option value="liable">liable</option><option value="jurisdiction">jurisdiction</option>
                            </select> for future rulings.</li>
                            <li>The <select id="ex3-q7" value={inputs['ex3-q7']} onChange={handleInputChange}>
                                <option value="">--Select--</option><option value="venue">venue</option><option value="jurisdiction">jurisdiction</option><option value="litigation">litigation</option><option value="contract">contract</option><option value="sue">sue</option>
                            </select> for the trial was moved to a different city.</li>
                            <li>The company was found <select id="ex3-q8" value={inputs['ex3-q8']} onChange={handleInputChange}>
                                <option value="">--Select--</option><option value="plead">plead</option><option value="liable">liable</option><option value="litigation">litigation</option><option value="formally">formally</option><option value="affidavit">affidavit</option>
                            </select> for the breach of agreement.</li>
                             <li>The company's directors were <select id="ex3-q9" value={inputs['ex3-q9']} onChange={handleInputChange}>
                                <option value="">--Select--</option><option value="formally">formally</option><option value="jurisdiction">jurisdiction</option><option value="contract">contract</option><option value="sue">sue</option><option value="plead">plead</option>
                            </select> notified of the legal action.</li>
                            <li>The matter is currently in <select id="ex3-q10" value={inputs['ex3-q10']} onChange={handleInputChange}>
                                <option value="">--Select--</option><option value="litigation">litigation</option><option value="precedent">precedent</option><option value="liable">liable</option><option value="affidavit">affidavit</option><option value="venue">venue</option>
                            </select>, awaiting a trial date.</li>
                        </ol>
                        <button onClick={handleCheckExercise3}>Check Answers</button>
                        {feedback.ex3 && <div className={`feedback-message ${feedback.ex3.type}-feedback`}>{feedback.ex3.text}</div>}
                    </div>

                    {/* Exercise 4 */}
                     <div className="exercise-card">
                        <h3 className="exercise-title">Exercise 4: Sentence Re-writing</h3>
                        <p className="exercise-instruction">Rewrite the following sentences by changing the bolded word into the specified part of speech, keeping the original meaning. Type your answer in the box.</p>
                         <ol className="list-decimal list-inside text-gray-700 space-y-4">
                            <li><b>Verb to Noun:</b> The judge will <b>decide</b> the case next month.<br /><input type="text" id="ex4-q1" value={inputs['ex4-q1']} onChange={handleInputChange} className="mt-2" /></li>
                            <li><b>Noun to Verb:</b> The firm announced its <b>intention</b> to file a lawsuit.<br /><input type="text" id="ex4-q2" value={inputs['ex4-q2']} onChange={handleInputChange} className="mt-2" /></li>
                            <li><b>Adjective to Adverb:</b> The court issued a <b>formal</b> request for documents.<br /><input type="text" id="ex4-q3" value={inputs['ex4-q3']} onChange={handleInputChange} className="mt-2" /></li>
                            <li><b>Adverb to Adjective:</b> The prosecutor spoke very <b>persuasively</b> about the evidence.<br /><input type="text" id="ex4-q4" value={inputs['ex4-q4']} onChange={handleInputChange} className="mt-2" /></li>
                            <li><b>Verb to Adjective:</b> The contract <b>stipulates</b> that payment must be made on time.<br /><input type="text" id="ex4-q5" value={inputs['ex4-q5']} onChange={handleInputChange} className="mt-2" /></li>
                            <li><b>Noun to Adjective:</b> The new law applies to all citizens in the <b>country</b>.<br /><input type="text" id="ex4-q6" value={inputs['ex4-q6']} onChange={handleInputChange} className="mt-2" /></li>
                            <li><b>Adjective to Noun:</b> The plaintiff sought a <b>binding</b> resolution to the dispute.<br /><input type="text" id="ex4-q7" value={inputs['ex4-q7']} onChange={handleInputChange} className="mt-2" /></li>
                            <li><b>Adverb to Verb:</b> The defendant <b>promptly</b> responded to the charges.<br /><input type="text" id="ex4-q8" value={inputs['ex4-q8']} onChange={handleInputChange} className="mt-2" /></li>
                        </ol>
                        <button onClick={handleCheckExercise4}>Check Answers</button>
                        {feedback.ex4 && <div className={`feedback-message ${feedback.ex4.type}-feedback`}>{feedback.ex4.text}</div>}
                    </div>

                    {/* Exercise 5 */}
                    <div className="exercise-card">
                        <h3 className="exercise-title">Exercise 5: Error Identification</h3>
                        <p className="exercise-instruction">Read the short paragraph below. Identify and correct the <b>three</b> words that are used as the wrong part of speech.</p>
                        <div className="bg-white p-6 rounded-lg shadow-inner text-gray-800">
                             {/* Using dangerouslySetInnerHTML to render bold tags */}
                             <p dangerouslySetInnerHTML={{ __html: `The **defendant** was given a **legal** notice. He **respond** to the court **formally**. The **attorney** **argued** his case **persuasively**. A binding **settlement** was eventually **reach**. The case was then **dismiss** without **prejudice**.` }} />
                        </div>
                         <p className="mt-4">
                            <span className="font-semibold text-gray-800">Your Corrections:</span>
                            <ul className="list-disc list-inside mt-2 text-gray-700 space-y-2">
                                <li>1. Incorrect word: <input type="text" id="ex5-q1-incorrect" value={inputs['ex5-q1-incorrect']} onChange={handleInputChange} className="w-input-error" /> Correct word: <input type="text" id="ex5-q1-correct" value={inputs['ex5-q1-correct']} onChange={handleInputChange} className="w-input-error" /></li>
                                <li>2. Incorrect word: <input type="text" id="ex5-q2-incorrect" value={inputs['ex5-q2-incorrect']} onChange={handleInputChange} className="w-input-error" /> Correct word: <input type="text" id="ex5-q2-correct" value={inputs['ex5-q2-correct']} onChange={handleInputChange} className="w-input-error" /></li>
                                <li>3. Incorrect word: <input type="text" id="ex5-q3-incorrect" value={inputs['ex5-q3-incorrect']} onChange={handleInputChange} className="w-input-error" /> Correct word: <input type="text" id="ex5-q3-correct" value={inputs['ex5-q3-correct']} onChange={handleInputChange} className="w-input-error" /></li>
                            </ul>
                        </p>
                        <button onClick={handleCheckExercise5}>Check Answers</button>
                        {feedback.ex5 && <div className={`feedback-message ${feedback.ex5.type}-feedback`}>{feedback.ex5.text}</div>}
                    </div>

                </section>

            </div>
        </div>
    );
}

export default LegalUnit1Page;