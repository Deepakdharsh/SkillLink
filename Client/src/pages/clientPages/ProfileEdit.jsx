import React, { useEffect, useState } from 'react';
import { Camera } from 'lucide-react';
import { getuser, upload } from '@/api/apiService';
import { useNavigate } from 'react-router-dom';

const ProfileEdit = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    degrees: [],
    bio: ''
  });
  
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});

  // const [tempName,setTempName]=useState("")
  // const [tempPosition,setTempPosition]=useState("")
  // const [tempBio,setTempBio]=useState("")

  useEffect(()=>{
    async function fetchData(){
      const res=await getuser()
      // setTempName(res.result.user.name)
      // setTempBio(res.result.user.position)
      // setTempPosition (res.result.user?.bio)
      setFormData({
        name: res.result.user.name,
        // email: 'john.doe@example.com',
        position:res.result.user.position,
        // degrees: ['B.Sc. Computer Science', 'M.Sc. Data Science'],
        bio:res.result.user?.bio,
      });
    }
    fetchData()
  },[])

  // console.log(tempName)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert('File size must be less than 1MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    // if (!formData.email.trim()) {
    //   newErrors.email = 'Email is required';
    // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   newErrors.email = 'Invalid email format';
    // }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(!validateForm())
    if (!validateForm()) return;

    const submitData = new FormData();
    // submitData.append('profileImage', image);
    // submitData.append('name', formData.name);
    // submitData.append('degrees', formData.degrees);
    // submitData.append('position', formData.position);
    if (image) submitData.append('profileImage', image);
    if (formData.name) submitData.append('name', formData.name);
    if (formData.email) submitData.append('email', formData.email);
    // if (formData.degrees.length!==0) submitData.append('degrees', formData.degrees);
    if (formData.position) submitData.append('position', formData.position);
    if (formData.bio) submitData.append('bio', formData.bio);
    
    // Object.keys(formData).forEach(key => {
    //   submitData.append(key, 
    //     Array.isArray(formData[key]) 
    //       ? JSON.stringify(formData[key]) 
    //       : formData[key]
    //   );
    // });

    try {
      const res = await upload(submitData)
      console.log('Form submitted:', submitData);
      console.log('Form submitted:', res);
      if(res.success) navigate("/profile")
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // const addDegree = () => {
  //   const degree = document.getElementById('degreeInput').value.trim();
  //   if (degree) {
  //     setFormData(prev => ({
  //       ...prev,
  //       degrees: [...prev.degrees, degree]
  //     }));
  //     document.getElementById('degreeInput').value = '';
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
            <div className="flex items-center space-x-4">
              <div className="relative h-24 w-24">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Profile preview"
                    className="h-24 w-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <Camera className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-black bg-opacity-50 rounded-full p-1 cursor-pointer">
                  <Camera className="h-4 w-4 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/png"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <div className="text-sm text-gray-500">
                <p>Recommended: Square JPG, PNG</p>
                <p>Maximum size: 1MB</p>
              </div>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          {/* <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div> */}

          {/* Position */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Position</label>
            <input
              type="text"
              value={formData.position}
              onChange={e => setFormData(prev => ({ ...prev, position: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Degrees */}
          {/* <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Degrees</label>
            <div className="flex space-x-2">
              <input
                id="degreeInput"
                type="text"
                placeholder="Add a new degree"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addDegree}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.degrees.map((degree, index) => (
                <span
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {degree}
                  <button
                    type="button"
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      degrees: prev.degrees.filter((_, i) => i !== index)
                    }))}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div> */}

          {/* Bio */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              value={formData.bio}
              onChange={e => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
            onClick={handleSubmit}
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;