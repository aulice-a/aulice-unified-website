// src/pages/LogisticsDemoSimulatorPage.jsx
import React, { useState } from 'react';

const LogisticsDemoSimulatorPage = ({ course }) => {
  const [feedback, setFeedback] = useState(null);

  const chooseOption = (choice) => {
    let newFeedback = {};
    switch (choice) {
      case 'land_route':
        newFeedback = {
          title: 'A Solid Contingency Plan',
          text: 'This is a good, reliable choice. While it may result in a slight delay, it ensures the shipment will arrive safely. It demonstrates adaptability and a clear understanding of risk management, opting for a safe alternative over a high-risk gamble.',
          style: 'border-yellow-500 bg-yellow-100 text-yellow-900'
        };
        break;
      case 'air_freight':
        newFeedback = {
          title: 'The Best and Most Decisive Action',
          text: 'This is the ideal solution. It guarantees the shipment will arrive on time, regardless of the land route issues. While it is more expensive, the cost is justified by the critical nature of the supplies. This choice prioritizes mission success and is a hallmark of a great leader.',
          style: 'border-green-500 bg-green-100 text-green-900'
        };
        break;
      case 'wait':
        newFeedback = {
          title: 'A Catastrophic Failure of Leadership',
          text: 'Doing nothing is an unacceptable failure. Waiting for the highway to clear would result in a mission failure, potentially costing lives due to the lack of critical supplies. A leader must always be proactive and find solutions, not wait for problems to solve themselves.',
          style: 'border-red-500 bg-red-100 text-red-900'
        };
        break;
      case 'back_road':
        newFeedback = {
          title: 'An Unnecessary Gamble',
          text: 'Choosing a dangerous, unpaved road is reckless. While it may be shorter, it puts the driver, vehicle, and cargo at extreme risk of damage or complete loss. A leader must be able to weigh risk against reward and avoid unnecessary dangers.',
          style: 'border-purple-500 bg-purple-100 text-purple-900'
        };
        break;
      default:
        newFeedback = null;
    }
    setFeedback(newFeedback);
  };

  return (
    <div
      className="flex items-center justify-center p-4 min-h-screen"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1549480016-d87d464b97e9?q=80&w=2832&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="bg-gray-900/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 max-w-2xl w-full text-center text-white">
        <div className="bg-blue-800 rounded-t-3xl -mt-8 -mx-8 px-8 py-6 shadow-xl border-b-4 border-white">
          <h2 className="text-xl font-bold tracking-wide">Supply Chain Simulation</h2>
          <h3 className="text-sm opacity-80">{course?.title || 'Logistics Coordinator'}</h3>
        </div>
        <div className="p-4 mt-6">
          <h1 className="text-3xl font-extrabold text-white mb-2">📦 Urgent Shipment Delayed</h1>
          <p className="text-lg text-gray-300 mb-6">
            You are a Logistics Manager. A vital shipment of medical supplies is en route when a severe landslide blocks the primary highway. The supplies are needed at the hospital in less than 24 hours.
          </p>
          <div className="bg-gray-800 p-6 rounded-2xl shadow-inner text-left mb-6 border-l-4 border-white">
            <h3 className="text-xl font-bold text-sky-400 mb-2">⚠️ Situation</h3>
            <p className="text-gray-300">
              The driver is stopped and awaiting instructions. A passive approach will result in mission failure. Your team is looking to you for a solution to get the shipment to its destination on time.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => chooseOption('land_route')}
              className="w-full py-3 px-6 bg-yellow-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-yellow-700 transition-transform duration-200 transform hover:scale-105"
            >
              🛣️ Divert to Secondary Route
            </button>
            <button
              onClick={() => chooseOption('air_freight')}
              className="w-full py-3 px-6 bg-green-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-green-700 transition-transform duration-200 transform hover:scale-105"
            >
              ✈️ Arrange Emergency Air Freight
            </button>
            <button
              onClick={() => chooseOption('wait')}
              className="w-full py-3 px-6 bg-red-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-red-700 transition-transform duration-200 transform hover:scale-105"
            >
              ⏳ Wait for Highway to Clear
            </button>
            <button
              onClick={() => chooseOption('back_road')}
              className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-blue-700 transition-transform duration-200 transform hover:scale-105"
            >
              ⚠️ Attempt Back Road
            </button>
          </div>
          {feedback && (
            <div className="mt-8">
              <div className={`p-6 rounded-2xl text-left shadow-xl border-l-4 ${feedback.style}`}>
                <h4 className="text-xl font-bold mb-2">💡 {feedback.title}</h4>
                <p className="font-semibold">{feedback.text}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogisticsDemoSimulatorPage;