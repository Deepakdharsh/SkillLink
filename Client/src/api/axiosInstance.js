import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
//   timeout: 5000, // 5 seconds timeout
  withCredentials: true,  
  // headers: { 'Content-Type': 'application/json' },
});

// axiosInstance.interceptors.request.use(
//     (config) => {
//       // Add Authorization token to headers
//       const token = localStorage.getItem('token');
//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
// );

// axiosInstance.interceptors.response.use(
//     (response) => {
//       // You can log or modify responses here if needed
//       return response;
//     },
//     (error) => {
//       if (error.response && error.response.status === 401) {
//         // Handle unauthorized errors (e.g., redirect to login)
//         console.error('Unauthorized! Redirecting to login...');
//         window.location.href = '/login';
//       }
//       return Promise.reject(error);
//     }
// );

export default axiosInstance;