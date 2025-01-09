import React, { useState } from 'react';

const PostOne = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div className="min-h-screen bg-white">
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
      <nav className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8 md:mb-12">
        <div className="font-bold text-2xl">SkillLink.</div>
        
        <div className="w-full sm:w-auto order-3 sm:order-2">
          <div className="flex flex-wrap justify-center gap-4 bg-gray-100 rounded-full px-6 py-3">
            <button className="text-base text-gray-600 whitespace-nowrap px-2">home</button>
            <button className="text-base text-gray-600 whitespace-nowrap px-2">post a job</button>
            <button className="text-base text-gray-600 whitespace-nowrap px-2">find talent</button>
            <button className="text-base text-gray-600 whitespace-nowrap px-2">pricing</button>
          </div>
        </div>
        
        <div className="flex gap-6 items-center order-2 sm:order-3">
          <button className="text-gray-600">
            <svg className="h-6 w-6 lg:h-7 lg:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button className="text-gray-600">
            <svg className="h-6 w-6 lg:h-7 lg:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto mt-12 lg:mt-16">
        <h2 className="text-2xl lg:text-3xl font-medium mb-8 lg:mb-10 text-center sm:text-left">
          how long the project will take?
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 lg:mb-10">
          <button 
            className={`p-6 border-2 rounded-xl text-left hover:border-gray-400 transition-colors ${selectedCard === 'long' ? 'bg-gray-100' : ''}`}
            onClick={() => setSelectedCard('long')}
          >
            <span className="text-lg text-gray-800">long term project</span>
          </button>
          <button 
            className={`p-6 border-2 rounded-xl text-left hover:border-gray-400 transition-colors ${selectedCard === 'short' ? 'bg-gray-100' : ''}`}
            onClick={() => setSelectedCard('short')}
          >
            <span className="text-lg text-gray-800">short term project</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-4">
          <button className="w-full sm:w-auto px-8 py-3 rounded-full border-2 hover:bg-gray-50 transition-colors text-base">
            cancel
          </button>
          <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors text-base">
            continue
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default PostOne;