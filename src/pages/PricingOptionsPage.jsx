// src/pages/PricingOptionsPage.jsx
import React from 'react';
// Note: Assuming you have a reusable Link component or are using react-router-dom Link

// --- Data (Moved from the original HTML script block) ---
const courses = [
    { name: "Pilot & ATCs", lessons: 180, price: 40, monthly: 600, groupPrice: 20, groupMonthly: 300, breakdown: "15 lessons per month (weekly 4+4+4+3)" },
    { name: "Legal Professionals", lessons: 158, price: 38, monthly: 400, groupPrice: 19, groupMonthly: 200, breakdown: "13 lessons per month (weekly 4+3+3+3)" },
    { name: "Medical Professional", lessons: 150, price: 35, monthly: 430, groupPrice: 17.50, groupMonthly: 215, breakdown: "12 lessons per month (weekly 3+3+3+3)" },
    { name: "Logistics Coordinator", lessons: 150, price: 35, monthly: 430, groupPrice: 17.50, groupMonthly: 215, breakdown: "12 lessons per month (weekly 3+3+3+3)" },
    { name: "Banking Professionals", lessons: 150, price: 35, monthly: 430, groupPrice: 17.50, groupMonthly: 215, breakdown: "12 lessons per month (weekly 3+3+3+3)" },
    { name: "Mining Engineers", lessons: 150, price: 35, monthly: 430, groupPrice: 17.50, groupMonthly: 215, breakdown: "12 lessons per month (weekly 3+3+3+3)" },
    { name: "Hotel & Hospitality Professionals", lessons: 148, price: 35, monthly: 430, groupPrice: 17.50, groupMonthly: 215, breakdown: "12 lessons per month (weekly 3+3+3+3)" },
    { name: "Oil & Gas Professionals", lessons: 150, price: 35, monthly: 430, groupPrice: 17.50, groupMonthly: 215, breakdown: "12 lessons per month (weekly 3+3+3+3)" },
    { name: "Aestheticians", lessons: 120, price: 32, monthly: 320, groupPrice: 16, groupMonthly: 160, breakdown: "10 lessons per month (weekly 2+3+2+3)" },
    { name: "Cabin Crew Professionals", lessons: 120, price: 32, monthly: 320, groupPrice: 16, groupMonthly: 160, breakdown: "10 lessons per month (weekly 2+3+2+3)" }
];

const specialPlans = [
    {
        name: "🌟 Dream Achiever Plan",
        description: "Don't see your profession? We build custom learning paths to help you achieve your specific career goals. Let's create your journey together.",
        priceRange: "$200 - $500+/month",
        cta: "Contact for a Quote",
        href: "https://aulice-dream-acheiver-order-form.netlify.app/"
    },
    {
        name: "👦 Young Geniuses",
        description: "Tailor-made English programs for aspiring young professionals in science and other school subjects. Start with our fun quiz to find the perfect fit!",
        priceRange: "$150 - $400+/month",
        cta: "Contact for a Quote",
        href: "https://aulice-young-genius-order-form.netlify.app/"
    }
];

// --- Sub-Component for Course Card ---
const PricingCard = ({ course }) => {
    const oneOnOneAnnual = (course.price * course.lessons * 0.8).toFixed(2);
    const groupAnnual = (course.groupPrice * course.lessons * 0.8).toFixed(2);

    return (
        <section className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{course.name}</h2>
            <div className="flex flex-col md:flex-row justify-center items-stretch space-y-8 md:space-y-0 md:space-x-8">
                {/* 1:1 Pricing Column */}
                <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-6 text-center transition-transform transform hover:scale-105 hover:shadow-2xl flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">1:1 Coaching</h3>
                        <p className="text-lg text-gray-500 mb-4">Dedicated personalized sessions</p>
                        <div className="text-4xl font-bold text-blue-700 mb-4">${course.price}<span className="text-xl font-normal text-gray-500">/lesson</span></div>
                        <p className="text-xl text-gray-800 mb-4">or <span className="font-bold">${course.monthly}</span>/month</p>
                    </div>
                    <ul className="list-none text-left space-y-2 mb-6 text-gray-600">
                        <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> Total of {course.lessons} lessons</li>
                        <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> {course.breakdown}</li>
                        <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> Flexible scheduling</li>
                        <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> Full course access</li>
                    </ul>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition transform hover:scale-105">
                        Start 1:1
                    </button>
                </div>
                
                {/* Group Mode Pricing Column */}
                <div className="flex-1 relative bg-white border border-gray-200 rounded-2xl p-6 text-center transition-transform transform hover:scale-105 hover:shadow-2xl flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Group Mode</h3>
                        <p className="text-lg text-gray-500 mb-4">Collaborate and learn with peers</p>
                        <div className="text-4xl font-bold text-blue-700 mb-4">${course.groupPrice.toFixed(2)}<span className="text-xl font-normal text-gray-500">/lesson</span></div>
                        <p className="text-xl text-gray-800 mb-4">or <span className="font-bold">${course.groupMonthly}</span>/month</p>
                    </div>
                    <ul className="list-none text-left space-y-2 mb-6 text-gray-600">
                        <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> Total of {course.lessons} lessons</li>
                        <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> {course.breakdown}</li>
                        <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> Fixed schedule with others</li>
                        <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> Full course access</li>
                    </ul>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition transform hover:scale-105">
                        Join a Group
                    </button>
                </div>
            </div>
            <div className="mt-8 text-center">
                <p className="text-xl font-semibold text-gray-700">Annual Plan: Save 20%</p>
                <p className="text-lg text-gray-500 mt-2">1:1 Annual Access: <span className="font-bold text-blue-700">${oneOnOneAnnual}</span></p>
                <p className="text-lg text-gray-500 mt-2">Group Annual Access: <span className="font-bold text-blue-700">${groupAnnual}</span></p>
            </div>
        </section>
    );
};

// --- Sub-Component for Special Plans ---
const SpecialPlanCard = ({ plan }) => (
    <section className="bg-white rounded-2xl shadow-xl p-8 mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">{plan.name}</h2>
        <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">{plan.description}</p>
        <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-blue-700 mb-4">{plan.priceRange}</div>
            <a href={plan.href} className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105">
                {plan.cta}
            </a>
        </div>
    </section>
);

// --- Main Component ---
const PricingOptionsPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Note: The Navigation Bar and Footer logic is removed from here
               and should be handled by your main App component or layout file. */}

            <header className="w-full text-center py-10 bg-blue-700 text-white shadow-lg">
                <h1 className="text-4xl md:text-5xl font-bold">Course Pricing & Plans</h1>
                <p className="text-xl mt-2 max-w-2xl mx-auto">Choose the plan that fits your professional journey and start mastering your skills today.</p>
            </header>

            <main className="w-full max-w-6xl mx-auto my-12 flex-grow">
                <div className="space-y-12">
                    <section className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">Professional Curriculums</h2>
                    </section>
                    
                    {/* Pricing Cards Grid */}
                    <div className="space-y-12">
                        {courses.map((course, index) => (
                            <PricingCard key={index} course={course} />
                        ))}
                    </div>

                    {/* Special Plans */}
                    <section className="text-center pt-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">Specialized and Custom Tracks</h2>
                    </section>
                    <div className="space-y-8">
                        {specialPlans.map((plan, index) => (
                            <SpecialPlanCard key={index} plan={plan} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PricingOptionsPage;