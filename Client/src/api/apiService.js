import axiosInstance from './axiosInstance';

export const createUser = async (data) => {
  try {
    const response = await axiosInstance.post('/client/sign-up', data);
    console.log(response.data)
    return response.data;
  } catch (error) {
    if(error.response){
      console.error('Error :', error.response.data);
      const message=error.response.data;
      return message
    }else{
      console.error('Error:',error.message)
    }
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axiosInstance.post('/client/sign-in', data);
    console.log(response.data)
    return response.data;
  } catch (error) {
    if(error.response){
      console.error('Error :', error.response.data);
    }else{
      console.error('Error:',error.message)
    }
  }
};

export const googleSignIn = async (data) => {
  try {
    const response = await axiosInstance.post('/client/google-in', data);
    console.log(response.data)
    return response.data;
  } catch (error) {
    if(error.response){
      console.error('Error :', error.response.data);
    }else{
      console.error('Error:',error.message)
    }
  }
};

export const sentOtp = async (email) => {
  // console.log(data)
  try {
    const response = await axiosInstance.post('/client/otp', email);
    console.log(response.data)
    return response.data;
  } catch (error) {
    if(error.response){
      console.error('Error :', error.response.data);
      return error.response.data
    }else{
      console.error('Error:',error.message)
    }
  }
};

// export const resetOtp = async (data) => {
//   // console.log(data)
//   try {
//     const response = await axiosInstance.post('/client/reset-otp', data);
//     console.log(response.data)
//     return response.data;
//   } catch (error) {
//     if(error.response){
//       console.error('Error :', error.response.data);
//       return error.response.data
//     }else{
//       console.error('Error:',error.message)
//     }
//   }
// };


export const SetUserType = async (data) => {
  try {
    const response = await axiosInstance.post('/client/user-type', data);
    console.log(response.data)
    return response.data;
  } catch (error) {
    if(error.response){
      console.error('Error :', error.response.data);
      return error.response.data
    }else{
      console.error('Error:',error.message)
    }
  }
};

export const forgotPassword = async (data) => {
  console.log(data)
  try {
    const response = await axiosInstance.post('/client/forgot-password', data);
    console.log(response.data)
    return response.data;
  } catch (error) {
    if(error.response){
      console.error('Error :', error.response.data);
      return error.response.data
    }else{
      console.error('Error:',error.message)
    }
  }
};


export const verifyForgotPassword = async (data) => {
  try {
    const response = await axiosInstance.post('/client/verify-otp', data);
    console.log(response.data)
    return response.data;
  } catch (error) {
    if(error.response){
      console.error('Error :', error.response.data);
      return error.response.data
    }else{
      console.error('Error:',error.message)
    }
  }
};

export const getuser = async () => {
  try {
    const response = await axiosInstance.get('/client/get-user');
    // console.log(response.data)
    return response.data;
  } catch (error) {
    if(error.response){
      console.error('Error :', error.response.data);
      return error.response.data
    }else{
      console.error('Error:',error.message)
    }
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await axiosInstance.post('/client/reset-password', data);
    console.log(response.data)
    return response.data;
  } catch (error) {
    if(error.response){
      console.error('Error :', error.response.data);
      return error.response.data
    }else{
      console.error('Error:',error.message)
    }
  }
};

export const listUsers = async () => {
  try {
    console.log("request sented")
    const response = await axiosInstance.get('/client/list-users' );
    console.log(response.data)
    return response.data;
  } catch (error) {
    if(error.response){
      console.error('Error :', error.response.data);
      return error.response.data
    }else{
      console.error('Error:',error.message)
    }
  }
};

export const upload = async (data) => {
  console.log(data)
  try {
    const response = await axiosInstance.post('/client/upload',data, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
    return response.data;
  } catch (error) {
    if(error.response){
      console.error('Error :', error.response.data);
      return error.response.data
    }else{
      console.error('Error:',error.message)
    }
  }
};

export const setLocation = async (data) => {
  const obj={data}
  console.log(obj)
  try {
    const response = await axiosInstance.post('/client/location',obj);
    return response.data;
  } catch (error) {
    if(error.response){
      console.error('Error :', error.response.data);
      return error.response.data
    }else{
      console.error('Error:',error.message)
    }
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.get('/client/logout');
    return response.data;
  } catch (error) {
    if(error.response){
      console.error('Error :', error.response.data);
      return error.response.data
    }else{
      console.error('Error:',error.message)
    }
  }
};


