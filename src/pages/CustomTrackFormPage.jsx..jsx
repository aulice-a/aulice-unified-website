import React, { useState, useMemo } from 'react';
import { addDoc, collection } from 'firebase/firestore';

const rawAppId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const appId = rawAppId.replace(/[\/.]/g, '_');

export default function CustomTrackFormPage({ db, userId, setCurrentPage }) {
    const [step, setStep] = useState('initial'); // initial, quiz, form, final
    const [quizAnswers, setQuizAnswers] = useState({});
    const [quizResult, setQuizResult] = useState(null);
    const [formData, setFormData] = useState({ name: '', contact: '', goal: '', profession: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const quizData = useMemo(() => [
        { question: 'The team needs to be more ... when facing unexpected challenges.', answer: 'flexible' },
        { question: 'Our new leader is excellent at providing clear and effective ... to the team.', answer: 'feedback' },
        { question: 'In order to build consensus, we must first find a common ... for the team to agree on.', answer: 'ground' },
    ], []);
    
    
    const handleQuizSubmit = (e) => {
        e.preventDefault();
        let correctCount = 0;
        quizData.forEach((q, index) => {
            if (quizAnswers[index]?.trim().toLowerCase() === q.answer.toLowerCase()) {
                correctCount++;
            }
        });
        setQuizResult({ correct: correctCount, total: quizData.length });
        setStep('form');
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (db && userId) {
                await addDoc(collection(db, `artifacts/${appId}/public/data/leads`), {
                    ...formData,
                    quizScore: `${quizResult.correct}/${quizResult.total}`,
                    type: 'Custom Track',
                    submittedAt: new Date().toISOString()
                });
                setStep('final');
            } else {
              throw new Error("Database or User ID not available.")
            }
        } catch (error) {
            console.error("Error submitting lead:", error);
            alert("There was an error submitting your information. Please try again.");
        }
        setIsSubmitting(false);
    };

    const renderStep = () => {
        switch(step) {
            case 'initial': return (
                 <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Design Your Dream Course</h1>
                    <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">Let's build a custom learning path to help you achieve your specific career goals.</p>
                    <button onClick={() => setStep('quiz')} className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105">Start Your Challenge</button>
                </div>
            );
            case 'quiz': return (
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Quick Professional English Assessment</h2>
                    <form onSubmit={handleQuizSubmit} className="space-y-6 mb-6">
                        {quizData.map((q, index) => (
                            <div key={index}>
                                <p className="mb-2 text-gray-700">{index + 1}. {q.question}</p>
                                <input type="text" onChange={(e) => setQuizAnswers(prev => ({...prev, [index]: e.target.value}))} required className="w-full p-3 border border-gray-300 rounded-md"/>
                            </div>
                        ))}
                        <button type="submit" className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700">Check My Answers</button>
                    </form>
                </div>
            );
            case 'form': return (
                <div>
                    {quizResult && <div className="text-center p-4 rounded-lg mb-6 bg-green-100 text-green-700">You got {quizResult.correct} out of {quizResult.total} correct! Let's get you started.</div>}
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Unlock Your Free Consultation</h2>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <input type="text" placeholder="Full Name" required onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 border rounded-md"/>
                        <input type="email" placeholder="Email Address" required onChange={e => setFormData({...formData, contact: e.target.value})} className="w-full p-3 border rounded-md"/>
                        <input type="text" placeholder="Your Profession" required onChange={e => setFormData({...formData, profession: e.target.value})} className="w-full p-3 border rounded-md"/>
                        <select required onChange={e => setFormData({...formData, goal: e.target.value})} className="w-full p-3 border rounded-md">
                            <option value="">-- Select a Goal --</option>
                            {["Promotion", "Relocation", "Language Test", "Skill Upgrade", "Other"].map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                        <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-blue-400">{isSubmitting ? 'Submitting...' : 'Submit & Continue'}</button>
                    </form>
                </div>
            );
            case 'final': return (
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Congratulations!</h2>
                    <p className="text-lg text-gray-600 mb-4">You've earned a <strong>free class assessment</strong> to design your custom course.</p>
                    <a href="https://calendly.com/aulice" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105">Schedule My Free Session</a>
                     <div className="mt-8 text-gray-500">
                      <p>Finished for now?</p>
                      <button onClick={() => setCurrentPage('Home')} className="mt-2 text-blue-600 hover:underline">Return to Homepage</button>
                    </div>
                </div>
            );
            default: return <div>Loading...</div>;
        }
    }
    
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="container bg-white p-8 md:p-12 rounded-2xl shadow-xl space-y-8 max-w-2xl w-full">
            {renderStep()}
        </div>
      </div>
    );
};

const YoungGeniusFormPage = () => { /* ... (Full component code is here) ... */ return <div/>; };

