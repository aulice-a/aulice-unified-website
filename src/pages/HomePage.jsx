// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { loadStripe } from '@stripe/stripe-js';
import { auth } from '../firebaseConfig'; 

// 🔑 Your Stripe Publishable Key 
const stripePromise = loadStripe('pk_live_51S9DkiKAY8PM72prQaMsHqI8XCqSHJ2q5u639tBw8C9HUsRUjClAdCakpx4T5zBvsW2lkHddGz9jPsmjLdt4n9Uy003KA5MnRR');

// 💰 Map course IDs to Stripe Price IDs (FINAL VERIFIED LIST)
const STRIPE_PRICES = {
  cabin: { group: { annual: 'price_1SJhpBKAY8PM72pr20MtJF3G', monthly: 'price_1S9XRZKAY8PM72pr84LTbwL4', hour: 'price_1S9XRZKAY8PM72prmfbBlrg7' }, oneOnOne: { annual: 'price_1S9XN7KAY8PM72prBFRjGxyd', monthly: 'price_1S9XOtKAY8PM72prIJAdQDXX', hour: 'price_1S9XOuKAY8PM72pr6833ohwK5' } },
  aesthetician: { group: { annual: 'price_1S9XJqKAY8PM72prO8rmnS87', monthly: 'price_1S9XL5KAY8PM72prptIVQYu3', hour: 'price_1S9XL6KAY8PM72prm9OOnmka' }, oneOnOne: { annual: 'price_1S9XFkKAY8PM72prrAedQV1c', monthly: 'price_1S9XHhKAY8PM72pr0QpAOTTv', hour: 'price_1S9XHhKAY8PM72prxCWUl1Mr' } },
  oilgas: { group: { annual: 'price_1S9XChKAY8PM72prcmctGXfZ', monthly: 'price_1S9XE2KAY8PM72prmDubK1PB', hour: 'price_1S9XE2KAY8PM72prELHKcHJo' }, oneOnOne: { annual: 'price_1S9X58KAY8PM72prsXS4bjtQ', monthly: 'price_1S9X7HKAY8PM72prZLSomS0g', hour: 'price_1S9X7HKAY8PM72pr9I3wOMBe' } },
  hotel: { group: { annual: 'price_1S9Sj9KAY8PM72prfUo7Dmv9', monthly: 'price_1S9SkDKAY8PM72pr6Bbi8GGu', hour: 'price_1S9SkDKAY8PM72prTxN1shIn' }, oneOnOne: { annual: 'price_1S9SfqKAY8PM72prXlQuqHWG', monthly: 'price_1S9Sh3KAY8PM72pru0Bpet5e', hour: 'price_1S9Sh3KAY8PM72prBTsjGBbI' } },
  mining: { group: { annual: 'price_1S9SdCKAY8PM72prjJ5kGjVM', monthly: 'price_1S9SeGKAY8PM72prwTsaljW8', hour: 'price_1S9SeGKAY8PM72prtMh1Aw7W' }, oneOnOne: { annual: 'price_1S9SaKKAY8PM72prQLQfySvV', monthly: 'price_1S9SbZKAY8PM72pr9Dyj1SgC', hour: 'price_1S9SbaKAY8PM72pr1ouMBrkX' } },
  banking: { group: { annual: 'price_1S9SXgKAY8PM72prEgSwwSKF', monthly: 'price_1SJjOwKAY8PM72prpO2TpuWu', hour: 'price_1S9SZ0KAY8PM72prLjcgO4fU' }, oneOnOne: { annual: 'price_1S9STpKAY8PM72prgBdRUmgz', monthly: 'price_1S9SVBKAY8PM72prqRnOn54N', hour: 'price_1S9SVBKAY8PM72prvFZWoQW5' } },
  logistics: { group: { annual: 'price_1S9SQMKAY8PM72prflcvyg7V', monthly: 'price_1S9SRcKAY8PM72prJY0wwCiD', hour: 'price_1S9SRcKAY8PM72praeK3Lia5' }, oneOnOne: { annual: 'price_1S9SNGKAY8PM72pr3P8DDlD7', monthly: 'price_1S9SOaKAY8PM72preqD1krGe', hour: 'price_1S9SOaKAY8PM72prJVNmNhPU' } },
  medical: { group: { annual: 'price_1S9SIxKAY8PM72pr8OQyJSB8', monthly: 'price_1S9SKWKAY8PM72prMnfgQ0UR', hour: 'price_1S9SKWKAY8PM72prNHcM9YNv' }, oneOnOne: { annual: 'price_1S9SErKAY8PM72pra3klqu7m', monthly: 'price_1S9SGjKAY8PM72prqoXlByr6', hour: 'price_1S9SGjKAY8PM72prEhpCqFJI' } },
  legal: { group: { annual: 'price_1S9S9pKAY8PM72prJuGB4l2R', monthly: 'price_1S9SCpKAY8PM72prJFyR8dDi', hour: 'price_1S9SCpKAY8PM72prlakUZWks' }, oneOnOne: { annual: 'price_1S9QF8KAY8PM72prnVKLMGDw', monthly: 'price_1S9S2SKAY8PM72prVmOG3TDf', hour: 'price_1S9S2SKAY8PM72prhDEqm3dV' } },
  aviation: { group: { annual: 'price_1S9Eq5KAY8PM72prNo1myYP9', monthly: 'price_1S9EmdKAY8PM72proAWWBWZV', hour: 'price_1S9Eq5KAY8PM72prtGwkQzAM' }, oneOnOne: { annual: 'price_1S9EjBKAY8PM72prpELw2JgV', monthly: 'price_1S9EjBKAY8PM72prRVIzGa3B', hour: 'price_1S9EjBKAY8PM72prxVJ62g1T' } }
};


