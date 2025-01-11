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