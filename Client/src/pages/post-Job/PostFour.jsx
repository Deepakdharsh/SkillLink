import React, { useState } from 'react';

const PostFour = () => {
  const [duration, setDuration] = useState('');
  const [experience, setExperience] = useState('');

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
        <nav className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8 md:mb-12">
          <div className="font-bold text-2xl">SkillLink.</div>
          <div className="w-full sm:w-auto order-3 sm:order-2">
            <div className="flex flex-wrap justify-center gap-4 bg-gray-100 rounded-full px-6 py-3">
              <button className="text-base text-gray-600 px-2">home</button>
              <button className="text-base text-gray-600 px-2">post a job</button>
              <button className="text-base text-gray-600 px-2">find talent</button>
              <button className="text-base text-gray-600 px-2">pricing</button>
            </div>
          </div>
          <div className="flex gap-6 items-center order-2 sm:order-3">
            <button className="text-gray-600"><svg className="h-6 w-6 lg:h-7 lg:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg></button>
            <button className="text-gray-600"><svg className="h-6 w-6 lg:h-7 lg:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></button>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto mt-12 lg:mt-16">
          <div className="mb-8">
            <span className="text-gray-600">3/5</span>
            <h1 className="text-xl font-medium mt-2">Job post</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-medium mb-4">Next, estimate the scope of your work.</h2>
            <p className="text-blue-600 text-sm">These aren't final answers, but this information helps us recommend the right talent for what you need.</p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg mb-4">How long will your work take?</h3>
              <div className="space-y-3">
                {[
                  { id: '1-3', label: '1 to 3 months' },
                  { id: '3-6', label: '3 to 6 months' },
                  { id: '6plus', label: 'more than 6 months' }
                ].map((option) => (
                  <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="duration"
                      value={option.id}
                      checked={duration === option.id}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg mb-4">What is the level of experience needed?</h3>
              <div className="space-y-3">
                {[
                  { id: '1-3', label: '1 to 3 months' },
                  { id: '3-6', label: '3 to 6 months' },
                  { id: 'more', label: 'more than 6 months' }
                ].map((option) => (
                  <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="experience"
                      value={option.id}
                      checked={experience === option.id}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-12">
            <button className="px-8 py-3 rounded-full border-2 hover:bg-gray-50 transition-colors text-base">
              back
            </button>
            <button className="px-8 py-3 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors text-base">
              continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFour;