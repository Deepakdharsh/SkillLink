import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Building, Globe } from 'lucide-react';

const ProfilePage = () => {
  const [profileData] = useState({
    name: 'John Doe',
    role: 'Senior Administrator',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    department: 'IT Administration',
    website: 'www.johndoe.com'
  });

  return (
    <div className="ml-64 min-h-screen bg-gray-100 p-4 lg:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        <p className="text-gray-600">Manage your profile information</p>
      </div>

      {/* Profile Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="rounded-lg bg-white p-6 shadow-md lg:col-span-1">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src="/api/placeholder/120/120"
                alt="Profile"
                className="h-32 w-32 rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600">
                <Camera size={16} />
              </button>
            </div>
            <h2 className="mt-4 text-xl font-semibold">{profileData.name}</h2>
            <p className="text-gray-600">{profileData.role}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="rounded-lg bg-white shadow-md lg:col-span-2">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
          </div>
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={16} />
                  <span className="text-sm font-medium">Email</span>
                </div>
                <p className="text-gray-800">{profileData.email}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={16} />
                  <span className="text-sm font-medium">Phone</span>
                </div>
                <p className="text-gray-800">{profileData.phone}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} />
                  <span className="text-sm font-medium">Location</span>
                </div>
                <p className="text-gray-800">{profileData.location}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Building size={16} />
                  <span className="text-sm font-medium">Department</span>
                </div>
                <p className="text-gray-800">{profileData.department}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe size={16} />
                  <span className="text-sm font-medium">Website</span>
                </div>
                <p className="text-gray-800">{profileData.website}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600">
                Edit Profile
              </button>
              <button className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50">
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Activity Card */}
        <div className="rounded-lg bg-white shadow-md lg:col-span-3">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-4 border-b border-gray-200 pb-4 last:border-0">
                  <div className="h-10 w-10 rounded-full bg-blue-100 p-2">
                    <img src="/api/placeholder/32/32" alt="Activity" className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">System Update Completed</h3>
                    <p className="text-sm text-gray-600">Updated the system configuration for better performance</p>
                    <span className="mt-1 text-xs text-gray-500">2 hours ago</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;