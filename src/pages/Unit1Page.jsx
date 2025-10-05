// src/pages/Unit1Page.jsx
import React from 'react';

const Unit1Page = ({ course }) => {
  // Helper component for nav links
  const NavLinks = () => (
    <div className="text-center my-8">
      <a href="https://www.aulice.ca" className="mx-2 text-[#1a365d] font-bold no-underline">🏠 Home</a>
      <a href="https://aulislab.netlify.app" className="mx-2 text-[#1a365d] font-bold no-underline">🧩 Aulice Lab</a>
      <a href="https://aulice-lexicon.netlify.app" className="mx-2 text-[#1a365d] font-bold no-underline">📘 Lexicon</a>
      <a href="https://teacher-aulice.netlify.app" className="mx-2 text-[#1a365d] font-bold no-underline">👨‍🏫 Teacher Dashboard</a>
    </div>
  );

  const Exercise = ({ title, children }) => (
    <div className="bg-[#f8f9fa] p-5 my-5 border-l-4 border-[#1a365d] rounded-r-lg">
      <h3 className="text-xl font-bold text-[#1a365d] mb-4">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="font-['Segoe_UI',_sans-serif] bg-[#f7f9fc] text-[#2c3e50] leading-relaxed">
      <style>{`
        .inline-input { 
          width: 200px; padding: 6px 10px; margin: 0 5px; border: 2px solid #1a365d; 
          border-radius: 4px; font-size: 16px; color: #1a365d; background: #f8f9fa; 
        }
        .inline-input:focus { outline: none; background: white; box-shadow: 0 0 0 2px rgba(26, 54, 93, 0.3); }
        .btn { 
          display: inline-block; padding: 10px 20px; background: #1a365d; color: white; 
          border: none; border-radius: 6px; cursor: pointer; margin-top: 10px; font-size: 14px; 
        }
      `}</style>

      <header className="text-center py-10 px-5 bg-[#1a365d] text-white">
        <h1 className="text-3xl font-bold">💼 Unit 1: Introduction to Banking & the Financial System</h1>
        <p>Foundations of Global Finance</p>
      </header>

      <div className="max-w-4xl my-10 mx-auto p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#1a365d]">🎯 After completing this unit, you will be able to:</h2>
        <ul className="my-2 pl-5 list-disc space-y-1">
          <li>Define and use core banking terms like deposit, loan, and interest.</li>
          <li>Identify and describe different types of banks.</li>
          <li>Understand the roles and responsibilities of key banking professionals.</li>
          <li>Use the Present Simple tense to describe routine processes and facts.</li>
        </ul>

        <Exercise title="Lesson 1: Vocabulary & Core Concepts">
          <h4 className="font-semibold text-lg">Exercise 1: Vocabulary & Definitions</h4>
          <p>Match the term to its correct definition.</p>
          <table className="w-full mt-2 text-left">
            <thead>
              <tr>
                <th className="p-2 bg-gray-200">Term</th>
                <th className="p-2 bg-gray-200">Definition</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-2 border-b">Deposit</td><td className="p-2 border-b">The act of placing money into a bank account.</td></tr>
              <tr><td className="p-2 border-b">Withdrawal</td><td className="p-2 border-b">The act of taking money out of a bank account.</td></tr>
              <tr><td className="p-2 border-b">Loan</td><td className="p-2 border-b">Money borrowed from a bank that must be repaid with interest.</td></tr>
              <tr><td className="p-2 border-b">Interest</td><td className="p-2 border-b">The fee a bank pays you for using your money, or the fee you pay for borrowing.</td></tr>
              <tr><td className="p-2">ATM</td><td className="p-2">A machine that allows basic banking functions.</td></tr>
            </tbody>
          </table>
          <textarea placeholder="Write your answers (e.g., Deposit - D)" className="w-full mt-4 p-2 border rounded"></textarea>
          <button className="btn">✅ Submit</button>
        </Exercise>

        <Exercise title="Lesson 2: Types of Banks">
          <h4 className="font-semibold text-lg">Exercise 2: Gap-Fill & Substitution</h4>
          <p>Fill in the blanks with the correct type of bank: <strong>retail, investment, central</strong></p>
          <ol className="list-decimal pl-5 mt-2 space-y-2">
            <li>A <input type="text" className="inline-input" /> bank works with individuals, offering checking and savings accounts.</li>
            <li>The <input type="text" className="inline-input" /> bank controls the money supply and sets national interest rates.</li>
            <li>An <input type="text" className="inline-input" /> bank helps companies raise capital and handles