// src/pages/BankingUnit1.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BankingUnit1 = () => {
  const [answers, setAnswers] = useState({});

  const handleInputChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (id) => {
    // In a real app, you'd send this to Firebase or show feedback
    alert('Answer submitted! (In production, this would be saved or graded.)');
  };

  return (
    <div className="font-sans bg-[#f7f9fc] text-[#2c3e50] leading-relaxed">
      {/* Header */}
      <header className="text-center py-10 px-5 bg-[#1a365d] text-white">
        <h1 className="text-2xl md:text-3xl font-bold">💼 Unit 1: Introduction to Banking & the Financial System</h1>
        <p className="mt-2">Foundations of Global Finance</p>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-10 px-5">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-[#1a365d] mb-4">🎯 After completing this unit, you will be able to:</h2>
          <ul className="list-disc pl-5 space-y-1 mb-8">
            <li>Define and use core banking terms like deposit, loan, and interest.</li>
            <li>Identify and describe different types of banks.</li>
            <li>Understand the roles and responsibilities of key banking professionals.</li>
            <li>Use the Present Simple tense to describe routine processes and facts.</li>
          </ul>

          {/* Lesson 1: Vocabulary */}
          <div className="mb-8 p-5 bg-[#f8f9fa] border-l-4 border-[#1a365d] rounded">
            <h3 className="text-lg font-bold text-[#1a365d] mb-3">Lesson 1: Vocabulary & Core Concepts</h3>
            <h4 className="font-semibold mb-2">Exercise 1: Vocabulary & Definitions</h4>
            <p className="mb-3">Match the term to its correct definition.</p>
            <table className="w-full mb-4">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Term</th>
                  <th className="text-left py-2">Definition</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Deposit</td>
                  <td className="py-2">The act of placing money into a bank account.</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Withdrawal</td>
                  <td className="py-2">The act of taking money out of a bank account.</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Loan</td>
                  <td className="py-2">Money borrowed from a bank that must be repaid with interest.</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Interest</td>
                  <td className="py-2">The fee a bank pays you for using your money, or the fee you pay for borrowing.</td>
                </tr>
                <tr>
                  <td className="py-2">ATM</td>
                  <td className="py-2">A machine that allows basic banking functions.</td>
                </tr>
              </tbody>
            </table>
            <textarea
              value={answers['ex1'] || ''}
              onChange={(e) => handleInputChange('ex1', e.target.value)}
              placeholder="Write your answers (e.g., Deposit - D)"
              className="w-full p-3 border border-gray-300 rounded mb-3"
              rows="3"
            />
            <button
              onClick={() => handleSubmit('ex1')}
              className="px-4 py-2 bg-[#1a365d] text-white rounded hover:bg-[#2c4a7d] transition"
            >
              ✅ Submit
            </button>
          </div>

          {/* Lesson 2: Types of Banks */}
          <div className="mb-8 p-5 bg-[#f8f9fa] border-l-4 border-[#1a365d] rounded">
            <h3 className="text-lg font-bold text-[#1a365d] mb-3">Lesson 2: Types of Banks</h3>
            <h4 className="font-semibold mb-2">Exercise 2: Gap-Fill & Substitution</h4>
            <p className="mb-3">Fill in the blanks with the correct type of bank: <strong>retail, investment, central</strong></p>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                A{" "}
                <input
                  type="text"
                  value={answers['q2_1'] || ''}
                  onChange={(e) => handleInputChange('q2_1', e.target.value)}
                  className="inline w-48 p-1 border-2 border-[#1a365d] rounded bg-[#f8f9fa] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:ring-opacity-30"
                />{" "}
                bank works with individuals, offering checking and savings accounts.
              </li>
              <li>
                The{" "}
                <input
                  type="text"
                  value={answers['q2_2'] || ''}
                  onChange={(e) => handleInputChange('q2_2', e.target.value)}
                  className="inline w-48 p-1 border-2 border-[#1a365d] rounded bg-[#f8f9fa] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:ring-opacity-30"
                />{" "}
                bank controls the money supply and sets national interest rates.
              </li>
              <li>
                An{" "}
                <input
                  type="text"
                  value={answers['q2_3'] || ''}
                  onChange={(e) => handleInputChange('q2_3', e.target.value)}
                  className="inline w-48 p-1 border-2 border-[#1a365d] rounded bg-[#f8f9fa] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:ring-opacity-30"
                />{" "}
                bank helps companies raise capital and handles mergers.
              </li>
            </ol>
            <button
              onClick={() => handleSubmit('ex2')}
              className="mt-3 px-4 py-2 bg-[#1a365d] text-white rounded hover:bg-[#2c4a7d] transition"
            >
              ✅ Submit
            </button>
          </div>

          {/* Lesson 3: Professional Roles */}
          <div className="mb-8 p-5 bg-[#f8f9fa] border-l-4 border-[#1a365d] rounded">
            <h3 className="text-lg font-bold text-[#1a365d] mb-3">Lesson 3: Professional Roles</h3>
            <h4 className="font-semibold mb-2">Exercise 3: Present Simple – Routine Processes</h4>
            <p className="mb-3">Complete the sentences using the correct form of the verb.</p>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                A bank teller{" "}
                <input
                  type="text"
                  value={answers['q3_1'] || ''}
                  onChange={(e) => handleInputChange('q3_1', e.target.value)}
                  className="inline w-32 p-1 border-2 border-[#1a365d] rounded bg-[#f8f9fa] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:ring-opacity-30"
                />{" "}
                (help) customers with transactions.
              </li>
              <li>
                The bank{" "}
                <input
                  type="text"
                  value={answers['q3_2'] || ''}
                  onChange={(e) => handleInputChange('q3_2', e.target.value)}
                  className="inline w-32 p-1 border-2 border-[#1a365d] rounded bg-[#f8f9fa] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:ring-opacity-30"
                />{" "}
                (pay) interest on savings accounts.
              </li>
              <li>
                A loan officer{" "}
                <input
                  type="text"
                  value={answers['q3_3'] || ''}
                  onChange={(e) => handleInputChange('q3_3', e.target.value)}
                  className="inline w-32 p-1 border-2 border-[#1a365d] rounded bg-[#f8f9fa] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:ring-opacity-30"
                />{" "}
                (assess) credit history.
              </li>
              <li>
                The ATM{" "}
                <input
                  type="text"
                  value={answers['q3_4'] || ''}
                  onChange={(e) => handleInputChange('q3_4', e.target.value)}
                  className="inline w-32 p-1 border-2 border-[#1a365d] rounded bg-[#f8f9fa] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:ring-opacity-30"
                />{" "}
                (dispense) cash.
              </li>
              <li>
                A financial advisor{" "}
                <input
                  type="text"
                  value={answers['q3_5'] || ''}
                  onChange={(e) => handleInputChange('q3_5', e.target.value)}
                  className="inline w-32 p-1 border-2 border-[#1a365d] rounded bg-[#f8f9fa] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:ring-opacity-30"
                />{" "}
                (give) investment advice.
              </li>
            </ol>
            <button
              onClick={() => handleSubmit('ex3')}
              className="mt-3 px-4 py-2 bg-[#1a365d] text-white rounded hover:bg-[#2c4a7d] transition"
            >
              ✅ Submit
            </button>

            <h4 className="font-semibold mt-6 mb-2">Exercise 4: Describe a Role</h4>
            <p className="mb-3">In your own words, describe each role:</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li><strong>Bank Teller:</strong> Daily tasks? Who do they interact with?</li>
              <li><strong>Loan Officer:</strong> Primary responsibility? What do they assess?</li>
              <li><strong>Financial Analyst:</strong> What data do they analyze? Goal?</li>
            </ul>
            <textarea
              value={answers['ex4'] || ''}
              onChange={(e) => handleInputChange('ex4', e.target.value)}
              placeholder="Your descriptions..."
              className="w-full p-3 border border-gray-300 rounded mb-3"
              rows="6"
            />
            <button
              onClick={() => handleSubmit('ex4')}
              className="px-4 py-2 bg-[#1a365d] text-white rounded hover:bg-[#2c4a7d] transition"
            >
              ✅ Submit
            </button>
          </div>

          {/* Lesson 4: Grammar */}
          <div className="mb-8 p-5 bg-[#f8f9fa] border-l-4 border-[#1a365d] rounded">
            <h3 className="text-lg font-bold text-[#1a365d] mb-3">Lesson 4: Grammar & Sentence Structure</h3>
            <h4 className="font-semibold mb-2">Exercise 5: Sentence Scramble</h4>
            <p className="mb-3">Put the words in order to make correct sentences.</p>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                handles / an investment bank / acquisitions / mergers and<br />
                <input
                  type="text"
                  value={answers['q5_1'] || ''}
                  onChange={(e) => handleInputChange('q5_1', e.target.value)}
                  className="mt-1 w-full p-2 border-2 border-[#1a365d] rounded bg-[#f8f9fa] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:ring-opacity-30"
                  style={{ maxWidth: '400px' }}
                />
              </li>
              <li>
                a customer / money / deposits / into / their / account<br />
                <input
                  type="text"
                  value={answers['q5_2'] || ''}
                  onChange={(e) => handleInputChange('q5_2', e.target.value)}
                  className="mt-1 w-full p-2 border-2 border-[#1a365d] rounded bg-[#f8f9fa] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:ring-opacity-30"
                  style={{ maxWidth: '400px' }}
                />
              </li>
            </ol>
            <button
              onClick={() => handleSubmit('ex5')}
              className="mt-3 px-4 py-2 bg-[#1a365d] text-white rounded hover:bg-[#2c4a7d] transition"
            >
              ✅ Submit
            </button>

            <h4 className="font-semibold mt-6 mb-2">Exercise 6: Verb Tense Practice</h4>
            <p className="mb-3">Complete the sentences with the correct form of the verb.</p>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                The bank{" "}
                <input
                  type="text"
                  value={answers['q6_1'] || ''}
                  onChange={(e) => handleInputChange('q6_1', e.target.value)}
                  className="inline w-32 p-1 border-2 border-[#1a365d] rounded bg-[#f8f9fa] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:ring-opacity-30"
                />{" "}
                (offer) a new savings account.
              </li>
              <li>
                He{" "}
                <input
                  type="text"
                  value={answers['q6_2'] || ''}
                  onChange={(e) => handleInputChange('q6_2', e.target.value)}
                  className="inline w-32 p-1 border-2 border-[#1a365d] rounded bg-[#f8f9fa] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:ring-opacity-30"
                />{" "}
                (work) as a financial advisor.
              </li>
              <li>
                They{" "}
                <input
                  type="text"
                  value={answers['q6_3'] || ''}
                  onChange={(e) => handleInputChange('q6_3', e.target.value)}
                  className="inline w-32 p-1 border-2 border-[#1a365d] rounded bg-[#f8f9fa] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:ring-opacity-30"
                />{" "}
                (not lend) without a credit check.
              </li>
            </ol>
            <button
              onClick={() => handleSubmit('ex6')}
              className="mt-3 px-4 py-2 bg-[#1a365d] text-white rounded hover:bg-[#2c4a7d] transition"
            >
              ✅ Submit
            </button>

            <h4 className="font-semibold mt-6 mb-2">Exercise 7: Question Formation</h4>
            <p className="mb-3">Create a question for each answer.</p>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                Answer: The loan officer helps clients.<br />
                Question:{" "}
                <input
                  type="text"
                  value={answers['q7_1'] || ''}
                  onChange={(e) => handleInputChange('q7_1', e.target.value)}
                  className="mt-1 w-full p-2 border-2 border-[#1a365d] rounded bg-[#f8f9fa] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:ring-opacity-30"
                  style={{ maxWidth: '300px' }}
                />
              </li>
              <li>
                Answer: No, the bank does not offer business loans.<br />
                Question:{" "}
                <input
                  type="text"
                  value={answers['q7_2'] || ''}
                  onChange={(e) => handleInputChange('q7_2', e.target.value)}
                  className="mt-1 w-full p-2 border-2 border-[#1a365d] rounded bg-[#f8f9fa] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:ring-opacity-30"
                  style={{ maxWidth: '300px' }}
                />
              </li>
            </ol>
            <button
              onClick={() => handleSubmit('ex7')}
              className="mt-3 px-4 py-2 bg-[#1a365d] text-white rounded hover:bg-[#2c4a7d] transition"
            >
              ✅ Submit
            </button>
          </div>

          {/* Lesson 5: Dialogue */}
          <div className="mb-8 p-5 bg-[#f8f9fa] border-l-4 border-[#1a365d] rounded">
            <h3 className="text-lg font-bold text-[#1a365d] mb-3">Lesson 5: Professional Dialogue</h3>
            <h4 className="font-semibold mb-2">Exercise 8: Dialogue Completion</h4>
            <p className="mb-3">Complete the conversation between a bank teller and a customer.</p>
            <p>
              <strong>Teller:</strong> "Good morning! How can I{" "}
              <input
                type="text"
                value={answers['q8_1'] || ''}
                onChange={(e) => handleInputChange('q8_1', e.target.value)}
                className="inline w-24 p-1 border-2 border-[#1a365d] rounded bg-[#f8f9fa] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:ring-opacity-30"
              />{" "}
              you today?"
            </p>
            <p>
              <strong>Customer:</strong> "I'd like to make a{" "}
              <input
                type="text"
                value={answers['q8_2'] || ''}
                onChange={(e) => handleInputChange('q8_2', e.target.value)}
                className="inline w-24 p-1 border-2 border-[#1a365d] rounded bg-[#f8f9fa] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:ring-opacity-30"
              />{" "}
              of $500."
            </p>
            <p>
              <strong>Teller:</strong> "And would you like to make a{" "}
              <input
                type="text"
                value={answers['q8_3'] || ''}
                onChange={(e) => handleInputChange('q8_3', e.target.value)}
                className="inline w-24 p-1 border-2 border-[#1a365d] rounded bg-[#f8f9fa] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:ring-opacity-30"
              />{" "}
              as well?"
            </p>
            <button
              onClick={() => handleSubmit('ex8')}
              className="mt-3 px-4 py-2 bg-[#1a365d] text-white rounded hover:bg-[#2c4a7d] transition"
            >
              ✅ Submit
            </button>

            <h4 className="font-semibold mt-6 mb-2">Exercise 9: Short Answer Questions</h4>
            <p className="mb-3">Answer in clear, professional English.</p>
            <ol className="list-decimal pl-5 mb-3 space-y-1">
              <li>What is the main difference between a loan and a deposit?</li>
              <li>Why is the central bank important for the economy?</li>
              <li>List three functions of an ATM.</li>
            </ol>
            <textarea
              value={answers['ex9'] || ''}
              onChange={(e) => handleInputChange('ex9', e.target.value)}
              placeholder="Your answers..."
              className="w-full p-3 border border-gray-300 rounded mb-3"
              rows="6"
            />
            <button
              onClick={() => handleSubmit('ex9')}
              className="px-4 py-2 bg-[#1a365d] text-white rounded hover:bg-[#2c4a7d] transition"
            >
              ✅ Submit
            </button>
          </div>

          {/* Navigation */}
          <div className="text-center mt-8">
            <a href="/" className="mx-2 text-[#1a365d] font-bold no-underline hover:underline">🏠 Home</a>
            <a href="/lab" className="mx-2 text-[#1a365d] font-bold no-underline hover:underline">🧩 Aulice Lab</a>
            <a href="/lexicon" className="mx-2 text-[#1a365d] font-bold no-underline hover:underline">📘 Lexicon</a>
            <a href="/teacher" className="mx-2 text-[#1a365d] font-bold no-underline hover:underline">👨‍🏫 Teacher Dashboard</a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-10 px-5 bg-[#1a365d] text-white mt-16">
        <p>© 2025 Aulice Academy. Reality is programmable. Smart people are its architects.</p>
      </footer>
    </div>
  );
};

export default BankingUnit1;