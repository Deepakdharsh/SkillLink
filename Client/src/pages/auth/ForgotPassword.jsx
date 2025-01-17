import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Fingerprint } from 'lucide-react';
import pic from "../../../public/img/pexels-mikhail-nilov-7534742.jpg"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { forgotPassword } from '@/api/apiService';
import { useDispatch } from 'react-redux';
import { setForgotEmail, setUser } from '@/features/userSlice';

const ForgotPassword = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [email, setEmail] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      text: "Forgot your password? Don't worry! Reset it in just a few steps. Check your email for the link.",
      author: "SkillLink",
    //   role: "freelancing platform",
    //   company: "RadialCorp"
    },
    // Add more testimonials as needed
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj={
      email
    }

    const res= await forgotPassword(obj)
    console.log(res)
    if(res.success){

      dispatch(setForgotEmail(email))
      navigate("/forgot-password/otp")
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
        <div className="max-w-md mx-auto w-full">
          {/* Updated Logo */}
          <div className="mb-8">
            <Fingerprint className="w-10 h-10 text-gray-800" strokeWidth={1.5} />
          </div>
          
          {/* Form Section */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Forgot password?</h1>
          <p className="text-gray-600 mb-8">No worries, we'll send you reset instructions.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Enter your email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@company.com"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              verify email
            </button>
          </form>
          
          <Link
            className="mt-6 flex items-center text-gray-600 hover:text-gray-900"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to log in
          </Link>
        </div>
      </div>

      {/* Right Section - Testimonial Slider */}
      <div className="hidden md:flex w-1/2 bg-gray-100 relative">
        <div className="absolute inset-0">
          <img 
            src={pic} 
            alt="Office space" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">{testimonials[currentSlide].text}</h2>
          <div className="mb-8">
            <p className="font-medium">{testimonials[currentSlide].author}</p>
            <p className="text-sm opacity-80">{testimonials[currentSlide].role}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
            
            <div className="flex space-x-4">
              <button 
                className="p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
                onClick={() => setCurrentSlide(prev => (prev - 1 + testimonials.length) % testimonials.length)}
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button 
                className="p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
                onClick={() => setCurrentSlide(prev => (prev + 1) % testimonials.length)}
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;