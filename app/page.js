'use client';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import SearchBar from '../components/SearchBar';
import CafeCard from '../components/CafeCard';


export default function HomePage() {
  const [cafes, setCafes] =useState([]);
  
    useEffect(()=> {
      axios.get('http://localhost:8080/api/studyrooms')
      .then((res)=>{
       setCafes(res.data);
      })
      .catch((err)=>{
        console.error("스터디카페 불러오기 실패",err);
        
      });
    },[]);
  

  return(
    <div>
      <Header/>
      <main className = "px-6 py-8">
        <div className = "text-center mb-6">
        <h1 className = "text-3xl font-bold mb-6">스터디룸 찾기</h1>
        </div>
        <SearchBar/>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:gid-cols-4 gap-6">
          {cafes.map((cafe, index) =>(
            <CafeCard key={index} cafe = {cafe}/>
          ))}
        </div>
      </main>
    </div>
  )
}
