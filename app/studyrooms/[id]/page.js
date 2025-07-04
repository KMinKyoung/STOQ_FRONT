'use client';
 import { useParams, useRouter } from 'next/navigation';
 import { useEffect, useState } from 'react'; 
 import axios from '@/lib/axios';
 import Header from '@/components/Header'; 
 import StudyMap from '@/components/studymap';


 export default function StudyRoomDetailPage() { 
    const { id } = useParams();
    const router = useRouter();
    const [cafe, setCafe] = useState(null); 
    useEffect(() => {
        axios.get(`/api/studyrooms/details/${id}`) 
        .then(res => setCafe(res.data)) 
        .catch(err => console.error("상세정보 불러오기 실패", err));
     }, [id]);
        
     if (!cafe) return <div className="p-8">불러오는 중...</div>;
     const formattedTime = `${new Date(cafe.openTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ~ ${new Date(cafe.closeTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`; 
     return (
        <div className='bg-white'>
        <Header />
        <section className='w-full bg-[#331715] text-white py-10 px-6'>

            <div className="flex flex-col md:flex-row gap-8"> 
                <div className="w-full md:w-1/2 bg-gray-200 h-64 rounded-md flex items-center justify-center"> 
                <p className="text-gray-500">슬라이드 이미지 영역</p> 
                </div>
            <div className="w-full md:w-1/2 flex flex-col justify-between"> 
            <div>
                <h1 className="text-2xl font-bold mb-4">{cafe.name}</h1> <p className="text-gray-600 mb-2">⏰ 운영 시간: {formattedTime}</p> 
                <p className={`font-semibold ${cafe.active ? 'text-green-600' : 'text-red-600'}`}> {cafe.active ? '영업 중입니다' : '현재 영업하지 않습니다'} </p>
            </div>
                <button
                onClick={() => router.push(`/reserve/${cafe.id}`)} className="mt-6 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 self-start"
                >
                    좌석 예약하기
                </button>
            </div>
        </div>
        </section>
              <main className="bg-white p-8 max-w-6xl mx-auto text-gray-800"> 
            <div className="mt-12">
                <h2 className="text-xl font-semibold mb-4">상세 정보</h2> 
                <p className="text-gray-700">{cafe.location}</p> 
                <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">위치</h2> 
 
                <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center"> 
                      <StudyMap latitude={cafe.latitude} longitude={cafe.longitude} />

                    </div>
                </div>
            </div>
        </main>
    </div>
    );
 }