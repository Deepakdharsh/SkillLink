import {Input,Checkbox,Button,Typography,} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin ,useGoogleLogin } from '@react-oauth/google';
import { useState } from "react";
import axios from "axios"
import { X, AlertCircle } from 'lucide-react';
import {loginUser,googleSignIn} from "../../api/apiService"
import { useDispatch } from "react-redux";
import { setToken } from "@/features/userSlice";


export function AdminLogin() {
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const login = useGoogleLogin({
    onSuccess: async tokenResponse =>{
      try {
        const res=await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
          headers:{
            Authorization:`Bearer ${tokenResponse.access_token}`
          }
        })
        console.log(res.data)
        const {email,given_name:name,picture,}=res.data
        const data=await googleSignIn(res.data)
        console.log(data.success)
        if(data.success){
          dispatch(setToken(data.token))
          navigate("/home")
        }
      } catch (error) {
        console.log(error)
      }
      
    },
    onError:(err)=> console.log("Login failed"),
  });
  
  const [formData, setFormData] = useState({
        email: '',
        password: '',
        agreeToTerms: false
      });
    
      const [errors, setErrors] = useState({});
      const [isSubmitting, setIsSubmitting] = useState(false);
    
      const validateForm = () => {
        const newErrors = {};
        
        // Username validation
       /*  if (!formData.username.trim()) {
          newErrors.username = 'Username is required';
        } */
    
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
          newErrors.email = 'Invalid email format';
        }
    
        // Password validation
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }
    
        // Terms validation
        if (!formData.agreeToTerms) {
          newErrors.terms = 'You must agree to the Terms and Conditions';
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const handleSubmit =async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        if (validateForm()) {
          console.log('Form submitted:', formData);
          const data=await loginUser(formData)
          console.log(data)
          if(data.token){
            dispatch(setToken(data.token))
            navigate("/home")
          }
        }
        
        setIsSubmitting(false);
      };
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
        }));
      };
  return (
    <section className="m-8 flex gap-4">
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>
            <p className="text-center text-gray-600 mb-8">Enter your email and password to Sign In.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="name@mail.com"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.username}
                  </p>
                )}
              </div> */}
      
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="name@mail.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
      
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="name@mail.com"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>
      
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <label className="ml-2 text-sm text-gray-600">
                  I agree to the <a href="#" className="text-black underline">Terms and Conditions</a>
                </label>
              </div>
              {errors.terms && (
                <p className="text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.terms}
                </p>
              )}
      
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400"
              >
                LOGIN 
              </button>
      
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
              </div>
      
              <div className="space-y-4 mt-8">
              {/* <Button onClick={()=>login()} size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1156_824)">
                      <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />
                      <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />
                      <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />
                      <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />
                    </g>
                    <defs>
                      <clipPath id="clip0_1156_824">
                        <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>Sign in With Google</span>
                  </Button> */}
{/*             <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
              <img src="/img/twitter-logo.svg" height={24} width={24} alt="" />
              <span>Sign in With Twitter</span>
            </Button> */}
          </div>
      {/* 
              <p onClick={()=>navigate("/home/sign-up")} className="hover:cursor-pointer mt-6 text-center text-gray-600">
                Already have an account?{' '}
                  Sign up
              </p> */}
            </form>
          </div>
     
      {<div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>}

    </section>
  );
}

export default AdminLogin;


