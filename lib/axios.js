'use client'
import axios from "axios";
NEXT_PUBLIC_API_URL="http://13.124.108.205:8080"

console.log("✅ BASE_URL:", process.env.NEXT_PUBLIC_API_URL);



const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
     withCredentials: true,
});
/*const instance = axios.create({
  baseURL: 'http://localhost:8080', 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});*/


// ✅ 요청 인터셉터: 토큰 자동 첨부
instance.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 응답 인터셉터: 401 시 자동 로그아웃
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default instance;