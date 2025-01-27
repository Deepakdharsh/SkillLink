import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetUserType } from '@/api/apiService';
import { setToken, setUser } from '@/features/userSlice';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';

const UserType = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const dispatch=useDispatch()
  const [error, setError] = useState('');
  const data=useSelector((state)=>state.userDetails)
  const navigate=useNavigate()

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setError('');
  };

  const handleNext = async () => {
    if (!selectedOption) {
      setError('Please select an option to continue');
      return;
    }
    const obj={
      email:data.email,
      role:selectedOption
    }
    const res=await SetUserType(obj)
    dispatch(setUser(res.result))
    console.log(res.result)
    if(res.success) {
      navigate("/home")
      toast("successfully loggedIn",{
          position: "top-center",
          autoClose: 3000,
      })
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            efdsfasdf, your account has been created! What brings you to SkillLink?
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            We want to tailor your experience so you'll feel right at home.
          </p>
        </div>

        {/* Options Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Client Option */}
          <div 
            className={`p-5 border-2 rounded-lg cursor-pointer transition-all duration-200
              ${selectedOption === 'Client' 
                ? 'border-gray-900 bg-gray-50' 
                : 'border-gray-200 hover:border-gray-400'}`}
            onClick={() => handleOptionSelect('Client')}
          >
            <div className="flex items-center justify-between mb-4">
              {/* SVG icon for Client */}
              <svg className="w-14 h-14" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="24" fill="#333333" fillOpacity="0.1"/>
                <path d="M32 20C28 20 24 24 24 28" stroke="#333333" strokeWidth="2"/>
                <rect x="28" y="28" width="8" height="8" fill="#333333"/>
              </svg>
              <input 
                type="radio" 
                checked={selectedOption === 'Client'}
                onChange={() => handleOptionSelect('Client')}
                className="w-5 h-5 accent-gray-900"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
                Client
            </h3>
            <p className="text-gray-600 text-sm mt-2">
                I am a client,hiring for a project
            </p>
          </div>

          {/* Freelancer Option */}
          <div 
            className={`p-5 border-2 rounded-lg cursor-pointer transition-all duration-200
              ${selectedOption === 'Freelancer' 
                ? 'border-gray-900 bg-gray-50' 
                : 'border-gray-200 hover:border-gray-400'}`}
            onClick={() => handleOptionSelect('Freelancer')}
          >
            <div className="flex items-center justify-between mb-4">
              {/* SVG icon for Freelancer */}
              <svg className="w-14 h-14" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="24" fill="#333333" fillOpacity="0.1"/>
                <rect x="24" y="24" width="16" height="16" stroke="#333333" strokeWidth="2" fill="none"/>
                <line x1="24" y1="32" x2="40" y2="32" stroke="#333333" strokeWidth="2"/>
              </svg>
              <input 
                type="radio" 
                checked={selectedOption === 'Freelancer'}
                onChange={() => handleOptionSelect('Freelancer')}
                className="w-5 h-5 accent-gray-900"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Freelancer
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              I'd like to offer my services.
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center text-sm mb-4">
            {error}
          </div>
        )}

        {/* Next Button */}
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="bg-gray-900 text-white px-8 py-3 rounded-lg text-base font-medium hover:bg-gray-800 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserType;