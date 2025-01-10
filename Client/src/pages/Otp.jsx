import { createUser } from '@/api/apiService';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds = 1 minute
  const inputs = useRef([]);
  const data=useSelector((state)=>state.userDetails)
  const navigate=useNavigate() 

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResend = () => {
    setTimeLeft(60);
    // Add your resend OTP logic here
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

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
    }
  };

  function handleClick(){
    const obj={...data}
    obj.otp=otp.join("")
    createUser(obj)
    navigate("/home")
    console.log(obj)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">OTP</h2>
        <div className="flex justify-center gap-4 mb-6">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              ref={(ref) => (inputs.current[index] = ref)}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              className="w-12 h-12 md:w-16 md:h-16 text-center text-xl border rounded-lg focus:outline-none focus:border-black"
            />
          ))}
        </div>
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-2">Time remaining: {formatTime(timeLeft)}</p>
          {timeLeft === 0 && (
            <button 
              onClick={handleResend}
              className="text-black hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
        <button onClick={handleClick} className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Otp;