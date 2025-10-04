import React, { useState } from 'react';

export default function BankingDemoSimulator() {
    const [feedback, setFeedback] = useState(null);
      
    const scenarioText = "You are the CFO of a major financial institution. A key economic sector has collapsed, putting your largest loan portfolio at risk.";
    const feedbackMap = { 
        restructure: { title: "Strategic and Client-Focused", text: "This is a strong leadership move. It demonstrates a commitment to long-term client relationships and can save a significant portion of the loan value, minimizing immediate losses and protecting the bank's reputation.", style: "border-green-500 bg-green-900/40" }, 
        sell: { title: "Risk Aversion, at a Cost", text: "This action removes the risk from your balance sheet, but you'll likely sell at a major loss. While it protects the bank, it signals a lack of confidence and could erode trust with investors.", style: "border-yellow-500 bg-yellow-900/40" },
        liquidate: { title: "Extreme, High-Impact Action", text: "This is a drastic measure that would severely damage client relationships and could trigger a wave of defaults, magnifying the crisis. It's a last resort that shows a lack of a cohesive strategy.", style: "border-red-500 bg-red-900/40" },
        wait: { title: "Potentially Fatal Delay", text: "In a rapidly unfolding crisis, waiting for more data can be a catastrophic mistake. The market could deteriorate further, making any future action far less effective and more costly. Action, even if imperfect, is often better than inaction.", style: "border-purple-500 bg-purple-900/40" }
    };

    return (
    <div className="flex items-center justify-center min-h-screen p-4" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2940&auto=format&fit=crop')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className="bg-gray-900/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 max-w-2xl w-full text-center text-white">
            <div className="bg-blue-800 rounded-t-3xl -mt-8 -mx-8 px-8 py-6 shadow-xl border-b-4 border-white">
                <h2 className="text-xl font-bold tracking-wide">Financial Portfolio Crisis</h2>
            </div>
            <div className="p-4 mt-6">
                <h1 className="text-3xl font-extrabold text-white mb-2">📊 Sudden Market Volatility</h1>
                <p className="text-lg text-gray-300 mb-6">{scenarioText}</p>
                <div className="bg-gray-800 p-6 rounded-2xl shadow-inner text-left mb-6 border-l-4 border-white">
                    <h3 className="text-xl font-bold text-blue-400 mb-2">📉 Situation</h3>
                    <p className="text-gray-300">
                        The entire energy sector is facing a liquidity crisis, threatening defaults on millions of dollars in loans. You must act to protect the bank's assets and reputation.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button onClick={() => setFeedback(feedbackMap['restructure'])} className="w-full py-3 px-6 bg-green-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-green-700 transition-transform duration-200 transform hover:scale-105">
                        🤝 Restructure client loans
                    </button>
                    <button onClick={() => setFeedback(feedbackMap['sell'])} className="w-full py-3 px-6 bg-yellow-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-yellow-700 transition-transform duration-200 transform hover:scale-105">
                        📉 Sell off the high-risk portfolio
                    </button>
                    <button onClick={() => setFeedback(feedbackMap['liquidate'])} className="w-full py-3 px-6 bg-red-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-red-700 transition-transform duration-200 transform hover:scale-105">
                        🚨 Immediately liquidate assets
                    </button>
                    <button onClick={() => setFeedback(feedbackMap['wait'])} className="w-full py-3 px-6 bg-purple-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-purple-700 transition-transform duration-200 transform hover:scale-105">
                        ⏱️ Wait for more data analysis
                    </button>
                </div>
                {feedback && (
                    <div className="mt-8 text-left">
                        <div className={`p-6 rounded-2xl shadow-xl border-l-4 ${feedback.style}`}>
                            <h4 className="text-xl font-bold mb-2 text-white">💡 {feedback.title}</h4>
                            <p className="font-semibold text-gray-200">{feedback.text}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
    );
}
