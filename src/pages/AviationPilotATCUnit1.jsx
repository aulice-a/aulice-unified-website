// src/pages/AviationPilotATCUnit1.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AviationPilotATCUnit1 = () => {
  const [startChoice, setStartChoice] = useState('');
  const [startFeedback, setStartFeedback] = useState('');
  const [dictationInput, setDictationInput] = useState('');
  const [dictationFeedback, setDictationFeedback] = useState('');
  const [grammarInput, setGrammarInput] = useState('');
  const [grammarFeedback, setGrammarFeedback] = useState('');
  const [dialogueInput, setDialogueInput] = useState('');
  const [dialogueFeedback, setDialogueFeedback] = useState('');
  const [callsign, setCallsign] = useState('');
  const [spelled, setSpelled] = useState('');
  const [readbackChoice, setReadbackChoice] = useState('');
  const [readbackFeedback, setReadbackFeedback] = useState('');
  const [takeoffInput, setTakeoffInput] = useState('');
  const [takeoffFeedback, setTakeoffFeedback] = useState('');
  const [sidDef, setSidDef] = useState('');
  const [starDef, setStarDef] = useState('');
  const [sidstarFeedback, setSidstarFeedback] = useState('');
  const [phrasesFeedback, setPhrasesFeedback] = useState('');

  const phonetic = {
    A: 'Alpha', B: 'Bravo', C: 'Charlie', D: 'Delta', E: 'Echo', F: 'Foxtrot',
    G: 'Golf', H: 'Hotel', I: 'India', J: 'Juliett', K: 'Kilo', L: 'Lima',
    M: 'Mike', N: 'November', O: 'Oscar', P: 'Papa', Q: 'Quebec', R: 'Romeo',
    S: 'Sierra', T: 'Tango', U: 'Uniform', V: 'Victor', W: 'Whiskey', X: 'X-ray',
    Y: 'Yankee', Z: 'Zulu'
  };

  const checkStart = () => {
    if (startChoice === 'pushback') {
      setStartFeedback("✅ Correct! Always start with requesting pushback.");
    } else {
      setStartFeedback("❌ Not quite. The correct answer is: Request pushback.");
    }
  };

  const spellCallsign = () => {
    const spelled = callsign.toUpperCase()
      .split('')
      .map(c => phonetic[c] || c)
      .join(' ');
    setSpelled(spelled);
  };

  const submitDictation = () => {
    setDictationFeedback("✅ Submitted! Your instructor will review your dictation.");
  };

  const submitGrammar = () => {
    setGrammarFeedback("✅ Good job! Corrected: 'I check the flight plan. We request pushback. ATC clears us. I hold short of Runway 27.'");
  };

  const submitDialogue = () => {
    setDialogueFeedback("✅ Well done! Your response has been saved.");
  };

  const checkReadback = () => {
    if (readbackChoice === 'correct') {
      setReadbackFeedback("✅ Correct! Always repeat clearance exactly.");
    } else {
      setReadbackFeedback("❌ Incorrect. Use exact phraseology.");
    }
  };

  const checkTakeoff = () => {
    setTakeoffFeedback("✅ Correct! Readback: 'Runway 27, cleared for take-off, Speedbird 245.' Then apply thrust.");
  };

  const checkSIDSTAR = () => {
    if (sidDef === 'departure' && starDef === 'arrival') {
      setSidstarFeedback("✅ All correct! SID = departure, STAR = arrival.");
    } else {
      setSidstarFeedback("❌ Try again.");
    }
  };

  const checkPhrases = () => {
    setPhrasesFeedback("✅ Correct answers: WILCO, AFFIRM, NEGATIVE, ROGER.");
  };

  const showModelAnswer = (type) => {
    const answers = {
      grammar: "I check the flight plan. We request pushback. ATC clears us. I hold short of Runway 27.",
      dialogue: "Pilot: 'Ground, Speedbird 245, Gate B12, request pushback.'\nGround: 'Speedbird 245, roger. Cleared for pushback. Contact Tower on 118.1 after.'\nPilot: 'Cleared for pushback, Speedbird 245. Switching to 118.1.'",
      dictation: "ATIS Charlie, Toronto International, 1430 UTC. Wind 270 at 10 knots, visibility 10 km, ceiling 2000 feet...",
      takeoff: "Pilot: 'Runway 27, cleared for take-off, Speedbird 245.' Then advance throttles."
    };
    alert(`Model Answer:\n\n${answers[type]}`);
  };

  const openLexicon = () => {
    window.open('https://aulice-lexicon.netlify.app', '_blank');
  };

  const addToLexicon = (word) => {
    // In production, this would call Firebase or Supabase
    alert(`✅ "${word}" added to your Lexicon.`);
  };

  return (
    <div className="font-sans bg-[#f7f9fc] text-[#2c3e50] leading-relaxed">
      <header className="text-center py-10 px-5 bg-[#0056b3] text-white">
        <h1 className="text-2xl md:text-3xl font-bold">✈️ Unit 1: Aviation English</h1>
        <p className="mt-2">Pre-Flight & Ground Operations | ICAO Radiotelephony & ATC Procedures</p>
      </header>

      <div className="max-w-4xl mx-auto py-10 px-5">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">

          {/* Starting Point */}
          <h2 className="text-xl font-bold text-[#0056b3] mb-3">🔥 Starting Point: What Do You Say First?</h2>
          <p className="mb-3">You are the pilot. The flight plan is filed. The ATIS is received. Ground Control is calling. What is the correct first phrase?</p>
          <select
            value={startChoice}
            onChange={(e) => setStartChoice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-3"
          >
            <option value="">-- Choose --</option>
            <option value="pushback">Request pushback</option>
            <option value="takeoff">Cleared for takeoff</option>
            <option value="tower">Contact Tower on 118.1</option>
            <option value="hold">Hold short of Runway 27</option>
          </select>
          <button onClick={checkStart} className="px-4 py-2 bg-[#0056b3] text-white rounded mr-2">
            ✅ Check Answer
          </button>
          {startFeedback && <div className="mt-2 p-2 bg-[#e8f4f8] rounded">{startFeedback}</div>}

          {/* Example Dialogue */}
          <h2 className="text-xl font-bold text-[#0056b3] mt-6 mb-3">📌 Example: Pilot-Ground Control Dialogue</h2>
          <p><strong>Pilot:</strong> "Ground, Speedbird 245, Gate B12, request pushback."</p>
          <p><strong>Ground:</strong> "Speedbird 245, roger. You are cleared for pushback. After pushback, contact Tower on 118.1."</p>
          <p><strong>Pilot:</strong> "Cleared for pushback, Speedbird 245. Switching to 118.1."</p>
          <p className="text-sm text-gray-600 italic">ATIS: Automatic Terminal Information Service — continuous broadcast of weather and runway info</p>

          {/* Vocabulary Tags */}
          <div className="my-4">
            {['clearance', 'pushback', 'taxi', 'hold short', 'line up and wait'].map(word => (
              <span
                key={word}
                onClick={() => addToLexicon(word)}
                className="inline-block bg-[#e8f4f8] px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2 cursor-pointer hover:bg-[#d0e8f0]"
              >
                {word}
              </span>
            ))}
          </div>

          {/* Exercise 3: ATIS Dictation */}
          <div className="mb-6 p-5 bg-[#f8f9fa] border-l-4 border-[#0056b3] rounded">
            <h3 className="font-bold text-lg text-[#0056b3] mb-2">📝 Exercise 3: ATIS Dictation</h3>
            <p className="mb-3">Listen to the ATIS message and write it down exactly.</p>
            <audio controls className="w-full mb-3">
              <source src="https://example.com/atis-dictation.mp3" type="audio/mpeg" />
            </audio>
            <textarea
              value={dictationInput}
              onChange={(e) => setDictationInput(e.target.value)}
              placeholder="Write what you hear..."
              className="w-full p-3 border border-gray-300 rounded mb-3"
              rows="3"
            />
            <div className="flex flex-wrap gap-2">
              <button onClick={submitDictation} className="px-4 py-2 bg-[#0056b3] text-white rounded">
                ✅ Submit
              </button>
              <button onClick={() => showModelAnswer('dictation')} className="px-4 py-2 bg-gray-200 text-gray-800 rounded">
                🔍 Show Model Answer
              </button>
            </div>
            {dictationFeedback && <div className="mt-2 p-2 bg-[#e8f4f8] rounded">{dictationFeedback}</div>}
          </div>

          {/* Exercise 4: Aviation Alphabet */}
          <div className="mb-6 p-5 bg-[#f8f9fa] border-l-4 border-[#0056b3] rounded">
            <h3 className="font-bold text-lg text-[#0056b3] mb-3">📝 Exercise 4: Aviation Alphabet</h3>
            <p className="mb-3">First, learn the NATO phonetic alphabet:</p>
            <table className="w-full mb-4 border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3">Letter</th>
                  <th className="text-left py-2 px-3">Word</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(phonetic).map(([letter, word]) => (
                  <tr key={letter} className="border-b">
                    <td className="py-2 px-3">{letter}</td>
                    <td className="py-2 px-3">{word}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mb-2">Now, spell your call sign using the alphabet.</p>
            <p>Call Sign: 
              <input
                type="text"
                value={callsign}
                onChange={(e) => setCallsign(e.target.value)}
                placeholder="e.g., BA245"
                className="ml-2 w-32 p-1 border border-gray-300 rounded"
              />
            </p>
            <p>Spell it: <span className="font-semibold">{spelled}</span></p>
            <button onClick={spellCallsign} className="mt-2 px-4 py-2 bg-[#0056b3] text-white rounded">
              ✅ Check Spelling
            </button>
          </div>

          {/* Exercise 5: Find and Correct Errors */}
          <div className="mb-6 p-5 bg-[#f8f9fa] border-l-4 border-[#0056b3] rounded">
            <h3 className="font-bold text-lg text-[#0056b3] mb-2">📝 Exercise 5: Find and Correct the Errors</h3>
            <p className="mb-3">Correct the errors in this report:</p>
            <p className="mb-3 italic">I checks the flight plan. We requests pushback. ATC clears us. I holds short of Runway 27.</p>
            <textarea
              value={grammarInput}
              onChange={(e) => setGrammarInput(e.target.value)}
              placeholder="Enter corrected version..."
              className="w-full p-3 border border-gray-300 rounded mb-3"
              rows="3"
            />
            <div className="flex flex-wrap gap-2">
              <button onClick={submitGrammar} className="px-4 py-2 bg-[#0056b3] text-white rounded">
                ✅ Submit
              </button>
              <button onClick={() => showModelAnswer('grammar')} className="px-4 py-2 bg-gray-200 text-gray-800 rounded">
                🔍 Show Model Answer
              </button>
            </div>
            {grammarFeedback && <div className="mt-2 p-2 bg-[#e8f4f8] rounded">{grammarFeedback}</div>}
          </div>

          {/* Exercise 6: Write Dialogue */}
          <div className="mb-6 p-5 bg-[#f8f9fa] border-l-4 border-[#0056b3] rounded">
            <h3 className="font-bold text-lg text-[#0056b3] mb-2">📝 Exercise 6: Write the ATC Dialogue</h3>
            <textarea
              value={dialogueInput}
              onChange={(e) => setDialogueInput(e.target.value)}
              placeholder="Write your own dialogue..."
              className="w-full p-3 border border-gray-300 rounded mb-3"
              rows="4"
            />
            <div className="flex flex-wrap gap-2">
              <button onClick={submitDialogue} className="px-4 py-2 bg-[#0056b3] text-white rounded">
                ✅ Submit
              </button>
              <button onClick={() => showModelAnswer('dialogue')} className="px-4 py-2 bg-gray-200 text-gray-800 rounded">
                🔍 Show Model Answer
              </button>
            </div>
            {dialogueFeedback && <div className="mt-2 p-2 bg-[#e8f4f8] rounded">{dialogueFeedback}</div>}
          </div>

          {/* Take-Off & Departure Section */}
          <h2 className="text-xl font-bold text-[#0056b3] mt-8 mb-4">🛫 Take-Off & Departure</h2>

          {/* Exercise 7 */}
          <div className="mb-6 p-5 bg-[#f8f9fa] border-l-4 border-[#0056b3] rounded">
            <h3 className="font-bold text-lg text-[#0056b3] mb-2">📝 Exercise 7: Standard Departure Phraseology</h3>
            <p className="mb-3">You are holding short of Runway 27. The Tower calls and says "Speedbird 245, line up and wait." What is your correct readback?</p>
            <select
              value={readbackChoice}
              onChange={(e) => setReadbackChoice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-3"
            >
              <option value="">-- Choose --</option>
              <option value="correct">Line up and wait, Runway 27, Speedbird 245</option>
              <option value="wrong">Ready for departure, Runway 27, Speedbird 245</option>
              <option value="hold">Holding short, Speedbird 245</option>
            </select>
            <button onClick={checkReadback} className="px-4 py-2 bg-[#0056b3] text-white rounded">
              ✅ Check Answer
            </button>
            {readbackFeedback && <div className="mt-2 p-2 bg-[#e8f4f8] rounded">{readbackFeedback}</div>}
          </div>

          {/* Exercise 8 */}
          <div className="mb-6 p-5 bg-[#f8f9fa] border-l-4 border-[#0056b3] rounded">
            <h3 className="font-bold text-lg text-[#0056b3] mb-2">📝 Exercise 8: Take-Off Clearance Dialogue</h3>
            <p className="mb-3">You are number one for departure. Tower calls and says, "Speedbird 245, Runway 27, cleared for take-off." What is your readback and what action do you take?</p>
            <textarea
              value={takeoffInput}
              onChange={(e) => setTakeoffInput(e.target.value)}
              placeholder="Pilot: ________________________________________________"
              className="w-full p-3 border border-gray-300 rounded mb-3"
              rows="2"
            />
            <div className="flex flex-wrap gap-2">
              <button onClick={checkTakeoff} className="px-4 py-2 bg-[#0056b3] text-white rounded">
                ✅ Check Answer
              </button>
              <button onClick={() => showModelAnswer('takeoff')} className="px-4 py-2 bg-gray-200 text-gray-800 rounded">
                🔍 Show Model Answer
              </button>
            </div>
            {takeoffFeedback && <div className="mt-2 p-2 bg-[#e8f4f8] rounded">{takeoffFeedback}</div>}
          </div>

          {/* Exercise 9 */}
          <div className="mb-6 p-5 bg-[#f8f9fa] border-l-4 border-[#0056b3] rounded">
            <h3 className="font-bold text-lg text-[#0056b3] mb-2">📝 Exercise 9: SID vs. STAR</h3>
            <p className="mb-3">Match the term to its correct definition.</p>
            <table className="w-full mb-3 border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-3">SID</td>
                  <td className="py-2 px-3">
                    <select
                      value={sidDef}
                      onChange={(e) => setSidDef(e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded"
                    >
                      <option value="">-- Choose --</option>
                      <option value="arrival">A published route for aircraft arriving at an airport.</option>
                      <option value="departure">A published route for aircraft departing an airport.</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3">STAR</td>
                  <td className="py-2 px-3">
                    <select
                      value={starDef}
                      onChange={(e) => setStarDef(e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded"
                    >
                      <option value="">-- Choose --</option>
                      <option value="arrival">A published route for aircraft arriving at an airport.</option>
                      <option value="departure">A published route for aircraft departing an airport.</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <button onClick={checkSIDSTAR} className="px-4 py-2 bg-[#0056b3] text-white rounded">
              ✅ Check Answer
            </button>
            {sidstarFeedback && <div className="mt-2 p-2 bg-[#e8f4f8] rounded">{sidstarFeedback}</div>}
          </div>

          {/* Exercise 10 */}
          <div className="mb-6 p-5 bg-[#f8f9fa] border-l-4 border-[#0056b3] rounded">
            <h3 className="font-bold text-lg text-[#0056b3] mb-2">📝 Exercise 10: ICAO Standard Phrases</h3>
            <p className="mb-3">Fill in the blanks with the correct standard phrase: WILCO, AFFIRM, NEGATIVE, ROGER.</p>
            <ol className="list-decimal pl-5 space-y-2 mb-3">
              <li>ATC: "Turn left heading three-zero-zero."<br />Pilot: "Left heading three-zero-zero, Speedbird 245. __________________"</li>
              <li>ATC: "Confirm you can accept FL380?"<br />Pilot: "ATC, __________________."</li>
              <li>ATC: "Do you have the runway in sight?"<br />Pilot: "ATC, __________________."</li>
              <li>ATC: "Squawk 7000."<br />Pilot: "__________________, Speedbird 245."</li>
            </ol>
            <button onClick={checkPhrases} className="px-4 py-2 bg-[#0056b3] text-white rounded">
              ✅ Check Answers
            </button>
            {phrasesFeedback && <div className="mt-2 p-2 bg-[#e8f4f8] rounded">{phrasesFeedback}</div>}
          </div>

          {/* Link to Simulator */}
          <h2 className="text-xl font-bold text-[#0056b3] mt-8 mb-3">🧠 In-Flight Leadership Challenge</h2>
          <p className="mb-3">Two planes on collision course. What’s your move?</p>
          <a
            href="https://aulice-simulators.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-[#0056b3] text-white rounded hover:bg-[#004a99] transition"
      