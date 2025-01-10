import axiosInstance from './axiosInstance';

export const createUser = async (data) => {
  try {
    const response = await axiosInstance.post('/client/sign-up', data);
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

export const sentOtp = async (data) => {
  try {
    const response = await axiosInstance.post('/client/otp', data);
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