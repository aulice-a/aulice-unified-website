import React from 'react';
import { COLOR_MAP } from '../data/colorMap';

const CourseCard = ({ course, handleButtonClick }) => {
  const colorStyle = COLOR_MAP[course.id] || {};
  const isPro = course.type === 'pro';

  return (
    <div className={`bg-white rounded-xl p-5 shadow-lg border-t-4 border-indigo-600 transition duration-300 hover:shadow-2xl hover:scale-[1.02]`}>
      <div className={`w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full text-2xl text-white ${colorStyle.iconBg}`}>
        {course.logo}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-1 text-center">{course.title}</h3>
      <p className="text-sm text-gray-500 mb-4 h-12 overflow-hidden text-center">{course.desc}</p>
      {isPro ? (
        <div className="space-y-3 mt-4">
          <div className="flex justify-center space-x-2 pb-3 border-b border-gray-100">
            <button onClick={() => handleButtonClick('DemoSimulator', course)} className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">▶️ Demo</button>
            <button onClick={() => handleButtonClick('ExamSimulator', course)} className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">📝 Exam</button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => handleButtonClick('Pathway', course)} className="px-2 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-medium">📘 Pathway</button>
            <button onClick={() => handleButtonClick('Scenario', course)} className="px-2 py-2 bg-green-100 text-green-700 rounded-lg text-xs font-medium">🧩 Scenario</button>
            <button onClick={() => handleButtonClick('Unit1', course)} className="px-2 py-2 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">🧪 Unit 1</button>
          </div>
          <button onClick={() => handleButtonClick('PricingPlans', course)} className="w-full py-3 bg-green-600 text-white rounded-lg text-lg font-extrabold hover:bg-green-700 transition shadow-lg mt-2">
            💰 ENROLL NOW
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button onClick={() => handleButtonClick('Form', course)} className="px-3 py-2 bg-red-600 text-white rounded-md text-xs font-medium">🚀 Start Journey</button>
          <button onClick={() => handleButtonClick('Quiz', course)} className="px-3 py-2 bg-yellow-400 text-gray-800 rounded-md text-xs font-medium">🧠 Play Quiz</button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;