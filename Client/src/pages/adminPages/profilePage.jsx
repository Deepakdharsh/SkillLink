import React from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { LayoutDashboard as DashboardIcon, Table, Receipt, Languages, Bell, User, LogIn, UserPlus } from 'lucide-react';

const ProfilePage = () => {
    return (
      <div className="p-8">
        <div className="flex items-center gap-2 text-gray-500 mb-2">
          <Link to="/" className="hover:text-gray-700">
            <DashboardIcon size={16} />
          </Link>
          <span>/</span>
          <span>Profile</span>
        </div>
        <h1 className="text-2xl font-semibold mb-8">Profile</h1>
  
        <div className="relative">
          <img 
            src="/api/placeholder/1200/300" 
            alt="Cover" 
            className="w-full h-64 object-cover rounded-xl"
          />
          <div className="absolute -bottom-16 left-8">
            <img 
              src="/api/placeholder/128/128" 
              alt="Profile" 
              className="w-32 h-32 rounded-full border-4 border-white"
            />
          </div>
        </div>
  
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xl font-semibold">Platform Settings</h2>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500">ACCOUNT</h3>
                <div className="flex items-center justify-between">
                  <span>Email me when someone follows me</span>
                  <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Email me when someone answers my post</span>
                  <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Email me when someone mentions me</span>
                  <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Profile Information</h2>
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <User size={20} />
                </button>
              </div>
              <p className="text-gray-600 mb-6">
                Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer is no. 
                If two equally difficult paths, choose the one more painful in the short term 
                (pain avoidance is creating an illusion of equality).
              </p>
              <div className="space-y-4">
                <div>
                  <span className="font-medium">Full Name: </span>
                  <span className="text-gray-600">Alec M. Thompson</span>
                </div>
                <div>
                  <span className="font-medium">Mobile: </span>
                  <span className="text-gray-600">(44) 123 1234 123</span>
                </div>
              </div>
            </div>
  
            <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
              <h2 className="text-xl font-semibold mb-6">Conversations</h2>
              <div className="space-y-4">
                {[
                  { name: 'Sophie B.', message: 'Hi! I need more information..' },
                  { name: 'Anne Marie', message: 'Awesome work, can you..' },
                  { name: 'Ivanna', message: 'About files I can..' },
                ].map((chat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src="/api/placeholder/40/40" 
                        alt={chat.name} 
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{chat.name}</p>
                        <p className="text-sm text-gray-500">{chat.message}</p>
                      </div>
                    </div>
                    <button className="text-blue-500 hover:text-blue-700">
                      REPLY
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default  ProfilePage
  