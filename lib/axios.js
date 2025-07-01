'use client'
import axios from "axios";
console.log("✅ BASE_URL:", process.env.NEXT_PUBLIC_API_URL);


const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});


//401 응답 시 자동으로 로그아웃 -> 실시간으로 반응
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status == 401){
            if(typeof window !== 'undefined'){
            localStorage.removeItem('accessToken');
            window.location.href = '/';
        }
    }
    return Promise.reject(error);
    }
);

export default instance;