import axiosInstance from './axiosInstance';

export const createUser = async (data) => {
  try {
    const response = await axiosInstance.post('/client/sign-up', data);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axiosInstance.post('/client/sign-in', data);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
  }
};

export const googleSignIn = async (data) => {
  try {
    const response = await axiosInstance.post('/client/sign-in', data);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
  }
};