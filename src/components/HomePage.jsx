import React from 'react';
import CourseCard from './CourseCard';
import { COURSES_DATA } from '../data/courses';

const HomePage = ({ setCurrentPage, setActiveCourse }) => {
  const handleButtonClick = (page, course) => {
    setActiveCourse(course);
    let targetPage = page;
    if (page === 'Form') {
      if (course.id === 'younggenius') targetPage = 'geniusForm';
      else targetPage = 'customTrackForm';
    } else if (page === 'Quiz') {
      if (course.id === 'younggenius') targetPage = 'quiz';
    }
    setCurrentPage(targetPage);
  };

  return (
    <div className="p-4 md:p-8">
      <header className="text-center p-10 md:p-16 bg-[#0056b3] text-white border-b-8 border-yellow-400 rounded-2xl shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">🎓 Aulice ProMastery Portal</h1>
        <p className="text-lg md:text-xl opacity-90 max-w-4xl mx-auto">
          Professional Language Mastery: English for High-Stakes Scenarios
        </p>
      </header>
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8 pt-4">📚 Our Specialized Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {COURSES_DATA.map((course) => (
            <CourseCard key={course.id} course={course} handleButtonClick={handleButtonClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;