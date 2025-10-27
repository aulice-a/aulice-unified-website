// src/pages/BankingPathways.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BankingPathways = () => {
  return (
    <div className="font-sans bg-[#f7f9fc] text-[#2c3e50] leading-relaxed">
      {/* Header */}
      <header className="text-center py-10 px-5 bg-[#1a365d] text-white">
        <nav className="mb-6 space-x-4">
          <a href="/" className="text-white font-bold no-underline hover:underline">Home</a>
          <a href="/about" className="text-white font-bold no-underline hover:underline">About us</a>
          <a href="/pricing" className="text-white font-bold no-underline hover:underline">Pricing Plans</a>
          <a href="/lexicon" className="text-white font-bold no-underline hover:underline">Lexicon</a>
          <a href="/teacher" className="text-white font-bold no-underline hover:underline">Teacher</a>
          <a href="/contact" className="text-white font-bold no-underline hover:underline">Contact</a>
        </nav>
        <h1 className="text-2xl md:text-3xl font-bold">💼 Banking Mastery Pathway</h1>
        <p className="mt-2">A 150-Session Program for Global Professionals</p>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-10 px-5">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
          <p className="mb-6">
            This pathway is designed to transform students into highly skilled banking professionals who can operate and communicate with confidence in any international environment. The curriculum progresses from core financial concepts to advanced risk management, technology, and leadership.
          </p>

          {/* Phase 1 */}
          <div className="mb-8 p-5 bg-[#f0f3ff] border-l-4 border-[#1a365d] rounded">
            <h3 className="text-xl font-bold text-[#1a365d] mb-3">Phase 1: Financial System & Fundamentals (Units 1–25)</h3>
            <p className="font-medium mb-2"><strong>English Focus:</strong> Present Simple for facts and routines, core vocabulary for finance, roles, and key concepts.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Units 1–5:</strong> Introduction to Banking<br /><em>Vocabulary: retail, investment, central banks; deposit, withdrawal.</em></li>
              <li><strong>Units 6–10:</strong> The Financial Ecosystem<br /><em>Explaining institutions; sequence words: first, then.</em></li>
              <li><strong>Units 11–15:</strong> Banking Products & Services<br /><em>Describing checking/savings accounts; using "can" and "could".</em></li>
              <li><strong>Units 16–20:</strong> Customer Onboarding & KYC<br /><em>Role-playing interviews; polite questions: "Can you please provide...?"</em></li>
              <li><strong>Units 21–25:</strong> Financial Terminology<br /><em>Learning terms: interest, principal, currency.</em></li>
            </ul>
          </div>

          {/* Phase 2 */}
          <div className="mb-8 p-5 bg-[#f0f3ff] border-l-4 border-[#1a365d] rounded">
            <h3 className="text-xl font-bold text-[#1a365d] mb-3">Phase 2: Retail & Corporate Banking (Units 26–50)</h3>
            <p className="font-medium mb-2"><strong>English Focus:</strong> Client communication, explaining products, formal dialogues.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Units 26–30:</strong> Loans & Credit<br /><em>Loan types: mortgage, personal; conditional: "If you have good credit..."</em></li>
              <li><strong>Units 31–35:</strong> Business Banking<br /><em>Payroll, business loans; formal communication.</em></li>
              <li><strong>Units 36–40:</strong> International Payments & Transfers<br /><em>Vocabulary: SWIFT, IBAN; fees and timelines.</em></li>
              <li><strong>Units 41–45:</strong> Managing Client Relationships<br /><em>Persuasive language; handling complaints professionally.</em></li>
              <li><strong>Units 46–50:</strong> The Role of the Teller & Front Office<br /><em>Role-playing interactions; phrasal verbs: "cash out", "set up".</em></li>
            </ul>
          </div>

          {/* Phase 3 */}
          <div className="mb-8 p-5 bg-[#f0f3ff] border-l-4 border-[#1a365d] rounded">
            <h3 className="text-xl font-bold text-[#1a365d] mb-3">Phase 3: Investments & Wealth Management (Units 51–75)</h3>
            <p className="font-medium mb-2"><strong>English Focus:</strong> Explaining complex concepts, comparatives, persuasion.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Units 51–55:</strong> Stocks & Bonds<br /><em>Difference between stocks and bonds; active/passive voice.</em></li>
              <li><strong>Units 56–60:</strong> Mutual Funds & ETFs<br /><em>Risk and return vocabulary.</em></li>
              <li><strong>Units 61–65:</strong> Portfolio Management<br /><em>Giving advice; modal verbs: should, could.</em></li>
              <li><strong>Units 66–70:</strong> Retirement Planning<br /><em>Long-term goals and products.</em></li>
              <li><strong>Units 71–75:</strong> Wealth Management<br /><em>High-net-worth clients; formal language.</em></li>
            </ul>
          </div>

          {/* Phase 4 */}
          <div className="mb-8 p-5 bg-[#f0f3ff] border-l-4 border-[#1a365d] rounded">
            <h3 className="text-xl font-bold text-[#1a365d] mb-3">Phase 4: Risk, Compliance & Ethics (Units 76–100)</h3>
            <p className="font-medium mb-2"><strong>English Focus:</strong> Reporting incidents, legal jargon, formal meetings.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Units 76–80:</strong> Anti-Money Laundering (AML)<br /><em>Detecting suspicious activity; passive voice procedures.</em></li>
              <li><strong>Units 81–85:</strong> Fraud Detection & Prevention<br /><em>Reporting suspected fraud clearly.</em></li>
              <li><strong>Units 86–90:</strong> Data Privacy & Security<br /><em>Cybersecurity threats; technical vocabulary.</em></li>
              <li><strong>Units 91–95:</strong> Regulatory Frameworks<br /><em>Basel Accords; formal reporting.</em></li>
              <li><strong>Units 96–100:</strong> Ethical Dilemmas in Finance<br /><em>Debating issues; argumentative language.</em></li>
            </ul>
          </div>

          {/* Phase 5 */}
          <div className="mb-8 p-5 bg-[#f0f3ff] border-l-4 border-[#1a365d] rounded">
            <h3 className="text-xl font-bold text-[#1a365d] mb-3">Phase 5: Financial Technology (Fintech) & Innovation (Units 101–125)</h3>
            <p className="font-medium mb-2"><strong>English Focus:</strong> Explaining tech, discussing trends, presenting ideas.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Units 101–105:</strong> Digital Banking & Mobile Payments<br /><em>App features; mobile transaction vocabulary.</em></li>
              <li><strong>Units 106–110:</strong> Blockchain & Cryptocurrency<br /><em>Explaining simply; conditionals.</em></li>
              <li><strong>Units 111–115:</strong> AI & Machine Learning in Finance<br /><em>AI in credit scoring and fraud detection.</em></li>
              <li><strong>Units 116–120:</strong> Financial Inclusion<br /><em>Tech expanding access to services.</em></li>
              <li><strong>Units 121–125:</strong> The Future of Banking<br /><em>Predicting trends; debating impact.</em></li>
            </ul>
          </div>

          {/* Phase 6 */}
          <div className="mb-8 p-5 bg-[#f0f3ff] border-l-4 border-[#1a365d] rounded">
            <h3 className="text-xl font-bold text-[#1a365d] mb-3">Phase 6: Leadership & Capstone Project (Units 126–150)</h3>
            <p className="font-medium mb-2"><strong>English Focus:</strong> Strategic planning, presentations, team leadership.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Units 126–130:</strong> Financial Analysis & Reporting<br /><em>Discussing statements; presenting data.</em></li>
              <li><strong>Units 131–135:</strong> Business Presentations<br /><em>Formal presentation to board or client.</em></li>
              <li><strong>Units 136–140:</strong> Crisis Management & PR<br /><em>Handling media; crafting public statements.</em></li>
              <li><strong>Units 141–145:</strong> Negotiation Skills<br /><em>Negotiating deal terms; persuasive language.</em></li>
              <li><strong>Units 146–150:</strong> Final Capstone Project<br /><em>Deliver a final presentation on a real-world banking case study.</em></li>
            </ul>
          </div>

          {/* Example Unit */}
          <div className="p-5 bg-[#f8f9fa] border border-dashed border-[#1a365d] rounded">
            <h4 className="text-lg font-bold text-[#1a365d] mb-3">📘 Example Unit: Unit 1 – Introduction to Banking</h4>
            <p className="mb-3"><strong>This unit introduces foundational banking concepts and essential vocabulary.</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Exercise 1: Vocabulary & Definitions</strong><br /><em>Match: Deposit, Withdrawal, Loan, Interest, ATM to definitions.</em></li>
              <li><strong>Exercise 2: Present Simple – Routine Processes</strong><br /><em>"A bank teller ________ (help) customers with transactions."</em></li>
              <li><strong>Exercise 3: Professional Roles</strong><br /><em>Describe: Bank Teller, Financial Analyst, Loan Officer.</em></li>
              <li><strong>Exercise 4: Short Answer Questions</strong><br /><em>What's the difference between retail and investment banks?</em></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-10 px-5 bg-[#1a365d] text-white mt-16">
        <nav className="mb-4 space-x-4">
          <a href="/" className="text-white font-bold no-underline hover:underline">Home</a>
          <a href="/about" className="text-white font-bold no-underline hover:underline">About us</a>
          <a href="/pricing" className="text-white font-bold no-underline hover:underline">Pricing Plans</a>
          <a href="/lexicon" className="text-white font-bold no-underline hover:underline">Lexicon</a>
          <a href="/teacher" className="text-white font-bold no-underline hover:underline">Teacher</a>
          <a href="/contact" className="text-white font-bold no-underline hover:underline">Contact</a>
        </nav>
        <p>© 2025 Aulice Academy. Reality is programmable. Smart people are its architects.</p>
      </footer>
    </div>
  );
};

export default BankingPathways;