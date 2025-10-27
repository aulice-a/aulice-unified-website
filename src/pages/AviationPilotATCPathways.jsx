// src/pages/AviationPilotATCPathways.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AviationPilotATCPathways = () => {
  return (
    <div className="font-sans bg-[#f7f9fc] text-[#2c3e50] leading-relaxed relative">
      {/* Top Right Navigation */}
      <nav className="absolute top-4 right-4 z-10 bg-[#0056b3cc] backdrop-blur-md rounded-2xl p-2 shadow-lg">
        <ul className="flex list-none m-0 p-0 gap-6">
          <li><a href="/" className="text-white no-underline font-semibold text-sm hover:text-[#b8d3ff] transition">Home</a></li>
          <li><a href="/about" className="text-white no-underline font-semibold text-sm hover:text-[#b8d3ff] transition">About us</a></li>
          <li><a href="/pricing" className="text-white no-underline font-semibold text-sm hover:text-[#b8d3ff] transition">Pricing Plans</a></li>
          <li><a href="/lexicon" className="text-white no-underline font-semibold text-sm hover:text-[#b8d3ff] transition">Lexicon</a></li>
          <li><a href="/teacher" className="text-white no-underline font-semibold text-sm hover:text-[#b8d3ff] transition">Teacher</a></li>
          <li><a href="/contact" className="text-white no-underline font-semibold text-sm hover:text-[#b8d3ff] transition">Contact</a></li>
        </ul>
      </nav>

      {/* Header */}
      <header className="text-center py-10 px-5 bg-[#0056b3] text-white">
        <h1 className="text-2xl md:text-3xl font-bold">✈️ Pilot & ATC Bundle | Aulice</h1>
        <p className="mt-2">Your Path to Aviation Radiotelephony Mastery</p>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-10 px-5">
        <div id="pathway" className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-[#0056b3] mb-6 text-center">🧭 Mastery Pathway: Pilot & ATC English</h2>

          {/* Phase 1 */}
          <div className="mb-6 p-5 bg-[#f0f5ff] border-l-4 border-[#0056b3] rounded">
            <h3 className="text-xl font-bold text-[#0056b3] mb-3">Phase 1: Foundations of Radiotelephony (Units 1–30)</h3>
            <table className="w-full border-collapse mb-3">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 bg-[#0056b3] text-white">Unit</th>
                  <th className="text-left py-2 px-3 bg-[#0056b3] text-white">Title</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="py-2 px-3">1</td><td className="py-2 px-3">Aviation English</td></tr>
                <tr className="border-b"><td className="py-2 px-3">2</td><td className="py-2 px-3">The Art of the Readback</td></tr>
                <tr className="border-b"><td className="py-2 px-3">3</td><td className="py-2 px-3">ICAO Radiotelephony Verbs</td></tr>
                <tr className="border-b"><td className="py-2 px-3">4</td><td className="py-2 px-3">Understanding Clearance</td></tr>
                <tr className="border-b"><td className="py-2 px-3">5</td><td className="py-2 px-3">"Go Ahead" and "Standby"</td></tr>
                <tr className="border-b"><td className="py-2 px-3">6</td><td className="py-2 px-3">Present Tense for Procedures</td></tr>
                <tr className="border-b"><td className="py-2 px-3">7</td><td className="py-2 px-3">Mastering Numbers & Altitudes</td></tr>
                <tr className="border-b"><td className="py-2 px-3">8</td><td className="py-2 px-3">Pronouncing Punctuation</td></tr>
                <tr className="border-b"><td className="py-2 px-3">9</td><td className="py-2 px-3">Articles in Transmission</td></tr>
                <tr><td className="py-2 px-3">10</td><td className="py-2 px-3">Call Sign Structure</td></tr>
              </tbody>
            </table>
          </div>

          {/* Phase 2 */}
          <div className="mb-6 p-5 bg-[#f0f5ff] border-l-4 border-[#0056b3] rounded">
            <h3 className="text-xl font-bold text-[#0056b3] mb-3">Phase 2: Departure & Climb (Units 31–60)</h3>
            <p className="font-medium"><strong>Focus:</strong> Takeoff, SID, climb, en route, emergencies.</p>
          </div>

          {/* Phase 3 */}
          <div className="mb-6 p-5 bg-[#f0f5ff] border-l-4 border-[#0056b3] rounded">
            <h3 className="text-xl font-bold text-[#0056b3] mb-3">Phase 3: En Route & Navigation (Units 61–90)</h3>
            <p className="font-medium"><strong>Focus:</strong> Position reporting, weather, deviations.</p>
          </div>

          {/* Phase 4 */}
          <div className="mb-6 p-5 bg-[#f0f5ff] border-l-4 border-[#0056b3] rounded">
            <h3 className="text-xl font-bold text-[#0056b3] mb-3">Phase 4: Approach & Landing (Units 91–120)</h3>
            <table className="w-full border-collapse mb-3">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 bg-[#0056b3] text-white">Unit</th>
                  <th className="text-left py-2 px-3 bg-[#0056b3] text-white">Title</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="py-2 px-3">95</td><td className="py-2 px-3">Decoding METAR/TAF Reports</td></tr>
                <tr className="border-b"><td className="py-2 px-3">96</td><td className="py-2 px-3">TAF Decoding & Communication</td></tr>
                <tr className="border-b"><td className="py-2 px-3">97</td><td className="py-2 px-3">Unstable Approaches & Go-Arounds</td></tr>
                <tr className="border-b"><td className="py-2 px-3">98</td><td className="py-2 px-3">Missed Approach Procedures</td></tr>
                <tr className="border-b"><td className="py-2 px-3">99</td><td className="py-2 px-3">Final Approach Checklists</td></tr>
                <tr><td className="py-2 px-3">100</td><td className="py-2 px-3">Runway Vacated & Taxi</td></tr>
              </tbody>
            </table>
          </div>

          {/* Phase 5 */}
          <div className="mb-6 p-5 bg-[#f0f5ff] border-l-4 border-[#0056b3] rounded">
            <h3 className="text-xl font-bold text-[#0056b3] mb-3">Phase 5: Non-Standard & Advanced (Units 121–150)</h3>
            <p className="font-medium"><strong>Focus:</strong> Engine failure, medical emergency, Mayday, holding, CRM.</p>
          </div>

          {/* Phase 6 */}
          <div className="mb-6 p-5 bg-[#f0f5ff] border-l-4 border-[#0056b3] rounded">
            <h3 className="text-xl font-bold text-[#0056b3] mb-3">Phase 6: Professional Development (Units 151–180)</h3>
            <p className="font-medium"><strong>Focus:</strong> Human factors, ICAO LPR prep, simulator scenarios, final exam.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-10 px-5 bg-[#0056b3] text-white mt-16">
        <p>© 2025 Aulice Academy. Reality is programmable. Smart people are its architects.</p>
      </footer>
    </div>
  );
};

export default AviationPilotATCPathways;s