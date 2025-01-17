import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Fingerprint } from 'lucide-react';
import pic from "../../../public/img/pexels-mikhail-nilov-7534742.jpg"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { forgotPassword, resetPassword } from '@/api/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { setForgotEmail, setUser } from '@/features/userSlice';

const ResetPassword =() => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const val=useSelector((state)=>state.forgotEmail)
  const [password, setPassword] = useState('');

  const handleSubmit =async (e) => {
    e.preventDefault();
    const obj={
      email:val,
      password
    }
    const res= await resetPassword(obj)
    console.log(res)
    if(res.success){
      navigate("/home/sign-in")
    }
  };

  return (
    <div className="min-h-screen flex justify-center">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Enter your new Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                /* placeholder="name@company.com" */
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;