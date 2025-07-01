'use client';
import { useEffect,useState } from 'react';
import axios from '@/lib/axios';
import Header from "@/components/Header";
import SearchBar from '@/components/SearchBar';
import CafeCard from '@/components/CafeCard';


export default function HomePage() {
  const [cafes, setCafes] =useState([]);
  
    useEffect(()=> {
      axios.get('/api/studyrooms')
      .then((res)=>{
       setCafes(res.data);
      })
      .catch((err)=>{
        console.error("스터디카페 불러오기 실패",err);
        
      });
    },[]);
  

  return(
    <div className='bg-white min-h-screen'>
      <Header/>

        <section className='w-full bg-[#331715] py-10 px-6'>
        <div className = "text-center mb-6">
        <h1 className = "text-3xl font-bold mb-6">스터디룸 찾기</h1>
        </div>
        <SearchBar/>
        </section>
        <main className='px-6 py-8'>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:gid-cols-4 gap-6 text-gray-800">
          {cafes.map((cafe, index) =>(
            <CafeCard key={index} cafe = {cafe}/>
          ))}
        </div>
      </main>
    </div>
  )
}
