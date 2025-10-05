// src/pages/PricingOptionsPage.jsx
import React, { useState } from 'react';
import { COLOR_MAP } from '../data/colorMap';

const PricingOptionsPage = ({ course }) => {
  const [selection, setSelection] = useState({ mode: null, plan: null });
  const colorStyle = COLOR_MAP[course.id] || {};

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800">Enrollment Options</h1>
      <h2 className={`text-2xl font-semibold text-center mt-2 ${colorStyle.accent}`}>
        {course.title}
      </h2>

      <div className="mt-10">
        {/* Step 1: Choose Mode */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-700">Step 1: Choose Your Training Mode</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {['1:1 Mode', 'Group', 'Pay as you go'].map((mode) => (
              <button
                key={mode}
                onClick={() => setSelection({ mode, plan: null })}
                className={`p-6 rounded-lg border-4 transition ${
                  selection.mode === mode
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <span className="text-2xl">
                  {mode === '1:1 Mode' ? '👤' : mode === 'Group' ? '👥' : '💳'}
                </span>
                <p className="font-bold text-lg mt-2">{mode}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Select Plan */}
        {selection.mode && (
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-gray-700">
              Step 2: Select a Plan for {selection.mode}
            </h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
              {['Annual', 'Monthly'].map((plan) => (
                <button
                  key={plan}
                  onClick={() => setSelection((prev) => ({ ...prev, plan }))}
                  className={`p-6 rounded-lg border-4 transition ${
                    selection.plan === plan
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <p className="font-bold text-lg">{plan} Plan</p>
                  <p className="text-sm text-gray-500">
                    {plan === 'Annual' ? 'Discounted Rate' : 'Standard Rate'}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Summary & Checkout */}
        {selection.plan && (
          <div className="mt-12 p-6 bg-gray-100 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-gray-800">Your Selection:</h3>
            <p className="text-lg mt-2">
              <span className="font-semibold">{course.title}</span> –{' '}
              <span className="font-medium">{selection.mode}</span> –{' '}
              <span className="font-medium">{selection.plan} Plan</span>
            </p>
            <button className="mt-6 bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingOptionsPage;