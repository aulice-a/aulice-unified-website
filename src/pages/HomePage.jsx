import React, { useState } from 'react';

// Data can be moved to a separate file later if it grows
const COLOR_MAP = {
  banking: { bg: 'bg-[#21436E]', text: 'text-white', iconBg: 'bg-[#21436E]', accent: 'text-indigo-300' },
  logistics: { bg: 'bg-gray-700', text: 'text-white', iconBg: 'bg-gray-700', accent: 'text-gray-300' },
  mining: { bg: 'bg-green-800', text: 'text-white', iconBg: 'bg-green-800', accent: 'text-green-300' },
  medical: { bg: 'bg-red-900', text: 'text-white', iconBg: 'bg-red-900', accent: 'text-red-300' },
  oilgas: { bg: 'bg-orange-600', text: 'text-white', iconBg: 'bg-orange-600', accent: 'text-orange-300' },
  aviation: { bg: 'bg-blue-800', text: 'text-white', iconBg: 'bg-blue-800', accent: 'text-blue-300' },
  aesthetic: { bg: 'bg-fuchsia-600', text: 'text-white', iconBg: 'bg-fuchsia-600', accent: 'text-fuchsia-300' },
  legal: { bg: 'bg-teal-600', text: 'text-white', iconBg: 'bg-teal-600', accent: 'text-teal-300' },
  hospitality: { bg: 'bg-green-900', text: 'text-yellow-400', iconBg: 'bg-green-900', accent: 'text-yellow-400' },
  cabin: { bg: 'bg-blue-600', text: 'text-white', iconBg: 'bg-blue-600', accent: 'text-blue-300' },
  younggenius: { bg: 'bg-purple-700', text: 'text-white', iconBg: 'bg-purple-700', accent: 'text-purple-300' },
  customtrack: { bg: 'bg-teal-700', text: 'text-white', iconBg: 'bg-teal-700', accent: 'text-teal-300' },
};

const COURSES_DATA = [
  { id: 'banking', title: 'Banking Specialists', logo: '💼', desc: 'Master communication for finance, client relations, and market analysis.', type: 'pro' },
  { id: 'logistics', title: 'Logistics Coordinator', logo: '🚚', desc: 'Master professional communication in the logistics and supply chain industry.', type: 'pro' },
  { id: 'mining', title: 'Mining Engineer', logo: '⛏️', desc: 'Communicate effectively on site, in meetings, and with international teams.', type: 'pro' },
  { id: 'medical', title: 'Medical Professionals', logo: '⚕️', desc: 'Improve patient communication, medical reports, and academic writing skills.', type: 'pro' },
  { id: 'oilgas', title: 'Oil & Gas Professionals', logo: '🛢️', desc: 'Learn industry-specific vocabulary and report writing for the energy sector.', type: 'pro' },
  { id: 'aviation', title: 'Civil Aviation Professionals - Pilots and ATCs', logo: '✈️', desc: 'Master clear and concise communication in aviation, vital for safety and efficiency.', type: 'pro' },
  { id: 'aesthetic', title: 'Aestheticians', logo: '💄', desc: 'Enhance client consultation and service delivery language for the beauty industry.', type: 'pro' },
  { id: 'legal', title: 'Legal Professionals', logo: '⚖️', desc: 'Improve legal writing, courtroom communication, and client relations skills.', type: 'pro' },
  { id: 'hospitality', title: 'Hotel & Hospitality Professionals', logo: '🏨', desc: 'Provide exceptional guest experiences with polished and professional English.', type: 'pro' },
  { id: 'cabin', title: 'Cabin Crew Professionals', logo: '✈️', desc: 'Ensure clear, calm, and effective communication with passengers and crew.', type: 'pro' },
  { id: 'younggenius', title: 'Young Geniuses Track', logo: '👶', desc: 'Tailor-made English programs for aspiring young professionals.', type: 'ondemand' },
  { id: 'customtrack', title: 'Custom Track Design', logo: '💡', desc: 'We build custom learning paths to help you achieve your specific career goals.', type: 'ondemand' },
];

const CourseCard = ({ course, handleButtonClick }) => {
    const colorStyle = COLOR_MAP[course.id] || {};
    const isPro = course.type === 'pro';

    return (
      <div className={`bg-white rounded-xl p-5 shadow-lg border-t-4 border-indigo-600 transition duration-300 hover:shadow-2xl hover:scale-[1.02]`}>
        <div className={`w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full text-2xl text-white ${colorStyle.iconBg}`}>{course.logo}</div>
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
                <button onClick={() => handleButtonClick('PricingPlans', course)} className="w-full py-3 bg-red-600 text-white rounded-lg text-lg font-extrabold hover:bg-red-700 transition shadow-lg mt-2">💰 ENROLL NOW</button>
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

export default function HomePage({ setCurrentPage, setActiveCourse }) {

  const handleButtonClick = (page, course) => {
    setActiveCourse(course);
    let targetPage = page;

    if(page === 'Form') {
        if(course.id === 'younggenius') targetPage = 'YoungGeniusForm';
        else targetPage = 'CustomTrackForm';
    } else if (page === 'Quiz') {
        if(course.id === 'younggenius') targetPage = 'YoungGeniusQuiz';
    }
    setCurrentPage(targetPage);
  };

  return (
    <div className="p-4 md:p-8">
      <header className="text-center p-10 md:p-16 bg-[#0056b3] text-white border-b-8 border-yellow-400 rounded-2xl shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">🎓 Aulice ProMastery Portal</h1>
        <p className="text-lg md:text-xl opacity-90 max-w-4xl mx-auto">Professional Language Mastery: English for High-Stakes Scenarios</p>
      </header>
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8 pt-4">📚 Our Specialized Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {COURSES_DATA.map(course => <CourseCard key={course.id} course={course} handleButtonClick={handleButtonClick} />)}
        </div>
      </div>
    </div>
  );
}

