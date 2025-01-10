import { createUser } from '@/api/apiService';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Otp = () => {
  const data=useSelector((state)=>state.userDetails)
  const navigate=useNavigate() 
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputs = useRef([]);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setError('');
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value !== '') {
      if (index < 3) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace') {
      if (index > 0 && otp[index] === '') {
        inputs.current[index - 1].focus();
      }
      setError('');
    }
  };

  const resetTimer = () => {
    setTimeLeft(60);
    setOtp(['', '', '', '']);
    setError('');
    inputs.current[0].focus();
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const validateOTP = () => {
    // Check if timer has expired
    if (timeLeft === 0) {
      setError('OTP has expired. Please request a new one.');
      return false;
    }

    // Check if all fields are filled
    if (otp.some(digit => digit === '')) {
      setError('Please enter all digits');
      return false;
    }

    // Check if all inputs are numbers
    if (!otp.every(digit => !isNaN(digit))) {
      setError('OTP must contain only numbers');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    setError('');
    setIsSubmitting(true);

    if (!validateOTP()) {
      setIsSubmitting(false);
      return;
    }

    const obj={...data}
    obj.otp=otp.join("")
    createUser(obj)
    // navigate("/home")
    console.log(obj)

  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">OTP</h2>
        <div className="flex justify-center gap-4 mb-4">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              ref={(ref) => (inputs.current[index] = ref)}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              className={`w-12 h-12 md:w-16 md:h-16 text-center text-xl border rounded-lg focus:outline-none focus:border-black
                ${error ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            />
          ))}
        </div>
        
        {error && (
          <div className="text-red-500 text-center text-sm mb-4">
            {error}
          </div>
        )}

        <div className="text-center mb-6">
          <p className="text-gray-600 mb-2">Time remaining: {formatTime(timeLeft)}</p>
          {timeLeft === 0 && (
            <button 
              onClick={resetTimer}
              className="text-black underline text-sm hover:text-gray-600"
              disabled={isSubmitting}
            >
              Resend OTP
            </button>
          )}
        </div>

        <button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full bg-black text-white py-3 rounded-lg transition-colors
            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
        >
          {isSubmitting ? 'Verifying...' : 'Sign in'}
        </button>
      </div>
    </div>
  );
};

export default Otp;