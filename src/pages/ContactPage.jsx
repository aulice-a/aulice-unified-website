// src/pages/ContactPage.jsx
import React from 'react';

const ContactPage = () => {
    
    // NOTE: This component assumes the navigation and footer are handled by a parent layout component.
    // However, it includes the main structure of your original HTML.

    return (
        <div className="flex flex-col min-h-screen bg-[#f7f9fc]">
            
            {/* Main Content Section */}
            <main className="container mx-auto px-4 py-12 md:py-20 flex-grow">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Contact Us</h1>
                    <p className="text-lg md:text-xl text-gray-600">We would love to hear from you!</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 max-w-2xl mx-auto">
                    {/* Form uses standard React onSubmit */}
                    <form onSubmit={(e) => { e.preventDefault(); alert("Message simulation sent!"); }} className="space-y-4">
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Your Name</label>
                            <input type="text" id="name" name="name" className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Your Email</label>
                            <input type="email" id="email" name="email" className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                            <textarea id="message" name="message" rows="6" className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" required></textarea>
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default ContactPage;