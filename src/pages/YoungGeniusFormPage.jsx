import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';

const rawAppId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const appId = rawAppId.replace(/[\/.]/g, '_');

export default function YoungGeniusFormPage({ db, userId, setCurrentPage }) {
    const [step, setStep] = useState('subject'); // subject, quiz, form, final
    const [age, setAge] = useState('');
    const [subject, setSubject] = useState('');
    const [customSubject, setCustomSubject] = useState('');
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', goal: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubjectNext = () => {
        if (!age || !subject) {
            alert('Please select an age and subject.');
            return;
        }
        if (subject === 'Others' && !customSubject.trim()) {
            alert('Please enter a custom subject.');
            return;
        }
        setStep('quiz');
    };

    const handleQuizSubmit = (e) => {
        e.preventDefault();
        setStep('form');
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (db && userId) {
                await addDoc(collection(db, `artifacts/${appId}/public/data/leads`), {
                    ...formData,
                    age,
                    subject: subject === 'Others' ? customSubject : subject,
                    type: 'Young Genius',
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

    return (
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-xl w-full mx-auto my-12">
            {step === 'subject' && (
                <div>
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Explore Your Genius!</h1>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="age-select" className="block text-sm font-medium text-gray-700 mb-2">Your Age</label>
                            <select id="age-select" value={age} onChange={e => setAge(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
                                <option value="">-- Select --</option>
                                {[...Array(15).keys()].map(i => <option key={i+7} value={i+7}>{i+7}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="subject-select" className="block text-sm font-medium text-gray-700 mb-2">School Subject</label>
                            <select id="subject-select" value={subject} onChange={e => setSubject(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
                                <option value="">-- Select --</option>
                                {["Mathematics", "Sciences", "Physics", "Chemistry", "Biology", "Zoology", "Literature", "Arts", "Sports", "Others"].map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        {subject === 'Others' && <input type="text" placeholder="e.g., Robotics" value={customSubject} onChange={e => setCustomSubject(e.target.value)} className="w-full px-4 py-2 border rounded-lg"/>}
                        <button onClick={handleSubjectNext} className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700">Continue</button>
                    </div>
                </div>
            )}
            {step === 'quiz' && (
                <div>
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Quick School Subject Quiz</h1>
                    <form onSubmit={handleQuizSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">1. What is the square root of 81?</label>
                            <input type="text" required className="w-full p-3 border rounded-lg"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">2. What is the powerhouse of the cell?</label>
                            <input type="text" required className="w-full p-3 border rounded-lg"/>
                        </div>
                        <button type="submit" className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg">Check My Answers</button>
                    </form>
                </div>
            )}
            {step === 'form' && (
                <div>
                    <h1 className="text-3xl font-bold text-center text-green-600 mb-4">Congratulations!</h1>
                    <p className="text-center text-lg text-gray-700 mb-8">You've won a **free consultation**.</p>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <input type="text" placeholder="Full Name" required onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 border rounded-lg"/>
                        <input type="email" placeholder="Email" required onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 border rounded-lg"/>
                        <input type="tel" placeholder="Phone" required onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 border rounded-lg"/>
                        <select required onChange={e => setFormData({...formData, goal: e.target.value})} className="w-full p-3 border rounded-lg">
                            <option value="">-- Select a goal --</option>
                            {["Employment", "Promotion", "Relocation", "Exam", "Education", "Conference", "Project", "Business", "Other"].map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                        <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg">{isSubmitting ? 'Submitting...' : 'Submit & Schedule'}</button>
                    </form>
                </div>
            )}
            {step === 'final' && (
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">You're All Set!</h1>
                    <p className="text-lg text-gray-600 mb-8">Click below to schedule your free consultation.</p>
                    <a href="https://calendly.com/aulice" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-purple-600 text-white font-semibold rounded-full">Schedule My Free Session</a>
                </div>
            )}
        </div>
    );
}
