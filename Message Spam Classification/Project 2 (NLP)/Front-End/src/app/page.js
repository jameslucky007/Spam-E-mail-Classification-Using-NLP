"use client"
import axios from 'axios';
import React, { useState } from 'react';



function App() {
  const [emailText, setEmailText] = useState('');
  const [result, setResult] = useState(null);
  const [indicators, setIndicators] = useState([]);

const predictHandler=async()=>{
  if ( !emailText) {
      return
  }
  try {
    const response=await axios.post("http://localhost:5000/predict", {
      mail : emailText
    })
    console.log(response.data?.prediction);
    setIndicators([response.data?.prediction]);
    setResult(response.data?.prediction);

  } catch (err){
    console.log(err);
  }
}


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="gradient-bg text-white">
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Email Spam Classification</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-20">
            Powered by NLP to protect your inbox from unwanted messages
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 -mt-20">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto p-8">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <i className="fas fa-envelope-open-text text-blue-600 text-xl"></i>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">Check your Message </h3>
          </div>

          <div className="mb-8">
            <label htmlFor="email-text" className="block text-sm font-medium text-gray-700 mb-2">
              Paste the email content below
            </label>
            <textarea
              id="email-text"
              rows="8"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 textarea-shadow focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Dear valued customer, we're offering an exclusive deal just for you..."
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-center mb-8">
            <button
              onClick={predictHandler}
              className="gradient-bg text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition duration-200 flex items-center"
            >
              <i className="fas fa-search mr-2"></i> Analyze Email
            </button>
          </div>

          {/* Results Section */}
          {result && (
            <div id="results">
              <div className="border-t border-gray-200 pt-8">
                <h4 className="text-lg font-medium text-gray-800 mb-6">Analysis Results</h4>
                <div id="result-content" className="flex flex-col items-center">
                  <div className={`text-2xl font-bold ${result === 'Spam' ? 'text-red-500 spam-pulse' : 'text-green-600 ham-pulse'}`}>
                    {result}
                  </div>
                </div>
{/* 
                <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                  <h5 className="font-medium text-gray-700 mb-3">Common Spam Indicators Found:</h5>
                  <div id="indicators" className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {indicators.map((item, index) => (
                      <div key={index} className="text-sm text-gray-600 bg-white border rounded p-2 shadow">
                        {item}
                      </div>
                    ))}
                    {indicators.length === 0 && <p className="text-gray-500">No common indicators found.</p>}
                  </div>
                </div> */}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