const HomePage = () => {
  const navigate = useNavigate();
  const [showPricing, setShowPricing] = useState(null);
  const [selectedMode, setSelectedMode] = useState('group'); // FIX: State initialized here

  // 🔥 Button Routing Logic (Fixed)
  const handleNavigation = (courseId, actionType) => {
    let route;

    switch (actionType) {
        case 'lexicon':
            route = `/glossary/${courseId}/mastery`; 
            break;
        default:
            route = `/courses/${courseId}/${actionType}`; 
            break;
    }
    navigate(route);
  };

  const handleEnrollClick = (courseId) => {
    setShowPricing(courseId);
    setSelectedMode('group'); // Reset to Group mode when opening modal
  };

  const handleEnroll = async (courseId, plan) => {
    // FIX APPLIED HERE: Using the selectedMode state to correctly find the Price ID
    const priceId = STRIPE_PRICES[courseId]?.[selectedMode]?.[plan];
    
    if (!priceId) {
      alert(`Pricing not available for ${selectedMode} ${plan} option.`);
      return;
    }

    try {
      const functions = getFunctions();
      const createCheckout = httpsCallable(functions, 'createCheckoutSession');
      
      const { data } = await createCheckout({ priceId, courseId, plan }); 
      
      if (data.sessionUrl) {
          window.location.assign(data.sessionUrl);
      } else {
          throw new Error("Stripe session URL was not returned by the server.");
      }

    } catch (err) {
      console.error('Checkout error:', err);
      alert(`Checkout failed: ${err.message}`);
    }
  };
  
  const courses = [
    { id: 'banking', name: 'Banking & Finance Communication', icon: '🏦', description: 'Master professional communication for finance, client relations, and market analysis — in English.' },
    { id: 'logistics', name: 'Logistics & Supply Chain Communication', icon: '🚢', description: 'Communicate effectively in logistics, freight, and global trade operations — in English.' },
    { id: 'mining', name: 'Mining Operations Communication', icon: '⛏️', description: 'Communicate clearly on site, in meetings, and with international teams — in English.' },
    { id: 'medical', name: 'Medical Professional Communication', icon: '⚕️', description: 'Improve patient communication, medical reports, and academic writing — in English.' },
    { id: 'oilgas', name: 'Oil & Gas Professionals Communication', icon: '⛽', description: 'Essential terminology for drilling, safety, and field operations — in English.' },
    { id: 'aviation', name: 'Aviation Crew Communication', icon: '✈️', description: 'Master clear and concise communication in aviation — vital for pilots, ATCs, and crew.' },
    { id: 'aesthetician', name: 'Aesthetics Client Communication', icon: '✨', description: 'Enhance client consultation and service delivery language — in English.' },
    { id: 'legal', name: 'Legal Professional Communication', icon: '⚖️', description: 'Improve legal writing, courtroom communication, and client relations — in English.' },
    { id: 'hotel', name: 'Hospitality Management Communication', icon: '🏨', description: 'Revenue management, front office operations, and F&B — all in professional English.' },
    { id: 'cabin', name: 'Cabin Crew Communication', icon: '🧑‍✈️', description: 'Safety procedures, in-flight service, and emergency codes — in English.' },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Professional Training Hub</h1>
          <p className="mt-2 text-xl text-gray-600">
            Choose your domain. Master simulations, exams, pathways, and vocabulary.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white shadow-lg rounded-xl overflow-hidden border-t-4 border-indigo-500">
              <div className="p-5">
                <div className="text-3xl mb-2">{course.icon}</div>
                <h3 className="text-xl font-extrabold text-gray-800">{course.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{course.description}</p>
              </div>
              <div className="bg-gray-50 p-4">
                <div className="flex flex-wrap gap-1 justify-center">
                  
                  {/* Buttons using the new generic navigation */}
                  <button onClick={() => handleNavigation(course.id, 'demo')} className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded">▶ Demo</button>
                  <button onClick={() => handleNavigation(course.id, 'exam')} className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded">✏️ Exam</button>
                  <button onClick={() => handleNavigation(course.id, 'pathway')} className="bg-purple-100 text-purple-800 px-2 py-1 text-xs rounded">📚 Pathway</button>
                  <button onClick={() => handleNavigation(course.id, 'scenario')} className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded">🧩 Scenario</button>
                  <button onClick={() => handleNavigation(course.id, 'unit1')} className="bg-pink-100 text-pink-800 px-2 py-1 text-xs rounded">📝 Unit 1</button>
                  <button onClick={() => handleNavigation(course.id, 'lexicon')} className="bg-gray-100 text-gray-800 px-2 py-1 text-xs rounded font-medium">📖 Lexicon</button>
                  
                </div>
                {/* ENROLL BUTTON */}
                <div className="mt-3 text-center">
                  <button
                    onClick={() => handleEnrollClick(course.id)}
                    className="w-full bg-indigo-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-indigo-700"
                  >
                    ENROLL NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRICING MODAL - WITH MODE SELECTOR */}
      {showPricing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">
              Enroll in {courses.find(c => c.id === showPricing)?.name}
            </h3>
            
            {/* NEW MODE SELECTOR */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose Format:
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedMode('group')}
                  // Use selectedMode for active state
                  className={`px-3 py-1 rounded flex-1 ${selectedMode === 'group' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
                >
                  Group Mode
                </button>
                <button
                  onClick={() => setSelectedMode('oneOnOne')}
                  // Use selectedMode for active state
                  className={`px-3 py-1 rounded flex-1 ${selectedMode === 'oneOnOne' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
                >
                  1:1 Coaching
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleEnroll(showPricing, 'annual')}
                className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Annual Access
              </button>
              <button
                onClick={() => handleEnroll(showPricing, 'monthly')}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Monthly Subscription
              </button>
              <button
                onClick={() => handleEnroll(showPricing, 'hour')}
                className="w-full py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
              >
                Pay Per Class
              </button>
            </div>
            <button
              onClick={() => setShowPricing(null)}
              className="mt-4 text-gray-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomePage;