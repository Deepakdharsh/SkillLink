import React, { useEffect, useState } from 'react';
import { Camera } from 'lucide-react';
import { getuser, upload } from '@/api/apiService';
import { useNavigate } from 'react-router-dom';
import pic from "../../../public/img/profilePlaceholderImg.png"
import ReactCrop from 'react-image-crop'

const EditProfile = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    website:"www.skillLink.com",
    role:''
  });
  
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [crop, setCrop] = useState("")
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(()=>{
    async function fetchData(){
      const res=await getuser()
      console.log(res)
      setFormData({
        name: res.result.user.name,
        department:res.result.user.department,
      });
    }
    fetchData()
  },[])

  // console.log(tempName)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageName(file.name)
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

    // if (formData.bio.length>250) {
    //   newErrors.bio = '250 chartecter are only allowed!';
    // }
    
    setErrors(newErrors);
    console.log(errors.bio)
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(crop)

    console.log(!validateForm())
    if (!validateForm()) return;

    const submitData = new FormData();
    // submitData.append('profileImage', image);
    // submitData.append('name', formData.name);
    // submitData.append('degrees', formData.degrees);
    // submitData.append('position', formData.position);
    if (image) submitData.append('profileImage', image);
    if (formData.name) submitData.append('name', formData.name);
    if (formData.department) submitData.append('department', formData.department);
    
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
                    <img
                    src={pic}
                    alt="Profile preview"
                    className="h-24 w-24 rounded-full object-cover"
                  />
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
            {
                imageName && (
                    <ReactCrop crop={crop} onChange={c => setCrop(c)}>
                    <img className='h-36 w-36' src={previewUrl} />
                    </ReactCrop>
                )
            }
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

          {/* Department */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              value={formData.department}
              onChange={e => setFormData(prev => ({ ...prev, department: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
            onClick={()=>navigate(-1)}
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

export default EditProfile;